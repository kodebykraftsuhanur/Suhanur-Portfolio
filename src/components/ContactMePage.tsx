/**
 * Contact Me — Figma [761:2466](https://www.figma.com/design/NWuQSkecf49B0xVq3XR6Z5/Figmafolio?node-id=761-2466)
 * Desktop: headline top-left, form right; email/phone bottom-left aligned with form baseline.
 * Mobile: headline, form, then contact (CSS Grid areas).
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
      <header className="w-full bg-cream pb-10 max-lg:pt-0 lg:pt-[50px] sm:pb-12 lg:pb-16">
        <div className="flex w-full flex-col max-lg:gap-6 lg:gap-12">
          <SiteNavBar active="contact" variant="page" />
          <div className={layoutShell}>
            <div className={layoutBand}>
              <h1
                className="w-full text-center font-serif font-extrabold leading-none text-ink"
                style={{ fontSize: heroTitleSize }}
              >
                Contact Me
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section
        className="w-full bg-cream py-12 sm:py-16 lg:py-[90px]"
        aria-labelledby="contact-lead-heading"
      >
        <div className={layoutShell}>
          <div className={layoutBand}>
            <div
              className="
                grid min-w-0 max-w-full gap-12
                [grid-template-areas:'intro'_'form'_'contact']
                lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-[60px] lg:gap-y-0
                lg:[grid-template-areas:'intro_form'_'contact_form']
              "
            >
              <div className="min-w-0 [grid-area:intro] flex flex-col gap-4">
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
              <div className="min-w-0 [grid-area:form] lg:min-h-0">
                <ContactForm />
              </div>
              <div className="min-w-0 [grid-area:contact] max-lg:justify-self-stretch lg:self-end">
                <ContactInformation />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
