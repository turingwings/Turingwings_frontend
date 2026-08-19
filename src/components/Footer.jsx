import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import linkedinIcon from '../assets/tech_icons/linkedin.png'
import instagramIcon from '../assets/tech_icons/instagram.png'
import youtubeIcon from '../assets/tech_icons/youtube.png'

const contactDetails = [
  { label: 'EMAIL', value: 'contact@turingwings.com', href: 'mailto:contact@turingwings.com', icon: Mail },
  { label: 'PHONE', value: '+91 83419 99296', href: 'tel:+918341999296', icon: Phone },
]

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: linkedinIcon },
  { label: 'Instagram', href: 'https://instagram.com', icon: instagramIcon },
  { label: 'YouTube', href: 'https://youtube.com', icon: youtubeIcon },
]

export default function Footer() {
  return (
    <footer className="pt-8 sm:pt-10 pb-0 font-product-sans bg-[#090909] text-white overflow-hidden relative border-t border-white/10">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12">

        {/* Top Info, Contact & Social Chips Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-4 sm:pb-6 items-center">

          {/* Prominent Brand Logo & Tagline */}
          <div className="lg:col-span-4 flex flex-col items-start gap-2.5">
            <Link to="/" aria-label="Turing Wings home" className="inline-block">
              <img
                src="/Logos/WhiteNoBg.png"
                alt="Turing Wings"
                className="h-10 sm:h-12 w-auto object-contain shrink-0 hover:opacity-90 transition-opacity"
              />
            </Link>
            <p className="text-xs text-white/50 max-w-xs leading-relaxed font-product-sans">
              AI-First Engineering Cohorts & Buildathons. Master production-grade systems by building real products.
            </p>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#22C55E]">
              DIRECT CONTACT
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
              {contactDetails.map((item) => {
                const ItemIcon = item.icon
                return (
                  <div key={item.label} className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/40">
                      {item.label}
                    </span>
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-2 min-h-[44px] text-xs sm:text-sm font-semibold text-white/90 hover:text-[#22C55E] transition-colors truncate"
                    >
                      <ItemIcon className="w-3.5 h-3.5 text-white/40 shrink-0" />
                      <span className="truncate">{item.value}</span>
                    </a>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Social Connect Chips / Pills */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#22C55E]">
              COMMUNITY
            </span>
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="p-2 min-h-[44px] min-w-[44px] rounded-xl border border-transparent hover:border-white bg-transparent flex items-center justify-center transition-all duration-200 hover:scale-110 touch-action-manipulation"
                >
                  <img
                    src={social.icon}
                    alt={social.label}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Quote Row */}
        <div className="py-2 sm:py-3 flex justify-center text-center">
          <p className="font-serif italic text-sm sm:text-xl text-white/80 font-medium tracking-tight">
            "Built by engineers, for engineers."
          </p>
        </div>

        {/* Legal & Copyright Row */}
        <div className="py-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-white/50">
          <p>© {new Date().getFullYear()} Turing Wings. All rights reserved.</p>
          <div className="flex items-center gap-6 font-semibold">
            <Link
              to="/privacy"
              className="inline-flex items-center min-h-[44px] text-white/60 hover:text-[#22C55E] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="inline-flex items-center min-h-[44px] text-white/60 hover:text-[#22C55E] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

      </div>

      {/* "TURING WINGS" Watermark Banner with Green Outline */}
      <div className="w-full overflow-hidden pointer-events-none select-none flex justify-center pt-2 -mb-4">
        <h1
          className="text-[clamp(2.2rem,13.5vw,14.5vw)] font-black tracking-tighter leading-none uppercase whitespace-nowrap text-center text-[#0e0e0e] font-product-sans opacity-90 translate-y-[25%] flex items-center justify-center gap-[0.25em]"
          style={{
            WebkitTextStroke: '1.5px #000000',
            paintOrder: 'stroke fill',
          }}
        >
          <span>TURING</span>
          <span>WINGS</span>
        </h1>
      </div>
    </footer>
  )
}