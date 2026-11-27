import Link from "next/link";
import { deleteVideo } from "../../actions";
import { Icons } from "../../icons";
import { Notice, Page, primary } from "../../ui";
import { getProjects, getVideos } from "@/lib/db";
import { videoPoster } from "@/lib/video";

export default async function VideosAdmin({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  const { saved, deleted } = await searchParams;
  const videos = await getVideos();
  const projects = await getProjects();
  return (
    <Page
      eyebrow="Films"
      title="Videos"
      lead="Upload a video or paste a YouTube link. On the site each one is only a still picture until a visitor presses play, then it plays right there, so videos add nothing to how fast a page loads."
      action={
        <Link href="/admin/videos/new" className={primary}>
          {Icons.plus}
          <span>Add a video</span>
        </Link>
      }
    >
      {saved && <Notice>Saved.</Notice>}
      {deleted && <Notice>Video deleted.</Notice>}
      <ul className="grid gap-5 min-[640px]:grid-cols-2 min-[1200px]:grid-cols-3">
        {videos.map((v) => {
          const poster = videoPoster(v);
          const project = projects.find((p) => p.id === v.projectId);
          return (
            <li key={v.id} className="overflow-hidden border border-[#082b52]/12 bg-white/85 shadow-[0_22px_38px_-30px_rgba(4,20,42,.6)] backdrop-blur">
              <div className="relative aspect-video bg-[#04142a]">
                {poster ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={poster} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
                ) : (
                  <span className="absolute inset-0 grid place-items-center text-[13px] text-white/50">No still picture</span>
                )}
                <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
                  <span className="grid size-12 place-items-center rounded-full border border-white/70 bg-[#04142a]/55 text-white">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
                <span className="absolute top-3 left-3 bg-[#04142a]/85 px-2.5 py-1 text-[11px] font-semibold tracking-[.12em] text-white uppercase">{v.kind === "youtube" ? "YouTube" : "File"}</span>
              </div>
              <div className="p-4">
                <p className="text-[17px] font-medium text-[#04142a]">{v.title}</p>
                <p className="mt-1.5 flex flex-wrap gap-2 text-[11px] font-semibold tracking-[.1em] uppercase">
                  {project && <span className="border border-[#082b52]/30 px-2 py-0.5 text-[#082b52]">On: {project.title}</span>}
                  {v.onHome && <span className="border border-gold px-2 py-0.5 text-gold">On home page</span>}
                  {!project && !v.onHome && <span className="text-[#082b52]/50">Not shown anywhere yet</span>}
                </p>
                <div className="mt-4 flex gap-2">
                  <Link href={`/admin/videos/${v.id}`} className="flex min-h-9 items-center gap-1.5 border border-[#082b52]/30 bg-white/70 px-3.5 text-[.75rem] font-medium tracking-[.08em] text-[#082b52] uppercase no-underline hover:border-[#04142a] hover:bg-[#04142a] hover:text-white">
                    {Icons.edit}
                    Edit
                  </Link>
                  <form action={deleteVideo}>
                    <input type="hidden" name="id" value={v.id} />
                    <button type="submit" className="flex min-h-9 cursor-pointer items-center gap-1.5 border border-[#a33a3a]/40 bg-white/70 px-3.5 text-[.75rem] font-medium tracking-[.08em] text-[#a33a3a] uppercase hover:bg-[#a33a3a] hover:text-white">
                      {Icons.trash}
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {videos.length === 0 && (
        <div className="grid place-items-center border border-dashed border-[#082b52]/25 bg-white/70 px-6 py-20 text-center backdrop-blur">
          <span className="grid size-14 place-items-center bg-[#04142a] text-gold">{Icons.videos}</span>
          <p className="mt-5 font-jost text-[24px] text-[#04142a]">No videos yet</p>
          <p className="mt-2 max-w-[48ch] text-[15px] leading-[1.6] text-[#082b52]/70">Add a YouTube link or upload a short clip, then choose where it shows: on a project&apos;s page, in the Films strip on the home page, or both.</p>
        </div>
      )}
    </Page>
  );
}
