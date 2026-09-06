import Link from 'next/link';
import { ArrowLeft, ArrowRight, LucideIcon } from 'lucide-react';

interface FeatureDetailLayoutProps {
  icon: LucideIcon;
  badge: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  children: React.ReactNode;
}

export default function FeatureDetailLayout({
  icon: Icon,
  badge,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  children
}: FeatureDetailLayoutProps) {
  return (
    <div className="min-h-screen bg-paper">
      {/* Hero */}
      <section className="bg-navy-900 py-16 text-paper md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <Link
            href="/how-it-works"
            className="mb-8 inline-flex items-center gap-2 text-sm text-navy-300 transition hover:text-paper"
          >
            <ArrowLeft size={14} />
            Back to How It Works
          </Link>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-white/10">
              <Icon size={24} className="text-saffron" />
            </div>
            <span className="rounded-sm bg-saffron/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-saffron-300">
              {badge}
            </span>
          </div>

          <h1 className="mt-6 font-serif text-3xl font-semibold leading-tight md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-200">{subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        {children}
      </main>

      {/* CTA Footer */}
      <section className="border-t border-navy-100 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-2xl font-semibold text-navy-900">Ready to get started?</h2>
          <p className="mt-2 text-navy-500">Join SocialConnect and become part of the solution.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-sm bg-navy px-6 py-3 text-sm font-semibold text-paper transition hover:bg-navy-900"
            >
              {ctaLabel} <ArrowRight size={16} />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 rounded-sm border border-navy-300 px-6 py-3 text-sm font-semibold text-navy-700 transition hover:border-navy hover:bg-navy-50"
            >
              <ArrowLeft size={14} /> Back to How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export function InfoCard({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-saffron-100">
        <Icon size={20} className="text-saffron-700" />
      </div>
      <h3 className="font-serif text-base font-semibold text-navy-900">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-navy-500">{body}</p>
    </div>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-2xl font-semibold text-navy-900 md:text-3xl">{children}</h2>
  );
}

export function ProseBlock({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 max-w-3xl text-base leading-relaxed text-navy-600">{children}</p>;
}
