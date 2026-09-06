'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, MapPin, Tag, ThumbsUp, Calendar, Hash, ArrowRight,
  Building2, Leaf, Heart, GraduationCap, Stethoscope, Droplets,
  Trash2, Wheat, Bus, Zap, Briefcase, Wifi, Baby, Accessibility,
  CheckCircle2, Circle, Clock, Users, FileText, Lightbulb,
  AlertCircle, TrendingUp
} from 'lucide-react';
import { CHALLENGES, type Priority, type Status } from '@/lib/challengeData';

/* ─── Helpers ─────────────────────────────────────────────────── */
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Infrastructure': Building2, 'Environment': Leaf, 'Public Health': Heart,
  'Education': GraduationCap, 'Healthcare': Stethoscope, 'Water & Sanitation': Droplets,
  'Waste Management': Trash2, 'Agriculture': Wheat, 'Transportation': Bus,
  'Energy': Zap, 'Employment': Briefcase, 'Digital Services': Wifi,
  'Women & Child Welfare': Baby, 'Accessibility': Accessibility,
};

const PRIORITY_STYLES: Record<Priority, string> = {
  critical: 'bg-brick text-white', high: 'bg-brick-100 text-brick',
  medium: 'bg-saffron-100 text-saffron-700', low: 'bg-navy-100 text-navy-500',
};

const STATUS_LABELS: Record<Status, string> = {
  submitted: 'Submitted', ai_verified: 'AI Verified', under_review: 'Under Review',
  assigned: 'Assigned', in_progress: 'In Progress', resolved: 'Resolved',
};

const STATUS_ORDER: Status[] = ['submitted', 'ai_verified', 'under_review', 'assigned', 'in_progress', 'resolved'];

const STATUS_DESCRIPTIONS: Record<Status, string> = {
  submitted:    'Challenge received and logged by SocialConnect.',
  ai_verified:  'AI engine verified, categorized and scored the challenge.',
  under_review: 'Admin team is reviewing for eligibility and routing.',
  assigned:     'Routed to a matched university for solution development.',
  in_progress:  'University team is actively working on the solution.',
  resolved:     'Solution piloted and challenge marked as resolved.',
};

const STEP_ICONS: Record<Status, React.ElementType> = {
  submitted: FileText, ai_verified: TrendingUp, under_review: Clock,
  assigned: Building2, in_progress: Users, resolved: CheckCircle2,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ─── Page ─────────────────────────────────────────────────────── */
export default function ChallengeDetailPage({ params }: { params: { id: string } }) {
  const challenge = CHALLENGES.find((c) => c.id === params.id);
  if (!challenge) notFound();

  const [supported, setSupported] = useState(false);
  const [supportCount, setSupportCount] = useState(challenge.support);

  const CategoryIcon = CATEGORY_ICONS[challenge.category] || Tag;
  const currentStepIndex = STATUS_ORDER.indexOf(challenge.status);

  const handleSupport = () => {
    if (!supported) {
      setSupportCount((n) => n + 1);
      setSupported(true);
    }
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-navy-900 py-12 text-paper md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Link
            href="/challenges"
            className="mb-6 inline-flex items-center gap-2 text-sm text-navy-300 transition hover:text-paper"
          >
            <ArrowLeft size={14} /> Back to Challenges
          </Link>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-white/10">
              <CategoryIcon size={20} className="text-saffron" />
            </div>
            <span className="rounded-sm bg-saffron/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-saffron-300">
              {challenge.category}
            </span>
            <span className={`rounded-sm px-2 py-0.5 text-xs font-bold uppercase ${PRIORITY_STYLES[challenge.priority]}`}>
              {challenge.priority} priority
            </span>
          </div>

          <h1 className="mt-5 font-serif text-2xl font-semibold leading-snug md:text-3xl lg:text-4xl">
            {challenge.title}
          </h1>

          {/* Meta row */}
          <div className="mt-5 flex flex-wrap gap-5 text-sm text-navy-300">
            <span className="flex items-center gap-1.5"><Hash size={14} />{challenge.id}</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} />{challenge.location}, {challenge.district}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} />{formatDate(challenge.date)}</span>
            <span className="flex items-center gap-1.5"><ThumbsUp size={14} />{supportCount} community support</span>
          </div>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">

          {/* Left — Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Problem description */}
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <AlertCircle size={18} className="text-brick" />
                <h2 className="font-serif text-lg font-semibold text-navy-900">Problem Description</h2>
              </div>
              <p className="text-sm leading-relaxed text-navy-600">{challenge.fullDescription}</p>
            </div>

            {/* Status Timeline */}
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <h2 className="mb-6 font-serif text-lg font-semibold text-navy-900">Challenge Progress</h2>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="mb-1 flex items-center justify-between text-xs font-medium text-navy-500">
                  <span>Resolution Progress</span>
                  <span>{challenge.progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-navy-100">
                  <div
                    className="h-full rounded-full bg-moss transition-all"
                    style={{ width: `${challenge.progress}%` }}
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {STATUS_ORDER.map((step, i) => {
                  const StepIcon = STEP_ICONS[step];
                  const isDone = i < currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  return (
                    <div key={step} className="relative flex gap-4 pl-1">
                      {/* Connector line */}
                      {i < STATUS_ORDER.length - 1 && (
                        <div className={`absolute left-4 top-8 h-[calc(100%+8px)] w-px ${isDone || isCurrent ? 'bg-moss' : 'bg-navy-100'}`} />
                      )}
                      {/* Circle */}
                      <div className={`relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                        isDone ? 'border-moss bg-moss' :
                        isCurrent ? 'border-saffron bg-saffron-100' :
                        'border-navy-200 bg-white'
                      }`}>
                        {isDone
                          ? <CheckCircle2 size={14} className="text-white" />
                          : isCurrent
                          ? <StepIcon size={14} className="text-saffron-700" />
                          : <Circle size={14} className="text-navy-300" />}
                      </div>
                      {/* Text */}
                      <div className={`pb-4 ${isCurrent ? '' : isDone ? 'opacity-70' : 'opacity-40'}`}>
                        <p className={`text-sm font-semibold ${isCurrent ? 'text-navy-900' : 'text-navy-700'}`}>
                          {STATUS_LABELS[step]}
                          {isCurrent && <span className="ml-2 rounded-full bg-saffron-100 px-2 py-0.5 text-xs font-bold text-saffron-700">Current</span>}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-navy-500">{STATUS_DESCRIPTIONS[step]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Proposed Solution */}
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Lightbulb size={18} className="text-saffron-700" />
                <h2 className="font-serif text-lg font-semibold text-navy-900">Proposed Solution & Next Steps</h2>
              </div>
              <p className="text-sm leading-relaxed text-navy-600">{challenge.proposedSolution}</p>
            </div>

            {/* Evidence section */}
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-serif text-lg font-semibold text-navy-900">Evidence & Media</h2>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-video rounded-lg bg-navy-50 flex items-center justify-center border border-navy-100">
                    <span className="text-xs text-navy-400">Photo {i}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-navy-400">
                Evidence submitted by the reporting community. Media is under moderation.
              </p>
            </div>
          </div>

          {/* Right — Sidebar */}
          <div className="space-y-5">

            {/* Quick info card */}
            <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-serif text-sm font-semibold text-navy-900 uppercase tracking-wide">Challenge Info</h3>
              <dl className="space-y-3 text-sm">
                {[
                  { label: 'Challenge ID', value: challenge.id },
                  { label: 'Category', value: challenge.category },
                  { label: 'District', value: challenge.district },
                  { label: 'Date Submitted', value: formatDate(challenge.date) },
                  { label: 'Priority', value: <span className={`rounded-sm px-1.5 py-0.5 text-xs font-bold capitalize ${PRIORITY_STYLES[challenge.priority]}`}>{challenge.priority}</span> },
                  { label: 'Status', value: STATUS_LABELS[challenge.status] },
                  { label: 'Submitted By', value: challenge.submittedBy },
                  { label: 'Community Support', value: `${supportCount} votes` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-2 border-b border-navy-50 pb-2">
                    <dt className="text-navy-500 flex-shrink-0">{label}</dt>
                    <dd className="text-right font-medium text-navy-800">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Support CTA */}
            <div className="rounded-xl border border-saffron-200 bg-saffron-100/40 p-5">
              <h3 className="font-serif text-sm font-semibold text-navy-900">Back This Challenge</h3>
              <p className="mt-1 text-xs text-navy-500">
                Show your support. More votes increase priority and university attention.
              </p>
              <button
                onClick={handleSupport}
                disabled={supported}
                className={`mt-4 w-full rounded-sm py-2.5 text-sm font-semibold transition ${
                  supported
                    ? 'bg-moss text-white cursor-not-allowed'
                    : 'bg-navy text-paper hover:bg-navy-900'
                }`}
              >
                {supported ? `✓ Supported (${supportCount})` : `Support This Challenge`}
              </button>
            </div>

            {/* Related category */}
            <div className="rounded-xl border border-navy-100 bg-white p-5 shadow-sm">
              <h3 className="mb-3 font-serif text-sm font-semibold text-navy-900">Related Category</h3>
              <Link
                href={`/challenges?category=${encodeURIComponent(challenge.category)}`}
                className="flex items-center gap-2 rounded-lg border border-navy-100 bg-navy-50 px-3 py-2 text-sm font-medium text-navy-700 transition hover:border-saffron-300 hover:bg-saffron-100/30"
              >
                <CategoryIcon size={16} className="text-saffron-700" />
                {challenge.category}
                <ArrowRight size={13} className="ml-auto" />
              </Link>
            </div>

            {/* Back button */}
            <Link
              href="/challenges"
              className="flex w-full items-center justify-center gap-2 rounded-sm border border-navy-300 px-4 py-2.5 text-sm font-semibold text-navy-700 transition hover:border-navy hover:bg-navy-50"
            >
              <ArrowLeft size={14} /> Back to All Challenges
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
