// ---------------------------------------------------------------------------
// Core data model for the Societal Innovation Collaboration Portal (SICP).
// These types mirror the Firestore collections 1:1. Keep this file as the
// single source of truth when you extend the schema.
// ---------------------------------------------------------------------------

export type UserRole =
  | 'citizen'
  | 'pri'          // Panchayati Raj Institution
  | 'ulb'          // Urban Local Body
  | 'department'   // Government department
  | 'university'
  | 'industry'
  | 'admin';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  district?: string;
  state?: string;
  sector?: string;                 // for industry/university: subject domain
  capabilities?: string[];         // for universities: departments/expertise tags
  phone?: string;
  photoUrl?: string;
  verified: boolean;
  createdAt: number;
}

export type ChallengeStatus =
  | 'submitted'
  | 'under_review'
  | 'duplicate'
  | 'rejected'
  | 'validated'
  | 'routed'
  | 'in_progress'
  | 'resolved'
  | 'closed';

export type ChallengePriority = 'low' | 'medium' | 'high' | 'critical';

export interface GeoLocation {
  lat: number;
  lng: number;
  address?: string;
  district: string;
  state: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;                // auto-assigned by AI engine, editable by admin
  suggestedCategories?: string[];  // AI ranked guesses with confidence
  tags: string[];
  priority: ChallengePriority;
  priorityScore?: number;          // 0-100, computed by AI engine
  status: ChallengeStatus;
  location: GeoLocation;
  mediaUrls: string[];
  submittedBy: string;             // uid
  submitterName: string;
  submitterType: UserRole;
  duplicateOf?: string | null;     // challengeId this was merged into
  duplicateCandidates?: { challengeId: string; score: number }[];
  assignedUniversityId?: string | null;
  assignedUniversityName?: string | null;
  routingReason?: string;
  projectId?: string | null;
  createdAt: number;
  updatedAt: number;
}

export type ProjectStatus =
  | 'team_formation'
  | 'proposal_drafting'
  | 'proposal_submitted'
  | 'approved'
  | 'in_progress'
  | 'testing'
  | 'pilot'
  | 'completed'
  | 'discontinued';

export interface TeamMember {
  uid: string;
  name: string;
  role: 'faculty_mentor' | 'student' | 'researcher' | 'industry_partner' | 'coordinator';
  discipline?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description?: string;
  dueDate: number;
  completedDate?: number | null;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  deliverableUrl?: string;
}

export interface IndustryPartner {
  uid: string;
  organization: string;
  partnershipType: 'mentoring' | 'co_development' | 'funding' | 'prototyping' | 'pilot_implementation' | 'technology_transfer';
  contribution?: string;
  amount?: number;
}

export interface IPRecord {
  id: string;
  type: 'patent' | 'copyright' | 'trademark' | 'trade_secret' | 'publication';
  title: string;
  status: 'filed' | 'published' | 'granted';
  referenceNumber?: string;
  date: number;
}

export interface Project {
  id: string;
  challengeId: string;
  title: string;
  summary: string;
  universityId: string;
  universityName: string;
  team: TeamMember[];
  industryPartners: IndustryPartner[];
  status: ProjectStatus;
  milestones: Milestone[];
  budgetRequested?: number;
  budgetApproved?: number;
  testingOutcomes?: string;
  ipRecords: IPRecord[];
  startupCreated?: boolean;
  startupName?: string;
  implementationStatus?: 'not_started' | 'pilot' | 'scaled' | 'adopted_by_govt';
  district: string;
  state: string;
  category: string;
  createdAt: number;
  updatedAt: number;
}

export interface NotificationDoc {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'challenge' | 'project' | 'system' | 'partnership';
  link?: string;
  read: boolean;
  createdAt: number;
}

export const CATEGORY_TAXONOMY = [
  'Water & Sanitation',
  'Agriculture & Rural Livelihood',
  'Healthcare & Public Health',
  'Education & Skilling',
  'Urban Infrastructure',
  'Transportation & Mobility',
  'Energy & Environment',
  'Waste Management',
  'Digital Governance & IT',
  'Disaster Management',
  'Women & Child Welfare',
  'Public Safety & Law and Order',
  'Employment & Entrepreneurship',
  'Other'
] as const;

export type Category = (typeof CATEGORY_TAXONOMY)[number];
