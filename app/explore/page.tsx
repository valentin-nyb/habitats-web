'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { PropertyCard } from '@/components/PropertyCard';
import { LifestyleFilterBar } from '@/components/LifestyleFilterBar';
import { fetchPropertiesFromDB } from '@/lib/supabase';
import { FALLBACK_PROPERTIES, searchProperties } from '@/lib/properties';
import { Property } from '@/types';
import { useRouter } from 'next/navigation';

// Mapbox must be client-only (no SSR)
const MapView = dynamic(() => import('@/components/MapView').then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
      <span className="text-zinc-400 text-sm">Loading map…</span>
    </div>
  ),
});

export default function ExplorePage() {
  const router = useRouter();
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [displayed, setDisplayed] = useState<Property[]>([]);
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch properties (Supabase → fallback)
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchPropertiesFromDB();
        const props = data && data.length > 0 ? (data as Property[]) : FALLBACK_PROPERTIES;
        setAllProperties(props);
        setDisplayed(props);
      } catch {
        setAllProperties(FALLBACK_PROPERTIES);
        setDisplayed(FALLBACK_PROPERTIES);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filter whenever query or tag changes
  useEffect(() => {
    let results = searchProperties(allProperties, query);
    if (activeTag) {
      results = results.filter((p) =>
        p.lifestyle_tags?.some((t) => t.toLowerCase().includes(activeTag.toLowerCase()))
      );
    }
    setDisplayed(results);
  }, [query, activeTag, allProperties]);

  const handlePropertyClick = useCallback(
    (property: Property) => {
      router.push(`/property/${property.id}`);
    },
    [router]
  );

  return (
    <div className="fixed inset-0 pt-16 md:pt-20 flex flex-col bg-white dark:bg-black">
      <div className="flex flex-1 overflow-hidden">
        {/* ── LEFT PANEL: Listings ──────────────────────────────── */}
        <div className="w-full md:w-[55%] h-full overflow-y-auto no-scrollbar flex flex-col">
          <div className="p-6 pb-3 space-y-4">
            {/* Mobile search */}
            <div className="md:hidden flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-full px-4 py-3 gap-3">
              <svg className="w-4 h-4 text-zinc-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lifestyle, city or vibe..."
                className="bg-transparent border-none outline-none w-full text-sm dark:text-white placeholder-zinc-400"
              />
            </div>

            {/* Lifestyle tag filters */}
            <LifestyleFilterBar onFilter={setActiveTag} />

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold dark:text-white">
                {loading ? 'Loading…' : `${displayed.length} Lifestyle${displayed.length !== 1 ? 's' : ''}`}
              </h2>
              <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider">
                {activeTag || 'All'}
              </span>
            </div>
          </div>

          {/* Property Grid */}
          <div className="px-6 pb-32">
            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-2xl bg-zinc-100 dark:bg-zinc-900 animate-pulse aspect-[4/3]" />
                ))}
              </div>
            ) : displayed.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-zinc-400 text-lg mb-2">No matches found</p>
                <p className="text-zinc-500 text-sm">Try a different search or clear filters</p>
                <button
                  onClick={() => { setQuery(''); setActiveTag(''); }}
                  className="mt-4 px-6 py-2 rounded-full border border-black/10 dark:border-white/10 text-sm font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {displayed.map((prop, i) => (
                  <PropertyCard key={prop.id} property={prop} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL: Map ─────────────────────────────────── */}
        <div className="hidden md:block md:w-[45%] h-full relative border-l border-black/5 dark:border-white/10">
          <MapView properties={displayed} onPropertyClick={handlePropertyClick} />
        </div>
      </div>
    </div>
  );
}
