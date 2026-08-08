/** Shown when a section has no data yet (e.g. winners before results are announced). */
export default function EmptyState({ title, description, icon = '—' }) {
  return (
    <div className="border border-dashed border-base-line rounded-xl2 py-16 px-6 text-center">
      <div className="text-3xl mb-3 text-text-faint">{icon}</div>
      <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
      {description && <p className="text-text-muted text-sm max-w-sm mx-auto">{description}</p>}
    </div>
  );
}
