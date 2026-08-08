import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowUpRight, ShieldCheck, Cpu, Phone, FileText, Lock } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // close drawer on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const mobileNavItems = [
    { label: 'Cohorts', path: '/cohorts', icon: Cpu },
    { label: 'Buildathons', path: '/buildathons', icon: ShieldCheck },
    { label: 'Contact', path: '/contact', icon: Phone },
    { label: 'Privacy Policy', path: '/privacy', icon: Lock },
    { label: 'Terms & Service', path: '/terms', icon: FileText },
  ];

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-black/10 shadow-sm' : ''}`}>
      <div className="mx-auto flex h-14 md:h-16 max-w-[1600px] items-center justify-between px-4 sm:px-6 md:px-12">
        <Link to="/" aria-label="Turing Wings home" className="flex items-center overflow-hidden h-7 sm:h-8 md:h-11 shrink-0">
          <img src="/Logos/BlackFillNoBg.png" alt="Turing Wings" className="h-[160%] w-auto object-contain object-top" />
        </Link>

        {/* PC VIEW NAVBAR (UNCHANGED) */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">
          <Link
            to="/cohorts"
            className="group hidden sm:inline-flex items-center gap-1.5 rounded-full border border-black/20 px-4 md:px-6 py-2 text-[9px] md:text-[10px] font-bold tracking-[.1em] md:tracking-[.15em] uppercase text-black transition-colors duration-200 hover:border-[#22C55E] hover:text-[#22C55E] bg-white cursor-pointer whitespace-nowrap"
          >
            <span>Explore Cohorts</span>
            <span className="text-[10px] font-mono opacity-40 transition-[transform,opacity] duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>

          <Link
            to="/buildathons"
            className="group inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-black/20 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-[9px] md:text-[10px] font-bold tracking-[.1em] md:tracking-[.15em] uppercase text-black transition-colors duration-200 hover:border-[#22C55E] hover:text-[#22C55E] bg-white whitespace-nowrap"
          >
            <span>Buildathons</span>
            <span className="text-[10px] font-mono opacity-40 transition-[transform,opacity] duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>

          <Link
            to="/contact"
            className="group inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 rounded-full border border-black/20 px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 text-[9px] md:text-[10px] font-bold tracking-[.1em] md:tracking-[.15em] uppercase text-black transition-colors duration-200 hover:border-[#22C55E] hover:text-[#22C55E] bg-white whitespace-nowrap"
          >
            <span>Contact</span>
            <span className="text-[10px] font-mono opacity-40 transition-[transform,opacity] duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-full border border-black/20 text-black bg-white shrink-0 shadow-xs relative z-[70]"
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? <X className="w-5 h-5 text-[#22C55E]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* BACKDROP OVERLAY */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] md:hidden transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* SIDE DRAWER */}
      <div
        className={`fixed top-0 right-0 z-[60] h-full w-[78%] max-w-xs bg-white shadow-2xl md:hidden font-mono
        transform transition-transform duration-300 ease-out
        ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 h-14 border-b border-black/10 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">
              Menu
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center p-1.5 rounded-full border border-black/20 text-black bg-white"
              aria-label="Close Navigation Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer nav items */}
          <div className="flex flex-col gap-2 px-4 py-5 overflow-y-auto">
            {mobileNavItems.map((item) => {
              const ItemIcon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-[#090909] text-white border-[#090909] font-bold shadow-md'
                      : 'bg-[#FAF8F5] text-[#090909] border-black/10 hover:border-[#22C55E] hover:bg-[#22C55E]/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ItemIcon className={`w-4 h-4 ${isActive ? 'text-[#22C55E]' : 'text-black/50'}`} />
                    <span className="text-xs uppercase tracking-wider font-bold">{item.label}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}