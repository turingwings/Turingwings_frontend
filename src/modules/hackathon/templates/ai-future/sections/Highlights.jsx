import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import StaggerGroup from '../animations/StaggerGroup';
import { cardEntrance } from '../animations/variants';
import { motion } from 'framer-motion';

/** Highlights — reuses about.highlights but presented as a wider feature strip (for Home). */
export default function Highlights() {
  const { about } = useEventData();

  return (
    <SectionLayout id="highlights">
      <SectionTitle eyebrow="Why join" title="Built for people who ship" align="center" />
      <StaggerGroup className="grid sm:grid-cols-3 gap-6">
        {about.highlights.map((h, i) => (
          <motion.div key={h.title} custom={i} variants={cardEntrance} className="text-center p-6">
            <div className="w-10 h-10 mx-auto rounded-full bg-signal-violet/15 border border-signal-violet/30 mb-4" />
            <p className="font-display font-semibold text-text">{h.title}</p>
            <p className="text-text-muted text-sm mt-2">{h.description}</p>
          </motion.div>
        ))}
      </StaggerGroup>
    </SectionLayout>
  );
}
