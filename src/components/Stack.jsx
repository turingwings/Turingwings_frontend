import React, { useState } from 'react'

export const wingsData = [
  {
    num: 'WING 01',
    title: 'ENGINEERING',
    tagline: 'Systems, Agents & Architectures',
    disciplines: [
      { name: 'AI-Native Engineering', status: 'ACTIVE' },
      { name: 'AI Agents', status: 'EMERGING' },
      { name: 'Model Context Protocol (MCP)', status: 'ACTIVE' },
      { name: 'Multi-Agent Systems', status: 'FRONTIER' },
    ],
  },
  {
    num: 'WING 02',
    title: 'CREATION',
    tagline: 'Media, Storytelling & Design',
    disciplines: [
      { name: 'AI Filmmaking', status: 'FRONTIER' },
      { name: 'AI Animation', status: 'EMERGING' },
      { name: 'AI Design', status: 'ACTIVE' },
      { name: 'AI Storytelling', status: 'FRONTIER' },
    ],
  },
  {
    num: 'WING 03',
    title: 'AUTOMATION',
    tagline: 'Workflows & Intelligent Operations',
    disciplines: [
      { name: 'AI Workflows', status: 'ACTIVE' },
      { name: 'Business Automation', status: 'EMERGING' },
      { name: 'Intelligent Systems', status: 'ACTIVE' },
      { name: 'Agentic Automation', status: 'FRONTIER' },
    ],
  },
  {
    num: 'WING 04',
    title: 'EXPLORATION',
    tagline: 'Experimental AI & Future Media',
    disciplines: [
      { name: 'AI Games', status: 'FRONTIER' },
      { name: 'Experimental AI', status: 'ACTIVE' },
      { name: 'Emerging Technologies', status: 'FRONTIER' },
      { name: 'Future Systems', status: 'RESEARCH' },
    ],
  },
]

export default function Stack() {
  const [activeWing, setActiveWing] = useState(0)

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
              02 / THE WINGS
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#090909]">
              One intelligence.<br />
              <span className="text-black/45 font-serif italic">Infinite directions.</span>
            </h2>
          </div>
          <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-black/60 font-product-sans">
            Explore the technologies, disciplines, and creative systems emerging around AI.
          </p>
        </div>

        {/* 4 Wings Interactive Grid */}
        <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {wingsData.map((wing, idx) => {
            const isActive = activeWing === idx
            return (
              <div
                key={wing.num}
                onClick={() => setActiveWing(idx)}
                onMouseEnter={() => setActiveWing(idx)}
                className={`group relative flex flex-col justify-between rounded-3xl border p-6 sm:p-7 transition-all duration-300 cursor-pointer min-h-[340px] select-none ${
                  isActive
                    ? 'border-[#090909] bg-white shadow-xl translate-y-[-4px] ring-1 ring-black/10'
                    : 'border-black/10 bg-white/70 hover:border-black/30 hover:bg-white'
                }`}
              >
                {/* Card Top Row */}
                <div>
                  <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-5">
                    <span className="font-mono text-xs font-bold text-black/50 tracking-wider">
                      {wing.num}
                    </span>
                    <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${isActive ? 'bg-[#090909]' : 'bg-black/20'}`} />
                  </div>

                  {/* Card Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#090909] mb-1">
                    {wing.title}
                  </h3>
                  <p className="text-xs text-black/50 font-product-sans mb-6">
                    {wing.tagline}
                  </p>

                  {/* Disciplines List */}
                  <ul className="space-y-2.5">
                    {wing.disciplines.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center justify-between text-xs font-product-sans text-[#090909] font-medium"
                      >
                        <span className="truncate pr-2">{item.name}</span>
                        <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-black/5 text-black/50 shrink-0">
                          {item.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Bottom Indicator */}
                <div className="pt-6 border-t border-black/5 flex items-center justify-between text-[10px] font-mono text-black/40">
                  <span>DISCIPLINE DOMAIN</span>
                  <span className="group-hover:translate-x-1 transition-transform">↗</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}