/** Injects Cal.com's official bootstrap IIFE once (defines `window.Cal` and loads `embed.js`). */
const CAL_SCRIPT_SRC = "https://app.cal.com/embed/embed.js";
const MARKER = "data-cal-portfolio-bootstrap";

export function ensureCalEmbedBootstrap(): void {
  if (typeof window === "undefined") return;
  if ((window as unknown as { Cal?: unknown }).Cal) return;
  if (document.querySelector(`script[${MARKER}]`)) return;

  const s = document.createElement("script");
  s.type = "text/javascript";
  s.setAttribute(MARKER, "true");
  s.textContent = `(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "${CAL_SCRIPT_SRC}", "init");`;
  document.head.appendChild(s);
}
