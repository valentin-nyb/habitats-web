'use client';

import { useEffect, useRef, useState } from 'react';

const PHRASES = [
  'Lifestyle Search.',
  'We index data that matters.',
  'Find Your Life, Not Just a House.',
];

export function TypingEffect() {
  const [displayed, setDisplayed] = useState('');
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    function tick() {
      const current = PHRASES[phraseIndex.current];
      if (isDeleting.current) {
        setDisplayed(current.substring(0, charIndex.current - 1));
        charIndex.current--;
      } else {
        setDisplayed(current.substring(0, charIndex.current + 1));
        charIndex.current++;
      }

      let delay = isDeleting.current ? 60 : 100;

      if (!isDeleting.current && charIndex.current === current.length) {
        delay = 2200;
        isDeleting.current = true;
      } else if (isDeleting.current && charIndex.current === 0) {
        isDeleting.current = false;
        phraseIndex.current = (phraseIndex.current + 1) % PHRASES.length;
        delay = 500;
      }

      return setTimeout(tick, delay);
    }

    const timeout = setTimeout(tick, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span>
      <span className="bg-gradient-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
        {displayed}
      </span>
      <span className="inline-block w-[3px] h-[0.9em] bg-black dark:bg-white ml-1 align-middle animate-[blink_1s_step-end_infinite]" />
    </span>
  );
}
