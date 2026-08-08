import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import FAQAccordion from '../components/FAQAccordion';
import SecondaryButton from '../components/SecondaryButton';
import ScrollReveal from '../animations/ScrollReveal';

/** Home page teaser — first 3 FAQs, link to full page. */
export default function FAQPreview() {
  const { faqs } = useEventData();
  return (
    <SectionLayout id="faq-preview">
      <SectionTitle eyebrow="Questions" title="Good to know" />
      <ScrollReveal className="max-w-2xl mb-8">
        <FAQAccordion items={faqs.slice(0, 3)} />
      </ScrollReveal>
      <SecondaryButton to="/faq">View all FAQs</SecondaryButton>
    </SectionLayout>
  );
}
