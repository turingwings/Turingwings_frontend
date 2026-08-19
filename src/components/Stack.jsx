import { useEffect, useState, useCallback } from 'react'

// Extracted tech icon PNG assets
import reactLogo from '../assets/tech_icons/React-removebg-preview.png'
import nodejsLogo from '../assets/tech_icons/Node.js-removebg-preview.png'
import postgresLogo from '../assets/tech_icons/PostgresSQL-removebg-preview.png'
import dockerLogo from '../assets/tech_icons/Docker-removebg-preview.png'
import vercelLogo from '../assets/tech_icons/vercel-removebg-preview.png'
import stripeLogo from '../assets/tech_icons/stripe-com-logo.png'
import githubLogo from '../assets/tech_icons/GitHub-removebg-preview.png'
import figmaLogo from '../assets/tech_icons/Figma-removebg-preview.png'
import tailwindLogo from '../assets/tech_icons/Tailwind_CSS-removebg-preview.png'
import gcpLogo from '../assets/tech_icons/Google_Cloud-removebg-preview.png'

import claudeLogo from '../assets/tech_icons/claude-ai-logo-removebg-preview.png'
import cursorLogo from '../assets/tech_icons/cursor-removebg-preview.png'
import geminiLogo from '../assets/tech_icons/gemini-removebg-preview.png'
import codexLogo from '../assets/tech_icons/codex-removebg-preview.png'
import langchainLogo from '../assets/tech_icons/langchain-removebg-preview.png'
import mcpLogo from '../assets/tech_icons/mcp-removebg-preview.png'
import antigravityLogo from '../assets/tech_icons/Google-Antigravity-Icon-Full-Color-removebg-preview.png'
import ollamaLogo from '../assets/tech_icons/ollama-removebg-preview.png'
import openclawLogo from '../assets/tech_icons/openclaw-dark-removebg-preview.png'

export const technologyStack = [
  { name: 'React', image: reactLogo },
  { name: 'Node.js', image: nodejsLogo },
  { name: 'PostgreSQL', image: postgresLogo },
  { name: 'Docker', image: dockerLogo },
  { name: 'Vercel', image: vercelLogo },
  { name: 'Stripe', image: stripeLogo },
  { name: 'GitHub', image: githubLogo },
  { name: 'Figma', image: figmaLogo },
  { name: 'Tailwind CSS', image: tailwindLogo },
  { name: 'Google Cloud', image: gcpLogo },
]

export const aiTools = [
  { name: 'Antigravity', image: antigravityLogo },
  { name: 'Claude', image: claudeLogo },
  { name: 'Cursor', image: cursorLogo },
  { name: 'Gemini', image: geminiLogo },
  { name: 'Codex', image: codexLogo },
  { name: 'LangChain', image: langchainLogo },
  { name: 'MCP', image: mcpLogo },
  { name: 'Ollama', image: ollamaLogo },
  { name: 'OpenClaw', image: openclawLogo },
]

function Logo({ item }) {
  if (item.image) {
    return (
      <img
        src={item.image}
        alt={`${item.name} logo`}
        className="h-full w-full object-contain select-none"
      />
    )
  }
  return (
    <span className="font-mono text-base font-bold text-neutral-700" aria-hidden="true">
      {item.name.slice(0, 1)}
    </span>
  )
}

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
        absolute top-0 left-0 w-[31%] sm:w-[30%]
        flex flex-col items-center justify-center gap-2 sm:gap-3 rounded-2xl
        border border-black/[0.08] bg-neutral-50/80 p-3 sm:p-5 md:p-6
        transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
        will-change-transform ${positionStyles[position]}
      `}
    >
      <div className="relative flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-black/5 bg-white p-1.5 sm:p-2 shadow-sm transition-transform duration-300 group-hover:scale-105">
        <Logo item={item} />
      </div>
      <p className="text-[10px] sm:text-xs font-bold tracking-wide text-neutral-800 font-product-sans truncate max-w-full">{item.name}</p>
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
    <div className="flex flex-col justify-between rounded-3xl border border-neutral-200/80 bg-white p-6 md:p-8 shadow-sm">
      {/* Header with active index dots */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">{title}</h3>
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
    <section
      id="stack"
      className="relative overflow-hidden px-4 sm:px-6 md:px-12 py-12 sm:py-20 md:py-28 text-neutral-900 border-b border-black/10 font-product-sans"
      style={{ backgroundColor: '#fafafa' }}
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end border-b border-black/10 pb-6 sm:pb-10">
          <div>
            <p className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-black/50 mb-2">
              02 / THE ECOSYSTEM
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#090909]">
              The modern AI<br />
              <span className="text-black/45 font-serif italic">engineering stack.</span>
            </h2>
          </div>
          <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-black/60 font-product-sans">
            Not a collection of isolated tools. A connected system for going from an idea to reliable production software.
          </p>
        </div>

        {/* Carousels Grid */}
        <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 lg:grid-cols-2">
          <LogoCarousel title="Core Technology Stack" data={technologyStack} />
          <LogoCarousel title="AI Tools & Intelligence" data={aiTools} initialIndex={2} />
        </div>
      </div>
    </section>
  )
}