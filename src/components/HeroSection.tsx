/** Hero — matches Figma "hero Section" (node 613:1371). */

import { Link } from "react-router-dom";
import { SiteNavBar } from "./SiteNavBar";

const imgButtonIcon = "https://www.figma.com/api/mcp/asset/339b92e4-d618-4afd-a645-2b18ae97c116";
const imgPortrait = "https://www.figma.com/api/mcp/asset/76154cc9-f8a4-45d2-a9d0-820b6016dc60";

export default function HeroSection() {
  return (
    <section className="relative min-h-[min(904px,100dvh)] w-full overflow-hidden bg-cream lg:min-h-[904px]">
      <SiteNavBar active="home" variant="hero" />

      <div className="mx-auto box-border flex w-full max-w-[1440px] flex-col items-center gap-6 px-5 pb-24 pt-[131px] sm:px-8 md:gap-10 lg:gap-[60px] lg:px-[100px] max-lg:pt-[140px]">
        <h1
          className="whitespace-nowrap text-center font-serif font-extrabold leading-none text-ink"
          style={{
            /* Single line: nowrap + size capped from viewport so ~16ch fits inside padded hero (avoids overflow-hidden clip). */
            fontSize:
              "min(165px, max(1.75rem, calc((100svw - 3.25rem) / 9)))",
          }}
        >
          Suhanur Rahman
        </h1>

        <div className="flex w-full max-w-[1240px] flex-col items-center gap-4 md:gap-6 lg:flex-row lg:items-center lg:gap-[79px]">
          <div className="flex w-full max-w-[782px] flex-col gap-4 md:gap-6 lg:h-[448px] lg:justify-between lg:gap-0">
            <p className="w-full font-sans text-[32px] font-bold leading-9 tracking-[1.6px] text-ink max-lg:text-[clamp(1.125rem,4vw,2rem)] max-lg:leading-snug">
              [ A Creative UI/UX Designer ]
            </p>
            <div className="flex w-full flex-col gap-4 md:gap-6 lg:gap-10">
              <p className="font-sans text-[32px] font-normal leading-10 text-ink max-lg:text-[clamp(1rem,3.5vw,1.75rem)] max-lg:leading-relaxed">
                From research to final UI, I design products that solve real user problems with clarity and purpose.
              </p>
              <Link
                to="/contact"
                className="inline-flex w-fit shrink-0 items-center gap-[10px] bg-pine px-6 py-4 text-mist transition-opacity hover:opacity-90"
              >
                <span className="whitespace-nowrap font-sans text-[20px] font-bold leading-9 tracking-[1px]">
                  Lets Build a Project
                </span>
                <span className="relative size-9 shrink-0">
                  <img alt="" className="absolute block size-full max-w-none" src={imgButtonIcon} />
                </span>
              </Link>
            </div>
          </div>

          <div className="relative inline-grid shrink-0 grid-cols-1 grid-rows-1 place-items-start leading-none">
            <div
              className="col-start-1 row-start-1 ml-5 mt-5 aspect-[363/428] w-[min(363px,calc(100vw-2.5rem))] max-w-full bg-pine"
              aria-hidden
            />
            <div className="relative col-start-1 row-start-1 aspect-[363/428] w-[min(363px,calc(100vw-2.5rem))] max-w-full overflow-hidden border-[3px] border-solid border-pine bg-black">
              <img
                alt="Suhanur Rahman"
                className="pointer-events-none h-full w-full object-cover object-[50%_22%]"
                src={imgPortrait}
                sizes="(max-width: 1024px) min(363px, 100vw), 363px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
