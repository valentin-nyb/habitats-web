import Link from 'next/link';
import { TypingEffect } from '@/components/TypingEffect';
import { Modal } from '@/components/Modal';
import { ArrowRight, Layers, Globe, Sprout } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="relative z-10 pt-20">
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        id="vision"
        className="min-h-screen flex flex-col justify-center items-center px-6 text-center animate-enter-up"
      >
        <div className="max-w-5xl mx-auto -mt-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 text-[11px] font-bold tracking-widest uppercase mb-8 animate-float">
            <span className="w-2 h-2 rounded-full bg-black dark:bg-brand-lime" />
            The Search Engine for Life
          </div>

          {/* Typing Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            <TypingEffect />
          </h1>

          <p className="text-lg text-zinc-500 max-w-2xl mx-auto mb-12 font-light">
            Zillow and Rightmove are dinosaurs.
            <br />
            <br />
            <span className="text-black dark:text-white font-medium">
              We index the &ldquo;Soft Data&rdquo; — helping Nomads, Families, and Retirees find
              their Lifestyle, not just their House.
            </span>
          </p>

          {/* Search Bar CTA */}
          <div className="max-w-3xl mx-auto bg-white dark:bg-[#0F0F11] border border-black/5 dark:border-white/10 rounded-3xl p-1.5 md:p-2 shadow-2xl hover:scale-[1.01] transition-transform duration-500">
            <div className="flex items-center gap-3 px-3 py-3 md:px-4 md:py-4">
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for 'Yoga', 'Co-Work near me', or 'London'..."
                className="w-full bg-transparent border-none outline-none text-black dark:text-white placeholder-zinc-400 text-sm md:text-lg font-light tracking-wide truncate"
              />
              <Link
                href="/search"
                className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-black dark:bg-brand-lime rounded-xl flex items-center justify-center hover:scale-105 transition-transform text-white dark:text-black"
              >
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE DASHBOARD PREVIEW ────────────────────────────── */}
      <section id="dashboard" className="max-w-5xl mx-auto px-6 mb-24 pt-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
            The Lifestyle Dashboard
          </h2>
          <p className="text-zinc-500 text-lg">Visualizing the invisible data that drives decisions.</p>
        </div>

        <div className="bg-white dark:bg-[#0F0F11] rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-black/5 dark:border-white/10 relative overflow-hidden">
          <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-full text-sm font-bold text-zinc-600 dark:text-zinc-300 w-fit mb-8">
            📍 Lisbon, PT
          </div>

          <div className="relative bg-zinc-50 dark:bg-white/5 rounded-3xl p-4 md:p-6 border border-zinc-100 dark:border-white/5">
            {/* Floating Badge */}
            <div className="absolute top-6 left-6 z-20 bg-white dark:bg-[#1A1A1A] px-3 py-2 rounded-xl shadow-xl flex items-center gap-3 animate-float">
              <div className="w-8 h-8 bg-brand-lime/20 rounded-full flex items-center justify-center text-brand-lime">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] uppercase text-zinc-400 font-bold tracking-wider leading-none mb-0.5">Connectivity</p>
                <p className="text-sm font-bold text-black dark:text-white leading-none">1 Gbps</p>
              </div>
            </div>

            {/* Property Image */}
            <div className="relative h-80 md:h-96 w-full rounded-2xl overflow-hidden mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/16585159/pexels-photo-16585159.jpeg"
                alt="Lisbon Creative Hub"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Property Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end px-2 pb-4 mb-4 gap-4">
              <div>
                <h3 className="text-3xl font-bold font-display text-black dark:text-white mb-1">
                  Lisbon Creative Hub
                </h3>
                <p className="text-zinc-500">Lisbon, Portugal</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#65a30d] dark:text-brand-lime">
                  $1,250<span className="text-sm text-zinc-400 font-normal">/mo</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/5 dark:border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider mb-1">Wellness</p>
                <p className="text-sm font-bold text-black dark:text-white">Crossfit &amp; Spa Access</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider mb-1">Tech Stack</p>
                <p className="text-sm font-bold text-black dark:text-white">10G Fiber + Apple Home</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider mb-1">Air Quality</p>
                <p className="text-sm font-bold text-black dark:text-white">Moderate (60 AQI)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY NOW ─────────────────────────────────────────────────── */}
      <section id="market" className="max-w-7xl mx-auto px-6 mb-24">
        <div className="mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Why Now?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Layers className="w-8 h-8 mb-4" />,
              title: 'Global Arbitrage',
              description:
                'Living overseas is cheaper. We help users leverage tax incentives, lower costs, and English schools.',
              accent: 'border-l-black dark:border-l-brand-lime',
            },
            {
              icon: <Globe className="w-8 h-8 mb-4" />,
              title: 'Lifelong Living',
              description:
                'Not just for youth. From single nomads looking for a share, to families seeking a farm, to retirees.',
              accent: 'border-l-zinc-300 dark:border-l-white',
            },
            {
              icon: <Sprout className="w-8 h-8 mb-4" />,
              title: 'Regenerative Living',
              description:
                'Sustainability is the baseline. We pivot to homes that heal you and the planet (Wellness & Eco).',
              accent: 'border-l-black dark:border-l-brand-lime',
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`bg-white dark:bg-[#0F0F11] border border-black/5 dark:border-white/10 rounded-2xl p-8 border-l-4 ${card.accent} hover:scale-105 transition-transform`}
            >
              {card.icon}
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-sm text-zinc-500">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── REVENUE ECOSYSTEM ───────────────────────────────────────── */}
      <section
        id="revenue"
        className="max-w-7xl mx-auto px-6 mb-24 pt-12 border-t border-black/5 dark:border-white/5"
      >
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Revenue Ecosystem</h2>
          <p className="text-zinc-500">5 Key Streams for Sustainable Growth.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: 'Agents', tag: 'Listing Packages' },
            { name: 'Users', tag: 'Premium Reports' },
            { name: 'Marketplace', tag: 'Ad Revenue' },
            { name: 'Institutional', tag: 'RWA & Crypto' },
            { name: 'Education', tag: 'Migration & Tax Courses' },
          ].map((stream) => (
            <div
              key={stream.name}
              className="bg-white dark:bg-[#0F0F11] border border-black/5 dark:border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition-transform"
            >
              <h3 className="font-bold text-lg mb-1">{stream.name}</h3>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{stream.tag}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER CTA ──────────────────────────────────────────────── */}
      <footer className="border-t border-black/5 dark:border-white/5 pt-20 pb-24 px-6 text-center bg-white dark:bg-black">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
          We aren&apos;t just selling a property app.
        </h2>
        <div className="flex justify-center mb-24">
          <Link
            href="/explore"
            className="bg-black text-white dark:bg-white dark:text-black px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300 shadow-xl"
          >
            Explore the Platform
          </Link>
        </div>
        <div className="max-w-7xl mx-auto border-t border-black/10 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-400 font-mono uppercase tracking-wider">
          <p>© 2026 habitat.s — TerraVerta Habitats</p>
          <p className="mt-2 md:mt-0">The Search Engine for Life</p>
        </div>
      </footer>
    </main>
  );
}
