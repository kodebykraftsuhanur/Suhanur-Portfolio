import { useLayoutEffect, useRef, useState } from "react";
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
  if (attempt > 240) return;
  requestAnimationFrame(() => whenCalNamespaceReady(cb, attempt + 1));
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

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
  }, []);

  return (
    <section
      id={anchorId}
      className="w-full bg-cream py-16 sm:py-[90px]"
      aria-labelledby={headingId}
    >
      {/* 1440px shell, 100px horizontal inset @ lg; content band 1240px (matches site sections) */}
      <div className="mx-auto box-border w-full max-w-[1440px] px-5 sm:px-8 lg:px-[100px]">
        <div className="mx-auto w-full max-w-[1240px]">
          <h2
            id={headingId}
            className="mb-20 text-center font-serif text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.08] text-ink"
          >
            {title}
          </h2>

          {/*
            Do not set a large min-height on #my-cal-inline-30min: Cal's <cal-inline> uses height:inherit,
            so a tall box stretches the iframe and leaves empty white space below the dark UI.
          */}
          <div
            className={`relative w-full min-w-0 overflow-x-hidden ${!ready ? "min-h-[min(320px,50vh)]" : ""}`}
          >
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
              className={`booking-cal-root w-full max-w-full min-h-0 h-fit overflow-x-hidden overflow-y-visible transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                ready ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
