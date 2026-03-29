/** Dedicated projects page — Figma "project" (663:543): nav + My Projects grid + contact + footer. */

import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";
import ContactInformation from "./ContactInformation";
import { SiteNavBar } from "./SiteNavBar";

const imgProjectImage = "https://www.figma.com/api/mcp/asset/acdaa451-9eb2-46fb-9ed9-45d43a504eb7";
const imgProjectImage1 = "https://www.figma.com/api/mcp/asset/af61b0a8-251a-4752-b4c4-4f1139cf763b";
const imgProjectImage2 = "https://www.figma.com/api/mcp/asset/52fda70f-0da4-4ac3-ba03-64f48ba49c9f";
const imgProjectImage3 = "https://www.figma.com/api/mcp/asset/3ad20599-aca7-4a1d-9513-759ed2a01ab8";
const imgLinkArrow = "https://www.figma.com/api/mcp/asset/8a501291-b65d-44ab-b8a0-170e1e22269f";

const layoutShell = "mx-auto box-border w-full max-w-[1440px] px-5 sm:px-8 lg:px-[100px]";
const layoutBand = "mx-auto w-full max-w-[1240px]";

const PROJECTS: { id: string; image: string; title: string; description: string }[] = [
  {
    id: "school-app",
    image: imgProjectImage,
    title: "School Management App",
    description:
      "An intuitive platform that streamlines school operations and improves communication between students and parents.",
  },
  {
    id: "school-dash",
    image: imgProjectImage1,
    title: "School Management Dashboard",
    description:
      "Designed to bridge the communication gap between parents and schools through real-time updates and insights.",
  },
  {
    id: "nursery-plant",
    image: imgProjectImage2,
    title: "Nursery App",
    description:
      "An all-in-one plant care platform for shopping, tracking, guidance, and booking home gardening services.",
  },
  {
    id: "nursery-mechanic",
    image: imgProjectImage3,
    title: "FIXORA",
    description:
      "A smart platform that connects users with nearby mechanics for quick, reliable, and hassle-free vehicle services.",
  },
];

function ProjectCard({ id, image, title, description }: (typeof PROJECTS)[0]) {
  return (
    <article className="flex min-h-0 min-w-0 flex-1 flex-col gap-6 border border-black bg-cream p-5">
      <div className="relative h-[min(402px,70vw)] w-full shrink-0 overflow-hidden bg-black sm:h-[402px]">
        <img alt="" className="size-full object-cover" src={image} />
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
            <img alt="" className="block size-full max-w-none" src={imgLinkArrow} />
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
      <div className="w-full bg-cream pb-16 pt-[50px] sm:pb-20 lg:pb-[80px]">
        <div className={`${layoutShell}`}>
          <div className={`${layoutBand} flex flex-col items-center gap-16 lg:gap-[100px]`}>
            <SiteNavBar active="projects" variant="page" />

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
