/** One milestone in the event timeline. Works in vertical, horizontal, or alternating layouts. */
export default function TimelineCard({ date, title, description, align = 'left' }) {
  const formatted = new Date(date).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: date.includes('T') ? '2-digit' : undefined, minute: date.includes('T') ? '2-digit' : undefined });

  return (
    <div className={`bg-base-card border border-base-line rounded-xl2 p-6 ${align === 'right' ? 'text-right' : 'text-left'}`}>
      <span className="font-mono text-xs text-signal-cyan uppercase tracking-wide">{formatted}</span>
      <h3 className="font-display font-semibold text-lg mt-2 text-text">{title}</h3>
      {description && <p className="text-text-muted text-sm mt-2 leading-relaxed">{description}</p>}
    </div>
  );
}
