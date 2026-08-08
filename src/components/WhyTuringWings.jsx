import { useState } from 'react'
import { Link } from 'react-router-dom'

const reasons = [
  {
    num: '01',
    title: '100% Portfolio-Driven',
    short: 'Graduate with production-ready projects.',
    copy: 'Graduate with production-ready projects and a public body of work — not just a certificate.',
    tag: 'Proof over Promises',
  },
  {
    num: '02',
    title: 'AI-Native Curriculum',
    short: 'Modern workflows built for current AI tools.',
    copy: 'Use the workflows, tools and judgment that modern engineering teams rely on every day.',
    tag: 'Modern Stack',
  },
  {
    num: '03',
    title: 'Live Cohort Experience',
    short: 'Mentorship and peer-driven friction.',
    copy: 'Learn through mentorship, discussion and the productive friction of building alongside others.',
    tag: 'Peer Driven',
  },
  {
    num: '04',
    title: 'Build Before Theory',
    short: 'Apply concepts directly to functional code.',
    copy: 'Every idea earns meaning when you apply it to a product that has to work.',
    tag: 'Hands-on First',
  },
  {
    num: '05',
    title: 'Industry-Ready Workflows',
    short: 'Collaborative delivery and deployment.',
    copy: 'Practice collaborative delivery, deployment and systems thinking from the start.',
    tag: 'Production Grade',
  },
]

export default function WhyTuringWings() {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section id="community" className="bg-[#fafafa] text-[#111] px-6 py-20 sm:py-28 md:py-36 font-sans overflow-hidden border-b border-black/10">
      <div className="mx-auto max-w-[1400px]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8 sm:pb-12">
          <div>
            <p className="font-mono text-xs font-bold tracking-widest text-black/50 uppercase mb-3">
              05 / WHY TURING WINGS
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#090909] leading-[1.05]">
              Built for the ones <br />
              <span className="text-black/45 font-serif italic">who want to build.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-black/60 max-w-sm leading-relaxed">
            Eliminating passive lectures in favor of real products, live engineering cohorts, and active production.
          </p>
        </div>

        {/* Interactive Split Experience Section */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Interactive Selector List */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {reasons.map((item, idx) => {
              const isActive = activeIdx === idx
              return (
                <div
                  key={item.num}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`group relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer select-none bg-white ${
                    isActive
                      ? 'border-black shadow-xl shadow-black/[0.04] translate-x-1 sm:translate-x-2'
                      : 'border-black/10 hover:border-black/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md transition-colors ${
                        isActive ? 'bg-[#111] text-white' : 'bg-black/5 text-black/50'
                      }`}>
                        {item.num}
                      </span>
                      <div>
                        <h3 className="text-base sm:text-xl font-medium tracking-tight text-[#111]">
                          {item.title}
                        </h3>
                        <p className="text-xs text-black/50 mt-0.5 sm:hidden">
                          {item.short}
                        </p>
                      </div>
                    </div>

                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive ? 'border-black bg-black text-white rotate-45' : 'border-black/10 text-black/30 group-hover:border-black/30'
                    }`}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Mobile-Only Expanded View */}
                  {isActive && (
                    <div className="mt-4 pt-3 border-t border-black/5 sm:hidden">
                      <p className="text-xs text-black/70 leading-relaxed">
                        {item.copy}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right Column: Live Interactive Stage (Desktop) */}
          <div className="hidden sm:flex lg:col-span-5 relative bg-white border border-black/10 rounded-3xl p-8 lg:p-10 flex-col justify-between shadow-xl shadow-black/[0.02] min-h-[420px]">
            {/* Background Accent Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20 rounded-3xl overflow-hidden">
              <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="currentColor" className="text-black" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              </svg>
            </div>

            <div className="relative z-10 flex justify-between items-start">
              <span className="font-mono text-4xl lg:text-5xl font-light text-black/20">
                {reasons[activeIdx].num}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest bg-white border border-black/10 px-3 py-1 rounded-full text-black/70 shadow-sm">
                {reasons[activeIdx].tag}
              </span>
            </div>

            <div className="relative z-10 my-auto py-8">
              <h4 className="text-2xl lg:text-3xl font-medium tracking-tight text-[#111] mb-4">
                {reasons[activeIdx].title}
              </h4>
              <p className="text-sm lg:text-base text-black/70 leading-relaxed">
                {reasons[activeIdx].copy}
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-black/10 flex justify-between items-center text-xs font-mono text-black/40">
              <span>PRINCIPLE {activeIdx + 1} OF 5</span>
              <span>TURING WINGS</span>
            </div>
          </div>

        </div>

        {/* CTA Banner */}
        <div className="mt-16 sm:mt-24 rounded-3xl bg-white border border-black/10 p-8 sm:p-12 md:p-16 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-xl shadow-black/[0.02]">
          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest text-black/60 bg-white border border-black/10 px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              THE FUTURE NEEDS BUILDERS
            </span>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#111] leading-tight">
              Bring your curiosity. <br />
              <span className="font-serif italic text-black/40">Leave with the confidence to make things real.</span>
            </h3>
          </div>

          <Link
            to="/contact"
            className="relative z-10 inline-flex items-center justify-between gap-4 bg-[#111] text-white px-8 py-5 rounded-2xl text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-black/80 transition-all duration-300 transform active:scale-95 shrink-0 group shadow-md"
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