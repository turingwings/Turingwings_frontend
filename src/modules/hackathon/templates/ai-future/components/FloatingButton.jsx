/** Fixed-position quick action, e.g. "Register now" that follows scroll on mobile. */
export default function FloatingButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-40 rounded-full bg-signal-violet text-white px-5 py-3 shadow-glow font-display text-sm font-medium ${className}`}
    >
      {children}
    </button>
  );
}
