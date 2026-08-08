import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

export default function Button({ children, to, href, onClick, type = 'button', variant = 'primary', size = 'md', className = '', ...rest }) {
  const theme = useTheme();

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-3.5 text-sm md:text-base'
  };

  // Dynamic template primary styles
  const primaryStyle =
    theme.mode === "greenspace" || theme.mode === "cyberpunk"
      ? "bg-[#22C55E] text-black font-extrabold uppercase tracking-widest shadow-[0_0_25px_rgba(34,197,94,0.6)] hover:bg-[#4ADE80] hover:scale-105"
      : theme.mode === "space"
      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold tracking-wider shadow-lg shadow-indigo-500/30 hover:scale-105"
      : theme.mode === "corporate"
      ? "bg-[#2563EB] hover:bg-blue-600 text-white font-bold uppercase tracking-wider shadow-md"
      : theme.mode === "3d"
      ? "bg-[#10B981] text-black font-extrabold uppercase tracking-widest shadow-lg shadow-[#10B981]/30 hover:scale-105"
      : theme.mode === "minimal"
      ? "bg-[#090909] text-white hover:bg-[#22C55E] hover:text-black font-bold uppercase tracking-wider shadow-md"
      : "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold uppercase tracking-wider shadow-md shadow-amber-500/20 hover:scale-105";

  // Dynamic template secondary styles
  const secondaryStyle =
    theme.mode === "greenspace" || theme.mode === "cyberpunk"
      ? "bg-black/40 border border-[#22C55E]/60 text-[#4ADE80] font-bold uppercase backdrop-blur-md hover:bg-[#22C55E]/20 hover:text-white"
      : theme.mode === "space"
      ? "bg-transparent border border-indigo-400/40 text-indigo-300 font-bold hover:bg-indigo-500/20"
      : theme.mode === "corporate"
      ? "bg-transparent border border-slate-600 text-slate-200 font-bold hover:bg-slate-800"
      : theme.mode === "3d"
      ? "bg-transparent border border-[#F59E0B]/50 text-[#F59E0B] font-bold hover:bg-[#F59E0B]/20"
      : theme.mode === "minimal"
      ? "bg-white border border-black/20 text-[#111] font-bold hover:border-[#22C55E] hover:text-[#22C55E]"
      : "bg-transparent border border-slate-700 text-slate-200 font-bold hover:border-amber-500/60 hover:text-amber-400";

  const variants = {
    primary: primaryStyle,
    secondary: secondaryStyle,
    ghost: 'bg-transparent text-slate-400 hover:text-white'
  };

  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-mono font-bold tracking-wide transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none ${sizes[size]} ${variants[variant]} ${className}`;

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
