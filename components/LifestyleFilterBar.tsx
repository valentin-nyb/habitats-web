'use client';

import { useState } from 'react';

const FILTERS = [
  { label: 'All', value: '' },
  { label: '🏄 Surf', value: 'surf' },
  { label: '🧘 Yoga', value: 'yoga' },
  { label: '💻 Co-Work', value: 'co-work' },
  { label: '🌿 Eco', value: 'nature' },
  { label: '📈 Investment', value: 'investment' },
  { label: '🏙️ Urban', value: 'urban' },
  { label: '🍷 Farm', value: 'farm' },
];

interface LifestyleFilterBarProps {
  onFilter: (tag: string) => void;
}

export function LifestyleFilterBar({ onFilter }: LifestyleFilterBarProps) {
  const [active, setActive] = useState('');

  function handleClick(value: string) {
    setActive(value);
    onFilter(value);
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => handleClick(f.value)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
            active === f.value
              ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-md'
              : 'border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
