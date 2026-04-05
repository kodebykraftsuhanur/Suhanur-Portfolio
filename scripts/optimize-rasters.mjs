/**
 * Raster pipeline under public/:
 * - Hero (images/hero-portrait.jpg): responsive AVIF + WebP (400w, 726w, 1088w) for LCP + srcset.
 * - Other JPG/PNG: max edge 1920px, sibling .webp + .avif when smaller than source.
 *
 * Run: npm run optimize-images
 */
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

const MAX_EDGE_DEFAULT = 1920;
const HERO_REL = path.join("images", "hero-portrait.jpg");
const HERO_WIDTHS = [400, 726, 1088];
/** Target ~≤200 KB per hero variant where possible */
const HERO_WEBP_Q = 68;
const HERO_AVIF_Q = 42;
const DEFAULT_WEBP_Q = 76;
const DEFAULT_AVIF_Q = 46;

async function collectRasterFiles(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      await collectRasterFiles(full, acc);
    } else if (/\.(jpe?g|png)$/i.test(e.name) && !/\.(webp|avif)$/i.test(e.name)) {
      acc.push(full);
    }
  }
  return acc;
}

async function optimizeHeroPortrait(absPath) {
  const dir = path.dirname(absPath);
  const baseName = "hero-portrait";
  const meta = await sharp(absPath).metadata();
  const inStat = await stat(absPath);

  const legacyWebp = path.join(dir, `${baseName}.webp`);
  try {
    await unlink(legacyWebp);
    console.log(`${path.relative(publicDir, legacyWebp)} — removed (replaced by responsive variants)`);
  } catch {
    /* absent */
  }

  const resizeOpts = (w) => ({
    width: w,
    fit: "inside",
    withoutEnlargement: true,
  });

  for (const w of HERO_WIDTHS) {
    if (!meta.width || w > meta.width) {
      continue;
    }

    const webpPath = path.join(dir, `${baseName}-${w}.webp`);
    await sharp(absPath).rotate().resize(resizeOpts(w)).webp({ quality: HERO_WEBP_Q, effort: 6 }).toFile(webpPath);
    const webpStat = await stat(webpPath);
    console.log(
      `${path.relative(publicDir, webpPath)} (${(webpStat.size / 1024).toFixed(1)} KB)`,
    );

    const avifPath = path.join(dir, `${baseName}-${w}.avif`);
    await sharp(absPath).rotate().resize(resizeOpts(w)).avif({ quality: HERO_AVIF_Q, effort: 4 }).toFile(avifPath);
    const avifStat = await stat(avifPath);
    console.log(
      `${path.relative(publicDir, avifPath)} (${(avifStat.size / 1024).toFixed(1)} KB)`,
    );
  }

  console.log(
    `hero source ${path.relative(publicDir, absPath)} (${(inStat.size / 1024).toFixed(0)} KB) — responsive derivatives done`,
  );
}

async function optimizeStandardRaster(input) {
  const parsed = path.parse(input);
  const meta = await sharp(input).metadata();
  const pipeline = sharp(input).rotate();

  if (meta.width && meta.height) {
    const maxDim = Math.max(meta.width, meta.height);
    if (maxDim > MAX_EDGE_DEFAULT) {
      pipeline.resize({
        width: meta.width >= meta.height ? MAX_EDGE_DEFAULT : undefined,
        height: meta.height > meta.width ? MAX_EDGE_DEFAULT : undefined,
        fit: "inside",
        withoutEnlargement: true,
      });
    }
  }

  const inStat = await stat(input);

  const webpPath = path.join(parsed.dir, `${parsed.name}.webp`);
  await pipeline.clone().webp({ quality: DEFAULT_WEBP_Q, effort: 6 }).toFile(webpPath);
  const webpStat = await stat(webpPath);
  if (webpStat.size >= inStat.size) {
    await unlink(webpPath);
    console.log(
      `${path.relative(publicDir, input)} — skipped WebP (not smaller than source, ${(inStat.size / 1024).toFixed(0)} KB)`,
    );
  } else {
    console.log(
      `${path.relative(publicDir, input)} → ${path.relative(publicDir, webpPath)} (${(inStat.size / 1024).toFixed(0)} KB → ${(webpStat.size / 1024).toFixed(0)} KB)`,
    );
  }

  const avifPath = path.join(parsed.dir, `${parsed.name}.avif`);
  await pipeline.clone().avif({ quality: DEFAULT_AVIF_Q, effort: 4 }).toFile(avifPath);
  const avifStat = await stat(avifPath);
  if (avifStat.size >= inStat.size) {
    await unlink(avifPath);
    console.log(
      `${path.relative(publicDir, input)} — skipped AVIF (not smaller than source)`,
    );
  } else {
    console.log(
      `${path.relative(publicDir, input)} → ${path.relative(publicDir, avifPath)} (${(inStat.size / 1024).toFixed(0)} KB → ${(avifStat.size / 1024).toFixed(0)} KB)`,
    );
  }
}

async function main() {
  const files = await collectRasterFiles(publicDir);
  if (files.length === 0) {
    console.log("No raster images found under public/");
    return;
  }

  const heroAbs = path.join(publicDir, HERO_REL);
  const heroNorm = path.normalize(heroAbs);

  for (const input of files) {
    if (path.normalize(input) === heroNorm) {
      await optimizeHeroPortrait(input);
    } else {
      await optimizeStandardRaster(input);
    }
  }
}

await main();
