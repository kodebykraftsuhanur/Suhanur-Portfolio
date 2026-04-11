import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type SlideCtaLinkProps = Omit<LinkProps, "className" | "children"> & {
  className: string;
  /** Tailwind / classes for the row inside each layer (e.g. `gap-2.5`, `w-full justify-between`). */
  layerClassName: string;
  children: ReactNode;
};

/** Router link with two-layer vertical slide on hover (`.slide-cta-*` in `index.css`). */
export function SlideCtaLink({ className, layerClassName, children, ...rest }: SlideCtaLinkProps) {
  return (
    <Link {...rest} className={`slide-cta-btn ${className}`.trim()}>
      <div className="slide-cta-track">
        <div className={`slide-cta-layer flex items-center ${layerClassName}`.trim()}>{children}</div>
        <div className={`slide-cta-layer flex items-center ${layerClassName}`.trim()} aria-hidden>
          {children}
        </div>
      </div>
    </Link>
  );
}

type SlideCtaButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
  className: string;
  layerClassName: string;
  children: ReactNode;
};

/** Native button with the same slide treatment (submit CTAs, etc.). */
export function SlideCtaButton({
  className,
  layerClassName,
  children,
  type = "button",
  ...rest
}: SlideCtaButtonProps) {
  return (
    <button type={type} {...rest} className={`slide-cta-btn ${className}`.trim()}>
      <div className="slide-cta-track">
        <div className={`slide-cta-layer flex items-center ${layerClassName}`.trim()}>{children}</div>
        <div className={`slide-cta-layer flex items-center ${layerClassName}`.trim()} aria-hidden>
          {children}
        </div>
      </div>
    </button>
  );
}

type SlideTextLinkProps = Omit<LinkProps, "className" | "children"> & {
  className: string;
  children: ReactNode;
};

/** Router link: duplicated label, vertical slide on hover (`.slide-text-*` in `index.css`). */
export function SlideTextLink({ className, children, ...rest }: SlideTextLinkProps) {
  return (
    <Link {...rest} className={`slide-text-link ${className}`.trim()}>
      <div className="slide-text-track">
        <div className="slide-text-layer">{children}</div>
        <div className="slide-text-layer" aria-hidden>
          {children}
        </div>
      </div>
    </Link>
  );
}
