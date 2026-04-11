import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/anton";
import "./index.css";
import App from "./App";
import { SmoothScrollRoot } from "./components/SmoothScrollRoot";
import { scheduleFontLoad } from "./lib/scheduleFontLoad";

if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

scheduleFontLoad();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SmoothScrollRoot>
        <App />
      </SmoothScrollRoot>
    </BrowserRouter>
  </StrictMode>
);
