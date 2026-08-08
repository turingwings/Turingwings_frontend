import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import TimelineLayout from '../layouts/TimelineLayout';
import TimelineCard from '../components/TimelineCard';
import ScrollReveal from '../animations/ScrollReveal';

/** Reuses the timeline data as a "what's happening now / next" schedule during the live event. */
export default function LiveSchedule() {
  const { timeline } = useEventData();
  return (
    <SectionLayout id="live-schedule">
      <SectionTitle eyebrow="Right now" title="Live schedule" />
      <TimelineLayout
        variant="vertical"
        items={timeline.map((t) => (
          <ScrollReveal key={t.id}><TimelineCard {...t} /></ScrollReveal>
        ))}
      />
    </SectionLayout>
  );
}
