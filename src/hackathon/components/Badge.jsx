/** Small status pill — 'Live', 'Upcoming', track codes, etc. */
export default function Badge({ children, tone = 'violet', className = '' }) {
  const tones = {
    violet: 'bg-signal-violet/15 text-signal-violet border-signal-violet/30',
    cyan: 'bg-signal-cyan/15 text-signal-cyan border-signal-cyan/30',
    amber: 'bg-signal-amber/15 text-signal-amber border-signal-amber/30',
    rose: 'bg-signal-rose/15 text-signal-rose border-signal-rose/30'
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wide ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
