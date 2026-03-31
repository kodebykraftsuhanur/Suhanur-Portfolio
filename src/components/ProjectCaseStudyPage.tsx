/** Full case-study layout driven by `projectCaseStudies` config. */

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import { SITE_IMAGES } from "../assets/siteImages";
import type { CaseStudyImages, ProjectCaseStudyConfig } from "../data/projectCaseStudies";
import { CaseStudyFinalMockup, CASE_STUDY_FINAL_MOCKUP_SRC } from "./CaseStudyFinalMockup";
import { PictureImg } from "./PictureImg";
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";
import { SiteNavBar } from "./SiteNavBar";

const layoutShell = "mx-auto box-border w-full max-w-[1440px] px-5 sm:px-8 lg:px-[100px]";
const layoutBand = "mx-auto w-full max-w-[1240px]";

type SectionFrameProps = {
  as?: "section" | "div";
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"section">, "className" | "children">;

function SectionFrame({ as: Tag = "section", className = "", children, ...rest }: SectionFrameProps) {
  return (
    <Tag className={`w-full ${className}`.trim()} {...rest}>
      <div className={layoutShell}>
        <div className={layoutBand}>{children}</div>
      </div>
    </Tag>
  );
}

function RatioImageFrame({
  ratioClass,
  bgClass,
  children,
  className = "",
  ...rest
}: {
  ratioClass: string;
  bgClass: string;
  children?: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">) {
  return (
    <div
      className={`relative w-full min-w-0 max-w-full overflow-hidden ${bgClass} ${ratioClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}

function ProcessArrow() {
  return (
    <span className="relative size-6 shrink-0">
      <span className="absolute bottom-1/4 left-1/4 right-[31.25%] top-[31.25%]">
        <img
          alt=""
          className="block size-full max-w-none"
          src={SITE_IMAGES.caseProcessArrow1}
          decoding="async"
        />
      </span>
      <span className="absolute bottom-[33.33%] left-[33.33%] right-1/4 top-1/4">
        <img
          alt=""
          className="block size-full max-w-none"
          src={SITE_IMAGES.caseProcessArrow2}
          decoding="async"
        />
      </span>
    </span>
  );
}

const PHASES = [
  { n: "01", title: "DISCOVER", body: "User interviews / Research synthesis" },
  { n: "02", title: "DEFINE", body: "Analyze Research / Identify Pain Points / Outline Solutions" },
  { n: "03", title: "DESIGN", body: "Card sorting / Sitemap / User flow / High-fidelity design" },
  { n: "04", title: "DELIVER", body: "Final UI / Implementation handoff" },
] as const;

const TIMELINE_ROWS = [
  { label: "Research", duration: "2 Weeks" },
  { label: "Design", duration: "4 Weeks" },
  { label: "Presentation", duration: "1 Week" },
] as const;

const ALL_SIMILAR = [
  {
    id: "school-app",
    href: "/projects/school-app",
    image: SITE_IMAGES.projectsPageSchool,
    title: "Amader School",
    description:
      "A modern school management app for students and parents — progress, tasks, and updates in one place.",
  },
  {
    id: "school-dash",
    href: "/projects/school-dash",
    image: SITE_IMAGES.projectsPageDash,
    title: "School Management Dashboard",
    description:
      "Designed to bridge the communication gap between parents and schools through real-time updates and insights.",
  },
  {
    id: "nursery-plant",
    href: "/projects/nursery-plant",
    image: SITE_IMAGES.projectsPageNursery,
    title: "Nursery App",
    description:
      "An all-in-one plant care platform for shopping, tracking, guidance, and booking home gardening services.",
  },
  {
    id: "nursery-mechanic",
    href: "/projects/nursery-mechanic",
    image: SITE_IMAGES.projectsPageMechanic,
    title: "FIXORA",
    description:
      "A smart platform that connects users with nearby mechanics for quick, reliable, and hassle-free vehicle services.",
  },
] as const;

function similarCardsFor(currentId: string) {
  return ALL_SIMILAR.filter((c) => c.id !== currentId);
}

function HeroMedia({ images, title }: { images: CaseStudyImages; title: string }) {
  if (!images.hero) {
    return <RatioImageFrame ratioClass="aspect-[888/520]" bgClass="bg-[#d9d9d9]" aria-hidden />;
  }
  return (
    <RatioImageFrame ratioClass="aspect-[888/520]" bgClass="bg-black">
      <PictureImg
        alt={title}
        src={images.hero}
        pictureClassName="absolute inset-0 block h-full w-full"
        className="absolute inset-0 h-full w-full max-w-none object-cover object-center"
        decoding="async"
        fetchPriority="high"
        sizes="(min-width: 1024px) min(1240px, 100vw), 100vw"
      />
    </RatioImageFrame>
  );
}

function WideMedia({ src }: { src: string | null }) {
  if (!src) {
    return <RatioImageFrame ratioClass="aspect-[888/454]" bgClass="bg-[#d9d9d9]" aria-hidden />;
  }
  return (
    <RatioImageFrame ratioClass="aspect-[888/454]" bgClass="bg-black">
      <PictureImg
        alt=""
        src={src}
        pictureClassName="absolute inset-0 block h-full w-full"
        className="absolute inset-0 h-full w-full max-w-none object-cover object-center"
        decoding="async"
        loading="lazy"
        sizes="(min-width: 1024px) 1240px, 100vw"
      />
    </RatioImageFrame>
  );
}

function HandMedia({ images }: { images: CaseStudyImages }) {
  if (!images.handBg || !images.handPhone) {
    return <RatioImageFrame ratioClass="aspect-[1240/698]" bgClass="bg-[#d9d9d9]" aria-hidden />;
  }
  return (
    <RatioImageFrame ratioClass="aspect-[1240/698]" bgClass="bg-[#d9d9d9]">
      <PictureImg
        alt=""
        src={images.handBg}
        rasterWebp={false}
        pictureClassName="absolute inset-0 block h-full w-full"
        className="absolute inset-0 h-full w-full max-w-none object-cover object-center"
        decoding="async"
        loading="lazy"
        sizes="(min-width: 1024px) 1240px, 100vw"
      />
      <PictureImg
        alt=""
        src={images.handPhone}
        pictureClassName="pointer-events-none absolute inset-0 block h-full w-full max-w-full"
        className="pointer-events-none h-full w-full max-w-full object-contain object-bottom"
        decoding="async"
        loading="lazy"
        sizes="(min-width: 1024px) 1240px, 100vw"
      />
    </RatioImageFrame>
  );
}

function FinalMockupBlock({ src }: { src: string | null }) {
  if (!src) {
    return <div className="aspect-[1240/600] w-full max-w-[1240px] bg-[#d9d9d9]" aria-hidden />;
  }
  if (src === CASE_STUDY_FINAL_MOCKUP_SRC) {
    return <CaseStudyFinalMockup />;
  }
  return (
    <PictureImg
      src={src}
      alt=""
      width={1240}
      pictureClassName="block w-full max-w-[1240px]"
      className="block h-auto min-w-0 w-full max-w-[1240px]"
      decoding="async"
      loading="lazy"
      sizes="(min-width: 1240px) 1240px, 100vw"
    />
  );
}

type Props = { config: ProjectCaseStudyConfig };

export default function ProjectCaseStudyPage({ config }: Props) {
  const { title, images, heroMeta, about, problems, solutions } = config;
  const similar = similarCardsFor(config.id);

  return (
    <div className="flex w-full flex-col bg-cream">
      <section className="w-full bg-cream pb-12 max-lg:pt-0 lg:pt-[50px] sm:pb-16 lg:pb-20">
        <div className="flex w-full flex-col max-lg:gap-6 lg:gap-12">
          <SiteNavBar active="projects" variant="page" />
          <div className={layoutShell}>
            <div className={layoutBand}>
              <div className="flex w-full min-w-0 max-w-full flex-col max-lg:gap-6 lg:gap-12">
          <h1
            className="w-full text-center font-serif font-extrabold leading-none text-ink"
            style={{
              fontSize: "min(165px, max(2.5rem, calc((100vw - 2.5rem) / 6)))",
            }}
          >
            {title}
          </h1>

          <HeroMedia images={images} title={title} />

          <div className="flex w-full min-w-0 flex-col divide-y divide-ink/10 sm:flex-row sm:flex-nowrap sm:divide-y-0 sm:gap-5 lg:gap-8">
            {heroMeta.map((item) => (
              <div
                key={item.label}
                className="flex min-w-0 flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-1 sm:basis-0 sm:gap-1.5 sm:py-0 sm:first:pt-0 sm:last:pb-0"
              >
                <p
                  className={`font-sans text-[11px] uppercase leading-tight tracking-[0.12em] text-ink/50 sm:text-xs sm:tracking-[0.15em] ${
                    item.mutedDesktopLabel
                      ? "font-normal sm:font-normal sm:text-ink/50"
                      : "font-normal sm:font-bold sm:text-ink"
                  }`}
                >
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="min-w-0 font-sans text-base font-bold leading-snug text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink [overflow-wrap:anywhere] sm:text-base"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-sans text-base font-bold leading-snug text-ink sm:font-normal sm:text-base sm:leading-6 sm:text-ink/55">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>

          <section className="min-w-0 max-w-full flex flex-col gap-4 text-black">
            <h2 className="font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-[0.1em]">
              About The Project
            </h2>
            <p className="min-w-0 break-words font-sans text-[18px] leading-7">{about}</p>
          </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionFrame className="bg-cream py-12 sm:py-16">
        <div className="flex w-full min-w-0 max-w-full flex-col gap-10">
          <WideMedia src={images.wide} />

          <section className="min-w-0 max-w-full flex flex-col gap-4 text-black">
            <h2 className="font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-[0.1em]">
              Problems
            </h2>
            <p className="min-w-0 break-words font-sans text-[18px] leading-7">{problems}</p>
          </section>

          <section className="min-w-0 max-w-full flex flex-col gap-4 text-black">
            <h2 className="font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-[0.1em]">
              Solutions
            </h2>
            <p className="min-w-0 break-words font-sans text-[18px] leading-7">{solutions}</p>
          </section>

          <HandMedia images={images} />
        </div>
      </SectionFrame>

      <SectionFrame className="bg-cream py-12 sm:py-16">
        <div className="flex min-w-0 max-w-full flex-col gap-10">
          <h2 className="font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-[0.1em] text-black">
            Design process
          </h2>
          <div className="grid min-w-0 max-w-full grid-cols-1 gap-4 md:grid-cols-2">
            {PHASES.map((p) => (
              <div key={p.n} className="flex items-start justify-between gap-4 bg-[#f2f2f2] p-5">
                <div className="flex items-end gap-2">
                  <span className="font-sans text-[clamp(3rem,10vw,5.75rem)] leading-none text-[#373737]">{p.n}</span>
                  <ProcessArrow />
                </div>
                <div className="flex max-w-[11rem] flex-col gap-2.5 font-sans text-[#373737]">
                  <p className="text-[24px] leading-tight">{p.title}</p>
                  <p className="text-[16px] leading-snug">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>

      <SectionFrame className="bg-cream py-12 sm:py-16">
        <div className="flex min-w-0 max-w-full flex-col gap-10">
          <h2 className="font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-[0.1em] text-black">
            Design Timeline
          </h2>
          <div className="flex w-full flex-col font-sans text-[clamp(1.25rem,3vw,2rem)] text-ink">
            {TIMELINE_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={
                  i === 0
                    ? "flex items-center justify-between border-y border-ink py-6 sm:py-[30px]"
                    : "flex items-center justify-between border-b border-ink py-6 sm:py-[30px]"
                }
              >
                <span className="pl-3 text-left sm:pl-0">{row.label}</span>
                <span>{row.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionFrame>

      <SectionFrame className="bg-cream py-12 sm:py-16">
        <div className="flex min-w-0 max-w-full flex-col gap-10">
          <h2 className="font-sans text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-tight tracking-[0.1em] text-black">
            Design System
          </h2>
          <div className="flex min-w-0 max-w-full flex-col gap-0 lg:flex-row">
            <div className="flex min-w-0 w-full flex-col gap-10 bg-[#f2f2f2] p-5 lg:max-w-[50%]">
              <div className="flex flex-col gap-6 font-sans text-ink">
                <p className="text-[32px] tracking-[3.2px]">TypoGraphy</p>
                <p className="text-[24px] tracking-[2.4px]">Font: SF Pro</p>
              </div>
              <p className="font-sans text-[clamp(5rem,18vw,12.5rem)] font-semibold leading-none text-[#467aff]">Aa</p>
              <div className="flex flex-col gap-4 font-sans text-[24px] text-ink">
                <p className="break-words [overflow-wrap:anywhere]">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
                <p className="break-words [overflow-wrap:anywhere]">a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
              </div>
            </div>
            <div className="grid min-w-0 w-full grid-cols-2 lg:max-w-[50%]">
              <div className="flex min-h-[200px] flex-col justify-center bg-[#467aff] p-6 font-sans text-mist sm:p-[30px]">
                <p className="text-[20px]">467AFF</p>
                <p className="mt-1 text-[24px]">Primary Color</p>
              </div>
              <div className="flex min-h-[200px] flex-col justify-center bg-[#d9d9d9] p-6 font-sans text-ink sm:p-[30px]">
                <p className="text-[20px]">9B9B9B</p>
                <p className="mt-1 text-[24px]">Secondary</p>
              </div>
              <div className="flex min-h-[200px] flex-col justify-center bg-white p-6 font-sans text-ink sm:p-[30px]">
                <p className="text-[20px]">FFFFFF</p>
                <p className="mt-1 text-[24px]">Background</p>
              </div>
              <div className="flex min-h-[200px] flex-col justify-center bg-[#373737] p-6 font-sans text-mist sm:p-[30px]">
                <p className="text-[20px]">373737</p>
                <p className="mt-1 text-[24px]">Text Color</p>
              </div>
            </div>
          </div>

          <div className="flex w-full min-w-0 justify-center">
            <FinalMockupBlock src={images.finalMockup} />
          </div>
        </div>
      </SectionFrame>

      <SectionFrame className="bg-black py-16 sm:py-[90px]" aria-labelledby="similar-heading">
        <div className="flex flex-col gap-12 lg:gap-20">
          <h2
            id="similar-heading"
            className="text-center font-serif text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-none text-mist"
          >
            Similar Projects
          </h2>
          <div className="grid min-w-0 max-w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {similar.map((c) => (
              <article
                key={c.href}
                className="flex h-full min-h-0 min-w-0 max-w-full flex-col gap-6 border border-white p-5 font-sans text-mist"
              >
                <RatioImageFrame ratioClass="aspect-[402/245] shrink-0" bgClass="bg-black">
                  <PictureImg
                    alt=""
                    src={c.image}
                    pictureClassName="absolute inset-0 block h-full w-full"
                    className="absolute inset-0 h-full w-full max-w-none object-cover object-center"
                    decoding="async"
                    loading="lazy"
                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                  />
                </RatioImageFrame>
                <div className="min-w-0 flex flex-col gap-4">
                  <h3 className="text-[clamp(1.25rem,3vw,2rem)] font-normal leading-tight">{c.title}</h3>
                  <p className="min-w-0 break-words text-[18px] leading-normal">{c.description}</p>
                </div>
                <Link
                  to={c.href}
                  className="mt-auto inline-flex w-fit shrink-0 items-center gap-2.5 border border-mist px-6 py-4 text-[16px] font-bold leading-6 tracking-[0.8px]"
                >
                  Check project Details
                  <span className="relative size-6 shrink-0 overflow-hidden">
                    <span className="absolute inset-[18.75%_12.5%]">
                      <img
                        alt=""
                        className="block size-full max-w-none"
                        src={SITE_IMAGES.caseLinkArrow}
                        decoding="async"
                      />
                    </span>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </SectionFrame>

      <SectionFrame id="contact" className="bg-cream py-16 sm:py-[90px]">
        <div className="flex min-w-0 max-w-full flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-[60px]">
          <div className="flex min-w-0 w-full max-w-full flex-1 flex-col gap-10 lg:justify-between">
            <div className="min-w-0 flex flex-col gap-4">
              <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.08] text-ink">
                Lets Make It Happen
              </h2>
              <p className="max-w-full break-words font-sans text-[18px] leading-8 text-subtitle sm:max-w-xl">
                Tell us about your idea. We&apos;ll discuss your needs, plan the approach, and start building something
                great.
              </p>
            </div>
            <ContactInformation />
          </div>
          <div className="min-w-0 w-full max-w-full flex-1">
            <ContactForm />
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}
