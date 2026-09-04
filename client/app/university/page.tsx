'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';
import { pushNotification } from '@/lib/notifications';
import type { Challenge, Project, TeamMember } from '@/lib/types';
import { SectionLabel, StatusPill, PriorityPill, Button, Card, EmptyState } from '@/components/ui';
import Link from 'next/link';

export default function UniversityPage() {
  const { user, profile, loading } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [drafting, setDrafting] = useState<string | null>(null);
  const [teamText, setTeamText] = useState('');
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalSummary, setProposalSummary] = useState('');

  useEffect(() => {
    if (!user) return;
    const cq = query(collection(db, 'challenges'), where('assignedUniversityId', '==', user.uid));
    const unsubC = onSnapshot(cq, (snap) => setChallenges(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Challenge)));
    const pq = query(collection(db, 'projects'), where('universityId', '==', user.uid));
    const unsubP = onSnapshot(pq, (snap) => setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Project)));
    return () => { unsubC(); unsubP(); };
  }, [user]);

  if (loading) return <div className="px-6 py-16 text-center text-navy-500">Loading…</div>;
  if (!profile || profile.role !== 'university') {
    return (
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <h1 className="font-serif text-2xl font-semibold text-navy-900">University access required</h1>
        <p className="mt-2 text-navy-500">Sign in with your institution's account to review assigned challenges.</p>
        <Link href="/login" className="mt-6 inline-block rounded-sm bg-navy px-5 py-2.5 text-sm font-medium text-paper">Sign in</Link>
      </div>
    );
  }

  const projectForChallenge = (challengeId: string) => projects.find((p) => p.challengeId === challengeId);

  const startProposal = (c: Challenge) => {
    setDrafting(c.id);
    setProposalTitle(`Solution proposal: ${c.title}`);
    setProposalSummary('');
    setTeamText('');
  };

  const submitProposal = async (c: Challenge) => {
    const team: TeamMember[] = teamText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name, role, discipline] = line.split(',').map((s) => s.trim());
        return { uid: `member-${name}`, name, role: (role as TeamMember['role']) || 'student', discipline };
      });

    const project: Omit<Project, 'id'> = {
      challengeId: c.id,
      title: proposalTitle,
      summary: proposalSummary,
      universityId: user!.uid,
      universityName: profile!.organization || profile!.name,
      team,
      industryPartners: [],
      status: 'proposal_submitted',
      milestones: [],
      ipRecords: [],
      district: c.location.district,
      state: c.location.state,
      category: c.category,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const ref = await addDoc(collection(db, 'projects'), project);
    await updateDoc(doc(db, 'challenges', c.id), { status: 'in_progress', projectId: ref.id, updatedAt: Date.now() });
    await pushNotification({
      userId: c.submittedBy,
      title: 'A team has taken up your challenge',
      message: `${profile!.organization || profile!.name} formed a team and submitted a proposal for "${c.title}".`,
      type: 'project',
      link: '/citizen'
    });
    setDrafting(null);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <SectionLabel index="03">University Collaboration</SectionLabel>
      <p className="mb-8 -mt-4 max-w-2xl text-navy-500">
        Review challenges routed to {profile.organization || 'your institution'}, form a multidisciplinary team with a faculty
        mentor, and submit a solution proposal to open the project workspace.
      </p>

      {challenges.length === 0 ? (
        <EmptyState title="No challenges routed yet" hint="Challenges matching your registered expertise will appear here." />
      ) : (
        <div className="space-y-4">
          {challenges.map((c) => {
            const project = projectForChallenge(c.id);
            return (
              <Card key={c.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-teal-500">{c.category}</p>
                    <h3 className="mt-1 font-serif text-lg font-semibold text-navy-900">{c.title}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-navy-500">{c.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <StatusPill status={c.status} />
                    <PriorityPill priority={c.priority} />
                  </div>
                </div>

                {project ? (
                  <div className="mt-4 flex items-center justify-between rounded-sm bg-navy-50 px-4 py-3">
                    <p className="text-sm text-navy-700">Proposal submitted — project workspace open.</p>
                    <Link href={`/projects/${project.id}`} className="text-sm font-medium text-teal-500 underline">
                      Open workspace →
                    </Link>
                  </div>
                ) : drafting === c.id ? (
                  <div className="mt-4 space-y-3 border-t border-navy-50 pt-4">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-navy-700">Proposal title</label>
                      <input value={proposalTitle} onChange={(e) => setProposalTitle(e.target.value)} className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-navy-700">Proposal summary</label>
                      <textarea value={proposalSummary} onChange={(e) => setProposalSummary(e.target.value)} rows={3} className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none" />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-navy-700">
                        Team members — one per line: <code className="text-navy-400">Name, role, discipline</code>
                      </label>
                      <textarea
                        value={teamText}
                        onChange={(e) => setTeamText(e.target.value)}
                        rows={3}
                        placeholder={'Dr. A Sharma, faculty_mentor, Civil Engineering\nR Verma, student, Environmental Science'}
                        className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm font-mono focus:border-teal focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => submitProposal(c)}>Submit proposal</Button>
                      <Button variant="ghost" onClick={() => setDrafting(null)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 border-t border-navy-50 pt-4">
                    <Button variant="secondary" onClick={() => startProposal(c)}>Form team & propose solution</Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
