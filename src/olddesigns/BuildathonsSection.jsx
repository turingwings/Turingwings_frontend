import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Zap, Clock, CheckCircle2 } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import LayeredMetallicGoldButton from "./LayeredMetallicGoldButton";

export default function BuildathonsSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [notifiedEvents, setNotifiedEvents] = useState({});

  const toggleNotify = (idx) => {
    setNotifiedEvents((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const events = [
    {
      title: "Global 48-Hour Vibe Coding Sprint",
      date: "Upcoming Soon — Batch 01",
      mode: "Global Discord & Campus Lab",
      lead: "Turing Wings Team",
      desc: "Transform raw concepts into deployed full-stack web applications in 48 hours using Cursor, Claude 3.7, and agent swarms.",
      status: "UPCOMING SOON",
    },
    {
      title: "Offensive Cyber Shield Masterclass",
      date: "Upcoming Soon — Batch 01",
      mode: "Virtual Interactive Lab",
      lead: "Ratnakar — Cybersecurity Lead",
      desc: "Deep-dive into penetration testing AI endpoints, auditing prompt injection vectors, and configuring Zero-Trust shields.",
      status: "UPCOMING SOON",
    },
    {
      title: "Spatial UI & Glassmorphism Canvas Workshop",
      date: "Upcoming Soon — Batch 02",
      mode: "Live Design Studio Session",
      lead: "Pandu Ranga — Spatial UI Lead",
      desc: "Learn how to build 60 FPS HTML5 3D particle canvas overlays, spatial card depth, and ultra-high-end web design systems.",
      status: "UPCOMING SOON",
    },
    {
      title: "Autonomous Agent Swarms Hackathon",
      date: "Upcoming Soon — Batch 02",
      mode: "Global Creator Guild Arena",
      lead: "Sahith Akula & Manoj Kumar",
      desc: "Build multi-agent autonomous teams that write code, execute unit tests, and auto-deploy microservices without human friction.",
      status: "UPCOMING SOON",
    },
  ];

  return (
    <section
      id="events"
      className={`py-24 sm:py-32 relative overflow-hidden scroll-mt-24 select-none transition-colors duration-500 ${
        isLight ? "bg-transparent text-slate-900" : "bg-transparent text-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (No top pill badge) */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            BUILDATHONS &{" "}
            <span className="bg-gradient-to-r from-[#fef08a] via-[#f7d774] to-[#d97706] bg-clip-text text-transparent font-serif italic">
              EVENTS.
            </span>
          </h2>

          <p className={`text-base sm:text-lg ${isLight ? "text-slate-700" : "text-slate-300"}`}>
            High-energy 48-hour build sprints, hands-on masterclasses, and global hackathons launching very soon.
          </p>
        </div>

        {/* 4 EVENT CARDS GRID WITH UPCOMING SOON BADGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-16">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`rounded-3xl p-8 border backdrop-blur-md shadow-xl flex flex-col justify-between transition-all ${
                isLight
                  ? "bg-white/90 border-[#d8d0be] hover:border-[#e2b740]"
                  : "bg-[#0e1118]/90 border-[#e2b740]/30 hover:border-[#e2b740]"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase bg-amber-500/15 border border-amber-500/30 text-[#e2b740] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{event.status}</span>
                  </span>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#e2b740]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.date}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold">{event.title}</h3>
                
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>{event.mode}</span>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                  {event.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/20 mt-6 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">
                  Lead: {event.lead}
                </span>

                <button
                  type="button"
                  onClick={() => toggleNotify(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border ${
                    notifiedEvents[idx]
                      ? "bg-green-500/20 border-green-500/40 text-green-400"
                      : isLight
                      ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300"
                      : "bg-slate-900 hover:bg-slate-800 text-amber-300 border-amber-500/30"
                  }`}
                >
                  {notifiedEvents[idx] ? (
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      <span>Notified</span>
                    </span>
                  ) : (
                    <span>Notify Me On Launch</span>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
