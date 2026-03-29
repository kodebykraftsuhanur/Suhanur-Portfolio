/**
 * Case study missing / invalid — Figma frame "Error" (770:2535)
 * https://www.figma.com/design/NWuQSkecf49B0xVq3XR6Z5/Figmafolio?node-id=770-2535
 */

import { SiteNavBar } from "./SiteNavBar";

const imgCtaIcon = "https://www.figma.com/api/mcp/asset/aac9a7a3-82db-4754-8c13-0213a2a539d4";

const layoutShell = "mx-auto box-border w-full max-w-[1440px] px-5 sm:px-8 lg:px-[100px]";
const layoutBand = "mx-auto flex w-full max-w-[1240px] flex-col items-center";

export function CaseStudyUnavailable() {
  return (
    <div className="flex w-full flex-col bg-cream">
      <section className="w-full bg-cream pb-16 pt-[50px] sm:pb-20 lg:pb-[80px]">
        <div className={layoutShell}>
          <div className={layoutBand}>
            <div className="w-full min-w-0">
              <SiteNavBar active="projects" variant="page" />
            </div>

            <div className="flex w-full min-w-0 max-w-full flex-col items-center gap-10 pt-10 text-center sm:pt-16 lg:pt-24">
              <h1 className="max-w-[min(100%,22ch)] font-serif text-[clamp(2.25rem,6.5vw+0.5rem,6.875rem)] font-extrabold leading-[1.2] text-ink">
                This Case Study is not available yet
              </h1>
              <button
                type="button"
                className="inline-flex w-fit shrink-0 items-center gap-[10px] bg-pine px-6 py-4 text-mist"
              >
                <span className="whitespace-nowrap font-sans text-[20px] font-bold leading-9 tracking-[1px]">
                  Lets Build a Project
                </span>
                <span className="relative size-9 shrink-0">
                  <img alt="" className="absolute block size-full max-w-none" src={imgCtaIcon} decoding="async" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
