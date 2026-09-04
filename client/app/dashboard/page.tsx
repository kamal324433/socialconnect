'use client';

import { useEffect, useMemo, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Challenge, Project } from '@/lib/types';
import { SectionLabel, StatCard, Card } from '@/components/ui';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

const COLORS = ['#1B2A4A', '#E8871E', '#1F6F78', '#3F7D5C', '#A63A32', '#8393B4', '#F2B366'];

export default function DashboardPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const unsub1 = onSnapshot(collection(db, 'challenges'), (snap) => setChallenges(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Challenge)));
    const unsub2 = onSnapshot(collection(db, 'projects'), (snap) => setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Project)));
    return () => { unsub1(); unsub2(); };
  }, []);

  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    challenges.forEach((c) => map.set(c.category, (map.get(c.category) || 0) + 1));
    return Array.from(map.entries()).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 8);
  }, [challenges]);

  const byDistrict = useMemo(() => {
    const map = new Map<string, number>();
    challenges.forEach((c) => {
      const d = c.location?.district || 'Unknown';
      map.set(d, (map.get(d) || 0) + 1);
    });
    return Array.from(map.entries()).map(([district, challenges]) => ({ district, challenges })).sort((a, b) => b.challenges - a.challenges).slice(0, 10);
  }, [challenges]);

  const byStatus = useMemo(() => {
    const map = new Map<string, number>();
    challenges.forEach((c) => map.set(c.status, (map.get(c.status) || 0) + 1));
    return Array.from(map.entries()).map(([name, value]) => ({ name: name.replaceAll('_', ' '), value }));
  }, [challenges]);

  const trend = useMemo(() => {
    const map = new Map<string, number>();
    challenges.forEach((c) => {
      const d = new Date(c.createdAt);
      const key = `${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()}`;
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries()).map(([month, submissions]) => ({ month, submissions }));
  }, [challenges]);

  const stats = useMemo(() => {
    const universities = new Set(projects.map((p) => p.universityId)).size;
    const industryOrgs = new Set(projects.flatMap((p) => p.industryPartners.map((ip) => ip.uid))).size;
    const patents = projects.reduce((acc, p) => acc + p.ipRecords.filter((r) => r.type === 'patent').length, 0);
    const startups = projects.filter((p) => p.startupCreated).length;
    const completed = projects.filter((p) => p.status === 'completed').length;
    const completionRate = projects.length ? Math.round((completed / projects.length) * 100) : 0;
    return { universities, industryOrgs, patents, startups, completionRate, activeProjects: projects.length };
  }, [projects]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <SectionLabel index="06">Visual Analytics</SectionLabel>
      <p className="mb-8 -mt-4 max-w-2xl text-navy-500">Real-time insight into submissions, participation, thematic trends and community impact across districts.</p>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Challenges filed" value={challenges.length} />
        <StatCard label="Active projects" value={stats.activeProjects} />
        <StatCard label="Universities engaged" value={stats.universities} />
        <StatCard label="Industry partners" value={stats.industryOrgs} />
        <StatCard label="Patents filed" value={stats.patents} />
        <StatCard label="Startups created" value={stats.startups} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 font-serif text-lg font-semibold text-navy-900">Submissions by category</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={byCategory} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" />
              <XAxis type="number" allowDecimals={false} stroke="#8393B4" fontSize={12} />
              <YAxis type="category" dataKey="name" width={140} stroke="#8393B4" fontSize={11} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4 }} />
              <Bar dataKey="value" fill="#1B2A4A" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="mb-4 font-serif text-lg font-semibold text-navy-900">Status distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={byStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={(e) => e.name}>
                {byStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="mb-4 font-serif text-lg font-semibold text-navy-900">Top districts by submissions</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={byDistrict}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" />
              <XAxis dataKey="district" stroke="#8393B4" fontSize={11} interval={0} angle={-25} textAnchor="end" height={60} />
              <YAxis allowDecimals={false} stroke="#8393B4" fontSize={12} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4 }} />
              <Bar dataKey="challenges" fill="#E8871E" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="mb-4 font-serif text-lg font-semibold text-navy-900">Submission trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F6" />
              <XAxis dataKey="month" stroke="#8393B4" fontSize={11} />
              <YAxis allowDecimals={false} stroke="#8393B4" fontSize={12} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4 }} />
              <Legend />
              <Line type="monotone" dataKey="submissions" stroke="#1F6F78" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="mt-6">
        <h3 className="mb-1 font-serif text-lg font-semibold text-navy-900">Project completion rate</h3>
        <p className="text-sm text-navy-500">Share of all opened projects that reached "completed" status.</p>
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-navy-100">
          <div className="h-full bg-moss" style={{ width: `${stats.completionRate}%` }} />
        </div>
        <p className="mt-2 text-sm font-medium text-navy-900">{stats.completionRate}%</p>
      </Card>
    </div>
  );
}
