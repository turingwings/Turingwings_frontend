import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BuilderOfTheCohort from '../components/BuilderOfTheCohort';
import {
  Cpu, ShieldCheck, Clock, ArrowRight, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cohortService } from '../services/cohort';
import { COHORTS_METADATA } from '../data/cohortMetadata';

const FONT_STACK =
  "'Product Sans', 'Google Sans', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardEntranceVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardHoverVariants = {
  rest: { y: 0, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' },
  hover: { y: -4, boxShadow: '0 12px 28px rgba(0, 0, 0, 0.08)' },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 4 },
};

const mergeCohortData = (backendCohort) => {
  const slug = backendCohort.slug;
  const meta = COHORTS_METADATA[slug] || {
    flagship: 'FLAGSHIP 01',
    icon: Cpu,
    tagline: 'Master state-of-the-art software engineering',
    stats: [{ icon: Clock, label: '4 Weeks' }],
    tools: [],
    ctaLabel: 'VIEW CURRICULUM',
  };

  const totalSeats = Number(backendCohort.totalSeats || backendCohort.total_seats || 70);
  const seatsBooked = Number(backendCohort.seatsBooked || 0);
  const seatsRemaining = backendCohort.seatsRemaining !== undefined && backendCohort.seatsRemaining !== null
    ? Number(backendCohort.seatsRemaining)
    : Math.max(0, totalSeats - seatsBooked);

  return {
    ...meta,
    ...backendCohort,
    uuid: backendCohort.id,
    id: slug,
    title: backendCohort.title,
    description: backendCohort.description,
    price: backendCohort.currentPricing ? backendCohort.currentPricing.price : backendCohort.price,
    totalSeats,
    seatsBooked,
    seatsRemaining,
    curriculumPath: `/cohorts/${slug}`,
    registerPath: `/cohorts/register?cohort=${slug}`,
  };
};

/* ─────────────────────────────────────────────────────────────────────────
   ORIGINAL EXACT COHORT CARD DESIGN (Matching user screenshot)
   ───────────────────────────────────────────────────────────────────────── */
function CohortCard({ cohort }) {
  const Icon = cohort.icon || Cpu;
  const toolsText =
    cohort.tools && cohort.tools.length > 3
      ? `${cohort.tools.slice(0, 3).join(', ')} +${cohort.tools.length - 3} more`
      : cohort.tools ? cohort.tools.join(', ') : '';

  const totalSeats = Number(cohort.totalSeats || cohort.total_seats || 70);
  const seatsRemaining = cohort.seatsRemaining !== undefined && cohort.seatsRemaining !== null
    ? Number(cohort.seatsRemaining)
    : totalSeats;
  const isSoldOut = cohort.isSoldOut || seatsRemaining <= 0;
  
  const currentPrice = cohort.currentPricing ? cohort.currentPricing.price : (cohort.price || 499);
  const currentTierName = cohort.currentPricing ? cohort.currentPricing.name : 'Standard';
  const seatsLeftInTier = cohort.currentPricing && cohort.currentPricing.seatsRemaining !== undefined
    ? cohort.currentPricing.seatsRemaining
    : seatsRemaining;

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
            {cohort.flagship || 'FLAGSHIP 01'}
          </span>
          <span className={`flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] font-mono ${isSoldOut ? 'text-black/50' : 'text-[#090909]'}`}>
            <motion.span
              className={`w-1.5 h-1.5 rounded-full ${isSoldOut ? 'bg-black/30' : 'bg-black'}`}
              animate={{ opacity: isSoldOut ? 1 : [1, 0.25, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            {isSoldOut ? 'SOLD OUT' : `${currentTierName.toUpperCase()} — ₹${currentPrice}`}
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
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A] font-product-sans leading-tight truncate">
                  {cohort.title}
                </h2>
                <p className="text-xs text-black/50 font-product-sans truncate">{cohort.tagline}</p>
              </div>
            </div>

            <p className="text-sm text-black/70 leading-relaxed font-product-sans">{cohort.description}</p>

            {/* Spec sheet — label / value rows */}
            <dl className="border-t border-black/10">
              <div className="flex items-center justify-between py-2.5 border-b border-black/10 font-mono">
                <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-black/40">
                  <Clock className="w-3.5 h-3.5 text-black/40" strokeWidth={1.8} />
                  Availability
                </dt>
                <dd className={`text-xs sm:text-sm font-bold ${isSoldOut ? 'text-black/50' : 'text-[#090909]'}`}>
                  {isSoldOut ? 'SOLD OUT' : `${seatsRemaining} of ${totalSeats} seats left`}
                </dd>
              </div>

              {!isSoldOut && (
                <div className="flex items-center justify-between py-2.5 border-b border-black/10 font-mono">
                  <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-black/40">
                    Tier Status
                  </dt>
                  <dd className="text-xs sm:text-sm font-bold text-[#0A0A0A]">
                    Only {seatsLeftInTier} {currentTierName} Left
                  </dd>
                </div>
              )}

              {cohort.stats && cohort.stats.map((stat, i) => {
                const StatIcon = stat.icon || Clock;
                return (
                  <div
                    key={stat.label + i}
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
                className="w-full py-3.5 px-5 bg-[#0A0A0A] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 min-h-[44px] touch-action-manipulation"
              >
                <span>{cohort.ctaLabel || 'VIEW CURRICULUM'}</span>
                <motion.span variants={arrowVariants} className="inline-flex">
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.div>
            </Link>

            {isSoldOut ? (
              <div className="flex-1">
                <div className="w-full py-3.5 px-5 text-black/50 font-bold text-xs text-center border border-black/20 bg-black/5 flex items-center justify-center min-h-[44px]">
                  SOLD OUT
                </div>
              </div>
            ) : (
              <Link to={cohort.registerPath} className="flex-1">
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 px-5 text-[#0A0A0A] font-bold text-xs text-center border border-black/20 hover:bg-[#090909] hover:border-[#090909] hover:text-white transition-colors flex items-center justify-center min-h-[44px] touch-action-manipulation"
                >
                  Register · ₹{Number(currentPrice).toLocaleString('en-IN')}
                </motion.div>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CohortsListPage() {
  const [cohorts, setCohorts] = useState([]);
  const [loadingState, setLoadingState] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchCohorts() {
      try {
        setLoadingState('loading');
        const result = await cohortService.getActiveCohorts();
        if (result.success && Array.isArray(result.data)) {
          const merged = result.data.map((c) => mergeCohortData(c));
          setCohorts(merged);
          setLoadingState('ready');
        } else {
          throw new Error(result.message || 'Failed to fetch cohorts.');
        }
      } catch (err) {
        console.error('Error loading cohorts:', err);
        setLoadingState('error');
        setErrorMessage(err.message || 'System error. Please try again later.');
      }
    }
    fetchCohorts();
  }, []);

  return (
    <div
      className="font-product-sans min-h-screen bg-[#FAFAFA] text-[#090909] selection:bg-black selection:text-white flex flex-col relative"
      style={{ fontFamily: FONT_STACK }}
    >
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-5 sm:px-8 pt-20 sm:pt-28 pb-16">
        
        {/* Header Section */}
        <div className="space-y-4 pb-12 sm:pb-16 border-b border-black/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-black/50">
              FLAGSHIP COHORTS
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#090909] font-product-sans tracking-tight leading-tight">
            Engineering Cohorts
          </h1>
          <p className="text-sm sm:text-base text-black/70 max-w-xl leading-relaxed font-product-sans">
            Intensive, project-driven engineering cohorts designed to turn developers into AI-native builders and security engineers.
          </p>
        </div>

        {/* Cohorts Grid */}
        {loadingState === 'loading' ? (
          <div className="py-24 text-center space-y-4 font-product-sans">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-black/40">Loading active cohorts...</p>
          </div>
        ) : loadingState === 'error' ? (
          <div className="my-12 p-8 rounded-3xl bg-red-50 border border-red-200 text-center space-y-4 max-w-md mx-auto font-product-sans">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <p className="text-xs font-bold text-red-700">{errorMessage}</p>
            <button onClick={() => window.location.reload()} className="px-5 py-2.5 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-wider">
              Retry Connection
            </button>
          </div>
        ) : (
          <motion.div
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12"
          >
            {cohorts.map((cohort) => (
              <CohortCard key={cohort.id} cohort={cohort} />
            ))}
          </motion.div>
        )}

        {/* Builder of the Cohort Section */}
        <div className="pt-20">
          <BuilderOfTheCohort />
        </div>

      </main>

      <Footer />
    </div>
  );
}