import Link from 'next/link';
import { CheckCircle2, Users2, Cpu, Building2, Handshake, ListChecks, BarChart3, Bell, ArrowUpRight, TrendingUp } from 'lucide-react';

const MODULES = [
  { n: '01', icon: Users2, title: 'Citizen Engagement', desc: 'Citizens report challenges with photos, location, and evidence. Community voting amplifies urgent issues.', href: '/citizen-engagement' },
  { n: '02', icon: Cpu, title: 'AI Problem Management', desc: 'Every submission is auto-categorized, scored for priority, duplicate-checked, and routed to the best university.', href: '/ai-problem-management' },
  { n: '03', icon: Building2, title: 'University Collaboration', desc: 'HEIs review assigned challenges, form multidisciplinary teams, and submit solution proposals.', href: '/university-collaboration' },
  { n: '04', icon: Handshake, title: 'Industry Partnership', desc: 'Companies, startups, and MSMEs provide mentorship, co-development, CSR funding, and pilot environments.', href: '/industry-partnership' },
  { n: '05', icon: ListChecks, title: 'Project Lifecycle', desc: 'Milestones, testing outcomes, IP generation, and implementation status tracked end-to-end.', href: '/project-lifecycle' },
  { n: '06', icon: BarChart3, title: 'Visual Analytics', desc: 'Real-time dashboards on submissions, participation rates, patents, startups, and community impact.', href: '/visual-analytics' },
  { n: '07', icon: Bell, title: 'Notifications', desc: 'Every stakeholder stays in sync throughout the lifecycle with real-time, role-specific alerts.', href: '/notifications-overview' },
  { n: '08', icon: TrendingUp, title: 'Impact & Outcomes', desc: 'Measure the real-world impact of collaborative solutions and how challenges are transformed into meaningful outcomes.', href: '/impact-outcomes' },
];

const STEPS = [
  { title: "1. Citizen Reports the Challenge", description: "Any community member or local body can submit a challenge detailing the civic issue. They provide photos, precise location data, and supporting documents to build a strong case." },
  { title: "2. AI Triage & Routing", description: "Our AI engine automatically categorizes the submission, scores it for priority, checks against existing challenges for duplicates, and routes it to the university best matched by subject expertise." },
  { title: "3. University Forms a Team", description: "Higher Education Institutions review assigned challenges. They form multidisciplinary teams consisting of students and assign faculty mentors to guide the solution development process." },
  { title: "4. Proposal & Solution Design", description: "The academic team submits a detailed solution proposal. This includes the technical approach, required resources, timeline, and potential impact." },
  { title: "5. Industry Partnership", description: "Industries, startups, MSMEs, and CSR bodies plug in to review proposals. They can offer mentoring, co-development, funding, prototyping resources, or pilot environments." },
  { title: "6. Implementation & Piloting", description: "The solution is developed, tested, and implemented in a real-world pilot. Milestones, deliverables, and testing outcomes are tracked end-to-end." },
  { title: "7. Resolution & Impact Tracking", description: "Once successfully piloted, the challenge is marked resolved. The IP generated, startups created, and community impact are recorded in real-time dashboards." }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-paper">
      <section className="bg-navy-900 py-24 text-paper">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="font-serif text-4xl font-semibold md:text-6xl">How It Works</h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-navy-200">
            A continuous, transparent workflow from a citizen's initial report to a fully piloted, patented solution.
          </p>
        </div>
      </section>

      {/* 7 Module Cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">The Eight Modules</h2>
        <p className="mt-2 max-w-2xl text-navy-500">Click any module to explore it in detail — including workflows, features, and examples.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {MODULES.map(({ n, icon: Icon, title, desc, href }) => (
            <Link
              key={n}
              href={href}
              className="group flex flex-col rounded-xl border border-navy-100 bg-white p-5 shadow-sm transition hover:border-saffron-300 hover:shadow-md"
            >
              <div className="flex items-center gap-2 text-saffron-700">
                <span className="font-serif text-sm">{n}</span>
                <Icon size={16} />
              </div>
              <h3 className="mt-3 font-serif text-base font-semibold text-navy-900">{title}</h3>
              <p className="mt-1 flex-1 text-sm text-navy-500">{desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-saffron-700">
                Explore <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Linear workflow */}
      <section className="mx-auto max-w-4xl px-6 py-8 pb-24">
        <h2 className="font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">The End-to-End Workflow</h2>
        <p className="mt-2 text-navy-500">From submission to resolution, here's how a challenge travels through SocialConnect.</p>
        <div className="mt-10 space-y-12">
          {STEPS.map((step, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-saffron text-navy-900">
                  <CheckCircle2 size={20} />
                </div>
                {index !== STEPS.length - 1 && (
                  <div className="mt-4 h-full w-px bg-navy-200" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="font-serif text-xl font-semibold text-navy-900">{step.title}</h3>
                <p className="mt-3 text-base text-navy-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
