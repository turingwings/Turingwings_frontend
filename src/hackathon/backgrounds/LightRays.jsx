/** Diagonal light-ray wash behind a hero — CSS conic-gradient, no image asset needed. */
export default function LightRays({ className = '' }) {
  return (
    <div
      className={`bg-[conic-gradient(from_210deg_at_50%_0%,rgba(124,92,255,0.15),transparent_25%,transparent_75%,rgba(51,230,204,0.12))] ${className}`}
      aria-hidden="true"
    />
  );
}
