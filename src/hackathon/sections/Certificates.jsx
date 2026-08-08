import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import EmptyState from '../components/EmptyState';
import PrimaryButton from '../components/PrimaryButton';
import ScrollReveal from '../animations/ScrollReveal';

/**
 * Certificates — display + lookup form stub. Actual certificate
 * generation/verification is backend logic (out of scope here); this
 * renders the UI shell and calls onLookup with the entered ID/email.
 */
export default function Certificates({ onLookup }) {
  const { meta } = useEventData();

  function handleSubmit(e) {
    e.preventDefault();
    if (onLookup) onLookup(Object.fromEntries(new FormData(e.target)));
  }

  return (
    <SectionLayout id="certificates">
      <SectionTitle eyebrow="Proof you shipped" title="Download your certificate" description={`For participants of ${meta.name}.`} />
      <ScrollReveal className="max-w-md">
        <form className="flex gap-3" onSubmit={handleSubmit}>
          <input name="lookupId" placeholder="Team name or registered email" className="flex-1 bg-base-card border border-base-line rounded-md px-4 py-3 text-sm placeholder:text-text-faint focus:outline-none focus:border-signal-cyan" required />
          <PrimaryButton type="submit">Find</PrimaryButton>
        </form>
      </ScrollReveal>
      <div className="mt-8">
        <EmptyState title="No certificate found yet" description="Certificates are issued within 5 days of the closing ceremony." icon="📜" />
      </div>
    </SectionLayout>
  );
}
