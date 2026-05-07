'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LifestyleQuiz, QuizResult } from '@/components/LifestyleQuiz';
import { PropertyCard } from '@/components/PropertyCard';
import { SA_PROPERTIES, matchPropertiesByProfile } from '@/lib/sa-properties';
import { Property } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Stage = 'quiz' | 'results';

export default function SearchPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>('quiz');
  const [results, setResults] = useState<Property[]>([]);
  const [profile, setProfile] = useState<QuizResult | null>(null);

  function handleQuizComplete(result: QuizResult) {
    const matched = matchPropertiesByProfile(SA_PROPERTIES, result);
    setResults(matched);
    setProfile(result);
    setStage('results');
  }

  const userTypeLabel: Record<string, string> = {
    nomad: 'Digital Nomad',
    family: 'Family',
    investor: 'Investor',
    retiree: 'Retiree / Relocator',
  };

  return (
    <div className="min-h-screen pt-20 md:pt-24 bg-white dark:bg-brand-black">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {stage === 'quiz' && (
          <>
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-[10px] font-bold tracking-widest uppercase mb-6 text-zinc-500">
                <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-brand-lime" />
                Lifestyle Search
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-black dark:text-white mb-3">
                Find your perfect lifestyle.
              </h1>
              <p className="text-zinc-500 text-lg max-w-xl">
                Answer 4 quick questions and we&apos;ll match you with South Africa&apos;s best lifestyle properties.
              </p>
            </div>

            <LifestyleQuiz onComplete={handleQuizComplete} />
          </>
        )}

        {stage === 'results' && (
          <>
            {/* Results header */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setStage('quiz')}
                className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="font-display text-2xl font-bold text-black dark:text-white">
                  Your matches
                </h2>
                <p className="text-sm text-zinc-500">
                  {results.length} properties for{' '}
                  <span className="font-semibold text-black dark:text-white">
                    {profile ? userTypeLabel[profile.userType] ?? profile.userType : 'you'}
                  </span>
                  {profile?.location ? ` · ${profile.location}` : ''}
                </p>
              </div>
            </div>

            {/* Priority chips */}
            {profile?.priorities && profile.priorities.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {profile.priorities.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-bold capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Property grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {results.map((prop, i) => (
                <PropertyCard key={prop.id} property={prop} index={i} />
              ))}
            </div>

            {/* CTA */}
            <div className="border-t border-black/5 dark:border-white/5 pt-10 text-center">
              <p className="text-zinc-500 text-sm mb-4">Want to see every property?</p>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 dark:border-white/10 text-sm font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Open full explore map
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
