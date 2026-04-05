/** Case-study closing mockup. Change `CASE_STUDY_FINAL_MOCKUP_SRC` (and optional `CASE_STUDY_FINAL_MOCKUP_ALT`) to swap assets. */

import { PictureImg } from "./PictureImg";

export const CASE_STUDY_FINAL_MOCKUP_SRC = "/amader-school-mockup.png";

export const CASE_STUDY_FINAL_MOCKUP_ALT =
  "Amader School app mockup with three phone screens";

/** Design-width reference for layout / `sizes` (image scales down fluidly below this). */
export const CASE_STUDY_FINAL_MOCKUP_WIDTH = 1240 as const;

export function CaseStudyFinalMockup() {
  return (
    <PictureImg
      src={CASE_STUDY_FINAL_MOCKUP_SRC}
      alt={CASE_STUDY_FINAL_MOCKUP_ALT}
      width={CASE_STUDY_FINAL_MOCKUP_WIDTH}
      height={806}
      pictureClassName="block w-full max-w-[1240px]"
      className="block h-auto min-w-0 w-full max-w-[1240px]"
      decoding="async"
      loading="lazy"
      sizes="(min-width: 1240px) 1240px, 100vw"
    />
  );
}
