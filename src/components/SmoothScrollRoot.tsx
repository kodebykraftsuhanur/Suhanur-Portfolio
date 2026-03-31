/**
 * Smooth page scroll (Lenis) on large viewports only — avoids touch/RAF overhead on phones.
 * Skipped when the user prefers reduced motion.
 * Lenis is loaded dynamically so mobile never downloads it.
 */

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type LenisInstance = InstanceType<typeof import("lenis").default>;

const LenisContext = createContext<LenisInstance | null>(null);

const LENIS_MIN_WIDTH = "(min-width: 1024px)";

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollRoot({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<LenisInstance | null>(null);
  const instanceRef = useRef<LenisInstance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const mq = window.matchMedia(LENIS_MIN_WIDTH);
    if (!mq.matches) {
      return;
    }

    let cancelled = false;
    instanceRef.current = null;

    void (async () => {
      const [{ default: Lenis }] = await Promise.all([
        import("lenis"),
        import("lenis/dist/lenis.css"),
      ]);
      if (cancelled) return;

      const instance = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        syncTouch: true,
        lerp: 0.052,
        syncTouchLerp: 0.055,
        wheelMultiplier: 0.88,
        touchMultiplier: 0.92,
        touchInertiaExponent: 1.82,
        anchors: true,
        stopInertiaOnNavigate: true,
      });

      if (cancelled) {
        instance.destroy();
        return;
      }

      instanceRef.current = instance;
      setLenis(instance);
    })();

    return () => {
      cancelled = true;
      instanceRef.current?.destroy();
      instanceRef.current = null;
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
