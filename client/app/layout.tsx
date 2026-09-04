import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap'
});

const plexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Societal Innovation Collaboration Portal',
  description: 'Connecting citizens, universities, industry and government to solve real civic challenges.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexSerif.variable}`}>
      <body>
        <AuthProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
