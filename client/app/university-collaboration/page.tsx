import { Building2, Users, GraduationCap, BookOpen, Lightbulb, FileText, FlaskConical, Award } from 'lucide-react';
import FeatureDetailLayout, { InfoCard, SectionHeading, ProseBlock } from '@/components/FeatureDetailLayout';

const PARTICIPATING_UNIVERSITIES = [
  { name: 'IIT (ISM) Dhanbad', domain: 'Mining, Energy & Environment', projects: 14 },
  { name: 'NIT Jamshedpur', domain: 'Civil, Mechanical & Manufacturing', projects: 11 },
  { name: 'BIT Mesra, Ranchi', domain: 'IT, Electronics & Water Systems', projects: 9 },
  { name: 'Ranchi University', domain: 'Social Sciences, Public Health & Governance', projects: 7 },
  { name: 'Jharkhand Rai University', domain: 'Agriculture, Rural Development & Skilling', projects: 6 },
  { name: 'XLRI Jamshedpur', domain: 'Management, CSR & Policy', projects: 5 },
];

export default function UniversityCollaborationPage() {
  return (
    <FeatureDetailLayout
      icon={Building2}
      badge="Module 03"
      title="University Collaboration"
      subtitle="Higher Education Institutions are the primary problem-solvers on SocialConnect — forming multidisciplinary teams, mentoring students, and delivering research-backed solutions to real civic challenges."
      ctaLabel="Join as a University"
      ctaHref="/register"
    >
      {/* What is it */}
      <section className="mb-16">
        <SectionHeading>The Role of Universities</SectionHeading>
        <ProseBlock>
          Universities on SocialConnect are not passive observers — they are active problem-solvers. Once the AI engine routes a civic challenge to a matched institution, the university's faculty and student community take full ownership of understanding, researching, proposing, and implementing a solution.
        </ProseBlock>
        <ProseBlock>
          This model creates a powerful feedback loop: students gain hands-on, real-world experience while producing measurable civic impact. Faculty members apply their domain expertise to problems that matter. And communities get solutions backed by rigorous academic research.
        </ProseBlock>
      </section>

      {/* Key capabilities */}
      <section className="mb-16">
        <SectionHeading>How Universities Participate</SectionHeading>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard icon={GraduationCap} title="Challenge Review" body="Faculty coordinators review assigned challenges, assess feasibility, and decide whether to accept, request reassignment, or flag duplicates." />
          <InfoCard icon={Users} title="Multidisciplinary Teams" body="Faculty assemble cross-departmental student teams — civil, IT, social sciences, management — based on challenge requirements." />
          <InfoCard icon={BookOpen} title="Faculty Mentorship" body="Senior faculty members serve as academic mentors, guiding the team through problem analysis, literature review, and solution design." />
          <InfoCard icon={FileText} title="Solution Proposals" body="Teams submit a structured proposal including technical approach, resource requirements, timeline, and expected impact for admin review." />
          <InfoCard icon={FlaskConical} title="Prototype & Testing" body="Upon approval, teams build prototypes and conduct real-world pilots in the affected communities, tracking outcomes on the platform." />
          <InfoCard icon={Award} title="IP & Publication" body="Solutions generating intellectual property (patents, copyrights) are recorded on the platform. Publications and startups are also tracked." />
        </div>
      </section>

      {/* Who can participate */}
      <section className="mb-16">
        <SectionHeading>Who Can Participate from Universities</SectionHeading>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: BookOpen, role: 'Faculty Members', desc: 'Subject matter experts who mentor teams, review proposals, and liaise with industry partners and government stakeholders.' },
            { icon: GraduationCap, role: 'Students', desc: 'Undergraduate, postgraduate, and doctoral students who form project teams, conduct research, and build prototypes.' },
            { icon: FlaskConical, role: 'Researchers', desc: 'Dedicated research staff who contribute specialized expertise, conduct field studies, and support piloting activities.' },
          ].map(({ icon: Icon, role, desc }) => (
            <div key={role} className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy-50">
                <Icon size={22} className="text-navy-700" />
              </div>
              <h3 className="font-serif text-base font-semibold text-navy-900">{role}</h3>
              <p className="mt-2 text-sm text-navy-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partner Universities */}
      <section className="mb-8">
        <SectionHeading>Registered University Partners</SectionHeading>
        <ProseBlock>SocialConnect currently works with leading Higher Education Institutions across Jharkhand and neighbouring states.</ProseBlock>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTICIPATING_UNIVERSITIES.map((u) => (
            <div key={u.name} className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-navy-50">
                  <Building2 size={18} className="text-navy-700" />
                </div>
                <span className="rounded-sm bg-moss-100 px-2 py-0.5 text-xs font-semibold text-moss">{u.projects} projects</span>
              </div>
              <h3 className="mt-3 font-serif text-sm font-semibold text-navy-900">{u.name}</h3>
              <p className="mt-1 text-xs text-navy-500">{u.domain}</p>
            </div>
          ))}
        </div>
      </section>
    </FeatureDetailLayout>
  );
}
