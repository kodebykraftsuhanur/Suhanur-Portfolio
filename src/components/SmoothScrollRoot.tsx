/**
 * Smooth page scroll only (Lenis). No section/element animations.
 * Skipped when the user prefers reduced motion.
 * Exposes `useLenis()` so `ScrollToTop` can reset scroll on React Router navigations.
 */

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import "lenis/dist/lenis.css";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollRoot({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const instance = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      syncTouch: true,
      // Lower lerp = softer follow, longer glide (smoother feel)
      lerp: 0.052,
      syncTouchLerp: 0.055,
      wheelMultiplier: 0.88,
      touchMultiplier: 0.92,
      touchInertiaExponent: 1.82,
      anchors: true,
      stopInertiaOnNavigate: true,
    });

    setLenis(instance);

    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
