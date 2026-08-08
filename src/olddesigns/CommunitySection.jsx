import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Users, Award, Code, Activity, Star, ShieldCheck, HeartHandshake } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import LayeredMetallicGoldButton from "./LayeredMetallicGoldButton";

export default function CommunitySection() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const founders = [
    {
      name: "Ratnakar",
      role: "Cybersecurity Lead Mentor",
      specialty: "Offensive Cyber Architecture & Threat Defense",
      icon: ShieldCheck,
    },
    {
      name: "Sahith Akula",
      role: "Backend Lead Mentor",
      specialty: "Distributed Systems & AI Swarm Engineering",
      icon: Code,
    },
    {
      name: "Manoj Kumar",
      role: "Backend & Marketing Lead",
      specialty: "High-Scale Microservices & Creator Growth",
      icon: Activity,
    },
    {
      name: "Pandu Ranga",
      role: "Frontend & UI Design Lead",
      specialty: "Spatial UI/UX & Glassmorphism Canvas Systems",
      icon: Award,
    },
  ];

  const livePulse = [
    { time: "2 mins ago", text: "Aarav S. deployed AI Vibe Coding MVP to Vercel production" },
    { time: "12 mins ago", text: "Ratnakar completed Zero-Trust Security Audit for Guild #3" },
    { time: "34 mins ago", text: "Priya P. published 3D Spatial UI Canvas component" },
    { time: "1 hour ago", text: "Buildathon Sprint #16 announced: 48-Hour Agent Hackathon" },
  ];

  return (
    <section
      id="community"
      className={`py-24 sm:py-32 relative overflow-hidden scroll-mt-24 select-none transition-colors duration-500 ${
        isLight ? "bg-transparent text-slate-900" : "bg-transparent text-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-500">
            <Users className="w-3.5 h-3.5" />
            <span>GLOBAL CREATOR NETWORK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            COMMUNITY &{" "}
            <span className="bg-gradient-to-r from-[#fef08a] via-[#f7d774] to-[#d97706] bg-clip-text text-transparent font-serif italic">
              COLLABORATION.
            </span>
          </h2>

          <p className={`text-base sm:text-lg ${isLight ? "text-slate-700" : "text-slate-300"}`}>
            Guided by founding mentors and fueled by 500+ active builders across the world. No isolated learning—just pure collaborative creation.
          </p>
        </div>

        {/* FOUNDER & LEAD MENTORS GRID */}
        <div className="mb-16">
          <h3 className="text-xl sm:text-2xl font-extrabold font-serif italic mb-8 text-center text-[#e2b740]">
            FOUNDING MENTORS & LEADERS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {founders.map((f, idx) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`rounded-2xl p-6 border backdrop-blur-md shadow-xl flex flex-col justify-between transition-all ${
                    isLight
                      ? "bg-white/90 border-[#d8d0be] hover:border-[#e2b740]"
                      : "bg-[#0e1118]/90 border-[#e2b740]/30 hover:border-[#e2b740]"
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-[#e2b740] flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold">{f.name}</h4>
                    <span className="text-xs font-semibold text-[#e2b740] block mb-3">
                      {f.role}
                    </span>
                    <p className={`text-xs leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                      {f.specialty}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* LIVE COMMUNITY PULSE FEED */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className={`rounded-3xl p-6 sm:p-8 border backdrop-blur-md shadow-2xl ${
            isLight ? "bg-white/90 border-slate-200" : "bg-slate-900/90 border-amber-500/30"
          }`}>
            <div className="flex items-center justify-between mb-6 border-b border-slate-800/20 pb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#e2b740] animate-pulse" />
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#e2b740]">
                  LIVE CREATOR PULSE FEED
                </span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/30">
                REAL-TIME STREAM
              </span>
            </div>

            <div className="space-y-4 text-left">
              {livePulse.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-xs">
                  <span className={`font-semibold ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                    {item.text}
                  </span>
                  <span className="text-[10px] font-bold text-[#e2b740] flex-shrink-0">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Callout Banner with 3D Metallic Gold Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 p-8 sm:p-12 text-center text-slate-950 relative overflow-hidden shadow-2xl"
        >
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-950/15 border border-slate-950/20 text-slate-950 text-xs font-extrabold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join The Movement</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold font-serif italic text-slate-950">
              Join 500+ Confident Creators Building Today
            </h3>

            <p className="text-slate-950/90 font-medium text-sm sm:text-base">
              Start your journey from learning to creating. Master AI-powered workflows, vibe coding, and launch real digital projects.
            </p>

            <div className="pt-3 flex justify-center">
              <LayeredMetallicGoldButton
                text="Step Into Creator Hub"
                to="/portal/auth/v1/account-access"
                size="md"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
