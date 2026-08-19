import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import claudeLogo from '../assets/tech_icons/claude-ai-logo-removebg-preview.png';
import { 
  Trophy, 
  Sparkles, 
  Award, 
  Crown, 
  ChevronDown, 
  CheckCircle2, 
  Terminal, 
  ShieldAlert, 
  FileCode2, 
  Share2, 
  Rocket, 
  Check, 
  Zap, 
  Target
} from 'lucide-react';

export default function BuilderOfTheCohort() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <section className="w-full relative py-10 sm:py-16 lg:py-20 bg-[#070707] text-white selection:bg-[#22C55E] selection:text-black overflow-hidden font-sans border-t border-b border-white/10 rounded-2xl sm:rounded-3xl my-6 sm:my-8">
      {/* Ambient background grid & emerald glow */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 max-w-[90vw] w-[600px] h-[300px] bg-[#22C55E]/10 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 max-w-[80vw] w-[400px] h-[300px] bg-[#22C55E]/5 blur-[100px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
        
        {/* ── TOP HERO HEADER ── */}
        <div className="text-center space-y-4 sm:space-y-5 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#22C55E]/30 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#22C55E]">
            <motion.span 
              className="w-2 h-2 rounded-full bg-[#22C55E] shrink-0"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="truncate">Apex Cohort Distinction</span>
          </div>

          {/* Title */}
          <div className="space-y-1.5 sm:space-y-2">
            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans uppercase break-words leading-tight">
              BUILDER OF THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-emerald-400 to-white">COHORT</span>
            </h2>
            <p className="text-xs sm:text-lg font-mono uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#22C55E] font-bold">
              ONE COHORT. ONE BUILDER.
            </p>
          </div>

          {/* Narrative */}
          <p className="text-xs sm:text-base text-white/75 leading-relaxed font-sans max-w-2xl mx-auto">
            Every Turing Wings cohort will have <strong className="text-white font-bold">ONE Builder of the Cohort</strong>. 
            This is the learner who demonstrates the strongest combination of <span className="text-white font-semibold">consistency, technical execution, project building, learning in public, and overall contribution</span> throughout the cohort.
          </p>
          
          <div className="inline-block pt-1 max-w-full">
            <span className="inline-block text-[11px] sm:text-sm font-mono text-white/70 bg-white/5 px-3.5 py-2 rounded-lg border border-white/10 leading-snug">
              Awarded through a <strong className="text-[#22C55E] font-mono">100-POINT EVALUATION SYSTEM</strong> (Not based on attendance alone)
            </span>
          </div>
        </div>

        {/* ── THE REWARDS GRID ── */}
        <div className="space-y-5 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50">
              <Crown className="w-4 h-4 text-[#22C55E] shrink-0" />
              <span>THE REWARD</span>
            </div>
            <span className="font-mono text-[11px] text-[#22C55E] font-bold uppercase tracking-wider">
              Exclusive Winner Package
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Reward 1 */}
            <div className="group relative bg-[#0D0D0D] border border-white/10 hover:border-[#22C55E]/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[44px]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] group-hover:scale-110 transition-transform overflow-hidden p-2.5 shrink-0">
                  <img src={claudeLogo} alt="Claude Pro" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#22C55E]">
                    Worth ₹2,000+
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-[#22C55E] transition-colors break-words">
                    CLAUDE PRO
                  </h3>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    Full Claude Pro subscription tier for high-volume AI development and deep reasoning tasks.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-white/40 uppercase tracking-wider">
                Subscription Grant
              </div>
            </div>

            {/* Reward 2 */}
            <div className="group relative bg-[#0D0D0D] border border-white/10 hover:border-[#22C55E]/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[44px]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] group-hover:scale-110 transition-transform shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#22C55E]">
                    Worth ₹3,000+
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-[#22C55E] transition-colors break-words">
                    TURING WINGS MERCH
                  </h3>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    Premium custom Turing Wings builder swag kit delivered directly to your doorstep.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-white/40 uppercase tracking-wider">
                Official Swag Pack
              </div>
            </div>

            {/* Reward 3 */}
            <div className="group relative bg-[#0D0D0D] border border-white/10 hover:border-[#22C55E]/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[44px]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] group-hover:scale-110 transition-transform shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#22C55E]">
                    Official Credential
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-[#22C55E] transition-colors break-words">
                    PHYSICAL CERTIFICATE
                  </h3>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    Official framed Builder of the Cohort certificate signed by Turing Wings leadership.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-white/40 uppercase tracking-wider">
                Framed Distinction
              </div>
            </div>

            {/* Reward 4 */}
            <div className="group relative bg-[#0D0D0D] border border-white/10 hover:border-[#22C55E]/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[44px]">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] group-hover:scale-110 transition-transform shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#22C55E]">
                    Permanent Spotlight
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-1 group-hover:text-[#22C55E] transition-colors break-words">
                    HALL OF FAME
                  </h3>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">
                    Permanent recognition on the Turing Wings website and selected social media features.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 font-mono text-[10px] text-white/40 uppercase tracking-wider">
                Lifetime Showcase
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA BUTTON ("EXPLORE HOW") ── */}
        <div className="flex flex-col items-center justify-center pt-2">
          <motion.button
            onClick={toggleExpand}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer group relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#22C55E] text-black font-extrabold text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.18em] shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_45px_rgba(34,197,94,0.5)] transition-all duration-300 min-h-[44px] min-w-[44px] touch-action-manipulation"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? "HIDE CRITERIA" : "EXPLORE HOW"}</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4 text-black stroke-[3]" />
            </motion.div>
          </motion.button>
          
          <p className="text-[10px] sm:text-[11px] font-mono text-white/50 mt-3 text-center">
            {isExpanded ? "Click to collapse evaluation breakdown" : "Click to reveal complete 100-point evaluation criteria"}
          </p>
        </div>

        {/* ── EXPANDABLE EVALUATION CRITERIA ── */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-10 sm:space-y-14 pt-6 border-t border-white/10">
                {/* SECTION HEADER */}
                <div className="text-center space-y-2.5 sm:space-y-3">
                  <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-[#22C55E]">
                    <Target className="w-4 h-4 text-[#22C55E] shrink-0" />
                    <span>Evaluation Matrix</span>
                  </div>
                  <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-sans uppercase break-words">
                    HOW IS THE BUILDER SELECTED?
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 font-mono max-w-xl mx-auto">
                    Transparent breakdown of all 100 evaluation points across four core pillars.
                  </p>
                </div>

                {/* 4 PILLARS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  
                  {/* Pillar 01 */}
                  <div className="bg-[#0C0C0C] border border-white/10 rounded-2xl p-5 sm:p-7 space-y-4 sm:space-y-5 relative overflow-hidden">
                    <div className="flex items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div className="space-y-1 min-w-0">
                        <span className="font-mono text-xs font-bold text-[#22C55E] tracking-widest uppercase block truncate">
                          01 — COHORT ASSESSMENTS
                        </span>
                        <p className="text-xs text-white/60 leading-relaxed">
                          Measure consistency and understanding throughout the cohort.
                        </p>
                      </div>
                      <div className="shrink-0 px-3 py-1.5 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 font-mono text-xs font-bold text-[#22C55E]">
                        30 PTS
                      </div>
                    </div>

                    <ul className="space-y-2.5 sm:space-y-3 font-sans text-xs sm:text-sm">
                      <li className="flex items-center justify-between gap-2 text-white/80 py-1.5 border-b border-white/5">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                          <span className="truncate">Weekly/module assessments</span>
                        </span>
                        <span className="font-mono font-bold text-[#22C55E] shrink-0">15 pts</span>
                      </li>
                      <li className="flex items-center justify-between gap-2 text-white/80 py-1.5 border-b border-white/5">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                          <span className="truncate">Accuracy &amp; understanding</span>
                        </span>
                        <span className="font-mono font-bold text-[#22C55E] shrink-0">10 pts</span>
                      </li>
                      <li className="flex items-center justify-between gap-2 text-white/80 py-1.5">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                          <span className="truncate">Timely completion</span>
                        </span>
                        <span className="font-mono font-bold text-[#22C55E] shrink-0">5 pts</span>
                      </li>
                    </ul>
                  </div>

                  {/* Pillar 02 */}
                  <div className="bg-[#0C0C0C] border border-white/10 rounded-2xl p-5 sm:p-7 space-y-4 sm:space-y-5 relative overflow-hidden">
                    <div className="flex items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div className="space-y-1 min-w-0">
                        <span className="font-mono text-xs font-bold text-[#22C55E] tracking-widest uppercase block truncate">
                          02 — PROJECT BUILDING
                        </span>
                        <p className="text-xs text-white/60 leading-relaxed">
                          Evaluate how effectively knowledge turns into working projects.
                        </p>
                      </div>
                      <div className="shrink-0 px-3 py-1.5 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 font-mono text-xs font-bold text-[#22C55E]">
                        25 PTS
                      </div>
                    </div>

                    <ul className="space-y-2.5 sm:space-y-3 font-sans text-xs sm:text-sm">
                      <li className="flex items-center justify-between gap-2 text-white/80 py-1.5 border-b border-white/5">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                          <span className="truncate">Completion of assigned projects</span>
                        </span>
                        <span className="font-mono font-bold text-[#22C55E] shrink-0">10 pts</span>
                      </li>
                      <li className="flex items-center justify-between gap-2 text-white/80 py-1.5 border-b border-white/5">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                          <span className="truncate">Technical quality &amp; functionality</span>
                        </span>
                        <span className="font-mono font-bold text-[#22C55E] shrink-0">10 pts</span>
                      </li>
                      <li className="flex items-center justify-between gap-2 text-white/80 py-1.5">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                          <span className="truncate">GitHub &amp; documentation</span>
                        </span>
                        <span className="font-mono font-bold text-[#22C55E] shrink-0">5 pts</span>
                      </li>
                    </ul>
                  </div>

                  {/* Pillar 03 */}
                  <div className="bg-[#0C0C0C] border border-white/10 rounded-2xl p-5 sm:p-7 space-y-4 sm:space-y-5 relative overflow-hidden">
                    <div className="flex items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div className="space-y-1 min-w-0">
                        <span className="font-mono text-xs font-bold text-[#22C55E] tracking-widest uppercase block truncate">
                          03 — BUILD IN PUBLIC
                        </span>
                        <p className="text-xs text-white/60 leading-relaxed">
                          Reward learners who actively document and share their journey.
                        </p>
                      </div>
                      <div className="shrink-0 px-3 py-1.5 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 font-mono text-xs font-bold text-[#22C55E]">
                        20 PTS
                      </div>
                    </div>

                    <ul className="space-y-2.5 sm:space-y-3 font-sans text-xs sm:text-sm">
                      <li className="flex items-center justify-between gap-2 text-white/80 py-1.5 border-b border-white/5">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                          <span className="truncate">Project showcase posts</span>
                        </span>
                        <span className="font-mono font-bold text-[#22C55E] shrink-0">8 pts</span>
                      </li>
                      <li className="flex items-center justify-between gap-2 text-white/80 py-1.5 border-b border-white/5">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                          <span className="truncate">Consistency of updates</span>
                        </span>
                        <span className="font-mono font-bold text-[#22C55E] shrink-0">6 pts</span>
                      </li>
                      <li className="flex items-center justify-between gap-2 text-white/80 py-1.5 border-b border-white/5">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                          <span className="truncate">Technical explanation quality</span>
                        </span>
                        <span className="font-mono font-bold text-[#22C55E] shrink-0">4 pts</span>
                      </li>
                      <li className="flex items-center justify-between gap-2 text-white/80 py-1.5">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                          <span className="truncate">Community engagement</span>
                        </span>
                        <span className="font-mono font-bold text-[#22C55E] shrink-0">2 pts</span>
                      </li>
                    </ul>
                  </div>

                  {/* Pillar 04 */}
                  <div className="bg-[#0C0C0C] border border-white/10 rounded-2xl p-5 sm:p-7 space-y-4 sm:space-y-5 relative overflow-hidden">
                    <div className="flex items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                      <div className="space-y-1 min-w-0">
                        <span className="font-mono text-xs font-bold text-[#22C55E] tracking-widest uppercase block truncate">
                          04 — CAPSTONE PROJECT
                        </span>
                        <p className="text-xs text-white/60 leading-relaxed">
                          Demonstrate comprehensive AI engineering capabilities.
                        </p>
                      </div>
                      <div className="shrink-0 px-3 py-1.5 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 font-mono text-xs font-bold text-[#22C55E]">
                        25 PTS
                      </div>
                    </div>

                    <ul className="space-y-2.5 sm:space-y-3 font-sans text-xs sm:text-sm">
                      <li className="flex items-center justify-between gap-2 text-white/80 py-1.5 border-b border-white/5">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                          <span className="truncate">Problem definition &amp; originality</span>
                        </span>
                        <span className="font-mono font-bold text-[#22C55E] shrink-0">5 pts</span>
                      </li>
                      <li className="flex items-center justify-between gap-2 text-white/80 py-1.5 border-b border-white/5">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                          <span className="truncate">Technical implementation</span>
                        </span>
                        <span className="font-mono font-bold text-[#22C55E] shrink-0">8 pts</span>
                      </li>
                      <li className="flex items-center justify-between gap-2 text-white/80 py-1.5 border-b border-white/5">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                          <span className="truncate">Effective AI/tool usage</span>
                        </span>
                        <span className="font-mono font-bold text-[#22C55E] shrink-0">5 pts</span>
                      </li>
                      <li className="flex items-center justify-between gap-2 text-white/80 py-1.5 border-b border-white/5">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                          <span className="truncate">User experience &amp; usability</span>
                        </span>
                        <span className="font-mono font-bold text-[#22C55E] shrink-0">4 pts</span>
                      </li>
                      <li className="flex items-center justify-between gap-2 text-white/80 py-1.5">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] shrink-0" />
                          <span className="truncate">Final presentation</span>
                        </span>
                        <span className="font-mono font-bold text-[#22C55E] shrink-0">3 pts</span>
                      </li>
                    </ul>
                  </div>

                </div>

                {/* ── 100 POINTS. ONE BUILDER. BANNER ── */}
                <div className="bg-gradient-to-br from-[#0E0E0E] via-[#080808] to-[#041209] border border-[#22C55E]/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 relative overflow-hidden">
                  <div className="pointer-events-none absolute top-0 right-0 w-64 h-64 bg-[#22C55E]/10 blur-3xl rounded-full" />
                  
                  {/* 3 COUNTERS */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-center border-b border-white/10 pb-6 sm:pb-8">
                    <div className="space-y-1 py-2 sm:py-0">
                      <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-[#22C55E]">
                        100 POINTS
                      </div>
                      <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-white/50">
                        Total Evaluation
                      </p>
                    </div>
                    <div className="space-y-1 sm:border-l sm:border-r border-y sm:border-y-0 border-white/10 py-4 sm:py-0 sm:px-4">
                      <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-white">
                        1 COHORT
                      </div>
                      <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-white/50">
                        Per Program Batch
                      </p>
                    </div>
                    <div className="space-y-1 py-2 sm:py-0">
                      <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-[#22C55E]">
                        1 BUILDER
                      </div>
                      <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-white/50">
                        Sole Title Holder
                      </p>
                    </div>
                  </div>

                  {/* DESCRIPTION + TIE-BREAKER */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
                    
                    {/* Selection Policy */}
                    <div className="space-y-4">
                      <h4 className="text-base sm:text-lg font-bold text-white font-sans flex items-center gap-2">
                        <Rocket className="w-5 h-5 text-[#22C55E] shrink-0" />
                        <span>Selection Standard</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                        Only <strong className="text-white">one learner from each cohort</strong> can receive the title <strong className="text-[#22C55E]">Builder of the Cohort</strong>. 
                        The learner with the highest overall evaluation score will be selected.
                      </p>

                      <div className="pt-2">
                        <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-white/50 mb-3">
                          In the event of a tie, prioritize:
                        </h5>
                        <ol className="space-y-2 font-mono text-xs">
                          <li className="flex items-center gap-3 bg-white/5 px-3.5 py-2 rounded-lg border border-white/5 text-white/90">
                            <span className="w-5 h-5 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                            <span className="truncate">Capstone Project</span>
                          </li>
                          <li className="flex items-center gap-3 bg-white/5 px-3.5 py-2 rounded-lg border border-white/5 text-white/90">
                            <span className="w-5 h-5 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                            <span className="truncate">Project Execution</span>
                          </li>
                          <li className="flex items-center gap-3 bg-white/5 px-3.5 py-2 rounded-lg border border-white/5 text-white/90">
                            <span className="w-5 h-5 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                            <span className="truncate">Assessment Performance</span>
                          </li>
                          <li className="flex items-center gap-3 bg-white/5 px-3.5 py-2 rounded-lg border border-white/5 text-white/90">
                            <span className="w-5 h-5 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center font-bold text-[10px] shrink-0">4</span>
                            <span className="truncate">Consistency &amp; Build in Public</span>
                          </li>
                        </ol>
                      </div>
                    </div>

                    {/* Summary Perks Checklist */}
                    <div className="bg-[#070707]/60 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
                      <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#22C55E]">
                        BUILDER OF THE COHORT RECEIVES
                      </h4>
                      <ul className="space-y-3 font-sans text-xs sm:text-sm">
                        <li className="flex items-center gap-3 text-white">
                          <div className="w-5 h-5 rounded-full bg-[#22C55E] text-black flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span>Claude Pro subscription</span>
                        </li>
                        <li className="flex items-center gap-3 text-white">
                          <div className="w-5 h-5 rounded-full bg-[#22C55E] text-black flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span>Turing Wings merchandise</span>
                        </li>
                        <li className="flex items-center gap-3 text-white">
                          <div className="w-5 h-5 rounded-full bg-[#22C55E] text-black flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span>Physical certificate</span>
                        </li>
                        <li className="flex items-center gap-3 text-white">
                          <div className="w-5 h-5 rounded-full bg-[#22C55E] text-black flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span>Hall of Fame recognition</span>
                        </li>
                        <li className="flex items-center gap-3 text-white">
                          <div className="w-5 h-5 rounded-full bg-[#22C55E] text-black flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span>Social media recognition</span>
                        </li>
                      </ul>
                    </div>

                  </div>

                  {/* Disclaimer */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-3.5 sm:p-4 text-xs text-white/60 font-sans leading-relaxed">
                      <ShieldAlert className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                      <p>
                        <strong className="text-white">Disclaimer:</strong> The Builder of the Cohort title is awarded based on overall performance throughout the cohort. Completing the cohort does not automatically qualify a learner for the title.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

