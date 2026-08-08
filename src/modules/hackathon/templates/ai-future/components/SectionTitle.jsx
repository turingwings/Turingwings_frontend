import ScrollReveal from '../animations/ScrollReveal';
import { useTheme } from '../hooks/useTheme';

/** Consistent eyebrow + heading + optional description pattern used atop every section. */
export default function SectionTitle({ eyebrow, title, description, align = 'left' }) {
  const theme = useTheme();
  const isGreenSpace = theme.mode === "greenspace" || theme.mode === "cyberpunk";

  return (
    <ScrollReveal className={`max-w-2xl mb-12 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span className={`font-mono text-xs tracking-[0.2em] uppercase ${isGreenSpace ? 'text-[#4ADE80] font-bold' : 'text-signal-cyan'}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-3xl md:text-4xl font-bold mt-3 ${isGreenSpace ? 'text-white drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'text-text'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 leading-relaxed ${isGreenSpace ? 'text-slate-300' : 'text-text-muted'}`}>
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
