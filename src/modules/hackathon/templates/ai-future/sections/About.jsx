import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import ScrollReveal from '../animations/ScrollReveal';
import StaggerGroup from '../animations/StaggerGroup';
import { cardEntrance } from '../animations/variants';
import { motion } from 'framer-motion';

/** About — what the event is, plus 3 highlight tiles. */
export default function About() {
  const { about } = useEventData();

  return (
    <SectionLayout id="about">
      <SectionTitle eyebrow="About the event" title={about.title} description={about.body} />
      <StaggerGroup className="grid sm:grid-cols-3 gap-6">
        {about.highlights.map((h, i) => (
          <motion.div key={h.title} custom={i} variants={cardEntrance} className="bg-base-card border border-base-line rounded-xl2 p-6">
            <p className="font-display font-semibold text-text">{h.title}</p>
            <p className="text-text-muted text-sm mt-2 leading-relaxed">{h.description}</p>
          </motion.div>
        ))}
      </StaggerGroup>
    </SectionLayout>
  );
}
