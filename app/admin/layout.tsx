import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { adminAvailable } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: { absolute: "Admin — Proactive Design and Building Systems" },
  robots: { index: false, follow: false },
};

/** The dashboard exists only where it can save (the developer's machine, or the host once the data store is connected); anywhere else the address does not exist. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!adminAvailable()) notFound();
  return <div className="min-h-screen bg-[#f3f6fa] font-sans text-[#082b52]">{children}</div>;
}
