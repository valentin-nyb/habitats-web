'use client';

import { X } from 'lucide-react';

export interface TeaserFeature {
  title: string;
  icon: string;
  description: string;
  bullets: string[];
  comingSoon?: string;
}

export const FEATURES: Record<string, TeaserFeature> = {
  'green-bonds': {
    title: 'Green Bond Financing',
    icon: '🌿',
    description: 'Access environmentally-certified financing instruments linked to the property\'s sustainability rating.',
    bullets: [
      'Properties scored on solar, water, and carbon footprint',
      'Access to preferential green bond rates from partner banks',
      'Real-time ESG rating visible on every listing',
      'Eligible properties flagged with Green Certification',
    ],
    comingSoon: 'Launching Q3 2026 — Partner banks being onboarded',
  },
  'investment-analysis': {
    title: 'Investment Analysis Report',
    icon: '📊',
    description: 'Deep-dive financial modelling for every property — cap rates, gross yields, and 5-year ROI projections.',
    bullets: [
      'Gross and net rental yield calculations',
      'Capital growth projections (3 & 5 year)',
      'Cap rate vs. market benchmark',
      'Airbnb short-term rental income estimate',
      'Comparable sales in the same node',
    ],
    comingSoon: 'Available in Premium tier — launching Q2 2026',
  },
  'wallet-connect': {
    title: 'Crypto & Wallet Connection',
    icon: '🔗',
    description: 'Tokenised real estate ownership — invest in fractional property shares using your crypto wallet.',
    bullets: [
      'Connect MetaMask or WalletConnect',
      'Fractional property ownership via RWA tokens',
      'On-chain title deed verification',
      'Staking yields on held property tokens',
    ],
    comingSoon: 'Blockchain infrastructure in development — Q4 2026',
  },
  'relocation': {
    title: 'Relocation Ecosystem',
    icon: '✈️',
    description: 'Everything you need to move — visa guidance, tax optimisation, school finders, and local experts.',
    bullets: [
      'Visa and residency pathway calculator',
      'Tax comparison: SA vs. destination country',
      'Verified school and healthcare directories',
      'Matched with relocation specialists',
    ],
    comingSoon: 'Content partnership programme open — Q2 2026',
  },
  'agent-portal': {
    title: 'Agent Portal',
    icon: '🏢',
    description: 'A dedicated dashboard for estate agents to list properties, run client reports, and track leads.',
    bullets: [
      'Bulk property upload via CSV or API',
      'Client-facing lifestyle reports branded to your agency',
      'Lead capture and CRM integration',
      'Subscription tiers: Starter, Pro, Enterprise',
    ],
    comingSoon: 'Beta access open — contact us to join',
  },
};

interface FeatureTeaserProps {
  feature: TeaserFeature;
  onClose: () => void;
}

export function FeatureTeaser({ feature, onClose }: FeatureTeaserProps) {
  return (
    <div
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl p-8 relative border border-black/5 dark:border-white/10 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-4xl mb-4">{feature.icon}</div>
        <h3 className="font-display text-xl font-bold text-black dark:text-white mb-2">
          {feature.title}
        </h3>
        <p className="text-sm text-zinc-500 mb-5 leading-relaxed">{feature.description}</p>

        <ul className="space-y-2 mb-6">
          {feature.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="text-black dark:text-brand-lime font-bold mt-0.5">✓</span>
              {b}
            </li>
          ))}
        </ul>

        {feature.comingSoon && (
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-500 font-medium border border-black/5 dark:border-white/5">
            🕐 {feature.comingSoon}
          </div>
        )}
      </div>
    </div>
  );
}
