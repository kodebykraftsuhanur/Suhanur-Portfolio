import type { ImgHTMLAttributes, ReactElement } from "react";

export type PictureImgProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Classes on the `<picture>` wrapper (layout, e.g. `absolute inset-0` or `contents`). */
  pictureClassName?: string;
  /** Set false for SVG or other non-raster `src`. */
  rasterWebp?: boolean;
};

/**
 * Serves WebP when `src` is `.jpg`/`.jpeg`/`.png` and a sibling `.webp` exists (from `npm run optimize-images`).
 * Browsers fall back to `src` if the WebP is missing or unsupported.
 */
export function PictureImg({
  src,
  pictureClassName,
  rasterWebp = true,
  className,
  ...rest
}: PictureImgProps): ReactElement | null {
  if (src == null || typeof src !== "string") {
    return null;
  }

  const useWebp = rasterWebp && /\.(jpe?g|png)$/i.test(src);
  if (!useWebp) {
    const merged = [pictureClassName, className].filter(Boolean).join(" ").trim();
    return <img src={src} className={merged || undefined} {...rest} />;
  }

  const webpSrc = src.replace(/\.(jpe?g|png)$/i, ".webp");

  return (
    <picture className={pictureClassName}>
      <source type="image/webp" srcSet={webpSrc} />
      <img src={src} className={className} {...rest} />
    </picture>
  );
}
