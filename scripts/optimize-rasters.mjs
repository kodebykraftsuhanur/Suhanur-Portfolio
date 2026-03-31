/**
 * Generates .webp siblings for JPG/PNG under public/ (max dimension 2560px, quality 82).
 * Run: npm run optimize-images
 */
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

const MAX_EDGE = 2560;
const WEBP_QUALITY = 82;

async function collectRasterFiles(dir, acc = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      await collectRasterFiles(full, acc);
    } else if (/\.(jpe?g|png)$/i.test(e.name) && !/\.webp$/i.test(e.name)) {
      acc.push(full);
    }
  }
  return acc;
}

async function main() {
  const files = await collectRasterFiles(publicDir);
  if (files.length === 0) {
    console.log("No raster images found under public/");
    return;
  }

  for (const input of files) {
    const parsed = path.parse(input);
    const outPath = path.join(parsed.dir, `${parsed.name}.webp`);
    const meta = await sharp(input).metadata();
    const pipeline = sharp(input).rotate();

    if (meta.width && meta.height) {
      const maxDim = Math.max(meta.width, meta.height);
      if (maxDim > MAX_EDGE) {
        pipeline.resize({
          width: meta.width >= meta.height ? MAX_EDGE : undefined,
          height: meta.height > meta.width ? MAX_EDGE : undefined,
          fit: "inside",
          withoutEnlargement: true,
        });
      }
    }

    await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outPath);
    const inStat = await stat(input);
    const outStat = await stat(outPath);
    if (outStat.size >= inStat.size) {
      await unlink(outPath);
      console.log(
        `${path.relative(publicDir, input)} — skipped WebP (not smaller than source, ${(inStat.size / 1024).toFixed(0)} KB)`,
      );
      continue;
    }
    console.log(
      `${path.relative(publicDir, input)} → ${path.relative(publicDir, outPath)} (${(inStat.size / 1024).toFixed(0)} KB → ${(outStat.size / 1024).toFixed(0)} KB)`,
    );
  }
}

await main();
