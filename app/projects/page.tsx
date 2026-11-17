import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectsPortfolio } from "@/components/ProjectsPortfolio";
import { PROJECTS } from "@/lib/pages";

export const metadata: Metadata = {
  title: "All Projects — Proactive Design and Building Systems",
  description: "A selection of design-build projects across Maryland, DC and Virginia.",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="relative bg-white pt-[104px] text-[#082b52]">
        <ProjectsPortfolio projects={PROJECTS} />
      </main>
      <Footer />
    </>
  );
}
