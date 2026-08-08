/**
 * TimelineLayout
 * variant: 'vertical' | 'horizontal' | 'alternating'
 * Arranges an array of already-rendered TimelineCard elements.
 */
export default function TimelineLayout({ variant = 'alternating', items = [] }) {
  if (variant === 'horizontal') {
    return (
      <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
        {items.map((item, i) => (
          <div key={i} className="min-w-[260px] snap-start">{item}</div>
        ))}
      </div>
    );
  }

  if (variant === 'alternating') {
    return (
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-base-line hidden md:block" />
        <div className="space-y-8">
          {items.map((item, i) => (
            <div key={i} className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8 md:ml-auto'}`}>{item}</div>
          ))}
        </div>
      </div>
    );
  }

  // vertical (default)
  return (
    <div className="space-y-6 border-l border-base-line pl-6">
      {items.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
    </div>
  );
}
