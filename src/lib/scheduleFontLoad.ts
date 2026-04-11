/**
 * Loads Fontsource CSS after first paint so it is not bundled into the render-blocking
 * entry CSS chunk (Tailwind + index.css only on the critical path).
 */
export function scheduleFontLoad(): void {
  if (typeof window === "undefined") return;

  const load = (): void => {
    void Promise.all([
      import("@fontsource/eb-garamond/latin-400.css"),
      import("@fontsource/eb-garamond/latin-700.css"),
      import("@fontsource/eb-garamond/latin-800.css"),
      import("@fontsource/inter/latin-400.css"),
      import("@fontsource/inter/latin-700.css"),
    ]);
  };

  const ric = window.requestIdleCallback;
  if (typeof ric === "function") {
    ric.call(window, load, { timeout: 2500 });
  } else {
    window.setTimeout(load, 0);
  }
}
