/**
 * Run Vercel CLI via Node (avoids PowerShell blocking npm.ps1 / global vercel.ps1).
 * Usage: node scripts/run-vercel.mjs [--prod] [other vercel args...]
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { existsSync } from "node:fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const vc = path.join(root, "node_modules", "vercel", "dist", "vc.js");

if (!existsSync(vc)) {
  console.error("Vercel CLI not found. Run: npm install");
  process.exit(1);
}

const args = process.argv.slice(2);
const r = spawnSync(process.execPath, [vc, ...args], {
  stdio: "inherit",
  cwd: root,
  env: process.env,
  shell: false,
});

process.exit(r.status ?? 1);
