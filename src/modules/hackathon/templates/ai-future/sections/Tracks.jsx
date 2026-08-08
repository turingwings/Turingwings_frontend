import { useEventData } from '../hooks/useEventData';
import { layoutConfig } from '../config/layout';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import CardLayout from '../layouts/CardLayout';
import TrackCard from '../components/TrackCard';
import ScrollReveal from '../animations/ScrollReveal';

/** Full track listing page section. */
export default function Tracks() {
  const { tracks } = useEventData();

  return (
    <SectionLayout id="tracks">
      <SectionTitle eyebrow="Pick your lane" title="Tracks" description="Choose one track when you register — every track is judged independently." />
      <CardLayout
        variant={layoutConfig.tracks}
        columns={3}
        items={tracks.map((t) => (
          <ScrollReveal key={t.id}>
            <TrackCard {...t} />
          </ScrollReveal>
        ))}
      />
    </SectionLayout>
  );
}
