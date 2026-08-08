import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import ScrollReveal from '../animations/ScrollReveal';

/** Eligibility checklist — plain list, no card noise needed for scannable rules. */
export default function Eligibility() {
  const { eligibility } = useEventData();

  return (
    <SectionLayout id="eligibility">
      <SectionTitle eyebrow="Before you register" title="Eligibility" />
      <ScrollReveal>
        <ul className="space-y-3 max-w-2xl">
          {eligibility.map((line) => (
            <li key={line} className="flex gap-3 text-text-muted">
              <span className="text-signal-cyan mt-1">▸</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </SectionLayout>
  );
}
