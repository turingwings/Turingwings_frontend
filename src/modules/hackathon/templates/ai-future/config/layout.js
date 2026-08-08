/**
 * layout.js
 * -----------------------------------------------------------------------
 * Chooses which layout variant a section should render with. Sections
 * accept a `layout` prop and pass it to the underlying layout component
 * (see src/layouts). Change values here to restyle the page structure
 * without editing section or component code.
 * -----------------------------------------------------------------------
 */

export const layoutConfig = {
  hero: 'split', // 'centered' | 'split' | 'fullscreen' | 'imageRight' | 'imageLeft'
  timeline: 'alternating', // 'vertical' | 'horizontal' | 'alternating'
  tracks: 'grid', // 'grid' | 'masonry' | 'carousel'
  judges: 'grid',
  mentors: 'grid',
  sponsors: 'carousel',
  gallery: 'masonry',
  sectionContainer: 'container', // 'twoColumn' | 'threeColumn' | 'fullWidth' | 'container'
  maxWidth: '1280px',
  gutter: '1.5rem'
};

export const breakpoints = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  ultraWide: 1536
};
