import { useEventData } from '../hooks/useEventData';
import ScrollReveal from '../animations/ScrollReveal';

/** Winners page hero. */
export default function WinnersHero() {
  const { meta } = useEventData();
  return (
    <div className="pt-16 pb-10 px-6 max-w-[1280px] mx-auto text-center">
      <ScrollReveal>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text">🏆 {meta.name} Winners</h1>
        <p className="text-text-muted mt-3">Congratulations to every team that shipped.</p>
      </ScrollReveal>
    </div>
  );
}
