import Link from 'next/link';
import { Search, MapPin, Tag, ArrowRight } from 'lucide-react';

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <section className="bg-navy-900 py-20 text-paper">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-serif text-4xl font-semibold md:text-5xl">Explore Civic Challenges</h1>
          <p className="mt-4 max-w-2xl text-navy-200 text-lg">
            Browse through active problems reported by citizens, track their progress, and see how institutions are solving them.
          </p>
          
          <div className="mt-8 flex max-w-2xl items-center gap-2 rounded-md bg-white p-2">
            <Search className="ml-2 text-navy-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by keyword, district, or category..." 
              className="flex-1 bg-transparent px-2 py-1 text-navy-900 outline-none placeholder:text-navy-400"
            />
            <button className="rounded bg-saffron px-4 py-2 text-sm font-medium text-navy-900 hover:bg-saffron-500 transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Challenge List (Placeholder) */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold text-navy-900">Recent Reports</h2>
          <select className="rounded border border-navy-200 bg-white px-3 py-1.5 text-sm text-navy-700 outline-none">
            <option>Most Recent</option>
            <option>Highest Priority</option>
            <option>Resolved</option>
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Mock Card 1 */}
          <div className="flex flex-col rounded-xl border border-navy-100 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-saffron-700">
              <Tag size={14} /> Infrastructure
            </div>
            <h3 className="mt-3 font-serif text-lg font-semibold text-navy-900 line-clamp-2">
              Severe Waterlogging During Monsoons on MG Road
            </h3>
            <p className="mt-2 text-sm text-navy-600 line-clamp-3">
              Every rainy season, the main junction floods entirely causing severe traffic blocks and health hazards for the local residents. The existing drainage seems entirely blocked.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-navy-500">
              <MapPin size={14} /> District 4, Ward 12
            </div>
            <div className="mt-auto pt-6">
              <Link href="#" className="flex items-center justify-between text-sm font-medium text-navy-900 hover:text-saffron-700">
                View Details <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          
          {/* Mock Card 2 */}
          <div className="flex flex-col rounded-xl border border-navy-100 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-saffron-700">
              <Tag size={14} /> Environment
            </div>
            <h3 className="mt-3 font-serif text-lg font-semibold text-navy-900 line-clamp-2">
              Illegal Waste Dumping Near Lake Boundary
            </h3>
            <p className="mt-2 text-sm text-navy-600 line-clamp-3">
              Unidentified vehicles are dumping industrial and construction waste near the lake premises overnight. It is severely polluting the water body.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-navy-500">
              <MapPin size={14} /> North Zone
            </div>
            <div className="mt-auto pt-6">
              <Link href="#" className="flex items-center justify-between text-sm font-medium text-navy-900 hover:text-saffron-700">
                View Details <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Mock Card 3 */}
          <div className="flex flex-col rounded-xl border border-navy-100 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-saffron-700">
              <Tag size={14} /> Public Health
            </div>
            <h3 className="mt-3 font-serif text-lg font-semibold text-navy-900 line-clamp-2">
              Lack of Accessible Primary Healthcare Facility
            </h3>
            <p className="mt-2 text-sm text-navy-600 line-clamp-3">
              The closest hospital is 15km away, and the local clinic lacks essential supplies and staff, leaving over 5,000 residents vulnerable during emergencies.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-navy-500">
              <MapPin size={14} /> Rural District 2
            </div>
            <div className="mt-auto pt-6">
              <Link href="#" className="flex items-center justify-between text-sm font-medium text-navy-900 hover:text-saffron-700">
                View Details <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <button className="rounded-sm border border-navy-300 px-6 py-2 text-sm font-medium text-navy-700 transition hover:border-navy hover:text-navy">
            Load More Challenges
          </button>
        </div>
      </section>
    </div>
  );
}
