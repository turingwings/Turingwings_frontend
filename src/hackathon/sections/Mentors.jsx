import { useEventData } from '../hooks/useEventData';
import { layoutConfig } from '../config/layout';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import CardLayout from '../layouts/CardLayout';
import MentorCard from '../components/MentorCard';
import ScrollReveal from '../animations/ScrollReveal';

export default function Mentors() {
  const { mentors } = useEventData();
  return (
    <SectionLayout id="mentors">
      <SectionTitle eyebrow="On-call all night" title="Mentors" description="Rotating office hours across the full 36-hour build window." />
      <CardLayout
        variant={layoutConfig.mentors}
        columns={3}
        items={mentors.map((m) => (
          <ScrollReveal key={m.id}><MentorCard {...m} /></ScrollReveal>
        ))}
      />
    </SectionLayout>
  );
}
