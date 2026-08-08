import { useEventData } from '../hooks/useEventData';
import Badge from '../components/Badge';
import ScrollReveal from '../animations/ScrollReveal';
import CircuitTrace from '../backgrounds/CircuitTrace';

/** Live Event hero — shows a pulsing "Live" badge instead of a countdown. */
export default function LiveHero() {
  const { meta } = useEventData();
  return (
    <div className="relative pt-16 pb-10 px-6 max-w-[1280px] mx-auto text-center">
      <CircuitTrace className="absolute inset-0 -z-10 opacity-50" nodeCount={5} />
      <ScrollReveal>
        <Badge tone="rose" className="mb-4">● Live</Badge>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text">{meta.name} is happening now</h1>
        <p className="text-text-muted mt-3">Follow the schedule and live announcements below.</p>
      </ScrollReveal>
    </div>
  );
}
