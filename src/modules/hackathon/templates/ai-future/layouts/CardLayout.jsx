/**
 * CardLayout
 * variant: 'grid' | 'masonry' | 'carousel'
 * Arranges an array of already-rendered card elements.
 */
export default function CardLayout({ variant = 'grid', items = [], columns = 3 }) {
  const colClass = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4' }[columns] || 'md:grid-cols-3';

  if (variant === 'carousel') {
    return (
      <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
        {items.map((item, i) => (
          <div key={i} className="min-w-[240px] snap-start">{item}</div>
        ))}
      </div>
    );
  }

  if (variant === 'masonry') {
    return (
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 [&>*]:mb-6 [&>*]:break-inside-avoid">
        {items.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    );
  }

  // grid (default)
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${colClass} gap-6`}>
      {items.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
    </div>
  );
}
