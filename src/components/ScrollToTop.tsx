/**
 * Reset scroll on route change so new pages start at the hero (top).
 * Lenis keeps its own scroll state; without this, SPA navigations land mid-page.
 * Hash links (#contact) still scroll to the target when present.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "./SmoothScrollRoot";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  /**
   * Defer scroll/layout reads to a new frame (then the next) so work does not run in the same turn as React commit
   * (reduces forced reflow / long tasks during hydration). Mobile path is unchanged — still native scroll when Lenis is off.
   */
  useEffect(() => {
    let cancelled = false;
    let r0 = 0;
    let r1 = 0;

    const applyScroll = (): void => {
      if (cancelled) return;
      const id = hash && hash.length > 1 ? decodeURIComponent(hash.slice(1)) : "";
      const el = id ? document.getElementById(id) : null;

      if (el) {
        if (lenis) {
          lenis.scrollTo(el, { immediate: true });
        } else {
          el.scrollIntoView({ block: "start", behavior: "auto" });
        }
        return;
      }

      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    };

    r0 = requestAnimationFrame(() => {
      r1 = requestAnimationFrame(applyScroll);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(r0);
      cancelAnimationFrame(r1);
    };
  }, [pathname, hash, lenis]);

  return null;
}
