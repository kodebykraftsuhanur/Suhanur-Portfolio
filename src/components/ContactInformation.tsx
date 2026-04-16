/** Contact email + phone — Figma "Contact Information" (630:246). Responsive: equal columns from `sm`, no squeezed phone column. */

const email = "mahinrahman2021@gmail.com";
const phoneDisplay = "+880 01850-334606";
const phoneTel = "+8801850334606";

export default function ContactInformation() {
  return (
    <div className="flex w-full max-w-[588px] flex-col overflow-hidden border border-black/50 sm:flex-row sm:items-stretch">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 px-4 py-8 leading-none sm:basis-0 sm:gap-4 sm:px-5 sm:py-10 lg:py-[50px]">
        <p className="font-anton text-[clamp(1.375rem,5vw,2.5rem)] font-bold leading-tight text-ink">
          Email
        </p>
        <a
          href={`mailto:${email}`}
          className="min-w-0 max-w-full break-words font-sans text-[clamp(0.9375rem,2.8vw,1.125rem)] font-normal leading-snug text-subtitle [overflow-wrap:anywhere]"
        >
          {email}
        </a>
      </div>

      <div className="h-px w-full shrink-0 bg-black/50 sm:hidden" aria-hidden />

      <div className="hidden w-px shrink-0 self-stretch bg-black/50 sm:block" aria-hidden />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 px-4 py-8 leading-none sm:basis-0 sm:gap-4 sm:px-5 sm:py-10 lg:py-[50px]">
        <p className="font-anton text-[clamp(1.375rem,5vw,2.5rem)] font-bold leading-tight text-ink">
          Phone
        </p>
        <a
          href={`tel:${phoneTel}`}
          className="min-w-0 max-w-full break-words font-sans text-[clamp(0.9375rem,2.8vw,1.125rem)] font-normal leading-snug text-subtitle [overflow-wrap:anywhere]"
        >
          {phoneDisplay}
        </a>
      </div>
    </div>
  );
}
