import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import FAQAccordion from '../components/FAQAccordion';
import ScrollReveal from '../animations/ScrollReveal';

export default function FAQs() {
  const { faqs } = useEventData();
  return (
    <SectionLayout id="faqs">
      <SectionTitle eyebrow="Questions" title="Frequently asked" />
      <ScrollReveal className="max-w-2xl">
        <FAQAccordion items={faqs} />
      </ScrollReveal>
    </SectionLayout>
  );
}
