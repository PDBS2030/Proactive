import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { adminAvailable } from "@/lib/admin-auth";
import { OG_IMAGE, SITE_NAME } from "@/lib/site";

const TITLE = "Admin — Proactive Design and Building Systems";
const DESCRIPTION = "Staff sign-in for the PDBS website dashboard.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin" },
  // the home page's share card must not be inherited here
  openGraph: { type: "website", siteName: SITE_NAME, url: "/admin", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE.url] },
};

/** The dashboard exists only where it can save (the developer's machine, or the host once the data store is connected); anywhere else the address does not exist. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!adminAvailable()) notFound();
  return <div className="min-h-screen bg-[#f3f6fa] font-sans text-[#082b52]">{children}</div>;
}
