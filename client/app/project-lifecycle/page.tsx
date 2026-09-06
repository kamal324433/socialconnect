import { ListChecks, FileInput, Cpu, Building2, Users, FileText, Hammer, TestTube, Rocket, BarChart3, CheckCircle2 } from 'lucide-react';
import FeatureDetailLayout, { SectionHeading, ProseBlock } from '@/components/FeatureDetailLayout';

const LIFECYCLE_STEPS = [
  {
    n: '01', icon: FileInput, title: 'Problem Submitted',
    desc: 'A citizen, PRI, ULB, or government department submits a societal challenge with evidence, location, and category information.',
    status: 'Submitted', statusColor: 'bg-navy-100 text-navy-700'
  },
  {
    n: '02', icon: Cpu, title: 'AI Analysis',
    desc: 'The AI engine categorizes the challenge, scores its priority (0–100), and checks for duplicates among existing submissions.',
    status: 'Under Review', statusColor: 'bg-saffron-100 text-saffron-700'
  },
  {
    n: '03', icon: Building2, title: 'University Matching',
    desc: 'Based on domain expertise and geographic context, the AI selects the best-fit university and sends a routing brief.',
    status: 'Routed', statusColor: 'bg-teal-100 text-teal-700'
  },
  {
    n: '04', icon: Users, title: 'Team Formation',
    desc: 'The university\'s faculty coordinator reviews the challenge and forms a multidisciplinary student-faculty team.',
    status: 'Team Formation', statusColor: 'bg-navy-100 text-navy-700'
  },
  {
    n: '05', icon: FileText, title: 'Solution Proposal',
    desc: 'The team submits a detailed proposal covering approach, resource needs, timeline, risks, and expected measurable impact.',
    status: 'Proposal Submitted', statusColor: 'bg-teal-100 text-teal-700'
  },
  {
    n: '06', icon: Hammer, title: 'Prototype Development',
    desc: 'Post-approval, the team builds the solution prototype — software, hardware, process, or policy recommendation — with industry support.',
    status: 'In Progress', statusColor: 'bg-saffron-100 text-saffron-700'
  },
  {
    n: '07', icon: TestTube, title: 'Testing & Validation',
    desc: 'The prototype is tested in a controlled environment. Results, defects, and user feedback are documented on the platform.',
    status: 'Testing', statusColor: 'bg-saffron-100 text-saffron-700'
  },
  {
    n: '08', icon: Rocket, title: 'Community Pilot',
    desc: 'A real-world pilot is launched in the affected community. Deployment data, adoption metrics, and stakeholder feedback are captured.',
    status: 'Pilot', statusColor: 'bg-teal-100 text-teal-700'
  },
  {
    n: '09', icon: CheckCircle2, title: 'Implementation',
    desc: 'After a successful pilot, the solution is scaled and formally adopted by the relevant local body, department, or government.',
    status: 'Implemented', statusColor: 'bg-moss-100 text-moss-700'
  },
  {
    n: '10', icon: BarChart3, title: 'Impact Measurement',
    desc: 'Long-term community impact is measured and reported on the analytics dashboard — patents filed, startups created, people benefited.',
    status: 'Completed', statusColor: 'bg-moss-100 text-moss-700'
  },
];

export default function ProjectLifecyclePage() {
  return (
    <FeatureDetailLayout
      icon={ListChecks}
      badge="Module 05"
      title="Project Lifecycle"
      subtitle="Every challenge on SocialConnect follows a structured 10-stage lifecycle — from initial submission through AI triage, university research, industry prototyping, community piloting, and long-term impact tracking."
      ctaLabel="Submit a Challenge"
      ctaHref="/citizen"
    >
      {/* What is it */}
      <section className="mb-16">
        <SectionHeading>End-to-End Transparency</SectionHeading>
        <ProseBlock>
          SocialConnect's project lifecycle is fully transparent. Every stakeholder — the citizen who submitted the challenge, the faculty mentor, the student team, the industry partner, and the government — can see the exact stage a project is at, what deliverables are pending, and who is responsible.
        </ProseBlock>
        <ProseBlock>
          Milestones, deliverables, testing outcomes, pilot reports, and IP filings are all logged on the platform in real time. Nothing falls through the cracks.
        </ProseBlock>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <SectionHeading>The 10-Stage Lifecycle</SectionHeading>
        <ProseBlock>Each stage has defined responsibilities, outputs, and success criteria. Progress is tracked automatically as teams submit updates.</ProseBlock>

        <div className="relative mt-12">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 h-full w-px bg-navy-100 sm:left-7" />

          <div className="space-y-6">
            {LIFECYCLE_STEPS.map(({ n, icon: Icon, title, desc, status, statusColor }) => (
              <div key={n} className="relative flex gap-6 pl-14 sm:pl-20">
                {/* Circle */}
                <div className="absolute left-0 flex h-10 w-10 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-navy-100 bg-white shadow-sm">
                  <Icon size={18} className="text-navy-700" />
                </div>

                {/* Card */}
                <div className="flex-1 rounded-xl border border-navy-100 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <span className="font-serif text-xs text-navy-400">Stage {n}</span>
                      <h3 className="font-serif text-base font-semibold text-navy-900">{title}</h3>
                    </div>
                    <span className={`rounded-sm px-2 py-0.5 text-xs font-medium ${statusColor}`}>{status}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="mb-8">
        <SectionHeading>Milestone Tracking</SectionHeading>
        <ProseBlock>Each project defines its own milestones with due dates, deliverable URLs, and completion status — all visible to all authorized stakeholders.</ProseBlock>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Avg. Time to Route', value: '< 48 hrs', hint: 'From submission to university assignment' },
            { label: 'Avg. Project Duration', value: '4–8 mo.', hint: 'From team formation to pilot completion' },
            { label: 'Milestone Compliance', value: '87%', hint: 'Projects hitting milestones on schedule' },
          ].map(({ label, value, hint }) => (
            <div key={label} className="rounded-xl border border-navy-100 bg-white p-6 text-center shadow-sm">
              <p className="font-serif text-3xl font-semibold text-navy-900">{value}</p>
              <p className="mt-1 text-sm font-semibold text-navy-700">{label}</p>
              <p className="mt-1 text-xs text-navy-500">{hint}</p>
            </div>
          ))}
        </div>
      </section>
    </FeatureDetailLayout>
  );
}
