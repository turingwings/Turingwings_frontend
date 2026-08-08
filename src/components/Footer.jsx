import { Link } from 'react-router-dom'

const contactDetails = [
  { label: 'EMAIL', value: 'contact@turingwings.org', href: 'mailto:contact@turingwings.org' },
  { label: 'PHONE', value: '+91 98765 43211', href: 'tel:+919876543211' },
]

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
]

export default function Footer() {
  return (
    <footer
      className="pt-12 pb-0 font-mono bg-[#090909] text-white overflow-hidden relative border-t border-white/10"
    >
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">

        {/* Top Info, Contact & Social Chips Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 items-center border-b border-white/10">

          {/* Large Prominent Brand Logo */}
          <div className="lg:col-span-4 flex items-center">
            <Link to="/" aria-label="Turing Wings home">
              <img
                src="/Logos/BlackFillNoBg.png"
                alt="Turing Wings"
                className="h-28 sm:h-32 md:h-36 w-auto object-contain shrink-0 brightness-0 invert hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Contact Details Row */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#22C55E]">
              DIRECT COMMAND CONTACT
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactDetails.map((item) => (
                <div key={item.label} className="flex flex-col gap-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    className="text-xs sm:text-sm font-bold text-white hover:text-[#22C55E] transition-colors truncate underline underline-offset-4 decoration-white/20 hover:decoration-[#22C55E]"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Social Connect Chips / Pills */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#22C55E]">
              COMMUNITY CONNECT
            </span>
            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-white/10 hover:bg-[#22C55E] text-white hover:text-black transition-all border border-white/10 hover:border-[#22C55E]"
                >
                  <span>{social.label}</span>
                  <span className="text-[10px] opacity-70">↗</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Quote Row */}
        <div className="py-8 flex justify-center text-center">
          <p className="font-serif italic text-xl sm:text-3xl text-white font-bold tracking-tight">
            "Built by engineers, for engineers."
          </p>
        </div>

        {/* Legal & Copyright Row */}
        <div className="pt-4 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60 border-t border-white/10">
          <p>© {new Date().getFullYear()} Turing Wings. All rights reserved.</p>
          <div className="flex items-center gap-6 font-bold">
            <Link
              to="/privacy"
              className="text-white/70 hover:text-[#22C55E] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-white/70 hover:text-[#22C55E] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

      </div>

      {/* Half-Cut "TURING WINGS" Watermark Banner */}
      <div className="w-full overflow-hidden pointer-events-none select-none flex justify-center -mb-4 pt-2 bg-gradient-to-t from-black/40 to-transparent">
        <h1 className="text-[14vw] font-black tracking-tighter leading-none uppercase whitespace-nowrap text-center text-white/5 translate-y-[28%]">
          TURING WINGS
        </h1>
      </div>
    </footer>
  )
}