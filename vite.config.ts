import type { OutputChunk } from "rollup";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/** Preload the app entry chunk so the parser can fetch it alongside react-vendor/router. */
function entryModulePreload(): Plugin {
  return {
    name: "entry-modulepreload",
    transformIndexHtml: {
      order: "post",
      handler(html, { bundle }) {
        if (!bundle) return html;
        const entry = Object.values(bundle).find(
          (item): item is OutputChunk => item.type === "chunk" && item.isEntry,
        );
        if (!entry?.fileName) return html;
        const tag = `\n    <link rel="modulepreload" crossorigin href="/${entry.fileName}">`;
        return html.replace("</title>", `</title>${tag}`);
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), entryModulePreload()],
  build: {
    cssMinify: true,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) {
            return "react-vendor";
          }
          if (id.includes("node_modules/react-router")) {
            return "router";
          }
          if (id.includes("node_modules/lenis")) {
            return "lenis";
          }
        },
      },
    },
  },
});
