/** Shared primary nav: compact bar + drawer (<lg), Figma pill (≥lg). */

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { HeroLogo, PrimarySiteNavPill, imgNavEllipseHome } from "./PrimarySiteNav";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden>
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
        />
      ) : (
        <>
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        </>
      )}
    </svg>
  );
}

const drawerNavClass =
  "flex w-full items-center gap-4 border-b border-black/20 py-4 font-sans text-[20px] tracking-[0.4px] text-ink transition-colors hover:bg-black/5";

export type SiteNavActive = "home" | "projects" | "contact";

type SiteNavBarProps = {
  active: SiteNavActive;
  /** `hero`: absolutely positioned under hero top; `page`: in-flow at top of page band */
  variant: "hero" | "page";
};

export function SiteNavBar({ active, variant }: SiteNavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    onChange();
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const drawer =
    menuOpen &&
    createPortal(
      <div className="fixed inset-0 z-[200] lg:hidden" role="presentation">
        <button
          type="button"
          className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
          aria-label="Close menu"
          onClick={closeMenu}
        />
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="absolute right-0 top-0 flex h-full w-[min(100%,380px)] flex-col border-l border-black bg-cream shadow-[-8px_0_32px_rgba(0,0,0,0.12)] animate-drawerIn"
        >
          <div className="flex items-center justify-between gap-3 border-b border-black p-4">
            <Link to="/" className="min-w-0 shrink py-1 pl-1" aria-label="Home" onClick={closeMenu}>
              <HeroLogo compact />
            </Link>
            <button
              type="button"
              className="flex size-11 items-center justify-center border border-black bg-cream text-ink hover:bg-black/5"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <MenuIcon open />
            </button>
          </div>
          <nav className="flex flex-col px-4 py-2" aria-label="Primary mobile">
            <Link
              to="/"
              className={`${drawerNavClass} ${active === "home" ? "font-bold text-pine" : ""}`}
              onClick={closeMenu}
            >
              {active === "home" ? <img alt="" className="size-2.5 shrink-0" src={imgNavEllipseHome} /> : null}
              <span>Home</span>
            </Link>
            <Link
              to="/projects"
              className={`${drawerNavClass} ${active === "projects" ? "font-bold text-pine" : ""}`}
              onClick={closeMenu}
            >
              {active === "projects" ? <img alt="" className="size-2.5 shrink-0" src={imgNavEllipseHome} /> : null}
              <span>Projects</span>
            </Link>
            <Link
              to="/contact"
              className={`${drawerNavClass} ${active === "contact" ? "font-bold text-pine" : ""}`}
              onClick={closeMenu}
            >
              {active === "contact" ? <img alt="" className="size-2.5 shrink-0" src={imgNavEllipseHome} /> : null}
              <span>Contact</span>
            </Link>
          </nav>
        </div>
      </div>,
      document.body
    );

  const mobileOuter =
    variant === "hero"
      ? "absolute inset-x-0 top-[50px] z-20 px-5 sm:px-8 lg:hidden"
      : "relative z-20 w-full lg:hidden";

  const mobileInnerBar = (
    <div className="flex w-full min-w-0 items-center justify-between gap-3 border border-black bg-cream p-[5px]">
      <Link to="/" className="min-w-0 shrink py-1 pl-1" aria-label="Home">
        <HeroLogo compact />
      </Link>
      <button
        type="button"
        className="flex size-12 shrink-0 items-center justify-center border border-black bg-cream text-ink hover:bg-black/5"
        aria-expanded={menuOpen}
        aria-controls={panelId}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((o) => !o)}
      >
        <MenuIcon open={menuOpen} />
      </button>
    </div>
  );

  const desktopClass =
    variant === "hero"
      ? "max-lg:hidden absolute left-1/2 top-[50px] z-10 w-max max-w-[calc(100%-1.5rem)] -translate-x-1/2 lg:max-w-none"
      : "relative z-10 mx-auto mt-0 max-lg:hidden w-fit max-w-[calc(100%-1.5rem)]";

  return (
    <>
      {drawer}
      <div className={mobileOuter}>{mobileInnerBar}</div>
      <PrimarySiteNavPill active={active === "contact" ? "other" : active} className={desktopClass} />
    </>
  );
}
