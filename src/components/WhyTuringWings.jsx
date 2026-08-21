import { useState } from 'react'
import { Link } from 'react-router-dom'

const reasons = [
  {
    num: '01',
    title: 'BUILD OVER CONSUME',
    short: "Don't just learn what exists.",
    copy: "Don't just learn what exists. Make something with it.",
    tag: 'Make Something',
  },
  {
    num: '02',
    title: 'EXPERIMENT OVER FOLLOW',
    short: 'Explore what AI makes possible.',
    copy: 'Explore what AI makes possible and push the boundaries of what can be built.',
    tag: 'Explore Possibility',
  },
  {
    num: '03',
    title: 'PROOF OVER PROMISES',
    short: 'Show what you can create.',
    copy: 'Show what you can create with public, functional artifacts and working code.',
    tag: 'Show Execution',
  },
  {
    num: '04',
    title: 'INTELLIGENCE IS A MEDIUM',
    short: 'Work with models, agents, & tools.',
    copy: 'Learn to work with models, agents, tools, and systems as a primary creative and technical medium.',
    tag: 'Orchestrate Systems',
  },
  {
    num: '05',
    title: 'BUILD TOGETHER',
    short: 'Great things are rarely built alone.',
    copy: 'Great things are rarely built alone. Collaborate alongside ambitious builders in active production.',
    tag: 'Collective Power',
  },
]

export default function WhyTuringWings() {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section id="community" className="bg-[#fafafa] text-[#090909] px-4 sm:px-6 md:px-12 py-12 sm:py-20 md:py-28 font-product-sans overflow-hidden border-b border-black/10">
      <div className="mx-auto max-w-[1400px]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-6 sm:pb-10">
          <div>
            <p className="font-mono text-[10px] sm:text-xs font-bold tracking-widest text-black/50 uppercase mb-2">
              05 / WHY TURING WINGS
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#090909] leading-[1.08] font-product-sans">
              Built for the ones <br />
              <span className="text-black/45 font-serif italic">who want to build.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-black/60 max-w-sm leading-relaxed font-product-sans">
            Turing Wings exists for people who don't want to simply watch what's next. They want to make it.
          </p>
        </div>

        {/* Interactive Split Experience Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">
          
          {/* Left Column: Interactive Selector List */}
          <div className="lg:col-span-7 flex flex-col gap-2.5 sm:gap-3">
            {reasons.map((item, idx) => {
              const isActive = activeIdx === idx
              return (
                <div
                  key={item.num}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`group relative p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none bg-white min-h-[44px] ${
                    isActive
                      ? 'border-[#090909] shadow-lg ring-1 ring-black/10 translate-x-1 sm:translate-x-2'
                      : 'border-black/10 hover:border-black/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 sm:gap-5">
                      <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded transition-colors ${
                        isActive ? 'bg-[#090909] text-white' : 'bg-black/5 text-black/50'
                      }`}>
                        {item.num}
                      </span>
                      <div>
                        <h3 className="text-sm sm:text-lg font-bold tracking-tight text-[#090909]">
                          {item.title}
                        </h3>
                        <p className="text-xs text-black/50 mt-0.5 sm:hidden font-product-sans">
                          {item.short}
                        </p>
                      </div>
                    </div>

                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive ? 'border-[#090909] bg-[#090909] text-white rotate-45' : 'border-black/10 text-black/30 group-hover:border-black/30'
                    }`}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Mobile-Only Expanded View */}
                  {isActive && (
                    <div className="mt-3 pt-2.5 border-t border-black/5 sm:hidden">
                      <p className="text-xs text-black/70 leading-relaxed font-product-sans">
                        {item.copy}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right Column / Mobile Preview Stage */}
          <div className="flex lg:col-span-5 relative bg-[#090909] border border-black rounded-3xl p-5 sm:p-6 lg:p-8 flex-col justify-between shadow-2xl min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] text-white mt-2 lg:mt-0">
            {/* Background Accent Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-15 rounded-3xl overflow-hidden">
              <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="currentColor" className="text-white" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              </svg>
            </div>

            <div className="relative z-10 flex justify-between items-start">
              <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-light text-white/30">
                {reasons[activeIdx].num}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest bg-white/10 border border-white/15 px-2.5 sm:px-3 py-1 rounded-full text-white/80 shadow-xs">
                {reasons[activeIdx].tag}
              </span>
            </div>

            <div className="relative z-10 my-auto py-4 sm:py-6">
              <h4 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-white mb-2 sm:mb-3">
                {reasons[activeIdx].title}
              </h4>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-product-sans">
                {reasons[activeIdx].copy}
              </p>
            </div>

            <div className="relative z-10 pt-3 border-t border-white/10 flex justify-between items-center text-[10px] sm:text-xs font-mono text-white/40">
              <span>PRINCIPLE {activeIdx + 1} OF 5</span>
              <span>TURING WINGS</span>
            </div>
          </div>

        </div>

        {/* CTA Banner */}
        <div className="mt-12 sm:mt-20 rounded-3xl bg-white border border-black/10 p-6 sm:p-10 md:p-12 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="max-w-2xl relative z-10 text-left">
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-black/60 bg-[#fafafa] border border-black/10 px-3 py-1 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              THE FUTURE NEEDS BUILDERS
            </span>
            <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#090909] leading-snug font-product-sans">
              Bring your curiosity. <br />
              <span className="font-serif italic text-black/45">Leave with the confidence to make things real.</span>
            </h3>
          </div>

          <Link
            to="/contact"
            className="relative z-10 inline-flex items-center justify-between gap-4 bg-[#090909] text-white px-7 py-4 rounded-2xl text-xs font-bold tracking-wider uppercase hover:bg-black/85 transition-all duration-300 transform active:scale-95 shrink-0 group shadow-sm font-mono min-h-[44px] touch-action-manipulation"
          >
            <span>Join Turing Wings</span>
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              ↗
            </span>
          </Link>
        </div>

      </div>
    </section>
  )
}