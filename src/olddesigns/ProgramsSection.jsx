import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, Check, Sparkles, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import LayeredMetallicGoldButton from "./LayeredMetallicGoldButton";

export default function ProgramsSection() {
  const [activeCourseIndex, setActiveCourseIndex] = useState(0);
  const [selectedModal, setSelectedModal] = useState(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const programs = [
    {
      id: "mern-vibe-coding",
      title: "Full-Stack MERN & AI Vibe Coding Guild",
      subtitle: "Master MongoDB, Express.js, React 19 & Node.js amplified with Cursor AI pair programming and vibe coding velocity.",
      duration: "6 Weeks",
      level: "Beginner to Advanced",
      badge: "Launch Guild 01",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
      highlights: ["MERN Stack Architecture", "AI Vibe Coding Velocity", "Production Cloud Deployment"],
      iconSvg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      syllabus: [
        "Week 1: Modern JavaScript ES6+, Node.js & Express API Core",
        "Week 2: MongoDB Schemas, Mongoose & Vector Database Integration",
        "Week 3: React 19 Frontend Architecture & Tailwind Styling System",
        "Week 4: AI Vibe Coding: Rapid Prompt-to-Component Workflows",
        "Week 5: Full-Stack Authentication, State & Security Best Practices",
        "Week 6: Production Build, Cloud Deployment & Capstone Launch"
      ]
    },
    {
      id: "cyber-security",
      title: "Cyber Security & Threat Defense Guild",
      subtitle: "Learn zero-trust cloud architecture, vulnerability scanning, penetration testing, and AI endpoint security led by Ratnakar.",
      duration: "6 Weeks",
      level: "Beginner to Advanced",
      badge: "Launch Guild 02",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
      highlights: ["Zero-Trust Protocols", "Offensive Penetration Testing", "Cloud Threat Shielding"],
      iconSvg: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      syllabus: [
        "Week 1: Fundamentals of Network Security & Packet Auditing",
        "Week 2: Zero-Trust Security Protocols & IAM Architecture",
        "Week 3: Offensive Security: Ethical Hacking & Vulnerability Scans",
        "Week 4: Securing AI Endpoints & Auditing Prompt Injection Risks",
        "Week 5: Cloud Security, OAuth 2.0 & SAML Compliance",
        "Week 6: Real-World Penetration Testing & Defense Capstone"
      ]
    }
  ];

  const activeCourse = programs[activeCourseIndex];

  return (
    <section
      id="programs"
      className={`py-16 sm:py-24 relative overflow-hidden scroll-mt-20 select-none transition-colors duration-500 ${
        isLight ? "bg-transparent text-slate-900" : "bg-transparent text-slate-100"
      }`}
    >
      {/* Static Ambient Gold Mesh Glow */}
      <div className={`absolute top-1/4 right-10 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none ${
        isLight ? "bg-amber-300/30" : "bg-amber-500/15"
      }`} />
      
      <div className={`absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none ${
        isLight ? "bg-yellow-300/30" : "bg-yellow-500/15"
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">


          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            INNOVATION{" "}
            <span className="bg-gradient-to-r from-[#fef08a] via-[#f7d774] to-[#d97706] bg-clip-text text-transparent font-serif italic">
              GUILDS.
            </span>
          </h2>

          <p className={`text-base sm:text-lg ${isLight ? "text-slate-700" : "text-slate-300"}`}>
            Join specialized creator guilds inside the Turing Wings headquarters. Master full-stack vibe coding, cybersecurity shields, and AI agent architectures.
          </p>
        </div>

        {/* Interactive Course Selection Tabs */}
        <div className="flex overflow-x-auto pb-3 sm:pb-0 sm:flex-wrap justify-start sm:justify-center gap-2 mb-8 sm:mb-10 max-w-full">
          {programs.map((prog, idx) => (
            <button
              key={prog.id}
              onClick={() => setActiveCourseIndex(idx)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 shrink-0 border ${
                activeCourseIndex === idx
                  ? "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 shadow-md shadow-amber-500/25 scale-[1.02]"
                  : isLight
                  ? "bg-white text-slate-700 hover:text-amber-600 border-slate-200 shadow-sm"
                  : "bg-slate-900 text-slate-300 hover:text-amber-300 border-amber-500/20 shadow-sm"
              }`}
            >
              <span className="shrink-0">{prog.iconSvg}</span>
              <span>{prog.title.split(" ")[0]} {prog.title.split(" ")[1]}</span>
            </button>
          ))}
        </div>

        {/* Interactive Course Showcase Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCourse.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`rounded-3xl p-5 sm:p-10 shadow-2xl text-left grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative overflow-hidden border ${
              isLight ? "bg-white border-slate-200" : "bg-slate-900 border-amber-500/25"
            }`}
          >
            {/* Left Column: Concise Text Details */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider border ${
                  isLight ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-amber-500/10 border-amber-500/30 text-amber-300"
                }`}>
                  {activeCourse.duration}
                </span>
                <span className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold border ${
                  isLight ? "bg-slate-100 border-slate-200 text-slate-700" : "bg-slate-800 border-slate-700 text-slate-300"
                }`}>
                  {activeCourse.level}
                </span>
                {activeCourse.badge && (
                  <span className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase border ${
                    isLight ? "bg-yellow-50 border-yellow-200 text-yellow-800" : "bg-amber-500/15 border-amber-500/40 text-yellow-300"
                  }`}>
                    {activeCourse.badge}
                  </span>
                )}
              </div>

              <h3 className={`text-2xl sm:text-3xl font-extrabold font-serif italic leading-tight ${
                isLight ? "text-slate-900" : "text-white"
              }`}>
                {activeCourse.title}
              </h3>

              <p className={`text-xs sm:text-sm leading-relaxed ${
                isLight ? "text-slate-600" : "text-slate-300"
              }`}>
                {activeCourse.subtitle}
              </p>

              {/* Punchy Key Highlights */}
              <div className="space-y-2 pt-1 sm:pt-2">
                {activeCourse.highlights.map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-2 text-xs font-semibold ${
                    isLight ? "text-slate-800" : "text-slate-200"
                  }`}>
                    <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 border ${
                      isLight ? "bg-amber-50 border-amber-200 text-amber-600" : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                    }`}>
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <LayeredMetallicGoldButton
                  text="Enroll In Bootcamp"
                  to="/portal/auth/v1/account-access"
                  size="md"
                />

                <button
                  type="button"
                  onClick={() => setSelectedModal(activeCourse)}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-xs transition-all text-center border my-1.5 ${
                    isLight
                      ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 shadow-sm"
                      : "bg-slate-800 hover:bg-slate-700 text-amber-200 border-amber-500/20 shadow-sm"
                  }`}
                >
                  View Quick Syllabus
                </button>
              </div>

            </div>

            {/* Right Column: Real Course Preview Image */}
            <div className="lg:col-span-6 relative mt-2 lg:mt-0">
              <div className={`relative rounded-2xl overflow-hidden shadow-xl border ${
                isLight ? "border-slate-200" : "border-amber-500/30"
              }`}>
                <img
                  src={activeCourse.image}
                  alt={activeCourse.title}
                  className="w-full h-48 sm:h-80 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                
                <div className={`absolute bottom-3 left-3 right-3 p-3 sm:p-4 rounded-xl backdrop-blur-md shadow-lg flex items-center justify-between border ${
                  isLight ? "bg-white/90 border-white/80 text-slate-900" : "bg-slate-900/90 border-amber-500/30 text-white"
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-500 flex items-center justify-center shrink-0">
                      {activeCourse.iconSvg}
                    </div>
                    <div>
                      <p className="text-xs font-bold font-serif italic">{activeCourse.title}</p>
                      <p className="text-[10px] text-amber-500 font-semibold">{activeCourse.duration} • Practical Creation</p>
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 animate-pulse" />
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* Quick Syllabus Modal */}
      <AnimatePresence>
        {selectedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border text-left relative ${
                isLight ? "bg-white border-slate-200 text-slate-900" : "bg-slate-900 border-amber-500/30 text-white"
              }`}
            >
              <button
                onClick={() => setSelectedModal(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg sm:text-xl font-bold font-serif italic mb-4 pr-6">
                {selectedModal.title} — Syllabus
              </h3>

              <div className="space-y-2.5 mb-6">
                {selectedModal.syllabus.map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
                    isLight ? "bg-slate-50 border-slate-200 text-slate-800" : "bg-slate-950 border-slate-800 text-slate-200"
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Link
                  to="/portal/auth/v1/account-access"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-extrabold text-xs shadow-md"
                >
                  Enroll Now →
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
