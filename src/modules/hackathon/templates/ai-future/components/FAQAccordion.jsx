import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/** Accordion list — accepts an array of { q, a } items. */
export default function FAQAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="divide-y divide-base-line border border-base-line rounded-xl2 overflow-hidden">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} className="bg-base-card">
            <button
              className="w-full flex items-center justify-between text-left px-6 py-5"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-display font-medium text-text">{item.q}</span>
              <span className={`text-signal-cyan transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-text-muted text-sm leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
