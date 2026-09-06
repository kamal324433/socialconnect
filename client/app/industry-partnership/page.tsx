import { Handshake, Lightbulb, Wrench, DollarSign, FlaskConical, Rocket, Share2, Users } from 'lucide-react';
import FeatureDetailLayout, { InfoCard, SectionHeading, ProseBlock } from '@/components/FeatureDetailLayout';

const PARTNER_TYPES = [
  { type: 'Large Corporations & PSUs', examples: 'SAIL, TATA Steel, NTPC, JSPL', focus: 'CSR funding, pilot deployment environments, policy advocacy' },
  { type: 'Startups & Deep Tech', examples: 'AgriTech, WaterTech, EdTech startups', focus: 'Co-development, technology integration, commercialization' },
  { type: 'MSMEs', examples: 'Manufacturing, services, local enterprises', focus: 'Prototyping, local pilots, supply chain integration' },
  { type: 'Research Institutions', examples: 'CSIR labs, IITs, DRDO', focus: 'Specialized R&D, testing infrastructure, expert mentorship' },
];

const PARTNERSHIP_MODES = [
  { icon: Users, title: 'Mentorship', desc: 'Assign industry experts as mentors to student-faculty teams for domain guidance throughout the project.' },
  { icon: Wrench, title: 'Prototyping Support', desc: 'Provide lab facilities, machinery, manufacturing access, or hardware resources for building solution prototypes.' },
  { icon: DollarSign, title: 'CSR Funding', desc: 'Fund high-priority civic projects through corporate CSR budgets, directly tied to measurable community outcomes.' },
  { icon: FlaskConical, title: 'Co-development', desc: 'Jointly develop solutions with university teams, with shared IP ownership and commercialization rights.' },
  { icon: Rocket, title: 'Pilot Environments', desc: 'Provide real-world deployment environments — factory sites, townships, rural zones — for testing solutions at scale.' },
  { icon: Share2, title: 'Technology Transfer', desc: 'Adopt proven solutions from universities into your own operations or products and scale them commercially.' },
];

export default function IndustryPartnershipPage() {
  return (
    <FeatureDetailLayout
      icon={Handshake}
      badge="Module 04"
      title="Industry Partnership"
      subtitle="Industries, startups, MSMEs, and CSR bodies partner with SocialConnect to co-create, fund, mentor, and pilot solutions to real societal challenges — while building innovation pipelines."
      ctaLabel="Partner With Us"
      ctaHref="/register"
    >
      {/* What is it */}
      <section className="mb-16">
        <SectionHeading>Why Industry Partners Join SocialConnect</SectionHeading>
        <ProseBlock>
          SocialConnect connects India's industries directly to a pipeline of socially relevant innovation — challenges identified by citizens, researched by universities, and ready for industry expertise to bring to reality. For companies with CSR mandates, startups seeking real-world impact, or MSMEs looking to showcase capabilities, this platform creates a unique opportunity.
        </ProseBlock>
        <ProseBlock>
          Partners don't just write cheques. They mentor teams, provide labs and equipment, co-develop products, and deploy pilots — turning their resources into tangible community outcomes that are tracked, measured, and publicly reported.
        </ProseBlock>
      </section>

      {/* Modes */}
      <section className="mb-16">
        <SectionHeading>Ways to Partner</SectionHeading>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERSHIP_MODES.map((m) => (
            <InfoCard key={m.title} icon={m.icon} title={m.title} body={m.desc} />
          ))}
        </div>
      </section>

      {/* Partner types */}
      <section className="mb-16">
        <SectionHeading>Who Can Partner</SectionHeading>
        <ProseBlock>SocialConnect welcomes partners across sectors and sizes — from large corporations to individual industry experts.</ProseBlock>
        <div className="mt-8 space-y-4">
          {PARTNER_TYPES.map(({ type, examples, focus }) => (
            <div key={type} className="grid gap-2 rounded-xl border border-navy-100 bg-white p-5 shadow-sm sm:grid-cols-3">
              <div>
                <p className="font-semibold text-navy-900">{type}</p>
                <p className="mt-1 text-xs text-navy-500">{examples}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-navy-600">{focus}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mb-8">
        <SectionHeading>Benefits for Industry Partners</SectionHeading>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'CSR Impact Reporting', desc: 'Get detailed, auditable impact reports for all funded projects — suitable for board reporting and regulatory filings.' },
            { title: 'Innovation Pipeline', desc: 'Access a curated pipeline of student and faculty innovations aligned to your business domain and geographic footprint.' },
            { title: 'Talent Discovery', desc: 'Identify and recruit high-performing students who work on your-funded projects — a pre-vetted talent pipeline.' },
            { title: 'IP Co-ownership', desc: 'Co-own patents, copyrights, or products created through co-development partnerships with universities.' },
          ].map(({ title, desc }) => (
            <div key={title} className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm">
              <div className="mb-2 h-1 w-8 rounded-full bg-saffron" />
              <p className="font-semibold text-navy-900">{title}</p>
              <p className="mt-2 text-sm text-navy-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </FeatureDetailLayout>
  );
}
