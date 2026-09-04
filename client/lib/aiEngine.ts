// ---------------------------------------------------------------------------
// AI-enabled problem management engine.
//
// This module ships a transparent, dependency-free rules/keyword classifier
// so the app works fully offline and out of the box. In production, swap
// `categorize()` and `findDuplicates()` for calls to a real LLM (Claude) or
// a hosted embeddings model from within functions/index.js — the function
// signatures are already shaped for that (see the comment at the bottom).
// ---------------------------------------------------------------------------

import { CATEGORY_TAXONOMY, type Category, type Challenge } from './types';

const KEYWORD_MAP: Record<Category, string[]> = {
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

export interface CategorySuggestion {
  category: Category;
  confidence: number; // 0-1
}

/** Rule-based multi-label categorizer with confidence scores, ranked descending. */
export function categorize(title: string, description: string): CategorySuggestion[] {
  const text = `${title} ${description}`.toLowerCase();
  const scores: CategorySuggestion[] = CATEGORY_TAXONOMY.filter((c) => c !== 'Other').map((category) => {
    const words = KEYWORD_MAP[category];
    const hits = words.filter((w) => text.includes(w)).length;
    const confidence = words.length ? Math.min(1, hits / Math.min(3, words.length)) : 0;
    return { category, confidence };
  });

  scores.sort((a, b) => b.confidence - a.confidence);
  const top = scores.filter((s) => s.confidence > 0);
  if (top.length === 0) {
    return [{ category: 'Other', confidence: 0.3 }];
  }
  return top.slice(0, 3);
}

/** Heuristic priority scorer (0-100) based on urgency language, scale, and safety risk. */
export function scorePriority(title: string, description: string): { score: number; priority: Challenge['priority'] } {
  const text = `${title} ${description}`.toLowerCase();
  let score = 30;
  score += URGENT_WORDS.filter((w) => text.includes(w)).length * 15;
  score += SCALE_WORDS.filter((w) => text.includes(w)).length * 10;
  if (text.includes('child') || text.includes('women') || text.includes('elderly')) score += 8;
  score = Math.min(100, score);

  let priority: Challenge['priority'] = 'low';
  if (score >= 80) priority = 'critical';
  else if (score >= 60) priority = 'high';
  else if (score >= 40) priority = 'medium';

  return { score, priority };
}

/** Token-based Jaccard similarity, used for near-duplicate detection. */
function jaccardSimilarity(a: string, b: string): number {
  const tokenize = (s: string) =>
    new Set(
      s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3)
    );
  const setA = tokenize(a);
  const setB = tokenize(b);
  const intersection = new Set([...setA].filter((x) => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

export interface DuplicateCandidate {
  challengeId: string;
  score: number;
}

/** Compares a new challenge's title+description against existing challenges (ideally pre-filtered by district/category). */
export function findDuplicates(
  newChallenge: { title: string; description: string },
  existing: { id: string; title: string; description: string }[],
  threshold = 0.35
): DuplicateCandidate[] {
  return existing
    .map((c) => ({
      challengeId: c.id,
      score: jaccardSimilarity(`${newChallenge.title} ${newChallenge.description}`, `${c.title} ${c.description}`)
    }))
    .filter((c) => c.score >= threshold)
    .sort((a, b) => b.score - a.score);
}

export interface UniversityCandidate {
  id: string;
  name: string;
  capabilities: string[];
  district?: string;
}

export interface RoutingResult {
  universityId: string | null;
  universityName: string | null;
  reason: string;
  ranked: { id: string; name: string; matchScore: number }[];
}

/** Routes a validated, categorized challenge to the best-fit university based on declared capabilities and locality. */
export function routeToUniversity(
  challenge: { category: string; district: string; tags: string[] },
  universities: UniversityCandidate[]
): RoutingResult {
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
    return { universityId: null, universityName: null, reason: 'No university with matching capabilities found — routed to admin for manual assignment.', ranked };
  }
  return {
    universityId: best.id,
    universityName: best.name,
    reason: `Matched on subject expertise in "${challenge.category}"${best.matchScore > 1 ? ' with locality bonus' : ''}.`,
    ranked
  };
}

// ---------------------------------------------------------------------------
// Upgrading to a real LLM: replace the body of `categorize` with a call such
// as:
//
//   const res = await fetch('https://api.anthropic.com/v1/messages', {
//     method: 'POST',
//     headers: { 'content-type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY!, 'anthropic-version': '2023-06-01' },
//     body: JSON.stringify({
//       model: 'claude-sonnet-4-6',
//       max_tokens: 300,
//       messages: [{ role: 'user', content: `Classify this civic challenge into one of: ${CATEGORY_TAXONOMY.join(', ')}. Return JSON only: {"category": "...", "confidence": 0-1}. Title: ${title}\nDescription: ${description}` }]
//     })
//   });
//
// This is best done inside functions/index.js (server-side) so the API key
// never reaches the client.
// ---------------------------------------------------------------------------
