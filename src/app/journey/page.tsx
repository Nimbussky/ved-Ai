'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

declare global {
  interface Window {
    mountLetsScroll?: (container: HTMLElement, config: unknown) => void;
  }
}

// Scroll-driven cinematic journey (lets-scroll engine, vanilla JS).
// Stills-only mode: posters + copy work now; clips wire in when rendered.
// See lets-scroll-work/brief.md for the asset pipeline.
export default function JourneyPage() {
  const worldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = worldRef.current;
    if (!container) return;
    if (window.mountLetsScroll) {
      mount();
      return;
    }
    if (document.querySelector('script[data-lets-scroll]')) {
      // Script already loading (e.g. back-navigation); mount on load.
      const existing = document.querySelector('script[data-lets-scroll]');
      existing?.addEventListener('load', mount, { once: true });
      return () => existing?.removeEventListener('load', mount);
    }
    const script = document.createElement('script');
    script.src = '/lets-scroll/scrub-engine.js';
    script.async = true;
    script.setAttribute('data-lets-scroll', '1');
    script.onload = () => mount();
    document.body.appendChild(script);
    return () => {
      // Engine has no unmount; clear injected nodes on leave.
      container.replaceChildren();
    };
  }, []);

  function mount() {
    const container = worldRef.current;
    if (!container || !window.mountLetsScroll) return;
    container.replaceChildren();
    window.mountLetsScroll(container, {
      brand: { name: 'VedAI', href: '/' },
      cta: { label: 'Get my chart', href: '/onboarding' },
      hint: 'scroll to fly in',
      diveScroll: 1.6,
      connScroll: 0.9,
      sections: [
        {
          id: 'observatory',
          label: 'The Observatory',
          still: '/lets-scroll/assets/still_observatory.webp',
          stillMobile: '/lets-scroll/assets/still_observatory_portrait.webp',
          clip: null,
          clipMobile: null,
          scroll: 1.6,
          linger: 0.45,
          accent: '#D4A24C',
          eyebrow: 'From birth data',
          title: 'It starts with the sky.',
          body: 'Enter your birth details and ancient math maps the heavens at that exact moment.',
          tags: ['Real astronomy', 'Vedic wisdom'],
        },
        {
          id: 'hero',
          label: 'Your Chart',
          still: '/lets-scroll/assets/still_hero.webp',
          stillMobile: '/lets-scroll/assets/still_hero_portrait.webp',
          clip: null,
          clipMobile: null,
          scroll: 1.8,
          linger: 0.5,
          accent: '#3B5BDB',
          eyebrow: 'To cosmic clarity',
          title: 'Your chart, alive.',
          body: 'Sixteen AI guides read your dashas, transits and yogas — free, forever.',
          tags: ['16 AI providers', 'Free forever'],
          cta: {
            primary: { label: 'Get my chart', href: '/onboarding' },
            secondary: { label: 'Chat now', href: '/chat' },
          },
        },
      ],
      connectors: [],
      connectorsMobile: [],
    });
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F7F7F5]">
      <header className="border-b border-[#F7F7F5]/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-semibold text-[#D4A24C]">
            VedAI
          </Link>
          <nav className="flex items-center gap-6 text-sm text-[#F7F7F5]/60">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/onboarding" className="hover:text-white transition-colors">
              Get my chart
            </Link>
          </nav>
        </div>
      </header>
      <div ref={worldRef} id="world" />
    </div>
  );
}
