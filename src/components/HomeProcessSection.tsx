/** “From Concept to Completion” — below the fold on home; lazy-loaded from HomePage. */

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

const layoutShell = "mx-auto box-border w-full max-w-[1440px] px-5 sm:px-8 lg:px-[100px]";
const layoutBand = "mx-auto w-full max-w-[1240px]";

export default function HomeProcessSection() {
  return (
    <section className="w-full bg-black py-16 [contain-intrinsic-size:auto_520px] [content-visibility:auto] sm:py-[90px]">
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
  );
}
