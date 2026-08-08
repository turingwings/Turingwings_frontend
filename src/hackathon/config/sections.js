/**
 * sections.js
 * -----------------------------------------------------------------------
 * Declares which sections render on each page, and in what order.
 * Pages import this map and render sections dynamically — so the host
 * platform can reorder, hide, or add sections per event without a
 * code deploy (e.g. an event with no sponsors just omits 'sponsors').
 *
 * Every key here must match a component exported from src/sections.
 * -----------------------------------------------------------------------
 */

export const pageSections = {
  home: ['hero', 'about', 'statistics', 'highlights', 'timelinePreview', 'tracksPreview', 'sponsors', 'faqPreview', 'contactCta'],
  about: ['aboutHero', 'about', 'eligibility', 'rules', 'statistics'],
  timeline: ['pageHero', 'timeline'],
  tracks: ['pageHero', 'tracks', 'prizes'],
  judges: ['pageHero', 'judges'],
  mentors: ['pageHero', 'mentors'],
  sponsors: ['pageHero', 'sponsors'],
  faq: ['pageHero', 'faqs'],
  registration: ['pageHero', 'registrationInfo', 'eligibility'],
  contact: ['pageHero', 'contact'],
  live: ['liveHero', 'liveSchedule', 'announcements'],
  results: ['pageHero', 'results'],
  winners: ['winnersHero', 'winners'],
  gallery: ['pageHero', 'gallery'],
  certificates: ['pageHero', 'certificates']
};

// Default section-level toggles — an admin can disable a section entirely
// (e.g. hide "sponsors" for an internal, unsponsored event) without
// editing pageSections above.
export const sectionVisibility = {
  hero: true,
  about: true,
  statistics: true,
  highlights: true,
  timelinePreview: true,
  tracksPreview: true,
  sponsors: true,
  faqPreview: true,
  contactCta: true,
  eligibility: true,
  rules: true,
  prizes: true,
  announcements: true
};
