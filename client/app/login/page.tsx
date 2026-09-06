'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button, Card } from '@/components/ui';

export default function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!password) {
      errors.password = 'Password is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError('');
    try {
      await signIn(email, password);
      router.push('/');
    } catch (err: any) {
      const code = err.code || '';
      if (code === 'auth/user-not-found' || code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
        setError('Incorrect email or password. Please try again.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts! Please try again later.');
      } else if (code === 'auth/user-disabled') {
        setError('Your account has been disabled. Please contact support.');
      } else {
        setError(err.message || 'Could not sign in. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-8 sm:px-6 sm:py-16">
      <h1 className="font-serif text-3xl font-semibold text-navy-900">Sign in</h1>
      <p className="mt-2 text-sm text-navy-500">Access your citizen, university, industry or department workspace.</p>
      <Card className="mt-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-navy-700">Email</label>
            <input type="email" required value={email} onChange={(e) => { setEmail(e.target.value); setFieldErrors(prev => ({...prev, email: ''})); }} className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none" />
            {fieldErrors.email && <p className="mt-1 text-xs text-brick">{fieldErrors.email}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-navy-700">Password</label>
            <input type="password" required value={password} onChange={(e) => { setPassword(e.target.value); setFieldErrors(prev => ({...prev, password: ''})); }} className="w-full rounded-sm border border-navy-300 px-3 py-2 text-sm focus:border-teal focus:outline-none" />
            {fieldErrors.password && <p className="mt-1 text-xs text-brick">{fieldErrors.password}</p>}
          </div>
          {error && <p className="text-sm text-brick">{error}</p>}
          <Button type="submit" disabled={loading || googleLoading} className="w-full">{loading ? 'Signing in…' : 'Sign in'}</Button>
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
              await signInWithGoogle();
              router.push('/');
            } catch (err: any) {
              console.error('Google Sign In Error:', err);
              setError(err.message?.replace('Firebase: ', '') || 'Could not sign in with Google.');
              setGoogleLoading(false);
            }
          }}
          className="mt-4 w-full"
        >
          {googleLoading ? 'Signing in...' : 'Sign in with Google'}
        </Button>
      </Card>
      <p className="mt-4 text-sm text-navy-500">
        New here? <Link href="/register" className="font-medium text-teal-500 underline">Create an account</Link>
      </p>
    </div>
  );
}
