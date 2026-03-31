import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import FooterSection from "./components/FooterSection";
import { ScrollToTop } from "./components/ScrollToTop";

const HomePage = lazy(() => import("./components/HomePage"));
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
      <FooterSection />
    </main>
  );
}
