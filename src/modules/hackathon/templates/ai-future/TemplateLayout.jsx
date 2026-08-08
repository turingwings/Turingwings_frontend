import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeContext } from './hooks/useTheme';
import { EventDataContext } from './hooks/useEventData';
import { mergeTheme } from './config/theme';
import { defaultEventData } from './config/defaults';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButton from './components/FloatingButton';
import { Menu, X } from 'lucide-react';

import Home from './pages/Home';
import About from './pages/About';
import ThemeBackgroundSwitcher from './backgrounds/ThemeBackgroundSwitcher';
import Timeline from './pages/Timeline';
import Tracks from './pages/Tracks';
import Judges from './pages/Judges';
import Mentors from './pages/Mentors';
import Sponsors from './pages/Sponsors';
import FAQ from './pages/FAQ';
import Registration from './pages/Registration';
import Contact from './pages/Contact';
import LiveEvent from './pages/LiveEvent';
import Results from './pages/Results';
import Winners from './pages/Winners';
import Gallery from './pages/Gallery';
import Certificates from './pages/Certificates';

export default function TemplateLayout({ eventData = defaultEventData, themeOverrides = {}, onRegister }) {
  const theme = mergeTheme(themeOverrides);
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (eventData?.meta?.name) {
      document.title = `${eventData.meta.name} — Powered by Turing Wings`;
    }
  }, [eventData]);

  const navTabs = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "timeline", label: "Timeline" },
    { id: "tracks", label: "Tracks" },
    { id: "judges", label: "Judges" },
    { id: "mentors", label: "Mentors" },
    { id: "sponsors", label: "Sponsors" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  const renderActiveSection = () => {
    switch (activeTab) {
      case "about":
        return <About />;
      case "timeline":
        return <Timeline />;
      case "tracks":
        return <Tracks />;
      case "judges":
        return <Judges />;
      case "mentors":
        return <Mentors />;
      case "sponsors":
        return <Sponsors />;
      case "faq":
        return <FAQ />;
      case "register":
        return <Registration onSubmit={onRegister} />;
      case "contact":
        return <Contact />;
      case "live":
        return <LiveEvent />;
      case "results":
        return <Results />;
      case "winners":
        return <Winners />;
      case "gallery":
        return <Gallery />;
      case "certificates":
        return <Certificates />;
      case "home":
      default:
        return <Home />;
    }
  };

  const bgClass =
    theme.mode === "greenspace" || theme.mode === "cyberpunk"
      ? "bg-transparent text-white selection:bg-[#22C55E] selection:text-black"
      : theme.mode === "space"
      ? "bg-[#030712] text-white selection:bg-[#6366F1] selection:text-white"
      : theme.mode === "corporate"
      ? "bg-[#0f172a] text-white selection:bg-[#2563EB] selection:text-white"
      : theme.mode === "3d"
      ? "bg-[#0a0a0a] text-white selection:bg-[#10B981] selection:text-black"
      : theme.mode === "minimal"
      ? "bg-[#FAFAFA] text-[#090909] selection:bg-[#22C55E] selection:text-black"
      : "bg-[#090d16] text-white selection:bg-[#22C55E] selection:text-black";

  return (
    <ThemeContext.Provider value={theme}>
      <EventDataContext.Provider value={eventData}>
        <div
          style={{ backgroundColor: theme.colors.base, color: theme.colors.text }}
          className={`min-h-screen flex flex-col font-mono transition-colors duration-500 relative ${bgClass}`}
        >
          {/* Dynamic 6-Theme Global Canvas Animated Background */}
          <ThemeBackgroundSwitcher />
          
          {/* Custom Dedicated Sub-Header Navigation for Hackathon Portal */}
          <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
            theme.mode === "minimal" ? "bg-[#FAFAFA]/95 border-black/10" : "bg-slate-950/95 border-slate-800/80"
          }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
              <button
                onClick={() => {
                  setActiveTab("home");
                  setMobileMenuOpen(false);
                }}
                className="font-bold text-base tracking-tight text-white hover:text-amber-400 transition-colors truncate max-w-[200px] sm:max-w-xs"
              >
                {eventData?.meta?.name || "Hackathon Portal"}
              </button>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-5 overflow-x-auto scrollbar-none">
                {navTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-xs font-bold transition-all ${
                      activeTab === tab.id
                        ? "text-amber-400 border-b-2 border-amber-400 pb-1"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Header Action Buttons & Mobile Hamburger */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (onRegister) onRegister();
                    else setActiveTab("register");
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 hover:scale-105 transition-all"
                >
                  Register Team
                </button>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Dropdown Navigation Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                <div className="grid grid-cols-2 gap-2">
                  {navTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-3 py-2 rounded-xl text-left text-xs font-bold transition-all ${
                        activeTab === tab.id
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </header>

          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {renderActiveSection()}
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer />
        </div>
      </EventDataContext.Provider>
    </ThemeContext.Provider>
  );
}
