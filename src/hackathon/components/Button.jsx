import { Link } from 'react-router-dom';

/**
 * Button
 * Base button. Prefer PrimaryButton/SecondaryButton for standard CTAs —
 * this base exists so both can share sizing/focus-ring logic.
 */
export default function Button({ children, to, href, onClick, type = 'button', variant = 'primary', size = 'md', className = '', ...rest }) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  const variants = {
    primary: 'bg-signal-violet text-white hover:shadow-glow',
    secondary: 'bg-transparent border border-base-line text-text hover:border-signal-cyan hover:text-signal-cyan',
    ghost: 'bg-transparent text-text-muted hover:text-text'
  };

  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-display font-medium tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-cyan disabled:opacity-40 disabled:pointer-events-none ${sizes[size]} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
}
