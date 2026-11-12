import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CtaBand, PageIntro, ui } from "@/components/PageIntro";
import { ProjectsPortfolio } from "@/components/ProjectsPortfolio";
import { PROJECTS, PROJECTS_PAGE } from "@/lib/pages";

export const metadata: Metadata = {
  title: "Projects — PROACTIVE Design and Building Systems",
  description: "A selection of design-build projects across Maryland, DC and Virginia.",
};

export default function ProjectsPage() {
  const p = PROJECTS_PAGE;
  return (
    <>
      <Header />
      <main id="main-content" data-motion className="offerings-vars relative bg-white text-[#143275]">
        <PageIntro crumb="Projects" title={p.title} lead={p.lead} image={p.image} imageAlt={p.imageAlt} />
        <section aria-label="Project portfolio" className={`${ui.pad} py-12 min-[768px]:py-20`}>
          <div className={ui.wrap}>
            <ProjectsPortfolio projects={PROJECTS} />
          </div>
        </section>
        <CtaBand heading="Have a project in mind?" label="Start a conversation" href="/contact" />
      </main>
      <Footer />
    </>
  );
}
