/** About Me — matches Figma frame (node 619:435). */

export default function AboutMeSection() {
  return (
    <section className="w-full bg-black py-16 [contain-intrinsic-size:auto_480px] [content-visibility:auto] sm:py-[90px]">
      <div className="mx-auto box-border w-full max-w-[1440px] px-5 sm:px-8 lg:px-[100px]">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center gap-10 text-center text-mist sm:gap-16 lg:gap-[80px]">
        <h2 className="w-full font-serif text-[clamp(2.5rem,8vw,6rem)] font-extrabold leading-none lg:text-[96px]">
          About Me
        </h2>
        <div className="w-full space-y-8 font-sans text-[18px] font-normal leading-8 md:text-[24px] md:leading-[32px]">
          <p>
            I would describe myself as a thoughtful UI/UX designer focused on clarity, simplicity, and real user needs.
            Over the past year, I’ve been actively working on multiple real-world projects, including school management
            systems, a plant care app, Fixora, and many landing page shots. My approach to design is
            rooted in problem-solving, where I aim to create intuitive and meaningful digital experiences rather than
            just visually appealing interfaces.
          </p>
          <p>
            My journey into design has been driven by curiosity and a constant desire to improve how users interact with
            products. I follow structured processes like the Double Diamond method to ensure every decision is
            intentional and user-centered. I’ve worked across mobile and web platforms, focusing on usability, clean UI,
            and modern interaction patterns. As I continue to grow, I’m refining my skills to reach a higher level of
            design excellence and create impactful, high-quality digital products.
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}
