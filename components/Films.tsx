import { VideoPlayer } from "@/components/VideoPlayer";
import { getHomeVideos } from "@/lib/db";

/**
 * Films: the videos chosen for the home page in the dashboard. With none chosen the section is not there at all, so it adds
 * nothing to the page. Each one is a still picture until it is pressed, then plays in place (see VideoPlayer).
 */
export async function Films() {
  const videos = await getHomeVideos();
  if (videos.length === 0) return null;
  const [lead, ...rest] = videos;
  return (
    <section aria-labelledby="films-title" className="offerings-vars relative z-4 bg-white px-4 py-16 text-[#082b52] min-[768px]:px-[124px] min-[768px]:py-[110px]">
      <div className="mx-auto w-full max-w-[1680px]">
        <h2 id="films-title" className="font-jost text-(length:--h2) leading-(--h2-lh) font-normal tracking-normal uppercase [text-wrap:initial] text-[#082b52]">
          Films
        </h2>
        <div className="mt-8 grid gap-4 min-[640px]:grid-cols-2 min-[768px]:mt-12 min-[768px]:gap-6">
          <div className="min-[640px]:col-span-2">
            <VideoPlayer video={lead} className="min-[640px]:aspect-[2.2/1]" />
            {lead.description && <p className="mt-3 max-w-[70ch] font-mulish text-[17px] leading-[1.6] text-[#082b52]/80">{lead.description}</p>}
          </div>
          {rest.map((v) => (
            <div key={v.id}>
              <VideoPlayer video={v} />
              {v.description && <p className="mt-3 font-mulish text-[16px] leading-[1.6] text-[#082b52]/80">{v.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
