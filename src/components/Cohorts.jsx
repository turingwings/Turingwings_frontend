import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './cohorts.css'

// Cohort artwork — adjust the path below if your assets folder lives
// somewhere other than "../assets" relative to this file.
import aiEngineeringCohort from '../assets/aiengineercohort.png'
import aiCybersecurityCohort from '../assets/cybercohort.png'

gsap.registerPlugin(ScrollTrigger)

// This runs once, at module load. The real cause of the mobile "gap after
// the section" / jumpy feel: mobile browsers resize the viewport (address
// bar hiding/showing) WHILE the user scrolls a pinned element, which
// desyncs GSAP's pin-spacer height from the actual content height and
// leaves dead space behind. `normalizeScroll` locks the page against that
// viewport resizing during scroll (drives scrolling via transforms instead
// of native scroll position), and `ignoreMobileResize` stops those same
// address-bar resizes from triggering needless ScrollTrigger refreshes.
// Together they're the standard fix for pinned sections on mobile and
// apply page-wide, so this also stops the section from disturbing
// whatever sits above/below it.
if (typeof window !== 'undefined') {
  ScrollTrigger.config({ ignoreMobileResize: true })
  ScrollTrigger.normalizeScroll(true)
}

/* ═══════════════════════════════════════════════════════════════════════════
   COHORT DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const cohorts = [
  {
    id: 'ai-engineering',
    number: '01',
    title: 'AI Engineering Cohort',
    description: 'From understanding the web to building, deploying, securing and launching modern AI-powered products.',
    technologies: ['Antigravity', 'Cursor', 'Claude', 'React', 'Node.js', 'Supabase', 'Docker'],
    duration: '4 weeks',
    path: '/cohorts/ai-engineering',
    image: aiEngineeringCohort,
  },
  {
    id: 'ai-cybersecurity',
    number: '02',
    title: 'AI & Cybersecurity Cohort',
    description: 'Networking Fundamentals, Web Security, AI-Assisted Scripting, and Autonomous AI Security Agents.',
    technologies: ['Kali Linux', 'Burp Suite', 'Nmap', 'Python', 'Ollama', 'OpenClaw', 'MCP'],
    duration: '4 weeks',
    path: '/cohorts/ai-cybersecurity',
    image: aiCybersecurityCohort,
  },
]

const featuredCohorts = cohorts
// When there's more than one cohort, append a closing "explore all cohorts"
// card so people can jump to the full cohorts listing page.
const showcaseItems =
  featuredCohorts.length > 1 ? [...featuredCohorts, { id: 'explore' }] : featuredCohorts
const socialLinks = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
]

/* ═══════════════════════════════════════════════════════════════════════════
   TRIONN-STYLE VISUAL ARTWORK STAGE FOR EACH COHORT
   ═══════════════════════════════════════════════════════════════════════════ */
function CohortVisualStage({ cohort }) {
  const { number, id, image, title } = cohort

  return (
    <div className="cohort-visual-stage">
      <span className="cohort-stage-tag">PROGRAM {number}</span>
      <span className="cohort-stage-number">{number}</span>
      <div className="cohort-stage-graphic">
        {image && (
          <img
            src={image}
            alt={title}
            className="cohort-stage-image"
            loading="lazy"
          />
        )}
        {!image && id === 'web-dev' && (
          <svg viewBox="0 0 500 350" className="w-full h-full p-8 opacity-90">
            <rect x="40" y="40" width="420" height="270" rx="12" fill="#FFFFFF" stroke="#E2E2E6" strokeWidth="2" />
            <path d="M40 85 H460" stroke="#E2E2E6" strokeWidth="2" />
            <circle cx="65" cy="62" r="5" fill="#D1D1D6" />
            <circle cx="82" cy="62" r="5" fill="#D1D1D6" />
            <circle cx="99" cy="62" r="5" fill="#D1D1D6" />
            <rect x="70" y="115" width="160" height="24" rx="4" fill="#F0F0F4" />
            <rect x="70" y="155" width="220" height="14" rx="3" fill="#E8E8EC" />
            <rect x="70" y="180" width="180" height="14" rx="3" fill="#F0F0F4" />
            <rect x="310" y="115" width="120" height="140" rx="8" fill="#F7F7FA" stroke="#E2E2E6" strokeWidth="1.5" />
            <circle cx="370" cy="170" r="30" fill="none" stroke="#111111" strokeWidth="2.5" strokeDasharray="4 6" />
          </svg>
        )}
        {id === 'ai-eng' && (
          <svg viewBox="0 0 500 350" className="w-full h-full p-8 opacity-90">
            <circle cx="250" cy="175" r="110" fill="none" stroke="#E0E0E5" strokeWidth="1.5" />
            <circle cx="250" cy="175" r="75" fill="none" stroke="#D0D0D8" strokeWidth="1.5" strokeDasharray="6 8" />
            <path d="M140 175 Q250 80 360 175 T470 175" fill="none" stroke="#111111" strokeWidth="2.5" />
            <circle cx="250" cy="175" r="14" fill="#111111" />
            <circle cx="180" cy="130" r="8" fill="#666666" />
            <circle cx="320" cy="220" r="8" fill="#666666" />
            <circle cx="320" cy="130" r="8" fill="#999999" />
            <circle cx="180" cy="220" r="8" fill="#999999" />
          </svg>
        )}
        {id === 'cyber-sec' && (
          <svg viewBox="0 0 500 350" className="w-full h-full p-8 opacity-90">
            <path d="M250 50 L370 110 V200 C370 270 250 310 250 310 C250 310 130 270 130 200 V110 Z" fill="#F7F7FA" stroke="#111111" strokeWidth="2.5" />
            <path d="M250 85 L340 130 V195 C340 245 250 275 250 275 C250 275 160 245 160 195 V130 Z" fill="none" stroke="#E0E0E6" strokeWidth="1.5" />
            <rect x="220" y="160" width="60" height="50" rx="6" fill="#111111" />
            <path d="M235 160 V145 C235 136 242 128 250 128 C258 128 265 136 265 145 V160" fill="none" stroke="#111111" strokeWidth="3" />
          </svg>
        )}
        {id === 'flutter' && (
          <svg viewBox="0 0 500 350" className="w-full h-full p-8 opacity-90">
            <rect x="175" y="45" width="150" height="260" rx="20" fill="#FFFFFF" stroke="#111111" strokeWidth="2.5" />
            <rect x="220" y="58" width="60" height="6" rx="3" fill="#E2E2E6" />
            <path d="M200 120 L270 190 L240 220 L170 150 Z" fill="#111111" />
            <path d="M240 220 L300 160 H240 Z" fill="#777777" />
          </svg>
        )}
        {id === 'agentic-ai' && (
          <svg viewBox="0 0 500 350" className="w-full h-full p-8 opacity-90">
            <line x1="150" y1="175" x2="250" y2="100" stroke="#CCCCCC" strokeWidth="2" />
            <line x1="150" y1="175" x2="250" y2="250" stroke="#CCCCCC" strokeWidth="2" />
            <line x1="250" y1="100" x2="350" y2="175" stroke="#CCCCCC" strokeWidth="2" />
            <line x1="250" y1="250" x2="350" y2="175" stroke="#CCCCCC" strokeWidth="2" />
            <circle cx="150" cy="175" r="22" fill="#FFFFFF" stroke="#111111" strokeWidth="3" />
            <circle cx="250" cy="100" r="22" fill="#FFFFFF" stroke="#111111" strokeWidth="3" />
            <circle cx="250" cy="250" r="22" fill="#FFFFFF" stroke="#111111" strokeWidth="3" />
            <circle cx="350" cy="175" r="28" fill="#111111" />
            <text x="350" y="180" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">AI</text>
          </svg>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SINGLE COHORT CARD (TRIONN Editorial Style)
   ═══════════════════════════════════════════════════════════════════════════ */
function CohortCard({ cohort }) {
  return (
    <div className="cohort-showcase-card">
      <CohortVisualStage cohort={cohort} />

      <div className="cohort-card-footer">
        <div className="cohort-footer-info">
          <h3 className="cohort-showcase-title">{cohort.title}</h3>
          <p className="cohort-showcase-desc">{cohort.description}</p>
          <div className="cohort-tech-list">
            {cohort.technologies.map((tech, i) => (
              <span key={tech} className="cohort-tech-item">
                {tech}
                {i < cohort.technologies.length - 1 && <span className="cohort-tech-dot">·</span>}
              </span>
            ))}
            <span className="cohort-tech-dot">·</span>
            <span>{cohort.duration}</span>
          </div>
        </div>

        <Link to={cohort.path || '/cohorts'} className="cohort-showcase-cta">
          Explore Cohort
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

function ExploreCard() {
  return (
    <div className="cohort-showcase-card cohort-explore-card">
      <p className="cohort-explore-kicker">KEEP LEARNING</p>
      <h3>Explore every<br />cohort.</h3>
      <p>Find the right path for where you want to build next.</p>
      <Link to="/cohorts" className="cohort-explore-link">Explore all cohorts <span>→</span></Link>
      <div className="cohort-social-block">
        <p>Don&apos;t miss an update.</p>
        <div className="cohort-social-links">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} aria-label={social.label} title={social.label}>
              <SocialIcon name={social.label} />
              <span>{social.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function SocialIcon({ name }) {
  if (name === 'LinkedIn') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5H3.3V21h3.2V8.5ZM4.9 3A1.9 1.9 0 1 0 4.9 6.8 1.9 1.9 0 0 0 4.9 3ZM21 13.8c0-3.8-2-5.6-4.7-5.6-2.2 0-3.1 1.2-3.7 2v-1.7H9.4V21h3.2v-6.2c0-1.6.3-3.2 2.3-3.2 2 0 2 1.9 2 3.3V21H21v-7.2Z" /></svg>
  if (name === 'Instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" className="cohort-social-fill" /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.6 4.6 12 4.6 12 4.6s-5.6 0-7.5.5a3 3 0 0 0-2.1 2.1C2 9.1 2 12 2 12s0 2.9.4 4.8a3 3 0 0 0 2.1 2.1c1.9.5 7.5.5 7.5.5s5.6 0 7.5-.5a3 3 0 0 0 2.1-2.1C22 14.9 22 12 22 12s0-2.9-.4-4.8Z" /><path className="cohort-social-fill" d="m10 15.5 5-3.5-5-3.5v7Z" /></svg>
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COHORTS SECTION WITH TRIONN SHOWCASE ANIMATION
   ═══════════════════════════════════════════════════════════════════════════ */
export default function Cohorts() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const pinRef = useRef(null)
  const cardWrapperRefs = useRef([])
  const progressFillRef = useRef(null)
  const indicatorRefs = useRef([])
  const stRef = useRef(null)
  const prevActiveRef = useRef(-1)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // All scroll-derived geometry lives here so it can be recomputed
    // on every ScrollTrigger refresh (resize, font-load, etc.) instead
    // of being frozen at mount time.
    const metrics = {}

    // With normalizeScroll(true) active, document.documentElement.clientHeight
    // stays stable across the pinned scroll (unlike window.innerHeight, which
    // mobile browsers still change as the address bar hides/shows). Using the
    // stable value for the pin's `end` distance is what keeps the pin-spacer
    // height in sync with the actual scroll distance — no more leftover gap.
    const getViewportHeight = () =>
      document.documentElement.clientHeight || window.innerHeight

    const measure = () => {
      const cardEls = track.querySelectorAll('.cohort-showcase-card')
      if (cardEls.length === 0) return false

      // No header panel to dodge anymore, so the track starts flush at the
      // first card. The track's own CSS padding (6vw desktop / 20px mobile)
      // already gives it breathing room from the viewport edge.
      const viewportWidth = window.innerWidth
      const cardWidth = cardEls[0].offsetWidth
      const gap = parseFloat(getComputedStyle(track).gap) || 40
      const trackPadding = parseFloat(getComputedStyle(track).paddingLeft) || 0
      const maxTranslate = (cardEls.length - 1) * (cardWidth + gap)

      Object.assign(metrics, {
        viewportWidth,
        cardWidth,
        gap,
        trackPadding,
        maxTranslate,
      })
      return true
    }

    // quickTo generators — GSAP reuses a single tween per property instead
    // of spinning up a new one on every scroll tick, so each value glides
    // (eases) toward its target rather than snapping to it. This is what
    // actually produces the smoothing that `scrub` alone can't provide
    // when there's no linked timeline/animation.
    let quickX = null
    let quickProgress = null
    let cardQuick = []

    const setupTimer = setTimeout(() => {
      if (!measure()) return

      gsap.set(track, { x: 0, force3D: true })
      gsap.set(cardWrapperRefs.current, { scale: 0.94, opacity: 0.75 })

      quickX = gsap.quickTo(track, 'x', { duration: 0.55, ease: 'power3' })

      if (progressFillRef.current) {
        quickProgress = gsap.quickTo(progressFillRef.current, 'scaleX', {
          duration: 0.35,
          ease: 'power2.out',
        })
      }

      cardQuick = cardWrapperRefs.current.map((el) =>
        el
          ? {
              scale: gsap.quickTo(el, 'scale', { duration: 0.45, ease: 'power2.out' }),
              opacity: gsap.quickTo(el, 'opacity', { duration: 0.45, ease: 'power2.out' }),
            }
          : null
      )

      const st = ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: () => `+=${getViewportHeight() * (showcaseItems.length - 0.25)}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: () => measure(),
        onUpdate: (self) => {
          const progress = self.progress
          const { cardWidth, gap, trackPadding, maxTranslate, viewportWidth } = metrics

          // Progress bar fill
          if (quickProgress) quickProgress(progress)

          // Card track position — starts right at the first cohort card (x: 0)
          // and scrolls left toward the last card / explore-more card.
          const scrollStart = 0.02
          const scrollEnd = 0.98
          const normalizedProgress = Math.max(
            0,
            Math.min(1, (progress - scrollStart) / (scrollEnd - scrollStart))
          )

          const translateX = -normalizedProgress * maxTranslate
          if (quickX) quickX(translateX)

          // Find nearest card + drive scale/opacity
          const viewportCenter = viewportWidth / 2
          let nearestIndex = 0
          let nearestDistance = Infinity

          for (let i = 0; i < showcaseItems.length; i++) {
            const cardLeft = trackPadding + translateX + i * (cardWidth + gap)
            const cardCenter = cardLeft + cardWidth / 2
            const distance = Math.abs(cardCenter - viewportCenter)

            if (distance < nearestDistance) {
              nearestDistance = distance
              nearestIndex = i
            }

            const quick = cardQuick[i]
            if (quick) {
              const normalizedDist = Math.min(distance / (cardWidth * 1.2), 1)
              const scale = Math.max(0.94, 1.04 - normalizedDist * 0.1)
              const opacity = Math.max(0.75, 1 - normalizedDist * 0.25)
              quick.scale(scale)
              quick.opacity(opacity)
            }
          }

          // Update active card state
          if (nearestIndex !== prevActiveRef.current) {
            if (prevActiveRef.current >= 0) {
              const oldCard = cardWrapperRefs.current[prevActiveRef.current]?.querySelector('.cohort-showcase-card')
              if (oldCard) oldCard.classList.remove('is-active')
              const oldDot = indicatorRefs.current[prevActiveRef.current]
              if (oldDot) oldDot.classList.remove('is-active')
            }

            const newCard = cardWrapperRefs.current[nearestIndex]?.querySelector('.cohort-showcase-card')
            if (newCard) newCard.classList.add('is-active')
            const newDot = indicatorRefs.current[nearestIndex]
            if (newDot) newDot.classList.add('is-active')

            prevActiveRef.current = nearestIndex
          }
        },
      })

      stRef.current = st
    }, 150)

    return () => {
      clearTimeout(setupTimer)
      if (stRef.current) {
        stRef.current.kill()
        stRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    let resizeTimer
    const handleResize = () => {
      // Debounce so a drag-resize doesn't thrash refresh()/measure() on every pixel.
      // ignoreMobileResize (set above) already filters out mobile address-bar
      // resizes, so this just handles genuine width/orientation changes.
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <section ref={sectionRef} id="cohorts" className="cohort-showcase-section">
      <div ref={pinRef} className="cohort-showcase-sticky">
        <h2 className="cohort-section-heading">Cohorts</h2>

        {/* Horizontal card track with smooth scrolling — opens directly on the first cohort */}
        <div ref={trackRef} className="cohort-showcase-track">
          {showcaseItems.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => (cardWrapperRefs.current[i] = el)}
              className="cohort-showcase-card-wrapper"
            >
              {item.id === 'explore' ? <ExploreCard /> : <CohortCard cohort={item} />}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="cohort-progress-bar">
          <div
            ref={progressFillRef}
            className="cohort-progress-fill"
            style={{
              transform: 'scaleX(0)',
              transformOrigin: '0% 50%',
            }}
          />
        </div>

        {/* Active indicator dots */}
        <div className="cohort-showcase-indicator">
          {showcaseItems.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => (indicatorRefs.current[i] = el)}
              className="cohort-indicator-dot"
            />
          ))}
        </div>
      </div>
    </section>
  )
}