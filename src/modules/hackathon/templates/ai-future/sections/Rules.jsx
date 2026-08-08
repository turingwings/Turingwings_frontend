import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import ScrollReveal from '../animations/ScrollReveal';

/** Competition rules checklist. */
export default function Rules() {
  const { rules } = useEventData();

  return (
    <SectionLayout id="rules">
      <SectionTitle eyebrow="Play fair" title="Rules" />
      <ScrollReveal>
        <ul className="space-y-3 max-w-2xl">
          {rules.map((line) => (
            <li key={line} className="flex gap-3 text-text-muted">
              <span className="text-signal-amber mt-1">▸</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </SectionLayout>
  );
}
