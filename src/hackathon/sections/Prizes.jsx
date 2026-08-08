import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import PrizeCard from '../components/PrizeCard';
import StaggerGroup from '../animations/StaggerGroup';
import { cardEntrance } from '../animations/variants';
import { motion } from 'framer-motion';

/** Prizes breakdown — shown on the Tracks page. */
export default function Prizes() {
  const { prizes } = useEventData();

  return (
    <SectionLayout id="prizes">
      <SectionTitle eyebrow="What's at stake" title="Prizes" />
      <StaggerGroup className="grid sm:grid-cols-3 gap-6">
        {prizes.map((p, i) => (
          <motion.div key={p.place} custom={i} variants={cardEntrance}>
            <PrizeCard {...p} />
          </motion.div>
        ))}
      </StaggerGroup>
    </SectionLayout>
  );
}
