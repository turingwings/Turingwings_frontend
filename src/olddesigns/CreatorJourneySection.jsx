import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Compass, Cpu, Users, Rocket, CheckCircle2, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import LayeredMetallicGoldButton from "./LayeredMetallicGoldButton";

export default function CreatorJourneySection() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      num: "01",
      title: "Discover & Spark",
      subtitle: "Uncover frontier tools, vibe coding paradigms, and AI agent workflows",
      icon: Compass,
      highlights: [
        "Interactive onboarding into AI-native creation environments",
        "Hands-on immersion with Cursor, Claude 3.7, and agent swarms",
        "Direct access to Turing Wings foundational learning modules",
      ],
      details: "Step into our open lab space. Learn how natural language intent translates directly into clean frontend and backend code logic.",
    },
    {
      num: "02",
      title: "AI-Amplified Building",
      subtitle: "Pair with neural assistant swarms to generate production-grade code",
      icon: Cpu,
      highlights: [
        "Rapid prototyping with real-time prompt-to-UI visualizers",
        "Automated unit testing, linting, and security vulnerability scanning",
        "Building scalable web applications, cyber tools, and spatial systems",
      ],
      details: "Experience true vibe coding velocity. Write high-level architectural requirements while AI agents assemble robust software components.",
    },
    {
      num: "03",
      title: "Neural Collaboration",
      subtitle: "Participate in 48-hour buildathons with lead founders and mentors",
      icon: Users,
      highlights: [
        "Peer code reviews with founders Ratnakar, Sahith, Manoj & Pandu Ranga",
        "Cross-functional team formation for global hackathon sprints",
        "Live feedback sessions and live architectural refactoring",
      ],
      details: "Building is a team sport. Join forces with like-minded creators to solve complex problems and launch impactful digital artifacts.",
    },
    {
      num: "04",
      title: "Global Ecosystem Impact",
      subtitle: "Deploy autonomous software, launch open research, and lead creative guilds",
      icon: Rocket,
      highlights: [
        "Full ownership of deployed intellectual property and software",
        "Opportunities to mentor incoming builders and lead new guilds",
        "Global showcase recognition across the VybeAI initiative network",
      ],
      details: "Graduate from learner to ecosystem leader. Launch projects that serve real users and inspire the next generation of digital creators.",
    },
  ];

  return (
    <section
      id="journey"
      className={`py-24 sm:py-32 relative overflow-hidden scroll-mt-24 select-none transition-colors duration-500 ${
        isLight ? "bg-transparent text-slate-900" : "bg-transparent text-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">


          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            THE CREATOR{" "}
            <span className="bg-gradient-to-r from-[#fef08a] via-[#f7d774] to-[#d97706] bg-clip-text text-transparent font-serif italic">
              JOURNEY.
            </span>
          </h2>

          <p className={`text-base sm:text-lg ${isLight ? "text-slate-700" : "text-slate-300"}`}>
            From curious explorer to empowered ecosystem builder—see how every creator evolves inside the Turing Wings movement.
          </p>
        </div>

        {/* 4 Stage Interactive Stepper Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activeStage === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStage(idx)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  isActive
                    ? isLight
                      ? "bg-white border-amber-500 shadow-xl shadow-amber-500/10"
                      : "bg-[#10131f] border-amber-500 shadow-2xl shadow-amber-500/20"
                    : isLight
                    ? "bg-white/60 border-slate-200 hover:border-amber-500/50"
                    : "bg-[#090b12]/60 border-slate-800 hover:border-amber-500/30"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase text-[#e2b740]">
                    STAGE {stage.num}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#e2b740]" : "text-slate-500"}`} />
                </div>
                <h4 className="text-sm font-extrabold line-clamp-1">{stage.title}</h4>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Display Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className={`rounded-3xl p-8 sm:p-12 border backdrop-blur-md shadow-2xl ${
              isLight
                ? "bg-white/95 border-[#d8d0be] shadow-amber-500/5"
                : "bg-[#0e1118]/95 border-[#e2b740]/40 shadow-amber-500/15"
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              
              {/* Left Column: Stage Info & Description */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-[#e2b740] bg-amber-500/10 border border-amber-500/20">
                  <span>STAGE {stages[activeStage].num} OF 04</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold font-serif italic">
                  {stages[activeStage].title}
                </h3>

                <p className={`text-base leading-relaxed ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                  {stages[activeStage].details}
                </p>

                <div className="space-y-3 pt-2">
                  {stages[activeStage].highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#e2b740] flex-shrink-0" />
                      <span className={`text-xs sm:text-sm font-semibold ${
                        isLight ? "text-slate-800" : "text-slate-200"
                      }`}>
                        {h}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <LayeredMetallicGoldButton
                    text="Begin Stage Onboarding"
                    to="/portal/auth/v1/account-access"
                    size="md"
                  />
                </div>
              </div>

              {/* Right Column: Visual Stage Badge & Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className={`w-full max-w-sm rounded-2xl p-8 border text-center relative overflow-hidden ${
                  isLight
                    ? "bg-slate-50 border-slate-200 shadow-inner"
                    : "bg-slate-950 border-amber-500/25 shadow-inner"
                }`}>
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-[#e2b740]">
                    {React.createElement(stages[activeStage].icon, { className: "w-8 h-8" })}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{stages[activeStage].title}</h4>
                  <p className={`text-xs leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                    {stages[activeStage].subtitle}
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
