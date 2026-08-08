/** Inline label chip — lighter weight than Badge, for filter/category tags. */
export default function Tag({ children, className = '' }) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded-md bg-base-card border border-base-line text-xs text-text-muted ${className}`}>
      {children}
    </span>
  );
}
