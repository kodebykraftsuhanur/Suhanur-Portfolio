import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ensureCalEmbedBootstrap } from "../lib/calEmbedBootstrap";

const CAL_ORIGIN = "https://app.cal.com";
const CAL_NAMESPACE = "30min";
const CAL_LINK = "suhanur-rahman/30min";

export type BookingCalendarProps = {
  /** Optional section id (e.g. `contact` for `/#contact` navigation). */
  anchorId?: string;
  /** Section heading (default matches home `#contact` block). */
  title?: string;
  /** Unique id for the heading (accessibility); required if multiple instances could appear. */
  headingId?: string;
};

let calInitOnce = false;

function whenCalNamespaceReady(cb: () => void, attempt = 0): void {
  const w = window as unknown as {
    Cal?: { ns?: Record<string, (...args: unknown[]) => void> };
  };
  const api = w.Cal?.ns?.[CAL_NAMESPACE];
  if (typeof api === "function") {
    cb();
    return;
  }
  if (attempt > 200) return;
  window.setTimeout(() => whenCalNamespaceReady(cb, attempt + 1), 48);
}

function hashToId(hash: string): string {
  return decodeURIComponent(hash.replace(/^#/, ""));
}

/**
 * Cal.com inline embed (dark theme). Loads the official bootstrap once, then inlines into `containerRef`.
 */
const DEFAULT_TITLE = "Make It Happen";
const DEFAULT_HEADING_ID = "booking-calendar-heading";

export default function BookingCalendar({
  anchorId,
  title = DEFAULT_TITLE,
  headingId = DEFAULT_HEADING_ID,
}: BookingCalendarProps) {
  const { hash: routeHash } = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  /** Defer third-party work until near viewport (or hash / no anchor) to cut main-thread blocking time. */
  const [loadCal, setLoadCal] = useState(() => {
    if (typeof window === "undefined") return false;
    if (anchorId == null || anchorId === "") return true;
    return hashToId(window.location.hash) === anchorId;
  });

  useEffect(() => {
    if (!anchorId) return undefined;
    if (hashToId(routeHash) === anchorId) {
      setLoadCal(true);
    }
    return undefined;
  }, [routeHash, anchorId]);

  useEffect(() => {
    if (!anchorId || loadCal) return undefined;
    const onHashChange = (): void => {
      if (hashToId(window.location.hash) === anchorId) setLoadCal(true);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [anchorId, loadCal]);

  useEffect(() => {
    if (loadCal) return undefined;
    if (anchorId == null || anchorId === "") {
      setLoadCal(true);
      return undefined;
    }
    if (hashToId(window.location.hash) === anchorId) {
      setLoadCal(true);
      return undefined;
    }
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setLoadCal(true);
      },
      { root: null, rootMargin: "520px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [anchorId, loadCal]);

  useLayoutEffect(() => {
    if (!loadCal) return undefined;
    const el = containerRef.current;
    if (!el) return undefined;

    ensureCalEmbedBootstrap();

    const w = window as unknown as {
      Cal?: (...args: unknown[]) => void;
    };
    const Cal = w.Cal;
    if (!Cal) return undefined;

    if (!calInitOnce) {
      Cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
      calInitOnce = true;
    }

    let cancelled = false;
    let fadeTimer = 0;

    whenCalNamespaceReady(() => {
      if (cancelled || !containerRef.current) return;
      const win = window as unknown as {
        Cal: { ns: Record<string, (...args: unknown[]) => void> };
      };
      try {
        const api = win.Cal.ns[CAL_NAMESPACE];
        api("inline", {
          elementOrSelector: containerRef.current,
          config: {
            layout: "month_view",
            useSlotsViewOnSmallScreen: "true",
            theme: "dark",
          },
          calLink: CAL_LINK,
        });
        api("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
        fadeTimer = window.setTimeout(() => {
          if (!cancelled) setReady(true);
        }, 450);
      } catch (e) {
        console.error("[BookingCalendar] Cal inline failed", e);
        if (!cancelled) setReady(true);
      }
    });

    return () => {
      cancelled = true;
      if (fadeTimer) window.clearTimeout(fadeTimer);
      el.replaceChildren();
    };
  }, [loadCal]);

  useLayoutEffect(() => {
    if (!ready) return undefined;
    const root = containerRef.current;
    if (!root) return undefined;

    let raf = 0;
    const patchIframes = (): void => {
      if (raf !== 0) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        root.querySelectorAll("iframe").forEach((iframe) => {
          iframe.setAttribute("scrolling", "no");
          iframe.style.overflow = "hidden";
        });
      });
    };

    patchIframes();
    const obs = new MutationObserver(patchIframes);
    obs.observe(root, { childList: true, subtree: true });
    return () => {
      obs.disconnect();
      if (raf !== 0) cancelAnimationFrame(raf);
    };
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      id={anchorId}
      className="w-full bg-cream py-16 sm:py-[90px]"
      aria-labelledby={headingId}
    >
      <div className="mx-auto box-border w-full max-w-[1440px] px-5 sm:px-8 lg:px-[100px]">
        <div className="mx-auto w-full max-w-[1240px]">
          <h2
            id={headingId}
            className="mb-20 text-center text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.08] text-ink"
          >
            {title}
          </h2>

          <div className="relative w-full min-w-0 min-h-[min(28rem,55dvh)] overflow-x-clip lg:min-h-[520px]">
            {!ready ? (
              <div
                className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-cream/90"
                aria-live="polite"
              >
                <p className="font-sans text-[15px] text-ink/55">Loading calendar…</p>
              </div>
            ) : null}

            <div
              ref={containerRef}
              id="my-cal-inline-30min"
              className={`booking-cal-root w-full max-w-full min-h-0 h-fit overflow-x-clip overflow-y-visible transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                ready ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
