/**
 * Footer — Figma [742:818](https://www.figma.com/design/NWuQSkecf49B0xVq3XR6Z5/Figmafolio?node-id=742-818)
 */

import { Link } from "react-router-dom";

const imgWordmark =
  "https://www.figma.com/api/mcp/asset/d1c0e636-74d3-4a42-80b6-5779bc3be6c5";

const imgDribbble0 = "https://www.figma.com/api/mcp/asset/7144508c-a995-4b00-9f33-28f0a3fea0c5";
const imgDribbble1 = "https://www.figma.com/api/mcp/asset/73cbfe5e-e895-475d-9a4c-d2a8158194c8";
const imgDribbble2 = "https://www.figma.com/api/mcp/asset/f72e76fb-777d-4804-901a-8704541d7195";
const imgDribbble3 = "https://www.figma.com/api/mcp/asset/3a9e62c3-190e-4f34-9540-cee6c7f1e45c";
const imgLinkedin0 = "https://www.figma.com/api/mcp/asset/bd2d1839-f029-406a-b82a-2663b584ccb5";
const imgLinkedin1 = "https://www.figma.com/api/mcp/asset/7c8686e6-a812-4f2c-aaba-2d9086899fa5";
const imgLinkedin2 = "https://www.figma.com/api/mcp/asset/7bc9b216-fd74-4785-b7fa-72e0db5009ad";
const imgBehance0 = "https://www.figma.com/api/mcp/asset/12325e0d-4756-4698-8bae-8a6c27913d2c";
const imgBehance1 = "https://www.figma.com/api/mcp/asset/02cb92b3-189a-4a24-bb63-7d0e33626157";

function BehanceIcon() {
  return (
    <div className="relative size-6">
      <div className="absolute inset-[20.83%_54.17%_20.83%_8.33%]">
        <div className="absolute inset-[-5.36%_-8.33%]">
          <img alt="" className="block size-full max-w-none" src={imgBehance0} />
        </div>
      </div>
      <div className="absolute inset-[29.17%_8.33%_20.83%_58.33%]">
        <div className="absolute inset-[-6.25%_-9.38%]">
          <img alt="" className="block size-full max-w-none" src={imgBehance1} />
        </div>
      </div>
    </div>
  );
}

function LinkedinIcon() {
  return (
    <div className="relative size-6">
      <div className="absolute inset-[39.58%_72.92%_8.33%_8.33%]">
        <div className="absolute inset-[-6%_-16.67%]">
          <img alt="" className="block size-full max-w-none" src={imgLinkedin0} />
        </div>
      </div>
      <div className="absolute inset-[8.33%_72.92%_72.92%_8.33%]">
        <div className="absolute inset-[-16.67%]">
          <img alt="" className="block size-full max-w-none" src={imgLinkedin1} />
        </div>
      </div>
      <div className="absolute inset-[39.58%_8.33%_8.33%_39.58%]">
        <div className="absolute inset-[-6%]">
          <img alt="" className="block size-full max-w-none" src={imgLinkedin2} />
        </div>
      </div>
    </div>
  );
}

function DribbbleIcon() {
  return (
    <div className="relative size-6">
      <div className="absolute inset-[8.33%]">
        <div className="absolute inset-[-3.75%]">
          <img alt="" className="block size-full max-w-none" src={imgDribbble0} />
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-1/4 right-[8.33%] top-[54.17%]">
        <div className="absolute inset-[-10.71%_-0.86%_-6.22%_-3.82%]">
          <img alt="" className="block size-full max-w-none" src={imgDribbble1} />
        </div>
      </div>
      <div className="absolute inset-[20.83%_20.83%_54.17%_8.33%]">
        <div className="absolute inset-[-8.11%_-3.36%_-12.5%_-0.99%]">
          <img alt="" className="block size-full max-w-none" src={imgDribbble2} />
        </div>
      </div>
      <div className="absolute inset-[12.5%_37.5%_8.33%_29.17%]">
        <div className="absolute inset-[-3.25%_-9.37%_-0.8%_-5.34%]">
          <img alt="" className="block size-full max-w-none" src={imgDribbble3} />
        </div>
      </div>
    </div>
  );
}

const navLinkClass =
  "whitespace-nowrap font-sans text-[20px] font-bold leading-7 tracking-[0.48px] text-mist transition-opacity hover:opacity-80 sm:text-2xl sm:leading-7";

const socialClass =
  "flex size-14 shrink-0 items-center justify-center bg-sand p-4 transition-opacity hover:opacity-90";

export default function FooterSection() {
  return (
    <footer className="w-full bg-black py-16 sm:py-[90px]">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[100px]">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-[60px]">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <nav className="flex flex-wrap items-center gap-8 sm:gap-[60px]" aria-label="Footer">
              <Link to="/" className={navLinkClass}>
                Home
              </Link>
              <Link to="/projects" className={navLinkClass}>
                Projects
              </Link>
              <Link to="/contact" className={navLinkClass}>
                Contact Me
              </Link>
            </nav>
            <div className="flex gap-6">
              <a href="#" className={socialClass} aria-label="Behance">
                <BehanceIcon />
              </a>
              <a href="#" className={socialClass} aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
              <a href="#" className={socialClass} aria-label="Dribbble">
                <DribbbleIcon />
              </a>
            </div>
          </div>

          <div className="flex w-full min-w-0 justify-center">
            <img
              src={imgWordmark}
              alt="SUHANUR"
              width={1233}
              height={297}
              className="h-auto w-full max-w-[1233px] select-none"
              decoding="async"
              loading="lazy"
              sizes="(min-width: 1240px) 1233px, 100vw"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
