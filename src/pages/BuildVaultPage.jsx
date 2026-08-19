import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Trophy, Rocket, ShieldCheck } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function BuildVaultPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#090909] selection:bg-[#22C55E] selection:text-black flex flex-col justify-between font-sans overflow-x-hidden">
      <Navbar />

      <main className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* Studio architectural soft lighting backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_35%,rgba(255,255,255,1),rgba(240,240,244,0.75))]" />
        
        {/* Soft diagonal ambient studio shadow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/[0.03] via-transparent to-transparent" />

        {/* Subtle grid pattern overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Logo Watermark Backdrop (Positioned higher up towards top) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex items-start justify-center overflow-hidden">
          <img
            src="/Logos/BlackNoBg.png"
            alt=""
            className="w-[85vw] max-w-[900px] h-auto object-contain opacity-[0.12] select-none pointer-events-none -translate-y-20 sm:-translate-y-36 md:-translate-y-48"
          />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-8 sm:space-y-10 my-auto">
          
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase text-[#090909] font-sans"
          >
            BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#090909] via-black to-[#22C55E]">VAULT</span>
          </motion.h1>

          {/* Fully Transparent Announcement Card showing Watermark underneath */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl bg-transparent border border-black/15 p-8 sm:p-12 overflow-hidden text-left space-y-6 group"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-xs font-mono font-bold text-[#1ea34d]">
                <Rocket className="w-3.5 h-3.5" />
                LAUNCHING SOON
              </span>
              <span className="text-xs font-mono text-black/40">• PRODUCT PREPARATION</span>
            </div>

            {/* Core Message */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug tracking-tight text-[#090909] uppercase font-sans">
                REGISTER FOR OUR COHORTS AND YOU MIGHT BECOME THE SHOWCASE HERE BECAUSE WE HAVE NOT LAUNCHED YET!
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#333333] font-sans leading-relaxed">
                Our flagship cohorts are preparing for liftoff. Register now to build production-grade AI &amp; cybersecurity solutions and get your project featured in the official Turing Wings Build Vault!
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-black/10 text-xs font-sans text-[#090909]">
              <div className="flex items-center gap-2.5 bg-white/40 border border-black/10 p-3.5 rounded-xl backdrop-blur-sm">
                <Trophy className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span className="font-semibold">Featured Product Showcase</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/40 border border-black/10 p-3.5 rounded-xl backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span className="font-semibold">Production Architecture</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/40 border border-black/10 p-3.5 rounded-xl backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span className="font-semibold">Early Access Pass</span>
              </div>
            </div>

            {/* CTA Button inside Card */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/cohorts"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#090909] text-white border border-[#090909] font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#22C55E] hover:text-black hover:border-[#22C55E] transition-all duration-300 shadow-xl"
              >
                <span>REGISTER FOR OUR COHORTS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
