/**
 * Reset scroll on route change so new pages start at the hero (top).
 * Lenis keeps its own scroll state; without this, SPA navigations land mid-page.
 * Hash links (#contact) still scroll to the target when present.
 */

import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "./SmoothScrollRoot";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useLayoutEffect(() => {
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
  }, [pathname, hash, lenis]);

  return null;
}
