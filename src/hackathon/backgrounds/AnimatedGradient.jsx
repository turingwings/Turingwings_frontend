/** Slow-moving radial gradient wash. Cheapest, safest ambient background — good default. */
export default function AnimatedGradient({ className = '' }) {
  return (
    <div
      className={`bg-[radial-gradient(circle_at_20%_20%,rgba(124,92,255,0.18),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(51,230,204,0.14),transparent_45%)] ${className}`}
      aria-hidden="true"
    />
  );
}
