import type { ImgHTMLAttributes, ReactElement } from "react";

export type PictureImgProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Classes on the `<picture>` wrapper (layout, e.g. `absolute inset-0` or `contents`). */
  pictureClassName?: string;
  /** Set false for SVG or other non-raster `src`. */
  rasterWebp?: boolean;
  /** Set false to skip `<source type="image/avif">` (e.g. no generated sibling). */
  rasterAvif?: boolean;
};

/**
 * Serves AVIF + WebP when siblings exist (`npm run optimize-images`), then original `src`.
 * Non-critical images should set `loading="lazy"`.
 */
export function PictureImg({
  src,
  pictureClassName,
  rasterWebp = true,
  rasterAvif = true,
  className,
  sizes,
  ...rest
}: PictureImgProps): ReactElement | null {
  if (src == null || typeof src !== "string") {
    return null;
  }

  const isRaster = /\.(jpe?g|png)$/i.test(src);
  const useWebp = rasterWebp && isRaster;
  const useAvif = rasterWebp && rasterAvif && isRaster;

  if (!useWebp) {
    const merged = [pictureClassName, className].filter(Boolean).join(" ").trim();
    return <img src={src} className={merged || undefined} sizes={sizes} {...rest} />;
  }

  const webpSrc = src.replace(/\.(jpe?g|png)$/i, ".webp");
  const avifSrc = src.replace(/\.(jpe?g|png)$/i, ".avif");

  return (
    <picture className={pictureClassName}>
      {useAvif ? <source type="image/avif" srcSet={avifSrc} sizes={sizes} /> : null}
      <source type="image/webp" srcSet={webpSrc} sizes={sizes} />
      <img src={src} className={className} sizes={sizes} {...rest} />
    </picture>
  );
}
