import { useIntersection } from './useIntersection';
import { useTheme } from './useTheme';

/**
 * useScrollAnimation
 * Wraps useIntersection with the theme's global motion switch, so a
 * single admin toggle (or prefers-reduced-motion) can flatten every
 * scroll-reveal animation in the site to "just show it".
 */
export function useScrollAnimation(options) {
  const theme = useTheme();
  const [ref, isVisible] = useIntersection(options);
  const motionEnabled = theme.motion?.enabled ?? true;
  return [ref, motionEnabled ? isVisible : true];
}
