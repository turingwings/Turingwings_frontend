import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import PrimaryButton from '../components/PrimaryButton';
import ScrollReveal from '../animations/ScrollReveal';
import AnimatedGradient from '../backgrounds/AnimatedGradient';

/** Closing CTA band on the Home page — one last nudge to register. */
export default function ContactCta() {
  const { hero } = useEventData();
  return (
    <SectionLayout id="contact-cta" className="relative overflow-hidden rounded-xl2 !py-16 text-center border border-base-line mx-6 md:mx-auto">
      <AnimatedGradient className="absolute inset-0" />
      <ScrollReveal className="relative z-10">
        <h2 className="font-display text-3xl font-bold">Ready to build?</h2>
        <p className="text-text-muted mt-3">{hero.subheadline}</p>
        <PrimaryButton to="/register" size="lg" className="mt-6">Register your team</PrimaryButton>
      </ScrollReveal>
    </SectionLayout>
  );
}
