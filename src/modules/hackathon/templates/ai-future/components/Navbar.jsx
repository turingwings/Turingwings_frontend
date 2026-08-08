import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { primaryNav, primaryCTA, liveNav } from '../config/navigation';
import { useEventData } from '../hooks/useEventData';
import PrimaryButton from './PrimaryButton';

/**
 * Navbar
 * Reads links from config/navigation.js. Shows "Live Event" only when
 * eventData.meta.status matches, so the same nav bar automatically
 * adapts as the event moves from upcoming -> live -> ended.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { meta } = useEventData();

  const visibleLiveLinks = liveNav.filter((l) => l.status === meta.status || (l.status === 'ended' && meta.status === 'ended'));

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-base/80 border-b border-base-line">
      <nav className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="font-display font-bold text-lg tracking-tight">
          {meta.name}
        </NavLink>

        <div className="hidden lg:flex items-center gap-7">
          {[...primaryNav, ...visibleLiveLinks].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-signal-cyan' : 'text-text-muted hover:text-text'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <PrimaryButton to={primaryCTA.path} size="sm">{primaryCTA.label}</PrimaryButton>
        </div>

        <button
          className="lg:hidden text-text p-2"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block w-6 h-0.5 bg-text mb-1.5" />
          <span className="block w-6 h-0.5 bg-text mb-1.5" />
          <span className="block w-4 h-0.5 bg-text" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-base-line bg-base"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {[...primaryNav, ...visibleLiveLinks].map((item) => (
                <NavLink key={item.path} to={item.path} onClick={() => setOpen(false)} className="text-sm font-medium text-text-muted hover:text-text">
                  {item.label}
                </NavLink>
              ))}
              <PrimaryButton to={primaryCTA.path} onClick={() => setOpen(false)}>{primaryCTA.label}</PrimaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
