/**
 * Case-study content per `/projects/:projectId`.
 * Use `image: null` for media slots — renders empty placeholder frames until assets exist.
 */

import { SITE_IMAGES } from "../assets/siteImages";

export type CaseHeroMetaItem = {
  label: string;
  value: string;
  href?: string;
  mutedDesktopLabel?: boolean;
};

/** `null` = empty placeholder (same layout, no image). */
export type CaseStudyImages = {
  hero: string | null;
  wide: string | null;
  /** Hand section: bg + phone overlay; both null → single empty frame. */
  handBg: string | null;
  handPhone: string | null;
  /** Final wide mockup; null → placeholder block. */
  finalMockup: string | null;
};

export type ProjectCaseStudyConfig = {
  id: string;
  title: string;
  images: CaseStudyImages;
  heroMeta: readonly CaseHeroMetaItem[];
  about: string;
  problems: string;
  solutions: string;
};

const PLACEHOLDER_ABOUT =
  "Case study copy for this project will be added here. The layout matches the primary project template so you can drop in final narrative, metrics, and outcomes when ready.";

const PLACEHOLDER_PROBLEMS =
  "Problem framing and user pain points for this product will be documented in this section — research insights, constraints, and why the work mattered.";

const PLACEHOLDER_SOLUTIONS =
  "Solution overview, key UX decisions, and how the design addresses the problems above will be summarized here once the case study is finalized.";

export const PROJECT_CASE_STUDIES: Record<string, ProjectCaseStudyConfig> = {
  "school-app": {
    id: "school-app",
    title: "Amader School",
    images: {
      hero: "/amader-school-hero.png",
      wide: SITE_IMAGES.caseWide,
      handBg: SITE_IMAGES.caseHandBg,
      handPhone: SITE_IMAGES.caseHandPhone,
      finalMockup: "/amader-school-mockup.png",
    },
    heroMeta: [
      { label: "PROJECT", value: "Amader School" },
      { label: "PLATFORM", value: "Mobile App" },
      { label: "INDUSTRY", value: "Mobile App" },
      { label: "TIMELINE", value: "7 Weeks" },
      {
        label: "BEHANCE LINK",
        value: "Full Case study",
        href: "https://www.behance.net/gallery/236808197/Amader-School-School-Management-App-Case-Study",
        mutedDesktopLabel: true,
      },
    ],
    about:
      "Amader School is a modern school management app designed to help students and parents stay organized, informed, and connected. It simplifies academic activities by bringing everything into one place — from progress tracking and task management to real-time updates and communication. Focused on clarity and usability, the app creates a smooth and intuitive school experience",
    problems:
      "Parents often miss important homework and assignment updates when children fail to communicate them, leading to gaps in academic awareness. Communication between parents and teachers is frequently delayed or inefficient, making it harder to stay aligned on a student’s progress. Additionally, there is a lack of real-time access to class schedules, academic performance, and important announcements. As a result, parents have to rely on delayed reports, such as printed report cards, which prevents them from monitoring their child’s progress in a timely manner.",
    solutions:
      "Parents stay fully informed through a Digital Homework Update system that delivers instant assignment notifications directly to the app. To eliminate communication delays, Instant Messaging allows for quick, direct dialogue between parents and teachers, ensuring everyone remains aligned on student needs. Furthermore, the platform provides Real-Time Academic Tracking, giving parents live access to schedules and school announcements. Finally, Instant Academic Performance Results allow for the immediate viewing of marks and progress reports as soon as they are published, replacing the need for delayed, printed report cards.",
  },

  "school-dash": {
    id: "school-dash",
    title: "School Management Dashboard",
    images: {
      hero: null,
      wide: null,
      handBg: null,
      handPhone: null,
      finalMockup: null,
    },
    heroMeta: [
      { label: "PROJECT", value: "School Management Dashboard" },
      { label: "PLATFORM", value: "Web Dashboard" },
      { label: "INDUSTRY", value: "Education" },
      { label: "TIMELINE", value: "—" },
      { label: "BEHANCE LINK", value: "Coming soon", mutedDesktopLabel: true },
    ],
    about: PLACEHOLDER_ABOUT,
    problems: PLACEHOLDER_PROBLEMS,
    solutions: PLACEHOLDER_SOLUTIONS,
  },

  "nursery-plant": {
    id: "nursery-plant",
    title: "Nursery App",
    images: {
      hero: null,
      wide: null,
      handBg: null,
      handPhone: null,
      finalMockup: null,
    },
    heroMeta: [
      { label: "PROJECT", value: "Nursery App" },
      { label: "PLATFORM", value: "Mobile App" },
      { label: "INDUSTRY", value: "Lifestyle / Retail" },
      { label: "TIMELINE", value: "—" },
      { label: "BEHANCE LINK", value: "Coming soon", mutedDesktopLabel: true },
    ],
    about: PLACEHOLDER_ABOUT,
    problems: PLACEHOLDER_PROBLEMS,
    solutions: PLACEHOLDER_SOLUTIONS,
  },

  "nursery-mechanic": {
    id: "nursery-mechanic",
    title: "FIXORA",
    images: {
      hero: null,
      wide: null,
      handBg: null,
      handPhone: null,
      finalMockup: null,
    },
    heroMeta: [
      { label: "PROJECT", value: "FIXORA" },
      { label: "PLATFORM", value: "Mobile App" },
      { label: "INDUSTRY", value: "Automotive / Services" },
      { label: "TIMELINE", value: "—" },
      { label: "BEHANCE LINK", value: "Coming soon", mutedDesktopLabel: true },
    ],
    about: PLACEHOLDER_ABOUT,
    problems: PLACEHOLDER_PROBLEMS,
    solutions: PLACEHOLDER_SOLUTIONS,
  },
};

export const CASE_STUDY_IDS = new Set(Object.keys(PROJECT_CASE_STUDIES));
