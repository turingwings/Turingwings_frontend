import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Evolution from "./components/Evolution";
import Stack from "./components/Stack";
import BuildWithAI from "./components/BuildWithAI";
import Cohorts from "./components/Cohorts";
import WhyTuringWings from "./components/WhyTuringWings";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import BuildathonsPage from "./pages/BuildathonsPage";
import EventPortalPage from "./pages/EventPortalPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import CohortsListPage from "./pages/CohortsListPage";
import AiEngineeringCohortPage from "./pages/AiEngineeringCohortPage";
import AiCybersecurityCohortPage from "./pages/AiCybersecurityCohortPage";
import CohortRegistrationPage from "./pages/CohortRegistrationPage";
import NotFoundPage from "./pages/NotFoundPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <main className="bg-[#050505] text-white overflow-x-hidden selection:bg-[#22C55E] selection:text-black">
      <Navbar />
      <Hero />
      <Evolution />
      <Stack />
      <BuildWithAI />
      <Cohorts />
      <WhyTuringWings />
      <Footer />
    </main>
  );
}

export default function App() {
  // Global Image Protection: Disable right-click & drag on images
  useEffect(() => {
    const handleContextMenu = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
      }
    };
    const handleDragStart = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Main Website Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/programs" element={<CohortsListPage />} />
        <Route path="/community" element={<HomePage />} />
        <Route path="/buildathons" element={<BuildathonsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />

        {/* Flagship Cohorts Routes */}
        <Route path="/cohorts" element={<CohortsListPage />} />
        <Route path="/cohorts/ai-engineering" element={<AiEngineeringCohortPage />} />
        <Route path="/cohorts/ai-cybersecurity" element={<AiCybersecurityCohortPage />} />
        <Route path="/cohorts/register" element={<CohortRegistrationPage />} />

        {/* Standalone Event Template Route */}
        <Route path="/events/:slug" element={<EventPortalPage />} />

        {/* Wildcard 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}