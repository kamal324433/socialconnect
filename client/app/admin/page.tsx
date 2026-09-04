'use client';

import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';
import { routeToUniversity, type UniversityCandidate } from '@/lib/aiEngine';
import { pushNotification } from '@/lib/notifications';
import { CATEGORY_TAXONOMY, type Challenge } from '@/lib/types';
import { SectionLabel, StatCard, StatusPill, PriorityPill, Button, EmptyState } from '@/components/ui';
import Link from 'next/link';

export default function AdminPage() {
  const { profile, loading } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [universities, setUniversities] = useState<UniversityCandidate[]>([]);
  const [filter, setFilter] = useState<'queue' | 'all'>('queue');

  useEffect(() => {
    const q = query(collection(db, 'challenges'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => setChallenges(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Challenge)));
    return () => unsub();
  }, []);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(query(collection(db, 'users'), where('role', '==', 'university')));
      setUniversities(
        snap.docs.map((d) => {
          const data = d.data();
          return { id: d.id, name: data.organization || data.name, capabilities: data.capabilities?.length ? data.capabilities : [data.sector].filter(Boolean), district: data.district };
        })
      );
    })();
  }, []);

  const queue = useMemo(() => challenges.filter((c) => ['submitted', 'under_review'].includes(c.status)), [challenges]);
  const visible = filter === 'queue' ? queue : challenges;

  const stats = useMemo(
    () => ({
      total: challenges.length,
      pending: queue.length,
      routed: challenges.filter((c) => c.status === 'routed' || c.status === 'in_progress').length,
      critical: challenges.filter((c) => c.priority === 'critical').length
    }),
    [challenges, queue]
  );

  if (loading) return <div className="px-6 py-16 text-center text-navy-500">Loading…</div>;
  if (!profile || profile.role !== 'admin') {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <h1 className="font-serif text-2xl font-semibold text-navy-900">Admin access required</h1>
        <p className="mt-2 text-navy-500">Sign in with an administrator account to access the problem-management console.</p>
        <Link href="/login" className="mt-6 inline-block rounded-sm bg-navy px-5 py-2.5 text-sm font-medium text-paper">Sign in</Link>
      </div>
    );
  }

  const setCategory = async (c: Challenge, category: string) => updateDoc(doc(db, 'challenges', c.id), { category, updatedAt: Date.now() });
  const setPriority = async (c: Challenge, priority: Challenge['priority']) => updateDoc(doc(db, 'challenges', c.id), { priority, updatedAt: Date.now() });

  const validate = async (c: Challenge) => {
    await updateDoc(doc(db, 'challenges', c.id), { status: 'validated', updatedAt: Date.now() });
  };

  const markDuplicate = async (c: Challenge, ofId: string) => {
    await updateDoc(doc(db, 'challenges', c.id), { status: 'duplicate', duplicateOf: ofId, updatedAt: Date.now() });
  };

  const route = async (c: Challenge) => {
    const result = routeToUniversity({ category: c.category, district: c.location.district, tags: c.tags }, universities);
    await updateDoc(doc(db, 'challenges', c.id), {
      status: result.universityId ? 'routed' : 'validated',
      assignedUniversityId: result.universityId,
      assignedUniversityName: result.universityName,
      routingReason: result.reason,
      updatedAt: Date.now()
    });
    if (result.universityId) {
      await pushNotification({
        userId: result.universityId,
        title: 'New challenge routed to your institution',
        message: `"${c.title}" (${c.category}) has been assigned to you for review.`,
        type: 'challenge',
        link: '/university'
      });
    }
    await pushNotification({
      userId: c.submittedBy,
      title: result.universityId ? 'Your challenge was routed' : 'Your challenge is under review',
      message: result.universityId
        ? `"${c.title}" has been routed to ${result.universityName}.`
        : `"${c.title}" was validated but awaits manual university assignment.`,
      type: 'challenge',
      link: '/citizen'
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <SectionLabel index="02">AI-Enabled Problem Management</SectionLabel>
      <p className="mb-8 -mt-4 max-w-2xl text-navy-500">
        Review AI-suggested categories, priority scores and duplicate flags, then route validated challenges to the
        best-matched university.
      </p>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total challenges" value={stats.total} />
        <StatCard label="Pending triage" value={stats.pending} />
        <StatCard label="Routed / active" value={stats.routed} />
        <StatCard label="Critical priority" value={stats.critical} />
      </div>

      <div className="mb-4 flex gap-2">
        <button onClick={() => setFilter('queue')} className={`rounded-sm px-3 py-1.5 text-sm font-medium ${filter === 'queue' ? 'bg-navy text-paper' : 'border border-navy-300 text-navy-700'}`}>
          Triage queue ({queue.length})
        </button>
        <button onClick={() => setFilter('all')} className={`rounded-sm px-3 py-1.5 text-sm font-medium ${filter === 'all' ? 'bg-navy text-paper' : 'border border-navy-300 text-navy-700'}`}>
          All challenges
        </button>
      </div>

      {visible.length === 0 ? (
        <EmptyState title="Nothing to triage" hint="New citizen submissions will appear here automatically." />
      ) : (
        <div className="space-y-4">
          {visible.map((c) => (
            <div key={c.id} className="rounded-md border border-navy-100 bg-white p-5 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-navy-900">{c.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-navy-500">{c.description}</p>
                  <p className="mt-2 text-xs text-navy-500">
                    {c.location?.district}, {c.location?.state} · Submitted by {c.submitterName} ({c.submitterType})
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <StatusPill status={c.status} />
                  <PriorityPill priority={c.priority} />
                  {typeof c.priorityScore === 'number' && <span className="text-xs text-navy-500">AI score: {c.priorityScore}/100</span>}
                </div>
              </div>

              {c.duplicateCandidates && c.duplicateCandidates.length > 0 && c.status !== 'duplicate' && (
                <div className="mt-3 rounded-sm bg-brick-100 px-3 py-2 text-xs text-brick">
                  Possible duplicate of {c.duplicateCandidates.length} existing challenge(s) — highest similarity{' '}
                  {(c.duplicateCandidates[0].score * 100).toFixed(0)}%.
                  <button className="ml-2 underline" onClick={() => markDuplicate(c, c.duplicateCandidates![0].challengeId)}>
                    Mark as duplicate
                  </button>
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-navy-50 pt-4">
                <label className="text-xs font-medium text-navy-500">Category</label>
                <select
                  value={c.category}
                  onChange={(e) => setCategory(c, e.target.value)}
                  className="rounded-sm border border-navy-300 px-2 py-1 text-xs focus:border-teal focus:outline-none"
                >
                  {CATEGORY_TAXONOMY.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <label className="ml-2 text-xs font-medium text-navy-500">Priority</label>
                <select
                  value={c.priority}
                  onChange={(e) => setPriority(c, e.target.value as Challenge['priority'])}
                  className="rounded-sm border border-navy-300 px-2 py-1 text-xs focus:border-teal focus:outline-none"
                >
                  {['low', 'medium', 'high', 'critical'].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>

                <div className="ml-auto flex gap-2">
                  {c.status === 'submitted' || c.status === 'under_review' ? (
                    <Button variant="ghost" onClick={() => validate(c)}>Validate</Button>
                  ) : null}
                  {(c.status === 'validated' || c.status === 'submitted' || c.status === 'under_review') && (
                    <Button variant="secondary" onClick={() => route(c)}>Route to university</Button>
                  )}
                  {c.assignedUniversityName && <span className="self-center text-xs text-navy-500">→ {c.assignedUniversityName}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
