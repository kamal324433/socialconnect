'use client';

import { useEffect, useState, useRef } from 'react';
import { Bell } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { subscribeToNotifications, markNotificationRead } from '@/lib/notifications';
import type { NotificationDoc } from '@/lib/types';
import Link from 'next/link';

export default function NotificationBell() {
  const { user } = useAuth();
  const [items, setItems] = useState<NotificationDoc[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToNotifications(user.uid, setItems);
    return () => unsub();
  }, [user]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const unread = items.filter((i) => !i.read).length;

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} className="relative rounded-sm p-2 text-navy-700 hover:bg-navy-50" aria-label="Notifications">
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brick text-[10px] font-semibold text-paper">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-md border border-navy-100 bg-white shadow-panel">
          <div className="border-b border-navy-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-navy-500">Notifications</div>
          <div className="max-h-96 overflow-y-auto scrollbar-thin">
            {items.length === 0 && <p className="px-4 py-6 text-center text-sm text-navy-300">Nothing yet.</p>}
            {items.map((n) => (
              <Link
                key={n.id}
                href={n.link || '#'}
                onClick={() => !n.read && markNotificationRead(n.id)}
                className={`block border-b border-navy-50 px-4 py-3 text-sm hover:bg-navy-50 ${!n.read ? 'bg-saffron-100/40' : ''}`}
              >
                <p className="font-medium text-navy-900">{n.title}</p>
                <p className="mt-0.5 text-navy-500">{n.message}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
