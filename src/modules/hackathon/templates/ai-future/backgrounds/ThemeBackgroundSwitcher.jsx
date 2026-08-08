import React from "react";
import { useTheme } from "../hooks/useTheme";
import GreenSpaceBackground from "./GreenSpaceBackground";
import SpaceBackground from "./SpaceBackground";
import CorporateBackground from "./CorporateBackground";
import Spatial3dBackground from "./Spatial3dBackground";
import MinimalBackground from "./MinimalBackground";
import AiFutureBackground from "./AiFutureBackground";

export default function ThemeBackgroundSwitcher() {
  const theme = useTheme();

  switch (theme?.mode) {
    case "greenspace":
    case "cyberpunk":
      return <GreenSpaceBackground />;
    case "space":
      return <SpaceBackground />;
    case "corporate":
      return <CorporateBackground />;
    case "3d":
      return <Spatial3dBackground />;
    case "minimal":
      return <MinimalBackground />;
    case "dark":
    default:
      return <AiFutureBackground />;
  }
}
