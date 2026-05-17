import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export default function PublicLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
