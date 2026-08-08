import { useEventData } from '../hooks/useEventData';
import { layoutConfig } from '../config/layout';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import CardLayout from '../layouts/CardLayout';
import JudgeCard from '../components/JudgeCard';
import ScrollReveal from '../animations/ScrollReveal';

export default function Judges() {
  const { judges } = useEventData();
  return (
    <SectionLayout id="judges">
      <SectionTitle eyebrow="The panel" title="Judges" description="Industry leaders scoring your demo on impact, execution, and presentation." />
      <CardLayout
        variant={layoutConfig.judges}
        columns={3}
        items={judges.map((j) => (
          <ScrollReveal key={j.id}><JudgeCard {...j} /></ScrollReveal>
        ))}
      />
    </SectionLayout>
  );
}
