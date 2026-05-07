'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft, Download, TrendingUp, Wind, Wifi, Activity,
  Shield, MapPin, BarChart2, Star, AlertTriangle, CheckCircle,
} from 'lucide-react';
import { SA_PROPERTIES } from '@/lib/sa-properties';
import { FALLBACK_PROPERTIES } from '@/lib/properties';
import { FeatureTeaser, FEATURES } from '@/components/FeatureTeaser';

const ALL_PROPERTIES = [...SA_PROPERTIES, ...FALLBACK_PROPERTIES];

// Pre-generated fictional report data keyed by property id
const REPORT_DATA: Record<string, {
  lifestyleScore: number;
  investmentScore: number;
  wellnessScore: number;
  safetyScore: number;
  roiEstimate: string;
  rentalYield: string;
  capRate: string;
  growthProjection: string;
  crimeIndex: string;
  airScore: string;
  walkScore: number;
  schools: string;
  highlights: string[];
  risks: string[];
  verdict: string;
}> = {
  'sa-001': {
    lifestyleScore: 94, investmentScore: 91, wellnessScore: 96, safetyScore: 82,
    roiEstimate: '11.2% p.a.', rentalYield: '8.4%', capRate: '7.1%', growthProjection: '+18% over 3 yrs',
    crimeIndex: 'Low (estate-secured area)', airScore: 'Excellent — 18 AQI', walkScore: 88,
    schools: 'Reddam House (4.2km), SACS (6.1km)',
    highlights: ['Top 5% performing STR node in Cape Town', 'Atlantic Ocean views command 34% premium', 'Solar + Starlink = full load-shedding immunity', 'Camps Bay strip walkable — hospitality ROI strong'],
    risks: ['Seasonal vacancy risk in winter months', 'High entry price limits buyer pool', 'Loadshedding affects non-solar builds nearby'],
    verdict: 'A flagship investment-grade lifestyle property. Strong short-term rental performance, exceptional location premium, and future-proofed infrastructure make this a top-tier acquisition.',
  },
  'sa-002': {
    lifestyleScore: 88, investmentScore: 74, wellnessScore: 82, safetyScore: 71,
    roiEstimate: '7.8% p.a.', rentalYield: '9.2%', capRate: '6.4%', growthProjection: '+12% over 3 yrs',
    crimeIndex: 'Moderate — improving neighbourhood', airScore: 'Good — 35 AQI', walkScore: 92,
    schools: 'Cape Town High (1.8km), Herzlia (3.4km)',
    highlights: ['Woodstock gentrification underway — early mover advantage', 'Highest walk score in the dataset', 'Strong nomad rental demand year-round', 'Old Biscuit Mill foot traffic drives short-stay premium'],
    risks: ['Gentrification still in progress — variable block quality', 'Street parking only', 'Air quality affected by nearby industrial zones'],
    verdict: 'Excellent digital nomad and co-living asset. High rental demand, strong yield, and one of Cape Town\'s most walkable addresses. Entry-level price makes this accessible for first-time investors.',
  },
  'sa-003': {
    lifestyleScore: 97, investmentScore: 95, wellnessScore: 98, safetyScore: 94,
    roiEstimate: '13.1% p.a.', rentalYield: '7.6%', capRate: '8.2%', growthProjection: '+22% over 3 yrs',
    crimeIndex: 'Very Low (private estate, armed response)', airScore: 'Pristine — 10 AQI', walkScore: 62,
    schools: 'Bishops (4.1km), Herschel (3.8km), Constantia Waldorf (1.2km)',
    highlights: ['Constantia Valley — one of SA\'s most resilient property nodes', 'Wine estate setting commands 28% lifestyle premium', 'Mountain Biosphere Reserve air quality — cleanest in dataset', 'Blue-chip family destination — consistent demand'],
    risks: ['Car-dependent location', 'High municipal rates in Constantia', 'Water-wise landscaping restrictions in summer'],
    verdict: 'The highest-scoring property in our South Africa dataset. Pristine air, elite security, top schools, and a wine estate setting make this a generational asset. Strong capital preservation with excellent long-term appreciation.',
  },
  'sa-004': {
    lifestyleScore: 89, investmentScore: 83, wellnessScore: 91, safetyScore: 78,
    roiEstimate: '9.3% p.a.', rentalYield: '8.9%', capRate: '7.0%', growthProjection: '+15% over 3 yrs',
    crimeIndex: 'Low (building security + CCTV)', airScore: 'Excellent — 20 AQI', walkScore: 95,
    schools: 'Sea Point Primary (0.6km), WCED schools within 2km',
    highlights: ['Promenade on doorstep — highest wellness activation score', 'Highest walk score for urban Cape Town properties', 'Atlantic Ocean air quality consistently excellent', 'Strong medium-term rental demand from corporate relocators'],
    risks: ['Building levies can be high', 'Limited parking in Sea Point', 'Load-shedding impacts if building has no backup power'],
    verdict: 'Best urban wellness property in the dataset. Promenade access, ocean air, and walkability create a rare lifestyle package at a mid-range price point. Solid investment fundamentals and consistent rental demand.',
  },
  'sa-005': {
    lifestyleScore: 95, investmentScore: 71, wellnessScore: 99, safetyScore: 88,
    roiEstimate: '6.2% p.a.', rentalYield: '7.1%', capRate: '5.8%', growthProjection: '+9% over 3 yrs',
    crimeIndex: 'Very Low (rural, small community)', airScore: 'Pristine — 8 AQI (top of dataset)', walkScore: 28,
    schools: 'Knysna Primary (4.2km), Knysna High (4.8km)',
    highlights: ['Cleanest air quality in the entire dataset', 'Full energy and water independence', 'Garden Route tourism drives short-term rental demand', 'Whale season occupancy spikes — seasonal windfall'],
    risks: ['Car essential — very low walkability', 'Lower capital growth than urban nodes', 'Starlink dependent — can have latency issues'],
    verdict: 'The wellness leader. Off-grid, pristine air, and forest immersion create an unmatched lifestyle score. Returns are moderate, making this best suited for owner-occupiers or lifestyle investors rather than yield-hunters.',
  },
};

// Default report for properties without specific data
function getReport(id: string) {
  return REPORT_DATA[id] ?? {
    lifestyleScore: 85, investmentScore: 80, wellnessScore: 84, safetyScore: 76,
    roiEstimate: '8.5% p.a.', rentalYield: '7.8%', capRate: '6.5%', growthProjection: '+13% over 3 yrs',
    crimeIndex: 'Moderate — area specific', airScore: 'Good — 30 AQI', walkScore: 72,
    schools: 'Multiple options within 5km',
    highlights: ['Strong lifestyle fundamentals', 'Good connectivity and infrastructure', 'Active rental market in this node', 'Proximity to key amenities'],
    risks: ['Market conditions subject to macro factors', 'Municipal service delivery variable', 'Due diligence on title deed recommended'],
    verdict: 'A solid lifestyle-investment property with balanced fundamentals. Well-positioned for both owner-occupier and investor acquisition.',
  };
}

function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" className="dark:stroke-zinc-700" />
          <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="5"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-black dark:text-white">
          {score}
        </span>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 text-center">{label}</p>
    </div>
  );
}

export default function ReportPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const property = ALL_PROPERTIES.find(p => p.id === id);
  const report = getReport(id);
  const [teaser, setTeaser] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(true); // pre-generated

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

  return (
    <div className="min-h-screen bg-white dark:bg-brand-black pt-16 md:pt-20">
      {/* Header */}
      <div className="sticky top-16 md:top-20 z-20 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-black/5 dark:border-white/5 px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Lifestyle Report</span>
          <span className="w-2 h-2 rounded-full bg-black dark:bg-brand-lime" />
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 text-xs font-bold bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full hover:opacity-80 transition-opacity"
        >
          <Download className="w-3.5 h-3.5" /> Export PDF
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-8">

        {/* Property snapshot */}
        <div className="flex gap-4 items-start">
          <div className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={property.image_url} alt={property.title} fill className="object-cover" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">habitat.s Report · Jan 2026</p>
            <h1 className="font-display text-xl font-bold text-black dark:text-white leading-tight">{property.title}</h1>
            <p className="text-sm text-zinc-500 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" />{property.location}</p>
          </div>
        </div>

        {/* Score rings */}
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-5">habitat.s Scores</p>
          <div className="grid grid-cols-4 gap-4">
            <ScoreRing score={report.lifestyleScore} label="Lifestyle" color="#3A5C38" />
            <ScoreRing score={report.investmentScore} label="Investment" color="#1C3557" />
            <ScoreRing score={report.wellnessScore} label="Wellness" color="#bef264" />
            <ScoreRing score={report.safetyScore} label="Safety" color="#C4A87A" />
          </div>
        </div>

        {/* Financial */}
        <div>
          <h2 className="font-bold text-lg dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-black dark:text-brand-lime" /> Investment Fundamentals
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Est. ROI', value: report.roiEstimate },
              { label: 'Rental Yield', value: report.rentalYield },
              { label: 'Cap Rate', value: report.capRate },
              { label: '3-Year Growth', value: report.growthProjection },
            ].map(item => (
              <div key={item.label} className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4 border border-black/5 dark:border-white/5">
                <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-1">{item.label}</p>
                <p className="font-display text-lg font-bold text-black dark:text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lifestyle data */}
        <div>
          <h2 className="font-bold text-lg dark:text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-black dark:text-brand-lime" /> Soft Data — Lifestyle Metrics
          </h2>
          <div className="space-y-3">
            {[
              { icon: <Wind className="w-4 h-4" />, label: 'Air Quality', value: report.airScore },
              { icon: <Shield className="w-4 h-4" />, label: 'Crime Index', value: report.crimeIndex },
              { icon: <Wifi className="w-4 h-4" />, label: 'Connectivity', value: property.wifi_speed },
              { icon: <Star className="w-4 h-4" />, label: 'Walk Score', value: `${report.walkScore} / 100` },
              { icon: <MapPin className="w-4 h-4" />, label: 'Schools Nearby', value: report.schools },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-black/5 dark:border-white/5 last:border-0">
                <div className="flex items-center gap-3 text-zinc-500">
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <span className="text-sm font-bold text-black dark:text-white text-right max-w-[55%]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights & Risks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-green-600" /> Highlights
            </p>
            <ul className="space-y-2">
              {report.highlights.map(h => (
                <li key={h} className="text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5 flex-shrink-0">+</span>{h}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Risks
            </p>
            <ul className="space-y-2">
              {report.risks.map(r => (
                <li key={r} className="text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                  <span className="text-amber-500 font-bold mt-0.5 flex-shrink-0">—</span>{r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verdict */}
        <div className="bg-black dark:bg-white rounded-2xl p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40 dark:text-black/40 mb-2">habitat.s Verdict</p>
          <p className="text-white dark:text-black text-sm leading-relaxed">{report.verdict}</p>
        </div>

        {/* Feature teasers */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Explore deeper</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'investment-analysis', label: 'Full Investment Analysis', icon: '📊' },
              { key: 'green-bonds', label: 'Green Bond Financing', icon: '🌿' },
              { key: 'relocation', label: 'Relocation Ecosystem', icon: '✈️' },
              { key: 'wallet-connect', label: 'Crypto / RWA Tokens', icon: '🔗' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setTeaser(f.key)}
                className="flex items-center gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all text-left group"
              >
                <span className="text-xl flex-shrink-0">{f.icon}</span>
                <div>
                  <p className="text-xs font-bold text-black dark:text-white leading-tight">{f.label}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">Coming soon →</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Agent portal CTA */}
        <div className="border border-black/10 dark:border-white/10 rounded-2xl p-5 flex items-start gap-4">
          <span className="text-2xl flex-shrink-0">🏢</span>
          <div className="flex-1">
            <p className="font-bold text-sm text-black dark:text-white mb-1">Are you an estate agent?</p>
            <p className="text-xs text-zinc-500 mb-3">Get bulk report access and a branded client portal. Turn your listings into investment intelligence.</p>
            <button
              onClick={() => setTeaser('agent-portal')}
              className="text-xs font-bold text-black dark:text-white underline underline-offset-2"
            >
              Learn about the Agent Portal →
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-zinc-300 dark:text-zinc-600 pb-4">
          © 2026 habitat.s — TerraVerta Habitats · Report generated for demo purposes
        </p>
      </div>

      {/* Feature Teaser Modal */}
      {teaser && FEATURES[teaser] && (
        <FeatureTeaser feature={FEATURES[teaser]} onClose={() => setTeaser(null)} />
      )}
    </div>
  );
}
