import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Cpu,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Clock,
  Layers,
  Terminal,
  Bug,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────
   DATA — trimmed to what actually helps someone decide, nothing more
   ───────────────────────────────────────────────────────────────────────── */
const cohorts = [
  {
    id: 'ai-engineering',
    flagship: 'FLAGSHIP 01',
    accent: '#22C55E',
    accentSoft: 'rgba(34,197,94,0.1)',
    icon: Cpu,
    title: 'AI Engineering Cohort',
    tagline: 'Build, deploy & launch AI products',
    description:
      'Ship a full-stack, AI-powered SaaS product in four weeks with Cursor, Claude & Supabase.',
    stats: [
      { icon: Clock, label: '4 Weeks' },
      { icon: Layers, label: '4 Modules' },
      { icon: Terminal, label: '7 Tools' },
    ],
    tools: ['Antigravity', 'Cursor', 'Claude', 'React', 'Node.js', 'Supabase', 'Docker'],
    curriculumPath: '/cohorts/ai-engineering',
    registerPath: '/cohorts/register?cohort=ai-engineering',
    ctaLabel: 'View Curriculum',
  },
  {
    id: 'ai-cybersecurity',
    flagship: 'FLAGSHIP 02',
    accent: '#0284C7',
    accentSoft: 'rgba(2,132,199,0.1)',
    icon: ShieldCheck,
    title: 'AI & Cybersecurity Cohort',
    tagline: 'Networking, pentesting & AI agents',
    description:
      'Master Kali Linux, web pentesting and build autonomous AI security agents with MCP.',
    stats: [
      { icon: Clock, label: '4 Weeks' },
      { icon: Layers, label: '4 Modules' },
      { icon: Bug, label: 'Live Pentests' },
    ],
    tools: ['Kali Linux', 'Burp Suite', 'Nmap', 'Wireshark', 'Python', 'Ollama', 'OpenClaw', 'MCP'],
    curriculumPath: '/cohorts/ai-cybersecurity',
    registerPath: '/cohorts/register?cohort=ai-cybersecurity',
    ctaLabel: 'View Syllabus',
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   MOTION VARIANTS
   ───────────────────────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariants = {
  rest: { y: 0, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
  hover: { y: -8, boxShadow: '0 28px 55px rgba(0,0,0,0.12)' },
};

const iconVariants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.12, rotate: -8, transition: { type: 'spring', stiffness: 300, damping: 12 } },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 5, transition: { type: 'spring', stiffness: 400, damping: 15 } },
};

const chipContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25 } },
};

/* ─────────────────────────────────────────────────────────────────────────
   COHORT CARD
   ───────────────────────────────────────────────────────────────────────── */
function CohortCard({ cohort, index }) {
  const Icon = cohort.icon;
  const visibleTools = cohort.tools.slice(0, 4);
  const extraToolCount = cohort.tools.length - visibleTools.length;

  return (
    <motion.div
      variants={itemVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="relative"
    >
      <motion.div
        variants={cardVariants}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="h-full flex flex-col justify-between gap-6 rounded-3xl border border-black/10 bg-white p-5 sm:p-7 lg:p-8"
      >
        <div className="space-y-5 sm:space-y-6">
          {/* Top row: flagship badge */}
          <div className="flex items-center justify-between gap-2">
            <span
              className="text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 sm:px-3 py-1 rounded-full border"
              style={{ color: cohort.accent, background: cohort.accentSoft, borderColor: cohort.accent + '4D' }}
            >
              {cohort.flagship} · 4 WKS
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-[#15803D] bg-[#22C55E]/10 px-2 sm:px-2.5 py-0.5 rounded-md border border-[#22C55E]/30 whitespace-nowrap">
              Enrolling
            </span>
          </div>

          {/* Icon + title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <motion.div
              variants={iconVariants}
              className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 shrink-0 rounded-2xl border flex items-center justify-center"
              style={{ background: cohort.accentSoft, borderColor: cohort.accent + '4D', color: cohort.accent }}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
            </motion.div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#090909] font-sans leading-tight truncate">
                {cohort.title}
              </h2>
              <p className="text-[11px] sm:text-xs text-black/55 font-sans truncate">{cohort.tagline}</p>
            </div>
          </div>

          {/* One-line description */}
          <p className="text-xs sm:text-sm text-black/70 leading-relaxed font-sans">
            {cohort.description}
          </p>

          {/* Compact stat chips instead of a full timeline grid */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {cohort.stats.map((stat) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-black/65 bg-[#FAF8F5] px-2.5 sm:px-3 py-1.5 rounded-xl border border-black/10"
                >
                  <StatIcon className="w-3.5 h-3.5" style={{ color: cohort.accent }} />
                  <span>{stat.label}</span>
                </div>
              );
            })}
          </div>

          {/* Tool badges — trimmed, with a "+N" overflow chip */}
          <motion.div
            variants={chipContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="flex flex-wrap gap-1.5"
          >
            {visibleTools.map((tool) => (
              <motion.span
                key={tool}
                variants={chipVariants}
                className="text-[10px] font-bold text-black/70 bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-black/10"
              >
                {tool}
              </motion.span>
            ))}
            {extraToolCount > 0 && (
              <motion.span
                variants={chipVariants}
                className="text-[10px] font-bold px-2.5 py-1 rounded-lg border"
                style={{ color: cohort.accent, borderColor: cohort.accent + '4D', background: cohort.accentSoft }}
              >
                +{extraToolCount} more
              </motion.span>
            )}
          </motion.div>
        </div>

        {/* ACTIONS */}
        <div className="pt-5 sm:pt-6 border-t border-black/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          <Link to={cohort.curriculumPath} className="flex-1 sm:flex-none">
            <motion.div
              whileTap={{ scale: 0.96 }}
              className="w-full py-3 px-5 rounded-2xl bg-[#090909] text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <span>{cohort.ctaLabel}</span>
              <motion.span variants={arrowVariants} className="inline-flex">
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.div>
          </Link>
          <Link to={cohort.registerPath} className="flex-1 sm:flex-none">
            <motion.div
              whileTap={{ scale: 0.96 }}
              className="w-full py-3 px-5 rounded-2xl bg-[#FAF8F5] text-[#090909] font-bold text-[11px] sm:text-xs text-center border border-black/15"
            >
              Register ₹4,999
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
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden -z-10">
      <motion.div
        className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.16), transparent 70%)' }}
        animate={reduceMotion ? undefined : { x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -top-16 right-0 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(2,132,199,0.14), transparent 70%)' }}
        animate={reduceMotion ? undefined : { x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────────────────────── */
export default function CohortsListPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#090909] selection:bg-[#22C55E] selection:text-black font-mono flex flex-col relative">
      <Navbar />

      <main className="relative flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 space-y-10 sm:space-y-14">
        <AmbientBackground />

        {/* HERO — trimmed to one line of support copy */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-3 sm:space-y-4 max-w-2xl mx-auto pt-4 sm:pt-6"
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
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight font-sans">
            Build real products with AI Engineering & Cybersecurity
          </h1>
          <p className="text-xs sm:text-base text-black/65 max-w-xl mx-auto leading-relaxed font-sans">
            4-week hands-on cohorts for builders who want to ship, not just learn.
          </p>
        </motion.div>

        {/* CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8"
        >
          {cohorts.map((cohort, index) => (
            <CohortCard key={cohort.id} cohort={cohort} index={index} />
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}