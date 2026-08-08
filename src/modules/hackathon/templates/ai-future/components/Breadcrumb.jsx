import { Link, useLocation } from 'react-router-dom';

/** Auto-derives breadcrumb trail from the current route path. */
export default function Breadcrumb() {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="text-xs text-text-faint mb-6">
      <Link to="/" className="hover:text-text-muted">Home</Link>
      {parts.map((part, i) => {
        const path = '/' + parts.slice(0, i + 1).join('/');
        return (
          <span key={path}>
            <span className="mx-2">/</span>
            <Link to={path} className="hover:text-text-muted capitalize">{part.replace(/-/g, ' ')}</Link>
          </span>
        );
      })}
    </nav>
  );
}
