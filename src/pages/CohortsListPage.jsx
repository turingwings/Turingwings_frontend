import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Cpu, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cohortService } from '../services/cohort';

import { COHORTS_METADATA } from '../data/cohortMetadata';

const mergeCohortData = (backendCohort) => {
  const slug = backendCohort.slug;
  const meta = COHORTS_METADATA[slug] || {
    flagship: 'NEW COHORT',
    accent: '#22C55E',
    accentSoft: 'rgba(34,197,94,0.1)',
    icon: Cpu,
    tagline: 'Master state-of-the-art skills',
    stats: [{ icon: Clock, label: '4 Weeks' }],
    tools: [],
    ctaLabel: 'Learn More',
  };

  return {
    ...meta,
    uuid: backendCohort.id,
    id: slug,
    title: backendCohort.title,
    description: backendCohort.description,
    price: backendCohort.price,
    curriculumPath: `/cohorts/${slug}`,
    registerPath: `/cohorts/register?cohort=${slug}`,
  };
};

/* ─────────────────────────────────────────────────────────────────────────
   MOTION VARIANTS
   ───────────────────────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// Cards rise from below into place once loading resolves — a single,
// deliberate "arrival" moment rather than scattered scroll effects.
const cardEntranceVariants = {
  hidden: { opacity: 0, y: 46 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardHoverVariants = {
  rest: { y: 0, boxShadow: '0 1px 2px rgba(9,9,9,0.04)' },
  hover: { y: -6, boxShadow: '0 24px 48px rgba(9,9,9,0.10)' },
};

const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.08, rotate: -6, transition: { type: 'spring', stiffness: 300, damping: 14 } },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 4, transition: { type: 'spring', stiffness: 400, damping: 16 } },
};

/* ─────────────────────────────────────────────────────────────────────────
   3D DOT-WAVE LOADER
   A row of dots that shrink, dim, and blur toward the edges — like a
   spotlight sweeping across a reel — pulsing gently while cohorts load.
   ───────────────────────────────────────────────────────────────────────── */
function CohortsLoader() {
  const reduceMotion = useReducedMotion();
  const dotCount = 9;
  const dots = Array.from({ length: dotCount });
  const center = (dotCount - 1) / 2;

  return (
    <div className="flex flex-col items-center justify-center gap-5 sm:gap-6 py-20 sm:py-28">
      <div
        className="flex items-end gap-1.5 sm:gap-2"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, black 18%, black 82%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 18%, black 82%, transparent)',
        }}
      >
        {dots.map((_, i) => {
          const dist = Math.abs(i - center);
          const size = 18 - dist * 2.1;
          const blur = dist * 1.3;
          const opacity = 1 - dist * 0.15;

          return (
            <motion.span
              key={i}
              className="block rounded-full"
              style={{
                width: size,
                height: size,
                backgroundColor: '#090909',
                filter: `blur(${blur}px)`,
                opacity,
              }}
              animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
              transition={{
                duration: 1.05,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.075,
              }}
            />
          );
        })}
      </div>
      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-black/35 font-mono">
        Fetching active cohorts
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   COHORT CARD
   ───────────────────────────────────────────────────────────────────────── */
function CohortCard({ cohort }) {
  const Icon = cohort.icon;
  const visibleTools = cohort.tools.slice(0, 3);
  const extraToolCount = cohort.tools.length - visibleTools.length;

  return (
    <motion.div variants={cardEntranceVariants} className="h-full">
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={cardHoverVariants}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="h-full flex flex-col justify-between gap-6 rounded-[28px] border border-black/10 bg-white p-6 sm:p-8"
      >
        <div className="space-y-5">
          {/* Eyebrow row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border"
              style={{ color: cohort.accent, background: cohort.accentSoft, borderColor: cohort.accent + '4D' }}
            >
              {cohort.flagship}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-black/45 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              Enrolling now
            </span>
          </div>

          {/* Icon + title */}
          <div className="flex items-center gap-3.5">
            <motion.div
              variants={iconVariants}
              className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl border flex items-center justify-center"
              style={{ background: cohort.accentSoft, borderColor: cohort.accent + '4D', color: cohort.accent }}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#090909] font-sans leading-tight truncate">
                {cohort.title}
              </h2>
              <p className="text-xs text-black/50 font-sans truncate">{cohort.tagline}</p>
            </div>
          </div>

          <p className="text-sm text-black/70 leading-relaxed font-sans">{cohort.description}</p>

          {/* Stats + tools merged into one clean row */}
          <div className="flex flex-wrap gap-2">
            {cohort.stats.map((stat) => {
              const StatIcon = stat.icon;
              return (
                <span
                  key={stat.label}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-black/60 bg-[#FAF8F5] px-3 py-1.5 rounded-full border border-black/10"
                >
                  <StatIcon className="w-3.5 h-3.5" style={{ color: cohort.accent }} />
                  {stat.label}
                </span>
              );
            })}
            {visibleTools.map((tool) => (
              <span
                key={tool}
                className="text-[11px] font-bold text-black/60 bg-[#FAF8F5] px-3 py-1.5 rounded-full border border-black/10"
              >
                {tool}
              </span>
            ))}
            {extraToolCount > 0 && (
              <span
                className="text-[11px] font-bold px-3 py-1.5 rounded-full border"
                style={{ color: cohort.accent, borderColor: cohort.accent + '4D', background: cohort.accentSoft }}
              >
                +{extraToolCount} more
              </span>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link to={cohort.curriculumPath} className="flex-1">
            <motion.div
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#090909] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>{cohort.ctaLabel}</span>
              <motion.span variants={arrowVariants} className="inline-flex">
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.div>
          </Link>
          <Link to={cohort.registerPath} className="flex-1">
            <motion.div
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 px-5 rounded-2xl bg-white text-[#090909] font-bold text-xs text-center border border-black/15"
            >
              Register · ₹{Number(cohort.price).toLocaleString('en-IN')}
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   AMBIENT BACKGROUND — quiet, respects reduced-motion preference
   ───────────────────────────────────────────────────────────────────────── */
function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] overflow-hidden -z-10">
      <motion.div
        className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.14), transparent 70%)' }}
        animate={reduceMotion ? undefined : { x: [0, 26, 0], y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -top-16 right-0 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(2,132,199,0.12), transparent 70%)' }}
        animate={reduceMotion ? undefined : { x: [0, -22, 0], y: [0, 22, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────────────── */
export default function CohortsListPage() {
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCohorts() {
      try {
        setLoading(true);
        const result = await cohortService.getActiveCohorts();
        if (result.success && Array.isArray(result.data)) {
          setCohorts(result.data.map(mergeCohortData));
        } else {
          throw new Error(result.message || 'Failed to load cohorts');
        }
      } catch (err) {
        console.error('Error fetching cohorts:', err);
        setError(err.message || 'System error. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    loadCohorts();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#090909] selection:bg-[#22C55E] selection:text-black font-mono flex flex-col relative overflow-x-hidden">
      <Navbar />

      <main className="relative flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 space-y-10 sm:space-y-12">
        <AmbientBackground />

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#15803D] text-[10px] sm:text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Flagship Intensive Cohorts</span>
          </motion.div>
          <h1 className="text-[28px] leading-[1.15] sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans">
            Build real products with AI Engineering &amp; Cybersecurity
          </h1>
          <p className="text-sm sm:text-base text-black/60 max-w-xl mx-auto leading-relaxed font-sans">
            4-week hands-on cohorts for builders who want to ship, not just learn.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <CohortsLoader />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-red-500/5 border border-red-500/20 rounded-3xl p-10 sm:p-12 text-center space-y-3 max-w-xl mx-auto"
            >
              <h3 className="text-lg sm:text-xl font-bold text-red-700">Unable to load cohorts</h3>
              <p className="text-xs sm:text-sm text-red-600/90 font-medium leading-relaxed">{error}</p>
            </motion.div>
          ) : (
            <motion.div
              key="cards"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-7"
            >
              {cohorts.map((cohort) => (
                <CohortCard key={cohort.id} cohort={cohort} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}