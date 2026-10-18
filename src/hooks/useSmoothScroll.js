'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';

// Shared "heavier" scroll feel used across the site — lower wheelMultiplier
// so each wheel notch travels less, longer duration + lower lerp so it
// settles with momentum instead of snapping to a stop. Keep in sync with the
// window-scroll Lenis config in ScrollStack.jsx (the homepage's Spotlight
// section sets up its own instance rather than using this hook, since it
// also needs to listen for per-frame scroll events to drive the pin-stack).
export const HEAVY_SCROLL_CONFIG = {
  duration: 1.8,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.7,
  touchMultiplier: 1.5,
  lerp: 0.08
};

export default function useSmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis(HEAVY_SCROLL_CONFIG);
    // Each route creates its own Lenis instance. Reset both Lenis and the
    // native viewport when the new page mounts so an outgoing instance
    // cannot carry its previous scroll position into this page.
    lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    let rafId;
    const raf = time => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [pathname]);
}
