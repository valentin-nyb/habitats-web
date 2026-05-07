'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { Modal } from './Modal';
import { useState } from 'react';
import clsx from 'clsx';

export function Navbar() {
  const pathname = usePathname();
  const isExplorePage = pathname?.startsWith('/explore');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <nav
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 border-b border-black/5 dark:border-white/5',
          'bg-white/90 dark:bg-black/90 backdrop-blur-xl transition-colors duration-300',
          'h-16 md:h-20'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl md:text-2xl font-bold tracking-tight transition-opacity hover:opacity-80"
          >
            habitat<span className="text-black dark:text-brand-lime">.s</span>
          </Link>

          {/* Nav Links — home page only */}
          {!isExplorePage && (
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <a href="#vision" className="hover:text-black dark:hover:text-white transition-colors">Vision</a>
              <a href="#dashboard" className="hover:text-black dark:hover:text-white transition-colors">Platform</a>
              <a href="#market" className="hover:text-black dark:hover:text-white transition-colors">Market</a>
              <a href="#revenue" className="hover:text-black dark:hover:text-white transition-colors">Business</a>
            </div>
          )}

          {/* Explore search bar */}
          {isExplorePage && (
            <div className="hidden md:flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-full px-4 py-2 w-80 lg:w-96">
              <svg className="w-4 h-4 text-zinc-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                id="navbar-search"
                type="text"
                placeholder="Search lifestyle, city, or vibe..."
                className="bg-transparent border-none outline-none w-full text-sm dark:text-white placeholder-zinc-400"
              />
            </div>
          )}

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {!isExplorePage && (
              <button
                onClick={() => setModalOpen(true)}
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg hover:opacity-80 transition-opacity"
              >
                Pitch Access
              </button>
            )}
            {!isExplorePage && (
              <Link
                href="/explore"
                className="hidden md:block border border-black/10 dark:border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Explore
              </Link>
            )}
          </div>
        </div>
      </nav>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
