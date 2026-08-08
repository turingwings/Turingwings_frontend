import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Bot, Cpu, CheckCircle2, Zap, Sparkles, Layers, ArrowRight } from "lucide-react";

const EVOLUTION_CARDS = [
  {
    step: "01",
    badge: "Legacy Paradigm",
    title: "Traditional Engineering Workflow",
    subtitle: "Manual Syntax & Slow Iteration",
    icon: Code,
    color: "from-slate-100 to-white",
    borderColor: "border-slate-300",
    badgeBg: "bg-slate-200 text-slate-700",
    points: [
      "Writing hundreds of lines of repetitive boilerplate code by hand",
      "Manual searching across forums for obscure syntax & stack errors",
      "Slow development cycles taking weeks for basic features",
      "Siloed developer workflows with high mental overhead",
    ],
  },
  {
    step: "02",
    badge: "The AI Shift",
    title: "AI-Assisted Acceleration",
    subtitle: "Context-Aware Agentic Coding",
    icon: Zap,
    color: "from-amber-100 via-amber-50 to-white",
    borderColor: "border-amber-400",
    badgeBg: "bg-amber-500/20 text-amber-900 font-bold",
    points: [
      "Architectural prompting & high-level design specification",
      "Autonomous AI agents (Sonnet 3.7, Cursor, GPT-4) writing code",
      "Instant automated test synthesis & real-time security checks",
      "12x faster prototype-to-production deployment cycles",
    ],
  },
  {
    step: "03",
    badge: "Modern AI-Native",
    title: "AI-Native Engineering Swarms",
    subtitle: "Multi-Agent Swarm Orchestration",
    icon: Bot,
    color: "from-slate-900 via-slate-800 to-slate-950",
    borderColor: "border-amber-500",
    badgeBg: "bg-amber-500 text-slate-950 font-extrabold",
    textColor: "text-white",
    subTextColor: "text-amber-400",
    points: [
      "Orchestrating autonomous agents via Model Context Protocol (MCP)",
      "Continuous background refactoring & zero-trust threat scanning",
      "100% Portfolio-Driven production applications",
      "Focusing on system design, user experience, and strategic vision",
    ],
  },
  {
    step: "04",
    badge: "Turing Wings Outcome",
    title: "Production Engineering Mastery",
    subtitle: "Live Deployment & Public Portfolio",
    icon: Sparkles,
    color: "from-amber-500/10 via-slate-50 to-white",
    borderColor: "border-amber-500/60",
    badgeBg: "bg-amber-600 text-white font-extrabold",
    points: [
      "Graduate with real-world production applications deployed live",
      "Master modern CI/CD pipelines & cloud microservices",
      "Collaborate in live mentor-guided cohort sprints",
      "Build a public portfolio proving real software capability",
    ],
  },
];

export default function EvolutionSection() {
  const targetRef = useRef(null);

  // Track vertical scroll progress inside this 300vh section container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll progress (0 to 1) into horizontal displacement X (0% to -75%)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section
      ref={targetRef}
      id="experience"
      className="relative h-[300vh] bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white border-t border-slate-200"
    >
      {/* Sticky Screen Viewport Container (Locks in place while user scrolls down) */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Sticky Background Decorative Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-slate-50 to-white pointer-events-none" />
        
        {/* Header Overlay Strip */}
        <div className="absolute top-8 left-4 sm:left-12 z-20 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-mono font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-amber-600" />
            <span>Section 2 — Scroll-Driven Horizontal Flow</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            The Evolution of Software Engineering
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md font-mono">
            Scroll down with your cursor to drive the horizontal story transition.
          </p>
        </div>

        {/* Scroll Indicator Badge */}
        <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-md text-xs font-mono text-slate-600 font-bold animate-bounce">
          <span>Keep Scrolling Down ↓</span>
        </div>

        {/* Scroll-Driven Horizontal Moving Track */}
        <motion.div
          style={{ x }}
          className="flex gap-8 pl-4 sm:pl-12 pr-24 pt-20"
        >
          {EVOLUTION_CARDS.map((card, idx) => {
            const Icon = card.icon;
            const isDark = card.textColor === "text-white";

            return (
              <div
                key={card.step}
                className={`w-[85vw] sm:w-[500px] lg:w-[560px] shrink-0 p-8 sm:p-10 rounded-3xl border ${card.borderColor} bg-gradient-to-br ${card.color} shadow-xl hover:shadow-2xl transition-shadow flex flex-col justify-between space-y-8 relative overflow-hidden`}
              >
                {/* Top Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full ${card.badgeBg}`}>
                      {card.badge}
                    </span>
                    <span className={`text-3xl font-extrabold font-mono ${isDark ? "text-amber-400" : "text-amber-600"}`}>
                      {card.step}
                    </span>
                  </div>

                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${
                    isDark ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-white"
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? "text-white" : "text-slate-900"}`}>
                      {card.title}
                    </h3>
                    <p className={`text-xs font-mono font-bold mt-1 ${isDark ? "text-amber-400" : "text-amber-700"}`}>
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* Points List */}
                <ul className="space-y-3.5 pt-4 border-t border-slate-200/40">
                  {card.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed">
                      <CheckCircle2 className={`w-4.5 h-4.5 shrink-0 mt-0.5 ${isDark ? "text-amber-400" : "text-amber-600"}`} />
                      <span className={isDark ? "text-slate-300" : "text-slate-700"}>
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Progress bar line */}
                <div className="w-full h-1.5 rounded-full bg-slate-200/60 overflow-hidden">
                  <div
                    className="h-full bg-amber-500"
                    style={{ width: `${(idx + 1) * 25}%` }}
                  />
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
