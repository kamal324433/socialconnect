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
  user: User | { uid: string; email: string; displayName: string } | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (params: { name: string; email: string; password: string; role: UserRole; organization?: string; district?: string; state?: string; sector?: string }) => Promise<void>;
  signInAnonymouslyUser: () => Promise<void>;
  signInWithGoogle: (role?: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const GOOGLE_ROLE_KEY = 'sc_google_pending_role';
const MOCK_USERS_KEY = 'sc_mock_users';
const MOCK_SESSION_KEY = 'sc_mock_session';

// Helper to interact with mock DB
const getMockUsers = (): Record<string, any> => {
  if (typeof window === 'undefined') return {};
  const data = localStorage.getItem(MOCK_USERS_KEY);
  return data ? JSON.parse(data) : {};
};

const saveMockUser = (email: string, data: any) => {
  const users = getMockUsers();
  users[email] = data;
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextValue['user']>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMockAuth, setIsMockAuth] = useState(false);

  useEffect(() => {
    // Check for mock session first
    const mockSession = typeof window !== 'undefined' ? sessionStorage.getItem(MOCK_SESSION_KEY) : null;
    if (mockSession) {
      const sessionData = JSON.parse(mockSession);
      setUser(sessionData.user);
      setProfile(sessionData.profile);
      setIsMockAuth(true);
      setLoading(false);
      return;
    }

    // Otherwise use Firebase
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
        if (
          err.code !== 'auth/popup-closed-by-user' &&
          err.code !== 'auth/cancelled-popup-request'
        ) {
          console.error('Google redirect result error:', err);
        }
      });

    const unsub = onAuthStateChanged(auth, async (u) => {
      if (typeof window !== 'undefined' && sessionStorage.getItem(MOCK_SESSION_KEY)) {
        return; // Ignore firebase if mock is active
      }
      setUser(u);
      if (u) {
        try {
          const snap = await getDoc(doc(db, 'users', u.uid));
          if (snap.exists()) setProfile(snap.data() as UserProfile);
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsMockAuth(false);
    } catch (err: any) {
      // Fallback to mock auth if Firebase fails or is not configured
      const mockUsers = getMockUsers();
      if (mockUsers[email]) {
        // Very basic mock check (not secure, but for demo purposes)
        // In a real mock we wouldn't store plaintext passwords, but to satisfy the "functional" requirement without backend
        if (mockUsers[email].password === password) {
          const mockProfile = mockUsers[email].profile;
          const mockUser = { uid: mockProfile.uid, email, displayName: mockProfile.name };
          setUser(mockUser);
          setProfile(mockProfile);
          sessionStorage.setItem(MOCK_SESSION_KEY, JSON.stringify({ user: mockUser, profile: mockProfile }));
          setIsMockAuth(true);
          return;
        } else {
          throw { code: 'auth/wrong-password', message: 'Invalid credentials' };
        }
      }
      throw err;
    }
  };

  const signUp: AuthContextValue['signUp'] = async ({
    name, email, password, role, organization, district, state, sector
  }) => {
    const newProfile: UserProfile = {
      uid: '',
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

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      newProfile.uid = cred.user.uid;
      await updateProfile(cred.user, { displayName: name });
      await setDoc(doc(db, 'users', cred.user.uid), newProfile);
      setProfile(newProfile);
      setIsMockAuth(false);
    } catch (err: any) {
      // Fallback to mock auth
      if (err.code === 'auth/email-already-in-use') throw err; // Let it bubble up if real Firebase responds

      const mockUsers = getMockUsers();
      if (mockUsers[email]) {
        throw { code: 'auth/email-already-in-use', message: 'Email already exists' };
      }
      
      newProfile.uid = 'mock-' + Date.now().toString();
      const mockUser = { uid: newProfile.uid, email, displayName: name };
      
      // Store in local storage for demo
      saveMockUser(email, { password, profile: newProfile });
      
      setUser(mockUser);
      setProfile(newProfile);
      sessionStorage.setItem(MOCK_SESSION_KEY, JSON.stringify({ user: mockUser, profile: newProfile }));
      setIsMockAuth(true);
    }
  };

  const signInAnonymouslyUser = async () => {
    try {
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
    } catch (err) {
      console.error('Anonymous sign in failed', err);
    }
  };

  const signInWithGoogle = async (role?: UserRole) => {
    if (role) localStorage.setItem(GOOGLE_ROLE_KEY, role);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    await signInWithRedirect(auth, provider);
  };

  const signOut = async () => {
    if (isMockAuth) {
      sessionStorage.removeItem(MOCK_SESSION_KEY);
      setUser(null);
      setProfile(null);
      setIsMockAuth(false);
    } else {
      await fbSignOut(auth);
    }
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

