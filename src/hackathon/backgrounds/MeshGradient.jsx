/** Layered soft-blur color blobs forming a mesh-gradient look, using pure CSS (no canvas cost). */
export default function MeshGradient({ className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-signal-violet/25 blur-3xl rounded-full" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-signal-cyan/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-signal-amber/10 blur-3xl rounded-full" />
    </div>
  );
}
