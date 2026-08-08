import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import EmptyState from '../components/EmptyState';
import StaggerGroup from '../animations/StaggerGroup';
import { cardEntrance } from '../animations/variants';
import { motion } from 'framer-motion';

/** Celebratory winners showcase — larger cards than the Results grid. */
export default function Winners() {
  const { winners } = useEventData();

  if (!winners?.length) {
    return (
      <SectionLayout id="winners">
        <EmptyState title="Winners not announced yet" icon="🏆" />
      </SectionLayout>
    );
  }

  return (
    <SectionLayout id="winners">
      <StaggerGroup className="grid md:grid-cols-3 gap-8">
        {winners.map((w, i) => (
          <motion.div key={w.id} custom={i} variants={cardEntrance} className="bg-gradient-to-b from-base-card to-base-raised border border-signal-amber/30 rounded-xl2 p-8 text-center">
            <div className="text-3xl mb-3">🏆</div>
            <p className="font-mono text-xs text-signal-amber uppercase tracking-widest">{w.place}</p>
            <p className="font-display font-bold text-xl mt-3">{w.team}</p>
            <p className="text-text-muted text-sm mt-1">{w.project}</p>
          </motion.div>
        ))}
      </StaggerGroup>
    </SectionLayout>
  );
}
