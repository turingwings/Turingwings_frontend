import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeContext } from './hooks/useTheme';
import { EventDataContext } from './hooks/useEventData';
import { mergeTheme } from './config/theme';
import { defaultEventData } from './config/defaults';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButton from './components/FloatingButton';

import Home from './pages/Home';
import About from './pages/About';
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

/**
 * TemplateLayout
 * -----------------------------------------------------------------------
 * This is the single integration point for the Turing Wings platform.
 *
 *   <TemplateLayout eventData={adminEvent} themeOverrides={adminTheme} />
 *
 * - eventData: matches the shape in config/defaults.js. Falls back to
 *   sample data when omitted, so this template also works standalone
 *   as a live preview inside the template picker.
 * - themeOverrides: partial theme object merged over config/theme.js.
 *
 * No auth, no data-fetching, no persistence lives here — the platform
 * is responsible for supplying eventData as a prop.
 * -----------------------------------------------------------------------
 */
export default function TemplateLayout({ eventData = defaultEventData, themeOverrides = {} }) {
  const theme = mergeTheme(themeOverrides);

  // index.html ships with {{EVENT_NAME}} / {{EVENT_TAGLINE}} placeholders
  // for SSR/build-time templating platforms. For a purely client-rendered
  // embed, sync the real values here too.
  useEffect(() => {
    document.title = `${eventData.meta.name} — Powered by Turing Wings`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', eventData.hero.subheadline);
  }, [eventData]);

  return (
    <ThemeContext.Provider value={theme}>
      <EventDataContext.Provider value={eventData}>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-base text-text">
            <Navbar />
            <main className="flex-1">
              <AnimatedRoutes />
            </main>
            <Footer />
            <FloatingButton onClick={() => window.location.assign('/register')}>
              {eventData.meta.status === 'live' ? 'Watch live' : 'Register'}
            </FloatingButton>
          </div>
        </BrowserRouter>
      </EventDataContext.Provider>
    </ThemeContext.Provider>
  );
}

/** Wraps <Routes> with AnimatePresence so page transitions (see animations/variants.js) apply on route change. */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/judges" element={<Judges />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/live" element={<LiveEvent />} />
        <Route path="/results" element={<Results />} />
        <Route path="/winners" element={<Winners />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/certificates" element={<Certificates />} />
      </Routes>
    </AnimatePresence>
  );
}
