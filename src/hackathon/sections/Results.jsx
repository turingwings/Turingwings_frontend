import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import EmptyState from '../components/EmptyState';
import StaggerGroup from '../animations/StaggerGroup';
import { cardEntrance } from '../animations/variants';
import { motion } from 'framer-motion';

export default function Results() {
  const { winners, meta } = useEventData();
  const resultsReady = meta.status === 'ended' && winners?.length > 0;

  return (
    <SectionLayout id="results">
      <SectionTitle eyebrow="Judging outcome" title="Results" />
      {!resultsReady ? (
        <EmptyState title="Results not published yet" description="Check back after the awards ceremony." icon="⏳" />
      ) : (
        <StaggerGroup className="grid sm:grid-cols-3 gap-6">
          {winners.map((w, i) => (
            <motion.div key={w.id} custom={i} variants={cardEntrance} className="bg-base-card border border-base-line rounded-xl2 p-6 text-center">
              <p className="font-mono text-xs text-signal-amber uppercase tracking-widest">{w.place}</p>
              <p className="font-display font-semibold text-lg mt-2">{w.team}</p>
              <p className="text-text-muted text-sm mt-1">{w.project}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      )}
    </SectionLayout>
  );
}
