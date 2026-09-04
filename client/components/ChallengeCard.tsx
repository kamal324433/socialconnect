import Link from 'next/link';
import { MapPin } from 'lucide-react';
import type { Challenge } from '@/lib/types';
import { StatusPill, PriorityPill } from './ui';
import { formatDistanceToNow } from 'date-fns';

export default function ChallengeCard({ challenge, href, actions }: { challenge: Challenge; href?: string; actions?: React.ReactNode }) {
  const content = (
    <div className="rounded-md border border-navy-100 bg-white p-5 shadow-card transition hover:border-navy-300">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-teal-500">{challenge.category}</p>
          <h3 className="mt-1 font-serif text-lg font-semibold text-navy-900">{challenge.title}</h3>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <StatusPill status={challenge.status} />
          <PriorityPill priority={challenge.priority} />
        </div>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-navy-500">{challenge.description}</p>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-navy-500">
        <span className="flex items-center gap-1"><MapPin size={12} /> {challenge.location?.district}{challenge.location?.state ? `, ${challenge.location.state}` : ''}</span>
        <span>Submitted by {challenge.submitterName}</span>
        <span>{challenge.createdAt ? formatDistanceToNow(challenge.createdAt, { addSuffix: true }) : ''}</span>
        {challenge.assignedUniversityName && <span>→ Routed to {challenge.assignedUniversityName}</span>}
      </div>
      {actions && <div className="mt-4 flex gap-2">{actions}</div>}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
