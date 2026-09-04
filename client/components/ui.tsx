import { ReactNode } from 'react';
import clsx from 'clsx';

const STATUS_STYLES: Record<string, string> = {
  submitted: 'bg-navy-100 text-navy-700',
  under_review: 'bg-saffron-100 text-saffron-700',
  duplicate: 'bg-navy-100 text-navy-500',
  rejected: 'bg-brick-100 text-brick',
  validated: 'bg-teal-100 text-teal-500',
  routed: 'bg-teal-100 text-teal-500',
  in_progress: 'bg-saffron-100 text-saffron-700',
  resolved: 'bg-moss-100 text-moss',
  closed: 'bg-navy-100 text-navy-500',
  team_formation: 'bg-navy-100 text-navy-700',
  proposal_drafting: 'bg-saffron-100 text-saffron-700',
  proposal_submitted: 'bg-teal-100 text-teal-500',
  approved: 'bg-moss-100 text-moss',
  testing: 'bg-saffron-100 text-saffron-700',
  pilot: 'bg-teal-100 text-teal-500',
  completed: 'bg-moss-100 text-moss',
  discontinued: 'bg-brick-100 text-brick'
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span className={clsx('inline-block rounded-sm px-2 py-0.5 text-xs font-medium capitalize', STATUS_STYLES[status] || 'bg-navy-100 text-navy-700')}>
      {status.replaceAll('_', ' ')}
    </span>
  );
}

const PRIORITY_STYLES: Record<string, string> = {
  low: 'bg-navy-100 text-navy-500',
  medium: 'bg-saffron-100 text-saffron-700',
  high: 'bg-brick-100 text-brick',
  critical: 'bg-brick text-paper'
};

export function PriorityPill({ priority }: { priority: string }) {
  return (
    <span className={clsx('inline-block rounded-sm px-2 py-0.5 text-xs font-semibold uppercase tracking-wide', PRIORITY_STYLES[priority])}>
      {priority}
    </span>
  );
}

export function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-md border border-navy-100 bg-white p-5 shadow-card">
      <p className="text-xs font-medium uppercase tracking-wide text-navy-500">{label}</p>
      <p className="mt-2 font-serif text-3xl font-semibold text-navy-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-navy-500">{hint}</p>}
    </div>
  );
}

export function SectionLabel({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <div className="mb-6 flex items-baseline gap-3">
      {index && <span className="font-serif text-sm text-saffron-700">{index}</span>}
      <h2 className="font-serif text-2xl font-semibold text-navy-900">{children}</h2>
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('rounded-md border border-navy-100 bg-white p-5 shadow-card', className)}>{children}</div>;
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-md border border-dashed border-navy-300 bg-white/50 px-6 py-12 text-center">
      <p className="font-medium text-navy-700">{title}</p>
      {hint && <p className="mt-1 text-sm text-navy-500">{hint}</p>}
    </div>
  );
}

export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled,
  className
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  disabled?: boolean;
  className?: string;
}) {
  const styles = {
    primary: 'bg-navy text-paper hover:bg-navy-900',
    secondary: 'bg-saffron text-paper hover:bg-saffron-700',
    ghost: 'border border-navy-300 text-navy-700 hover:border-navy hover:text-navy',
    outline: 'border border-navy-300 text-navy-700 hover:border-navy hover:bg-navy-50 hover:text-navy'
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx('rounded-sm px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50', styles[variant], className)}
    >
      {children}
    </button>
  );
}
