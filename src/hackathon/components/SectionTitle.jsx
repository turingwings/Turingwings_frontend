import ScrollReveal from '../animations/ScrollReveal';

/** Consistent eyebrow + heading + optional description pattern used atop every section. */
export default function SectionTitle({ eyebrow, title, description, align = 'left' }) {
  return (
    <ScrollReveal className={`max-w-2xl mb-12 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-signal-cyan">{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 text-text">{title}</h2>
      {description && <p className="text-text-muted mt-4 leading-relaxed">{description}</p>}
    </ScrollReveal>
  );
}
