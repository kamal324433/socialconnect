# SocialConnect — Societal Innovation Collaboration Portal (SICP)

## Background
Communities across Jharkhand encounter numerous local challenges related to education, healthcare, agriculture, water management, sanitation, environment, rural livelihoods, accessibility, urban infrastructure, and public service delivery. While citizens are often the first to identify these issues, there is currently no structured mechanism through which they can submit such problems for systematic evaluation and innovation-driven resolution.

At the same time, Higher Education Institutions (HEIs) possess significant academic expertise, research capabilities, and a large pool of students capable of developing practical solutions. Industries and start-ups also have technical expertise, financial resources, and implementation capabilities that can complement academic research. However, collaboration among citizens, universities, and industry remains largely fragmented and project-specific.

The National Education Policy (NEP) 2020 emphasizes experiential learning, multidisciplinary research, innovation, industry collaboration, and community engagement. Establishing a technology-enabled platform that connects societal challenges with academic institutions and industry partners can foster demand-driven innovation while enabling students and researchers to work on real-world problems that create measurable social impact.

## Description
Every year, citizens across Jharkhand identify thousands of local issues that require innovative technological or process-based solutions. These challenges often remain unresolved due to the absence of a centralized platform that enables problem collection, categorization, expert evaluation, institutional assignment, and industry collaboration.

There is a need to develop a digital platform capable of:
- Allowing citizens, community organizations, local bodies, and government agencies to submit societal challenges through an intuitive web and mobile interface, supported by photographs, videos, location details, and relevant documents.
- Automatically categorizing submitted problems based on thematic domains using AI-enabled classification techniques.
- Routing validated problem statements to appropriate universities based on their academic disciplines, research expertise, innovation centres, incubation facilities, and faculty specialization.
- Enabling universities to evaluate submitted challenges, constitute multidisciplinary student and faculty teams, and prepare solution proposals or research projects.
- Facilitating collaboration between universities and industry partners, startups, MSMEs, CSR organizations, research laboratories, and innovation ecosystems for mentorship, funding, prototyping, testing and deployment of solutions.
- Providing workflow management for problem review, institutional allocation, project monitoring, stakeholder communication, milestone tracking, and solution validation.
- Generating dashboards and analytics for government departments to monitor the number of challenges received, domain-wise distribution, institutional participation, industry engagement, project progress, and measurable social outcomes.

The platform should support a transparent and scalable innovation ecosystem that transforms community-driven challenges into research, innovation, entrepreneurship, and deployable solutions.

## Expected Solution (The Seven Modules)
A comprehensive Societal Innovation Collaboration Portal comprising the following components:

| # | Module | Core Function | Route |
|---|--------|---------------|-------|
| 1 | **Citizen Engagement Module** | Submit challenges with multimedia, GPS, & district | `/citizen` |
| 2 | **AI-Enabled Problem Management** | Auto-categorize, prioritize, deduplicate, & route | `/admin`, AI Engine |
| 3 | **University Collaboration Module** | Review challenges, form teams, submit proposals | `/university` |
| 4 | **Industry Partnership Module** | Mentor, co-develop, fund, prototype, tech transfer | `/industry` |
| 5 | **Project Lifecycle Management** | Track milestones, deliverables, approvals, IP | `/projects/[id]` |
| 6 | **Visual Analytics Dashboard** | Real-time insights, completion rates, impact metrics | `/dashboard` |
| 7 | **Notification & Communication System** | Seamless interaction among all stakeholders | `/notifications` |

## Tech Stack
- **Frontend:** Next.js 14 (App Router, TypeScript) + Tailwind CSS
- **Authentication:** Firebase Auth (Email/Password with 7 roles: `citizen`, `pri`, `ulb`, `department`, `university`, `industry`, `admin`)
- **Database:** Firestore (`users`, `challenges`, `projects`, `notifications`)
- **Storage:** Firebase Storage (media uploads, documents)
- **Backend/AI:** Cloud Functions (2nd gen) for server-side AI triage and lifecycle webhooks. Client-side preview in `lib/aiEngine.ts`.
- **Analytics:** Recharts

## Getting Started
```bash
cd client
npm install
cp .env.local.example .env.local   # Fill in Firebase credentials
npm run dev                        # Starts at http://localhost:3000
```

See [implementation.md](./implementation.md) for the phased build plan and remaining TODOs.
