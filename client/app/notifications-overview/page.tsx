'use client';

import { useState } from 'react';
import { Bell, CheckCircle2, AlertCircle, Users, Building2, FileText, Hammer, TestTube, Rocket, Mail, Smartphone, MessageSquare, Check } from 'lucide-react';
import FeatureDetailLayout, { SectionHeading, ProseBlock } from '@/components/FeatureDetailLayout';

type NotifType = 'challenge' | 'project' | 'system' | 'partnership';

interface Notif {
  id: number;
  type: NotifType;
  icon: typeof Bell;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const DEMO_NOTIFICATIONS: Notif[] = [
  { id: 1, type: 'system', icon: CheckCircle2, title: 'Challenge Resolved', message: 'The waterlogging challenge on MG Road, Ranchi has been marked as successfully resolved after pilot implementation.', time: '2 hours ago', read: false },
  { id: 2, type: 'project', icon: Rocket, title: 'Pilot Launched', message: 'Project SC-2024-0187 has entered the community pilot phase in Bokaro district. Deployment monitoring is now active.', time: '5 hours ago', read: false },
  { id: 3, type: 'challenge', icon: Building2, title: 'University Assigned', message: 'Your challenge "Lack of healthcare facility in Rural District 4" has been routed to NIT Jamshedpur for solution development.', time: '1 day ago', read: false },
  { id: 4, type: 'project', icon: TestTube, title: 'Testing Completed', message: 'Prototype testing for Project SC-2024-0142 is complete. Results: 91% success rate. Ready for pilot approval.', time: '1 day ago', read: true },
  { id: 5, type: 'project', icon: Users, title: 'Team Formed', message: 'A multidisciplinary team of 6 students and 2 faculty mentors has been formed at BIT Mesra for your submitted challenge.', time: '2 days ago', read: true },
  { id: 6, type: 'challenge', icon: FileText, title: 'Proposal Submitted', message: 'IIT (ISM) Dhanbad has submitted a solution proposal for challenge SC-2024-0098. Admin review is in progress.', time: '3 days ago', read: true },
  { id: 7, type: 'partnership', icon: Hammer, title: 'Industry Partner Joined', message: 'TATA Steel CSR has agreed to provide prototyping support for Project SC-2024-0112. Partnership is now active.', time: '4 days ago', read: true },
  { id: 8, type: 'system', icon: AlertCircle, title: 'Duplicate Detected', message: 'Your submission "Open drains near Market Road" was flagged as similar to SC-2024-0071. Both have been merged for joint resolution.', time: '5 days ago', read: true },
];

const TYPE_COLORS: Record<NotifType, string> = {
  challenge: 'bg-saffron-100 text-saffron-700',
  project: 'bg-teal-100 text-teal-700',
  system: 'bg-navy-100 text-navy-700',
  partnership: 'bg-moss-100 text-moss',
};

export default function NotificationsFeaturePage() {
  const [notifications, setNotifications] = useState<Notif[]>(DEMO_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<'all' | NotifType>('all');
  const [prefs, setPrefs] = useState({ email: true, inApp: true, sms: false });

  const markAllRead = () => setNotifications((n) => n.map((x) => ({ ...x, read: true })));
  const markRead = (id: number) => setNotifications((n) => n.map((x) => x.id === id ? { ...x, read: true } : x));

  const filtered = activeFilter === 'all' ? notifications : notifications.filter((n) => n.type === activeFilter);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <FeatureDetailLayout
      icon={Bell}
      badge="Module 07"
      title="Notification Center"
      subtitle="Every stakeholder stays in sync throughout the project lifecycle — from challenge submission to final resolution — through real-time, role-specific notifications."
      ctaLabel="Create Your Account"
      ctaHref="/register"
    >
      {/* What is it */}
      <section className="mb-12">
        <SectionHeading>Staying in the Loop</SectionHeading>
        <ProseBlock>
          SocialConnect's notification system ensures that no update goes unnoticed. Citizens know when their challenge is assigned. Universities are alerted when new challenges arrive. Industry partners are notified of proposal approvals. Admins receive priority alerts for urgent issues.
        </ProseBlock>
        <ProseBlock>
          Notifications are delivered in real time inside the platform, and optionally via email and SMS based on your preferences.
        </ProseBlock>
      </section>

      {/* Notification Center Demo */}
      <section className="mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SectionHeading>Live Preview — Demo Data</SectionHeading>
            {unreadCount > 0 && (
              <span className="rounded-full bg-saffron px-2.5 py-0.5 text-xs font-bold text-white">{unreadCount} new</span>
            )}
          </div>
          <button onClick={markAllRead} className="text-xs font-semibold text-saffron-700 hover:underline">
            Mark all as read
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {(['all', 'challenge', 'project', 'system', 'partnership'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-sm px-3 py-1.5 text-xs font-semibold capitalize transition ${activeFilter === f ? 'bg-navy text-paper' : 'border border-navy-200 text-navy-600 hover:border-navy-400'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Notification list */}
        <div className="mt-5 space-y-3">
          {filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-navy-200 bg-white p-8 text-center text-sm text-navy-500">
              No notifications in this category.
            </div>
          )}
          {filtered.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                className={`flex gap-4 rounded-xl border p-4 transition ${notif.read ? 'border-navy-100 bg-white' : 'border-saffron-200 bg-saffron-100/30'}`}
              >
                <div className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${TYPE_COLORS[notif.type]}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${notif.read ? 'text-navy-700' : 'text-navy-900'}`}>{notif.title}</p>
                    <span className="text-xs text-navy-400 whitespace-nowrap">{notif.time}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-navy-500">{notif.message}</p>
                  {!notif.read && (
                    <button
                      onClick={() => markRead(notif.id)}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-saffron-700 hover:underline"
                    >
                      <Check size={12} /> Mark as read
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Notification types */}
      <section className="mb-12">
        <SectionHeading>What You Get Notified About</SectionHeading>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Bell, title: 'New Challenge Submitted', desc: 'When a new challenge is submitted in your district or assigned to your institution.' },
            { icon: Building2, title: 'University Assigned', desc: 'When the AI routes your challenge to a university for solution development.' },
            { icon: Users, title: 'Team Formed', desc: 'When a student-faculty team is assembled for your challenge.' },
            { icon: FileText, title: 'Proposal Submitted', desc: 'When a university submits its solution proposal for admin review.' },
            { icon: Hammer, title: 'Industry Partner Joined', desc: 'When an industry partner agrees to support a project through mentorship or funding.' },
            { icon: CheckCircle2, title: 'Challenge Resolved', desc: 'When a community pilot is completed and the challenge is marked resolved.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-3 rounded-xl border border-navy-100 bg-white p-4 shadow-sm">
              <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-navy-50">
                <Icon size={16} className="text-navy-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-900">{title}</p>
                <p className="mt-0.5 text-xs text-navy-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preferences */}
      <section className="mb-8">
        <SectionHeading>Notification Preferences</SectionHeading>
        <ProseBlock>Control how and where you receive notifications from SocialConnect.</ProseBlock>
        <div className="mt-8 rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
          <div className="space-y-5">
            {[
              { key: 'email' as const, icon: Mail, label: 'Email Notifications', desc: 'Receive a digest of important updates to your registered email address.' },
              { key: 'inApp' as const, icon: Smartphone, label: 'In-App Notifications', desc: 'Real-time notifications inside the SocialConnect dashboard — the bell icon in the navbar.' },
              { key: 'sms' as const, icon: MessageSquare, label: 'SMS Alerts', desc: 'Receive critical alerts (challenge resolved, urgent routing) via SMS on your registered mobile number.' },
            ].map(({ key, icon: Icon, label, desc }) => (
              <div key={key} className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-navy-50">
                    <Icon size={16} className="text-navy-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{label}</p>
                    <p className="text-xs text-navy-500">{desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))}
                  className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${prefs[key] ? 'bg-navy' : 'bg-navy-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${prefs[key] ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FeatureDetailLayout>
  );
}
