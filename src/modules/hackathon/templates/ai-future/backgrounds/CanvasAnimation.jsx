/**
 * CanvasAnimation
 * Placeholder slot for a bespoke canvas sketch (e.g. an admin-supplied
 * animation script). Kept intentionally minimal — wire a custom draw
 * function via the `onFrame` prop if the event needs something unique.
 */
import { useEffect, useRef } from 'react';

export default function CanvasAnimation({ className = '', onFrame }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !onFrame) return undefined;
    const ctx = canvas.getContext('2d');
    let raf;
    const loop = (t) => {
      onFrame(ctx, canvas, t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [onFrame]);
  return <canvas ref={ref} className={`w-full h-full ${className}`} aria-hidden="true" />;
}
