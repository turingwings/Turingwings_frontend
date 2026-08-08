import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import TimelineCard from '../components/TimelineCard';
import StaggerGroup from '../animations/StaggerGroup';
import SecondaryButton from '../components/SecondaryButton';
import { cardEntrance } from '../animations/variants';
import { motion } from 'framer-motion';

/** Condensed 3-item timeline teaser for the Home page, linking to the full Timeline page. */
export default function TimelinePreview() {
  const { timeline } = useEventData();
  const preview = timeline.slice(0, 3);

  return (
    <SectionLayout id="timeline-preview">
      <SectionTitle eyebrow="Runbook" title="How the 36 hours unfold" />
      <StaggerGroup className="grid md:grid-cols-3 gap-6 mb-10">
        {preview.map((t, i) => (
          <motion.div key={t.id} custom={i} variants={cardEntrance}>
            <TimelineCard {...t} />
          </motion.div>
        ))}
      </StaggerGroup>
      <SecondaryButton to="/timeline">View full timeline</SecondaryButton>
    </SectionLayout>
  );
}
