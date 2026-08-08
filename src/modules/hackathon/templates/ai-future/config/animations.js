/**
 * animations.js
 * -----------------------------------------------------------------------
 * Central timing + easing tokens for the animation system in
 * src/animations. Components should import variants from
 * src/animations, not define motion values inline, so global
 * "speed up / slow down / disable" changes happen in one place.
 * -----------------------------------------------------------------------
 */

export const easing = {
  standard: [0.22, 1, 0.36, 1],
  snappy: [0.16, 1, 0.3, 1],
  soft: [0.4, 0, 0.2, 1]
};

export const duration = {
  fast: 0.25,
  base: 0.5,
  slow: 0.9,
  hero: 1.1
};

export const stagger = {
  tight: 0.06,
  base: 0.12,
  loose: 0.2
};
