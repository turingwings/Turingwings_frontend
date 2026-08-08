/** One prize tier — place, amount, description. */
export default function PrizeCard({ place, amount, description }) {
  return (
    <div className="bg-gradient-to-b from-base-card to-base-raised border border-base-line rounded-xl2 p-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-signal-amber">{place}</p>
      <p className="font-display text-3xl font-bold mt-3 text-text">{amount}</p>
      <p className="text-text-muted text-sm mt-3">{description}</p>
    </div>
  );
}
