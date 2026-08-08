/**
 * theme.js
 * -----------------------------------------------------------------------
 * Central design tokens. Change values here (or override at runtime by
 * merging an admin-supplied theme object) to retheme the entire template
 * without touching a single component.
 *
 * The Turing Wings platform can inject a partial override, e.g.:
 *   import { mergeTheme } from './config/theme';
 *   const theme = mergeTheme(adminEvent.themeOverrides);
 * -----------------------------------------------------------------------
 */

export const defaultTheme = {
  colors: {
    base: '#0B0E14',
    baseRaised: '#11151F',
    card: '#161B27',
    line: '#232939',
    text: '#F4F5F7',
    textMuted: '#9AA3B2',
    textFaint: '#5C6478',
    primary: '#7C5CFF', // signal.violet
    secondary: '#33E6CC', // signal.cyan
    accent: '#FFB238', // signal.amber
    danger: '#FF5D7A' // signal.rose
  },
  fonts: {
    display: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"JetBrains Mono", monospace'
  },
  radii: {
    sm: '0.5rem',
    md: '0.875rem',
    lg: '1.25rem',
    pill: '999px'
  },
  motion: {
    // Global switch — respected by every animation hook/component.
    // Set to false for admins who want a static, print-like site,
    // and automatically forced false when prefers-reduced-motion is set.
    enabled: true,
    speed: 1 // multiplier, 1 = default duration
  },
  logo: {
    src: '/src/assets/logos/event-logo.svg',
    alt: '{{EVENT_NAME}} logo'
  }
};

/** Deep-merges an admin override onto the default theme (one level deep per group). */
export function mergeTheme(overrides = {}) {
  return {
    colors: { ...defaultTheme.colors, ...(overrides.colors || {}) },
    fonts: { ...defaultTheme.fonts, ...(overrides.fonts || {}) },
    radii: { ...defaultTheme.radii, ...(overrides.radii || {}) },
    motion: { ...defaultTheme.motion, ...(overrides.motion || {}) },
    logo: { ...defaultTheme.logo, ...(overrides.logo || {}) }
  };
}

export default defaultTheme;
