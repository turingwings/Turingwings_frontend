import { useLocation } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import GeometricShapes from '../backgrounds/GeometricShapes';
import ScrollReveal from '../animations/ScrollReveal';

const titleMap = {
  '/about': ['About', 'Everything you need to know before you build.'],
  '/timeline': ['Timeline', 'Every milestone across the 36 hours.'],
  '/tracks': ['Tracks', 'Five lanes. One stage. Pick yours.'],
  '/judges': ['Judges', 'The panel scoring your demo.'],
  '/mentors': ['Mentors', "They're here for the 3am debugging session too."],
  '/sponsors': ['Sponsors', 'The teams making this possible.'],
  '/faq': ['FAQ', 'Answers to what everyone asks first.'],
  '/register': ['Register', 'Lock in your team and track.'],
  '/contact': ['Contact', "Questions? We're one message away."],
  '/results': ['Results', 'How the judging shook out.'],
  '/gallery': ['Gallery', 'Moments from the build floor.'],
  '/certificates': ['Certificates', 'Download proof you shipped.']
};

/** Compact page-level hero used on every non-Home page — pulls copy from the route. */
export default function PageHero() {
  const { pathname } = useLocation();
  const [title, subtitle] = titleMap[pathname] || ['Page', ''];

  return (
    <div className="relative pt-16 pb-10 px-6 max-w-[1280px] mx-auto">
      <GeometricShapes className="absolute top-0 right-0 w-64 h-40 -z-10 opacity-60" />
      <Breadcrumb />
      <ScrollReveal>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text">{title}</h1>
        {subtitle && <p className="text-text-muted mt-3 max-w-xl">{subtitle}</p>}
      </ScrollReveal>
    </div>
  );
}
