"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { Trash2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { capitalizeWord } from "@/lib/utils";

type Props = {
  resource: string;
  id: string;
  deleteServerAction: (id: string) => Promise<string | null>;
};

export function DeleteButton({ resource, id, deleteServerAction }: Props) {
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    let res: string | null = null;
    startTransition(async () => {
      res = await deleteServerAction(id);

      if (res) {
        toast.error("Delete Failed!");
      } else {
        toast.success("Deleted Successfully!");
      }
      setOpen(false);
    });
  };

  return (
    <>
      {/* DROPDOWN ITEM */}

      <button
        onClick={(e) => {
          // e.preventDefault();

          setOpen(true);
        }}
        className="
        w-full rounded-lg 
          flex items-center gap-3 px-4 py-2
          text-red-600 hover:bg-red-50
          cursor-pointer outline-none justify-center lg:justify-start
        "
      >
        <Trash2 size={16} className="hidden lg:inline-block" />
        {`Delete ${capitalizeWord(resource)}`}
      </button>

      {/* DIALOG */}

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && (
            <Dialog.Portal forceMount>
              {/* OVERLAY */}

              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="
                    fixed inset-0 z-50
                    bg-black/50 backdrop-blur-sm
                  "
                />
              </Dialog.Overlay>

              {/* CONTENT */}

              <Dialog.Content asChild>
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="
                    fixed left-1/2 top-1/2 z-50
                    w-[90%] max-w-md
                    -translate-x-1/2 -translate-y-1/2
                    rounded-2xl bg-white p-6 shadow-2xl
                  "
                >
                  <Dialog.Title className="text-xl text-gray-600 font-semibold">
                    {` Delete ${capitalizeWord(resource)}`}
                  </Dialog.Title>

                  <Dialog.Description
                    className="
                      mt-2 text-sm text-gray-600
                    "
                  >
                    {`Are you sure you want to delete this ${resource}? This action
                    cannot be undone.`}
                  </Dialog.Description>

                  <div className="mt-6 flex justify-end gap-3">
                    {/* CANCEL */}

                    <button
                      onClick={() => setOpen(false)}
                      disabled={isPending}
                      className="
                        rounded-xl border text-gray-600 px-4 py-2
                        text-sm font-medium
                        hover:bg-gray-100
                      "
                    >
                      Cancel
                    </button>

                    {/* DELETE */}

                    <button
                      onClick={handleDelete}
                      disabled={isPending}
                      className="
                        flex items-center gap-2
                        rounded-xl bg-red-600
                        px-4 py-2 text-sm
                        font-medium text-white
                        hover:bg-red-700
                        disabled:opacity-50
                      "
                    >
                      {isPending && (
                        <Loader2 size={16} className="animate-spin" />
                      )}

                      {isPending ? "Deleting..." : "Yes, Delete"}
                    </button>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
}
