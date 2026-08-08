/** Mentor headshot card — expertise instead of a formal role/title. */
export default function MentorCard({ name, expertise, photo }) {
  return (
    <div className="bg-base-card border border-base-line rounded-xl2 overflow-hidden text-center hover:-translate-y-1 transition-transform">
      <div className="aspect-square bg-base-raised overflow-hidden">
        {photo && <img src={photo} alt={name} className="w-full h-full object-cover" loading="lazy" />}
      </div>
      <div className="p-4">
        <p className="font-display font-semibold text-text">{name}</p>
        <p className="text-signal-cyan text-xs mt-1 font-mono uppercase tracking-wide">{expertise}</p>
      </div>
    </div>
  );
}
