import { Users2, MapPin, Image, FileText, Tags, ThumbsUp, ArrowUpRight, CheckCircle2, AlertCircle, Droplets, Zap, School, Trash2, Route } from 'lucide-react';
import FeatureDetailLayout, { InfoCard, SectionHeading, ProseBlock } from '@/components/FeatureDetailLayout';
import Link from 'next/link';

const CATEGORIES = [
  { icon: Droplets, label: 'Water & Sanitation' },
  { icon: Zap, label: 'Energy & Environment' },
  { icon: School, label: 'Education & Skilling' },
  { icon: Trash2, label: 'Waste Management' },
  { icon: Route, label: 'Transportation & Mobility' },
  { icon: AlertCircle, label: 'Public Health' },
];

const EXAMPLE_CHALLENGES = [
  { title: 'Waterlogging on MG Road every monsoon', district: 'Ranchi', category: 'Water & Sanitation', votes: 142 },
  { title: 'No streetlights on NH-23 bypass for 8 km stretch', district: 'Dhanbad', category: 'Energy & Environment', votes: 98 },
  { title: 'Government school lacks science lab equipment', district: 'Bokaro', category: 'Education & Skilling', votes: 75 },
  { title: 'Open dumping near residential area causing health hazards', district: 'Jamshedpur', category: 'Waste Management', votes: 113 },
];

export default function CitizenEngagementPage() {
  return (
    <FeatureDetailLayout
      icon={Users2}
      badge="Module 01"
      title="Citizen Engagement"
      subtitle="Empower every citizen to report real societal challenges with evidence — and track how they get solved by universities and industry partners."
      ctaLabel="Submit Your Challenge"
      ctaHref="/citizen"
    >
      {/* What is it */}
      <section className="mb-16">
        <SectionHeading>What is Citizen Engagement?</SectionHeading>
        <ProseBlock>
          Citizen Engagement is the foundation of SocialConnect. It enables individuals, community groups, Panchayati Raj Institutions (PRIs), Urban Local Bodies (ULBs), and government departments to submit real civic problems — backed by evidence — so they can be categorized, prioritized, and routed to academic and industry partners for resolution.
        </ProseBlock>
        <ProseBlock>
          Unlike traditional complaint portals, SocialConnect doesn't just log complaints. Every submission triggers an AI-powered triage workflow, connects to a network of universities, and remains tracked with full transparency until implementation.
        </ProseBlock>
      </section>

      {/* Submission Features */}
      <section className="mb-16">
        <SectionHeading>What You Can Submit</SectionHeading>
        <ProseBlock>Each challenge submission supports rich, evidence-backed information to ensure strong case-building.</ProseBlock>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard icon={MapPin} title="Precise Location" body="Capture GPS coordinates or enter an address. The system auto-tags district and state for routing." />
          <InfoCard icon={Image} title="Photo & Video Evidence" body="Upload up to 10 photos or 3 short videos directly from your device to document the issue." />
          <InfoCard icon={FileText} title="Supporting Documents" body="Attach PDFs, reports, survey data, or government notices as supporting evidence for your challenge." />
          <InfoCard icon={Tags} title="Challenge Categories" body="Choose from 14 predefined categories — or let the AI engine suggest the best fit based on your description." />
          <InfoCard icon={ThumbsUp} title="Community Voting" body="Other citizens can view and upvote your challenge, increasing its priority score and visibility." />
          <InfoCard icon={CheckCircle2} title="Status Tracking" body="Get real-time notifications at every step — from submission to assignment, proposal, pilot, and resolution." />
        </div>
      </section>

      {/* Process */}
      <section className="mb-16">
        <SectionHeading>How to Submit a Challenge</SectionHeading>
        <div className="mt-8 space-y-4">
          {[
            { step: '01', title: 'Create your account', desc: 'Register as a Citizen, PRI, ULB, or Government Department. Verification is instant for citizens.' },
            { step: '02', title: 'Describe the problem', desc: 'Write a clear title and detailed description. The more specific, the better the AI categorization.' },
            { step: '03', title: 'Add location and evidence', desc: 'Pin the location on the map, upload photos/videos, and attach supporting documents.' },
            { step: '04', title: 'Select a category', desc: 'Pick from 14 categories or accept the AI suggestion. You can also add custom tags.' },
            { step: '05', title: 'Submit and track', desc: 'Once submitted, track your challenge\'s journey — from AI triage to university assignment, proposal, and pilot.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-5 rounded-xl border border-navy-100 bg-white p-5">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-saffron-100 font-serif text-sm font-semibold text-saffron-700">{step}</span>
              <div>
                <p className="font-semibold text-navy-900">{title}</p>
                <p className="mt-1 text-sm text-navy-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <SectionHeading>Challenge Categories</SectionHeading>
        <ProseBlock>SocialConnect covers 14 societal challenge categories across civic, environmental, social, and infrastructure domains.</ProseBlock>
        <div className="mt-8 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 rounded-xl border border-navy-100 bg-white p-4 text-center shadow-sm">
              <Icon size={22} className="text-saffron-700" />
              <span className="text-xs font-medium text-navy-700">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Example Challenges */}
      <section className="mb-8">
        <SectionHeading>Example Challenges from Communities</SectionHeading>
        <ProseBlock>Here are some representative challenges that citizens and local bodies have submitted on SocialConnect.</ProseBlock>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {EXAMPLE_CHALLENGES.map((c) => (
            <div key={c.title} className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm">
              <span className="rounded-sm bg-saffron-100 px-2 py-0.5 text-xs font-medium text-saffron-700">{c.category}</span>
              <h3 className="mt-3 font-serif text-base font-semibold text-navy-900">{c.title}</h3>
              <div className="mt-3 flex items-center justify-between text-xs text-navy-500">
                <span className="flex items-center gap-1"><MapPin size={12} />{c.district}</span>
                <span className="flex items-center gap-1"><ThumbsUp size={12} />{c.votes} community votes</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </FeatureDetailLayout>
  );
}
