import React from "react";
import LogoIcon from "../assets/logo_icon.png";
import { useTheme } from "../context/ThemeContext";

export default function TuringWingsLogo({ size = "md", showText = true, forceWhiteText = false, className = "" }) {
  const { theme } = useTheme();
  const isLight = theme === "light";

  // Keep icon image prominent
  const iconDimensions = {
    sm: "h-9 sm:h-10 w-auto",
    md: "h-11 sm:h-13 w-auto",
    lg: "h-16 sm:h-18 w-auto"
  }[size] || "h-11 sm:h-13 w-auto";

  // Refined proportional text size (less dominating)
  const textSize = {
    sm: "text-sm sm:text-base",
    md: "text-base sm:text-lg font-extrabold",
    lg: "text-xl sm:text-2xl font-extrabold"
  }[size] || "text-base sm:text-lg font-extrabold";

  const subtitleSize = {
    sm: "text-[8px] sm:text-[9px]",
    md: "text-[9px] sm:text-[10px]",
    lg: "text-[11px] sm:text-[12px]"
  }[size] || "text-[9px] sm:text-[10px]";

  const textThemeColor = forceWhiteText || !isLight ? "text-white" : "text-slate-900";
  const subtitleThemeColor = forceWhiteText || !isLight ? "text-amber-200/80" : "text-slate-500";

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 select-none ${className}`}>
      <img
        src={LogoIcon}
        alt="Turing Wings Icon"
        className={`${iconDimensions} object-contain filter drop-shadow-md shrink-0`}
      />
      {showText && (
        <div className="flex flex-col text-left justify-center">
          <div className={`tracking-wide ${textSize} leading-none ${textThemeColor}`}>
            <span>TURING </span>
            <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              WINGS
            </span>
          </div>
          <span className={`font-semibold uppercase tracking-widest ${subtitleSize} mt-0.5 ${subtitleThemeColor}`}>
            Learn. Build. Innovate.
          </span>
        </div>
      )}
    </div>
  );
}
