import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Globe, Cpu, Infinity, Compass, ArrowRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import LayeredMetallicGoldButton from "./LayeredMetallicGoldButton";

export default function FutureVisionSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const visionMilestones = [
    {
      year: "2026",
      title: "Decentralized Creator Labs",
      desc: "Establishing open-access creator headquarters, vibe coding workshops, and local maker guilds worldwide.",
    },
    {
      year: "2027",
      title: "Autonomous Agent Swarms",
      desc: "Deploying production software entirely via natural language intent, automated testing, and self-healing agent pipelines.",
    },
    {
      year: "2028",
      title: "Zero-Trust Cyber Shields",
      desc: "Pioneering open-source AI defense models to protect creator IP and secure decentralized web applications.",
    },
    {
      year: "2030",
      title: "Universal Human-AI Ecosystem",
      desc: "A world where any individual, regardless of background, can bring any complex software or hardware idea to life.",
    },
  ];

  return (
    <section
      id="future-vision"
      className={`py-24 sm:py-32 relative overflow-hidden scroll-mt-24 select-none transition-colors duration-500 ${
        isLight ? "bg-transparent text-slate-900" : "bg-transparent text-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">


          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            OUR FUTURE{" "}
            <span className="bg-gradient-to-r from-[#fef08a] via-[#f7d774] to-[#d97706] bg-clip-text text-transparent font-serif italic">
              VISION.
            </span>
          </h2>

          <p className={`text-base sm:text-lg ${isLight ? "text-slate-700" : "text-slate-300"}`}>
            We are building the foundation for a future where technology amplifies human ingenuity instead of replacing it.
          </p>
        </div>

        {/* 4 MILESTONES HORIZONTAL/VERTICAL TIMELINE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-16">
          {visionMilestones.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`rounded-2xl p-7 border backdrop-blur-md shadow-xl flex flex-col justify-between transition-all ${
                isLight
                  ? "bg-white/90 border-[#d8d0be] hover:border-[#e2b740]"
                  : "bg-[#0e1118]/90 border-[#e2b740]/30 hover:border-[#e2b740]"
              }`}
            >
              <div>
                <span className="text-3xl font-extrabold font-serif italic text-[#e2b740] block mb-3">
                  {m.year}
                </span>
                <h4 className="text-lg font-bold mb-2">{m.title}</h4>
                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
