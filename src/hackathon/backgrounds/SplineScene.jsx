/**
 * SplineScene
 * Stub wrapper for an embedded Spline (spline.design) 3D scene. Pass a
 * published Spline scene URL to activate; otherwise renders nothing so
 * unused events don't pay the iframe/load cost.
 */
export default function SplineScene({ sceneUrl, className = '' }) {
  if (!sceneUrl) return null;
  return (
    <iframe
      title="3D scene"
      src={sceneUrl}
      className={`w-full h-full border-0 ${className}`}
      loading="lazy"
      aria-hidden="true"
    />
  );
}
