/** Judge/mentor headshot card — shared shape, reused by JudgeCard and MentorCard visually. */
export default function JudgeCard({ name, role, photo }) {
  return (
    <div className="bg-base-card border border-base-line rounded-xl2 overflow-hidden text-center hover:-translate-y-1 transition-transform">
      <div className="aspect-square bg-base-raised overflow-hidden">
        {photo && <img src={photo} alt={name} className="w-full h-full object-cover" loading="lazy" />}
      </div>
      <div className="p-4">
        <p className="font-display font-semibold text-text">{name}</p>
        <p className="text-text-muted text-xs mt-1">{role}</p>
      </div>
    </div>
  );
}
