/** Contact form — Figma "Contact" (630:144). Dropdown row + chevron per Form Item (630:150). */

import type { ReactNode } from "react";
import { SITE_IMAGES } from "../assets/siteImages";

const fieldBase =
  "w-full border-b border-mist bg-transparent py-2 text-[18px] leading-8 text-mist focus:outline-none focus:ring-0";
const placeholderClass = "placeholder:text-[rgba(245,235,208,0.5)]";
const labelClass = "text-[20px] font-bold leading-8 tracking-[1px] text-mist";

/** Native select: mist on pine when closed; light menu with ink text (fixes white-on-white lists). */
const selectMenu =
  "min-w-0 flex-1 cursor-pointer appearance-none border-0 bg-transparent py-2 pl-0 pr-2 text-[18px] leading-8 text-mist [color-scheme:light] focus:outline-none focus:ring-0 " +
  "[&_option]:bg-cream [&_option]:text-ink [&_optgroup]:bg-cream [&_optgroup]:text-ink";

function SelectRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-center justify-between gap-2 border-b border-mist py-2">
      {children}
    </div>
  );
}

/** Chevron from Figma arrow-down-01 (630:150 → I630:150;2255:1190). */
function SelectChevron() {
  return (
    <div className="pointer-events-none relative size-6 shrink-0" aria-hidden>
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <img alt="" className="block size-full max-w-none" src={SITE_IMAGES.contactChevron} decoding="async" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

export default function ContactForm() {
  return (
    <form
      className="flex w-full flex-1 flex-col gap-10 bg-pine p-5 font-sans"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="flex w-full flex-col gap-4">
        <span className={labelClass}>Full Name</span>
        <input
          name="fullName"
          autoComplete="name"
          placeholder="Your Name"
          className={`${fieldBase} ${placeholderClass}`}
        />
      </label>

      <div className="flex w-full flex-col gap-10 sm:flex-row sm:gap-10">
        <label className="flex min-w-0 flex-1 flex-col gap-4">
          <span className={labelClass}>Company Name</span>
          <input
            name="company"
            autoComplete="organization"
            placeholder="Your Company Name"
            className={`${fieldBase} ${placeholderClass}`}
          />
        </label>
        <label className="flex min-w-0 flex-1 flex-col gap-4">
          <span className={labelClass}>Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="yourmail@gmail.com"
            className={`${fieldBase} ${placeholderClass}`}
          />
        </label>
      </div>

      <div className="flex w-full flex-col gap-10 sm:flex-row sm:gap-10">
        <label className="flex min-w-0 flex-1 flex-col gap-4">
          <span className={labelClass}>Service Required</span>
          <SelectRow>
            <select name="service" defaultValue="" className={selectMenu}>
              <option value="">Select Your Service</option>
              <optgroup label="Design & delivery">
                <option value="product-design">Product Design</option>
                <option value="website-design">Website Design</option>
                <option value="design-system">Design System</option>
              </optgroup>
              <optgroup label="Research, prototyping & testing">
                <option value="wireframing">Wireframing &amp; Prototyping</option>
                <option value="ux-research">UX Research &amp; Strategy</option>
                <option value="usability-testing">Usability Testing</option>
              </optgroup>
              <option value="other">Other / not sure yet</option>
            </select>
            <SelectChevron />
          </SelectRow>
        </label>
        <label className="flex min-w-0 flex-1 flex-col gap-4">
          <span className={labelClass}>Project Budget</span>
          <SelectRow>
            <select name="budget" defaultValue="" className={selectMenu}>
              <option value="">Select Your Budget</option>
              <option value="small">Under $2k</option>
              <option value="medium">$2k – $10k</option>
              <option value="large">$10k+</option>
            </select>
            <SelectChevron />
          </SelectRow>
        </label>
      </div>

      <label className="flex w-full flex-col gap-4">
        <span className={labelClass}>Project Details</span>
        <textarea
          name="details"
          rows={3}
          placeholder="Describe your project"
          className={`${fieldBase} ${placeholderClass} resize-none pb-10`}
        />
      </label>

      <button
        type="submit"
        className="flex w-full items-center justify-between bg-cream px-6 py-4 text-left font-sans text-[20px] font-bold leading-9 tracking-[1px] text-ink"
      >
        Submit Request
        <span className="relative size-9 shrink-0 overflow-hidden">
          <span className="absolute inset-[18.75%_12.5%]">
            <img
              alt=""
              className="block size-full max-w-none"
              src={SITE_IMAGES.contactSubmitArrow}
              decoding="async"
              loading="lazy"
            />
          </span>
        </span>
      </button>
    </form>
  );
}
