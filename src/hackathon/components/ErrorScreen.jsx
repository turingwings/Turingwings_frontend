import PrimaryButton from './PrimaryButton';

/** Shown when event data fails to load. Voice: explain what happened, offer a way forward. */
export default function ErrorScreen({ message = "This page couldn't load its event data.", onRetry }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4 px-6">
      <Badge />
      <h2 className="font-display text-2xl font-bold">Something went wrong</h2>
      <p className="text-text-muted max-w-md">{message}</p>
      {onRetry && <PrimaryButton onClick={onRetry}>Try again</PrimaryButton>}
    </div>
  );
}
function Badge() {
  return <span className="font-mono text-signal-rose text-xs uppercase tracking-widest">Error</span>;
}
