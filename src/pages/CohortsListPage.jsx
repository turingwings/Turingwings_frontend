import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Cpu, ArrowRight, Clock } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cohortService } from '../services/cohort';

import { COHORTS_METADATA } from '../data/cohortMetadata';

const mergeCohortData = (backendCohort) => {
  const slug = backendCohort.slug;
  const meta = COHORTS_METADATA[slug] || {
    flagship: 'NEW COHORT',
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

const cardEntranceVariants = {
  hidden: { opacity: 0, y: 46 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardHoverVariants = {
  rest: { y: 0, boxShadow: '0 1px 2px rgba(9,9,9,0.05)' },
  hover: { y: -5, boxShadow: '0 22px 44px rgba(9,9,9,0.10)' },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 4, transition: { type: 'spring', stiffness: 400, damping: 16 } },
};

/* ─────────────────────────────────────────────────────────────────────────
   3D DOT-WAVE LOADER
   ───────────────────────────────────────────────────────────────────────── */
function CohortsLoader() {
  const reduceMotion = useReducedMotion();
  const dotCount = 9;
  const dots = Array.from({ length: dotCount });
  const center = (dotCount - 1) / 2;

  return (
    <div className="flex flex-col items-center justify-center gap-5 sm:gap-6 py-20 sm:py-28">
      <div
        className="flex items-center gap-1.5 sm:gap-2"
        style={{
          overflow: 'visible',
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
            <div
              key={i}
              style={{
                width: 22,
                height: 40, // extra vertical room so the -9px bounce + blur never gets sliced
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'visible',
              }}
            >
              <motion.span
                className="block rounded-full"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: '#0A0A0A',
                  filter: `blur(${blur}px)`,
                  opacity,
                }}
                animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
                transition={{ duration: 1.05, repeat: Infinity, ease: 'easeInOut', delay: i * 0.075 }}
              />
            </div>
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
   COHORT CARD — spec-sheet structure: hairline rules, monospace data rows,
   bracketed icon frame. No pill badges, no color fills — pure black / white.
   ───────────────────────────────────────────────────────────────────────── */
function CohortCard({ cohort }) {
  const Icon = cohort.icon;
  const toolsText =
    cohort.tools.length > 3
      ? `${cohort.tools.slice(0, 3).join(', ')} +${cohort.tools.length - 3} more`
      : cohort.tools.join(', ');

  return (
    <motion.div variants={cardEntranceVariants} className="h-full">
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={cardHoverVariants}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="h-full flex flex-col rounded-2xl border border-black/12 bg-white overflow-hidden"
      >
        {/* Header strip */}
        <div className="flex items-center justify-between px-6 sm:px-7 py-3.5 border-b border-black/10">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-black/70 font-mono">
            {cohort.flagship}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-black/45 font-mono">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]"
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            Enrolling
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-between gap-6 px-6 sm:px-7 py-6">
          <div className="space-y-5">
            {/* Icon + title */}
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                <span className="absolute inset-0 border border-black/15" />
                <span className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-black" />
                <span className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-black" />
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-black" strokeWidth={1.6} />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] font-sans leading-tight truncate">
                  {cohort.title}
                </h2>
                <p className="text-xs text-black/50 font-sans truncate">{cohort.tagline}</p>
              </div>
            </div>

            <p className="text-sm text-black/70 leading-relaxed font-sans">{cohort.description}</p>

            {/* Spec sheet — label / value rows instead of chips */}
            <dl className="border-t border-black/10">
              {cohort.stats.map((stat) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between py-2.5 border-b border-black/10 font-mono"
                  >
                    <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-black/40">
                      <StatIcon className="w-3.5 h-3.5 text-black/40" strokeWidth={1.8} />
                      Format
                    </dt>
                    <dd className="text-xs sm:text-sm font-bold text-[#0A0A0A]">{stat.label}</dd>
                  </div>
                );
              })}
              {toolsText && (
                <div className="flex items-start justify-between py-2.5 gap-4 font-mono">
                  <dt className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-black/40 pt-0.5">
                    Stack
                  </dt>
                  <dd className="text-xs sm:text-sm font-bold text-[#0A0A0A] text-right">{toolsText}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <Link to={cohort.curriculumPath} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 px-5 bg-[#0A0A0A] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
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
                className="w-full py-3.5 px-5 text-[#0A0A0A] font-bold text-xs text-center border border-black/20"
              >
                Register · ₹{Number(cohort.price).toLocaleString('en-IN')}
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   AMBIENT BACKGROUND — a quiet blueprint-grid instead of color blobs
   ───────────────────────────────────────────────────────────────────────── */
function AmbientBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-[460px] overflow-hidden -z-10"
      style={{
        backgroundImage:
          'linear-gradient(rgba(10,10,10,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.05) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 85%)',
      }}
    />
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
    <div className="min-h-screen bg-[#FAFAFA] text-[#0A0A0A] selection:bg-black selection:text-white font-mono flex flex-col relative overflow-x-hidden">
      <Navbar />

      <main className="relative flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 space-y-10 sm:space-y-12">
        <AmbientBackground />

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-4 sm:space-y-5 max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-black/50"
          >
            <span className="text-black/30">[</span>
            <span>Flagship Intensive Cohorts</span>
            <motion.span
              className="inline-block w-[7px] h-[13px] bg-black/70 ml-0.5"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'steps(1)' }}
            />
            <span className="text-black/30">]</span>
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
            <motion.div key="loader" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <CohortsLoader />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="border border-black/15 rounded-2xl p-10 sm:p-12 text-center space-y-3 max-w-xl mx-auto"
            >
              <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0A]">Unable to load cohorts</h3>
              <p className="text-xs sm:text-sm text-black/60 font-medium leading-relaxed">{error}</p>
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