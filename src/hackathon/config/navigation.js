/**
 * navigation.js
 * -----------------------------------------------------------------------
 * Single source of truth for site navigation. Navbar, Footer, and
 * Breadcrumb all read from this file. Add/remove/reorder a page by
 * editing this array — no component changes required.
 * -----------------------------------------------------------------------
 */

export const primaryNav = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Timeline', path: '/timeline' },
  { label: 'Tracks', path: '/tracks' },
  { label: 'Judges', path: '/judges' },
  { label: 'Mentors', path: '/mentors' },
  { label: 'Sponsors', path: '/sponsors' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' }
];

// Shown as a highlighted CTA button, separate from the regular nav list.
export const primaryCTA = { label: 'Register', path: '/register' };

// Only appears once the event has started — the host platform can toggle
// this by passing `eventStatus: 'live' | 'upcoming' | 'ended'` into config.
export const liveNav = [
  { label: 'Live Event', path: '/live', status: 'live' },
  { label: 'Results', path: '/results', status: 'ended' },
  { label: 'Winners', path: '/winners', status: 'ended' }
];

export const footerNav = {
  columns: [
    {
      title: 'Event',
      links: [
        { label: 'About', path: '/about' },
        { label: 'Timeline', path: '/timeline' },
        { label: 'Tracks', path: '/tracks' },
        { label: 'FAQ', path: '/faq' }
      ]
    },
    {
      title: 'People',
      links: [
        { label: 'Judges', path: '/judges' },
        { label: 'Mentors', path: '/mentors' },
        { label: 'Sponsors', path: '/sponsors' }
      ]
    },
    {
      title: 'Participate',
      links: [
        { label: 'Register', path: '/register' },
        { label: 'Gallery', path: '/gallery' },
        { label: 'Certificates', path: '/certificates' },
        { label: 'Contact', path: '/contact' }
      ]
    }
  ],
  socials: [
    { label: 'Twitter / X', href: '#', icon: 'twitter' },
    { label: 'LinkedIn', href: '#', icon: 'linkedin' },
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'Discord', href: '#', icon: 'discord' }
  ]
};
