import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import { AboutCta } from "@/components/AboutCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectHero } from "@/components/ProjectHero";
import { VideoPlayer } from "@/components/VideoPlayer";
import { getProjectVideos, getProjects } from "@/lib/db";
import { projectPhotos, projectSlug } from "@/lib/pages";

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: projectSlug(p) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = (await getProjects()).find((x) => projectSlug(x) === slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.title}, ${p.city}`,
    description: `${p.title}: a ${p.sector.toLowerCase()} project in ${p.city}, ${p.region}. ${p.scope}. Designed and built by Proactive Design and Building Systems.`,
    path: `/projects/${slug}`,
    // resized to share-card size, so the picture is small and fast for WhatsApp, Facebook and the others
    image: `/_next/image?url=${encodeURIComponent(p.hero || p.image)}&w=1200&q=75`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = (await getProjects()).find((x) => projectSlug(x) === slug);
  if (!p) notFound();

  return (
    <>
      <Header />
      <main id="main-content" className="offerings-vars relative bg-white text-[#082b52]">
        <ProjectHero project={p} />

        {(await getProjectVideos(p.id)).length > 0 && (
          <section aria-label={`Films of ${p.title}`} className="bg-white px-4 pt-14 min-[768px]:px-[124px] min-[768px]:pt-20">
            <div className="mx-auto grid w-full max-w-[1680px] gap-[6px]">
              {(await getProjectVideos(p.id)).map((v) => (
                <VideoPlayer key={v.id} video={v} />
              ))}
            </div>
          </section>
        )}

        <ProjectGallery title={p.title} photos={projectPhotos(p)} />

        <AboutCta heading="Have a project like this in mind?" />
      </main>
      <Footer />
    </>
  );
}
