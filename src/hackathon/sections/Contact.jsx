import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import ScrollReveal from '../animations/ScrollReveal';

/**
 * Contact — display only. The actual submit handler is intentionally
 * left as a stub prop (onSubmit) since wiring it up is backend logic,
 * outside this template's scope.
 */
export default function Contact({ onSubmit }) {
  const { contact } = useEventData();

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) onSubmit(Object.fromEntries(new FormData(e.target)));
  }

  return (
    <SectionLayout id="contact">
      <SectionTitle eyebrow="Get in touch" title="Contact us" />
      <div className="grid md:grid-cols-2 gap-10">
        <ScrollReveal className="space-y-4 text-text-muted">
          <p><span className="text-text font-medium">Email:</span> {contact.email}</p>
          <p><span className="text-text font-medium">Phone:</span> {contact.phone}</p>
          <p><span className="text-text font-medium">Address:</span> {contact.address}</p>
        </ScrollReveal>
        <ScrollReveal>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input name="name" placeholder="Your name" className="w-full bg-base-card border border-base-line rounded-md px-4 py-3 text-sm placeholder:text-text-faint focus:outline-none focus:border-signal-cyan" required />
            <input name="email" type="email" placeholder="Your email" className="w-full bg-base-card border border-base-line rounded-md px-4 py-3 text-sm placeholder:text-text-faint focus:outline-none focus:border-signal-cyan" required />
            <textarea name="message" placeholder="Message" rows={4} className="w-full bg-base-card border border-base-line rounded-md px-4 py-3 text-sm placeholder:text-text-faint focus:outline-none focus:border-signal-cyan" required />
            <button type="submit" className="w-full rounded-full bg-signal-violet text-white py-3 font-display font-medium hover:shadow-glow transition-shadow">
              Send message
            </button>
          </form>
        </ScrollReveal>
      </div>
    </SectionLayout>
  );
}
