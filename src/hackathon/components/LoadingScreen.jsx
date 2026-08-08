/** Full-page loading state while event data hydrates. */
export default function LoadingScreen({ label = 'Loading event…' }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-base-line border-t-signal-violet animate-spin" />
      <p className="text-text-muted text-sm font-mono">{label}</p>
    </div>
  );
}
