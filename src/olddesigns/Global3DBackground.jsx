import React from "react";

export default function Global3DBackground() {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1] bg-[#FFFFFF]"
      style={{ zIndex: -1 }}
    >
      {/* Pure White Clean Ambient Background */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(248,249,251,0.9),rgba(255,255,255,1))]" />
    </div>
  );
}
