import { useEffect, useState } from 'react';

/**
 * useHeroAnimation
 * Drives the hero's entrance sequence: returns a 'stage' string that
 * advances on mount so eyebrow -> headline -> subhead -> CTAs can
 * stagger in without each consumer hand-rolling timeouts.
 */
export function useHeroAnimation() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const stages = [1, 2, 3, 4];
    const timers = stages.map((s, i) => setTimeout(() => setStage(s), 150 + i * 180));
    return () => timers.forEach(clearTimeout);
  }, []);

  return stage;
}
