/** Shared primary nav: compact bar + mobile drawer (<lg), Figma pill (≥lg). */

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { MobileSiteNavBar } from "./MobileSiteNavBar";
import { PrimarySiteNavPill } from "./PrimarySiteNav";

const MOBILE_PANEL_MS = 320;
const STAGGER_STEP_S = 0.1;

/** Matches mobile bar top inset — drawer overlay uses same rhythm. */
const MOBILE_NAV_TOP = "max(50px, env(safe-area-inset-top, 0px))";
const MOBILE_DRAWER_NAV_PT = `calc(${MOBILE_NAV_TOP} + 3.875rem + 1.5rem)`;

const drawerNavClass =
  "flex w-full items-center gap-4 border-b border-black/10 py-5 font-sans text-[22px] font-medium tracking-[0.02em] text-ink/80 transition-colors hover:text-ink";

export type SiteNavActive = "home" | "projects" | "contact";

type SiteNavBarProps = {
  active: SiteNavActive;
  /** Desktop only: `hero` = centered absolute pill; `page` = in-flow pill under `lg:pt-[50px]` parent. */
  variant: "hero" | "page";
};

export function SiteNavBar({ active, variant }: SiteNavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const panelId = useId();
  const openTimerRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

  useEffect(() => {
    if (menuOpen) {
      setMenuMounted(true);
      openTimerRef.current = requestAnimationFrame(() => {
        openTimerRef.current = requestAnimationFrame(() => setMenuVisible(true));
      });
      return () => {
        if (openTimerRef.current != null) cancelAnimationFrame(openTimerRef.current);
      };
    }
    setMenuVisible(false);
    const t = window.setTimeout(() => setMenuMounted(false), MOBILE_PANEL_MS);
    return () => window.clearTimeout(t);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen && !menuMounted) return undefined;
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
  }, [menuOpen, menuMounted]);

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
  const toggleMenu = () => setMenuOpen((o) => !o);

  const navLinks: { to: string; label: string; key: SiteNavActive }[] = [
    { to: "/", label: "Home", key: "home" },
    { to: "/projects", label: "Projects", key: "projects" },
    { to: "/contact", label: "Contact", key: "contact" },
  ];

  const drawer =
    menuMounted &&
    createPortal(
      <div className="fixed inset-0 z-[280] lg:hidden" role="presentation">
        <button
          type="button"
          className={`absolute inset-0 bg-black/55 backdrop-blur-md transition-opacity duration-300 ease-nav-panel ${
            menuVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
          aria-label="Close menu"
          onClick={closeMenu}
        />
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`pointer-events-auto absolute inset-0 flex min-h-[100dvh] flex-col bg-[#fffefa] transition-transform duration-300 ease-nav-panel ${
            menuVisible ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
        >
          <nav
            className="flex flex-1 flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            style={{ paddingTop: MOBILE_DRAWER_NAV_PT }}
            aria-label="Primary mobile"
          >
            {navLinks.map((item, i) => (
              <Link
                key={item.key}
                to={item.to}
                className={`${drawerNavClass} ${active === item.key ? "font-bold text-pine" : ""} ${
                  menuVisible
                    ? "animate-mobileNavItemIn motion-reduce:animate-none motion-reduce:opacity-100"
                    : "opacity-0"
                }`}
                style={
                  menuVisible
                    ? { animationDelay: `${i * STAGGER_STEP_S}s`, animationFillMode: "both" as const }
                    : undefined
                }
                onClick={closeMenu}
              >
                {active === item.key ? (
                  <span className="size-2.5 shrink-0 rounded-full bg-ink" aria-hidden />
                ) : null}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>,
      document.body
    );

  const desktopClass =
    variant === "hero"
      ? "max-lg:hidden absolute left-1/2 top-[50px] z-10 w-max max-w-[calc(100%-1.5rem)] -translate-x-1/2 lg:max-w-none"
      : "relative z-10 mx-auto mt-0 max-lg:hidden w-fit max-w-[calc(100%-1.5rem)]";

  return (
    <>
      {drawer}
      <MobileSiteNavBar
        menuOpen={menuOpen}
        panelId={panelId}
        onToggleMenu={toggleMenu}
        onCloseMenu={closeMenu}
      />
      <PrimarySiteNavPill active={active === "contact" ? "other" : active} className={desktopClass} />
    </>
  );
}
