import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import PrimaryButton from '../components/PrimaryButton';
import ScrollReveal from '../animations/ScrollReveal';

/**
 * RegistrationInfo — display + a form stub. Actual submission/payment/
 * auth logic belongs to the host platform, not this template.
 */
export default function RegistrationInfo({ onSubmit }) {
  const { meta, tracks } = useEventData();

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) onSubmit(Object.fromEntries(new FormData(e.target)));
  }

  return (
    <SectionLayout id="registration">
      <SectionTitle eyebrow="Join the build" title="Register your team" description={`Registrations for ${meta.name} are open now.`} />
      <ScrollReveal className="max-w-xl">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input name="teamName" placeholder="Team name" className="w-full bg-base-card border border-base-line rounded-md px-4 py-3 text-sm placeholder:text-text-faint focus:outline-none focus:border-signal-cyan" required />
          <input name="leadEmail" type="email" placeholder="Team lead email" className="w-full bg-base-card border border-base-line rounded-md px-4 py-3 text-sm placeholder:text-text-faint focus:outline-none focus:border-signal-cyan" required />
          <select name="track" className="w-full bg-base-card border border-base-line rounded-md px-4 py-3 text-sm focus:outline-none focus:border-signal-cyan" required defaultValue="">
            <option value="" disabled>Choose a track</option>
            {tracks.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <PrimaryButton type="submit" className="w-full">Submit registration</PrimaryButton>
        </form>
      </ScrollReveal>
    </SectionLayout>
  );
}
