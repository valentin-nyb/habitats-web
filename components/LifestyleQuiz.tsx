'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, User, Briefcase, Home, Sunset } from 'lucide-react';
import clsx from 'clsx';

export interface QuizResult {
  userType: string;
  priorities: string[];
  location: string;
  budget: string;
}

interface LifestyleQuizProps {
  onComplete: (result: QuizResult) => void;
}

const STEPS = [
  {
    id: 'userType',
    question: 'Who are you?',
    subtitle: 'We\'ll tailor your results around your lifestyle.',
    options: [
      { value: 'nomad', label: 'Digital Nomad', icon: '💻', desc: 'Remote worker, need great wifi and co-work access' },
      { value: 'family', label: 'Family', icon: '🏡', desc: 'Looking for safety, schools, and space' },
      { value: 'investor', label: 'Investor', icon: '📈', desc: 'ROI-focused, capital growth and rental yield' },
      { value: 'retiree', label: 'Retiree / Relocator', icon: '🌿', desc: 'Wellness, peace, and quality of life' },
    ],
  },
  {
    id: 'priorities',
    question: 'What matters most to you?',
    subtitle: 'Select up to 3 priorities.',
    multi: true,
    options: [
      { value: 'wellness', label: 'Wellness & Health', icon: '🧘', desc: 'Yoga, gyms, clean air, nature access' },
      { value: 'investment', label: 'Investment Returns', icon: '💰', desc: 'Capital growth, rental yield, ROI' },
      { value: 'co-work', label: 'Remote Work Setup', icon: '⚡', desc: 'Fast internet, co-working, productivity' },
      { value: 'nature', label: 'Nature & Outdoors', icon: '🌲', desc: 'Hiking, beaches, open space' },
      { value: 'surf', label: 'Beach & Surf', icon: '🏄', desc: 'Coastal living, ocean access' },
      { value: 'urban', label: 'City & Culture', icon: '🏙️', desc: 'Restaurants, arts, nightlife' },
    ],
  },
  {
    id: 'location',
    question: 'Where in South Africa?',
    subtitle: 'We\'ll focus your search here.',
    options: [
      { value: 'Cape Town', label: 'Cape Town', icon: '🏔️', desc: 'Atlantic Seaboard, Winelands, CBD' },
      { value: 'Johannesburg', label: 'Johannesburg', icon: '🏢', desc: 'Sandton, Rosebank, financial hub' },
      { value: 'Garden Route', label: 'Garden Route', icon: '🌿', desc: 'Knysna, Plettenberg Bay, George' },
      { value: 'KwaZulu-Natal', label: 'KwaZulu-Natal', icon: '🌊', desc: 'Ballito, Umhlanga, Durban coast' },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your monthly budget?',
    subtitle: 'All prices in South African Rand.',
    options: [
      { value: 'under-20k', label: 'Under R20,000', icon: '🟢', desc: 'Great value options available' },
      { value: '20-40k', label: 'R20,000 – R40,000', icon: '🔵', desc: 'Mid-range lifestyle properties' },
      { value: '40-70k', label: 'R40,000 – R70,000', icon: '🟣', desc: 'Premium and luxury options' },
      { value: 'any', label: 'No limit', icon: '⭐', desc: 'Show me everything' },
    ],
  },
];

export function LifestyleQuiz({ onComplete }: LifestyleQuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const current = STEPS[step];
  const isMulti = current.multi;
  const selected = answers[current.id];
  const selectedArr = Array.isArray(selected) ? selected : selected ? [selected] : [];

  function toggle(value: string) {
    if (isMulti) {
      const arr = Array.isArray(answers[current.id]) ? [...(answers[current.id] as string[])] : [];
      const idx = arr.indexOf(value);
      if (idx > -1) arr.splice(idx, 1);
      else if (arr.length < 3) arr.push(value);
      setAnswers({ ...answers, [current.id]: arr });
    } else {
      setAnswers({ ...answers, [current.id]: value });
    }
  }

  function next() {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      onComplete({
        userType: answers.userType as string,
        priorities: (answers.priorities as string[]) || [],
        location: answers.location as string,
        budget: answers.budget as string,
      });
    }
  }

  const canAdvance = isMulti ? selectedArr.length > 0 : !!answers[current.id];
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-8">
        <div
          className="h-1 bg-black dark:bg-brand-lime rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step counter */}
      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
        Step {step + 1} of {STEPS.length}
      </p>

      {/* Question */}
      <h2 className="font-display text-2xl md:text-3xl font-bold text-black dark:text-white mb-2">
        {current.question}
      </h2>
      <p className="text-zinc-500 text-sm mb-8">{current.subtitle}</p>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {current.options.map((opt) => {
          const isSelected = selectedArr.includes(opt.value);
          return (
            <button
              key={opt.value}
              onClick={() => toggle(opt.value)}
              className={clsx(
                'flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all',
                isSelected
                  ? 'border-black dark:border-brand-lime bg-black dark:bg-brand-lime/10 text-white dark:text-white shadow-lg scale-[1.01]'
                  : 'border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 hover:border-black/30 dark:hover:border-white/30'
              )}
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{opt.icon}</span>
              <div>
                <p className={clsx('font-bold text-sm', isSelected ? 'text-white dark:text-white' : 'text-black dark:text-white')}>
                  {opt.label}
                </p>
                <p className={clsx('text-xs mt-0.5', isSelected ? 'text-white/70 dark:text-white/60' : 'text-zinc-500')}>
                  {opt.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-sm font-bold text-zinc-500 hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <button
          onClick={next}
          disabled={!canAdvance}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {step === STEPS.length - 1 ? 'Show my matches' : 'Next'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
