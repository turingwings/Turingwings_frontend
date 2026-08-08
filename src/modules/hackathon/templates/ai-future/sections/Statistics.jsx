import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import StatisticsCard from '../components/StatisticsCard';
import StaggerGroup from '../animations/StaggerGroup';
import { cardEntrance } from '../animations/variants';
import { motion } from 'framer-motion';

/** Statistics — hackathon vitals at a glance (hours, teams, prize pool, mentors). */
export default function Statistics() {
  const { statistics } = useEventData();

  return (
    <SectionLayout id="statistics" className="!pt-0">
      <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statistics.map((s, i) => (
          <motion.div key={s.label} custom={i} variants={cardEntrance}>
            <StatisticsCard {...s} />
          </motion.div>
        ))}
      </StaggerGroup>
    </SectionLayout>
  );
}
