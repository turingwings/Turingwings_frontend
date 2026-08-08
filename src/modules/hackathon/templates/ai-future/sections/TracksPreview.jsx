import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import TrackCard from '../components/TrackCard';
import StaggerGroup from '../animations/StaggerGroup';
import SecondaryButton from '../components/SecondaryButton';
import { cardEntrance } from '../animations/variants';
import { motion } from 'framer-motion';

/** Home page teaser of the top tracks. */
export default function TracksPreview() {
  const { tracks } = useEventData();
  const preview = tracks.slice(0, 3);

  return (
    <SectionLayout id="tracks-preview">
      <SectionTitle eyebrow="Pick your lane" title="Five tracks, one stage" />
      <StaggerGroup className="grid md:grid-cols-3 gap-6 mb-10">
        {preview.map((t, i) => (
          <motion.div key={t.id} custom={i} variants={cardEntrance}>
            <TrackCard {...t} />
          </motion.div>
        ))}
      </StaggerGroup>
      <SecondaryButton to="/tracks">View all tracks</SecondaryButton>
    </SectionLayout>
  );
}
