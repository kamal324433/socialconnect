import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0d1b2a] pt-12 pb-8 md:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand & About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-bold text-white shadow-sm">
                SI
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                Social<span className="text-amber-400">Connect</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-300">
              Empowering communities by connecting citizens, universities, and industries to solve real-world civic challenges through a transparent, collaborative platform.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-slate-300 transition hover:border-amber-400 hover:bg-amber-400/10 hover:text-amber-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400">Explore</h3>
            <ul className="mt-4 space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/challenges', label: 'Browse Challenges' },
                { href: '/how-it-works', label: 'How It Works' },
                { href: '/impact', label: 'Our Impact' },
                { href: '/dashboard', label: 'Analytics' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-slate-300 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400">Get Involved</h3>
            <ul className="mt-4 space-y-3">
              {[
                'Citizens & Communities',
                'Universities & Academia',
                'Industry & Startups',
                'Government Departments',
                'PRI & Urban Local Bodies',
              ].map((label) => (
                <li key={label}>
                  <Link href="/register" className="text-sm text-slate-300 transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/login" className="text-sm text-slate-300 transition hover:text-white">
                  Sign In to Workspace
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-amber-400">Contact Us</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-amber-400" />
                <span className="text-sm leading-relaxed text-slate-300">
                  Secretariat, Doranda<br />Ranchi, Jharkhand 834002
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-amber-400" />
                <a href="tel:+911800XXXXXXX" className="text-sm text-slate-300 transition hover:text-white">
                  +91 1800-XXX-XXXX (Toll Free)
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-amber-400" />
                <a href="mailto:support@socialconnect.gov.in" className="break-all text-sm text-slate-300 transition hover:text-white">
                  support@socialconnect.gov.in
                </a>
              </li>
            </ul>
            <Link
              href="/register"
              className="mt-6 inline-flex items-center gap-1.5 rounded-sm bg-amber-400 px-4 py-2 text-sm font-semibold text-[#0d1b2a] transition hover:bg-amber-300"
            >
              Get started <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-slate-700/60" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center text-xs text-slate-400 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} SocialConnect — Societal Innovation Collaboration Portal, Jharkhand.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:justify-end">
            <Link href="#" className="transition hover:text-white">Privacy Policy</Link>
            <Link href="#" className="transition hover:text-white">Terms of Service</Link>
            <Link href="#" className="transition hover:text-white">Cookie Settings</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
