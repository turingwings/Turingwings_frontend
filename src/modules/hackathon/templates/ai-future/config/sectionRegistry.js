/**
 * sectionRegistry.js
 * -----------------------------------------------------------------------
 * Maps the string keys used in config/sections.js (pageSections) to the
 * actual section components. Pages loop over their section list and
 * look the component up here — this is what makes page composition
 * data-driven instead of hardcoded JSX per page.
 * -----------------------------------------------------------------------
 */
import Hero from '../sections/Hero';
import About from '../sections/About';
import AboutHero from '../sections/AboutHero';
import Statistics from '../sections/Statistics';
import Highlights from '../sections/Highlights';
import Timeline from '../sections/Timeline';
import TimelinePreview from '../sections/TimelinePreview';
import Tracks from '../sections/Tracks';
import TracksPreview from '../sections/TracksPreview';
import Prizes from '../sections/Prizes';
import Eligibility from '../sections/Eligibility';
import Rules from '../sections/Rules';
import Judges from '../sections/Judges';
import Mentors from '../sections/Mentors';
import Sponsors from '../sections/Sponsors';
import FAQs from '../sections/FAQs';
import FAQPreview from '../sections/FAQPreview';
import Contact from '../sections/Contact';
import ContactCta from '../sections/ContactCta';
import RegistrationInfo from '../sections/RegistrationInfo';
import PageHero from '../sections/PageHero';
import LiveHero from '../sections/LiveHero';
import WinnersHero from '../sections/WinnersHero';
import LiveSchedule from '../sections/LiveSchedule';
import Announcements from '../sections/Announcements';
import Gallery from '../sections/Gallery';
import Results from '../sections/Results';
import Winners from '../sections/Winners';
import Certificates from '../sections/Certificates';

export const sectionRegistry = {
  hero: Hero,
  aboutHero: AboutHero,
  about: About,
  statistics: Statistics,
  highlights: Highlights,
  timeline: Timeline,
  timelinePreview: TimelinePreview,
  tracks: Tracks,
  tracksPreview: TracksPreview,
  prizes: Prizes,
  eligibility: Eligibility,
  rules: Rules,
  judges: Judges,
  mentors: Mentors,
  sponsors: Sponsors,
  faqs: FAQs,
  faqPreview: FAQPreview,
  contact: Contact,
  contactCta: ContactCta,
  registrationInfo: RegistrationInfo,
  pageHero: PageHero,
  liveHero: LiveHero,
  winnersHero: WinnersHero,
  liveSchedule: LiveSchedule,
  announcements: Announcements,
  gallery: Gallery,
  results: Results,
  winners: Winners,
  certificates: Certificates
};

export default sectionRegistry;
