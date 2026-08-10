import { useEffect, useRef, useState } from 'react'
import { FileCode2, ArrowUpRight, TerminalSquare } from 'lucide-react'

const topics = [
  { id: '01', slug: 'ai-native-dev', title: 'AI-native software development', desc: 'Build full products with AI in every step.' },
  { id: '02', slug: 'product-design', title: 'AI-assisted product design', desc: 'Turn early thinking into interfaces worth using.' },
  { id: '03', slug: 'coding-workflows', title: 'AI coding workflows', desc: 'Direct agents, review outputs, own the code.' },
  { id: '04', slug: 'auth-payments', title: 'Authentication & payments', desc: 'Make experiences people can trust.' },
  { id: '05', slug: 'ai-integrations', title: 'AI integrations', desc: 'Connect models, data, and tools into features.' },
  { id: '06', slug: 'deploy-devops', title: 'Deployment & DevOps', desc: 'Ship confidently with modern cloud workflows.' },
  { id: '07', slug: 'agents-automation', title: 'AI agents & automations', desc: 'Design systems that reason and take action.' },
  { id: '08', slug: 'cyber-security', title: 'AI-powered cyber security', desc: 'Build security as a creative discipline.' },
]

const outcomes = [
  { value: 40, suffix: '+', label: 'shipped' },
  { value: 92, suffix: '%', label: 'deployed' },
  { value: 8, suffix: 'wk', label: 'to launch' },
]

function Counter({ value, suffix, active }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!active) return
    const duration = 1000
    const start = performance.now()
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, value])
  return <span>{display}{suffix}</span>
}

export default function BuildWithAI() {
  const [active, setActive] = useState(0)
  const [statsOn, setStatsOn] = useState(false)
  const rootRef = useRef(null)
  const topic = topics[active]

  useEffect(() => {
    const node = rootRef.current
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStatsOn(true),
      { threshold: 0.3 }
    )
    if (node) observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={rootRef}
      id="buildwithai"
      className="bg-[#F6F5F1] text-[#14161A] py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-12 overflow-hidden border-b border-black/10"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');

        .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

        .blink {
          animation: blink 1.1s steps(1) infinite;
        }
        @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .blink { animation: none; opacity: 1; }
        }

        .line-enter {
          animation: lineIn 0.28s ease both;
        }
        @keyframes lineIn {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .line-enter { animation: none; }
        }

        .tab-strip::-webkit-scrollbar { display: none; }
        .tab-strip { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      <div className="mx-auto max-w-[1200px]">

        {/* Header */}
        <div className="mb-8 sm:mb-14 max-w-2xl">
          <p className="mono text-[11px] font-semibold tracking-widest text-black/45 uppercase mb-3">
            03 / Curriculum
          </p>
          <h2 className="text-[2rem] leading-[1.1] sm:text-5xl font-extrabold tracking-tight text-[#0E0F12]">
            Learn by shipping,<br className="hidden sm:block" /> not by reading.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-black/55 leading-relaxed">
            Eight modules. Each one ends with something real, deployed.
          </p>
        </div>

        {/* Editor block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-xl overflow-hidden border border-black/10 shadow-[0_1px_0_rgba(0,0,0,0.02)]">

          {/* File rail — desktop only */}
          <div className="hidden lg:flex lg:col-span-3 flex-col bg-[#FBFAF8] border-r border-black/10 py-3">
            {topics.map((t, idx) => {
              const isActive = idx === active
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(idx)}
                  className={`group flex items-center gap-2.5 text-left px-4 py-2.5 mono text-[13px] border-l-2 transition-colors focus-visible:outline-none focus-visible:bg-black/[0.04] ${
                    isActive
                      ? 'border-[#5B8DEF] bg-white text-[#0E0F12] font-medium'
                      : 'border-transparent text-black/45 hover:text-black/75 hover:bg-black/[0.02]'
                  }`}
                >
                  <FileCode2 size={14} className={isActive ? 'text-[#5B8DEF]' : 'text-black/30'} />
                  <span className="truncate">{t.id}_{t.slug}.ts</span>
                </button>
              )
            })}
          </div>

          {/* Tab strip — mobile only */}
          <div className="tab-strip lg:hidden flex gap-2 overflow-x-auto px-4 py-3.5 bg-[#FBFAF8] border-b border-black/10">
            {topics.map((t, idx) => {
              const isActive = idx === active
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(idx)}
                  className={`mono shrink-0 text-[12px] px-3 py-1.5 rounded-full border transition-colors focus-visible:outline-none ${
                    isActive
                      ? 'bg-[#0E0F12] text-white border-[#0E0F12]'
                      : 'bg-white text-black/50 border-black/10'
                  }`}
                >
                  {t.id}
                </button>
              )
            })}
          </div>

          {/* Editor pane */}
          <div className="lg:col-span-9 bg-[#1B1D22] flex flex-col">

            {/* window chrome */}
            <div className="hidden sm:flex items-center gap-2 px-5 py-3 border-b border-white/[0.06]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF6B5F]/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8A23D]/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#6FCF97]/70" />
              <span className="mono text-[11px] text-white/35 ml-2">{topic.id}_{topic.slug}.ts</span>
            </div>

            {/* code content */}
            <div key={active} className="line-enter px-5 sm:px-8 py-6 sm:py-8 flex-1">
              <div className="mono text-[12.5px] sm:text-[13.5px] leading-7 sm:leading-8">
                <p className="text-[#6FCF97]/80">// curriculum/{topic.id}_{topic.slug}.ts</p>
                <p className="text-white/20">&nbsp;</p>
                <p>
                  <span className="text-[#5B8DEF]">export const</span>{' '}
                  <span className="text-white/85">module</span>{' '}
                  <span className="text-white/50">= {'{'}</span>
                </p>
                <p className="pl-4">
                  <span className="text-white/50">title:</span>{' '}
                  <span className="text-[#E8A23D]">"{topic.title}"</span>
                  <span className="text-white/50">,</span>
                </p>
                <p className="pl-4">
                  <span className="text-white/50">focus:</span>{' '}
                  <span className="text-[#E8A23D]">"{topic.desc}"</span>
                  <span className="text-white/50">,</span>
                </p>
                <p className="text-white/50">
                  {'}'}<span className="blink text-white/40">▌</span>
                </p>
              </div>
            </div>

            {/* terminal output / stats */}
            <div className="border-t border-white/[0.06] px-5 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2 mono text-[12px] text-white/40">
                <TerminalSquare size={13} className="text-white/30 shrink-0" />
                <span className="text-white/25 hidden xs:inline">$</span>
                <span>
                  {outcomes.map((o, i) => (
                    <span key={o.label}>
                      <span className="text-white/80 font-medium"><Counter value={o.value} suffix={o.suffix} active={statsOn} /></span>{' '}
                      <span>{o.label}</span>
                      {i < outcomes.length - 1 && <span className="text-white/25"> · </span>}
                    </span>
                  ))}
                </span>
              </div>

              <a
                href="#cohorts"
                className="mono inline-flex items-center justify-center gap-1.5 text-[12.5px] font-medium bg-[#5B8DEF] hover:bg-[#4879DE] text-white rounded-md px-4 py-2.5 sm:py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B8DEF]/50"
              >
                Explore cohorts <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}