/**
 * SocialConnect — Firestore Database Initializer
 * ================================================
 * This script sets up ALL collections in Firestore with proper structure
 * and seeds them with realistic demo data for the hackathon demo.
 *
 * Collections created:
 *  1. users          — Auth profiles (citizen, PRI, ULB, department, university, industry, admin)
 *  2. challenges     — Citizen-submitted problems (with AI categorization fields)
 *  3. projects       — University-led solution projects linked to challenges
 *  4. notifications  — In-app notifications per user
 *  5. analytics      — Aggregated stats snapshots
 *  6. partnerships   — Industry ↔ University partnership records
 *  7. feedback       — Citizen feedback on resolved challenges
 *
 * Usage:
 *   node scripts/init-firestore.js
 *
 * Prerequisites:
 *   1. npm install firebase-admin  (inside the /client folder)
 *   2. Download a service account key JSON from Firebase Console →
 *      Project Settings → Service Accounts → Generate new private key
 *   3. Set env var:  GOOGLE_APPLICATION_CREDENTIALS=path/to/serviceAccountKey.json
 *      OR place the file at: ./scripts/serviceAccountKey.json
 */

const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// ── Initialise Admin SDK ──────────────────────────────────────────────────────
let credential;
const keyPath = path.join(__dirname, 'serviceAccountKey.json');
if (fs.existsSync(keyPath)) {
  const serviceAccount = require(keyPath);
  credential = admin.credential.cert(serviceAccount);
} else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  credential = admin.credential.applicationDefault();
} else {
  console.error('❌  No Firebase credentials found.');
  console.error('   Place serviceAccountKey.json in ./scripts/ or set GOOGLE_APPLICATION_CREDENTIALS.');
  process.exit(1);
}

admin.initializeApp({ credential, projectId: 'socialconnect-14d2a' });
const db = admin.firestore();

// ── Helpers ───────────────────────────────────────────────────────────────────
const now = Date.now();
const ago = (days) => now - days * 86_400_000;

async function upsert(collection, id, data) {
  await db.collection(collection).doc(id).set(data, { merge: true });
  console.log(`  ✓  ${collection}/${id}`);
}

async function createCollection(name, docs) {
  console.log(`\n📁  Creating collection: ${name}`);
  for (const [id, data] of Object.entries(docs)) {
    await upsert(name, id, data);
  }
}

// ── 1. USERS ──────────────────────────────────────────────────────────────────
const USERS = {
  // Admin
  'admin-001': {
    uid: 'admin-001',
    name: 'Priya Sharma (Admin)',
    email: 'admin@socialconnect.gov.in',
    role: 'admin',
    organization: 'SocialConnect Platform',
    district: 'Ranchi',
    state: 'Jharkhand',
    sector: 'Governance',
    capabilities: [],
    verified: true,
    createdAt: ago(60),
  },

  // Citizens
  'citizen-001': {
    uid: 'citizen-001',
    name: 'Ramesh Kumar',
    email: 'ramesh.kumar@gmail.com',
    role: 'citizen',
    organization: '',
    district: 'Dhanbad',
    state: 'Jharkhand',
    sector: '',
    capabilities: [],
    verified: true,
    createdAt: ago(30),
  },
  'citizen-002': {
    uid: 'citizen-002',
    name: 'Sunita Devi',
    email: 'sunita.devi@gmail.com',
    role: 'citizen',
    organization: '',
    district: 'Bokaro',
    state: 'Jharkhand',
    sector: '',
    capabilities: [],
    verified: true,
    createdAt: ago(20),
  },

  // PRI — Panchayati Raj Institution
  'pri-001': {
    uid: 'pri-001',
    name: 'Gram Panchayat Hesalong',
    email: 'gp.hesalong@jharkhand.gov.in',
    role: 'pri',
    organization: 'Gram Panchayat Hesalong',
    district: 'Khunti',
    state: 'Jharkhand',
    sector: 'Rural Development',
    capabilities: [],
    verified: true,
    createdAt: ago(45),
  },

  // ULB — Urban Local Body
  'ulb-001': {
    uid: 'ulb-001',
    name: 'Dhanbad Municipal Corporation',
    email: 'commissioner@dhanbadmc.gov.in',
    role: 'ulb',
    organization: 'Dhanbad Municipal Corporation',
    district: 'Dhanbad',
    state: 'Jharkhand',
    sector: 'Urban Infrastructure',
    capabilities: [],
    verified: true,
    createdAt: ago(50),
  },

  // Government Department
  'dept-001': {
    uid: 'dept-001',
    name: 'Dept. of Drinking Water & Sanitation',
    email: 'dwsm@jharkhand.gov.in',
    role: 'department',
    organization: 'Department of Drinking Water & Sanitation, Jharkhand',
    district: 'Ranchi',
    state: 'Jharkhand',
    sector: 'Water & Sanitation',
    capabilities: [],
    verified: true,
    createdAt: ago(55),
  },

  // Universities / HEIs
  'univ-001': {
    uid: 'univ-001',
    name: 'BIT Mesra',
    email: 'research@bitmesra.ac.in',
    role: 'university',
    organization: 'Birla Institute of Technology, Mesra',
    district: 'Ranchi',
    state: 'Jharkhand',
    sector: 'Engineering & Technology',
    capabilities: [
      'Water & Sanitation',
      'Digital Governance & IT',
      'Energy & Environment',
      'Transportation & Mobility',
      'Urban Infrastructure',
    ],
    verified: true,
    createdAt: ago(40),
  },
  'univ-002': {
    uid: 'univ-002',
    name: 'BAU Ranchi',
    email: 'vc@bau.ac.in',
    role: 'university',
    organization: 'Birsa Agricultural University, Ranchi',
    district: 'Ranchi',
    state: 'Jharkhand',
    sector: 'Agriculture',
    capabilities: [
      'Agriculture & Rural Livelihood',
      'Water & Sanitation',
      'Waste Management',
      'Women & Child Welfare',
    ],
    verified: true,
    createdAt: ago(38),
  },
  'univ-003': {
    uid: 'univ-003',
    name: 'RIMS Ranchi',
    email: 'director@rims.jharkhand.gov.in',
    role: 'university',
    organization: 'Rajendra Institute of Medical Sciences',
    district: 'Ranchi',
    state: 'Jharkhand',
    sector: 'Healthcare',
    capabilities: [
      'Healthcare & Public Health',
      'Women & Child Welfare',
      'Disaster Management',
    ],
    verified: true,
    createdAt: ago(35),
  },

  // Industry Partners
  'industry-001': {
    uid: 'industry-001',
    name: 'Jharcraft Agritech Pvt Ltd',
    email: 'csr@jharcraft.in',
    role: 'industry',
    organization: 'Jharcraft Agritech Pvt Ltd',
    district: 'Ranchi',
    state: 'Jharkhand',
    sector: 'AgriTech',
    capabilities: ['Agriculture & Rural Livelihood', 'Employment & Entrepreneurship'],
    verified: true,
    createdAt: ago(25),
  },
  'industry-002': {
    uid: 'industry-002',
    name: 'TechMahindra CSR',
    email: 'csr@techmahindra.com',
    role: 'industry',
    organization: 'Tech Mahindra Foundation',
    district: 'Ranchi',
    state: 'Jharkhand',
    sector: 'IT & Digital',
    capabilities: ['Digital Governance & IT', 'Education & Skilling'],
    verified: true,
    createdAt: ago(22),
  },
};

// ── 2. CHALLENGES ─────────────────────────────────────────────────────────────
const CHALLENGES = {
  'challenge-001': {
    id: 'challenge-001',
    title: 'Waterlogging near Dhanbad market during monsoon',
    description:
      'Every monsoon season the stretch between Bank More and Hirapur market floods, affecting 5,000+ daily commuters and shopkeepers. The storm-water drains are choked with silt and garbage. Health incidents (skin infections, dengue) have increased 30% in this area.',
    category: 'Water & Sanitation',
    suggestedCategories: ['Water & Sanitation', 'Urban Infrastructure', 'Waste Management'],
    tags: ['waterlogging', 'drainage', 'monsoon', 'urban', 'dengue'],
    priority: 'high',
    priorityScore: 72,
    status: 'routed',
    location: { lat: 23.7957, lng: 86.4304, district: 'Dhanbad', state: 'Jharkhand', address: 'Bank More, Dhanbad' },
    mediaUrls: [],
    submittedBy: 'citizen-001',
    submitterName: 'Ramesh Kumar',
    submitterType: 'citizen',
    duplicateCandidates: [],
    assignedUniversityId: 'univ-001',
    assignedUniversityName: 'BIT Mesra',
    routingReason: 'Matched on expertise in "Water & Sanitation" + locality.',
    routingMatchScore: 1.25,
    projectId: 'project-001',
    createdAt: ago(14),
    updatedAt: ago(10),
  },
  'challenge-002': {
    id: 'challenge-002',
    title: 'Low paddy yield due to soil degradation in Khunti',
    description:
      'Farmers in Hesalong panchayat have seen a 40% drop in paddy yield over three years. Soil tests indicate micronutrient deficiency and poor water retention. Lack of awareness about soil health cards is a major gap.',
    category: 'Agriculture & Rural Livelihood',
    suggestedCategories: ['Agriculture & Rural Livelihood', 'Water & Sanitation'],
    tags: ['agriculture', 'paddy', 'soil', 'farmers', 'rural'],
    priority: 'critical',
    priorityScore: 88,
    status: 'in_progress',
    location: { lat: 23.0709, lng: 85.2792, district: 'Khunti', state: 'Jharkhand', address: 'Hesalong, Khunti' },
    mediaUrls: [],
    submittedBy: 'pri-001',
    submitterName: 'Gram Panchayat Hesalong',
    submitterType: 'pri',
    duplicateCandidates: [],
    assignedUniversityId: 'univ-002',
    assignedUniversityName: 'BAU Ranchi',
    routingReason: 'Matched on expertise in "Agriculture & Rural Livelihood".',
    routingMatchScore: 1.0,
    projectId: 'project-002',
    createdAt: ago(20),
    updatedAt: ago(5),
  },
  'challenge-003': {
    id: 'challenge-003',
    title: 'Malnutrition among children under-5 in Bokaro slums',
    description:
      'Surveys by local NGOs show 35% of children under 5 in Chas municipal ward 12 are severely malnourished. Anganwadi coverage is incomplete and ICDS supply chain is broken for the last 6 months.',
    category: 'Healthcare & Public Health',
    suggestedCategories: ['Healthcare & Public Health', 'Women & Child Welfare'],
    tags: ['malnutrition', 'children', 'healthcare', 'anganwadi', 'icds'],
    priority: 'critical',
    priorityScore: 95,
    status: 'validated',
    location: { lat: 23.6693, lng: 85.9606, district: 'Bokaro', state: 'Jharkhand', address: 'Chas Ward 12, Bokaro' },
    mediaUrls: [],
    submittedBy: 'citizen-002',
    submitterName: 'Sunita Devi',
    submitterType: 'citizen',
    duplicateCandidates: [],
    assignedUniversityId: 'univ-003',
    assignedUniversityName: 'RIMS Ranchi',
    routingReason: 'Matched on expertise in "Healthcare & Public Health".',
    routingMatchScore: 1.0,
    projectId: null,
    createdAt: ago(7),
    updatedAt: ago(3),
  },
  'challenge-004': {
    id: 'challenge-004',
    title: 'No safe drinking water in 3 villages of Bokaro',
    description:
      'Villages Jharia Tola, Bandh Tola and Kali Tola in Bokaro district have no piped water supply. Residents walk 3km to fetch water from an unsafe pond. Iron contamination is 5x the safe limit.',
    category: 'Water & Sanitation',
    suggestedCategories: ['Water & Sanitation', 'Healthcare & Public Health'],
    tags: ['drinking water', 'contamination', 'iron', 'rural', 'bokaro'],
    priority: 'high',
    priorityScore: 80,
    status: 'submitted',
    location: { lat: 23.5993, lng: 86.0476, district: 'Bokaro', state: 'Jharkhand', address: 'Jharia Tola, Bokaro' },
    mediaUrls: [],
    submittedBy: 'ulb-001',
    submitterName: 'Dhanbad Municipal Corporation',
    submitterType: 'ulb',
    duplicateCandidates: [],
    assignedUniversityId: null,
    assignedUniversityName: null,
    routingReason: null,
    routingMatchScore: 0,
    projectId: null,
    createdAt: ago(2),
    updatedAt: ago(2),
  },
};

// ── 3. PROJECTS ───────────────────────────────────────────────────────────────
const PROJECTS = {
  'project-001': {
    id: 'project-001',
    challengeId: 'challenge-001',
    title: 'Smart Storm-Water Management System — Dhanbad',
    summary:
      'Design and prototype an IoT-enabled drain monitoring + predictive flood alert system for the Dhanbad market area, integrated with DMC\'s control room.',
    universityId: 'univ-001',
    universityName: 'BIT Mesra',
    team: [
      { uid: 'univ-001', name: 'Prof. A. Sinha', role: 'faculty_mentor', discipline: 'Civil Engineering' },
      { uid: 'student-101', name: 'Vikram Mehta', role: 'student', discipline: 'Electronics' },
      { uid: 'student-102', name: 'Pooja Tiwari', role: 'student', discipline: 'Computer Science' },
    ],
    industryPartners: [
      { uid: 'industry-002', organization: 'Tech Mahindra Foundation', partnershipType: 'co_development', contribution: 'IoT sensor kits + cloud platform', amount: 500000 },
    ],
    status: 'in_progress',
    milestones: [
      { id: 'm1', title: 'Field survey & drain mapping', description: 'Survey 12km of storm drains', dueDate: ago(-5), completedDate: ago(3), status: 'completed' },
      { id: 'm2', title: 'IoT sensor prototype', description: 'Deploy 10 water-level sensors', dueDate: ago(-15), completedDate: null, status: 'in_progress' },
      { id: 'm3', title: 'Alert dashboard (MVP)', description: 'Web dashboard for DMC control room', dueDate: ago(-30), completedDate: null, status: 'pending' },
      { id: 'm4', title: 'Pilot deployment', description: 'Live pilot for 2 monsoon weeks', dueDate: ago(-60), completedDate: null, status: 'pending' },
    ],
    budgetRequested: 1200000,
    budgetApproved: 900000,
    testingOutcomes: null,
    ipRecords: [],
    startupCreated: false,
    implementationStatus: 'not_started',
    district: 'Dhanbad',
    state: 'Jharkhand',
    category: 'Water & Sanitation',
    createdAt: ago(10),
    updatedAt: ago(1),
  },
  'project-002': {
    id: 'project-002',
    challengeId: 'challenge-002',
    title: 'Soil Health Restoration Programme — Khunti',
    summary:
      'Community soil testing, personalized advisory using mobile app, and distribution of bio-input kits to 300 marginal farmers in Hesalong panchayat.',
    universityId: 'univ-002',
    universityName: 'BAU Ranchi',
    team: [
      { uid: 'univ-002', name: 'Dr. R. Oraon', role: 'faculty_mentor', discipline: 'Soil Science' },
      { uid: 'student-201', name: 'Sanjay Munda', role: 'student', discipline: 'Agriculture' },
      { uid: 'industry-001', name: 'Jharcraft Agritech', role: 'industry_partner', discipline: 'AgriTech' },
    ],
    industryPartners: [
      { uid: 'industry-001', organization: 'Jharcraft Agritech Pvt Ltd', partnershipType: 'pilot_implementation', contribution: 'Bio-input kits + field advisors', amount: 300000 },
    ],
    status: 'proposal_submitted',
    milestones: [
      { id: 'm1', title: 'Baseline soil testing', description: 'Collect & test 500 soil samples', dueDate: ago(-7), completedDate: ago(2), status: 'completed' },
      { id: 'm2', title: 'Mobile app development', description: 'Advisory app for farmers', dueDate: ago(-30), completedDate: null, status: 'in_progress' },
      { id: 'm3', title: 'Farmer training camps', description: 'Train 300 farmers in 4 villages', dueDate: ago(-45), completedDate: null, status: 'pending' },
    ],
    budgetRequested: 750000,
    budgetApproved: null,
    testingOutcomes: null,
    ipRecords: [],
    startupCreated: false,
    implementationStatus: 'not_started',
    district: 'Khunti',
    state: 'Jharkhand',
    category: 'Agriculture & Rural Livelihood',
    createdAt: ago(5),
    updatedAt: ago(1),
  },
};

// ── 4. NOTIFICATIONS ──────────────────────────────────────────────────────────
const NOTIFICATIONS = {
  'notif-001': {
    id: 'notif-001',
    userId: 'citizen-001',
    title: 'Challenge Routed to University',
    message: 'Your challenge "Waterlogging near Dhanbad market" has been routed to BIT Mesra for solution development.',
    type: 'challenge',
    link: '/challenges/challenge-001',
    read: false,
    createdAt: ago(10),
  },
  'notif-002': {
    id: 'notif-002',
    userId: 'citizen-001',
    title: 'Project Started',
    message: 'BIT Mesra has started working on "Smart Storm-Water Management System". Track progress on your dashboard.',
    type: 'project',
    link: '/challenges/challenge-001',
    read: true,
    createdAt: ago(8),
  },
  'notif-003': {
    id: 'notif-003',
    userId: 'citizen-002',
    title: 'Challenge Validated',
    message: 'Your challenge "Malnutrition among children under-5" has been validated by the admin team and is being prioritised.',
    type: 'challenge',
    link: '/challenges/challenge-003',
    read: false,
    createdAt: ago(3),
  },
  'notif-004': {
    id: 'notif-004',
    userId: 'univ-001',
    title: 'New Challenge Assigned',
    message: 'A new high-priority challenge in Water & Sanitation has been assigned to BIT Mesra.',
    type: 'challenge',
    link: '/challenges/challenge-001',
    read: false,
    createdAt: ago(10),
  },
  'notif-005': {
    id: 'notif-005',
    userId: 'industry-002',
    title: 'Partnership Opportunity',
    message: 'BIT Mesra\'s project "Smart Storm-Water Management System" is looking for an IoT industry partner.',
    type: 'partnership',
    link: '/projects/project-001',
    read: false,
    createdAt: ago(9),
  },
};

// ── 5. ANALYTICS ──────────────────────────────────────────────────────────────
const ANALYTICS = {
  'summary-latest': {
    id: 'summary-latest',
    generatedAt: now,
    totalChallenges: Object.keys(CHALLENGES).length,
    totalProjects: Object.keys(PROJECTS).length,
    totalUsers: Object.keys(USERS).length,
    challengesByStatus: {
      submitted: 1,
      under_review: 0,
      validated: 1,
      routed: 1,
      in_progress: 1,
      resolved: 0,
    },
    challengesByCategory: {
      'Water & Sanitation': 2,
      'Agriculture & Rural Livelihood': 1,
      'Healthcare & Public Health': 1,
    },
    challengesByDistrict: {
      Dhanbad: 1,
      Khunti: 1,
      Bokaro: 2,
    },
    projectsByStatus: {
      proposal_submitted: 1,
      in_progress: 1,
    },
    totalBudgetSanctioned: 900000,
    totalBudgetRequested: 1950000,
    universitiesActive: 2,
    industryPartnersActive: 2,
  },
};

// ── 6. PARTNERSHIPS ───────────────────────────────────────────────────────────
const PARTNERSHIPS = {
  'partnership-001': {
    id: 'partnership-001',
    industryId: 'industry-002',
    industryName: 'Tech Mahindra Foundation',
    universityId: 'univ-001',
    universityName: 'BIT Mesra',
    projectId: 'project-001',
    type: 'co_development',
    status: 'active',
    contribution: 'IoT sensor kits + AWS IoT Core platform (6 months)',
    amountCommitted: 500000,
    amountReleased: 200000,
    startDate: ago(8),
    endDate: ago(-90),
    createdAt: ago(9),
    updatedAt: ago(1),
  },
  'partnership-002': {
    id: 'partnership-002',
    industryId: 'industry-001',
    industryName: 'Jharcraft Agritech Pvt Ltd',
    universityId: 'univ-002',
    universityName: 'BAU Ranchi',
    projectId: 'project-002',
    type: 'pilot_implementation',
    status: 'pending_approval',
    contribution: 'Bio-input kits + 3 field extension officers',
    amountCommitted: 300000,
    amountReleased: 0,
    startDate: null,
    endDate: null,
    createdAt: ago(4),
    updatedAt: ago(1),
  },
};

// ── 7. FEEDBACK ───────────────────────────────────────────────────────────────
const FEEDBACK = {
  'feedback-001': {
    id: 'feedback-001',
    challengeId: 'challenge-001',
    projectId: 'project-001',
    submittedBy: 'citizen-001',
    submitterName: 'Ramesh Kumar',
    rating: 4,
    comment: 'Glad to see BIT Mesra taking this seriously. The sensor installations have started near Bank More. Hoping to see real results before next monsoon.',
    createdAt: ago(5),
  },
};

// ── Main Execution ────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🚀  SocialConnect — Firestore Initialization\n' + '='.repeat(50));

  await createCollection('users', USERS);
  await createCollection('challenges', CHALLENGES);
  await createCollection('projects', PROJECTS);
  await createCollection('notifications', NOTIFICATIONS);
  await createCollection('analytics', ANALYTICS);
  await createCollection('partnerships', PARTNERSHIPS);
  await createCollection('feedback', FEEDBACK);

  console.log('\n✅  All collections initialized successfully!');
  console.log('\n📊  Summary:');
  console.log(`   users:         ${Object.keys(USERS).length} documents`);
  console.log(`   challenges:    ${Object.keys(CHALLENGES).length} documents`);
  console.log(`   projects:      ${Object.keys(PROJECTS).length} documents`);
  console.log(`   notifications: ${Object.keys(NOTIFICATIONS).length} documents`);
  console.log(`   analytics:     ${Object.keys(ANALYTICS).length} documents`);
  console.log(`   partnerships:  ${Object.keys(PARTNERSHIPS).length} documents`);
  console.log(`   feedback:      ${Object.keys(FEEDBACK).length} documents`);
  console.log('\n🎯  7 roles seeded, 4 challenges, 2 active projects.');
  console.log('   Open Firebase Console → Firestore to verify.\n');

  process.exit(0);
}

main().catch((err) => {
  console.error('\n❌  Initialization failed:', err.message);
  process.exit(1);
});
