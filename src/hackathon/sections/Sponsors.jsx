import { useEventData } from '../hooks/useEventData';
import { layoutConfig } from '../config/layout';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import CardLayout from '../layouts/CardLayout';
import SponsorCard from '../components/SponsorCard';
import ScrollReveal from '../animations/ScrollReveal';

export default function Sponsors() {
  const { sponsors } = useEventData();
  return (
    <SectionLayout id="sponsors">
      <SectionTitle eyebrow="Made possible by" title="Sponsors" align="center" />
      <CardLayout
        variant={layoutConfig.sponsors}
        columns={4}
        items={sponsors.map((s) => (
          <ScrollReveal key={s.id}><SponsorCard {...s} /></ScrollReveal>
        ))}
      />
    </SectionLayout>
  );
}
