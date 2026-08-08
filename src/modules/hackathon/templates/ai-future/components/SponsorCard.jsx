/** Sponsor logo tile with tier label. */
export default function SponsorCard({ name, tier, logo }) {
  return (
    <div className="bg-base-card border border-base-line rounded-xl2 p-8 flex flex-col items-center justify-center gap-3 min-w-[200px]">
      {logo && <img src={logo} alt={`${name} logo`} className="h-10 object-contain opacity-90" loading="lazy" />}
      <span className="text-text-muted text-xs font-mono uppercase tracking-widest">{tier}</span>
    </div>
  );
}
