import { UploadField } from "../../../UploadField";
import Link from "next/link";
import { notFound } from "next/navigation";
import { saveVideo } from "../../../actions";
import { Field, ghost, input, Notice, Page, primary } from "../../../ui";
import { VideoSource } from "../../../VideoSource";
import { getProjects, getVideos } from "@/lib/db";
import { mediaReady } from "@/lib/media";

const ERRORS: Record<string, string> = {
  title: "The video needs a title.",
  youtube: "That does not look like a YouTube address. Paste the link from the browser or from Share.",
  file: "Choose a video file (MP4, WebM or MOV, under 190 MB).",
};

export default async function VideoForm({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> }) {
  const { id } = await params;
  const { error } = await searchParams;
  const isNew = id === "new";
  const direct = mediaReady();
  const v = isNew ? undefined : (await getVideos()).find((x) => x.id === id);
  if (!isNew && !v) notFound();
  const projects = await getProjects();

  return (
    <Page eyebrow="Films" title={isNew ? "Add a video" : "Edit video"} lead="Choose the source, then where it shows. A still picture stands in for it until a visitor presses play.">
      {error && ERRORS[error] && <Notice tone="bad">{ERRORS[error]}</Notice>}
      <form action={saveVideo} className="grid gap-5 border border-[#082b52]/15 bg-white p-6 min-[700px]:grid-cols-2 min-[700px]:p-8">
        <input type="hidden" name="id" value={v?.id ?? ""} />
        <input type="hidden" name="posterPath" value={v?.poster ?? ""} />

        <Field id="title" name="Title" className="min-[700px]:col-span-2">
          <input id="title" name="title" required defaultValue={v?.title} className={input} />
        </Field>

        <VideoSource direct={direct} kind={v?.kind ?? "youtube"} youtube={v?.kind === "youtube" ? v.src : ""} srcPath={v?.kind === "file" ? v.src : ""} />

        <Field id="posterFile" name="Still picture (optional)">
          {v?.poster && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={v.poster} alt="" className="mt-2 h-24 w-40 bg-[#e6ebf2] object-cover" />
          )}
          <UploadField id="posterFile" name="posterFile" accept="image/jpeg,image/png,image/webp" direct={direct} maxMb={8} />
          <span className="mt-1 block text-[13px] text-[#082b52]/60">Shown until the video is played. For YouTube, leave it empty to use YouTube&apos;s own picture. For a file, add one, or it shows a plain navy panel.</span>
        </Field>
        <Field id="description" name="Short description (optional)">
          <textarea id="description" name="description" rows={3} defaultValue={v?.description} className={input} />
        </Field>

        <Field id="projectId" name="Show on a project's page" className="min-[700px]:col-span-2">
          <select id="projectId" name="projectId" defaultValue={v?.projectId ?? ""} className={input}>
            <option value="">No project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} – {p.city}
              </option>
            ))}
          </select>
        </Field>
        <label className="flex min-h-11 cursor-pointer items-center gap-3 border border-gold/60 bg-gold/8 px-4 text-[15px] text-[#04142a] min-[700px]:col-span-2">
          <input type="checkbox" name="onHome" defaultChecked={v?.onHome} className="size-4 accent-[#b58f48]" />
          Show in the Films strip on the home page
        </label>

        <div className="flex flex-wrap gap-3 min-[700px]:col-span-2">
          <button type="submit" className={primary}>
            Save video
          </button>
          <Link href="/admin/videos" className={ghost}>
            Cancel
          </Link>
        </div>
      </form>
    </Page>
  );
}
