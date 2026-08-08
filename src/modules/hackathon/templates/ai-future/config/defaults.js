/**
 * defaults.js
 * -----------------------------------------------------------------------
 * This is THE contract between the Turing Wings platform and this
 * template. The admin's event data must match this shape. Every
 * section/component reads from `eventData` (see src/hooks and
 * TemplateLayout.jsx) which falls back to this object in dev/preview.
 *
 * To wire up a real event: replace this default export at load time,
 * e.g. <TemplateLayout eventData={adminEvent} />
 * -----------------------------------------------------------------------
 */

export const defaultEventData = {
  meta: {
    name: 'Hackfinity 2026',
    tagline: 'Build the future in 36 hours.',
    status: 'upcoming', // 'upcoming' | 'live' | 'ended'
    startDate: '2026-09-18T09:00:00+05:30',
    endDate: '2026-09-19T21:00:00+05:30',
    venue: 'Turing Wings Innovation Campus, Bengaluru',
    mode: 'Hybrid — onsite + online tracks'
  },

  hero: {
    eyebrow: 'Turing Wings presents',
    headline: 'Hackfinity 2026',
    subheadline: 'A 36-hour build sprint for engineers, designers, and builders who ship.',
    primaryCta: { label: 'Register your team', path: '/register' },
    secondaryCta: { label: 'Explore tracks', path: '/tracks' }
  },

  about: {
    title: 'What is Hackfinity',
    body:
      'Hackfinity is a 36-hour hackathon bringing together students and early-career builders to design, prototype, and ship working products across five tracks. Teams of up to four get mentor access, cloud credits, and a stage to demo in front of industry judges.',
    highlights: [
      { title: 'Mentor-backed', description: 'Rotating mentor office hours across all 36 hours.' },
      { title: 'Real prizes', description: 'Cash, cloud credits, and pilot opportunities for top teams.' },
      { title: 'Beginner friendly', description: 'First-time hackers welcome — no track requires prior experience.' }
    ]
  },

  statistics: [
    { label: 'Hours to build', value: 36, suffix: '' },
    { label: 'Teams expected', value: 250, suffix: '+' },
    { label: 'Total prize pool', value: 12, prefix: '₹', suffix: 'L' },
    { label: 'Mentors onsite', value: 40, suffix: '+' }
  ],

  timeline: [
    { id: 'reg-open', date: '2026-08-05', title: 'Registrations open', description: 'Team registration and idea submission portal goes live.' },
    { id: 'reg-close', date: '2026-09-10', title: 'Registrations close', description: 'Last date to lock your team and track.' },
    { id: 'kickoff', date: '2026-09-18T09:00', title: 'Opening ceremony', description: 'Track briefings and mentor introductions.' },
    { id: 'build', date: '2026-09-18T11:00', title: 'Build phase begins', description: '36-hour build window opens.' },
    { id: 'checkpoint', date: '2026-09-19T02:00', title: 'Midnight checkpoint', description: 'Optional progress check-in with mentors.' },
    { id: 'submit', date: '2026-09-19T18:00', title: 'Submissions close', description: 'Freeze your repo and submit your demo video.' },
    { id: 'demo', date: '2026-09-19T19:00', title: 'Demos & judging', description: 'Live 4-minute pitches to the judging panel.' },
    { id: 'awards', date: '2026-09-19T21:00', title: 'Awards ceremony', description: 'Winners announced across all tracks.' }
  ],

  tracks: [
    { id: 'ai-ml', name: 'AI & Machine Learning', code: 'TRK-01', description: 'Applied ML, agentic tools, and model-backed products.' },
    { id: 'climate', name: 'Climate & Sustainability', code: 'TRK-02', description: 'Tech for measurable environmental impact.' },
    { id: 'fintech', name: 'FinTech', code: 'TRK-03', description: 'Payments, lending, and financial inclusion tools.' },
    { id: 'health', name: 'HealthTech', code: 'TRK-04', description: 'Diagnostics, care access, and health data tools.' },
    { id: 'open', name: 'Open Innovation', code: 'TRK-05', description: 'Anything goes — bring your own problem.' }
  ],

  eligibility: [
    'Open to students and early-career professionals (under 3 years experience).',
    'Teams of 1 to 4 members; solo hackers welcome.',
    'At least one team member must be present for the opening ceremony.',
    'All code must be written during the 36-hour build window.'
  ],

  rules: [
    'Projects must be started from scratch during the event.',
    'Use of open-source libraries and public APIs is allowed and encouraged.',
    'Each team submits one repository and a 4-minute demo video.',
    'Judging is based on impact, technical execution, and presentation.'
  ],

  prizes: [
    { place: 'Grand Prize', amount: '₹3,00,000', description: 'Best overall project across all tracks.' },
    { place: 'Track Winners', amount: '₹1,00,000', description: 'Top project in each of the 5 tracks.' },
    { place: "People's Choice", amount: '₹50,000', description: 'Voted by fellow participants.' }
  ],

  judges: [
    { id: 'j1', name: 'Ananya Rao', role: 'VP Engineering, Northwind Labs', photo: '/src/assets/images/judge-placeholder.png' },
    { id: 'j2', name: 'Marcus Yeo', role: 'Partner, Ridgeline Ventures', photo: '/src/assets/images/judge-placeholder.png' },
    { id: 'j3', name: 'Priya Nambiar', role: 'Head of AI, Solace Health', photo: '/src/assets/images/judge-placeholder.png' }
  ],

  mentors: [
    { id: 'm1', name: 'Dev Kapoor', expertise: 'Backend & Infra', photo: '/src/assets/images/mentor-placeholder.png' },
    { id: 'm2', name: 'Lena Fischer', expertise: 'Product Design', photo: '/src/assets/images/mentor-placeholder.png' },
    { id: 'm3', name: 'Ravi Shastri', expertise: 'ML & Data', photo: '/src/assets/images/mentor-placeholder.png' }
  ],

  sponsors: [
    { id: 's1', name: 'Northwind Cloud', tier: 'Title Sponsor', logo: '/src/assets/logos/sponsor-placeholder.svg' },
    { id: 's2', name: 'Ridgeline Ventures', tier: 'Gold', logo: '/src/assets/logos/sponsor-placeholder.svg' },
    { id: 's3', name: 'Solace Health', tier: 'Gold', logo: '/src/assets/logos/sponsor-placeholder.svg' },
    { id: 's4', name: 'Dendra Labs', tier: 'Silver', logo: '/src/assets/logos/sponsor-placeholder.svg' }
  ],

  faqs: [
    { q: 'Who can participate?', a: 'Students and early-career professionals with under 3 years of experience.' },
    { q: 'Is there a participation fee?', a: 'No, participation is completely free.' },
    { q: 'Can I join without a team?', a: 'Yes — we host a team-formation session before the event starts.' },
    { q: 'Will travel be reimbursed?', a: 'Selected teams from outside the host city receive partial travel support.' }
  ],

  gallery: [
    { id: 'g1', src: '/src/assets/images/gallery-placeholder-1.png', caption: 'Opening ceremony 2025' },
    { id: 'g2', src: '/src/assets/images/gallery-placeholder-2.png', caption: 'Teams building overnight' },
    { id: 'g3', src: '/src/assets/images/gallery-placeholder-3.png', caption: 'Finalist demos on stage' }
  ],

  winners: [
    { id: 'w1', place: '1st — Grand Prize', team: 'Team Northstar', project: 'CropSense AI' },
    { id: 'w2', place: '2nd — Runner Up', team: 'Team Ohm', project: 'GridWatch' },
    { id: 'w3', place: "3rd — People's Choice", team: 'Team Loop', project: 'ReCircle' }
  ],

  contact: {
    email: 'hello@hackfinity.dev',
    phone: '+91 90000 00000',
    address: 'Turing Wings Innovation Campus, Outer Ring Road, Bengaluru',
    socials: { twitter: '#', linkedin: '#', instagram: '#', discord: '#' }
  }
};

export default defaultEventData;
