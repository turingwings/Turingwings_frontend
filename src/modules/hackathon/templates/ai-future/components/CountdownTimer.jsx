import { useEffect, useState } from 'react';
import { useTheme } from '../hooks/useTheme';

function getTimeLeft(target) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

/** Live countdown to a target ISO date with dynamic template theme styling. */
export default function CountdownTimer({ target, className = '' }) {
  const theme = useTheme();
  const [time, setTime] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hrs', value: time.hours },
    { label: 'Min', value: time.minutes },
    { label: 'Sec', value: time.seconds }
  ];

  // Dynamic Card Styles according to Template Mode
  const boxStyle =
    theme.mode === "greenspace" || theme.mode === "cyberpunk"
      ? "bg-black/60 backdrop-blur-md border border-[#22C55E]/50 text-[#4ADE80] shadow-[0_0_20px_rgba(74,222,128,0.4)]"
      : theme.mode === "space"
      ? "bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 shadow-[0_0_25px_rgba(99,102,241,0.3)]"
      : theme.mode === "corporate"
      ? "bg-slate-900 border border-slate-700 text-white font-mono"
      : theme.mode === "3d"
      ? "bg-[#121212] border border-[#10B981]/50 text-[#10B981] shadow-2xl"
      : theme.mode === "minimal"
      ? "bg-white border border-black/15 text-[#111] shadow-xs"
      : "bg-slate-900/80 border border-amber-500/30 text-amber-400";

  return (
    <div className={`flex gap-3 sm:gap-4 ${className}`}>
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div className={`font-mono text-2xl md:text-3xl font-bold px-3.5 py-2.5 rounded-xl tabular-nums transition-all duration-500 ${boxStyle}`}>
            {String(u.value).padStart(2, '0')}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest opacity-60 mt-1.5">{u.label}</div>
        </div>
      ))}
    </div>
  );
}
