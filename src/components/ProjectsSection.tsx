/** Projects — Figma "My Project" (node 666:918). Sticky stack on large screens. */

import { Link } from "react-router-dom";
import { SITE_IMAGES } from "../assets/siteImages";
import { PictureImg } from "./PictureImg";

const PROJECTS: { id: string; image: string; title: string; description: string }[] = [
  {
    id: "school-app",
    image: SITE_IMAGES.homeProjectSchool,
    title: "School Management App",
    description:
      "An intuitive platform that streamlines school operations and improves communication between students and parents.",
  },
  {
    id: "school-dash",
    image: SITE_IMAGES.homeProjectDash,
    title: "School Management Dashboard",
    description:
      "Designed to bridge the communication gap between parents and schools through real-time updates and insights.",
  },
  {
    id: "nursery-mechanic",
    image: SITE_IMAGES.homeProjectFixora,
    title: "FIXORA",
    description:
      "A smart platform that connects users with nearby mechanics for quick, reliable, and hassle-free vehicle services.",
  },
  {
    id: "nursery-plant",
    image: SITE_IMAGES.homeProjectNursery,
    title: "Nursery App",
    description:
      "An all-in-one plant care platform for shopping, tracking, guidance, and booking home gardening services.",
  },
];

const CARD_Z = ["lg:z-[11]", "lg:z-[12]", "lg:z-[13]", "lg:z-[14]"] as const;

/** Sticky stack peek: each card sits 32px lower so the strip of the card below stays visible (matches 6rem / top-24 base). */
const STACK_PEEK_PX = 32;
const STACK_BASE = "6rem";

export default function ProjectsSection() {
  const n = PROJECTS.length;

  return (
    <section
      id="projects"
      className="w-full bg-cream py-16 [contain-intrinsic-size:auto_1400px] [content-visibility:auto] sm:py-[90px]"
    >
      {/* 1440 shell, 100px horizontal inset → 1240px content band, centered */}
      <div className="mx-auto box-border w-full max-w-[1440px] px-5 sm:px-8 lg:px-[100px]">
        <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-x-[60px] lg:gap-y-0">
          <div className="flex w-full min-w-0 flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-serif text-[clamp(2.5rem,6vw,6rem)] font-extrabold leading-[1.2] text-ink lg:text-[96px]">
              Project That Proves My Capabilities
            </h2>
            <Link
              to="/projects"
              className="inline-flex w-fit shrink-0 items-center gap-2.5 bg-pine px-6 py-4 text-mist no-underline transition-opacity hover:opacity-90"
            >
              <span className="whitespace-nowrap font-sans text-[20px] font-bold leading-9 tracking-[1px]">
                See Projects
              </span>
              <span className="relative size-9 shrink-0 overflow-hidden">
                <span className="absolute inset-[18.75%_12.5%]">
                  <img
                    alt=""
                    className="block size-full max-w-none"
                    src={SITE_IMAGES.projectsCtaArrow}
                    width={24}
                    height={24}
                    decoding="async"
                    loading="lazy"
                  />
                </span>
              </span>
            </Link>
          </div>

          <div className="relative flex w-full min-w-0 flex-col gap-[32px]">
            {PROJECTS.map((p, i) => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                aria-label={`${p.title} — view project details`}
                className={
                  "flex flex-col gap-6 border border-ink bg-cream px-5 pb-5 text-inherit no-underline outline-none " +
                  "transition-shadow duration-500 ease-out motion-reduce:transition-none " +
                  "focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream " +
                  (i > 0 ? "pt-8 " : "pt-5 ") +
                  "shadow-[0_1px_0_rgba(15,15,15,0.06)] " +
                  "lg:sticky lg:shadow-[0_12px_40px_rgba(15,15,15,0.12)] " +
                  (CARD_Z[i] ?? "lg:z-10 ") +
                  (i < n - 1 ? "lg:mb-[min(88vh,52rem)]" : "lg:mb-24")
                }
                style={{ top: `calc(${STACK_BASE} + ${i * STACK_PEEK_PX}px)` }}
              >
                <div className="relative h-[min(402px,55vw)] w-full min-h-0 overflow-hidden bg-black lg:h-[402px]">
                  <PictureImg
                    alt=""
                    pictureClassName="absolute inset-0 block h-full w-full"
                    className="size-full object-cover"
                    src={p.image}
                    width={782}
                    height={402}
                    decoding="async"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 782px"
                  />
                </div>
                <div className="flex flex-col gap-4 font-sans text-ink">
                  <h3 className="text-[clamp(1.25rem,3vw,2rem)] font-normal leading-none lg:text-[32px] lg:leading-normal">
                    {p.title}
                  </h3>
                  <p className="text-[18px] leading-normal">{p.description}</p>
                </div>
                {/* Per-card “Check project Details” CTA removed — whole card is the link. Re-add with imgLinkArrow from Figma (0c9feca9…) if needed. */}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
