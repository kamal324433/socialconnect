import Link from 'next/link';
import { TrendingUp, CheckCircle2, Users, Building2, Handshake, Lightbulb, Cpu, Leaf, Globe, MapPin, ArrowRight, ArrowLeft, Award, GraduationCap, HeartHandshake, Sprout } from 'lucide-react';
import FeatureDetailLayout, { InfoCard, SectionHeading, ProseBlock } from '@/components/FeatureDetailLayout';

/* ─── Demo KPI Data ─────────────────────────────────────────────── */
const KPIS = [
  { icon: TrendingUp,   label: 'Challenges Submitted',   value: '1,547', hint: 'Since platform launch', color: 'bg-saffron-100 text-saffron-700' },
  { icon: CheckCircle2, label: 'Challenges Solved',       value: '412',   hint: '26.6% resolution rate', color: 'bg-moss-100 text-moss' },
  { icon: Cpu,          label: 'Active Projects',         value: '184',   hint: 'Currently in progress',  color: 'bg-teal-100 text-teal-700' },
  { icon: Building2,    label: 'Universities Involved',   value: '18',    hint: 'Partner HEIs',           color: 'bg-navy-100 text-navy-700' },
  { icon: Handshake,    label: 'Industry Partners',       value: '47',    hint: 'CSR, Startup & MSME',    color: 'bg-saffron-100 text-saffron-700' },
  { icon: Users,        label: 'Citizens Engaged',        value: '32,400+', hint: 'Registered users',    color: 'bg-moss-100 text-moss' },
  { icon: Globe,        label: 'Solutions Implemented',   value: '89',    hint: 'Govt. adopted pilots',   color: 'bg-teal-100 text-teal-700' },
  { icon: MapPin,       label: 'Districts Reached',       value: '24',    hint: 'Across Jharkhand',       color: 'bg-navy-100 text-navy-700' },
];

/* ─── Process stages ────────────────────────────────────────────── */
const PROCESS = [
  { n: '01', title: 'Challenge Identified',  desc: 'A citizen, local body, or government department reports a real societal challenge with evidence and location data.' },
  { n: '02', title: 'Solution Developed',    desc: 'A matched university team of faculty and students researches the problem and designs a technically sound solution.' },
  { n: '03', title: 'Prototype Tested',      desc: 'The proposed solution is built into a prototype and rigorously tested in a controlled environment.' },
  { n: '04', title: 'Pilot Implemented',     desc: 'A real-world pilot is launched in the affected community with industry support, capturing adoption and performance data.' },
  { n: '05', title: 'Community Impact',      desc: 'The piloted solution creates measurable improvements in daily life for residents — cleaner water, better roads, improved services.' },
  { n: '06', title: 'Impact Measured',       desc: 'Long-term outcomes are tracked on the analytics dashboard — people benefited, patents filed, startups created, Govt. adoptions.' },
];

/* ─── Key outcomes ──────────────────────────────────────────────── */
const OUTCOMES = [
  { icon: CheckCircle2,   title: 'Better Public Services',     body: 'Citizens experience improved access to essential public services — cleaner water, better roads, functional streetlights.' },
  { icon: HeartHandshake, title: 'Community Participation',    body: 'Thousands of citizens become active participants in shaping the solutions that affect their daily lives.' },
  { icon: Lightbulb,      title: 'University Innovation',      body: 'Universities publish research, file patents, and create startups from real societal problem-solving.' },
  { icon: Handshake,      title: 'Industry Collaboration',     body: 'Industry partners build social credibility, CSR impact trails, and a pipeline of innovative talent.' },
  { icon: GraduationCap,  title: 'Student Opportunities',      body: 'Students gain real-world experience, professional mentorship, and portfolio projects with measurable impact.' },
  { icon: Cpu,            title: 'Technology Solutions',       body: 'Scalable, technology-backed solutions — IoT sensors, mobile apps, data dashboards — built for local contexts.' },
  { icon: Globe,          title: 'Local Problem Solving',      body: 'Hyperlocal civic challenges that were ignored for years finally get dedicated multidisciplinary attention.' },
  { icon: Sprout,         title: 'Sustainable Development',    body: 'Solutions are designed for long-term adoption — not just pilots — aligned to UN Sustainable Development Goals.' },
];

/* ─── Demo analytics bar data ───────────────────────────────────── */
const CATEGORY_IMPACT = [
  { label: 'Water & Sanitation',  solved: 89, pct: 86 },
  { label: 'Urban Infrastructure', solved: 74, pct: 71 },
  { label: 'Public Health',        solved: 61, pct: 59 },
  { label: 'Education & Skilling', solved: 55, pct: 53 },
  { label: 'Waste Management',     solved: 48, pct: 46 },
  { label: 'Energy & Environment', solved: 39, pct: 38 },
];

const DISTRICT_IMPACT = [
  { district: 'Ranchi',       count: 54 },
  { district: 'Dhanbad',      count: 47 },
  { district: 'Jamshedpur',   count: 41 },
  { district: 'Bokaro',       count: 36 },
  { district: 'Hazaribagh',   count: 29 },
  { district: 'Deoghar',      count: 22 },
];

const MONTHLY = [
  { month: 'Apr', solved: 12 },
  { month: 'May', solved: 19 },
  { month: 'Jun', solved: 28 },
  { month: 'Jul', solved: 35 },
  { month: 'Aug', solved: 41 },
  { month: 'Sep', solved: 53 },
];
const MAX_MONTHLY = 53;

export default function ImpactOutcomesPage() {
  return (
    <FeatureDetailLayout
      icon={TrendingUp}
      badge="Module 08"
      title="Impact & Outcomes"
      subtitle="Turning collaborative problem-solving into measurable social impact — tracked transparently from the first submission to long-term community transformation."
      ctaLabel="Submit a Challenge"
      ctaHref="/citizen"
    >

      {/* Intro */}
      <section className="mb-16">
        <SectionHeading>How SocialConnect Measures Impact</SectionHeading>
        <ProseBlock>
          Every challenge submitted, every university project launched, and every industry partnership formed on SocialConnect is tracked end-to-end. Impact is not self-reported — it is measured through structured pilot outcomes, government adoption records, community surveys, and real-time analytics dashboards.
        </ProseBlock>
        <ProseBlock>
          This module aggregates outcomes across all eight pillars of the platform — from citizen engagement volumes to the number of patents filed by university teams — giving every stakeholder a transparent, data-backed picture of societal progress. (All figures shown here are sample demo data.)
        </ProseBlock>
      </section>

      {/* Section 1 — KPI Cards */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-1">
          <SectionHeading>Our Impact</SectionHeading>
          <span className="rounded-sm bg-saffron-100 px-2 py-0.5 text-xs font-semibold text-saffron-700">Demo Data</span>
        </div>
        <ProseBlock>Key metrics across the entire SocialConnect ecosystem as of the current reporting period.</ProseBlock>
        <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {KPIS.map(({ icon: Icon, label, value, hint, color }) => (
            <div key={label} className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-md ${color}`}>
                <Icon size={18} />
              </div>
              <p className="font-serif text-2xl font-bold text-navy-900">{value}</p>
              <p className="mt-0.5 text-sm font-medium text-navy-700">{label}</p>
              <p className="mt-1 text-xs text-navy-400">{hint}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 — Process */}
      <section className="mb-16">
        <SectionHeading>From Challenge to Impact</SectionHeading>
        <ProseBlock>Every civic challenge follows a structured journey before it becomes a measurable community outcome.</ProseBlock>
        <div className="relative mt-10">
          <div className="absolute left-5 top-0 h-full w-px bg-navy-100 sm:left-6" />
          <div className="space-y-5">
            {PROCESS.map(({ n, title, desc }, i) => (
              <div key={n} className="relative flex gap-6 pl-14 sm:pl-16">
                <div className="absolute left-0 flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-saffron bg-white shadow-sm">
                  <span className="font-serif text-sm font-bold text-saffron-700">{n}</span>
                </div>
                <div className={`flex-1 rounded-xl border bg-white p-5 shadow-sm ${i === PROCESS.length - 1 ? 'border-saffron-300' : 'border-navy-100'}`}>
                  <p className="font-serif font-semibold text-navy-900">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-navy-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Key Outcomes */}
      <section className="mb-16">
        <SectionHeading>Key Outcomes</SectionHeading>
        <ProseBlock>The cumulative impact of SocialConnect across all its stakeholder groups and societal domains.</ProseBlock>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OUTCOMES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-saffron-100">
                <Icon size={18} className="text-saffron-700" />
              </div>
              <h3 className="font-serif text-sm font-semibold text-navy-900">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-navy-500">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — Analytics */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-1">
          <SectionHeading>Impact Analytics</SectionHeading>
          <span className="rounded-sm bg-navy-100 px-2 py-0.5 text-xs font-semibold text-navy-500">Demo Data</span>
        </div>
        <ProseBlock>Visual breakdown of challenges solved, category-wise impact, and district-level reach.</ProseBlock>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Monthly resolved */}
          <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
            <p className="font-serif text-base font-semibold text-navy-900">Challenges Resolved — Monthly Trend</p>
            <p className="mt-1 text-xs text-navy-400">Past 6 months</p>
            <div className="mt-6 flex items-end gap-3 h-36">
              {MONTHLY.map(({ month, solved }) => (
                <div key={month} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-xs font-semibold text-navy-700">{solved}</span>
                  <div
                    className="w-full rounded-t bg-moss transition-all"
                    style={{ height: `${(solved / MAX_MONTHLY) * 100}px` }}
                  />
                  <span className="text-xs text-navy-400">{month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category solved */}
          <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
            <p className="font-serif text-base font-semibold text-navy-900">Category-wise Impact</p>
            <p className="mt-1 text-xs text-navy-400">Challenges resolved per category</p>
            <div className="mt-5 space-y-3">
              {CATEGORY_IMPACT.map(({ label, solved, pct }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-navy-700">{label}</span>
                    <span className="text-xs font-semibold text-navy-900">{solved} solved</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-navy-100">
                    <div className="h-full rounded-full bg-moss" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* District impact */}
          <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
            <p className="font-serif text-base font-semibold text-navy-900">District-wise Impact</p>
            <p className="mt-1 text-xs text-navy-400">Top districts by resolved challenges</p>
            <div className="mt-5 space-y-3">
              {DISTRICT_IMPACT.map(({ district, count }, i) => (
                <div key={district} className="flex items-center justify-between rounded-lg bg-navy-50 px-4 py-2">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-sm font-semibold text-navy-400">#{i + 1}</span>
                    <span className="text-sm font-medium text-navy-900">{district}</span>
                  </div>
                  <span className="text-sm font-bold text-moss">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contribution split */}
          <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
            <p className="font-serif text-base font-semibold text-navy-900">Stakeholder Contribution</p>
            <p className="mt-1 text-xs text-navy-400">Share of total solved challenges by contributor type</p>
            <div className="mt-5 space-y-4">
              {[
                { label: 'University Teams',     pct: 58, color: 'bg-navy' },
                { label: 'Industry Partners',    pct: 24, color: 'bg-saffron' },
                { label: 'Citizen Participation',pct: 12, color: 'bg-teal' },
                { label: 'Govt. Collaboration',  pct: 6,  color: 'bg-moss' },
              ].map(({ label, pct, color }) => (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-navy-700">{label}</span>
                    <span className="text-xs font-bold text-navy-900">{pct}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-navy-100">
                    <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Impact Story */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-1">
          <SectionHeading>Example Impact Story</SectionHeading>
          <span className="rounded-sm bg-saffron-100 px-2 py-0.5 text-xs font-semibold text-saffron-700">Demo Story</span>
        </div>
        <div className="mt-6 rounded-2xl border border-navy-100 bg-white shadow-sm overflow-hidden">
          <div className="bg-navy-900 px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-saffron-300">Challenge ID: SC-2024-0071 — Bokaro, Jharkhand</p>
            <h3 className="mt-1 font-serif text-xl font-semibold text-white">Poor Waste Management in Residential Community</h3>
          </div>
          <div className="grid gap-0 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-navy-100">
            {[
              { label: 'The Problem', content: 'Residents of Ward 7, Bokaro reported overflowing garbage bins, irregular collection schedules, and no community awareness about segregation. Health hazards and open dumping were causing community distress.', icon: AlertCircle },
              { label: 'The Solution', content: 'NIT Jamshedpur\'s Environmental Engineering team designed a smart waste monitoring system using IoT sensors on community bins. The system sends real-time alerts to the sanitation department when bins reach 80% capacity.', icon: Lightbulb },
              { label: 'The Implementation', content: 'A 6-month pilot was launched across 120 bins in 3 wards. TATA Steel CSR funded sensor hardware. The student team built a mobile dashboard for municipality sanitation supervisors.', icon: Cpu },
              { label: 'The Outcome', content: 'Overflow incidents reduced by 74%. Collection efficiency improved by 60%. The Bokaro Municipal Corporation has formally adopted the system for citywide rollout across all 32 wards.', icon: TrendingUp },
            ].map(({ label, content, icon: Icon }) => (
              <div key={label} className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} className="text-saffron-700" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-saffron-700">{label}</p>
                </div>
                <p className="text-sm leading-relaxed text-navy-600">{content}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-navy-100 bg-navy-50 px-6 py-4 flex flex-wrap items-center gap-6">
            {[
              { label: 'Overflow Reduction', value: '74%' },
              { label: 'Collection Efficiency', value: '+60%' },
              { label: 'Wards Covered', value: '3 → 32' },
              { label: 'Resolution Time', value: '6 months' },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-serif text-xl font-bold text-navy-900">{value}</p>
                <p className="text-xs text-navy-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </FeatureDetailLayout>
  );
}

// Inline import for AlertCircle since it's only used inside this page
function AlertCircle({ size, className }: { size: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}
