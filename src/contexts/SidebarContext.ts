"use client";

import { createContext } from "react";

interface SidebarContext {
  isOpen: boolean;
  handleOpen: () => void;
}

export const SidebarContext = createContext<SidebarContext | undefined>(
  undefined,
);
