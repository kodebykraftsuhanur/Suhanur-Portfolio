/** Dedicated projects page — Figma "project" (663:543): nav + My Projects grid + contact + footer. */

import { Link } from "react-router-dom";
import { SITE_IMAGES } from "../assets/siteImages";
import ContactForm from "./ContactForm";
import { PictureImg } from "./PictureImg";
import ContactInformation from "./ContactInformation";
import { SiteNavBar } from "./SiteNavBar";

const layoutShell = "mx-auto box-border w-full max-w-[1440px] px-5 sm:px-8 lg:px-[100px]";
const layoutBand = "mx-auto w-full max-w-[1240px]";

const PROJECTS: { id: string; image: string; title: string; description: string }[] = [
  {
    id: "school-app",
    image: SITE_IMAGES.projectsPageSchool,
    title: "School Management App",
    description:
      "An intuitive platform that streamlines school operations and improves communication between students and parents.",
  },
  {
    id: "school-dash",
    image: SITE_IMAGES.projectsPageDash,
    title: "School Management Dashboard",
    description:
      "Designed to bridge the communication gap between parents and schools through real-time updates and insights.",
  },
  {
    id: "nursery-plant",
    image: SITE_IMAGES.projectsPageNursery,
    title: "Nursery App",
    description:
      "An all-in-one plant care platform for shopping, tracking, guidance, and booking home gardening services.",
  },
  {
    id: "nursery-mechanic",
    image: SITE_IMAGES.projectsPageMechanic,
    title: "FIXORA",
    description:
      "A smart platform that connects users with nearby mechanics for quick, reliable, and hassle-free vehicle services.",
  },
];

function ProjectCard({ id, image, title, description }: (typeof PROJECTS)[0]) {
  return (
    <article className="flex min-h-0 min-w-0 flex-1 flex-col gap-6 border border-black bg-cream p-5">
      <div className="relative h-[min(402px,70vw)] w-full shrink-0 overflow-hidden bg-black sm:h-[402px]">
        <PictureImg
          alt=""
          pictureClassName="absolute inset-0 block h-full w-full"
          className="size-full object-cover"
          src={image}
          decoding="async"
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 590px"
        />
      </div>
      <div className="flex flex-col gap-4 font-sans text-ink">
        <h3 className="text-[clamp(1.25rem,3vw,2rem)] font-normal leading-normal lg:text-[32px]">{title}</h3>
        <p className="text-[18px] leading-normal">{description}</p>
      </div>
      <Link
        to={`/projects/${id}`}
        className="inline-flex w-fit items-center gap-2.5 border border-ink px-6 py-4 font-sans text-[16px] font-bold leading-6 tracking-[0.8px] text-ink"
      >
        Check project Details
        <span className="relative size-6 shrink-0 overflow-hidden">
          <span className="absolute inset-[18.75%_12.5%]">
            <img
              alt=""
              className="block size-full max-w-none"
              src={SITE_IMAGES.projectsPageLinkArrow}
              decoding="async"
            />
          </span>
        </span>
      </Link>
    </article>
  );
}

export default function ProjectsPage() {
  const [rowA, rowB] = [PROJECTS.slice(0, 2), PROJECTS.slice(2, 4)];

  return (
    <div className="flex w-full flex-col bg-cream">
      <div className="w-full bg-cream pb-16 max-lg:pt-0 lg:pt-[50px] sm:pb-20 lg:pb-[80px]">
        <div className="flex w-full flex-col max-lg:gap-6 lg:gap-[100px]">
          <SiteNavBar active="projects" variant="page" />
          <div className={`${layoutShell}`}>
            <div className={`${layoutBand} flex flex-col items-center`}>
              <div className="flex w-full flex-col items-center gap-16 lg:gap-20">
              <h1
                className="w-full text-center font-serif font-extrabold leading-none text-ink"
                style={{
                  fontSize: "min(165px, max(2.5rem, calc((100vw - 2.5rem) / 6)))",
                }}
              >
                My Projects
              </h1>

              <div className="flex w-full flex-col gap-10">
                <p className="font-sans text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-normal text-black">
                  Case Stuides
                </p>
                <div className="flex flex-col gap-12 lg:gap-[60px]">
                  {[
                    rowA,
                    rowB,
                  ].map((pair, rowIdx) => (
                    <div
                      key={rowIdx}
                      className="flex w-full flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-[60px]"
                    >
                      {pair.map((p) => (
                        <ProjectCard key={p.id} {...p} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="contact" className="w-full bg-cream py-16 sm:py-[90px]">
        <div className={layoutShell}>
          <div className={`${layoutBand} flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-[60px]`}>
            <div className="flex w-full flex-1 flex-col gap-10 lg:justify-between">
              <div className="flex flex-col gap-4">
                <h2 className="font-serif text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1.08] text-ink">
                  Lets Make It Happen
                </h2>
                <p className="max-w-xl font-sans text-[18px] leading-8 text-subtitle">
                  Tell us about your idea. We&apos;ll discuss your needs, plan the approach, and start building something
                  great.
                </p>
              </div>
              <ContactInformation />
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
