/**
 * Static image URLs under `public/images/`.
 * Hosting assets locally avoids Figma MCP CDN latency and improves cache behavior.
 */
import { HERO_CTA_ARROW, HERO_PORTRAIT_FALLBACK } from "./pathsHero";
import { NAV_ELLIPSE_HOME, NAV_ELLIPSE_PROJECTS } from "./pathsNav";

export const SITE_IMAGES = {
  /** WebP fallback for `<picture>` (avoids a redundant full-size JPG fetch on modern browsers). */
  heroPortrait: HERO_PORTRAIT_FALLBACK,
  heroCtaArrow: HERO_CTA_ARROW,
  navEllipseHome: NAV_ELLIPSE_HOME,
  navEllipseProjects: NAV_ELLIPSE_PROJECTS,
  homeProjectSchool: "/images/home-project-school.png",
  homeProjectDash: "/images/home-project-dash.png",
  homeProjectFixora: "/images/home-project-fixora.png",
  homeProjectNursery: "/images/home-project-nursery.png",
  projectsCtaArrow: "/images/projects-cta-arrow.svg",
  projectsPageSchool: "/images/projects-page-school.png",
  projectsPageDash: "/images/projects-page-dash.png",
  projectsPageNursery: "/images/projects-page-nursery.png",
  projectsPageMechanic: "/images/projects-page-mechanic.png",
  projectsPageLinkArrow: "/images/projects-page-link-arrow.svg",
  caseProcessArrow1: "/images/case-process-arrow-1.svg",
  caseProcessArrow2: "/images/case-process-arrow-2.svg",
  caseLinkArrow: "/images/case-link-arrow.svg",
  caseWide: "/images/case-wide.jpg",
  caseHandBg: "/images/case-hand-bg.jpg",
  caseHandPhone: "/images/case-hand-phone.png",
  unavailableCtaIcon: "/images/unavailable-cta-icon.svg",
  contactChevron: "/images/contact-chevron.svg",
  contactSubmitArrow: "/images/contact-submit-arrow.svg",
  servicesPlus: "/images/services-plus.svg",
  footerMark: "/images/footer-mark.svg",
  footerDribbble0: "/images/footer-dribbble-0.svg",
  footerDribbble1: "/images/footer-dribbble-1.svg",
  footerDribbble2: "/images/footer-dribbble-2.svg",
  footerDribbble3: "/images/footer-dribbble-3.svg",
  footerLinkedin0: "/images/footer-linkedin-0.svg",
  footerLinkedin1: "/images/footer-linkedin-1.svg",
  footerLinkedin2: "/images/footer-linkedin-2.svg",
  footerBehance0: "/images/footer-behance-0.svg",
  footerBehance1: "/images/footer-behance-1.svg",
} as const;
