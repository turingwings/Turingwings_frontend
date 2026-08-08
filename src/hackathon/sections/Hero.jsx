import { useEventData } from '../hooks/useEventData';
import { layoutConfig } from '../config/layout';
import HeroLayout from '../layouts/HeroLayout';
import CircuitTrace from '../backgrounds/CircuitTrace';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import CountdownTimer from '../components/CountdownTimer';
import Badge from '../components/Badge';
import { motion } from 'framer-motion';
import { heroHeadline } from '../animations/variants';
import { useHeroAnimation } from '../hooks/useHeroAnimation';

/** Hero — the thesis statement of the whole site. Headline, tagline, CTAs, live countdown. */
export default function Hero() {
  const { meta, hero } = useEventData();
  const stage = useHeroAnimation();

  const content = (
    <div>
      <Badge tone={meta.status === 'live' ? 'rose' : 'cyan'} className={stage >= 1 ? 'opacity-100' : 'opacity-0'}>
        {meta.status === 'live' ? 'Live now' : hero.eyebrow}
      </Badge>

      <motion.h1
        initial="hidden"
        animate={stage >= 2 ? 'visible' : 'hidden'}
        variants={heroHeadline}
        className="font-display text-4xl md:text-6xl font-bold mt-5 leading-[1.05] text-text"
      >
        {hero.headline}
      </motion.h1>

      <p className={`text-text-muted text-lg mt-5 max-w-md transition-opacity duration-700 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        {hero.subheadline}
      </p>

      <div className={`flex flex-wrap gap-4 mt-8 transition-opacity duration-700 ${stage >= 4 ? 'opacity-100' : 'opacity-0'}`}>
        <PrimaryButton to={hero.primaryCta.path} size="lg">{hero.primaryCta.label}</PrimaryButton>
        <SecondaryButton to={hero.secondaryCta.path} size="lg">{hero.secondaryCta.label}</SecondaryButton>
      </div>

      <p className="text-text-faint text-xs font-mono mt-8 uppercase tracking-widest">{meta.venue} · {meta.mode}</p>
    </div>
  );

  const media = (
    <div className="flex flex-col items-center md:items-end gap-3">
      <span className="font-mono text-xs text-text-faint uppercase tracking-widest">Countdown to kickoff</span>
      <CountdownTimer target={meta.startDate} />
    </div>
  );

  return (
    <HeroLayout
      variant={layoutConfig.hero}
      background={<CircuitTrace className="absolute inset-0 -z-10 opacity-70" nodeCount={7} />}
      content={content}
      media={media}
    />
  );
}
