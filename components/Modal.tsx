'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { saveWaitlistEntry } from '@/lib/supabase';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ isOpen, onClose }: ModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await saveWaitlistEntry({
        first_name: data.get('firstName') as string,
        last_name: data.get('lastName') as string,
        email: data.get('email') as string,
        role: data.get('role') as string,
      });
    } catch (_) {
      // fail silently — show success either way for demo
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => setSubmitted(false), 400);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 w-full max-w-md p-8 rounded-3xl relative shadow-2xl border border-black/5 dark:border-white/10 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {!submitted ? (
          <>
            <div className="text-center mb-8">
              <h3 className="font-display text-2xl font-bold text-black dark:text-white mb-2">
                Request Access
              </h3>
              <p className="text-sm text-zinc-500">Join the revolution.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="firstName"
                  required
                  type="text"
                  placeholder="First Name"
                  className="w-full bg-zinc-50 dark:bg-black border border-black/5 dark:border-white/5 rounded-xl px-4 py-3 text-black dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand-lime"
                />
                <input
                  name="lastName"
                  required
                  type="text"
                  placeholder="Last Name"
                  className="w-full bg-zinc-50 dark:bg-black border border-black/5 dark:border-white/5 rounded-xl px-4 py-3 text-black dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>

              <input
                name="email"
                required
                type="email"
                placeholder="Work Email"
                className="w-full bg-zinc-50 dark:bg-black border border-black/5 dark:border-white/5 rounded-xl px-4 py-3 text-black dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand-lime"
              />

              <select
                name="role"
                required
                defaultValue=""
                className="w-full bg-zinc-50 dark:bg-black border border-black/5 dark:border-white/5 rounded-xl px-4 py-3 text-black dark:text-white text-sm outline-none focus:ring-2 focus:ring-brand-lime"
              >
                <option value="" disabled>Role</option>
                <option value="Investor">Investor</option>
                <option value="Agent">Agent</option>
                <option value="User">Explorer / User</option>
                <option value="Other">Other</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-wider py-4 rounded-xl mt-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Submit Request'}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-4">
            <div className="w-20 h-20 bg-black dark:bg-white rounded-full flex items-center justify-center mb-6 animate-scale-in">
              <Check className="w-10 h-10 text-white dark:text-black" />
            </div>
            <h3 className="font-display text-2xl font-bold text-black dark:text-white mb-2">
              You&apos;re on the list.
            </h3>
            <p className="text-zinc-500 text-sm mb-8">We&apos;ll be in touch shortly.</p>
            <button
              onClick={handleClose}
              className="w-full border border-black/10 dark:border-white/10 text-black dark:text-white px-8 py-3 rounded-xl font-bold text-xs uppercase hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
