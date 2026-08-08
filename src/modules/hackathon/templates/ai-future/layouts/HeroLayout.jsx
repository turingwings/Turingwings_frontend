/**
 * HeroLayout
 * variant: 'centered' | 'split' | 'fullscreen' | 'imageRight' | 'imageLeft'
 * Wraps hero content, background, and (optionally) a media slot into
 * the chosen arrangement. Sections pass `layout` from config/layout.js.
 */
export default function HeroLayout({ variant = 'split', background, content, media }) {
  if (variant === 'centered') {
    return (
      <div className="relative min-h-[70vh] flex items-center justify-center text-center px-6">
        {background}
        <div className="relative z-10 max-w-3xl mx-auto">{content}</div>
      </div>
    );
  }

  if (variant === 'fullscreen') {
    return (
      <div className="relative min-h-screen flex items-center px-6">
        {background}
        <div className="relative z-10 max-w-3xl">{content}</div>
      </div>
    );
  }

  if (variant === 'imageLeft') {
    return (
      <div className="relative grid md:grid-cols-2 gap-10 items-center min-h-[65vh] px-6 max-w-[1280px] mx-auto">
        {background}
        <div className="relative z-10 order-2 md:order-1">{media}</div>
        <div className="relative z-10 order-1 md:order-2">{content}</div>
      </div>
    );
  }

  // 'split' and 'imageRight' share the same left-text / right-media shape
  return (
    <div className="relative grid md:grid-cols-2 gap-10 items-center min-h-[65vh] px-6 max-w-[1280px] mx-auto">
      {background}
      <div className="relative z-10">{content}</div>
      <div className="relative z-10">{media}</div>
    </div>
  );
}
