import React from "react";
import AIFutureTemplate from "../templates/ai-future/TemplateLayout.jsx";

export default function TemplateRenderer({ event, activeTab, onRegister }) {
  if (!event) {
    return (
      <div className="py-20 text-center text-slate-400 font-mono">
        Event data unavailable.
      </div>
    );
  }

  // Render Template based on event.templateId
  switch (event.templateId) {
    case "ai-future":
    case "cyberpunk":
    case "space":
    case "corporate":
    case "premium-3d":
    default:
      return <AIFutureTemplate event={event} activeTab={activeTab} onRegister={onRegister} />;
  }
}
