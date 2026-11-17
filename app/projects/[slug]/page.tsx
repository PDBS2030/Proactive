import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AboutCta } from "@/components/AboutCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectHero } from "@/components/ProjectHero";
import { PROJECTS, projectPlace, projectSlug } from "@/lib/pages";

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

  const facts = [
    { label: "Location", value: projectPlace(p) },
    { label: "Project type", value: p.sector },
    { label: "Expertise", value: p.service },
    { label: "Size", value: p.size },
    { label: "Completed", value: String(p.year) },
  ];
  const related = [...PROJECTS.filter((x) => x.sector === p.sector && x.id !== p.id), ...PROJECTS.filter((x) => x.sector !== p.sector)].slice(0, 4);

  return (
    <>
      <Header />
      <main id="main-content" className="relative bg-white text-[#082b52]">
        <ProjectHero project={p} />

        {/* the facts of the project in one ruled row */}
        <section aria-label="Project facts" className="border-b border-[#c7c8ca] px-4 min-[768px]:px-[124px]">
          <dl className="mx-auto grid w-full max-w-[1680px] gap-x-8 gap-y-6 py-10 min-[560px]:grid-cols-2 min-[992px]:grid-cols-5">
            {facts.map((f) => (
              <div key={f.label} className="border-t-2 border-gold pt-4">
                <dt className="text-[13px] font-semibold tracking-[.14em] text-[#082b52]/60 uppercase">{f.label}</dt>
                <dd className="mt-2 font-bodoni text-[22px] leading-[1.2]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="more-projects" className="px-4 py-[90px] min-[768px]:px-[124px] min-[768px]:py-[120px]">
          <div className="mx-auto w-full max-w-[1680px]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="more-projects" className="font-bodoni text-[32px] leading-[1.1] min-[768px]:text-[44px]">
                More projects
              </h2>
              <Link href="/projects" className="text-[16px] text-[#082b52] underline decoration-gold decoration-2 underline-offset-[6px] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2356e5]">
                See all projects
              </Link>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-6 min-[520px]:grid-cols-2 min-[1100px]:grid-cols-4">
              {related.map((r) => (
                <li key={r.id}>
                  <Link href={`/projects/${projectSlug(r)}`} className="group relative block overflow-hidden border border-[#c7c8ca] no-underline outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2356e5]">
                    <div className="relative aspect-[3/4] bg-[#e6e6e6]">
                      <Image src={r.image} alt="" fill sizes="(max-width: 520px) 100vw, (max-width: 1100px) 50vw, 25vw" className="object-cover" />
                    </div>
                    <div className="absolute inset-x-px bottom-0 border-b border-[#c7c8ca] bg-white/95 p-4 transition-colors duration-200 group-hover:bg-white/75">
                      <span aria-hidden="true" className="absolute top-0 left-0 -mt-1 block h-1 w-full bg-gold opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                      <span className="block font-bodoni text-[20px] leading-[30px] text-[#082b52]">{r.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <AboutCta heading="Have a project like this in mind?" />
      </main>
      <Footer />
    </>
  );
}
