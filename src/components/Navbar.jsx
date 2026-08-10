import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight, ShieldCheck, Cpu, Phone, FileText, Lock } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while mobile menu drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Close mobile menu drawer on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const mobileNavItems = [
    { label: 'Cohorts', path: '/cohorts', icon: Cpu },
    { label: 'Buildathons', path: '/buildathons', icon: ShieldCheck },
    { label: 'Contact', path: '/contact', icon: Phone },
    { label: 'Privacy Policy', path: '/privacy', icon: Lock },
    { label: 'Terms & Service', path: '/terms', icon: FileText },
  ]

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-black/10 shadow-xs transition-all duration-300 font-product-sans">
        <div className="mx-auto flex h-14 md:h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 md:px-12">
          <Link to="/" aria-label="Turing Wings home" className="flex items-center overflow-hidden h-7 sm:h-8 md:h-11 shrink-0">
            <img src="/Logos/BlackFillNoBg.jpeg" alt="Turing Wings" className="h-[160%] w-auto object-contain object-top" />
          </Link>

          {/* PC VIEW NAVBAR */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 font-product-sans">
            <Link
              to="/cohorts"
              className="group hidden sm:inline-flex items-center gap-1.5 rounded-full border border-black/20 px-4 md:px-6 py-2 text-[10px] md:text-[11px] font-semibold tracking-[.08em] uppercase text-black transition-colors duration-200 hover:border-[#22C55E] hover:text-[#22C55E] bg-white cursor-pointer whitespace-nowrap"
            >
              <span>Explore Cohorts</span>
              <span className="text-[10px] font-mono opacity-40 transition-[transform,opacity] duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>

            <Link
              to="/buildathons"
              className="group inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-black/20 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-[10px] md:text-[11px] font-semibold tracking-[.08em] uppercase text-black transition-colors duration-200 hover:border-[#22C55E] hover:text-[#22C55E] bg-white whitespace-nowrap"
            >
              <span>Buildathons</span>
              <span className="text-[10px] font-mono opacity-40 transition-[transform,opacity] duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 rounded-full border border-black/20 px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 text-[10px] md:text-[11px] font-semibold tracking-[.08em] uppercase text-black transition-colors duration-200 hover:border-[#22C55E] hover:text-[#22C55E] bg-white whitespace-nowrap"
            >
              <span>Contact</span>
              <span className="text-[10px] font-mono opacity-40 transition-[transform,opacity] duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>

            {/* MOBILE HAMBURGER BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-full border border-black/20 text-black bg-white shrink-0 shadow-xs relative z-[110]"
              aria-label={menuOpen ? 'Close Navigation Menu' : 'Toggle Navigation Menu'}
            >
              {menuOpen ? <X className="w-5 h-5 text-[#22C55E]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE PORTAL DRAWER: Renders cleanly on document.body without header clipping or shrink bounds */}
      {menuOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[99999] md:hidden flex justify-end">
            {/* Backdrop */}
            <div
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
              aria-hidden="true"
            />

            {/* Drawer Container */}
            <div className="relative z-10 w-[82%] max-w-[320px] h-full bg-white flex flex-col shadow-2xl font-product-sans">
              {/* Header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-black/10 shrink-0 bg-[#FAF9F6]">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-black/50">
                  Menu
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-full text-black hover:bg-black/5 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col gap-3 px-4 py-6 overflow-y-auto flex-1 bg-white">
                {mobileNavItems.map((item) => {
                  const ItemIcon = item.icon
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        isActive
                          ? 'bg-[#090909] text-white border-[#090909] font-bold shadow-md'
                          : 'bg-[#FAF9F6] text-[#090909] border-black/10 hover:border-[#22C55E] hover:bg-[#22C55E]/10'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <ItemIcon className={`w-4 h-4 ${isActive ? 'text-[#22C55E]' : 'text-black/50'}`} />
                        <span className="text-xs uppercase tracking-wider font-bold">{item.label}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 opacity-50" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}