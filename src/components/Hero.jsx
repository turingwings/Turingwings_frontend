import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Play } from 'lucide-react'
import introVideo from '../assets/intro.mp4'
import aiEngineerImg from '../assets/aiengineercohort.png'

const FLIP_WORDS = ['AUTOMATED', 'SCALED', 'INTELLIGENT', 'REIMAGINED']

export default function Hero() {
  const [isLaserDone, setIsLaserDone] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)

  // 1. Unmask ENGINEERING via top-to-bottom shutter print over 1.6s (reduced speed)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLaserDone(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // 2. Cycle through words with 1.8s unhurried dwell time once laser print completes
  useEffect(() => {
    if (!isLaserDone) return

    let current = 0
    const interval = setInterval(() => {
      current++
      if (current < FLIP_WORDS.length) {
        setWordIndex(current)
      } else {
        clearInterval(interval)
      }
    }, 1800)
    return () => clearInterval(interval)
  }, [isLaserDone])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  const isFinalWord = wordIndex === FLIP_WORDS.length - 1

  return (
    <section
      id="top"
      className="relative flex min-h-[85vh] sm:min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12 pt-20 sm:pt-28 pb-12 sm:pb-20 bg-white selection:bg-[#22C55E] selection:text-black font-sans"
    >
      {/* Studio architectural soft lighting backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_35%,rgba(255,255,255,1),rgba(245,245,248,0.5))]" />
      
      {/* Soft diagonal ambient studio shadow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/[0.02] via-transparent to-transparent" />
      
      {/* Bottom floor gradient line */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/[0.02] to-transparent" />

      {/* Subtle Logo Watermark Backdrop (Positioned slightly higher up) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex items-start justify-center overflow-hidden pointer-events-none">
        <img
          src="/Logos/BlackNoBg.png"
          alt=""
          className="w-[90vw] sm:w-[80vw] max-w-[900px] h-auto object-contain opacity-[0.06] select-none pointer-events-none -translate-y-24 sm:-translate-y-52 md:-translate-y-64"
        />
      </div>

      <div className="relative z-20 mx-auto flex w-full max-w-[1240px] flex-col items-center text-center my-4 sm:my-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative flex flex-col items-center text-center max-w-4xl mx-auto space-y-5 sm:space-y-8"
        >
          {/* Main Headline with Precision Shutter/Slice Laser Reveal */}
          <motion.h1
            variants={item}
            className="text-[clamp(2.1rem,8.2vw,6.8rem)] font-extrabold leading-[1.0] sm:leading-[0.95] tracking-[-0.03em] text-[#090909] uppercase font-sans break-words pt-1"
          >
            {/* First Line: Precision Shutter / Slice Unmasking for ENGINEERING (1.6s unhurried speed) */}
            <div className="relative inline-block overflow-hidden py-0.5">
              {/* Unmasking typography */}
              <motion.span
                initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', opacity: 0 }}
                animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="block font-extrabold select-none tracking-[-0.03em] text-[#090909]"
              >
                ENGINEERING
              </motion.span>
            </div>

            <br />

            {/* Second Line: Starts word flip animation after laser print completes */}
            <span className="inline-block relative overflow-hidden align-bottom py-1 min-h-[1.15em] px-2" style={{ perspective: 1000 }}>
              <AnimatePresence mode="wait">
                {isLaserDone && (
                  <motion.span
                    key={FLIP_WORDS[wordIndex]}
                    initial={
                      isFinalWord
                        ? { opacity: 0, scale: 1.25, y: 12, filter: 'blur(8px)' }
                        : { opacity: 0, y: 20, rotateX: -35 }
                    }
                    animate={
                      isFinalWord
                        ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
                        : { opacity: 1, y: 0, rotateX: 0 }
                    }
                    exit={{ opacity: 0, y: -20, rotateX: 35 }}
                    transition={
                      isFinalWord
                        ? { duration: 0.95, ease: [0.175, 0.885, 0.32, 1.2] }
                        : { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
                    }
                    className={
                      isFinalWord
                        ? "inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#090909] via-black to-[#22C55E] transform-gpu drop-shadow-[0_0_25px_rgba(34,197,94,0.35)]"
                        : "inline-block text-black/75 transform-gpu"
                    }
                    style={{ transformOrigin: '50% 50% -20px' }}
                  >
                    {FLIP_WORDS[wordIndex]}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Clean Subheadline */}
          <motion.p
            variants={item}
            className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[#333333] font-sans"
          >
            Hands-on, AI-driven engineering cohorts and buildathons for developers ready to build production-scale applications.
          </motion.p>

          {/* Dual Call-to-Action Strategy */}
          <motion.div variants={item} className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            {/* Primary CTA */}
            <Link
              to="/cohorts"
              onClick={(e) => {
                const el = document.getElementById('cohorts') || document.getElementById('experience')
                if (el && window.location.pathname === '/') {
                  e.preventDefault()
                  el.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="group w-full sm:w-auto inline-flex items-center justify-center min-h-[44px] text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#090909] border border-[#090909] px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#22C55E] hover:text-black hover:border-[#22C55E] shadow-xl font-sans touch-action-manipulation"
            >
              <span>EXPLORE FLAGSHIP COHORTS</span>
            </Link>

            {/* Secondary Low-Friction CTA -> Navigates to /buildvault (Commented out for now) */}
            {/* 
            <Link
              to="/buildvault"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[44px] text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#090909] bg-[#ffffff] border border-black/20 hover:border-black hover:bg-black/5 px-7 py-4 rounded-full transition-all duration-300 font-sans shadow-sm touch-action-manipulation"
            >
              <Play className="w-3.5 h-3.5 text-[#22C55E] fill-[#22C55E]" />
              <span>SEE COHORT SHOWCASE</span>
            </Link>
            */}
          </motion.div>

          {/* Bespoke Product Showcase Frame (Commented out for now) */}
          {/* 
          <motion.div
            id="product-showcase"
            variants={item}
            className="w-full max-w-4xl mt-8 sm:mt-12"
          >
            <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-black/10 shadow-2xl p-2 sm:p-3 overflow-hidden">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-video bg-[#090909] flex items-center justify-center">
                <video
                  src={introVideo}
                  poster={aiEngineerImg}
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                />
              </div>
            </div>
          </motion.div>
          */}

        </motion.div>
      </div>
    </section>
  )
}



