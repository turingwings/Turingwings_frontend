/** Floating outlined polygons — subtle technical texture for section backgrounds. */
export default function GeometricShapes({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 800 400" fill="none" aria-hidden="true">
      <polygon points="60,40 140,90 60,140" stroke="#7C5CFF" strokeOpacity="0.3" className="animate-floatY" />
      <rect x="640" y="60" width="70" height="70" stroke="#33E6CC" strokeOpacity="0.3" transform="rotate(18 675 95)" className="animate-floatY" />
      <circle cx="400" cy="330" r="34" stroke="#FFB238" strokeOpacity="0.25" />
    </svg>
  );
}
