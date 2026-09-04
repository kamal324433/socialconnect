'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut as fbSignOut,
  updateProfile,
  User
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import type { UserProfile, UserRole } from './types';

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (params: { name: string; email: string; password: string; role: UserRole; organization?: string; district?: string; state?: string; sector?: string }) => Promise<void>;
  signInAnonymouslyUser: () => Promise<void>;
  signInWithGoogle: (role?: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Persist the role the user chose before being redirected to Google
const GOOGLE_ROLE_KEY = 'sc_google_pending_role';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When Google redirects back, pick up the result here
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          const u = result.user;
          const snap = await getDoc(doc(db, 'users', u.uid));
          if (!snap.exists()) {
            const pendingRole = (localStorage.getItem(GOOGLE_ROLE_KEY) as UserRole) || 'citizen';
            localStorage.removeItem(GOOGLE_ROLE_KEY);
            const newProfile: UserProfile = {
              uid: u.uid,
              name: u.displayName || 'Google User',
              email: u.email || '',
              role: pendingRole,
              organization: '',
              district: '',
              state: '',
              sector: '',
              capabilities: [],
              verified: pendingRole === 'citizen',
              createdAt: Date.now()
            };
            await setDoc(doc(db, 'users', u.uid), newProfile);
            setProfile(newProfile);
          } else {
            setProfile(snap.data() as UserProfile);
          }
        }
      })
      .catch((err) => {
        // Silently ignore user-cancelled popup errors
        if (
          err.code !== 'auth/popup-closed-by-user' &&
          err.code !== 'auth/cancelled-popup-request'
        ) {
          console.error('Google redirect result error:', err);
        }
      });

    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const snap = await getDoc(doc(db, 'users', u.uid));
        if (snap.exists()) setProfile(snap.data() as UserProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp: AuthContextValue['signUp'] = async ({
    name, email, password, role, organization, district, state, sector
  }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    const newProfile: UserProfile = {
      uid: cred.user.uid,
      name,
      email,
      role,
      organization: organization || '',
      district: district || '',
      state: state || '',
      sector: sector || '',
      capabilities: [],
      verified: role === 'citizen',
      createdAt: Date.now()
    };
    await setDoc(doc(db, 'users', cred.user.uid), newProfile);
    setProfile(newProfile);
  };

  const signInAnonymouslyUser = async () => {
    const cred = await signInAnonymously(auth);
    const snap = await getDoc(doc(db, 'users', cred.user.uid));
    if (!snap.exists()) {
      const anonProfile: UserProfile = {
        uid: cred.user.uid,
        name: 'Anonymous Citizen',
        email: 'anonymous@local',
        role: 'citizen',
        organization: '',
        district: '',
        state: '',
        sector: '',
        capabilities: [],
        verified: false,
        createdAt: Date.now()
      };
      await setDoc(doc(db, 'users', cred.user.uid), anonProfile);
      setProfile(anonProfile);
    }
  };

  const signInWithGoogle = async (role?: UserRole) => {
    // Persist the role so we can apply it after the redirect returns
    if (role) localStorage.setItem(GOOGLE_ROLE_KEY, role);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    // Redirect (not popup) — works on localhost, mobile, and all browsers
    await signInWithRedirect(auth, provider);
  };

  const signOut = async () => {
    await fbSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signInAnonymouslyUser, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
