/**
 * Contact Me — Figma [761:2466](https://www.figma.com/design/NWuQSkecf49B0xVq3XR6Z5/Figmafolio?node-id=761-2466)
 * Hero title + “Let’s Make It Happen” band with email/phone and pine form (shared components).
 */

import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";
import { SiteNavBar } from "./SiteNavBar";

const layoutShell = "mx-auto box-border w-full max-w-[1440px] px-5 sm:px-8 lg:px-[100px]";
const layoutBand = "mx-auto w-full max-w-[1240px]";

const heroTitleSize =
  "min(165px, max(2.5rem, calc((100vw - 2.5rem) / 6)))" as const;

export default function ContactMePage() {
  return (
    <div className="flex min-h-0 w-full flex-col bg-cream">
      <header className="w-full bg-cream pb-10 pt-[50px] sm:pb-12 lg:pb-16">
        <div className={layoutShell}>
          <div className={`${layoutBand} flex flex-col gap-10 lg:gap-12`}>
            <SiteNavBar active="contact" variant="page" />
            <h1
              className="w-full text-center font-serif font-extrabold leading-none text-ink"
              style={{ fontSize: heroTitleSize }}
            >
              Contact Me
            </h1>
          </div>
        </div>
      </header>

      <section
        className="w-full bg-cream py-12 sm:py-16 lg:py-[90px]"
        aria-labelledby="contact-lead-heading"
      >
        <div className={layoutShell}>
          <div className={layoutBand}>
            <div className="flex min-w-0 max-w-full flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-[60px]">
              <div className="flex min-w-0 w-full flex-1 flex-col gap-10 lg:max-w-none lg:gap-[50px]">
                <div className="flex min-w-0 flex-col gap-4">
                  <h2
                    id="contact-lead-heading"
                    className="w-full font-serif text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.08] text-ink lg:leading-[104px]"
                  >
                    Lets Make It Happen
                  </h2>
                  <p className="max-w-full font-sans text-[18px] leading-8 text-subtitle sm:max-w-xl">
                    Tell us about your idea. We&apos;ll discuss your needs, plan the approach, and start building
                    something great.
                  </p>
                </div>
                <ContactInformation />
              </div>
              <div className="min-w-0 w-full flex-1 lg:max-w-none">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
