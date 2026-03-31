/** In-flow mobile header bar — same layout as home hero (50px / safe-area, bar, typography). */

import { Link } from "react-router-dom";
import { HeroLogo } from "./PrimarySiteNav";

const MOBILE_BAR_ROW =
  "relative z-[320] mx-5 flex items-center justify-between gap-3 rounded-none border border-black bg-[#fffefa] py-1.5 pl-[6px] pr-1.5 transition-shadow duration-300 ease-nav-smooth sm:mx-8";

function HamburgerIcon({ open, className = "" }: { open: boolean; className?: string }) {
  const line =
    "absolute left-1/2 h-[2px] w-[20px] -translate-x-1/2 bg-ink transition-all duration-300 ease-in-out origin-center";
  return (
    <span className={`relative block size-6 shrink-0 ${className}`.trim()} aria-hidden>
      <span className={`${line} ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[5px]"}`} />
      <span
        className={`${line} top-1/2 -translate-y-1/2 ${open ? "scale-x-0 opacity-0" : "opacity-100"}`}
      />
      <span
        className={`${line} ${open ? "top-1/2 bottom-auto -translate-y-1/2 -rotate-45" : "bottom-[5px]"}`}
      />
    </span>
  );
}

export type MobileSiteNavBarProps = {
  menuOpen: boolean;
  panelId: string;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
};

export function MobileSiteNavBar({
  menuOpen,
  panelId,
  onToggleMenu,
  onCloseMenu,
}: MobileSiteNavBarProps) {
  return (
    <div className="w-full shrink-0 pt-[max(50px,env(safe-area-inset-top,0px))] lg:hidden">
      <div
        className={`${MOBILE_BAR_ROW} ${menuOpen ? "shadow-[0_8px_32px_rgba(0,0,0,0.08)]" : ""}`.trim()}
      >
        <Link
          to="/"
          className="min-w-0 shrink py-1 pl-0.5"
          aria-label="Home"
          onClick={() => menuOpen && onCloseMenu()}
        >
          <HeroLogo compact />
        </Link>
        <button
          type="button"
          className="flex size-12 shrink-0 items-center justify-center rounded-none border border-black bg-[#fffefa] text-ink hover:bg-[#fffefa] active:bg-[#fffefa] [-webkit-tap-highlight-color:transparent] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          aria-expanded={menuOpen}
          aria-controls={panelId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={onToggleMenu}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </div>
    </div>
  );
}
