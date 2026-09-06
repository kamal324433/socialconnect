import { Cpu, Tags, BarChart2, Copy, Link2, Building2, ArrowRight } from 'lucide-react';
import FeatureDetailLayout, { InfoCard, SectionHeading, ProseBlock } from '@/components/FeatureDetailLayout';

const WORKFLOW_STEPS = [
  { n: '01', title: 'Submission Received', desc: 'The citizen submits a challenge with description, location, evidence, and category selection.' },
  { n: '02', title: 'Text Analysis', desc: 'The AI engine analyses the submission text using NLP to extract topics, affected population, severity keywords, and domain signals.' },
  { n: '03', title: 'Auto-Categorization', desc: 'The challenge is classified into one of 14 category buckets (e.g. Water & Sanitation, Healthcare) with a confidence score.' },
  { n: '04', title: 'Priority Scoring', desc: 'A priority score (0–100) is computed based on severity language, number of people affected, geographic coverage, and supporting evidence.' },
  { n: '05', title: 'Duplicate Detection', desc: 'The system checks all existing open challenges for semantic similarity. Likely duplicates are flagged and merged to avoid fragmentation.' },
  { n: '06', title: 'University Matching', desc: 'The AI scans registered university profiles for matching domain expertise, past project history, and geographic proximity to identify the best fit.' },
  { n: '07', title: 'Routing & Notification', desc: 'The challenge is routed to the matched university with a full briefing. The citizen is notified, and the challenge enters the "Routed" status.' },
];

export default function AIProblemManagementPage() {
  return (
    <FeatureDetailLayout
      icon={Cpu}
      badge="Module 02"
      title="AI Problem Management"
      subtitle="Every challenge submitted on SocialConnect passes through an intelligent triage engine that categorizes, scores, deduplicates, and routes it — automatically, in seconds."
      ctaLabel="Explore the Platform"
      ctaHref="/register"
    >
      {/* What is it */}
      <section className="mb-16">
        <SectionHeading>What is AI Problem Management?</SectionHeading>
        <ProseBlock>
          SocialConnect's AI Problem Management engine is the intelligent backbone of the platform. It ensures that every civic challenge — whether submitted by a citizen in a remote village or a government department in the capital — is handled fairly, efficiently, and routed to the right solver.
        </ProseBlock>
        <ProseBlock>
          Unlike traditional portals where submissions pile up without analysis, SocialConnect's AI acts within seconds of each submission to classify, score, and match it to a university partner best equipped to solve it.
        </ProseBlock>
      </section>

      {/* Key capabilities */}
      <section className="mb-16">
        <SectionHeading>Core AI Capabilities</SectionHeading>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard icon={Tags} title="Auto Categorization" body="Natural language processing classifies each challenge into one of 14 civic categories with a confidence percentage." />
          <InfoCard icon={BarChart2} title="Priority Scoring" body="Each submission receives a 0–100 priority score based on severity, affected population size, evidence quality, and location risk." />
          <InfoCard icon={Copy} title="Duplicate Detection" body="Semantic similarity analysis identifies near-duplicate challenges and merges them, preventing fragmented effort." />
          <InfoCard icon={Link2} title="Similar Challenge Linking" body="Related but distinct challenges are linked together, giving universities a broader context when forming solutions." />
          <InfoCard icon={Building2} title="University Matching" body="The system profiles each registered university by domain expertise and matches challenges to the best-fit institution." />
          <InfoCard icon={Cpu} title="Continuous Learning" body="The AI model improves over time based on resolution outcomes, admin corrections, and community feedback signals." />
        </div>
      </section>

      {/* Workflow Visualization */}
      <section className="mb-16">
        <SectionHeading>AI Workflow — Step by Step</SectionHeading>
        <ProseBlock>From the moment a challenge is submitted to the moment it reaches a university, here is exactly what the AI engine does.</ProseBlock>
        <div className="relative mt-10">
          <div className="absolute left-5 top-0 h-full w-px bg-navy-100 sm:left-6" />
          <div className="space-y-6">
            {WORKFLOW_STEPS.map(({ n, title, desc }) => (
              <div key={n} className="relative flex gap-6 pl-14 sm:pl-16">
                <span className="absolute left-0 flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-saffron bg-white font-serif text-sm font-semibold text-saffron-700">
                  {n}
                </span>
                <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm flex-1">
                  <p className="font-semibold text-navy-900">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-navy-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Priority Score Explainer */}
      <section className="mb-8">
        <SectionHeading>How Priority Scores Work</SectionHeading>
        <ProseBlock>The priority score determines which challenges receive urgent university attention. It is calculated from four weighted signals:</ProseBlock>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Severity Language', weight: '35%', desc: 'Keywords indicating urgency — "unsafe", "disease outbreak", "collapsed", etc.' },
            { label: 'Population Affected', weight: '25%', desc: 'Self-reported and location-inferred count of people affected.' },
            { label: 'Evidence Quality', weight: '25%', desc: 'Presence of photos, videos, GPS, documents, and community votes.' },
            { label: 'Geographic Risk', weight: '15%', desc: 'Area classification — flood-prone, drought-affected, tribal, remote.' },
          ].map(({ label, weight, desc }) => (
            <div key={label} className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm">
              <div className="mb-2 text-2xl font-bold text-saffron-700 font-serif">{weight}</div>
              <p className="font-semibold text-navy-900 text-sm">{label}</p>
              <p className="mt-1 text-xs text-navy-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </FeatureDetailLayout>
  );
}
