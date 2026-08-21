import React, { useState } from "react";
import {
  Trophy,
  Crown,
  Zap,
  Award,
  ChevronDown,
  ShieldAlert,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import claudeLogo from "../assets/tech_icons/claude-ai-logo-removebg-preview.png";

export default function BuilderOfTheCohort() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="w-full bg-[#fafafa] text-[#090909] py-10 sm:py-16 md:py-20 font-sans border-b border-black/10">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
        {/* Solid White Studio Card Container */}
        <div className="relative rounded-3xl bg-white text-[#090909] border border-black/15 p-6 sm:p-10 md:p-12 overflow-hidden text-left space-y-8 shadow-xl group">
          
          {/* Subtle grid pattern overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          {/* ── HEADER BADGE & MAIN TITLE ── */}
          <div className="relative space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-black/20 text-xs font-mono font-bold text-[#090909]">
                <Crown className="w-3.5 h-3.5 text-[#090909]" />
                APEX COHORT DISTINCTION
              </span>
              <span className="text-xs font-mono text-black/50">• 100-POINT EVALUATION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase text-[#090909] font-sans leading-tight">
              BUILDER OF THE COHORT
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#333333] font-sans leading-relaxed">
              We don't just recognize completion. We recognize people who build, experiment, contribute, and push the cohort forward.
            </p>
          </div>

          {/* ── THE REWARDS GRID ── */}
          <div className="relative space-y-4 pt-2 border-t border-black/10">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-black/50">
                WINNER PACKAGE REWARDS
              </h3>
              <span className="text-xs font-mono text-[#090909] font-bold">1 Winner Per Cohort Batch</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Reward 1: Hall of Fame */}
              <div className="flex items-start gap-3.5 bg-[#F8F9FA] border border-black/10 p-3.5 sm:p-4 rounded-2xl shadow-xs hover:border-black/25 transition-all">
                <div className="w-9 h-9 rounded-xl bg-black/5 border border-black/15 flex items-center justify-center text-[#090909] shrink-0 mt-0.5">
                  <Trophy className="w-4 h-4 text-[#090909]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#090909] uppercase font-sans">Hall of Fame</h4>
                    <span className="text-[10px] font-mono font-bold text-black/60">Permanent</span>
                  </div>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    Permanent recognition on the Turing Wings official website &amp; social media features.
                  </p>
                </div>
              </div>

              {/* Reward 2: Claude Pro */}
              <div className="flex items-start gap-3.5 bg-[#F8F9FA] border border-black/10 p-3.5 sm:p-4 rounded-2xl shadow-xs hover:border-black/25 transition-all">
                <div className="w-9 h-9 rounded-xl bg-black/5 border border-black/15 flex items-center justify-center text-[#090909] shrink-0 p-2 mt-0.5">
                  <img src={claudeLogo} alt="Claude Pro" className="w-full h-full object-contain filter grayscale" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#090909] uppercase font-sans">Claude Pro</h4>
                    <span className="text-[10px] font-mono font-bold text-black/60">₹2,000+ Value</span>
                  </div>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    Full Claude Pro subscription tier for high-volume AI development and deep reasoning.
                  </p>
                </div>
              </div>

              {/* Reward 3: Merch */}
              <div className="flex items-start gap-3.5 bg-[#F8F9FA] border border-black/10 p-3.5 sm:p-4 rounded-2xl shadow-xs hover:border-black/25 transition-all">
                <div className="w-9 h-9 rounded-xl bg-black/5 border border-black/15 flex items-center justify-center text-[#090909] shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-[#090909]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#090909] uppercase font-sans">Turing Wings Merch</h4>
                    <span className="text-[10px] font-mono font-bold text-black/60">₹3,000+ Value</span>
                  </div>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    Premium custom builder swag kit delivered directly to your doorstep.
                  </p>
                </div>
              </div>

              {/* Reward 4: Certificate */}
              <div className="flex items-start gap-3.5 bg-[#F8F9FA] border border-black/10 p-3.5 sm:p-4 rounded-2xl shadow-xs hover:border-black/25 transition-all">
                <div className="w-9 h-9 rounded-xl bg-black/5 border border-black/15 flex items-center justify-center text-[#090909] shrink-0 mt-0.5">
                  <Award className="w-4 h-4 text-[#090909]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#090909] uppercase font-sans">Framed Certificate</h4>
                    <span className="text-[10px] font-mono font-bold text-black/60">Official Credential</span>
                  </div>
                  <p className="text-xs text-[#555555] leading-relaxed">
                    Official physical framed certificate signed by Turing Wings leadership.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── CTA BUTTON ── */}
          <div className="relative pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={toggleExpand}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#090909] text-white border border-[#090909] font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#262626] transition-all duration-300 shadow-xl cursor-pointer"
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? "HIDE EVALUATION MATRIX" : "EXPLORE EVALUATION MATRIX"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            <span className="text-xs font-mono text-black/50">
              Awarded via 100-Point Evaluation Matrix
            </span>
          </div>

          {/* ── EXPANDABLE EVALUATION MATRIX SECTION ── */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden pt-4"
              >
                <div className="space-y-6 pt-6 border-t border-black/10">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-black/60 uppercase tracking-wider block">
                      TRANSPARENT SELECTION PROCESS
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#090909] font-sans">
                      HOW IS THE BUILDER SELECTED?
                    </h3>
                    <p className="text-xs sm:text-sm text-[#444444] font-sans">
                      All 100 evaluation points are split across four fundamental pillars of cohort performance.
                    </p>
                  </div>

                  {/* 4 PILLARS GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Pillar 01 */}
                    <div className="bg-[#F8F9FA] border border-black/10 rounded-2xl p-5 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between border-b border-black/10 pb-3">
                        <span className="font-mono text-xs font-bold text-[#090909] uppercase">
                          01 — MASTERY
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/20 text-xs font-mono font-bold text-[#090909]">
                          30 PTS
                        </span>
                      </div>
                      <ul className="space-y-2 text-xs font-sans text-[#333333]">
                        <li className="flex items-center justify-between">
                          <span>Understanding &amp; application</span>
                          <span className="font-mono font-bold text-[#090909]">15 pts</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Technical accuracy</span>
                          <span className="font-mono font-bold text-[#090909]">10 pts</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Timely completion</span>
                          <span className="font-mono font-bold text-[#090909]">5 pts</span>
                        </li>
                      </ul>
                    </div>

                    {/* Pillar 02 */}
                    <div className="bg-[#F8F9FA] border border-black/10 rounded-2xl p-5 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between border-b border-black/10 pb-3">
                        <span className="font-mono text-xs font-bold text-[#090909] uppercase">
                          02 — CREATION
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/20 text-xs font-mono font-bold text-[#090909]">
                          25 PTS
                        </span>
                      </div>
                      <ul className="space-y-2 text-xs font-sans text-[#333333]">
                        <li className="flex items-center justify-between">
                          <span>Quality &amp; ambition of build</span>
                          <span className="font-mono font-bold text-[#090909]">10 pts</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Technical implementation</span>
                          <span className="font-mono font-bold text-[#090909]">10 pts</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Documentation &amp; repo quality</span>
                          <span className="font-mono font-bold text-[#090909]">5 pts</span>
                        </li>
                      </ul>
                    </div>

                    {/* Pillar 03 */}
                    <div className="bg-[#F8F9FA] border border-black/10 rounded-2xl p-5 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between border-b border-black/10 pb-3">
                        <span className="font-mono text-xs font-bold text-[#090909] uppercase">
                          03 — EXPLORATION
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/20 text-xs font-mono font-bold text-[#090909]">
                          25 PTS
                        </span>
                      </div>
                      <ul className="space-y-2 text-xs font-sans text-[#333333]">
                        <li className="flex items-center justify-between">
                          <span>Experimentation &amp; problem solving</span>
                          <span className="font-mono font-bold text-[#090909]">10 pts</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Iteration &amp; testing</span>
                          <span className="font-mono font-bold text-[#090909]">8 pts</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Tool orchestration</span>
                          <span className="font-mono font-bold text-[#090909]">7 pts</span>
                        </li>
                      </ul>
                    </div>

                    {/* Pillar 04 */}
                    <div className="bg-[#F8F9FA] border border-black/10 rounded-2xl p-5 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between border-b border-black/10 pb-3">
                        <span className="font-mono text-xs font-bold text-[#090909] uppercase">
                          04 — CONTRIBUTION
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/20 text-xs font-mono font-bold text-[#090909]">
                          20 PTS
                        </span>
                      </div>
                      <ul className="space-y-2 text-xs font-sans text-[#333333]">
                        <li className="flex items-center justify-between">
                          <span>Community &amp; peer support</span>
                          <span className="font-mono font-bold text-[#090909]">10 pts</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Learning in public &amp; updates</span>
                          <span className="font-mono font-bold text-[#090909]">10 pts</span>
                        </li>
                      </ul>
                    </div>

                  </div>

                  {/* 100 POINTS / SUMMARY CARD */}
                  <div className="bg-[#F8F9FA] border border-black/10 rounded-2xl p-5 space-y-5 shadow-xs">
                    <div className="grid grid-cols-3 gap-3 text-center border-b border-black/10 pb-4 font-mono">
                      <div>
                        <div className="text-xl sm:text-3xl font-extrabold text-[#090909]">100 PTS</div>
                        <div className="text-[10px] text-black/50 uppercase font-bold mt-1">Total Scale</div>
                      </div>
                      <div className="border-x border-black/10">
                        <div className="text-xl sm:text-3xl font-extrabold text-[#090909]">1 BATCH</div>
                        <div className="text-[10px] text-black/50 uppercase font-bold mt-1">Per Cohort</div>
                      </div>
                      <div>
                        <div className="text-xl sm:text-3xl font-extrabold text-[#090909]">1 BUILDER</div>
                        <div className="text-[10px] text-black/50 uppercase font-bold mt-1">Sole Winner</div>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs text-[#333333] font-sans">
                      <div className="flex items-start gap-2.5 bg-white border border-black/10 rounded-xl p-3.5">
                        <ShieldAlert className="w-4 h-4 text-[#090909] shrink-0 mt-0.5" />
                        <p>
                          <strong className="text-[#090909]">Disclaimer &amp; Policy:</strong> The Builder of the Cohort title is awarded based on overall evaluation performance throughout the cohort program. Completing the cohort program alone does not automatically qualify a learner for the title.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
