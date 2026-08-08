import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { scrollReveal } from './variants';

/**
 * ScrollReveal
 * Generic wrapper: fades + slides children in once they enter the
 * viewport. Use this instead of duplicating IntersectionObserver logic
 * in every section.
 */
export default function ScrollReveal({ children, variants = scrollReveal, className = '', as = 'div', ...rest }) {
  const [ref, isVisible] = useScrollAnimation();
  const Comp = motion[as] || motion.div;

  return (
    <Comp
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}
