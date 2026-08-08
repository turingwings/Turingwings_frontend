import { useState } from 'react';

/** Dismissible top strip for urgent info ("Registrations close in 3 days"). */
export default function AnnouncementBar({ message, ctaLabel, ctaHref }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed || !message) return null;

  return (
    <div className="bg-signal-violet text-white text-sm px-4 py-2 flex items-center justify-center gap-4">
      <span>{message}</span>
      {ctaLabel && ctaHref && (
        <a href={ctaHref} className="underline font-medium">{ctaLabel}</a>
      )}
      <button onClick={() => setDismissed(true)} aria-label="Dismiss announcement" className="ml-2 opacity-80 hover:opacity-100">
        ✕
      </button>
    </div>
  );
}
