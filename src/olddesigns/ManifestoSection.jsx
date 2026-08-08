import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Layers, Cpu, ShieldCheck, Zap, ArrowRight, Code, Terminal, Infinity } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import LayeredMetallicGoldButton from "./LayeredMetallicGoldButton";

export default function ManifestoSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [activeTab, setActiveTab] = useState("movement");

  const comparisonData = {
    traditional: {
      title: "Traditional Siloed Creation",
      subtitle: "Slow, subscription-heavy, and friction-filled development loops",
      items: [
        "Hours spent writing repetitive boilerplate and configuring environments",
        "Locked behind endless software subscriptions and siloed tools",
        "Isolated coding with limited feedback and high barrier to entry",
        "Months from initial concept to first production release",
      ],
    },
    movement: {
      title: "The Turing Wings Movement",
      subtitle: "AI-amplified, collaborative, and intent-driven creation flow",
      items: [
        "Vibe coding velocity: Express intent, let neural agents build the logic",
        "Open collaborative lab environment with direct mentor guidance",
        "Full IP ownership, decentralized deployments, and open-source models",
        "From raw idea to deployed application in hours or days",
      ],
    },
  };

  const manifestoPillars = [
    {
      num: "01",
      title: "Intent Over Syntax",
      desc: "We believe human creativity should focus on architectural vision and user experience, while AI swarms handle low-level implementation details.",
      icon: Terminal,
    },
    {
      num: "02",
      title: "Collaborative Intelligence",
      desc: "Great things are built together. Our community merges human intuition, lead mentor insights, and artificial intelligence into a single build loop.",
      icon: Infinity,
    },
    {
      num: "03",
      title: "Ecosystem Ownership",
      desc: "No locked subscriptions or artificial gates. Creators own their code, deploy to open infrastructure, and lead next-generation technology guilds.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      id="manifesto"
      className={`py-24 sm:py-32 relative overflow-hidden scroll-mt-24 select-none transition-colors duration-500 ${
        isLight ? "bg-transparent text-slate-900" : "bg-transparent text-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">


          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            WHY MODERN CREATION{" "}
            <span className="bg-gradient-to-r from-[#fef08a] via-[#f7d774] to-[#d97706] bg-clip-text text-transparent font-serif italic">
              MATTERS.
            </span>
          </h2>

          <p className={`text-base sm:text-lg ${isLight ? "text-slate-700" : "text-slate-300"}`}>
            We are witnessing the greatest transformation in human history—where the line between dreaming an idea and building it has completely disappeared.
          </p>
        </div>

        {/* Interactive Comparison Switcher */}
        <div className="mb-20">
          <div className="flex justify-center mb-8">
            <div className={`p-1.5 rounded-2xl border flex items-center gap-2 ${
              isLight ? "bg-white/80 border-slate-200 shadow-md" : "bg-slate-900/80 border-amber-500/30 shadow-xl"
            }`}>
              <button
                type="button"
                onClick={() => setActiveTab("movement")}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                  activeTab === "movement"
                    ? "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 shadow-md"
                    : isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"
                }`}
              >
                The Neural Movement Flow
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("traditional")}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                  activeTab === "traditional"
                    ? "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 shadow-md"
                    : isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"
                }`}
              >
                Traditional Software Loops
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className={`max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 border backdrop-blur-md shadow-2xl ${
                activeTab === "movement"
                  ? isLight
                    ? "bg-white/95 border-amber-500/40 shadow-amber-500/10"
                    : "bg-[#0f121d]/90 border-amber-500/50 shadow-amber-500/20"
                  : isLight
                  ? "bg-slate-100/90 border-slate-300"
                  : "bg-slate-950/90 border-slate-800"
              }`}
            >
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-2 font-serif italic text-[#e2b740]">
                {comparisonData[activeTab].title}
              </h3>
              <p className={`text-sm sm:text-base mb-8 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                {comparisonData[activeTab].subtitle}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {comparisonData[activeTab].items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 mt-1">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className={`text-xs sm:text-sm font-medium leading-relaxed ${
                      isLight ? "text-slate-800" : "text-slate-200"
                    }`}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3 MANIFESTO PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {manifestoPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className={`rounded-2xl p-8 border backdrop-blur-md shadow-xl relative overflow-hidden transition-all ${
                  isLight
                    ? "bg-white/90 border-[#d8d0be] hover:border-[#e2b740] shadow-amber-500/5"
                    : "bg-[#0e1118]/90 border-[#e2b740]/30 hover:border-[#e2b740] shadow-amber-500/10"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-extrabold font-serif italic text-[#e2b740]">
                    {pillar.num}
                  </span>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h4 className="text-xl font-bold mb-3">{pillar.title}</h4>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isLight ? "text-slate-600" : "text-slate-400"
                }`}>
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
