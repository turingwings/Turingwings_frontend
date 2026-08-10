import React, { useEffect, useRef, useState } from "react"

// item shape: [iconKey, label]  — single line, no subpoint copy.
const traditional = [
  ['code', 'Write every line manually'],
  ['branch', 'Sequential handoffs'],
  ['bug', 'Debug after building'],
  ['clock', 'Ship in long release cycles'],
]

const native = [
  ['sparkles', 'Direct AI-assisted building'],
  ['people', 'Human + AI collaboration'],
  ['loop', 'Continuous feedback loops'],
  ['rocket', 'Prototype, test, ship faster'],
]

const stages = [['code', 'BUILD'], ['people', 'COLLABORATE'], ['loop', 'IMPROVE'], ['rocket', 'SHIP']]

// Hand-built inline SVG icon set — no external icon library.
function CompareIcon({ name, size = 18, strokeWidth = 1.8, color = 'currentColor' }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (name) {
    case 'code':
      return (
        <svg {...common}>
          <path d="M8 6L3 12l5 6" />
          <path d="M16 6l5 6-5 6" />
        </svg>
      )
    case 'branch':
      return (
        <svg {...common}>
          <line x1="6" y1="3" x2="6" y2="15" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 9a9 9 0 0 1-9 9" />
        </svg>
      )
    case 'bug':
      return (
        <svg {...common}>
          <rect x="7" y="8" width="10" height="10" rx="5" />
          <path d="M7 12H3" />
          <path d="M21 12h-4" />
          <path d="M8 8l-2.5-2.5" />
          <path d="M16 8l2.5-2.5" />
          <path d="M8 18l-2.5 2.5" />
          <path d="M16 18l2.5 2.5" />
          <path d="M12 8V5" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg {...common}>
          <path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4L12 3z" />
          <path d="M19 15l.8 2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
        </svg>
      )
    case 'people':
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M4 20c0-3 2-5 5-5s5 2 5 5" />
          <circle cx="17" cy="9" r="2.2" />
          <path d="M15.2 20c.2-2.2 1.6-4 3.6-4.3" />
        </svg>
      )
    case 'loop':
      return (
        <svg {...common}>
          <path d="M4 12a8 8 0 0 1 14-5.3L20 8" />
          <path d="M20 4v4h-4" />
          <path d="M20 12a8 8 0 0 1-14 5.3L4 16" />
          <path d="M4 20v-4h4" />
        </svg>
      )
    case 'rocket':
      return (
        <svg {...common}>
          <path d="M12 2c3 2 5 6 5 10 0 2-1 4-2 5l-3 3-3-3c-1-1-2-3-2-5 0-4 2-8 5-10z" />
          <circle cx="12" cy="10" r="1.4" />
          <path d="M9 16l-3 5" />
          <path d="M15 16l3 5" />
        </svg>
      )
    default:
      return null
  }
}

const FONT_STACK = "'Plus Jakarta Sans', 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'
const EASE_SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)'

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
  const active = isHovered || isStageActive

  return (
    <div
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      onClick={() => onHover(index)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? 10 : 12,
        padding: isMobile ? '10px 12px' : '9px 12px',
        borderRadius: '10px',
        boxSizing: 'border-box',
        backgroundColor: isStageActive ? (modern ? '#f0fdf4' : '#f8fafc') : (isHovered ? '#f4f4f5' : 'transparent'),
        border: `1px solid ${isStageActive ? (modern ? '#bbf7d0' : '#e2e8f0') : '#f1f1f2'}`,
        opacity: visible ? 1 : 0,
        transform: visible
          ? (isHovered ? `translate(${modern ? 6 : -6}px, 0)` : 'translateX(0)')
          : `translateX(${isMobile ? 0 : (modern ? 20 : -20)}px)`,
        transition: `all 0.35s ${EASE_OUT}`,
        transitionDelay: visible ? `${index * (isMobile ? 55 : 80)}ms` : '0ms',
        willChange: 'transform, opacity, background-color',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: isMobile ? 26 : 28,
          height: isMobile ? 26 : 28,
          borderRadius: '8px',
          backgroundColor: modern && active ? '#ecfdf5' : '#f4f4f5',
          transform: active ? 'scale(1.08) rotate(-3deg)' : 'scale(1) rotate(0deg)',
          transition: `transform 0.35s ${EASE_SPRING}, background-color 0.3s ease`,
          color: modern && active ? '#10b981' : '#111827',
        }}
      >
        <CompareIcon name={item[0]} size={isMobile ? 14 : 16} strokeWidth={isMobile ? 1.9 : 1.75} />
      </div>
      <h4
        style={{
          margin: 0,
          fontWeight: 600,
          color: '#1f2937',
          fontSize: isMobile ? '0.8rem' : '0.9rem',
          lineHeight: 1.3,
          letterSpacing: '-0.005em',
        }}
      >
        {item[1]}
      </h4>
    </div>
  )
}

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
    <section
      id="experience"
      style={{
        position: 'relative',
        overflow: 'hidden',
        fontFamily: FONT_STACK,
        backgroundColor: '#fafafa',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
      }}
      ref={sectionRef}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        #experience, #experience * { font-family: ${FONT_STACK}; }
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

      <div style={{ padding: isMobile ? '44px 0 52px' : '96px 0' }}>
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: isMobile ? '0 20px' : '0 32px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              borderBottom: '1px solid rgba(0,0,0,0.1)',
              marginBottom: isMobile ? '26px' : '40px',
              paddingBottom: isMobile ? '18px' : '28px',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.8s ${EASE_OUT}, transform 0.8s ${EASE_OUT}`,
            }}
          >
            <p
              style={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: isMobile ? '0.1em' : '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(0,0,0,0.5)',
                fontSize: isMobile ? '0.62rem' : '0.75rem',
                margin: 0,
                marginBottom: isMobile ? '8px' : '10px',
              }}
            >
              01 / EVOLUTION &amp; ENGINEERING
            </p>
            <h2
              style={{
                color: '#090909',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                fontSize: isMobile ? 'clamp(1.35rem, 6.2vw, 1.7rem)' : 'clamp(2.2rem, 3.6vw, 3.2rem)',
                lineHeight: isMobile ? 1.18 : 1.08,
                margin: 0,
                marginBottom: isMobile ? '8px' : '12px',
              }}
            >
              From writing code<br />
              <span style={{ color: 'rgba(0,0,0,0.45)' }}>to orchestrating intelligence.</span>
            </h2>
            <p
              style={{
                color: 'rgba(0,0,0,0.6)',
                maxWidth: '32rem',
                lineHeight: 1.55,
                fontSize: isMobile ? '0.78rem' : '0.95rem',
                margin: 0,
              }}
            >
              The tools have changed. The role has evolved. Welcome to{' '}
              <b style={{ color: '#090909' }}>AI-Native Engineering.</b>
            </p>
          </div>

          <div
            style={{
              display: isMobile ? 'flex' : 'grid',
              flexDirection: isMobile ? 'column' : undefined,
              gridTemplateColumns: isMobile ? undefined : '1fr 84px 1fr',
              alignItems: isMobile ? 'stretch' : 'start',
              gap: isMobile ? 14 : 32,
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* Traditional Side */}
            <div
              style={{
                minWidth: 0,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : `translateX(${isMobile ? 0 : -20}px)`,
                transition: `opacity 0.7s ${EASE_OUT}, transform 0.7s ${EASE_OUT}`,
              }}
            >
              <h3
                style={{
                  fontSize: isMobile ? '0.85rem' : '0.95rem',
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '-0.01em',
                  margin: 0,
                  marginBottom: isMobile ? '8px' : '10px',
                }}
              >
                Traditional Engineering
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 3 : 4 }}>
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

            {/* Central Spine */}
            <div
              aria-label="Compared by building, collaboration, improvement and shipping"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: isMobile ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: isMobile ? '6px 0' : '4px 0',
                gap: isMobile ? 8 : 16,
              }}
            >
              {!isMobile && (
                <div
                  style={{
                    position: 'absolute',
                    top: '44px',
                    bottom: '16px',
                    width: '2px',
                    background: '#e5e7eb',
                    zIndex: 0,
                    borderRadius: '2px',
                    opacity: inView ? 1 : 0,
                    transition: 'opacity 0.8s ease',
                  }}
                >
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
                <div
                  style={{
                    position: 'absolute',
                    left: '3%',
                    right: '3%',
                    height: '1.5px',
                    background: '#e5e7eb',
                    zIndex: 0,
                    borderRadius: '2px',
                    opacity: inView ? 1 : 0,
                    transition: 'opacity 0.8s ease',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '28px',
                      background: 'linear-gradient(to right, transparent, #10b981, transparent)',
                      animation: 'flowPulseHorizontal 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    }}
                  />
                </div>
              )}

              <div
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'scale(1)' : 'scale(0.4)',
                  transition: `opacity 0.6s ${EASE_SPRING}, transform 0.6s ${EASE_SPRING}`,
                  transitionDelay: inView ? '220ms' : '0ms',
                  zIndex: 1,
                  background: '#fff',
                  fontSize: isMobile ? '0.6rem' : '0.68rem',
                  padding: isMobile ? '4px 7px' : '4px 8px',
                  borderRadius: '999px',
                  border: '1px solid #e5e7eb',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: '#6b7280',
                }}
              >
                VS
              </div>

              <div
                style={{
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: isMobile ? 'row' : 'column',
                  flexWrap: isMobile ? 'wrap' : 'nowrap',
                  justifyContent: 'center',
                  width: isMobile ? '100%' : undefined,
                  gap: isMobile ? '6px' : '10px',
                }}
              >
                {stages.map(([icon, label], i) => {
                  const isActive = activeStage === i
                  return (
                    <div
                      key={label}
                      onClick={() => handleStageClick(i)}
                      style={{
                        cursor: 'pointer',
                        padding: isMobile ? '5px 8px' : '6px 10px',
                        borderRadius: isMobile ? '14px' : '18px',
                        background: isActive ? '#f0fdf4' : '#ffffff',
                        border: `1px solid ${isActive ? '#86efac' : '#f3f4f6'}`,
                        boxShadow: isActive ? '0 4px 12px rgba(16, 185, 129, 0.15)' : 'none',
                        opacity: inView ? 1 : 0,
                        transform: inView
                          ? `translateY(0) scale(${isActive ? (isMobile ? 1.04 : 1.06) : 1})`
                          : `translateY(${isMobile ? 0 : 12}px) scale(1)`,
                        transition: `all 0.4s ${EASE_SPRING}`,
                        transitionDelay: inView ? `${340 + i * 110}ms` : '0ms',
                        display: 'flex',
                        alignItems: 'center',
                        gap: isMobile ? '4px' : '6px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transform: isActive ? 'scale(1.15) rotate(-4deg)' : 'scale(1)',
                          transition: `transform 0.4s ${EASE_SPRING}`,
                          color: isActive ? '#10b981' : '#6b7280',
                        }}
                      >
                        <CompareIcon name={icon} size={isMobile ? 12 : 15} strokeWidth={isMobile ? 2 : 1.8} />
                      </div>
                      <span
                        style={{
                          fontWeight: isActive ? 700 : 600,
                          color: isActive ? '#065f46' : '#9ca3af',
                          opacity: isActive ? 1 : 0.65,
                          transition: 'opacity 0.4s ease, color 0.4s ease',
                          fontSize: isMobile ? '0.56rem' : '0.66rem',
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
              style={{
                minWidth: 0,
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : `translateX(${isMobile ? 0 : 20}px)`,
                transition: `opacity 0.7s ${EASE_OUT}, transform 0.7s ${EASE_OUT}`,
              }}
            >
              <h3
                style={{
                  fontSize: isMobile ? '0.85rem' : '0.95rem',
                  fontWeight: 700,
                  color: '#111827',
                  letterSpacing: '-0.01em',
                  margin: 0,
                  marginBottom: isMobile ? '8px' : '10px',
                }}
              >
                AI-Native Engineering
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 3 : 4 }}>
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
      </div>
    </section>
  )
}