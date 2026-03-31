/** My Services — matches Figma frame (node 633:547), responsive all breakpoints. */

import { useId, useState } from "react";
import { SITE_IMAGES } from "../assets/siteImages";
// Horizontal rule between services (Figma asset) — uncomment `imgLine5`, `RowDivider`, and `{i < n - 1 && <RowDivider />}` to restore.
// const imgLine5 = "https://www.figma.com/api/mcp/asset/39bc98dc-81d1-42f6-98b9-215f711c1a79";

type ServiceItem = { number: string; title: string; lines: string[] };

const SERVICES_LEFT: ServiceItem[] = [
  {
    number: "01",
    title: "Product Design",
    lines: ["Mobile App Design", "Web App Design", "Dashboard Design"],
  },
  {
    number: "02",
    title: "Website Design",
    lines: ["Business Website", "Portfolio Website", "E-commerce Website UI"],
  },
  {
    number: "03",
    title: "Design System",
    lines: ["UI Kit", "Component system", "Design guidelines"],
  },
];

const SERVICES_RIGHT: ServiceItem[] = [
  {
    number: "04",
    title: "Wireframing & Prototyping",
    lines: ["Low-fidelity wireframe", "High-fidelity prototype", "Interactive prototype"],
  },
  {
    number: "05",
    title: "UX Research & Strategy",
    lines: ["User Research", "Competitor Analysis", "User Persona"],
  },
  {
    number: "06",
    title: "Usability Testing",
    lines: ["User testing", "Feedback analysis", "UX improvement suggestions"],
  },
];

function PlusIcon({ className }: { className?: string }) {
  return (
    <div className={className ?? "relative size-7 shrink-0 sm:size-8"}>
      <div className="absolute inset-[16.67%]">
        <div className="absolute inset-[-4.69%]">
          <img alt="" className="block size-full max-w-none" src={SITE_IMAGES.servicesPlus} decoding="async" />
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ number, title, lines }: ServiceItem) {
  const linesId = useId();
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Mobile 1-col: comfortable size. md–lg 2-col: capped size so long titles stay one line. xl+ → Figma 32px.
  const headingClass =
    "font-sans font-bold text-ink " +
    "text-[clamp(1.0625rem,2.1vw+0.55rem,1.375rem)] leading-snug tracking-[0.5px] " +
    "sm:text-[clamp(1.0625rem,1.85vw+0.55rem,1.5rem)] sm:leading-tight sm:tracking-[0.56px] " +
    "md:text-[18px] md:leading-[1.2] md:tracking-[0.4px] lg:leading-[1.25] lg:tracking-[0.48px] " +
    "xl:text-[22px] xl:leading-8 xl:tracking-[0.56px] " +
    "2xl:text-[32px] 2xl:leading-10 2xl:tracking-[0.64px]";

  const toggleDetails = () => setDetailsOpen((v) => !v);

  return (
    <div className="flex w-full min-w-0 items-start gap-3 text-left sm:gap-4 md:gap-6">
      <button
        type="button"
        tabIndex={-1}
        className={`w-[1.75rem] shrink-0 cursor-pointer tabular-nums sm:w-8 md:w-[1.85rem] lg:w-8 ${headingClass} bg-transparent p-0 text-left`}
        onClick={toggleDetails}
        aria-label={`${number}, ${title}`}
      >
        {number}
      </button>
      <div className="flex min-w-0 flex-1 flex-col gap-0">
        <div
          role="button"
          tabIndex={0}
          className="flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-sm outline-none touch-manipulation hover:opacity-90 sm:gap-3 focus-visible:ring-2 focus-visible:ring-ink/25"
          onClick={toggleDetails}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleDetails();
            }
          }}
          aria-expanded={detailsOpen}
          aria-controls={linesId}
          aria-label={`${number}. ${title}, ${detailsOpen ? "collapse" : "expand"} service details`}
        >
          <span className={`min-w-0 flex-1 pr-1 ${headingClass}`}>{title}</span>
          <span
            className="-m-2 flex size-11 shrink-0 items-center justify-center text-ink sm:-m-1 sm:size-10 md:size-9"
            aria-hidden
          >
            <PlusIcon className="relative size-6 shrink-0 sm:size-7 md:size-8" />
          </span>
        </div>
        <div
          className={
            "grid min-h-0 transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none " +
            (detailsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
          }
        >
          <div className="min-h-0 overflow-hidden">
            <ul
              id={linesId}
              className="flex w-full min-w-0 flex-col gap-3 pt-5 sm:pt-6 sm:gap-3.5 md:gap-4 md:pt-8 lg:pt-10"
              aria-hidden={!detailsOpen}
            >
              {lines.map((line) => (
                <li
                  key={line}
                  className="font-sans font-normal text-ink break-words text-[16px] leading-snug sm:leading-relaxed lg:text-[20px] lg:leading-7"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceColumn({ items }: { items: ServiceItem[] }) {
  const n = items.length;
  return (
    <div className="flex min-w-0 w-full flex-col">
      {items.map((item, i) => (
        <div key={`${item.number}-${item.title}`} className="min-w-0 w-full">
          {i > 0 ? (
            <div className="h-px w-full shrink-0 bg-ink/20" aria-hidden />
          ) : null}
          <div
            className={
              (i > 0 ? "pt-4 md:pt-10 " : "") + (i < n - 1 ? "pb-4 md:pb-10" : "")
            }
          >
            <ServiceCard {...item} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MyServicesSection() {
  return (
    <section className="w-full bg-cream py-12 sm:py-14 md:py-16 lg:py-[90px]">
      <div className="mx-auto box-border w-full max-w-[1440px] px-5 sm:px-8 lg:px-[100px]">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center gap-8 sm:gap-12 md:gap-16 lg:gap-[80px]">
        <h2 className="w-full text-balance px-1 text-center font-serif font-extrabold leading-[1.05] text-ink sm:leading-none sm:tracking-tight md:tracking-normal">
          <span className="block text-[clamp(1.75rem,calc(5.5vw+0.75rem),6rem)] lg:text-[96px]">What I can do </span>
          <span className="block text-[clamp(1.75rem,calc(5.5vw+0.75rem),6rem)] lg:text-[96px]">for you</span>
        </h2>

        <div
          className={
            "grid w-full min-w-0 grid-cols-1 justify-items-stretch " +
            "gap-x-0 gap-y-8 sm:gap-y-9 " +
            "md:grid-cols-2 md:gap-x-[clamp(1rem,3vw,1.5rem)] md:gap-y-10 " +
            "lg:gap-x-[60px] lg:gap-y-10"
          }
        >
          <ServiceColumn items={SERVICES_LEFT} />
          <ServiceColumn items={SERVICES_RIGHT} />
        </div>
        </div>
      </div>
    </section>
  );
}
