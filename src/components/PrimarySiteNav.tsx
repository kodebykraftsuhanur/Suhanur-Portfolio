/** Desktop pill nav — Figma "Navigation Container" (619:428). */

import { Link } from "react-router-dom";
import { SITE_IMAGES } from "../assets/siteImages";

/** Active / on-pine dot (Figma 619:415). */
export const imgNavEllipseHome = SITE_IMAGES.navEllipseHome;
/** Default dot on cream (Figma 619:423). */
export const imgNavEllipseProjects = SITE_IMAGES.navEllipseProjects;

/** Nav item: gap 4px, px 40, py 10 — matches Figma "Nav Item". */
const navItemClass =
  "flex shrink-0 flex-col items-center justify-center gap-1 px-10 py-2.5";

/** Both dot sprites stay mounted; opacity toggles instantly (no src swap / decode delay). */
function NavDot({ active }: { active: boolean }) {
  return (
    <span className="relative block size-2.5 shrink-0" aria-hidden>
      <img
        alt=""
        src={imgNavEllipseProjects}
        decoding="sync"
        className={`pointer-events-none absolute inset-0 size-full max-w-none ${active ? "opacity-0" : "opacity-100"}`}
      />
      <img
        alt=""
        src={imgNavEllipseHome}
        decoding="sync"
        className={`pointer-events-none absolute inset-0 size-full max-w-none ${active ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}

export function HeroLogo({ compact }: { compact?: boolean }) {
  if (compact) {
    return (
      <div
        className="flex max-w-full flex-nowrap items-center gap-[0.08em] whitespace-nowrap border-[1.069px] border-black pl-[0.12em] font-sans font-bold leading-none text-ink"
        style={{
          fontSize: "clamp(1rem, 4vw + 0.35rem, 49.172px)",
          letterSpacing: "0.02em",
        }}
        aria-label="SUHANUR"
      >
        <span className="shrink-0">SUH</span>
        <span className="shrink-0 bg-black px-[0.12em] py-[0.02em] text-cream">ANUR</span>
      </div>
    );
  }

  return (
    <div
      className="flex max-w-full flex-nowrap items-center gap-1 whitespace-nowrap border-[1.069px] border-black pl-[6px] font-sans font-bold leading-[62px] text-ink"
      style={{
        fontSize: "min(49.172px, max(1.25rem, 3.2vw))",
        letterSpacing: "0.9834px",
      }}
      aria-label="SUHANUR"
    >
      <span className="shrink-0">SUH</span>
      <span className="flex shrink-0 items-center justify-center bg-black px-[6px] text-cream">ANUR</span>
    </div>
  );
}

type ActivePage = "home" | "projects" | "other";

type PrimarySiteNavPillProps = {
  active: ActivePage;
  className?: string;
};

export function PrimarySiteNavPill({ active, className = "" }: PrimarySiteNavPillProps) {
  const homeActive = active === "home";
  const projectsActive = active === "projects";

  return (
    <nav
      className={`flex items-center justify-center gap-3 border border-black bg-cream p-[5px] ${className}`.trim()}
      aria-label="Primary"
    >
      <Link
        to="/"
        className={`${navItemClass} ${homeActive ? "bg-pine" : ""}`.trim()}
      >
        <NavDot active={homeActive} />
        <span
          className={
            "whitespace-nowrap font-sans text-[20px] leading-7 tracking-[0.4px] " +
            (homeActive ? "font-bold text-mist" : "font-bold text-ink")
          }
        >
          Home
        </span>
      </Link>

      <Link to="/" className="flex shrink-0 items-center" aria-label="Home">
        <HeroLogo />
      </Link>

      <Link
        to="/projects"
        className={`${navItemClass} ${projectsActive ? "bg-pine" : ""}`.trim()}
      >
        <NavDot active={projectsActive} />
        <span
          className={
            "whitespace-nowrap font-sans text-[20px] leading-7 tracking-[0.4px] " +
            (projectsActive ? "font-normal text-mist" : "font-normal text-ink")
          }
        >
          Projects
        </span>
      </Link>
    </nav>
  );
}
