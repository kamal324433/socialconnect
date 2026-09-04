'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';
import { pushNotification } from '@/lib/notifications';
import type { Project, IndustryPartner } from '@/lib/types';
import { SectionLabel, StatusPill, Button, Card, EmptyState } from '@/components/ui';
import Link from 'next/link';

const PARTNERSHIP_TYPES: { value: IndustryPartner['partnershipType']; label: string }[] = [
  { value: 'mentoring', label: 'Mentoring' },
  { value: 'co_development', label: 'Co-development' },
  { value: 'funding', label: 'Funding' },
  { value: 'prototyping', label: 'Prototyping' },
  { value: 'pilot_implementation', label: 'Pilot implementation' },
  { value: 'technology_transfer', label: 'Technology transfer' }
];

export default function IndustryPage() {
  const { user, profile, loading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [offering, setOffering] = useState<string | null>(null);
  const [type, setType] = useState<IndustryPartner['partnershipType']>('mentoring');
  const [contribution, setContribution] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'projects'), (snap) => setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Project)));
    return () => unsub();
  }, []);

  if (loading) return <div className="px-6 py-16 text-center text-navy-500">Loading…</div>;
  if (!profile || profile.role !== 'industry') {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <h1 className="font-serif text-2xl font-semibold text-navy-900">Industry / partner access required</h1>
        <p className="mt-2 text-navy-500">Sign in with your organization's account to discover collaboration opportunities.</p>
        <Link href="/login" className="mt-6 inline-block rounded-sm bg-navy px-5 py-2.5 text-sm font-medium text-paper">Sign in</Link>
      </div>
    );
  }

  const offerPartnership = async (p: Project) => {
    const partner: IndustryPartner = {
      uid: user!.uid,
      organization: profile!.organization || profile!.name,
      partnershipType: type,
      contribution
    };
    await updateDoc(doc(db, 'projects', p.id), { industryPartners: arrayUnion(partner), updatedAt: Date.now() });
    for (const member of p.team) {
      if (member.role === 'faculty_mentor') {
        await pushNotification({
          userId: member.uid,
          title: 'New industry partner offer',
          message: `${partner.organization} offered ${type.replaceAll('_', ' ')} support for "${p.title}".`,
          type: 'partnership',
          link: `/projects/${p.id}`
        });
      }
    }
    setOffering(null);
    setContribution('');
  };

  const open = projects.filter((p) => !['completed', 'discontinued'].includes(p.status));

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SectionLabel index="04">Industry Partnership</SectionLabel>
      <p className="mb-8 -mt-4 max-w-2xl text-navy-500">
        Browse active university projects and offer mentoring, co-development, funding, prototyping, pilot implementation or
        technology transfer support.
      </p>

      {open.length === 0 ? (
        <EmptyState title="No active projects yet" hint="Projects open for partnership will appear here as universities take up challenges." />
      ) : (
        <div className="space-y-4">
          {open.map((p) => (
            <Card key={p.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-teal-500">{p.category} · {p.district}, {p.state}</p>
                  <h3 className="mt-1 font-serif text-lg font-semibold text-navy-900">{p.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-navy-500">{p.summary || 'No summary provided yet.'}</p>
                  <p className="mt-2 text-xs text-navy-500">{p.universityName} · {p.team.length} team member(s)</p>
                </div>
                <StatusPill status={p.status} />
              </div>

              {p.industryPartners.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.industryPartners.map((ip, i) => (
                    <span key={i} className="rounded-sm bg-teal-100 px-2 py-1 text-xs text-teal-500">
                      {ip.organization} · {ip.partnershipType.replaceAll('_', ' ')}
                    </span>
                  ))}
                </div>
              )}

              {offering === p.id ? (
                <div className="mt-4 space-y-3 border-t border-navy-50 pt-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-navy-700">Partnership type</label>
                    <select value={type} onChange={(e) => setType(e.target.value as IndustryPartner['partnershipType'])} className="rounded-sm border border-navy-300 px-2 py-1.5 text-sm focus:border-teal focus:outline-none">
                      {PARTNERSHIP_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-navy-700">What are you offering?</label>
                    <textarea value={contribution} onChange={(e) => setContribution(e.target.value)} rows={2} className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none" />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => offerPartnership(p)}>Send offer</Button>
                    <Button variant="ghost" onClick={() => setOffering(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex gap-2 border-t border-navy-50 pt-4">
                  <Button variant="secondary" onClick={() => setOffering(p.id)}>Offer partnership</Button>
                  <Link href={`/projects/${p.id}`}>
                    <Button variant="ghost">View project</Button>
                  </Link>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
