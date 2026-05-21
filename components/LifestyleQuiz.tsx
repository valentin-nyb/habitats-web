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
    question: 'Tell us about yourself',
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