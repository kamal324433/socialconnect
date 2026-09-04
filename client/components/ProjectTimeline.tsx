import { CheckCircle2, Circle, Clock, AlertTriangle } from 'lucide-react';
import type { Milestone } from '@/lib/types';
import { format } from 'date-fns';

const ICON: Record<Milestone['status'], React.ReactNode> = {
  completed: <CheckCircle2 size={18} className="text-moss" />,
  in_progress: <Clock size={18} className="text-saffron-700" />,
  delayed: <AlertTriangle size={18} className="text-brick" />,
  pending: <Circle size={18} className="text-navy-300" />
};

export default function ProjectTimeline({ milestones }: { milestones: Milestone[] }) {
  if (!milestones.length) {
    return <p className="text-sm text-navy-500">No milestones defined yet.</p>;
  }
  return (
    <ol className="relative space-y-6 border-l border-navy-100 pl-6">
      {milestones.map((m) => (
        <li key={m.id} className="relative">
          <span className="absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-white">{ICON[m.status]}</span>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-medium text-navy-900">{m.title}</p>
            <p className="text-xs text-navy-500">Due {format(m.dueDate, 'd MMM yyyy')}</p>
          </div>
          {m.description && <p className="mt-1 text-sm text-navy-500">{m.description}</p>}
          {m.deliverableUrl && (
            <a href={m.deliverableUrl} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs font-medium text-teal-500 underline">
              View deliverable
            </a>
          )}
        </li>
      ))}
    </ol>
  );
}
