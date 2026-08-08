import React from "react";
import { Link } from "react-router-dom";

// Exact Overlapping Angled 3D Metallic Gold Button matching reference design screenshot
export default function LayeredMetallicGoldButton({ text, onClick, to, href, size = "md", type = "button", disabled = false, className = "", children }) {
  const sizeClasses = {
    sm: "px-3.5 py-1 text-[11px] font-extrabold min-w-[75px]",
    md: "px-5 py-2 text-xs font-extrabold min-w-[125px]",
    lg: "px-8 py-3 text-lg font-extrabold min-w-[190px]"
  }[size] || "px-5 py-2 text-xs font-extrabold";

  const content = (
    <div className={`relative inline-block group cursor-pointer select-none my-1.5 ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}>
      {/* Back Angled Frame 1 (-4deg rotated metallic gold border frame) */}
      <div className="absolute inset-0 rounded-sm border-[2.5px] border-[#e2b740] bg-[#12141c] transform -rotate-[3.5deg] scale-[1.04] group-hover:-rotate-[4.5deg] group-hover:scale-[1.06] transition-transform duration-300 pointer-events-none shadow-lg shadow-amber-500/20" />

      {/* Back Angled Frame 2 (+4deg rotated metallic gold border frame) */}
      <div className="absolute inset-0 rounded-sm border-[2.5px] border-[#f5cb5c] bg-[#0d0e14] transform rotate-[3.5deg] scale-[1.04] group-hover:rotate-[4.5deg] group-hover:scale-[1.06] transition-transform duration-300 pointer-events-none shadow-lg shadow-amber-500/20" />

      {/* Main Front Rectangular Box with Deep Metallic Background & Crisp Gold Edge */}
      <div className={`relative rounded-sm border-[2.5px] border-[#e2b740] bg-gradient-to-b from-[#1c1e2b] via-[#10121b] to-[#07080d] shadow-2xl shadow-amber-500/35 flex items-center justify-center text-center tracking-wider transition-all group-hover:scale-[1.02] ${sizeClasses}`}>
        {children ? (
          children
        ) : (
          <span className="bg-gradient-to-b from-[#ffffff] via-[#f7d774] to-[#e2b740] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-serif italic">
            {text}
          </span>
        )}
      </div>
    </div>
  );

  if (to) return <Link to={to}>{content}</Link>;
  if (href) return <a href={href}>{content}</a>;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="bg-transparent border-0 p-0 focus:outline-none">
      {content}
    </button>
  );
}
