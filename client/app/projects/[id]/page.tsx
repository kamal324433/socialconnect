'use client';

import { useEffect, useState } from 'react';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';
import { v4 as uuid } from 'uuid';
import type { Project, Milestone, IPRecord, ProjectStatus } from '@/lib/types';
import { SectionLabel, StatusPill, Button, Card } from '@/components/ui';
import ProjectTimeline from '@/components/ProjectTimeline';

const STATUS_FLOW: ProjectStatus[] = ['team_formation', 'proposal_drafting', 'proposal_submitted', 'approved', 'in_progress', 'testing', 'pilot', 'completed'];

export default function ProjectWorkspace({ params }: { params: { id: string } }) {
  const { profile } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [msTitle, setMsTitle] = useState('');
  const [msDue, setMsDue] = useState('');
  const [ipTitle, setIpTitle] = useState('');
  const [ipType, setIpType] = useState<IPRecord['type']>('patent');
  const [testingOutcomes, setTestingOutcomes] = useState('');

  const canEdit = profile?.role === 'university' || profile?.role === 'admin';

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'projects', params.id), (snap) => {
      if (snap.exists()) setProject({ id: snap.id, ...snap.data() } as Project);
    });
    return () => unsub();
  }, [params.id]);

  if (!project) return <div className="px-6 py-16 text-center text-navy-500">Loading project…</div>;

  const setStatus = async (status: ProjectStatus) => updateDoc(doc(db, 'projects', project.id), { status, updatedAt: Date.now() });

  const addMilestone = async () => {
    if (!msTitle || !msDue) return;
    const milestone: Milestone = { id: uuid(), title: msTitle, dueDate: new Date(msDue).getTime(), status: 'pending' };
    await updateDoc(doc(db, 'projects', project.id), { milestones: arrayUnion(milestone), updatedAt: Date.now() });
    setMsTitle('');
    setMsDue('');
  };

  const completeMilestone = async (m: Milestone) => {
    const updated = project.milestones.map((x) => (x.id === m.id ? { ...x, status: 'completed' as const, completedDate: Date.now() } : x));
    await updateDoc(doc(db, 'projects', project.id), { milestones: updated, updatedAt: Date.now() });
  };

  const addIP = async () => {
    if (!ipTitle) return;
    const record: IPRecord = { id: uuid(), type: ipType, title: ipTitle, status: 'filed', date: Date.now() };
    await updateDoc(doc(db, 'projects', project.id), { ipRecords: arrayUnion(record), updatedAt: Date.now() });
    setIpTitle('');
  };

  const saveTestingOutcomes = async () => updateDoc(doc(db, 'projects', project.id), { testingOutcomes, updatedAt: Date.now() });

  const toggleStartup = async () => updateDoc(doc(db, 'projects', project.id), { startupCreated: !project.startupCreated, updatedAt: Date.now() });

  const setImplementation = async (implementationStatus: Project['implementationStatus']) =>
    updateDoc(doc(db, 'projects', project.id), { implementationStatus, updatedAt: Date.now() });

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <SectionLabel index="05">Project Lifecycle</SectionLabel>

      <Card className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-teal-500">{project.category} · {project.district}, {project.state}</p>
            <h1 className="mt-1 font-serif text-2xl font-semibold text-navy-900">{project.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-navy-500">{project.summary}</p>
            <p className="mt-2 text-xs text-navy-500">{project.universityName}</p>
          </div>
          <StatusPill status={project.status} />
        </div>

        {canEdit && (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-navy-50 pt-4">
            {STATUS_FLOW.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-sm px-2.5 py-1 text-xs font-medium capitalize ${project.status === s ? 'bg-navy text-paper' : 'border border-navy-300 text-navy-700 hover:border-navy'}`}
              >
                {s.replaceAll('_', ' ')}
              </button>
            ))}
          </div>
        )}
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Team */}
        <Card>
          <h2 className="mb-3 font-serif text-lg font-semibold text-navy-900">Project team</h2>
          <ul className="space-y-2">
            {project.team.map((m, i) => (
              <li key={i} className="flex items-center justify-between rounded-sm bg-navy-50 px-3 py-2 text-sm">
                <span className="font-medium text-navy-900">{m.name}</span>
                <span className="text-xs uppercase tracking-wide text-navy-500">{m.role.replaceAll('_', ' ')}{m.discipline ? ` · ${m.discipline}` : ''}</span>
              </li>
            ))}
            {project.team.length === 0 && <p className="text-sm text-navy-500">No team members recorded.</p>}
          </ul>
        </Card>

        {/* Industry partners */}
        <Card>
          <h2 className="mb-3 font-serif text-lg font-semibold text-navy-900">Industry partners</h2>
          <ul className="space-y-2">
            {project.industryPartners.map((p, i) => (
              <li key={i} className="rounded-sm bg-teal-100 px-3 py-2 text-sm">
                <p className="font-medium text-teal-500">{p.organization}</p>
                <p className="text-xs text-navy-500">{p.partnershipType.replaceAll('_', ' ')}{p.contribution ? ` — ${p.contribution}` : ''}</p>
              </li>
            ))}
            {project.industryPartners.length === 0 && <p className="text-sm text-navy-500">No partners yet — visible to industry users on the Partnership module.</p>}
          </ul>
        </Card>
      </div>

      {/* Milestones */}
      <Card className="mt-8">
        <h2 className="mb-4 font-serif text-lg font-semibold text-navy-900">Milestones & deliverables</h2>
        <ProjectTimeline milestones={project.milestones} />
        {canEdit && (
          <div className="mt-5 flex flex-wrap items-end gap-2 border-t border-navy-50 pt-4">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-navy-700">Milestone title</label>
              <input value={msTitle} onChange={(e) => setMsTitle(e.target.value)} className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-navy-700">Due date</label>
              <input type="date" value={msDue} onChange={(e) => setMsDue(e.target.value)} className="rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none" />
            </div>
            <Button onClick={addMilestone}>Add milestone</Button>
          </div>
        )}
        {canEdit && project.milestones.some((m) => m.status !== 'completed') && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.milestones.filter((m) => m.status !== 'completed').map((m) => (
              <button key={m.id} onClick={() => completeMilestone(m)} className="rounded-sm border border-moss px-2.5 py-1 text-xs font-medium text-moss">
                Mark "{m.title}" complete
              </button>
            ))}
          </div>
        )}
      </Card>

      {/* Testing outcomes */}
      <Card className="mt-8">
        <h2 className="mb-3 font-serif text-lg font-semibold text-navy-900">Testing outcomes</h2>
        {canEdit ? (
          <div className="space-y-2">
            <textarea
              defaultValue={project.testingOutcomes}
              onChange={(e) => setTestingOutcomes(e.target.value)}
              rows={4}
              placeholder="Document test results, field trial observations, performance metrics…"
              className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none"
            />
            <Button variant="ghost" onClick={saveTestingOutcomes}>Save</Button>
          </div>
        ) : (
          <p className="text-sm text-navy-500">{project.testingOutcomes || 'No testing outcomes recorded yet.'}</p>
        )}
      </Card>

      {/* IP + implementation */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <Card>
          <h2 className="mb-3 font-serif text-lg font-semibold text-navy-900">Intellectual property</h2>
          <ul className="space-y-2">
            {project.ipRecords.map((r) => (
              <li key={r.id} className="flex items-center justify-between rounded-sm bg-navy-50 px-3 py-2 text-sm">
                <span>{r.title}</span>
                <span className="text-xs uppercase text-navy-500">{r.type} · {r.status}</span>
              </li>
            ))}
            {project.ipRecords.length === 0 && <p className="text-sm text-navy-500">No IP filed yet.</p>}
          </ul>
          {canEdit && (
            <div className="mt-4 flex gap-2 border-t border-navy-50 pt-4">
              <select value={ipType} onChange={(e) => setIpType(e.target.value as IPRecord['type'])} className="rounded-sm border border-navy-300 px-2 py-2 text-sm focus:border-teal focus:outline-none">
                {['patent', 'copyright', 'trademark', 'trade_secret', 'publication'].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <input value={ipTitle} onChange={(e) => setIpTitle(e.target.value)} placeholder="Title / reference" className="flex-1 rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none" />
              <Button onClick={addIP}>Add</Button>
            </div>
          )}
        </Card>

        <Card>
          <h2 className="mb-3 font-serif text-lg font-semibold text-navy-900">Implementation & impact</h2>
          <p className="text-sm text-navy-500">Implementation status</p>
          {canEdit ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {['not_started', 'pilot', 'scaled', 'adopted_by_govt'].map((s) => (
                <button
                  key={s}
                  onClick={() => setImplementation(s as Project['implementationStatus'])}
                  className={`rounded-sm px-2.5 py-1 text-xs font-medium capitalize ${project.implementationStatus === s ? 'bg-navy text-paper' : 'border border-navy-300 text-navy-700'}`}
                >
                  {s.replaceAll('_', ' ')}
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-1 text-sm font-medium capitalize text-navy-900">{project.implementationStatus?.replaceAll('_', ' ') || 'Not started'}</p>
          )}

          <p className="mt-4 text-sm text-navy-500">Startup created from this project?</p>
          {canEdit ? (
            <button onClick={toggleStartup} className={`mt-2 rounded-sm px-3 py-1.5 text-xs font-medium ${project.startupCreated ? 'bg-moss text-paper' : 'border border-navy-300 text-navy-700'}`}>
              {project.startupCreated ? 'Yes — recorded' : 'Mark as startup outcome'}
            </button>
          ) : (
            <p className="mt-1 text-sm font-medium text-navy-900">{project.startupCreated ? 'Yes' : 'No'}</p>
          )}
        </Card>
      </div>
    </div>
  );
}
