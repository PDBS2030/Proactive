import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutCta } from "@/components/AboutCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectHero } from "@/components/ProjectHero";
import { PROJECTS, projectPhotos, projectSlug } from "@/lib/pages";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: projectSlug(p) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => projectSlug(x) === slug);
  if (!p) return {};
  return {
    title: `${p.title} — Proactive Design and Building Systems`,
    description: `${p.sector} project in ${p.city}, ${p.region}. ${p.scope}.`,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => projectSlug(x) === slug);
  if (!p) notFound();

  return (
    <>
      <Header />
      <main id="main-content" className="offerings-vars relative bg-white text-[#082b52]">
        <ProjectHero project={p} />

        <ProjectGallery title={p.title} photos={projectPhotos(p)} />

        <AboutCta heading="Have a project like this in mind?" />
      </main>
      <Footer />
    </>
  );
}
