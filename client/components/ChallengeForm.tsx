'use client';

import { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';
import { categorize, scorePriority, findDuplicates } from '@/lib/aiEngine';
import { Button, Card } from './ui';
import { MapPin, UploadCloud, Loader2, CheckCircle2 } from 'lucide-react';

export default function ChallengeForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const { user, profile } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [district, setDistrict] = useState(profile?.district || '');
  const [stateVal, setStateVal] = useState(profile?.state || '');
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const captureLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setError('Could not access location — you can still enter district/state manually.')
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) {
      setError('Please sign in to submit a challenge.');
      return;
    }
    if (!title.trim() || !description.trim() || !district.trim()) {
      setError('Title, description and district are required.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      // Upload media
      const mediaUrls: string[] = [];
      for (const file of files) {
        const fileRef = ref(storage, `challenges/${user.uid}/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        mediaUrls.push(await getDownloadURL(fileRef));
      }

      // Client-side AI preview (Cloud Function re-runs this authoritatively server-side on write)
      const suggestions = categorize(title, description);
      const { score, priority } = scorePriority(title, description);

      // Lightweight duplicate pre-check against recent challenges in the same district
      const existingSnap = await getDocs(query(collection(db, 'challenges'), where('location.district', '==', district)));
      const existing = existingSnap.docs.map((d) => ({ id: d.id, title: d.data().title, description: d.data().description }));
      const duplicateCandidates = findDuplicates({ title, description }, existing);

      await addDoc(collection(db, 'challenges'), {
        title,
        description,
        category: suggestions[0].category,
        suggestedCategories: suggestions.map((s) => s.category),
        tags: suggestions.map((s) => s.category),
        priority,
        priorityScore: score,
        status: duplicateCandidates.length > 0 ? 'under_review' : 'submitted',
        location: {
          lat: coords?.lat || 0,
          lng: coords?.lng || 0,
          address,
          district,
          state: stateVal
        },
        mediaUrls,
        submittedBy: user.uid,
        submitterName: profile.name,
        submitterType: profile.role,
        duplicateOf: null,
        duplicateCandidates,
        assignedUniversityId: null,
        assignedUniversityName: null,
        projectId: null,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });

      setDone(true);
      setTitle('');
      setDescription('');
      setAddress('');
      setFiles([]);
      onSubmitted?.();
    } catch (err: any) {
      setError(err.message || 'Something went wrong while submitting.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <Card className="flex flex-col items-center gap-3 py-12 text-center">
        <CheckCircle2 className="text-moss" size={40} />
        <p className="font-serif text-xl font-semibold text-navy-900">Challenge submitted</p>
        <p className="max-w-md text-sm text-navy-500">
          It's now in the review queue — the AI engine has suggested a category and priority, and our team will validate and route it to a matching university shortly.
        </p>
        <Button variant="ghost" onClick={() => setDone(false)}>Submit another</Button>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-1 block text-sm font-medium text-navy-700">Challenge title <span className="text-brick">*</span></label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. Recurring waterlogging near Sector 12 market"
            className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-navy-700">Describe the challenge <span className="text-brick">*</span></label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            placeholder="What is happening, since when, who is affected, and what have you observed?"
            className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-navy-700">District <span className="text-brick">*</span></label>
            <input required value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy-700">State <span className="text-brick">*</span></label>
            <input required value={stateVal} onChange={(e) => setStateVal(e.target.value)} className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-navy-700">Landmark / address</label>
          <div className="flex gap-2">
            <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none" />
            <Button type="button" variant="ghost" onClick={captureLocation} className="flex items-center gap-1 whitespace-nowrap">
              <MapPin size={14} /> {coords ? 'Captured' : 'Use GPS'}
            </Button>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-navy-700">Photos / videos (evidence)</label>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-navy-300 px-3 py-6 text-sm text-navy-500 hover:border-teal">
            <UploadCloud size={16} />
            {files.length ? `${files.length} file(s) selected` : 'Click to upload media'}
            <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={(e) => setFiles(Array.from(e.target.files || []))} />
          </label>
        </div>

        {error && <p className="text-sm text-brick">{error}</p>}

        <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <span className="flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" /> Submitting…
            </span>
          ) : (
            'Submit challenge'
          )}
        </Button>
      </form>
    </Card>
  );
}
