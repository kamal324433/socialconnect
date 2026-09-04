'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { subscribeToNotifications, markNotificationRead } from '@/lib/notifications';
import type { NotificationDoc } from '@/lib/types';
import { SectionLabel, EmptyState, Card } from '@/components/ui';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationsPage() {
  const { user, loading } = useAuth();
  const [items, setItems] = useState<NotificationDoc[]>([]);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToNotifications(user.uid, setItems);
    return () => unsub();
  }, [user]);

  if (loading) return <div className="px-6 py-16 text-center text-navy-500">Loading…</div>;
  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <h1 className="font-serif text-2xl font-semibold text-navy-900">Sign in to view notifications</h1>
        <Link href="/login" className="mt-6 inline-block rounded-sm bg-navy px-5 py-2.5 text-sm font-medium text-paper">Sign in</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <SectionLabel index="07">Notifications</SectionLabel>
      {items.length === 0 ? (
        <EmptyState title="You're all caught up" hint="Updates on your challenges, projects and partnerships will show up here." />
      ) : (
        <div className="space-y-2">
          {items.map((n) => (
            <Link key={n.id} href={n.link || '#'} onClick={() => !n.read && markNotificationRead(n.id)}>
              <Card className={!n.read ? 'border-saffron-300 bg-saffron-100/30' : ''}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-navy-900">{n.title}</p>
                    <p className="mt-1 text-sm text-navy-500">{n.message}</p>
                  </div>
                  <span className="whitespace-nowrap text-xs text-navy-400">{formatDistanceToNow(n.createdAt, { addSuffix: true })}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
