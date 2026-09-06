import { BarChart3, TrendingUp, Users, Building2, Handshake, CheckCircle2, MapPin, Award } from 'lucide-react';
import FeatureDetailLayout, { SectionHeading, ProseBlock } from '@/components/FeatureDetailLayout';

// Demo data
const CATEGORY_DATA = [
  { label: 'Water & Sanitation', count: 312, pct: 82 },
  { label: 'Urban Infrastructure', count: 278, pct: 73 },
  { label: 'Healthcare', count: 224, pct: 59 },
  { label: 'Education & Skilling', count: 198, pct: 52 },
  { label: 'Waste Management', count: 176, pct: 46 },
  { label: 'Energy & Environment', count: 144, pct: 38 },
  { label: 'Transportation', count: 118, pct: 31 },
  { label: 'Digital Governance', count: 96, pct: 25 },
];

const DISTRICT_DATA = [
  { district: 'Ranchi', count: 187 },
  { district: 'Dhanbad', count: 156 },
  { district: 'Jamshedpur', count: 134 },
  { district: 'Bokaro', count: 112 },
  { district: 'Deoghar', count: 98 },
  { district: 'Hazaribagh', count: 87 },
];

const MONTHLY_TRENDS = [
  { month: 'Apr', submissions: 48, resolved: 12 },
  { month: 'May', submissions: 62, resolved: 19 },
  { month: 'Jun', submissions: 91, resolved: 28 },
  { month: 'Jul', submissions: 78, resolved: 35 },
  { month: 'Aug', submissions: 105, resolved: 41 },
  { month: 'Sep', submissions: 124, resolved: 53 },
];

const MAX_TREND = 124;

export default function VisualAnalyticsPage() {
  return (
    <FeatureDetailLayout
      icon={BarChart3}
      badge="Module 06"
      title="Visual Analytics"
      subtitle="Track every metric that matters — challenge submissions, university participation, resolution rates, community impact, and more — on a real-time, role-aware analytics dashboard."
      ctaLabel="Explore the Dashboard"
      ctaHref="/dashboard"
    >
      {/* Overview KPIs */}
      <section className="mb-16">
        <SectionHeading>Platform at a Glance</SectionHeading>
        <ProseBlock>Key performance indicators tracked across the entire SocialConnect ecosystem (demo data).</ProseBlock>
        <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
          {[
            { icon: TrendingUp, label: 'Total Challenges', value: '1,547', hint: 'Since platform launch', color: 'text-saffron-700 bg-saffron-100' },
            { icon: CheckCircle2, label: 'Resolved', value: '412', hint: '26.6% resolution rate', color: 'text-moss bg-moss-100' },
            { icon: Building2, label: 'Universities', value: '18', hint: 'Active partner institutions', color: 'text-teal-500 bg-teal-100' },
            { icon: Handshake, label: 'Industry Partners', value: '47', hint: 'CSR + Startup + MSME', color: 'text-navy-700 bg-navy-100' },
          ].map(({ icon: Icon, label, value, hint, color }) => (
            <div key={label} className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-md ${color}`}>
                <Icon size={18} />
              </div>
              <p className="font-serif text-2xl font-semibold text-navy-900">{value}</p>
              <p className="mt-0.5 text-sm font-medium text-navy-700">{label}</p>
              <p className="mt-1 text-xs text-navy-500">{hint}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Monthly Trends */}
      <section className="mb-16">
        <SectionHeading>Monthly Submission Trends</SectionHeading>
        <ProseBlock>Challenge submissions and resolutions over the past 6 months. Submissions are growing month-on-month.</ProseBlock>
        <div className="mt-8 rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-sm text-navy-600"><span className="h-3 w-3 rounded-sm bg-navy inline-block" /> Submissions</div>
            <div className="flex items-center gap-2 text-sm text-navy-600"><span className="h-3 w-3 rounded-sm bg-moss inline-block" /> Resolved</div>
          </div>
          <div className="flex items-end gap-4 h-40">
            {MONTHLY_TRENDS.map(({ month, submissions, resolved }) => (
              <div key={month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end" style={{ height: '120px' }}>
                  <div
                    className="flex-1 rounded-t bg-navy-700 transition-all"
                    style={{ height: `${(submissions / MAX_TREND) * 100}%` }}
                  />
                  <div
                    className="flex-1 rounded-t bg-moss transition-all"
                    style={{ height: `${(resolved / MAX_TREND) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-navy-500">{month}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category breakdown */}
      <section className="mb-16">
        <SectionHeading>Challenges by Category</SectionHeading>
        <ProseBlock>Distribution of submitted challenges across civic problem categories.</ProseBlock>
        <div className="mt-8 rounded-xl border border-navy-100 bg-white p-6 shadow-sm space-y-4">
          {CATEGORY_DATA.map(({ label, count, pct }) => (
            <div key={label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-navy-700">{label}</span>
                <span className="text-sm font-semibold text-navy-900">{count}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-navy-100">
                <div className="h-full rounded-full bg-saffron" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* District breakdown */}
      <section className="mb-16">
        <SectionHeading>Top Districts by Submissions</SectionHeading>
        <ProseBlock>Districts with the highest volume of civic challenge submissions.</ProseBlock>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DISTRICT_DATA.map(({ district, count }, i) => (
            <div key={district} className="flex items-center justify-between rounded-xl border border-navy-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="font-serif text-lg font-semibold text-navy-300">#{i + 1}</span>
                <div>
                  <p className="font-semibold text-navy-900">{district}</p>
                  <p className="flex items-center gap-1 text-xs text-navy-500"><MapPin size={10} /> Jharkhand</p>
                </div>
              </div>
              <span className="rounded-sm bg-saffron-100 px-2 py-1 text-sm font-semibold text-saffron-700">{count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Impact metrics */}
      <section className="mb-8">
        <SectionHeading>Community Impact Metrics</SectionHeading>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Users, label: 'People Benefited', value: '2.4L+' },
            { icon: Award, label: 'Patents Filed', value: '23' },
            { icon: TrendingUp, label: 'Startups Created', value: '8' },
            { icon: CheckCircle2, label: 'Govt. Adoptions', value: '14' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-saffron-100">
                <Icon size={18} className="text-saffron-700" />
              </div>
              <p className="font-serif text-2xl font-semibold text-navy-900">{value}</p>
              <p className="mt-1 text-sm text-navy-500">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </FeatureDetailLayout>
  );
}
