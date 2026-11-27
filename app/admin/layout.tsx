import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { adminAvailable } from "@/lib/admin-auth";
import { OG_IMAGE, SITE_NAME } from "@/lib/site";

/** The admin's own share picture: the sign-in screen (public/og-admin.jpg). */
const ADMIN_IMAGE = { ...OG_IMAGE, url: "/og-admin.jpg", alt: "The PDBS admin sign-in screen" };

const TITLE = "Admin — Proactive Design and Building Systems";
const DESCRIPTION = "Staff sign-in for the PDBS website dashboard.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: { canonical: "/admin" },
  // the home page's share card must not be inherited here; the sign-in screen is the picture
  openGraph: { type: "website", siteName: SITE_NAME, url: "/admin", title: TITLE, description: DESCRIPTION, images: [ADMIN_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [ADMIN_IMAGE.url] },
};

/** The dashboard exists only where it can save (the developer's machine, or the host once the data store is connected); anywhere else the address does not exist. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!adminAvailable()) notFound();
  return <div className="min-h-screen bg-[#f3f6fa] font-sans text-[#082b52]">{children}</div>;
}
