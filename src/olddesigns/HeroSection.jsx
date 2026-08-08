import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LayeredMetallicGoldButton from "./LayeredMetallicGoldButton";
import { useTheme } from "../context/ThemeContext";

export default function HeroSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      id="hero"
      className={`relative min-h-screen pt-28 pb-20 flex flex-col justify-center items-center selection:bg-amber-500 selection:text-slate-950 ${
        isLight
          ? "bg-[#FAF8F5] text-slate-900"
          : "bg-slate-950 text-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 space-y-16 text-center">
        
        {/* Main Vision Banner Title */}
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans"
          >
            Launch Your Future in <br />
            <span className="bg-gradient-to-r from-[#f5cb5c] via-[#e2b740] to-[#b8860b] bg-clip-text text-transparent italic font-serif">
              AI & Software Engineering.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={`text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed ${
              isLight ? "text-slate-600" : "text-slate-300"
            }`}
          >
            Turing Wings is an AI-native engineering ecosystem designed to build, empower, and scale next-generation creators and developers.
          </motion.p>
        </div>

        {/* CORE PILLARS GRID: 3 GOLD-RIMMED CARDS (LEARN. / BUILD. / INNOVATE.) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: LEARN. */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className={`rounded-2xl p-7 sm:p-8 border shadow-xl flex flex-col justify-between text-left relative overflow-hidden transition-all ${
              isLight
                ? "bg-white/90 border-[#d8d0be] hover:border-[#e2b740] shadow-amber-500/5"
                : "bg-[#0e1118]/90 border-[#e2b740]/40 hover:border-[#e2b740] shadow-amber-500/10"
            }`}
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif italic text-[#e2b740] mb-3">
                LEARN.
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                isLight ? "text-slate-700" : "text-slate-300"
              }`}>
                Discover the next era of technology. Learn with purpose, build with precision, and scale with real-world impact.
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <LayeredMetallicGoldButton
                text="View Cohorts"
                to="/programs"
                size="md"
                className="w-full text-center"
              />
            </div>
          </motion.div>

          {/* Card 2: BUILD. */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -6 }}
            className={`rounded-2xl p-7 sm:p-8 border shadow-xl flex flex-col justify-between text-left relative overflow-hidden transition-all ${
              isLight
                ? "bg-white/90 border-[#d8d0be] hover:border-[#e2b740] shadow-amber-500/5"
                : "bg-[#0e1118]/90 border-[#e2b740]/40 hover:border-[#e2b740] shadow-amber-500/10"
            }`}
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif italic text-[#e2b740] mb-3">
                BUILD.
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                isLight ? "text-slate-700" : "text-slate-300"
              }`}>
                Participate in live buildathons, build production-grade web apps, and ship live projects with 1-on-1 mentor guidance.
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <LayeredMetallicGoldButton
                text="Explore Buildathons"
                to="/buildathons"
                size="md"
                className="w-full text-center"
              />
            </div>
          </motion.div>

          {/* Card 3: INNOVATE. */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6 }}
            className={`rounded-2xl p-7 sm:p-8 border shadow-xl flex flex-col justify-between text-left relative overflow-hidden transition-all ${
              isLight
                ? "bg-white/90 border-[#d8d0be] hover:border-[#e2b740] shadow-amber-500/5"
                : "bg-[#0e1118]/90 border-[#e2b740]/40 hover:border-[#e2b740] shadow-amber-500/10"
            }`}
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif italic text-[#e2b740] mb-3">
                INNOVATE.
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                isLight ? "text-slate-700" : "text-slate-300"
              }`}>
                Deploy AI agents, zero-trust cloud architectures, and scalable microservices that transform ideas into real products.
              </p>
            </div>

            <div className="pt-2 flex justify-center">
              <LayeredMetallicGoldButton
                text="Get Started"
                to="/contact"
                size="md"
                className="w-full text-center"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
