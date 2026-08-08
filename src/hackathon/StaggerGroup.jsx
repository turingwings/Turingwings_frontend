import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { staggerContainer } from './variants';

/** Wraps a list of children so they cascade in one after another. Pair with CardEntrance children. */
export default function StaggerGroup({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <motion.div ref={ref} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} variants={staggerContainer} className={className}>
      {children}
    </motion.div>
  );
}
