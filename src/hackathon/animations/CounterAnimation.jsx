import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/** Animates a number counting up from 0 to `value` once visible — powers StatCard. */
export default function CounterAnimation({ value, duration = 1.4, prefix = '', suffix = '' }) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isVisible) return undefined;
    let start = null;
    let frame;
    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, value, duration]);

  return (
    <motion.span ref={ref} className="font-mono tabular-nums">
      {prefix}{display}{suffix}
    </motion.span>
  );
}
