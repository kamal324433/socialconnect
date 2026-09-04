/**
 * Cloud Functions for the Societal Innovation Collaboration Portal.
 *
 * Deploy with: firebase deploy --only functions
 *
 * Why these run server-side (not just the client preview in lib/aiEngine.ts):
 *  - Firestore security rules let a citizen create a challenge but not set
 *    arbitrary categories/priorities on OTHER people's documents — running
 *    the authoritative classification here, under the Admin SDK, keeps the
 *    AI engine tamper-proof.
 *  - It lets you swap in a real LLM call (see classifyWithLLM below) without
 *    shipping an API key to the browser.
 */

const { onDocumentCreated, onDocumentUpdated } = require('firebase-functions/v2/firestore');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const { setGlobalOptions } = require('firebase-functions/v2');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

admin.initializeApp();
const db = admin.firestore();
setGlobalOptions({ maxInstances: 10, region: 'asia-south1' });

// ---------------------------------------------------------------------------
// Rule-based classifier (mirrors lib/aiEngine.ts). Kept dependency-free so
// the system works with zero external API keys out of the box.
// ---------------------------------------------------------------------------
const CATEGORY_TAXONOMY = [
  'Water & Sanitation', 'Agriculture & Rural Livelihood', 'Healthcare & Public Health',
  'Education & Skilling', 'Urban Infrastructure', 'Transportation & Mobility',
  'Energy & Environment', 'Waste Management', 'Digital Governance & IT',
  'Disaster Management', 'Women & Child Welfare', 'Public Safety & Law and Order',
  'Employment & Entrepreneurship', 'Other'
];

const KEYWORD_MAP = {
  'Water & Sanitation': ['water', 'drainage', 'sewage', 'toilet', 'sanitation', 'borewell', 'pipeline', 'flood', 'drinking water', 'wastewater'],
  'Agriculture & Rural Livelihood': ['crop', 'farmer', 'irrigation', 'soil', 'agriculture', 'livestock', 'fertilizer', 'harvest', 'seeds', 'mandi'],
  'Healthcare & Public Health': ['hospital', 'health', 'disease', 'medicine', 'clinic', 'maternal', 'vaccination', 'malnutrition', 'doctor', 'phc'],
  'Education & Skilling': ['school', 'education', 'literacy', 'teacher', 'dropout', 'skill', 'vocational', 'anganwadi', 'college', 'curriculum'],
  'Urban Infrastructure': ['road', 'street light', 'footpath', 'building', 'construction', 'encroachment', 'park', 'municipal', 'infrastructure'],
  'Transportation & Mobility': ['traffic', 'bus', 'transport', 'parking', 'congestion', 'vehicle', 'metro', 'last mile', 'auto'],
  'Energy & Environment': ['electricity', 'power outage', 'solar', 'pollution', 'air quality', 'renewable', 'deforestation', 'climate', 'emissions'],
  'Waste Management': ['garbage', 'waste', 'landfill', 'recycling', 'plastic', 'segregation', 'dumping', 'compost'],
  'Digital Governance & IT': ['app', 'portal', 'digital', 'e-governance', 'software', 'data', 'connectivity', 'internet', 'ai', 'automation'],
  'Disaster Management': ['flood', 'earthquake', 'cyclone', 'disaster', 'relief', 'evacuation', 'landslide', 'drought', 'fire safety'],
  'Women & Child Welfare': ['women', 'child', 'nutrition', 'anganwadi', 'domestic violence', 'girl child', 'maternal', 'safety of women'],
  'Public Safety & Law and Order': ['crime', 'police', 'safety', 'harassment', 'theft', 'cctv', 'law and order', 'emergency response'],
  'Employment & Entrepreneurship': ['unemployment', 'jobs', 'startup', 'msme', 'entrepreneur', 'livelihood', 'self-help group', 'skilling'],
  Other: []
};

const URGENT_WORDS = ['urgent', 'emergency', 'death', 'life-threatening', 'outbreak', 'collapse', 'contaminated', 'accident', 'critical'];
const SCALE_WORDS = ['district', 'entire village', 'thousands', 'block level', 'state-wide', 'multiple villages'];

function categorize(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  const scores = CATEGORY_TAXONOMY.filter((c) => c !== 'Other').map((category) => {
    const words = KEYWORD_MAP[category];
    const hits = words.filter((w) => text.includes(w)).length;
    const confidence = words.length ? Math.min(1, hits / Math.min(3, words.length)) : 0;
    return { category, confidence };
  });
  scores.sort((a, b) => b.confidence - a.confidence);
  const top = scores.filter((s) => s.confidence > 0);
  return top.length ? top.slice(0, 3) : [{ category: 'Other', confidence: 0.3 }];
}

function scorePriority(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  let score = 30;
  score += URGENT_WORDS.filter((w) => text.includes(w)).length * 15;
  score += SCALE_WORDS.filter((w) => text.includes(w)).length * 10;
  if (text.includes('child') || text.includes('women') || text.includes('elderly')) score += 8;
  score = Math.min(100, score);
  let priority = 'low';
  if (score >= 80) priority = 'critical';
  else if (score >= 60) priority = 'high';
  else if (score >= 40) priority = 'medium';
  return { score, priority };
}

// TF-IDF Cosine Similarity for duplicate detection (much better than Jaccard for long text)
function calculateTfIdf(corpus) {
  const documentTermFrequencies = corpus.map((text) => {
    const tokens = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3);
    const freqs = {};
    tokens.forEach(t => freqs[t] = (freqs[t] || 0) + 1);
    return freqs;
  });

  const documentFrequencies = {};
  documentTermFrequencies.forEach(freqs => {
    Object.keys(freqs).forEach(t => documentFrequencies[t] = (documentFrequencies[t] || 0) + 1);
  });

  const N = corpus.length;
  const idfs = {};
  Object.keys(documentFrequencies).forEach(t => {
    idfs[t] = Math.log(N / (1 + documentFrequencies[t]));
  });

  return { documentTermFrequencies, idfs };
}

function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  const allKeys = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
  allKeys.forEach(k => {
    const a = vecA[k] || 0;
    const b = vecB[k] || 0;
    dotProduct += a * b;
    normA += a * a;
    normB += b * b;
  });

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

function findDuplicatesTfIdf(newText, existingDocs, threshold = 0.35) {
  if (existingDocs.length === 0) return [];
  const corpus = [newText, ...existingDocs.map(d => `${d.title} ${d.description}`)];
  const { documentTermFrequencies, idfs } = calculateTfIdf(corpus);

  const getTfIdfVector = (tf) => {
    const vec = {};
    Object.keys(tf).forEach(t => vec[t] = tf[t] * idfs[t]);
    return vec;
  };

  const newVec = getTfIdfVector(documentTermFrequencies[0]);
  
  return existingDocs.map((doc, idx) => {
    const existingVec = getTfIdfVector(documentTermFrequencies[idx + 1]);
    const score = cosineSimilarity(newVec, existingVec);
    return { challengeId: doc.id, score };
  }).filter(c => c.score >= threshold).sort((a, b) => b.score - a.score);
}

// ---------------------------------------------------------------------------
// Capability matching for automatic university routing
// ---------------------------------------------------------------------------
function routeToUniversity(challenge, universities) {
  const ranked = universities
    .map((u) => {
      const capMatch = u.capabilities.some((cap) => cap.toLowerCase() === challenge.category.toLowerCase()) ? 1 : 0;
      const tagOverlap = u.capabilities.filter((cap) =>
        challenge.tags.some((t) => t.toLowerCase().includes(cap.toLowerCase()) || cap.toLowerCase().includes(t.toLowerCase()))
      ).length;
      const localBonus = u.district && u.district === challenge.district ? 0.25 : 0;
      const matchScore = capMatch * 1 + tagOverlap * 0.3 + localBonus;
      return { id: u.id, name: u.name, matchScore };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  const best = ranked[0];
  if (!best || best.matchScore === 0) {
    return { universityId: null, universityName: null, reason: 'No university with matching capabilities found.', ranked };
  }
  return {
    universityId: best.id,
    universityName: best.name,
    reason: `Matched on expertise in "${challenge.category}"${best.matchScore > 1 ? ' + locality' : ''}.`,
    ranked
  };
}

/** Optional: upgrade categorization to a real LLM if ANTHROPIC_API_KEY is set. Falls back to the rule-based classifier otherwise. */
async function classifyWithLLM(title, description) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 200,
        messages: [
          {
            role: 'user',
            content: `Classify this civic challenge into exactly one of: ${CATEGORY_TAXONOMY.join(', ')}. Respond with strict JSON only: {"category": "...", "confidence": 0-1}.\nTitle: ${title}\nDescription: ${description}`
          }
        ]
      })
    });
    const data = await res.json();
    const text = data.content?.[0]?.text || '';
    const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());
    if (parsed?.category) return [{ category: parsed.category, confidence: parsed.confidence ?? 0.8 }];
  } catch (e) {
    console.error('LLM classification failed, falling back to rules engine:', e);
  }
  return null;
}

// ---------------------------------------------------------------------------
// Trigger: on every new challenge, run categorization + priority scoring +
// duplicate detection (scoped to the same district) and write results back.
// ---------------------------------------------------------------------------
exports.triageNewChallenge = onDocumentCreated('challenges/{challengeId}', async (event) => {
  const snap = event.data;
  if (!snap) return;
  const data = snap.data();

  const llmResult = await classifyWithLLM(data.title, data.description);
  const suggestions = llmResult || categorize(data.title, data.description);
  const { score, priority } = scorePriority(data.title, data.description);

  const existingSnap = await db.collection('challenges')
    .where('location.district', '==', data.location?.district || '')
    .get();

  const duplicateCandidates = findDuplicatesTfIdf(
    `${data.title} ${data.description}`, 
    existingSnap.docs.filter(d => d.id !== snap.id).map(d => ({ id: d.id, title: d.data().title, description: d.data().description }))
  );

  let status = duplicateCandidates.length > 0 ? 'under_review' : data.status || 'submitted';
  let assignedUniversityId = data.assignedUniversityId || null;
  let assignedUniversityName = data.assignedUniversityName || null;
  let routingReason = null;
  let routingMatchScore = 0;

  // Auto-route if no duplicates are found and it hasn't been routed yet
  if (status !== 'under_review' && !assignedUniversityId) {
    const universitiesSnap = await db.collection('users').where('role', '==', 'university').get();
    const universities = universitiesSnap.docs.map(d => ({ id: d.id, name: d.data().name, capabilities: d.data().capabilities || [], district: d.data().district }));
    
    const routing = routeToUniversity({ 
      category: suggestions[0].category, 
      district: data.location?.district || '', 
      tags: suggestions.map(s => s.category) 
    }, universities);

    if (routing.universityId) {
      assignedUniversityId = routing.universityId;
      assignedUniversityName = routing.universityName;
      routingReason = routing.reason;
      routingMatchScore = routing.ranked[0]?.matchScore || 0;
      status = 'routed';
    }
  }

  await snap.ref.update({
    category: suggestions[0].category,
    suggestedCategories: suggestions.map((s) => s.category),
    priority,
    priorityScore: score,
    duplicateCandidates,
    status,
    assignedUniversityId,
    assignedUniversityName,
    routingReason,
    routingMatchScore,
    updatedAt: Date.now()
  });
});

// ---------------------------------------------------------------------------
// Trigger: notify the citizen whenever their challenge's status changes.
// ---------------------------------------------------------------------------
exports.notifyOnChallengeStatusChange = onDocumentUpdated('challenges/{challengeId}', async (event) => {
  const before = event.data.before.data();
  const after = event.data.after.data();
  if (before.status === after.status) return;

  await db.collection('notifications').add({
    userId: after.submittedBy,
    title: 'Your challenge status updated',
    message: `"${after.title}" is now "${after.status.replaceAll('_', ' ')}".`,
    type: 'challenge',
    link: '/citizen',
    read: false,
    createdAt: Date.now()
  });
});

// ---------------------------------------------------------------------------
// Trigger: notify a project's team + industry partners on status change.
// ---------------------------------------------------------------------------
exports.notifyOnProjectStatusChange = onDocumentUpdated('projects/{projectId}', async (event) => {
  const before = event.data.before.data();
  const after = event.data.after.data();
  if (before.status === after.status) return;

  const recipients = new Set([
    ...(after.team || []).map((m) => m.uid),
    ...(after.industryPartners || []).map((p) => p.uid)
  ]);

  const batch = db.batch();
  recipients.forEach((uid) => {
    if (!uid) return;
    const ref = db.collection('notifications').doc();
    batch.set(ref, {
      userId: uid,
      title: 'Project status updated',
      message: `"${after.title}" moved to "${after.status.replaceAll('_', ' ')}".`,
      type: 'project',
      link: `/projects/${event.params.projectId}`,
      read: false,
      createdAt: Date.now()
    });
  });
  await batch.commit();
});

// ---------------------------------------------------------------------------
// Scheduled: weekly digest to admins summarizing pending triage queue size.
// ---------------------------------------------------------------------------
exports.weeklyAdminDigest = onSchedule('every monday 09:00', async () => {
  const pending = await db.collection('challenges').where('status', 'in', ['submitted', 'under_review']).get();
  const admins = await db.collection('users').where('role', '==', 'admin').get();

  const batch = db.batch();
  admins.docs.forEach((a) => {
    const ref = db.collection('notifications').doc();
    batch.set(ref, {
      userId: a.id,
      title: 'Weekly triage digest',
      message: `${pending.size} challenge(s) awaiting review this week.`,
      type: 'system',
      link: '/admin',
      read: false,
      createdAt: Date.now()
    });
  });
  await batch.commit();
});
