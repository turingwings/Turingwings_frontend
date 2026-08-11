import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────
   SPLIT MODULE CARD
   Two-tone card: a dark panel (module) paired with a light panel
   (lesson + action). Stacks vertically on mobile, sits side-by-side
   from `sm` upward. Black / white / grey only.

   Props:
   - moduleLabel   e.g. "Module 01"
   - moduleTitle   e.g. "JavaScript Fundamentals"
   - lessonLabel   e.g. "Lesson 03"
   - lessonTitle   e.g. "Callbacks & Closures"
   - ctaLabel      e.g. "Continue"
   - href          link target for the CTA
   ───────────────────────────────────────────────────────────────────────── */
export function SplitModuleCard({
  moduleLabel,
  moduleTitle,
  lessonLabel,
  lessonTitle,
  ctaLabel = 'Continue',
  href = '#',
}) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{
        rest: { y: 0, boxShadow: '0 1px 2px rgba(9,9,9,0.06)' },
        hover: { y: -4, boxShadow: '0 20px 40px rgba(9,9,9,0.12)' },
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full rounded-2xl border border-black/10 bg-white overflow-hidden flex flex-col sm:flex-row"
    >
      {/* DARK PANEL — module */}
      <div className="relative bg-[#0A0A0A] text-white px-6 py-6 sm:px-7 sm:py-7 sm:w-[38%] sm:min-w-[220px] flex flex-col justify-between gap-6 sm:gap-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45 font-mono">
          {moduleLabel}
        </span>
        <h3 className="text-lg sm:text-xl font-extrabold leading-snug font-sans">
          {moduleTitle}
        </h3>
      </div>

      {/* LIGHT PANEL — lesson + action */}
      <div className="flex-1 px-6 py-6 sm:px-7 sm:py-7 flex flex-col justify-between gap-6 sm:gap-10">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 font-mono">
            {lessonLabel}
          </span>
          <h4 className="text-lg sm:text-xl font-extrabold text-[#0A0A0A] leading-snug font-sans">
            {lessonTitle}
          </h4>
        </div>

        <Link to={href} className="self-start sm:self-end">
          <motion.span
            whileTap={{ scale: 0.96 }}
            whileHover={{ gap: '0.6rem' }}
            className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5"
          >
            {ctaLabel}
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   DEMO GRID — example usage. Delete this and just import SplitModuleCard
   wherever you render your curriculum / module list.
   ───────────────────────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function SplitModuleCardDemo() {
  // Placeholder module/lesson names for your actual cohorts (WebDevXAI, AI
  // Engineering, Cybersecurity) based on what's in the page so far — swap
  // these for your real curriculum data / map them from COHORTS_METADATA.
  const modules = [
    { moduleLabel: 'WebDevXAI', moduleTitle: 'Build, Deploy & Launch AI-Powered Web Products', lessonLabel: 'Module 01', lessonTitle: 'Prompt-Driven App Scaffolding' },
    { moduleLabel: 'WebDevXAI', moduleTitle: 'Build, Deploy & Launch AI-Powered Web Products', lessonLabel: 'Module 02', lessonTitle: 'Shipping with Cursor & Antigravity' },
    { moduleLabel: 'AI Engineering', moduleTitle: 'Master State-of-the-Art AI Systems', lessonLabel: 'Module 01', lessonTitle: 'LLM Fundamentals & Tooling' },
    { moduleLabel: 'AI Engineering', moduleTitle: 'Master State-of-the-Art AI Systems', lessonLabel: 'Module 02', lessonTitle: 'Agents & Tool Use' },
    { moduleLabel: 'Cybersecurity', moduleTitle: 'Defend & Secure Modern Systems', lessonLabel: 'Module 01', lessonTitle: 'Threat Modeling Basics' },
    { moduleLabel: 'Cybersecurity', moduleTitle: 'Defend & Secure Modern Systems', lessonLabel: 'Module 02', lessonTitle: 'Network Penetration Testing' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
      >
        {modules.map((m) => (
          <motion.div key={m.moduleTitle} variants={itemVariants}>
            <SplitModuleCard {...m} href="#" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}