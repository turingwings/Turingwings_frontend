import { useEventData } from '../hooks/useEventData';
import { layoutConfig } from '../config/layout';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import TimelineLayout from '../layouts/TimelineLayout';
import TimelineCard from '../components/TimelineCard';
import ScrollReveal from '../animations/ScrollReveal';

/** Full timeline — every milestone from registration open to awards. */
export default function Timeline() {
  const { timeline } = useEventData();

  return (
    <SectionLayout id="timeline">
      <SectionTitle eyebrow="Runbook" title="Event timeline" description="Every milestone, from registration to awards." />
      <TimelineLayout
        variant={layoutConfig.timeline}
        items={timeline.map((t, i) => (
          <ScrollReveal key={t.id}>
            <TimelineCard date={t.date} title={t.title} description={t.description} align={layoutConfig.timeline === 'alternating' && i % 2 !== 0 ? 'right' : 'left'} />
          </ScrollReveal>
        ))}
      />
    </SectionLayout>
  );
}
