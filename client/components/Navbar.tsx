'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import NotificationBell from './NotificationBell';
import { Menu, X } from 'lucide-react';

const ROLE_HOME: Record<string, string> = {
  citizen: '/citizen',
  pri: '/citizen',
  ulb: '/citizen',
  department: '/citizen',
  university: '/university',
  industry: '/industry',
  admin: '/admin'
};

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Challenges', href: '/challenges' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Impact', href: '/impact' }
];

export default function Navbar() {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
    router.push('/login');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-navy-100 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 transition-opacity hover:opacity-90">
          <div className="flex flex-col sm:flex">
            <span className="font-serif text-xl md:text-3xl font-bold tracking-tight text-navy-900 leading-none">
              Social<span className="text-saffron-700">Connect</span>
            </span>
            <span className="mt-1 text-[7px] md:text-[9px] font-bold uppercase tracking-wider text-navy-600">
              Community • Collaboration • Innovation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${
                pathname === link.href ? 'text-saffron-700' : 'text-navy-600 hover:text-navy-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/dashboard" className={`text-sm font-semibold transition-colors ${pathname === '/dashboard' ? 'text-saffron-700' : 'text-navy-600 hover:text-navy-900'}`}>
            Analytics
          </Link>
          {profile && (
            <Link href={ROLE_HOME[profile.role] || '/'} className={`text-sm font-semibold transition-colors ${pathname?.startsWith(ROLE_HOME[profile.role]) ? 'text-saffron-700' : 'text-navy-600 hover:text-navy-900'}`}>
              My Workspace
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {user && profile ? (
            <>
              <NotificationBell />
              <Link href="/profile" className="flex flex-col items-end mr-2 hover:opacity-80 transition cursor-pointer">
                <span className="text-sm font-medium text-navy-900 hover:text-saffron-700">{profile.name}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-saffron-700">{profile.role}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="rounded-lg border border-navy-200 bg-paper px-4 py-2 text-sm font-semibold text-navy-700 shadow-sm transition hover:bg-navy-50 hover:text-navy-900"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold text-navy-700 hover:text-saffron-700 transition">
                Sign in
              </Link>
              <Link href="/register" className="rounded-lg bg-navy px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-navy-800">
                Get involved
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          {user && profile && <NotificationBell />}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-navy-900 transition hover:bg-navy-50 rounded-md"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-full w-full border-b border-navy-100 bg-white px-6 py-6 shadow-xl lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`text-lg font-semibold ${
                  pathname === link.href ? 'text-saffron-700' : 'text-navy-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/dashboard" 
              onClick={closeMobileMenu}
              className={`text-lg font-semibold ${pathname === '/dashboard' ? 'text-saffron-700' : 'text-navy-900'}`}
            >
              Analytics
            </Link>
            {profile && (
              <Link 
                href={ROLE_HOME[profile.role] || '/'} 
                onClick={closeMobileMenu}
                className={`text-lg font-semibold ${pathname?.startsWith(ROLE_HOME[profile.role]) ? 'text-saffron-700' : 'text-navy-900'}`}
              >
                My Workspace
              </Link>
            )}

            <div className="my-4 h-px w-full bg-navy-100" />

            {user && profile ? (
              <div className="flex flex-col gap-4">
                <Link href="/profile" onClick={closeMobileMenu} className="flex flex-col hover:opacity-80 transition cursor-pointer">
                  <span className="text-sm text-navy-500">Signed in as</span>
                  <span className="text-lg font-semibold text-navy-900 hover:text-saffron-700">{profile.name}</span>
                  <span className="text-sm font-bold uppercase tracking-wider text-saffron-700">{profile.role}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full rounded-lg border border-navy-200 py-3 text-center text-sm font-semibold text-navy-900 shadow-sm active:bg-navy-50"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link 
                  href="/login" 
                  onClick={closeMobileMenu}
                  className="w-full rounded-lg border border-navy-200 py-3 text-center text-sm font-semibold text-navy-900 shadow-sm"
                >
                  Sign in
                </Link>
                <Link 
                  href="/register" 
                  onClick={closeMobileMenu}
                  className="w-full rounded-lg bg-navy py-3 text-center text-sm font-semibold text-white shadow-md"
                >
                  Get involved
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
