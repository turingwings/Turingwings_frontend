import { motion } from 'framer-motion';
import { pageSections, sectionVisibility } from '../config/sections';
import { sectionRegistry } from '../config/sectionRegistry';
import { pageTransition } from '../animations/variants';

/**
 * PageBuilder
 * Every page in src/pages is a one-liner: <PageBuilder page="home" />.
 * It looks up which sections that page needs from config/sections.js,
 * resolves each to a component via sectionRegistry, and renders them
 * in order — skipping any section toggled off in sectionVisibility.
 *
 * This is what lets the Turing Wings platform reorder or hide sections
 * per event without a code change.
 */
export default function PageBuilder({ page, extraProps = {} }) {
  const keys = pageSections[page] || [];

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      {keys.map((key) => {
        if (sectionVisibility[key] === false) return null;
        const SectionComponent = sectionRegistry[key];
        if (!SectionComponent) {
          if (import.meta.env?.DEV) {
            // eslint-disable-next-line no-console
            console.warn(`PageBuilder: no section registered for key "${key}"`);
          }
          return null;
        }
        return <SectionComponent key={key} {...(extraProps[key] || {})} />;
      })}
    </motion.div>
  );
}
