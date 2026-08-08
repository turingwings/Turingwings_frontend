import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import heroImg from '../assets/hero1.png'

// ---- Timing constants (seconds) ----
const ASSEMBLE_DURATION = 1.8   // particles fly in from across the whole screen and form the image
const CROSSFADE_DURATION = 0.4  // particle canvas -> real <img>
const MOVE_DELAY = ASSEMBLE_DURATION + 0.3
const MOVE_DURATION = 1.1       // single clean glide from center to its resting spot on the right
const OVERLAY_CLEAR_DELAY = ASSEMBLE_DURATION + 0.15
const OVERLAY_CLEAR_DURATION = 1.1
const TEXT_DELAY = MOVE_DELAY + MOVE_DURATION * 0.4

const EASE = [0.16, 1, 0.3, 1]
const PARTICLE_COLOR = '17,17,17'
const SAMPLE_SIZE = 200 // fixed, small sampling resolution — decoupled from on-screen size, this is what was slow

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

// Runs fn on the next idle slot instead of blocking the current frame/paint
function whenIdle(fn) {
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(fn, { timeout: 200 })
  } else {
    setTimeout(fn, 0)
  }
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)
  const [phase, setPhase] = useState('assembling')
  const canvasRef = useRef(null)
  const particlesRef = useRef(null)
  const rafRef = useRef(null)
  const isMobileRef = useRef(false) // captured once, so a mid-animation breakpoint change can't restart the build

  const [formSize] = useState(() => {
    if (typeof window === 'undefined') return 640
    const mobile = window.innerWidth < 768
    return mobile
      ? Math.min(window.innerWidth * 0.82, 380)
      : Math.min(window.innerWidth * 0.5, 860)
  })

  // isMobileRef is read by the particle-building effect below. It's set here,
  // in an effect (not during render), and captured once on mount so a
  // mid-animation breakpoint change can't restart the build.
  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('assembled'), ASSEMBLE_DURATION * 1000)
    const t2 = setTimeout(() => setPhase('moving'), MOVE_DELAY * 1000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // Build + run the particle field. Runs exactly once — sampling work is deferred off the
  // critical render path, and done at a small fixed resolution regardless of display size,
  // which is what actually made this heavy before.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let cancelled = false

    const screenW = window.innerWidth
    const screenH = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 1) // no retina scaling on this transient layer — smoothness over crispness
    canvas.width = screenW * dpr
    canvas.height = screenH * dpr
    canvas.style.width = screenW + 'px'
    canvas.style.height = screenH + 'px'
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    const offsetX = (screenW - formSize) / 2
    const offsetY = (screenH - formSize) / 2
    const scaleToScreen = formSize / SAMPLE_SIZE
    const mobile = isMobileRef.current

    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      whenIdle(() => {
        if (cancelled) return

        const off = document.createElement('canvas')
        off.width = SAMPLE_SIZE
        off.height = SAMPLE_SIZE
        const octx = off.getContext('2d', { willReadFrequently: true })
        const ratio = Math.min(SAMPLE_SIZE / img.width, SAMPLE_SIZE / img.height)
        const w = img.width * ratio
        const h = img.height * ratio
        const ox = (SAMPLE_SIZE - w) / 2
        const oy = (SAMPLE_SIZE - h) / 2
        octx.drawImage(img, ox, oy, w, h)
        const data = octx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data

        const step = mobile ? 3 : 2
        const points = []
        for (let y = 0; y < SAMPLE_SIZE; y += step) {
          for (let x = 0; x < SAMPLE_SIZE; x += step) {
            const idx = (y * SAMPLE_SIZE + x) * 4
            if (data[idx + 3] > 80) {
              const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3
              points.push({
                x: offsetX + x * scaleToScreen,
                y: offsetY + y * scaleToScreen,
                shade: brightness
              })
            }
          }
        }

        const MAX_PARTICLES = mobile ? 500 : 1200
        const sampled = points.length > MAX_PARTICLES
          ? points.filter(() => Math.random() < MAX_PARTICLES / points.length)
          : points

        particlesRef.current = sampled.map((p) => ({
          sx: Math.random() * screenW,
          sy: Math.random() * screenH,
          tx: p.x,
          ty: p.y,
          baseOpacity: 0.25 + (p.shade / 255) * 0.6,
          delay: Math.random() * 0.35
        }))

        const start = performance.now()
        const totalMs = ASSEMBLE_DURATION * 1000
        ctx.fillStyle = `rgb(${PARTICLE_COLOR})`

        const draw = (now) => {
          if (cancelled) return
          const elapsed = (now - start) / totalMs
          ctx.clearRect(0, 0, screenW, screenH)
          const list = particlesRef.current
          for (let i = 0; i < list.length; i++) {
            const particle = list[i]
            const localT = Math.min(Math.max((elapsed - particle.delay) / (1 - particle.delay), 0), 1)
            const eased = easeOutCubic(localT)
            const x = particle.sx + (particle.tx - particle.sx) * eased
            const y = particle.sy + (particle.ty - particle.sy) * eased
            ctx.globalAlpha = particle.baseOpacity * eased
            ctx.fillRect(x - 0.9, y - 0.9, 1.8, 1.8)
          }
          ctx.globalAlpha = 1
          if (elapsed < 1.05) {
            rafRef.current = requestAnimationFrame(draw)
          }
        }
        rafRef.current = requestAnimationFrame(draw)
      })
    }
    img.src = heroImg

    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [formSize])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: TEXT_DELAY }
    }
  }

  const item = {
    hidden: { opacity: 0, x: -40, y: 10 },
    show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.9, ease: EASE } }
  }

  const restTarget = isMobile
    ? { x: 0, y: 0, scale: 0.85 }
    : { x: '26vw', y: '2%', scale: 0.98 }

  const centerTarget = { x: 0, y: 0, scale: 1 }
  const pinned = phase !== 'moving'

  return (
    <section
      id="top"
      className="relative flex min-h-[52vh] md:min-h-screen items-center justify-center overflow-hidden px-6 md:px-12 bg-[#fafafa]"
    >
      <motion.div
        className="pointer-events-none fixed inset-0 z-[40] backdrop-blur-3xl bg-[#fafafa]/70"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: OVERLAY_CLEAR_DELAY, duration: OVERLAY_CLEAR_DURATION, ease: 'easeOut' }}
        style={{ willChange: 'opacity' }}
      />

      <motion.canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[50] h-screen w-screen"
        animate={{ opacity: phase === 'assembling' ? 1 : 0 }}
        transition={{ duration: CROSSFADE_DURATION, ease: 'easeInOut' }}
        style={{ willChange: 'opacity' }}
      />

      <motion.div
        className={
          pinned
            ? 'pointer-events-none fixed z-[51] left-1/2 top-1/2'
            : 'pointer-events-none absolute z-0 left-1/2 top-1/2'
        }
        style={{ translateX: '-50%', translateY: '-50%', width: formSize, height: formSize, willChange: 'transform' }}
        initial={{ x: centerTarget.x, y: centerTarget.y, scale: centerTarget.scale }}
        animate={
          phase === 'moving'
            ? { x: restTarget.x, y: restTarget.y, scale: restTarget.scale }
            : { x: centerTarget.x, y: centerTarget.y, scale: centerTarget.scale }
        }
        transition={{ duration: MOVE_DURATION, ease: EASE }}
      >
        <motion.img
          src={heroImg}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'assembling' ? 0 : 1 }}
          transition={{ duration: CROSSFADE_DURATION, ease: 'easeInOut' }}
          style={{ willChange: 'opacity' }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center text-center md:items-start md:text-left mt-6 md:mt-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-20 flex flex-col items-center md:items-start"
        >
          <motion.h1
            variants={item}
            className="text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.92] tracking-[-0.04em] text-[#111]"
          >
            Engineering<br />Reimagined.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-lg text-[clamp(1rem,1.5vw,1.25rem)] font-light leading-relaxed text-black/60"
          >
            Build with AI. Scale with purpose.
            <br className="hidden sm:block" />
            Lead the future of engineering.
          </motion.p>

          <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/cohorts"
              onClick={(e) => {
                const el = document.getElementById('cohorts') || document.getElementById('experience')
                if (el && window.location.pathname === '/') {
                  e.preventDefault()
                  el.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="inline-flex items-center gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#111] bg-white border border-black/15 px-6 py-3 rounded-full transition-all hover:bg-[#22C55E] hover:text-black hover:border-[#22C55E] shadow-sm font-mono"
            >
              <span>Explore Flagship Cohorts</span>
              <span className="text-[#22C55E] transition-colors group-hover:text-black">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}