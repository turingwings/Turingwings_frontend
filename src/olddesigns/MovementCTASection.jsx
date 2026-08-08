import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import LayeredMetallicGoldButton from "./LayeredMetallicGoldButton";

export default function MovementCTASection() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      id="movement-cta"
      className={`py-24 sm:py-32 relative overflow-hidden scroll-mt-24 select-none transition-colors duration-500 ${
        isLight ? "bg-transparent text-slate-900" : "bg-transparent text-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`rounded-3xl p-10 sm:p-16 border backdrop-blur-md shadow-2xl text-center relative overflow-hidden ${
            isLight
              ? "bg-white/95 border-amber-500/40 shadow-amber-500/10"
              : "bg-[#0e1118]/95 border-amber-500/50 shadow-amber-500/20"
          }`}
        >
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">


            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              STEP INTO THE FUTURE OF{" "}
              <span className="bg-gradient-to-r from-[#fef08a] via-[#f7d774] to-[#d97706] bg-clip-text text-transparent font-serif italic">
                CREATION.
              </span>
            </h2>

            <p className={`text-base sm:text-xl font-medium leading-relaxed ${
              isLight ? "text-slate-700" : "text-slate-300"
            }`}>
              No pricing traps. No software locks. Just a global innovation headquarters where your ideas become digital reality with neural AI support.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <LayeredMetallicGoldButton
                text="Access Creator Portal"
                to="/portal/auth/v1/account-access"
                size="lg"
              />
              <LayeredMetallicGoldButton
                text="Contact Mentor Guild"
                to="/portal/support/v1/contact-team"
                size="lg"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
