import React, { useEffect, useRef, useState } from "react"

const traditional = [
  ['code', 'Write every line manually', 'Code everything by hand'],
  ['branch', 'Sequential handoffs', 'Pass work from one person to another'],
  ['bug', 'Debug after building', 'Find issues late in the process'],
  ['clock', 'Ship in long release cycles', 'Slow delivery. High uncertainty'],
]

const native = [
  ['sparkles', 'Direct AI-assisted building', 'Describe intent. AI builds with you.'],
  ['people', 'Human + AI collaboration', 'Work together in real-time.'],
  ['loop', 'Continuous feedback loops', 'AI reviews, tests, and improves.'],
  ['rocket', 'Prototype, test, ship faster', 'Ship more. Learn faster. Scale sooner.'],
]

function CompareIcon({ name }) {
  const props = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', className: 'w-5 h-5', 'aria-hidden': true }
  switch (name) {
    case 'code': return <svg {...props}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
    case 'branch': return <svg {...props}><line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" /></svg>
    case 'bug': return <svg {...props}><rect x="8" y="6" width="8" height="14" rx="4" /><path d="M6 13h12" /><path d="M4 9h16" /><path d="M6 17h12" /></svg>
    case 'clock': return <svg {...props}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
    case 'sparkles': return <svg {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z" /></svg>
    case 'people': return <svg {...props}><circle cx="9" cy="8" r="3" /><path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" /><circle cx="17" cy="9" r="2.5" /><path d="M14.5 20v-.5a3.5 3.5 0 0 1 3.5-3.5h.5" /></svg>
    case 'loop': return <svg {...props}><path d="M17 7a5 5 0 0 0-8.5 3.6" /><path d="M7 17a5 5 0 0 0 8.5-3.6" /><path d="M7 7v4H3" /><path d="M17 17v-4h4" /></svg>
    case 'rocket': return <svg {...props}><path d="M12 3c3 4 4.5 7.5 4.5 11a4.5 4.5 0 0 1-9 0C7.5 10.5 9 7 12 3z" /><path d="M9.5 14.5 8 21l4-2 4 2-1.5-6.5" /><path d="M12 11v2" /></svg>
    default: return <svg {...props}><circle cx="12" cy="12" r="10" /></svg>
  }
}

// Easing curves reused across the section
const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'
const EASE_SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

// Single source of truth for "are we on a phone-sized screen" — every
// layout decision below reads from this instead of relying on CSS media
// queries, because most of this component's layout is inline-styled and
// inline styles beat any external stylesheet's media query. Doing the
// responsive branching in JS keeps behavior guaranteed rather than hoping
// a class-based override wins the specificity fight.
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= breakpoint
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const handleChange = (e) => setIsMobile(e.matches)
    handleChange(mq)
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [breakpoint])

  return isMobile
}

function Row({ item, modern, visible, index, hovered, activeStage, onHover, onLeave, isMobile }) {
  const isHovered = hovered === index
  const isStageActive = activeStage === index

  return (
    <div
      className="compare-row"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      onClick={() => onHover(index)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: isMobile ? 10 : 14,
        padding: isMobile ? '9px 10px' : '10px 12px',
        borderRadius: '12px',
        backgroundColor: isStageActive ? (modern ? '#f0fdf4' : '#f8fafc') : (isHovered ? '#f4f4f5' : 'transparent'),
        border: `1px solid ${isStageActive ? (modern ? '#bbf7d0' : '#e2e8f0') : 'transparent'}`,
        opacity: visible ? 1 : 0,
        transform: visible
          ? (isHovered ? `translate(${modern ? 8 : -8}px, -2px)` : 'translateX(0)')
          : `translateX(${isMobile ? 0 : (modern ? 28 : -28)}px)`,
        transition: `all 0.4s ${EASE_OUT}`,
        transitionDelay: visible ? `${index * 90}ms` : '0ms',
        willChange: 'transform, opacity, background-color',
        cursor: 'pointer'
      }}
    >
      <div
        className="compare-icon"
        style={{
          flexShrink: 0,
          transform: isHovered || isStageActive ? 'scale(1.15) rotate(-4deg)' : 'scale(1) rotate(0deg)',
          transition: `transform 0.4s ${EASE_SPRING}`,
          color: modern && (isStageActive || isHovered) ? '#10b981' : '#111827'
        }}
      >
        <CompareIcon name={item[0]} />
      </div>
      <div className="compare-content">
        <h4 style={{ margin: 0, fontWeight: 600, color: '#111827', fontSize: isMobile ? '0.9rem' : undefined }}>{item[1]}</h4>
        <p style={{ margin: '2px 0 0 0', color: '#6b7280', fontSize: isMobile ? '0.8rem' : '0.875rem' }}>{item[2]}</p>
      </div>
    </div>
  )
}

const stages = [['code', 'BUILD'], ['people', 'COLLABORATE'], ['loop', 'IMPROVE'], ['rocket', 'SHIP']]

export default function Evolution() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [hovered, setHovered] = useState({ trad: null, modern: null })
  const [activeStage, setActiveStage] = useState(-1)
  const [isPaused, setIsPaused] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Auto-cycle through stages unless paused by user interaction
  useEffect(() => {
    if (!inView || isPaused) return
    let i = activeStage < 0 ? 0 : activeStage
    setActiveStage(i)
    const id = setInterval(() => {
      i = (i + 1) % stages.length
      setActiveStage(i)
    }, 1600)
    return () => clearInterval(id)
  }, [inView, isPaused, activeStage])

  const handleStageClick = (idx) => {
    setActiveStage(idx)
    setIsPaused(true)
  }

  return (
    <section id="experience" className="comparison-section bg-[#fafafa] border-b border-black/10 py-16 sm:py-24 md:py-32" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Dynamic Keyframes for Flow Line Animation */}
      <style>{`
        @keyframes flowPulse {
          0% { top: 0%; opacity: 0; }
          30% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes flowPulseHorizontal {
          0% { left: 0%; opacity: 0; }
          30% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>

      <div
        className="comparison-inner max-w-[1400px] mx-auto"
        style={{ padding: isMobile ? '0 16px' : '0 32px', boxSizing: 'border-box' }}
      >
        <div
          className="comparison-head mb-12 border-b border-black/10 pb-8"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(18px)',
            transition: `opacity 0.8s ${EASE_OUT}, transform 0.8s ${EASE_OUT}`,
          }}
        >
          <p className="font-mono text-xs font-bold tracking-widest text-black/50 uppercase mb-3">
            01 / EVOLUTION & ENGINEERING
          </p>
          <h2 className="text-[#090909] font-extrabold tracking-tight mb-4" style={{ fontSize: isMobile ? 'clamp(1.8rem, 7vw, 2.3rem)' : 'clamp(2.4rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
            From writing code<br /><span className="text-black/45">to orchestrating intelligence.</span>
          </h2>
          <p className="text-black/60 font-sans text-xs sm:text-sm max-w-lg leading-relaxed">
            The tools have changed. The role has evolved. Welcome to <b className="text-[#090909]">AI-Native Engineering.</b>
          </p>
        </div>

        <div
          className="comparison-layout"
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'stretch' : undefined,
            gap: isMobile ? 28 : undefined,
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* Traditional Side */}
          <div
            className="comparison-side"
            style={{
              width: isMobile ? '100%' : undefined,
              flex: isMobile ? '1 1 auto' : undefined,
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : `translateX(${isMobile ? 0 : -24}px)`,
              transition: `opacity 0.7s ${EASE_OUT}, transform 0.7s ${EASE_OUT}`,
            }}
          >
            <h3 style={{ fontSize: isMobile ? '1.05rem' : undefined }}>Traditional Software Engineering</h3>
            <div className="compare-list">
              {traditional.map((item, i) => (
                <Row
                  key={item[1]}
                  item={item}
                  index={i}
                  visible={inView}
                  hovered={hovered.trad}
                  activeStage={activeStage}
                  isMobile={isMobile}
                  onHover={(idx) => {
                    setHovered((h) => ({ ...h, trad: idx }))
                    setActiveStage(idx)
                  }}
                  onLeave={() => setHovered((h) => ({ ...h, trad: null }))}
                />
              ))}
            </div>
          </div>

          {/* Central Spine with Flow Lines */}
          <div
            className="comparison-spine"
            aria-label="Compared by building, collaboration, improvement and shipping"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: isMobile ? 'row' : 'column',
              alignItems: 'center',
              justifyContent: isMobile ? 'center' : undefined,
              width: isMobile ? '100%' : undefined,
              padding: isMobile ? '8px 0' : undefined,
              gap: isMobile ? 12 : undefined,
            }}
          >
            {!isMobile && (
              /* Connecting Vertical Flow Line — only makes sense once the two
                 sides sit next to each other; on mobile everything stacks, so
                 this is replaced with a horizontal divider line instead. */
              <div
                style={{
                  position: 'absolute',
                  top: '50px',
                  bottom: '20px',
                  width: '2px',
                  background: '#e5e7eb',
                  zIndex: 0,
                  borderRadius: '2px',
                  opacity: inView ? 1 : 0,
                  transition: 'opacity 0.8s ease'
                }}
              >
                {/* Active Traveling Pulse Beam */}
                <div
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '40px',
                    background: 'linear-gradient(to bottom, transparent, #10b981, transparent)',
                    animation: 'flowPulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
              </div>
            )}

            {isMobile && (
              /* Compact horizontal divider standing in for the vertical
                 spine line, sitting behind the stage pills. */
              <div
                style={{
                  position: 'absolute',
                  left: '4%',
                  right: '4%',
                  height: '2px',
                  background: '#e5e7eb',
                  zIndex: 0,
                  borderRadius: '2px',
                  opacity: inView ? 1 : 0,
                  transition: 'opacity 0.8s ease'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: '40px',
                    background: 'linear-gradient(to right, transparent, #10b981, transparent)',
                    animation: 'flowPulseHorizontal 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
              </div>
            )}

            {!isMobile && (
              <div
                className="comparison-vs"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'scale(1)' : 'scale(0.4)',
                  transition: `opacity 0.6s ${EASE_SPRING}, transform 0.6s ${EASE_SPRING}`,
                  transitionDelay: inView ? '250ms' : '0ms',
                  zIndex: 1,
                  background: '#fff',
                }}
              >
                <span>V</span>S
              </div>
            )}

            <div
              className="comparison-stages"
              style={{
                zIndex: 1,
                gap: isMobile ? '8px' : '20px',
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                flexWrap: isMobile ? 'wrap' : 'nowrap',
                justifyContent: isMobile ? 'center' : undefined,
                width: isMobile ? '100%' : undefined,
              }}
            >
              {stages.map(([icon, label], i) => {
                const isActive = activeStage === i
                return (
                  <div
                    className="comparison-stage"
                    key={label}
                    onClick={() => handleStageClick(i)}
                    style={{
                      cursor: 'pointer',
                      padding: isMobile ? '6px 10px' : '8px 12px',
                      borderRadius: '20px',
                      background: isActive ? '#f0fdf4' : '#ffffff',
                      border: `1px solid ${isActive ? '#86efac' : '#f3f4f6'}`,
                      boxShadow: isActive ? '0 4px 12px rgba(16, 185, 129, 0.15)' : 'none',
                      opacity: inView ? 1 : 0,
                      transform: inView
                        ? `translateY(0) scale(${isActive ? (isMobile ? 1.05 : 1.1) : 1})`
                        : `translateY(${isMobile ? 0 : 14}px) scale(1)`,
                      transition: `all 0.4s ${EASE_SPRING}`,
                      transitionDelay: inView ? `${380 + i * 120}ms` : '0ms',
                      display: 'flex',
                      alignItems: 'center',
                      gap: isMobile ? '6px' : '8px'
                    }}
                  >
                    <div
                      style={{
                        transform: isActive ? 'scale(1.2) rotate(-6deg)' : 'scale(1)',
                        transition: `transform 0.45s ${EASE_SPRING}`,
                        color: isActive ? '#10b981' : '#6b7280'
                      }}
                    >
                      <CompareIcon name={icon} />
                    </div>
                    <span
                      style={{
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? '#065f46' : '#9ca3af',
                        opacity: isActive ? 1 : 0.65,
                        transition: 'opacity 0.4s ease, color 0.4s ease',
                        fontSize: isMobile ? '0.68rem' : '0.75rem',
                        letterSpacing: '0.05em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* AI-Native Side */}
          <div
            className="comparison-side comparison-side-new"
            style={{
              width: isMobile ? '100%' : undefined,
              flex: isMobile ? '1 1 auto' : undefined,
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : `translateX(${isMobile ? 0 : 24}px)`,
              transition: `opacity 0.7s ${EASE_OUT}, transform 0.7s ${EASE_OUT}`,
            }}
          >
            <h3 style={{ fontSize: isMobile ? '1.05rem' : undefined }}>AI-Native Engineering</h3>
            <div className="compare-list">
              {native.map((item, i) => (
                <Row
                  key={item[1]}
                  item={item}
                  index={i}
                  modern
                  visible={inView}
                  hovered={hovered.modern}
                  activeStage={activeStage}
                  isMobile={isMobile}
                  onHover={(idx) => {
                    setHovered((h) => ({ ...h, modern: idx }))
                    setActiveStage(idx)
                  }}
                  onLeave={() => setHovered((h) => ({ ...h, modern: null }))}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}