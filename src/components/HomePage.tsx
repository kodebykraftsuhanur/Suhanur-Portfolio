import { lazy, Suspense, type ReactNode } from "react";
import BookingCalendar from "./BookingCalendar";
import HeroSection from "./HeroSection";

const AboutMeSection = lazy(() => import("./AboutMeSection"));
const MyServicesSection = lazy(() => import("./MyServicesSection"));
const ProjectsSection = lazy(() => import("./ProjectsSection"));
const HomeProcessSection = lazy(() => import("./HomeProcessSection"));

/**
 * Suspense fallbacks reserve approximate block size + match section background to limit CLS when lazy chunks hydrate.
 * Heights are conservative on mobile (dvh) so short viewports are not dominated by empty bands.
 */
function BelowFold({ fallbackClass, children }: { fallbackClass: string; children: ReactNode }) {
  return (
    <Suspense
      fallback={<div className={fallbackClass} aria-hidden role="presentation" />}
    >
      {children}
    </Suspense>
  );
}

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <HeroSection />

      <BelowFold fallbackClass="min-h-[min(28rem,85dvh)] w-full bg-black">
        <AboutMeSection />
      </BelowFold>
      <BelowFold fallbackClass="min-h-[min(36rem,95dvh)] w-full bg-cream">
        <MyServicesSection />
      </BelowFold>
      <BelowFold fallbackClass="min-h-[min(90rem,130dvh)] w-full bg-cream lg:min-h-[min(140rem,180dvh)]">
        <ProjectsSection />
      </BelowFold>
      <BelowFold fallbackClass="min-h-[min(32rem,90dvh)] w-full bg-black">
        <HomeProcessSection />
      </BelowFold>
      {/* Eager: `#contact` must exist for /#contact + ScrollToTop before chunk paint; Cal script still defers inside. */}
      <BookingCalendar anchorId="contact" />
    </div>
  );
}
