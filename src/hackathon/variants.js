import { easing, duration, stagger } from '../config/animations';

/**
 * variants.js
 * Framer Motion variant objects, shared across sections/components.
 * Import these instead of writing ad-hoc { opacity: 0 } objects inline.
 */

export const scrollReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.base, ease: easing.standard } }
};

export const scrollRevealLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: duration.base, ease: easing.standard } }
};

export const scrollRevealRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: duration.base, ease: easing.standard } }
};

export const cardEntrance = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: duration.base, ease: easing.snappy, delay: i * stagger.base }
  })
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: stagger.base } }
};

export const heroHeadline = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.hero, ease: easing.standard } }
};

export const hoverLift = {
  rest: { y: 0, transition: { duration: duration.fast, ease: easing.soft } },
  hover: { y: -6, transition: { duration: duration.fast, ease: easing.soft } }
};

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: duration.base, ease: easing.standard } },
  exit: { opacity: 0, y: -12, transition: { duration: duration.fast, ease: easing.soft } }
};
