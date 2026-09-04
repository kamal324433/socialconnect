'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';
import ChallengeForm from '@/components/ChallengeForm';
import ChallengeCard from '@/components/ChallengeCard';
import { SectionLabel, EmptyState } from '@/components/ui';
import type { Challenge } from '@/lib/types';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function CitizenPage() {
  const { user, profile, loading, signInAnonymouslyUser } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [showForm, setShowForm] = useState(true);
  const [anonLoading, setAnonLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'challenges'), where('submittedBy', '==', user.uid), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => setChallenges(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Challenge)));
    return () => unsub();
  }, [user]);

  if (loading) return <div className="px-6 py-16 text-center text-navy-500">Loading…</div>;

  if (!user || !profile) {
    const handleAnonSignIn = async () => {
      setAnonLoading(true);
      try {
        await signInAnonymouslyUser();
      } catch (e) {
        console.error(e);
      } finally {
        setAnonLoading(false);
      }
    };

    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <h1 className="font-serif text-2xl font-semibold text-navy-900">Sign in to report a challenge</h1>
        <p className="mt-2 text-navy-500">Track evidence, status and the university your challenge is routed to.</p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link href="/login" className="rounded-sm border border-navy px-5 py-2.5 text-sm font-medium text-navy hover:bg-navy-50">Sign in with Email</Link>
          <button 
            onClick={handleAnonSignIn} 
            disabled={anonLoading}
            className="flex items-center gap-2 rounded-sm bg-navy px-5 py-2.5 text-sm font-medium text-paper disabled:opacity-70"
          >
            {anonLoading && <Loader2 size={16} className="animate-spin" />}
            Submit Anonymously
          </button>
        </div>
      </div>
    );
  }

  // Determine role-specific welcoming
  const isGovt = profile.role === 'pri' || profile.role === 'ulb' || profile.role === 'department';
  const welcomeTitle = isGovt ? `Welcome, ${profile.role.toUpperCase()} Representative` : 'Citizen Engagement';
  const welcomeText = isGovt 
    ? 'Submit systemic challenges on behalf of your jurisdiction. Your submissions are flagged as verified.'
    : 'Submit a societal challenge with evidence and location. Our AI engine categorizes, prioritizes and routes it to the university best equipped to solve it — you\'ll be notified at every step.';

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <SectionLabel index="01">{welcomeTitle}</SectionLabel>
      <p className="mb-8 -mt-4 max-w-2xl text-navy-500">
        {welcomeText}
      </p>

      <div className="mb-10 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {showForm ? <ChallengeForm onSubmitted={() => setShowForm(true)} /> : null}
        </div>
        <div className="rounded-md border border-navy-100 bg-white p-5 shadow-card">
          <p className="text-sm font-semibold text-navy-900">Tips for a strong submission</p>
          <ul className="mt-3 space-y-2 text-sm text-navy-500">
            <li>• Be specific about location — GPS capture speeds up validation.</li>
            <li>• Add photos or short videos as evidence where possible.</li>
            <li>• Mention how many people are affected and since when.</li>
            <li>• Check "My submissions" below before filing — the system flags likely duplicates automatically.</li>
          </ul>
        </div>
      </div>

      <SectionLabel>My submissions</SectionLabel>
      {challenges.length === 0 ? (
        <EmptyState title="No challenges submitted yet" hint="Your submissions will appear here with live status updates." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {challenges.map((c) => (
            <ChallengeCard key={c.id} challenge={c} />
          ))}
        </div>
      )}
    </div>
  );
}
