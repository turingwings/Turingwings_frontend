import React, { useState } from 'react'
import { Code2, Box, Network, Lock, ArrowUpRight } from 'lucide-react'

const workflows = [
  {
    num: '01',
    title: 'AI-native software development',
    desc: 'Build full products with AI integrated into every step.',
    icon: Code2,
  },
  {
    num: '02',
    title: 'AI-assisted product design',
    desc: 'Turn early thinking into interfaces worth using.',
    icon: Box,
  },
  {
    num: '03',
    title: 'AI coding workflows',
    desc: 'Learn to plan, generate, review and ship code.',
    icon: Network,
  },
  {
    num: '04',
    title: 'Authentication & payments',
    desc: 'Make production-ready apps people can trust.',
    icon: Lock,
  },
]

export default function BuildWithAI() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="buildwithai" className="bg-[#fafafa] text-[#090909] py-12 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 font-product-sans border-b border-black/10 overflow-hidden">
      <style>{`
        .isometric-stage {
          perspective: 1200px;
        }
        .isometric-deck {
          transform: rotateX(32deg) rotateZ(-12deg) translateY(-8px);
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (max-width: 640px) {
          .isometric-deck {
            transform: rotateX(24deg) rotateZ(-8deg) scale(0.86);
          }
        }
        .isometric-card-item {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .isometric-card-item.is-active {
          transform: translateZ(28px) scale(1.02);
          box-shadow: -15px 20px 35px -5px rgba(0,0,0,0.12);
        }
      `}</style>

      <div className="mx-auto max-w-[1400px] space-y-10 sm:space-y-14">
        
        {/* DESKTOP & TABLET TWO-COLUMN HEADER + 3D ISOMETRIC STACK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Eyebrow + Headline + Subcopy */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-black/50 uppercase">
              <span className="px-2 py-0.5 rounded bg-black/5 border border-black/10 text-black">03</span>
              <span>/ ARCHITECTURE & WORKFLOW</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#090909] leading-[1.08] font-product-sans">
              Learn by making <br />
              <span className="text-black/45 font-serif italic relative inline-block">
                the future
                <span className="absolute left-0 bottom-1 w-full h-[2px] bg-black/20 rounded-full" />
              </span>{' '}
              tangible.
            </h2>

            <p className="text-xs sm:text-base text-black/60 max-w-lg leading-relaxed font-product-sans">
              8 hands-on AI-first engineering workflows structured like modern production stacks.
            </p>
          </div>

          {/* Right Column: 3D Isometric Card Stack Graphic */}
          <div className="lg:col-span-6 relative h-[240px] sm:h-[300px] lg:h-[360px] flex items-center justify-center isometric-stage">
            
            {/* 3D Stack Container */}
            <div className="isometric-deck relative w-[270px] sm:w-[350px] lg:w-[410px] h-[170px] sm:h-[210px]">
              {workflows.map((item, idx) => {
                const IconComponent = item.icon
                const isActive = activeTab === idx
                const relativeIndex = (idx - activeTab + 4) % 4
                const zIndex = 40 - relativeIndex * 10
                const translateZ = (3 - relativeIndex) * 28
                const translateY = relativeIndex * 16

                return (
                  <div
                    key={item.num}
                    onClick={() => setActiveTab(idx)}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      transform: `translateZ(${translateZ}px) translateY(${translateY}px)`,
                      zIndex: zIndex,
                    }}
                    className={`isometric-card-item bg-white border rounded-2xl p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none shadow-sm ${
                      isActive
                        ? 'is-active border-[#090909] ring-2 ring-black/10 opacity-100 shadow-xl'
                        : 'border-black/10 hover:border-black/30 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="font-mono text-xs font-bold text-black/50">
                        {item.num}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-[#090909] truncate tracking-tight">
                        {item.title}
                      </h4>
                    </div>

                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${isActive ? 'bg-[#090909] text-white' : 'bg-black/5 text-black/60'}`}>
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>

        {/* DESKTOP VIEW: 4-COLUMN HORIZONTAL GRID OF FEATURE CARDS (Visible on Desktop & Tablet) */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {workflows.map((item, idx) => {
            const IconComponent = item.icon
            const isActive = activeTab === idx

            return (
              <div
                key={item.num}
                onClick={() => setActiveTab(idx)}
                className={`bg-white border rounded-2xl p-5 sm:p-6 text-left flex flex-col justify-between gap-6 cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'border-[#090909] shadow-xl ring-1 ring-black/10 translate-y-[-4px]'
                    : 'border-black/10 hover:border-black/30 hover:shadow-md'
                }`}
              >
                {/* Top Row: Icon Badge (Left) & Step Number (Right) */}
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center ${isActive ? 'bg-[#090909] text-white' : 'bg-black/5 text-black/70'}`}>
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="font-mono text-xs sm:text-sm font-bold text-black/50">
                    {item.num}
                  </span>
                </div>

                {/* Content: Title & Short Copy */}
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#090909] tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-black/60 leading-relaxed font-product-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* MOBILE VIEW: VERTICAL STACK CARDS (Visible Exclusively on Mobile Screens) */}
        <div className="flex sm:hidden flex-col gap-3">
          {workflows.map((item, idx) => {
            const IconComponent = item.icon
            const isActive = activeTab === idx

            return (
              <div
                key={item.num}
                onClick={() => setActiveTab(idx)}
                className={`bg-white border rounded-2xl p-4 flex items-center justify-between gap-3 text-left transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#090909] ring-2 ring-black/10 shadow-md bg-black/[0.02]'
                    : 'border-black/10 active:bg-black/[0.02]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs font-bold shrink-0 text-black/50">
                    {item.num}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-[#090909] tracking-tight truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isActive ? 'bg-[#090909] text-white' : 'bg-black/5 text-black/60'}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
              </div>
            )
          })}
        </div>

        {/* BOTTOM CENTER ACTION PILL BUTTON */}
        <div className="pt-2 sm:pt-4 flex justify-center">
          <a
            href="#cohorts"
            className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white px-7 py-3 text-xs font-bold text-[#090909] hover:bg-[#090909] hover:text-white transition-all shadow-xs font-mono"
          >
            <span>Explore all workflows</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  )
}