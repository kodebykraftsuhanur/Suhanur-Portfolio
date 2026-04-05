import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/eb-garamond/latin-700.css";
import "@fontsource/eb-garamond/latin-800.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-700.css";
import "./index.css";
import App from "./App";
import { SmoothScrollRoot } from "./components/SmoothScrollRoot";

if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SmoothScrollRoot>
        <App />
      </SmoothScrollRoot>
    </BrowserRouter>
  </StrictMode>
);
