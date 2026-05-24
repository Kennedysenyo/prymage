"use client";

import { motion } from "motion/react";

import { SessionType } from "@/types/global";
import { SidebarContent } from "./SidebarContent";
import { useSidarState } from "@/hooks/useSidebarState";

interface Props {
  session: SessionType;
}

export function Sidebar({ session }: Props) {
  const { isOpen, handleOpen: onClose } = useSidarState();
  return (
    <>
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-40">
        <SidebarContent session={session} />
      </aside>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-screen w-64 z-50 lg:hidden"
          >
            <SidebarContent session={session} />
          </motion.aside>
        </>
      )}
    </>
  );
}
