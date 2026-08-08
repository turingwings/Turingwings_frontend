/**
 * SectionLayout
 * variant: 'twoColumn' | 'threeColumn' | 'fullWidth' | 'container'
 * The outer wrapper every <section> in src/sections should use for
 * consistent max-width/padding, matching config/layout.js.
 */
export default function SectionLayout({ variant = 'container', children, className = '', id }) {
  if (variant === 'fullWidth') {
    return <section id={id} className={`w-full py-20 ${className}`}>{children}</section>;
  }

  if (variant === 'twoColumn') {
    return (
      <section id={id} className={`max-w-[1280px] mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 ${className}`}>
        {children}
      </section>
    );
  }

  if (variant === 'threeColumn') {
    return (
      <section id={id} className={`max-w-[1280px] mx-auto px-6 py-20 grid md:grid-cols-3 gap-8 ${className}`}>
        {children}
      </section>
    );
  }

  // container (default)
  return (
    <section id={id} className={`max-w-[1280px] mx-auto px-6 py-20 ${className}`}>
      {children}
    </section>
  );
}
