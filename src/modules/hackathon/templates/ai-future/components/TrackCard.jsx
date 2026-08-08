import Badge from './Badge';

/** One hackathon track — name, code, short description. */
export default function TrackCard({ code, name, description }) {
  return (
    <div className="bg-base-card border border-base-line rounded-xl2 p-6 hover:border-signal-violet/50 transition-colors">
      <Badge tone="violet">{code}</Badge>
      <h3 className="font-display font-semibold text-lg mt-4 text-text">{name}</h3>
      <p className="text-text-muted text-sm mt-2 leading-relaxed">{description}</p>
    </div>
  );
}
