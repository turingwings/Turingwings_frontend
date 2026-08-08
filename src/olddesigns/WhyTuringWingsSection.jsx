import React, { useState } from "react";
import { HelpCircle } from "lucide-react";

const CORE_PRINCIPLES = [
  {
    title: "100% Portfolio-Driven",
    subtitle: "Public Proof of Skills",
    desc: "Students don't just complete a course—they graduate with real-world projects, production-ready applications, and a public portfolio that demonstrates their skills.",
  },
  {
    title: "AI-Native Curriculum",
    subtitle: "Next-Gen Engineering Workflows",
    desc: "Learn how modern engineers build products using AI-powered workflows instead of following outdated, traditional development methods.",
  },
  {
    title: "Live Cohort Experience",
    subtitle: "Real-Time Collaboration",
    desc: "Learn through live interactive sessions, real-time collaboration, discussions, mentorship, and community-driven problem solving instead of isolated pre-recorded videos.",
  },
  {
    title: "Build Before Theory",
    subtitle: "Hands-On Engineering First",
    desc: "Every concept is reinforced by building practical applications, ensuring students learn through hands-on engineering rather than passive content consumption.",
  },
  {
    title: "Industry-Ready Workflows",
    subtitle: "Modern Software Team Practices",
    desc: "Experience the same AI tools, development workflows, deployment pipelines, and collaborative practices used by modern software teams.",
  },
];

export default function WhyTuringWingsSection() {
  const [hoveredIdx, setHoveredIdx] = useState(0);

  return (
    <section className="py-24 bg-white text-slate-900 relative selection:bg-amber-500 selection:text-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-mono font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Section 6 — Why Choose Turing Wings?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Turing Wings?
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            What fundamentally differentiates Turing Wings from traditional programming courses, recorded tutorials, and conventional bootcamps.
          </p>
        </div>

        {/* Core Principles Oversized Typography List */}
        <div className="space-y-6">
          {CORE_PRINCIPLES.map((p, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              className={`p-8 rounded-3xl border transition-all cursor-pointer ${
                hoveredIdx === idx
                  ? "bg-slate-50 border-amber-500/50 shadow-xl"
                  : "bg-slate-50/50 border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-widest">
                    {p.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-sans">
                    {p.title}
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center font-bold text-sm shrink-0">
                  0{idx + 1}
                </div>
              </div>

              <p className="text-sm text-slate-600 mt-4 leading-relaxed max-w-3xl">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
