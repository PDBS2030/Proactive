import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectsPortfolio } from "@/components/ProjectsPortfolio";
import { getProjects } from "@/lib/db";

export const metadata: Metadata = pageMeta({
  title: "Projects",
  description: "Residential, loft and industrial conversions, landmark and brownstone, and commercial projects designed and built by PDBS across Maryland and DC.",
  path: "/projects",
});

export default async function ProjectsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="offerings-vars relative bg-white pt-[104px] text-[#082b52]">
        <ProjectsPortfolio projects={await getProjects()} />
      </main>
      <Footer />
    </>
  );
}
