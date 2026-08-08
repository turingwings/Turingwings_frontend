import { useState } from 'react';
import { useEventData } from '../hooks/useEventData';
import { layoutConfig } from '../config/layout';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import CardLayout from '../layouts/CardLayout';
import GalleryCard from '../components/GalleryCard';
import Modal from '../components/Modal';
import ScrollReveal from '../animations/ScrollReveal';

export default function Gallery() {
  const { gallery } = useEventData();
  const [active, setActive] = useState(null);

  return (
    <SectionLayout id="gallery">
      <SectionTitle eyebrow="Moments" title="Gallery" />
      <CardLayout
        variant={layoutConfig.gallery}
        items={gallery.map((g) => (
          <ScrollReveal key={g.id}>
            <GalleryCard {...g} onClick={() => setActive(g)} />
          </ScrollReveal>
        ))}
      />
      <Modal open={!!active} onClose={() => setActive(null)} labelledBy="gallery-caption">
        {active && (
          <>
            <img src={active.src} alt={active.caption} className="w-full rounded-md mb-4" />
            <p id="gallery-caption" className="text-text-muted text-sm">{active.caption}</p>
          </>
        )}
      </Modal>
    </SectionLayout>
  );
}
