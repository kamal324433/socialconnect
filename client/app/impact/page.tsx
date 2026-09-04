import { BarChart3, Users, FileText, Lightbulb } from 'lucide-react';

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-paper">
      <section className="border-b border-navy-100 bg-navy-50 py-24 text-center">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-serif text-5xl font-semibold text-navy-900">Measuring Real World Impact</h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-navy-600">
            Our platform thrives on transparency. Here is a live look at the societal challenges we are solving together.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-navy-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-saffron-100 text-saffron-700">
              <FileText size={32} />
            </div>
            <p className="mt-6 text-5xl font-semibold text-navy-900">12.5k</p>
            <p className="mt-2 text-sm uppercase tracking-wide text-navy-500">Challenges Reported</p>
          </div>
          
          <div className="rounded-xl border border-navy-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-saffron-100 text-saffron-700">
              <Users size={32} />
            </div>
            <p className="mt-6 text-5xl font-semibold text-navy-900">45+</p>
            <p className="mt-2 text-sm uppercase tracking-wide text-navy-500">Universities Partnered</p>
          </div>

          <div className="rounded-xl border border-navy-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-saffron-100 text-saffron-700">
              <Lightbulb size={32} />
            </div>
            <p className="mt-6 text-5xl font-semibold text-navy-900">3,200</p>
            <p className="mt-2 text-sm uppercase tracking-wide text-navy-500">Solutions Proposed</p>
          </div>

          <div className="rounded-xl border border-navy-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-saffron-100 text-saffron-700">
              <BarChart3 size={32} />
            </div>
            <p className="mt-6 text-5xl font-semibold text-navy-900">850</p>
            <p className="mt-2 text-sm uppercase tracking-wide text-navy-500">Projects Piloted</p>
          </div>
        </div>
      </section>
    </div>
  );
}
