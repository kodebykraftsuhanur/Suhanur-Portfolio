import { Routes, Route } from "react-router-dom";
import FooterSection from "./components/FooterSection";
import ContactMePage from "./components/ContactMePage";
import HomePage from "./components/HomePage";
import ProjectDetailsPage from "./components/ProjectDetailsPage";
import ProjectsPage from "./components/ProjectsPage";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    <main className="min-h-screen bg-cream text-ink antialiased">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/contact" element={<ContactMePage />} />
      </Routes>
      <FooterSection />
    </main>
  );
}
