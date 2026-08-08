import { useEffect, useState } from 'react';

function getTimeLeft(target) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

/** Live countdown to a target ISO date — used in Hero and Live Event page. */
export default function CountdownTimer({ target, className = '' }) {
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

  return (
    <div className={`flex gap-4 ${className}`}>
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div className="font-mono text-2xl md:text-3xl font-semibold text-text bg-base-card border border-base-line rounded-md px-3 py-2 tabular-nums">
            {String(u.value).padStart(2, '0')}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-text-faint mt-1">{u.label}</div>
        </div>
      ))}
    </div>
  );
}
