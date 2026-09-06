'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Card, Button } from '@/components/ui';
import { Mail, MapPin, Building, Briefcase, Calendar, CheckCircle2, ShieldAlert, Edit2, Save, X, Camera } from 'lucide-react';

export default function ProfilePage() {
  const { user, profile, loading, signOut, updateProfileData } = useAuth();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    sector: '',
    state: '',
    district: '',
    photoUrl: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        organization: profile.organization || '',
        sector: profile.sector || '',
        state: profile.state || '',
        district: profile.district || '',
        photoUrl: profile.photoUrl || ''
      });
    }
  }, [profile]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-navy border-t-transparent"></div>
      </div>
    );
  }

  if (!profile) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfileData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-paper py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end justify-between">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-navy-900">My Profile</h1>
            <p className="mt-1 text-sm text-navy-500">Manage your personal information and preferences.</p>
          </div>
          <div className="flex gap-3">
            {!isEditing ? (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit2 size={16} className="mr-2 inline-block" />
                Edit Profile
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X size={16} className="mr-2 inline-block" />
                Cancel
              </Button>
            )}
            <Button variant="outline" onClick={() => { signOut(); router.push('/login'); }}>
              Sign out
            </Button>
          </div>
        </div>

        <Card className="mb-6 overflow-hidden p-0">
          <div className="bg-navy p-6 sm:p-10 text-white flex flex-col sm:flex-row items-center gap-6 relative">
            <div className="relative group">
              <div className="flex h-24 w-24 overflow-hidden items-center justify-center rounded-full bg-white/20 text-4xl font-bold text-white shadow-inner backdrop-blur-md shrink-0 border-2 border-white/30">
                {(isEditing ? formData.photoUrl : profile.photoUrl) ? (
                  <img src={isEditing ? formData.photoUrl : profile.photoUrl} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  profile.name.charAt(0).toUpperCase()
                )}
              </div>
              
              {isEditing && (
                <>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    title="Change Photo"
                  >
                    <Camera size={24} />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handlePhotoUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </>
              )}
            </div>
            
            <div className="text-center sm:text-left w-full max-w-md">
              {isEditing ? (
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-navy-200 uppercase tracking-wider text-left">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-md border-0 bg-white/10 px-3 py-2 text-white placeholder-white/50 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-saffron"
                  />
                </div>
              ) : (
                <h2 className="font-serif text-2xl font-bold">{profile.name}</h2>
              )}
              
              <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm font-medium">
                <span className="rounded-full bg-saffron/20 px-3 py-1 text-saffron-100 uppercase tracking-widest text-[10px]">
                  {profile.role}
                </span>
                {profile.verified ? (
                  <span className="flex items-center gap-1 text-moss-300">
                    <CheckCircle2 size={14} /> Verified Account
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-brick-300">
                    <ShieldAlert size={14} /> Unverified
                  </span>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="mt-4 sm:mt-0 sm:ml-auto w-full sm:w-auto">
                <Button variant="secondary" onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto flex justify-center">
                  {isSaving ? 'Saving...' : (
                    <>
                      <Save size={16} className="mr-2 inline-block" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:p-10 bg-white">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 text-navy-400 shrink-0" size={18} />
              <div className="w-full">
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Email Address</p>
                <p className="mt-1 font-medium text-navy-900 break-all">{profile.email}</p>
                {isEditing && <p className="text-[10px] text-navy-400 mt-1">Email cannot be changed</p>}
              </div>
            </div>

            {(profile.state || profile.district || isEditing) && (
              <div className="flex items-start gap-3 col-span-1 sm:col-span-2 lg:col-span-1">
                <MapPin className="mt-0.5 text-navy-400 shrink-0" size={18} />
                <div className="w-full">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Location</p>
                  {isEditing ? (
                    <div className="mt-2 flex flex-col gap-3">
                      <div>
                        <label className="text-xs text-navy-500 mb-1 block">State</label>
                        <input 
                          type="text" 
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-navy-500 mb-1 block">District</label>
                        <input 
                          type="text" 
                          value={formData.district}
                          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                          className="w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="mt-1 font-medium text-navy-900">
                      {[profile.district, profile.state].filter(Boolean).join(', ') || 'Not specified'}
                    </p>
                  )}
                </div>
              </div>
            )}

            {(profile.organization || isEditing) && (
              <div className="flex items-start gap-3">
                <Building className="mt-0.5 text-navy-400 shrink-0" size={18} />
                <div className="w-full">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Organization</p>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="mt-2 w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                    />
                  ) : (
                    <p className="mt-1 font-medium text-navy-900">{profile.organization || 'Not specified'}</p>
                  )}
                </div>
              </div>
            )}

            {(profile.sector || isEditing) && (
              <div className="flex items-start gap-3">
                <Briefcase className="mt-0.5 text-navy-400 shrink-0" size={18} />
                <div className="w-full">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Sector / Domain</p>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="mt-2 w-full rounded-md border border-navy-200 px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
                    />
                  ) : (
                    <p className="mt-1 font-medium text-navy-900">{profile.sector || 'Not specified'}</p>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 text-navy-400 shrink-0" size={18} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">Member Since</p>
                <p className="mt-1 font-medium text-navy-900">
                  {new Date(profile.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
