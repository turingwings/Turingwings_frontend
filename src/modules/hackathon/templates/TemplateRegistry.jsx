import React from "react";
import AiFutureLayout from "./ai-future/TemplateLayout";

// Custom theme color & visual variant overrides for each template option
const TEMPLATE_VARIANTS = {
  "ai-future": {
    colors: {
      base: "#0B0E14",
      baseRaised: "#11151F",
      card: "#161B27",
      line: "#232939",
      text: "#F4F5F7",
      textMuted: "#9AA3B2",
      primary: "#22C55E",
      accent: "#EAB308",
    },
    mode: "dark",
  },
  "greenspace": {
    colors: {
      base: "#050B07",
      baseRaised: "#0B150F",
      card: "#0B150F",
      line: "#22C55E",
      text: "#FFFFFF",
      textMuted: "#4ADE80",
      primary: "#22C55E",
      accent: "#A3E635",
    },
    mode: "greenspace",
  },
  "cyberpunk": {
    colors: {
      base: "#050B07",
      baseRaised: "#0B150F",
      card: "#0B150F",
      line: "#22C55E",
      text: "#FFFFFF",
      textMuted: "#4ADE80",
      primary: "#22C55E",
      accent: "#A3E635",
    },
    mode: "greenspace",
  },
  "space": {
    colors: {
      base: "#030712",
      baseRaised: "#0B0F19",
      card: "#111827",
      line: "#6366F1",
      text: "#F3F4F6",
      textMuted: "#A5B4FC",
      primary: "#6366F1",
      accent: "#8B5CF6",
    },
    mode: "space",
  },
  "corporate": {
    colors: {
      base: "#0F172A",
      baseRaised: "#1E293B",
      card: "#1E293B",
      line: "#334155",
      text: "#F8FAFC",
      textMuted: "#94A3B8",
      primary: "#2563EB",
      accent: "#1E40AF",
    },
    mode: "corporate",
  },
  "premium-3d": {
    colors: {
      base: "#0A0A0A",
      baseRaised: "#121212",
      card: "#171717",
      line: "#10B981",
      text: "#FAFAFA",
      textMuted: "#6EE7B7",
      primary: "#10B981",
      accent: "#F59E0B",
    },
    mode: "3d",
  },
  "minimal": {
    colors: {
      base: "#FAFAFA",
      baseRaised: "#FFFFFF",
      card: "#FFFFFF",
      line: "#E5E7EB",
      text: "#090909",
      textMuted: "#4B5563",
      primary: "#090909",
      accent: "#22C55E",
    },
    mode: "minimal",
  },
};

export default function TemplateRegistry({ templateId = "ai-future", eventData, onRegister }) {
  const activeTemplateId = eventData?.templateId || templateId || "ai-future";
  const variantOverrides = TEMPLATE_VARIANTS[activeTemplateId] || TEMPLATE_VARIANTS["greenspace"];

  return (
    <AiFutureLayout
      eventData={eventData}
      themeOverrides={variantOverrides}
      onRegister={onRegister}
    />
  );
}
