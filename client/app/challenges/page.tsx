'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, MapPin, ArrowRight, Tag, ThumbsUp,
  Building2, Leaf, Heart, GraduationCap, Stethoscope,
  Droplets, Trash2, Wheat, Bus, Zap, Briefcase,
  Wifi, Baby, Accessibility, Filter, X, ChevronDown
} from 'lucide-react';
import { CHALLENGES, ALL_CATEGORIES, type Challenge, type Priority, type Status } from '@/lib/challengeData';

/* ─── Category → Icon mapping ─────────────────────────────────── */
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Infrastructure':       Building2,
  'Environment':          Leaf,
  'Public Health':        Heart,
  'Education':            GraduationCap,
  'Healthcare':           Stethoscope,
  'Water & Sanitation':   Droplets,
  'Waste Management':     Trash2,
  'Agriculture':          Wheat,
  'Transportation':       Bus,
  'Energy':               Zap,
  'Employment':           Briefcase,
  'Digital Services':     Wifi,
  'Women & Child Welfare':Baby,
  'Accessibility':        Accessibility,
};

/* ─── Priority & Status display helpers ───────────────────────── */
const PRIORITY_STYLES: Record<Priority, string> = {
  critical: 'bg-brick text-white',
  high:     'bg-brick-100 text-brick',
  medium:   'bg-saffron-100 text-saffron-700',
  low:      'bg-navy-100 text-navy-500',
};

const STATUS_STYLES: Record<Status, string> = {
  submitted:    'bg-navy-100 text-navy-700',
  ai_verified:  'bg-saffron-100 text-saffron-700',
  under_review: 'bg-saffron-100 text-saffron-700',
  assigned:     'bg-teal-100 text-teal-700',
  in_progress:  'bg-teal-100 text-teal-700',
  resolved:     'bg-moss-100 text-moss',
};

const STATUS_LABELS: Record<Status, string> = {
  submitted:    'Submitted',
  ai_verified:  'AI Verified',
  under_review: 'Under Review',
  assigned:     'Assigned',
  in_progress:  'In Progress',
  resolved:     'Resolved',
};

type SortOption = 'most_recent' | 'highest_priority' | 'most_supported' | 'in_progress' | 'resolved';

const PRIORITY_ORDER: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 };
const PAGE_SIZE = 6;

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery]   = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy]             = useState<SortOption>('most_recent');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [showFilters, setShowFilters]   = useState(false);

  /* ─── Filtered + Sorted list ─────────────────────────────────── */
  const filtered = useMemo(() => {
    let list = [...CHALLENGES];

    // Category filter
    if (activeCategory !== 'All') {
      list = list.filter((c) => c.category === activeCategory);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.district.toLowerCase().includes(q),
      );
    }

    // Sort
    switch (sortBy) {
      case 'most_recent':
        list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'highest_priority':
        list.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
        break;
      case 'most_supported':
        list.sort((a, b) => b.support - a.support);
        break;
      case 'in_progress':
        list = list.filter((c) => c.status === 'in_progress' || c.status === 'assigned');
        break;
      case 'resolved':
        list = list.filter((c) => c.status === 'resolved');
        break;
    }

    return list;
  }, [searchQuery, activeCategory, sortBy]);

  const visible   = filtered.slice(0, visibleCount);
  const hasMore   = visibleCount < filtered.length;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSortChange = (val: SortOption) => {
    setSortBy(val);
    setVisibleCount(PAGE_SIZE);
  };

  const handleSearch = (val: string) => {
    setSearchQuery(val);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="min-h-screen bg-paper">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-navy-900 py-20 text-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-3 text-sm font-bold tracking-widest text-saffron-500 uppercase">
            Societal Innovation Collaboration Portal
          </div>
          <h1 className="font-serif text-4xl font-semibold md:text-5xl">Explore Civic Challenges</h1>
          <p className="mt-4 max-w-2xl text-navy-200 text-lg">
            Browse through active problems reported by citizens, track their progress, and see how institutions are solving them.
          </p>

          {/* Search */}
          <div className="mt-8 flex max-w-2xl items-center gap-2 rounded-md bg-white p-2">
            <Search className="ml-2 flex-shrink-0 text-navy-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by keyword, district, or category..."
              className="flex-1 bg-transparent px-2 py-1 text-navy-900 outline-none placeholder:text-navy-400 text-sm"
            />
            {searchQuery && (
              <button onClick={() => handleSearch('')} className="flex-shrink-0 p-1 text-navy-400 hover:text-navy-700">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Category Filter Bar ───────────────────────────────── */}
      <div className="sticky top-0 z-20 border-b border-navy-100 bg-white/95 backdrop-blur shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Mobile filter toggle */}
          <div className="flex items-center justify-between py-3 sm:hidden">
            <span className="text-sm font-semibold text-navy-700">
              {activeCategory === 'All' ? 'All Categories' : activeCategory}
            </span>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 rounded-sm border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-700"
            >
              <Filter size={13} /> Filters
              <ChevronDown size={13} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Desktop scrollable pills */}
          <div className={`${showFilters ? 'flex' : 'hidden sm:flex'} flex-wrap gap-2 py-3`}>
            {['All', ...ALL_CATEGORIES].map((cat) => {
              const Icon = cat === 'All' ? Tag : CATEGORY_ICONS[cat];
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-navy text-paper shadow-sm'
                      : 'border border-navy-200 text-navy-600 hover:border-navy-400 hover:bg-navy-50'
                  }`}
                >
                  {Icon && <Icon size={12} />}
                  {cat === 'All' ? 'All Categories' : cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Challenge List ────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy-900">
              {activeCategory === 'All' ? 'Recent Reports' : `${activeCategory} Challenges`}
            </h2>
            <p className="mt-0.5 text-sm text-navy-500">
              {filtered.length === 0
                ? 'No challenges found'
                : `${filtered.length} challenge${filtered.length !== 1 ? 's' : ''} found`}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="rounded border border-navy-200 bg-white px-3 py-1.5 text-sm text-navy-700 outline-none cursor-pointer"
          >
            <option value="most_recent">Most Recent</option>
            <option value="highest_priority">Highest Priority</option>
            <option value="most_supported">Most Supported</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Empty state */}
        {visible.length === 0 && (
          <div className="rounded-xl border border-dashed border-navy-200 bg-white py-16 text-center">
            <Search size={32} className="mx-auto mb-3 text-navy-300" />
            <p className="font-semibold text-navy-700">No challenges match your search</p>
            <p className="mt-1 text-sm text-navy-500">Try a different keyword or clear the category filter.</p>
            <button
              onClick={() => { handleSearch(''); handleCategoryChange('All'); }}
              className="mt-4 rounded-sm border border-navy-300 px-4 py-2 text-sm font-medium text-navy-700 hover:border-navy"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>

        {/* Load More */}
        {visible.length > 0 && (
          <div className="mt-10 text-center">
            {hasMore ? (
              <button
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className="rounded-sm border border-navy-300 px-6 py-2.5 text-sm font-medium text-navy-700 transition hover:border-navy hover:bg-navy-50 hover:text-navy"
              >
                Load More Challenges ({filtered.length - visibleCount} remaining)
              </button>
            ) : filtered.length > PAGE_SIZE ? (
              <p className="text-sm font-medium text-navy-500">✓ All {filtered.length} challenges loaded</p>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}

/* ─── Challenge Card Component ────────────────────────────────── */
function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const Icon = CATEGORY_ICONS[challenge.category] || Tag;

  return (
    <div className="group flex flex-col rounded-xl border border-navy-100 bg-white p-5 shadow-sm transition hover:border-saffron-300 hover:shadow-md">
      {/* Category */}
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-saffron-700">
        <Icon size={13} />
        {challenge.category}
      </div>

      {/* Title */}
      <h3 className="mt-3 font-serif text-base font-semibold text-navy-900 line-clamp-2 leading-snug">
        {challenge.title}
      </h3>

      {/* Description */}
      <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-500 line-clamp-3">
        {challenge.description}
      </p>

      {/* Location */}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-navy-400">
        <MapPin size={12} />
        {challenge.location}, {challenge.district}
      </div>

      {/* Priority + Status pills */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className={`rounded-sm px-2 py-0.5 text-xs font-semibold capitalize ${PRIORITY_STYLES[challenge.priority]}`}>
          {challenge.priority}
        </span>
        <span className={`rounded-sm px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[challenge.status]}`}>
          {STATUS_LABELS[challenge.status]}
        </span>
        <span className="ml-auto flex items-center gap-1 text-xs text-navy-400">
          <ThumbsUp size={11} /> {challenge.support}
        </span>
      </div>

      {/* View Details */}
      <div className="mt-4 border-t border-navy-100 pt-4">
        <Link
          href={`/challenges/${challenge.id}`}
          className="flex items-center justify-between text-sm font-semibold text-navy-900 transition hover:text-saffron-700 group-hover:text-saffron-700"
        >
          View Details
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
