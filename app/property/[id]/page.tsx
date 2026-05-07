'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, Bath, Bed, Maximize, Wifi, Wind,
  Activity, Cpu, Lightbulb, Zap, Fan, MapPin,
  TrendingUp, FileText, Loader2,
} from 'lucide-react';
import { SA_PROPERTIES } from '@/lib/sa-properties';
import { FALLBACK_PROPERTIES } from '@/lib/properties';
import { FeatureTeaser, FEATURES } from '@/components/FeatureTeaser';

const ALL_PROPERTIES = [...SA_PROPERTIES, ...FALLBACK_PROPERTIES];

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const property = ALL_PROPERTIES.find(p => p.id === id);
  const [teaser, setTeaser] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-zinc-500 mb-4">Property not found.</p>
          <Link href="/explore" className="text-sm font-bold underline">Back to Explore</Link>
        </div>
      </div>
    );
  }

  const techIcon =
    property.tech_integration?.toLowerCase().includes('lighting')
      ? <Lightbulb className="w-5 h-5 text-black dark:text-brand-lime" />
      : <Cpu className="w-5 h-5 text-black dark:text-brand-lime" />;

  const wellnessIcon =
    property.wellness_proximity?.toLowerCase().includes('bio')
      ? <Zap className="w-5 h-5 text-black dark:text-brand-lime" />
      : <Activity className="w-5 h-5 text-black dark:text-brand-lime" />;

  const airIcon =
    property.air_quality?.toLowerCase().includes('hepa')
      ? <Fan className="w-5 h-5 text-black dark:text-brand-lime" />
      : <Wind className="w-5 h-5 text-black dark:text-brand-lime" />;

  function handleGenerateReport() {
    setGenerating(true);
    // Simulate pre-generated report loading — then navigate
    setTimeout(() => {
      setGenerating(false);
      router.push(`/report/${property.id}`);
    }, 1800);
  }

  return (
    <div className="relative z-[150] bg-white dark:bg-[#050505] flex flex-col min-h-screen pt-16 md:pt-20">

      {/* Sticky header */}
      <div className="sticky top-16 md:top-20 z-20 flex justify-between items-center px-6 py-4 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-black dark:text-white" />
        </button>
        <span className="font-display font-bold text-lg dark:text-white">Property Details</span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="w-full max-w-2xl mx-auto p-6 animate-enter-up">

          {/* Hero Image */}
          <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden mb-8 shadow-2xl relative">
            <Image
              src={property.image_url}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
            <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold dark:text-white">
              {property.badge_text ?? 'Verified'}
            </div>
          </div>

          {/* Title + Price */}
          <div className="flex justify-between items-end mb-6 gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-black dark:text-white mb-1">
                {property.title}
              </h1>
              <p className="text-zinc-500 flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {property.location}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <h2 className="font-display text-2xl font-bold text-black dark:text-white">
                {property.price_text}
              </h2>
              <p className="text-sm text-zinc-500">/ month</p>
            </div>
          </div>

          {/* Specs */}
          <div className="flex items-center gap-6 py-6 border-y border-black/5 dark:border-white/5 mb-6">
            {[
              { icon: <Bath className="w-4 h-4 text-black dark:text-white" />, value: `${property.baths} Bath` },
              { icon: <Bed className="w-4 h-4 text-black dark:text-white" />, value: `${property.beds} Beds` },
              { icon: <Maximize className="w-4 h-4 text-black dark:text-white" />, value: `${property.sqft}m²` },
            ].map(s => (
              <div key={s.value} className="flex items-center gap-2">
                <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-full">{s.icon}</div>
                <span className="text-sm font-medium dark:text-zinc-300">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Lifestyle Tags */}
          {property.lifestyle_tags && (
            <div className="flex flex-wrap gap-2 mb-8">
              {property.lifestyle_tags.map(tag => (
                <span key={tag}
                  className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold text-zinc-600 dark:text-zinc-400 capitalize">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Vibe & Tech Specs */}
          <div className="mb-8 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl">
            <h3 className="font-bold text-lg mb-4 dark:text-white">Vibe &amp; Tech Specs</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: wellnessIcon, label: 'Wellness', value: property.wellness_proximity },
                { icon: techIcon, label: 'Tech Stack', value: property.tech_integration },
                { icon: <Wifi className="w-5 h-5 text-black dark:text-brand-lime" />, label: 'Internet', value: property.wifi_speed },
                { icon: airIcon, label: 'Air Quality', value: property.air_quality },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white dark:bg-black rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase font-bold">{item.label}</p>
                    <p className="font-bold text-black dark:text-white text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-3 dark:text-white">Description</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{property.description}</p>
          </div>

          {/* Investment signal */}
          {property.lifestyle_tags?.includes('investment') && (
            <div className="mb-8 p-5 bg-brand-lime/10 border border-brand-lime/30 rounded-2xl flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-[#65a30d] dark:text-brand-lime mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-black dark:text-white mb-1">Investment Grade</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  ROI analysis, cap rate, and 3-year growth projection available in the full report.
                </p>
              </div>
            </div>
          )}

          {/* Feature explore buttons */}
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Explore</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'investment-analysis', label: 'Investment Analysis', icon: '📊' },
                { key: 'green-bonds', label: 'Green Bonds', icon: '🌿' },
                { key: 'relocation', label: 'Relocation Guide', icon: '✈️' },
                { key: 'agent-portal', label: 'Agent Portal', icon: '🏢' },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setTeaser(f.key)}
                  className="flex items-center gap-2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all text-left"
                >
                  <span className="text-lg">{f.icon}</span>
                  <span className="text-xs font-bold text-black dark:text-white">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3 mb-16">
            {/* Generate Report — the hero CTA */}
            <button
              onClick={handleGenerateReport}
              disabled={generating}
              className="w-full bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider py-4 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
            >
              {generating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Report…
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  Generate Lifestyle Report — R50
                </>
              )}
            </button>

            <button className="w-full border border-black/10 dark:border-white/10 text-black dark:text-white font-bold py-4 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm">
              Subscribe for Unlimited Access
            </button>
          </div>

          <footer className="border-t border-black/5 dark:border-white/5 pt-8 pb-4 text-center">
            <p className="text-xs text-zinc-400 font-mono uppercase tracking-wider">
              © 2026 habitat.s — TerraVerta Habitats
            </p>
          </footer>
        </div>
      </div>

      {/* Feature Teaser Modal */}
      {teaser && FEATURES[teaser] && (
        <FeatureTeaser feature={FEATURES[teaser]} onClose={() => setTeaser(null)} />
      )}
    </div>
  );
}
