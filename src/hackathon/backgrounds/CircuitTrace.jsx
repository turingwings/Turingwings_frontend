import { motion } from 'framer-motion';

/**
 * CircuitTrace — signature background element.
 * -----------------------------------------------------------------------
 * A set of pulsing nodes connected by animated signal paths, evoking a
 * circuit board / motherboard trace. Used behind Hero and Timeline to
 * visually encode the "idea -> build -> ship -> win" journey — not a
 * decorative blob gradient. Pure SVG, no dependency on three.js/Spline,
 * so it's cheap and works everywhere.
 *
 * Props:
 *  - nodeCount: how many pulse nodes to scatter
 *  - className: positioning wrapper classes (e.g. absolute inset-0 -z-10)
 */
export default function CircuitTrace({ nodeCount = 6, className = '' }) {
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    x: 60 + ((i * 173) % 880),
    y: 40 + ((i * 97) % 460),
    delay: i * 0.3
  }));

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 1000 540" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="traceLine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#33E6CC" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {nodes.slice(0, -1).map((n, i) => {
          const next = nodes[i + 1];
          const pathD = `M${n.x},${n.y} L${next.x},${next.y}`;
          return (
            <motion.path
              key={`line-${i}`}
              d={pathD}
              stroke="url(#traceLine)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.6, delay: n.delay, ease: 'easeInOut' }}
            />
          );
        })}

        {nodes.map((n, i) => (
          <g key={`node-${i}`}>
            <circle cx={n.x} cy={n.y} r="3" fill="#33E6CC" className="animate-pulseTrace" />
            <circle cx={n.x} cy={n.y} r="10" fill="none" stroke="#7C5CFF" strokeOpacity="0.25" />
          </g>
        ))}
      </svg>
    </div>
  );
}
