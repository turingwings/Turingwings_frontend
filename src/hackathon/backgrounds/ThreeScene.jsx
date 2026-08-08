/**
 * ThreeScene
 * -----------------------------------------------------------------------
 * Intentionally a thin, dependency-free stub. Wiring a real three.js
 * scene pulls in a heavy dependency that most events won't need — add
 * `three` to package.json and implement here only if an event's brief
 * specifically calls for a 3D hero (e.g. a rotating trophy/badge).
 * -----------------------------------------------------------------------
 */
export default function ThreeScene({ className = '' }) {
  return <div className={className} aria-hidden="true" />;
}
