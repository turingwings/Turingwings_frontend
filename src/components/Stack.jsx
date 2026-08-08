import { useEffect, useState, useCallback } from 'react'

/* ------------------------------------------------------------------ */
/*  Inline SVG logo marks — no external image files / imports needed  */
/* ------------------------------------------------------------------ */

const icons = {
  React: (
    <svg viewBox="0 0 24 24" fill="none">
      <g stroke="#61DAFB" strokeWidth="1">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
      </g>
      <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
    </svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 1.5 21 6.75v10.5L12 22.5 3 17.25V6.75z"
        fill="#5FA04E"
      />
      <path
        d="M12 6.2c-2.7 0-4.35 1.2-4.35 3.1 0 2 1.6 2.55 3.9 2.8 2.75.3 3 .75 3 1.35 0 .95-1.05 1.35-2.15 1.35-1.5 0-2.6-.5-3-1.55l-1.6.65c.55 1.6 2.15 2.4 4.55 2.4 2.6 0 4.35-1.15 4.35-3 0-1.95-1.5-2.5-4-2.8-2.6-.3-2.9-.65-2.9-1.35 0-.6.55-1.25 2.15-1.25 1.3 0 2.15.4 2.6 1.35l1.55-.65c-.6-1.4-1.9-2.4-4.1-2.4z"
        fill="#fff"
      />
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M16.5 2c-1.6 0-3 .6-4 1.6C11.5 2.7 10 2 8.4 2 4.9 2 2.2 5.3 2.6 9.4c.3 3 1.8 6.6 3.9 9 1.2 1.4 2.4 2.3 3.5 2.3.7 0 1.3-.4 1.9-1 .5.6 1.1 1 1.8 1 1.2 0 2.5-1 3.7-2.6 2.1-2.7 3.4-6.4 3.5-9.4C21.2 5 18.4 2 16.5 2z"
        fill="#336791"
      />
      <path
        d="M11.9 8.4c-.15-.9-.5-1.7-1.1-2.2M10.8 6.2c1.4-.5 2.9-.4 4 .5.9.75 1.35 1.9 1.3 3.15"
        stroke="#fff"
        strokeWidth=".5"
        strokeLinecap="round"
      />
      <circle cx="15.3" cy="10.3" r=".5" fill="#fff" />
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" fill="none">
      <g fill="#2496ED">
        <rect x="2" y="10.5" width="2.6" height="2.4" />
        <rect x="5" y="10.5" width="2.6" height="2.4" />
        <rect x="8" y="10.5" width="2.6" height="2.4" />
        <rect x="5" y="7.7" width="2.6" height="2.4" />
        <rect x="8" y="7.7" width="2.6" height="2.4" />
        <rect x="8" y="4.9" width="2.6" height="2.4" />
        <rect x="11" y="10.5" width="2.6" height="2.4" />
        <path d="M22.3 11.2c-.6-.4-1.7-.6-2.6-.4-.1-1-.7-1.8-1.6-2.5l-.4-.3-.3.4c-.5.6-.7 1.6-.6 2.4.05.35.2.85.5 1.25-.5.3-1.4.6-2.6.6H2.4c-.25 1.5.05 3.4 1.1 4.9 1.1 1.55 2.75 2.35 4.9 2.35 4.65 0 8.1-2.15 9.7-6.05 1 .05 2.1-.2 2.65-1.15l.15-.25z" />
      </g>
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2 22 20H2z" fill="#000" />
    </svg>
  ),
  Stripe: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5" fill="#635BFF" />
      <path
        d="M11.2 9.6c0-.5.4-.7 1.1-.7.9 0 2.1.3 3 .8V7.1c-1-.4-2-.6-3-.6-2.5 0-4.1 1.3-4.1 3.4 0 3.4 4.6 2.8 4.6 4.3 0 .6-.5.8-1.2.8-1 0-2.4-.4-3.4-1v2.7c1.1.5 2.3.7 3.4.7 2.5 0 4.2-1.2 4.2-3.4 0-3.6-4.6-3-4.6-4.4z"
        fill="#fff"
      />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12c0 4.6 3 8.5 7.2 9.9.5.1.7-.2.7-.5v-1.8c-3 .6-3.6-1.3-3.6-1.3-.5-1.2-1.2-1.6-1.2-1.6-1-.6.1-.6.1-.6 1.1.1 1.6 1.1 1.6 1.1 1 1.6 2.5 1.2 3.1.9.1-.7.4-1.2.6-1.5-2.4-.3-4.9-1.2-4.9-5.3 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.4 10.4 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.1-2.5 5-4.9 5.3.4.3.7 1 .7 2v3c0 .3.2.6.7.5 4.2-1.4 7.2-5.3 7.2-9.9 0-5.8-4.7-10.5-10.5-10.5z"
        fill="#181717"
      />
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M9 1.5h3.5A3.25 3.25 0 0 1 15.75 4.75 3.25 3.25 0 0 1 12.5 8H9z" fill="#F24E1E" />
      <path d="M5.75 8A3.25 3.25 0 0 1 9 4.75h3.5V8A3.25 3.25 0 0 1 9 11.25 3.25 3.25 0 0 1 5.75 8z" fill="#FF7262" />
      <path d="M5.75 15.25A3.25 3.25 0 0 1 9 12h3.5v3.25A3.25 3.25 0 0 1 9 18.5a3.25 3.25 0 0 1-3.25-3.25z" fill="#A259FF" />
      <path d="M12.5 8h-3.5v6.5H12.5A3.25 3.25 0 0 0 15.75 11.25 3.25 3.25 0 0 0 12.5 8z" fill="#1ABCFE" />
      <circle cx="12.5" cy="18.5" r="3.25" fill="#0ACF83" />
    </svg>
  ),
  ChatGPT: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M22.3 10a5.4 5.4 0 0 0-.5-4.5 5.5 5.5 0 0 0-5.9-2.6A5.5 5.5 0 0 0 6.2 5.3a5.4 5.4 0 0 0-3.6 2.6 5.5 5.5 0 0 0 .7 6.4 5.4 5.4 0 0 0 .5 4.5 5.5 5.5 0 0 0 5.9 2.6 5.5 5.5 0 0 0 9.7-2.4 5.4 5.4 0 0 0 3.6-2.6 5.5 5.5 0 0 0-.7-6.4zM13.4 21a4 4 0 0 1-2.6-.9l.1-.1 4.4-2.5c.2-.1.4-.4.4-.6v-6.2l1.9 1.1v5.2A4.1 4.1 0 0 1 13.4 21zM4.3 17.2a4 4 0 0 1-.5-2.8l.1.1 4.4 2.5c.2.1.5.1.8 0l5.3-3.1v2.2l-4.5 2.6a4.1 4.1 0 0 1-5.6-1.5zM3.1 8.3a4 4 0 0 1 2.1-1.8v5.1c0 .3.2.5.4.6l5.3 3.1-1.9 1.1-4.5-2.6a4.1 4.1 0 0 1-1.4-5.5zm14.9 3.5-5.3-3.1 1.9-1.1 4.5 2.6a4.1 4.1 0 0 1-.6 7.3v-5.1c0-.3-.2-.5-.5-.6zm1.9-2.8-.1-.1-4.4-2.5a.8.8 0 0 0-.8 0L9.3 9.5V7.3l4.5-2.6a4.1 4.1 0 0 1 6.1 4.3zM8.2 12.9 6.3 11.8V6.6a4.1 4.1 0 0 1 6.7-3.2l-.1.1-4.4 2.5c-.2.1-.4.4-.4.6zm1-2.2 2.4-1.4 2.4 1.4v2.8l-2.4 1.4-2.4-1.4z"
        fill="#000"
      />
    </svg>
  ),
  Claude: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#D97757" />
      <path
        d="M7 16.5 10.3 8h1.6l3.3 8.5h-1.7l-.7-1.9h-3.4l-.7 1.9zm2.7-3.3h2.2l-1.1-3z"
        fill="#fff"
      />
    </svg>
  ),
  Cursor: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2 20.5 7v10L12 22 3.5 17V7z" fill="#000" />
      <path d="M12 2v20M3.5 7 12 12l8.5-5M12 12v10" stroke="#fff" strokeWidth=".6" />
    </svg>
  ),
  Gemini: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2c.6 4.6 1.8 7.6 4.5 9.5-2.7 1.9-3.9 4.9-4.5 9.5-.6-4.6-1.8-7.6-4.5-9.5C10.2 9.6 11.4 6.6 12 2z"
        fill="url(#g1)"
      />
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0" stopColor="#4285F4" />
          <stop offset="0.5" stopColor="#9B72CB" />
          <stop offset="1" stopColor="#D96570" />
        </linearGradient>
      </defs>
    </svg>
  ),
  Codex: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#000" />
      <path
        d="M8.5 8 6 12l2.5 4M15.5 8 18 12l-2.5 4M13 7.5l-2 9"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  LangChain: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="7" cy="8" r="4" fill="none" stroke="#1C3C3C" strokeWidth="1.6" />
      <circle cx="15" cy="16" r="4" fill="none" stroke="#3F7C6A" strokeWidth="1.6" />
      <path d="M9.8 10.8 12.2 13.2" stroke="#1C3C3C" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  LangGraph: (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="5" cy="6" r="2" fill="#1C3C3C" />
      <circle cx="19" cy="6" r="2" fill="#1C3C3C" />
      <circle cx="12" cy="12" r="2" fill="#3F7C6A" />
      <circle cx="5" cy="18" r="2" fill="#1C3C3C" />
      <circle cx="19" cy="18" r="2" fill="#1C3C3C" />
      <g stroke="#9CB8AE" strokeWidth="1">
        <path d="M6.4 7.2 10.7 10.8M17.6 7.2 13.3 10.8M6.4 16.8 10.7 13.2M17.6 16.8 13.3 13.2" />
      </g>
    </svg>
  ),
  MCP: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#000" />
      <path
        d="M7 16V9.5a2 2 0 0 1 2-2 2 2 0 0 1 2 2V15M17 8v6.5a2 2 0 0 1-2 2 2 2 0 0 1-2-2V9"
        stroke="#fff"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
}

function Logo({ name }) {
  const icon = icons[name]
  if (!icon) {
    return (
      <span className="font-mono text-base font-bold text-neutral-700" aria-hidden="true">
        {name.slice(0, 1)}
      </span>
    )
  }
  return (
    <div className="h-full w-full" role="img" aria-label={`${name} logo`}>
      {icon}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Data configuration                                                 */
/* ------------------------------------------------------------------ */

export const technologyStack = [
  { name: 'React' },
  { name: 'Node.js' },
  { name: 'PostgreSQL' },
  { name: 'Docker' },
  { name: 'Vercel' },
  { name: 'Stripe' },
  { name: 'GitHub' },
  { name: 'Figma' },
]

export const aiTools = [
  { name: 'ChatGPT' },
  { name: 'Claude' },
  { name: 'Cursor' },
  { name: 'Gemini' },
  { name: 'Codex' },
  { name: 'LangChain' },
  { name: 'LangGraph' },
  { name: 'MCP' },
]

const ROTATION_INTERVAL = 4000
const TRANSITION_DURATION = 700

// Position configuration using pure Tailwind classes
const positionStyles = {
  exit: 'translate-x-[-120%] opacity-0 scale-90 pointer-events-none',
  left: 'translate-x-[0%] opacity-70 scale-95 hover:opacity-100',
  center: 'translate-x-[105%] opacity-100 scale-100 shadow-lg shadow-black/[0.03] border-black/15 bg-white',
  right: 'translate-x-[210%] opacity-70 scale-95 hover:opacity-100',
  enter: 'translate-x-[330%] opacity-0 scale-90 pointer-events-none',
}

function LogoCard({ item, position }) {
  return (
    <article
      className={`
        absolute top-0 left-0 w-[30%]
        flex flex-col items-center justify-center gap-3 rounded-2xl
        border border-black/[0.08] bg-neutral-50/80 p-5 md:p-6
        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
        will-change-transform ${positionStyles[position]}
      `}
    >
      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-black/5 bg-white p-2.5 shadow-sm transition-transform duration-300 group-hover:scale-105">
        <Logo name={item.name} />
      </div>
      <p className="text-xs font-semibold tracking-wide text-neutral-800">{item.name}</p>
    </article>
  )
}

function LogoCarousel({ title, data, initialIndex = 0 }) {
  const [startIndex, setStartIndex] = useState(initialIndex % data.length)
  const [isRotating, setIsRotating] = useState(false)

  const handleNext = useCallback(() => {
    setIsRotating(true)
    setTimeout(() => {
      setStartIndex((current) => (current + 1) % data.length)
      setIsRotating(false)
    }, TRANSITION_DURATION)
  }, [data.length])

  useEffect(() => {
    const timer = setInterval(handleNext, ROTATION_INTERVAL)
    return () => clearInterval(timer)
  }, [handleNext])

  // Rolling set of 4 items to allow continuous right-to-left flow
  const rollingItems = [0, 1, 2, 3].map((offset) => data[(startIndex + offset) % data.length])

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-neutral-200/80 bg-neutral-50/40 p-6 md:p-8 backdrop-blur-sm">
      {/* Header with active index dots */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">{title}</h3>
        <div className="flex items-center gap-1.5">
          {data.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === startIndex ? 'w-5 bg-neutral-900' : 'w-1.5 bg-neutral-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Overflow container with subtle edge gradient mask */}
      <div
        className="relative h-32 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]"
        aria-live="polite"
      >
        <div className="relative h-full w-full">
          {rollingItems.map((item, index) => {
            const position = isRotating
              ? ['exit', 'left', 'center', 'right'][index]
              : ['left', 'center', 'right', 'enter'][index]

            return <LogoCard key={`${item.name}-${index}`} item={item} position={position} />
          })}
        </div>
      </div>
    </div>
  )
}

export default function Stack() {
  return (
    <section id="stack" className="relative overflow-hidden bg-white px-6 py-20 sm:py-28 md:py-36 text-neutral-900 md:px-12 border-b border-black/10">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end border-b border-black/10 pb-8">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-black/50 mb-3">
              02 / THE ECOSYSTEM
            </p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#090909]">
              The modern AI<br />
              <span className="text-black/45">engineering stack.</span>
            </h2>
          </div>
          <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-black/60 font-sans">
            Not a collection of isolated tools. A connected system for going from an idea to reliable production software.
          </p>
        </div>

        {/* Carousels Grid */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <LogoCarousel title="Core Technology Stack" data={technologyStack} />
          <LogoCarousel title="AI Tools & Intelligence" data={aiTools} initialIndex={3} />
        </div>
      </div>
    </section>
  )
}