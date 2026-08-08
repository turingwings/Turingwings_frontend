import { AnimatePresence, motion } from 'framer-motion';

/** Small anchored popover (tooltips, inline confirmations) — lighter than Modal. */
export default function Popup({ open, children, className = '' }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          className={`absolute z-50 bg-base-card border border-base-line rounded-md shadow-card p-3 text-sm ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
