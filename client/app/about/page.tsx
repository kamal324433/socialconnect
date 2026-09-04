import Link from 'next/link';
import { ArrowRight, Target, Users, Shield } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Hero Section */}
      <section className="border-b border-navy-100 bg-navy-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl font-semibold leading-tight text-navy-900 md:text-6xl">
              Bridging the gap between civic problems and real solutions.
            </h1>
            <p className="mt-6 text-xl text-navy-600">
              Societal Innovation Connect is a dedicated platform designed to bring citizens, universities, and industry partners together to collaboratively tackle community challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-navy-900">Our Mission</h2>
            <p className="mt-4 text-lg text-navy-600">
              We believe that the people who experience civic issues firsthand are best positioned to identify them, while our local institutions are best equipped to solve them. Our mission is to facilitate a transparent, efficient, and AI-driven workflow that turns community reports into actionable, funded projects.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link href="/register" className="inline-flex items-center gap-2 rounded-sm bg-navy px-6 py-3 text-sm font-medium text-paper transition hover:bg-navy-900">
                Join the Movement <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-saffron-100 text-saffron-700">
                <Target size={24} />
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold text-navy-900">Targeted Impact</h3>
              <p className="mt-2 text-sm text-navy-600">Focusing on issues that directly improve community well-being and local infrastructure.</p>
            </div>
            
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-saffron-100 text-saffron-700">
                <Users size={24} />
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold text-navy-900">Collaboration</h3>
              <p className="mt-2 text-sm text-navy-600">Breaking down silos between citizens, academia, and private industry sectors.</p>
            </div>
            
            <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm sm:col-span-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-saffron-100 text-saffron-700">
                <Shield size={24} />
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold text-navy-900">Transparency</h3>
              <p className="mt-2 text-sm text-navy-600">Every project lifecycle is tracked openly, ensuring accountability from reporting to resolution.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
