import Link from 'next/link';
import { ArrowUpRight, Users2, Cpu, Building2, Handshake, ListChecks, BarChart3, Bell } from 'lucide-react';

const MODULES = [
  { n: '01', icon: Users2, title: 'Citizen Engagement', body: 'Citizens, community groups, PRIs, ULBs and government departments submit challenges with photos, video, precise location and supporting documents.' },
  { n: '02', icon: Cpu, title: 'AI Problem Management', body: 'Every submission is auto-categorized, scored for priority, checked against existing challenges for duplicates, and routed to the university best matched by subject expertise.' },
  { n: '03', icon: Building2, title: 'University Collaboration', body: 'Higher Education Institutions review assigned challenges, form multidisciplinary teams, assign faculty mentors and submit solution proposals.' },
  { n: '04', icon: Handshake, title: 'Industry Partnership', body: 'Industries, startups, MSMEs, CSR bodies and research institutions plug in for mentoring, co-development, funding, prototyping, piloting and technology transfer.' },
  { n: '05', icon: ListChecks, title: 'Project Lifecycle', body: 'Milestones, deliverables, approvals, testing outcomes, IP generation and implementation status tracked end to end for every project.' },
  { n: '06', icon: BarChart3, title: 'Visual Analytics', body: 'Real-time dashboards on submissions, participation, thematic trends, completion rates, patents, startups created and district-wise community impact.' },
  { n: '07', icon: Bell, title: 'Notifications', body: 'Every stakeholder — citizen, university, mentor, industry partner and department — stays in sync throughout the project lifecycle.' }
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-navy-100 bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <p className="mb-4 text-sm font-medium text-saffron-700">A civic problem-solving system, end to end</p>
          <h1 className="max-w-3xl font-serif text-3xl font-semibold leading-tight text-navy-900 sm:text-5xl sm:leading-[1.08] lg:text-6xl">
            Every local challenge deserves a team of people qualified to solve it.
          </h1>
          <p className="mt-4 max-w-xl text-base text-navy-500 sm:mt-6 sm:text-lg">
            Citizens report what's broken. An AI engine routes it to the right university. Faculty, students and
            industry partners turn it into a piloted, funded solution — with every step tracked in the open.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <Link href="/register" className="flex items-center gap-1.5 rounded-sm bg-navy px-4 py-2.5 text-sm font-medium text-paper hover:bg-navy-900 sm:px-5 sm:py-3">
              Report a challenge <ArrowUpRight size={15} />
            </Link>
            <Link href="/dashboard" className="flex items-center gap-1.5 rounded-sm border border-navy-300 px-4 py-2.5 text-sm font-medium text-navy-700 hover:border-navy sm:px-5 sm:py-3">
              View live impact data
            </Link>
          </div>

          <div className="ledger-divider mt-12" />
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            <StatBlock value="7" label="Integrated modules" />
            <StatBlock value="14" label="Challenge categories" />
            <StatBlock value="∞" label="Districts supported" />
            <StatBlock value="24×7" label="AI triage & routing" />
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
        <h2 className="font-serif text-2xl font-semibold text-navy-900 sm:text-3xl">How a challenge becomes a solution</h2>
        <p className="mt-2 max-w-2xl text-sm text-navy-500 sm:text-base">Seven modules, one continuous workflow — from a citizen's report to a piloted, patented outcome.</p>

        <div className="mt-8 grid gap-px overflow-hidden rounded-md border border-navy-100 bg-navy-100 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map(({ n, icon: Icon, title, body }) => (
            <div key={n} className="bg-white p-6">
              <div className="flex items-center gap-2 text-saffron-700">
                <span className="font-serif text-sm">{n}</span>
                <Icon size={16} />
              </div>
              <h3 className="mt-3 font-serif text-lg font-semibold text-navy-900">{title}</h3>
              <p className="mt-2 text-sm text-navy-500">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA by audience */}
      <section className="border-t border-navy-100 bg-navy-900 py-12 text-paper sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">Built for every stakeholder</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AudienceCard title="Citizens & local bodies" body="Submit a challenge with evidence and track it through resolution." href="/register" cta="Report a challenge" />
            <AudienceCard title="Universities" body="Review routed challenges, form teams, and submit proposals for review." href="/register" cta="Register your institution" />
            <AudienceCard title="Industry & CSR" body="Discover projects seeking mentors, funding, prototyping or pilot partners." href="/register" cta="Partner with a project" />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-3xl font-semibold text-navy-900">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-navy-500">{label}</p>
    </div>
  );
}

function AudienceCard({ title, body, href, cta }: { title: string; body: string; href: string; cta: string }) {
  return (
    <div className="rounded-md border border-navy-700 p-6">
      <h3 className="font-serif text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-navy-100">{body}</p>
      <Link href={href} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-saffron-300 hover:text-saffron">
        {cta} <ArrowUpRight size={14} />
      </Link>
    </div>
  );
}
