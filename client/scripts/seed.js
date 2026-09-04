/**
 * One-off seed script for local development.
 * Requires a service account key: download it from
 * Firebase Console > Project Settings > Service Accounts > Generate new private key,
 * save as scripts/serviceAccountKey.json (already gitignored), then run:
 *
 *   node scripts/seed.js
 */
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();
const auth = admin.auth();

const UNIVERSITIES = [
  { email: 'iit.delhi@example.edu', name: 'IIT Delhi', capabilities: ['Water & Sanitation', 'Urban Infrastructure'], district: 'New Delhi', state: 'Delhi' },
  { email: 'nit.trichy@example.edu', name: 'NIT Tiruchirappalli', capabilities: ['Agriculture & Rural Livelihood', 'Energy & Environment'], district: 'Tiruchirappalli', state: 'Tamil Nadu' },
  { email: 'aiims.jodhpur@example.edu', name: 'AIIMS Jodhpur', capabilities: ['Healthcare & Public Health', 'Women & Child Welfare'], district: 'Jodhpur', state: 'Rajasthan' }
];

const CHALLENGES = [
  {
    title: 'Recurring waterlogging near Sector 12 market',
    description: 'Every monsoon, drainage near the Sector 12 market floods for days, cutting off vendor access and creating health hazards for thousands of residents.',
    district: 'New Delhi',
    state: 'Delhi'
  },
  {
    title: 'Crop yield decline due to soil salinity',
    description: 'Farmers across three villages report a steady decline in crop yield, suspected to be linked to rising soil salinity from irrigation practices.',
    district: 'Tiruchirappalli',
    state: 'Tamil Nadu'
  }
];

async function main() {
  for (const u of UNIVERSITIES) {
    const user = await auth.createUser({ email: u.email, password: 'ChangeMe123!', displayName: u.name }).catch(async (e) => {
      if (e.code === 'auth/email-already-exists') return auth.getUserByEmail(u.email);
      throw e;
    });
    await db.collection('users').doc(user.uid).set({
      uid: user.uid,
      name: u.name,
      email: u.email,
      role: 'university',
      organization: u.name,
      district: u.district,
      state: u.state,
      capabilities: u.capabilities,
      verified: true,
      createdAt: Date.now()
    });
    console.log(`Seeded university: ${u.name}`);
  }

  for (const c of CHALLENGES) {
    await db.collection('challenges').add({
      ...c,
      category: 'Other',
      suggestedCategories: [],
      tags: [],
      priority: 'medium',
      status: 'submitted',
      location: { lat: 0, lng: 0, address: '', district: c.district, state: c.state },
      mediaUrls: [],
      submittedBy: 'seed-script',
      submitterName: 'Demo Citizen',
      submitterType: 'citizen',
      duplicateOf: null,
      duplicateCandidates: [],
      assignedUniversityId: null,
      assignedUniversityName: null,
      projectId: null,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    console.log(`Seeded challenge: ${c.title}`);
  }

  console.log('Done. The AI triage Cloud Function will categorize these challenges automatically once deployed.');
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
