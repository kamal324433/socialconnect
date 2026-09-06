'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button, Card } from '@/components/ui';
import type { UserRole } from '@/lib/types';

const ROLES: { value: UserRole; label: string; hint: string }[] = [
  { value: 'citizen', label: 'Citizen', hint: 'Individual reporting local challenges' },
  { value: 'pri', label: 'Panchayati Raj Institution', hint: 'Gram Panchayat / block / district panchayat' },
  { value: 'ulb', label: 'Urban Local Body', hint: 'Municipal corporation / council' },
  { value: 'department', label: 'Government Department', hint: 'State or central department' },
  { value: 'university', label: 'University / HEI', hint: 'Higher education institution' },
  { value: 'industry', label: 'Industry / Startup / MSME / CSR', hint: 'Partner organization' }
];

const STATE_DISTRICTS: Record<string, string[]> = {
  'Jharkhand': [
    'Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka', 'East Singhbhum',
    'Garhwa', 'Giridih', 'Godda', 'Gumla', 'Hazaribagh', 'Jamtara',
    'Khunti', 'Koderma', 'Latehar', 'Lohardaga', 'Pakur', 'Palamu',
    'Ramgarh', 'Ranchi', 'Sahibganj', 'Seraikela Kharsawan', 'Simdega',
    'West Singhbhum'
  ],
  'Uttar Pradesh': [
    'Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya', 'Azamgarh', 
    'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 'Bareilly', 'Basti', 
    'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 'Chitrakoot', 'Deoria', 'Etah', 
    'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad', 'Gautam Buddha Nagar', 'Ghaziabad', 
    'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 
    'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 'Kanpur Nagar', 'Kasganj', 'Kaushambi', 
    'Kheri', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 'Mahoba', 'Mainpuri', 'Mathura', 
    'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Prayagraj', 
    'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 
    'Shravasti', 'Siddharthnagar', 'Sitapur', 'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'
  ],
  'Bihar': [
    'Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai', 'Bhagalpur', 'Bhojpur', 'Buxar',
    'Darbhanga', 'East Champaran', 'Gaya', 'Gopalganj', 'Jamui', 'Jehanabad', 'Kaimur', 'Katihar',
    'Khagaria', 'Kishanganj', 'Lakhisarai', 'Madhepura', 'Madhubani', 'Munger', 'Muzaffarpur',
    'Nalanda', 'Nawada', 'Patna', 'Purnia', 'Rohtas', 'Saharsa', 'Samastipur', 'Saran',
    'Sheikhpura', 'Sheohar', 'Sitamarhi', 'Siwan', 'Supaul', 'Vaishali', 'West Champaran'
  ],
  'Maharashtra': [
    'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur',
    'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City',
    'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani',
    'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha',
    'Washim', 'Yavatmal'
  ]
};

const ALL_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  // Union Territories
  'Andaman & Nicobar Islands', 'Chandigarh', 'Dadra & Nagar Haveli and Daman & Diu',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const SELECT_CLASS = 'w-full rounded-sm border border-navy-300 bg-white px-3 py-2 text-sm focus:border-teal focus:outline-none appearance-none cursor-pointer';

export default function RegisterPage() {
  const { signUp, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [organization, setOrganization] = useState('');
  const [district, setDistrict] = useState('');
  const [stateVal, setStateVal] = useState('Jharkhand');
  const [sector, setSector] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const needsOrg = role !== 'citizen';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signUp({ name, email, password, role, organization, district, state: stateVal, sector });
      router.push('/');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use' || err.message?.includes('email-already-in-use')) {
        setError('Yeh email pehle se registered hai! Kripya niche "Sign in" par click karein.');
      } else {
        setError(err.message?.replace('Firebase: ', '') || 'Could not create your account.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16">
      <h1 className="font-serif text-3xl font-semibold text-navy-900">Get involved</h1>
      <p className="mt-2 text-sm text-navy-500">Create an account as a citizen, institution, university or industry partner.</p>

      <Card className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-navy-700">I am registering as</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {ROLES.map((r) => (
                <button
                  type="button"
                  key={r.value}
                  onClick={() => setRole(r.value)}
                  className={`rounded-sm border px-3 py-2 text-left text-sm transition ${
                    role === r.value ? 'border-navy bg-navy-50' : 'border-navy-100 hover:border-navy-300'
                  }`}
                >
                  <p className="font-medium text-navy-900">{r.label}</p>
                  <p className="text-xs text-navy-500">{r.hint}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Full name</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-navy-700">Password</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none" />
          </div>

          {needsOrg && (
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Organization name</label>
              <input required value={organization} onChange={(e) => setOrganization(e.target.value)} className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none" />
            </div>
          )}

          {/* State & District Dropdowns */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">State <span className="text-brick">*</span></label>
              <div className="relative">
                <select
                  required
                  value={stateVal}
                  onChange={(e) => { setStateVal(e.target.value); setDistrict(''); }}
                  className={SELECT_CLASS}
                >
                  <option value="">— Select State —</option>
                  <option disabled>── Jharkhand (Recommended) ──</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option disabled>── Other States & UTs ──</option>
                  {ALL_STATES.filter(s => s !== 'Jharkhand').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-navy-400">▾</span>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">District <span className="text-brick">*</span></label>
              {STATE_DISTRICTS[stateVal] ? (
                <div className="relative">
                  <select
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className={SELECT_CLASS}
                  >
                    <option value="">— Select District —</option>
                    {STATE_DISTRICTS[stateVal].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-navy-400">▾</span>
                </div>
              ) : (
                <input
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="Enter your district"
                  className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none"
                />
              )}
            </div>
          </div>

          {(role === 'university' || role === 'industry') && (
            <div>
              <label className="mb-1 block text-sm font-medium text-navy-700">Primary sector / area of expertise</label>
              <input
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                placeholder="e.g. Water & Sanitation, Healthcare, Digital Governance"
                className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none"
              />
              <p className="mt-1 text-xs text-navy-500">
                {role === 'university'
                  ? 'Used by the AI routing engine to match challenges to your institution. You can add more capability tags later from your dashboard.'
                  : 'Helps us surface the right open projects for your organization to partner on.'}
              </p>
            </div>
          )}

          {error && <p className="text-sm text-brick">{error}</p>}
          <Button type="submit" disabled={loading || googleLoading} className="w-full">{loading ? 'Creating account…' : 'Create account'}</Button>
        </form>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-navy-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-navy-400">Or</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={loading || googleLoading}
          onClick={async () => {
            setGoogleLoading(true);
            try {
              await signInWithGoogle(role);
              router.push('/');
            } catch (err: any) {
              console.error('Google Sign Up Error:', err);
              setError(err.message?.replace('Firebase: ', '') || 'Could not sign in with Google.');
              setGoogleLoading(false);
            }
          }}
          className="mt-4 w-full"
        >
          {googleLoading ? 'Please wait...' : 'Sign up with Google'}
        </Button>
      </Card>

      <p className="mt-4 text-sm text-navy-500">
        Already registered? <Link href="/login" className="font-medium text-teal-500 underline">Sign in</Link>
      </p>
    </div>
  );
}
