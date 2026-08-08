import React from "react";
import { Link } from "react-router-dom";
import { Terminal, ShieldCheck, ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import LayeredMetallicGoldButton from "./LayeredMetallicGoldButton";

const FLAGSHIP_COHORTS = [
  {
    id: "ai-se",
    title: "AI Software Engineering",
    desc: "Master full-stack AI-native development, Sonnet agent prompt engineering, and multi-agent swarms.",
    icon: Terminal,
    tag: "Flagship Cohort • Batch 01",
    duration: "12 Weeks Live",
  },
  {
    id: "ai-sec",
    title: "AI Cyber Security",
    desc: "Master zero-trust cloud architecture, automated vulnerability scanning, and AI prompt injection defense.",
    icon: ShieldCheck,
    tag: "Specialized Track • Batch 01",
    duration: "10 Weeks Live",
  },
];

export default function CohortsShowcaseSection() {
  return (
    <section id="cohorts" className="py-24 bg-slate-100/70 text-slate-900 relative selection:bg-amber-500 selection:text-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Section 5 — Explore Our Cohorts</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Flagship AI Engineering Experiences
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            Immersive live learning experiences. Build production-ready portfolio projects with 1-on-1 lead mentor guidance.
          </p>
        </div>

        {/* Cinematic Cohort Showcase Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Cohort Showcase Cards */}
          {FLAGSHIP_COHORTS.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-amber-500/60 transition-all flex flex-col justify-between space-y-6 group shadow-sm hover:shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-amber-700 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                      {c.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{c.duration}</span>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7 text-slate-950" />
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {c.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <Link
                  to="/programs"
                  className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-amber-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>Explore Cohort</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </Link>
              </div>
            );
          })}

          {/* Final Showcase Panel: Community Gateway */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-white border border-amber-500/30 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-700 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                Community Gateway
              </span>

              <h3 className="text-2xl font-extrabold text-slate-900">
                Stay Connected & Never Miss a Launch
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                Join our Discord community, follow live announcements, and participate in upcoming buildathons.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                to="/programs"
                className="w-full py-3 px-4 rounded-2xl bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-amber-600 transition-all"
              >
                <span>Explore All Our Cohorts</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>

              <a
                href="https://discord.gg/turingwings"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>Join Our Discord Community</span>
              </a>

              <a
                href="https://instagram.com/turingwings"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-all"
              >
                <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.5 6.5h.01" />
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>Follow Our Instagram Channel</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
