# Implementation Plan — SocialConnect (SICP)

Phased plan for the Next.js 14 + Firebase implementation, structured according to the 7 required modules of the expected solution.

**Status legend:** ✅ done · 🔶 partial · ⬜ todo

---

## Phase 0 — Foundation & Setup ✅
- [x] Scaffold Next.js 14 App Router + TypeScript + Tailwind project
- [x] Configure Firebase Auth, Firestore, and Storage
- [x] Initialize Firebase in `lib/firebase.ts` using `.env.local`
- [x] Set up Firestore security rules and schemas (`lib/types.ts`) for 7 roles (citizen, pri, ulb, department, university, industry, admin)
- [x] Create generic shared UI components (Navbar, Footer, Layouts)

## Phase 1 — Component 1: Citizen Engagement Module 🔶
*Enable individuals, community groups, PRIs, ULBs, and govt departments to submit societal challenges.*
- [x] Build `/citizen` dashboard and challenge submission form (`components/ChallengeForm.tsx`)
- [x] Implement multimedia upload (photos/videos/documents) to Firebase Storage
- [x] Capture geographical location and district/state mapping
- [x] Display public challenge feed at `/challenges`
- [ ] ⬜ Add a "My Submissions" view for citizens to track the status of their issues
- [ ] ⬜ Implement anonymous or OTP-based quick submission flow
- [ ] ⬜ Ensure the submission interface is highly intuitive on mobile devices (Mobile-first UI)
- [ ] ⬜ Verify role-specific UI nuances for PRIs, ULBs, and government departments

## Phase 2 — Component 2: AI-Enabled Problem Management Module 🔶
*Automatically categorize, prioritize, deduplicate, and route challenges.*
- [x] Build keyword-map classifier (14 domains) for automatic categorization
- [x] Create heuristic priority scorer (urgency, scale, safety risk)
- [x] Implement Jaccard-similarity for basic duplicate detection
- [x] Set up Admin validation console (`/admin`) to review and override AI decisions
- [ ] ⬜ Upgrade auto-categorization to LLM-based classification (via Anthropic/OpenAI on Firebase Functions)
- [ ] ⬜ Enhance deduplication with vector embeddings (cosine similarity) instead of Jaccard
- [ ] ⬜ Finalize automated routing logic based on university capability matching

## Phase 3 — Component 3: University Collaboration Module 🔶
*Allow HEIs to review challenges, form teams, assign mentors, and submit proposals.*
- [x] Create `/university` inbox for universities to view routed challenges
- [x] Build forms to constitute multidisciplinary student/faculty teams
- [x] Implement solution proposal submission workflow
- [ ] ⬜ Add proposal versioning and iterative revision history
- [ ] ⬜ Build a faculty dashboard to manage multiple active project teams

## Phase 4 — Component 4: Industry Partnership Module 🔶
*Facilitate participation by industries, startups, CSRs for mentoring, funding, prototyping, etc.*
- [x] Build `/industry` portal to browse active proposals and projects
- [x] Add actions for industries to offer mentorship, funding, or pilot implementation
- [ ] ⬜ Create structured funding/commitment tracking records
- [ ] ⬜ Develop industry partner profiles showcasing their CSR focus areas and portfolio

## Phase 5 — Component 5: Project Lifecycle Management System ⬜
*Monitor milestones, deliverables, approvals, testing outcomes, and IP generation.*
- [x] Create `/projects/[id]` detail page with timeline UI
- [ ] ⬜ Build structured milestone tracking and document repository per milestone
- [ ] ⬜ Implement multi-stage approval workflows (University → Admin → Industry)
- [ ] ⬜ Add fields to track Intellectual Property (IP) generation and pilot testing outcomes
- [ ] ⬜ Implement a Gantt-style chart for visual project progress

## Phase 6 — Component 6: Visual Analytics Dashboard 🔶
*Provide real-time insights on submissions, participation, trends, outcomes, and impact.*
- [x] Build basic `/dashboard` with Recharts for submissions by domain/district
- [x] Add public `/impact` summary page
- [ ] ⬜ Expand dashboard to show university participation, industry engagement, and project completion rates
- [ ] ⬜ Add tracking for innovation outcomes (patents, startups created, community impact)
- [ ] ⬜ Create specific data views for government departments
- [ ] ⬜ Add CSV/PDF export capability for dashboard reports

## Phase 7 — Component 7: Notification and Communication System 🔶
*Enable seamless interaction among all stakeholders throughout the lifecycle.*
- [x] Implement in-app notification bell and `/notifications` inbox
- [x] Set up basic Cloud Functions to trigger notifications on state changes
- [ ] ⬜ Integrate Email notifications (e.g., via Firebase Trigger Email extension)
- [ ] ⬜ Add threaded commenting within Project details for stakeholder discussions
- [ ] ⬜ Implement Push Notifications (FCM) for urgent updates

## Phase 8 — Final Polish & Presentation Readiness ⬜
- [ ] ⬜ End-to-end testing of the complete flow (Citizen -> AI -> Admin -> University -> Industry -> Completion)
- [ ] ⬜ Comprehensive mobile responsiveness audit (Ensure the web app acts as the requested "mobile interface")
- [ ] ⬜ Populate database with **rich, realistic demo data** covering multiple districts of Jharkhand (CRITICAL for showcasing multi-role workflows)
- [ ] ⬜ Final deployment to Firebase Hosting and Functions

---
**Focus for Hackathon Demo:** 
1. **The "Happy Path"**: Ensure one challenge successfully moving through all 7 phases works flawlessly.
2. **The "Wow" Factors**: Polish the AI Categorization (Phase 2), the complex Role-based Workflow, and the Analytics Dashboard (Phase 6).
3. **Demo Data is King**: The platform connects 7 roles; demonstrating it live requires realistic dummy data so evaluators instantly see challenges routed correctly.
