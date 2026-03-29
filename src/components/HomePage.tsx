import AboutMeSection from "./AboutMeSection";
import ContactInformation from "./ContactInformation";
import ContactForm from "./ContactForm";
import HeroSection from "./HeroSection";
import MyServicesSection from "./MyServicesSection";
import ProjectsSection from "./ProjectsSection";

const PROCESS: { step: string; title: string; body: string }[] = [
  {
    step: "[ 1 ]",
    title: "Discover & Research",
    body: "Conduct user interviews and audits to uncover core needs and real-world insights",
  },
  {
    step: "[ 2 ]",
    title: "Define & Strategy",
    body: "Translate research into personas and problem statements to set a clear project roadmap",
  },
  {
    step: "[ 3 ]",
    title: "Design & Prototype",
    body: "Build wireframes and interactive prototypes to map the journey before finalizing visuals.",
  },
  {
    step: "[ 4 ]",
    title: "Test & Deliver",
    body: "Validate the design through usability testing and provide developers with final assets.",
  },
];

/** 1440px shell, 100px horizontal inset → 1240px content band (matches other sections). */
const layoutShell = "mx-auto box-border w-full max-w-[1440px] px-5 sm:px-8 lg:px-[100px]";
const layoutBand = "mx-auto w-full max-w-[1240px]";

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <HeroSection />

      {/* About */}
      <AboutMeSection />

      <MyServicesSection />

      <ProjectsSection />

      {/* Process */}
      <section className="w-full bg-black py-16 sm:py-[90px]">
        <div className={layoutShell}>
          <div className={`${layoutBand} flex flex-col gap-12 sm:gap-20`}>
          <h2 className="w-full text-center font-serif text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-none text-mist">
            <span className="block">From Concept to </span>
            <span className="block">Completion</span>
          </h2>
          <div className="grid w-full grid-cols-1 border border-mist md:grid-cols-2 xl:grid-cols-4">
            {PROCESS.map((step) => (
              <div
                key={step.step}
                className="flex min-h-[280px] flex-col justify-between border-b border-mist p-5 font-sans text-mist last:border-b-0 md:border-b-0 md:[&:nth-child(-n+2)]:border-b md:[&:nth-child(odd)]:border-r xl:min-h-[451px] xl:border-b-0 xl:border-r xl:last:border-r-0"
              >
                <p className="text-[clamp(2rem,4vw,3rem)] leading-[56px]">{step.step}</p>
                <div className="mt-8 flex flex-col gap-4 xl:mt-0">
                  <p className="text-[clamp(1.5rem,2.5vw,2.5rem)] leading-none">{step.title}</p>
                  <p className="text-[16px] leading-normal xl:leading-[1.5]">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Contact */}
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
