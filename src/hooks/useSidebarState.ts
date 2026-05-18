"use client";

import { SidebarContext } from "@/contexts/SidebarContext";
import { useContext } from "react";

export const useSidarState = () => {
  const sidebarState = useContext(SidebarContext);
  if (!sidebarState) {
    throw new Error("SidebarContext must be used in SidebarProvider");
  }

  return sidebarState;
};
