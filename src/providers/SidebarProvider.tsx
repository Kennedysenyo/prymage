"use client";

import { SidebarContext } from "@/contexts/SidebarContext";
import { ReactNode, useContext, useState } from "react";

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <SidebarContext.Provider value={{ isOpen, handleOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
