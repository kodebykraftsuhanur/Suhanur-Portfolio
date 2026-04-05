import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import { ScrollToTop } from "./components/ScrollToTop";

const FooterSection = lazy(() => import("./components/FooterSection"));
/** Home is eager so the LCP hero is not blocked behind a lazy chunk. */
const ProjectsPage = lazy(() => import("./components/ProjectsPage"));
const ProjectDetailsPage = lazy(() => import("./components/ProjectDetailsPage"));
const ContactMePage = lazy(() => import("./components/ContactMePage"));

export default function App() {
  return (
    <main className="min-h-screen bg-cream text-ink antialiased">
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-cream" aria-hidden />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
          <Route path="/contact" element={<ContactMePage />} />
        </Routes>
      </Suspense>
      <Suspense fallback={null}>
        <FooterSection />
      </Suspense>
    </main>
  );
}
