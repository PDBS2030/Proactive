/** A video the site can play: a YouTube link, or a file uploaded in the dashboard. */
export type Video = {
  id: string;
  title: string;
  kind: "youtube" | "file";
  /** the YouTube video id, or the address of the uploaded file */
  src: string;
  /** a still shown until the visitor presses play; for YouTube it falls back to YouTube's own thumbnail */
  poster: string;
  description: string;
  /** shown on this project's page when set */
  projectId: string;
  /** shown in the Films strip on the home page */
  onHome: boolean;
};

/** The id from any of the ways a YouTube address is written; empty when it is not one. */
export function youtubeId(input: string): string {
  const text = input.trim();
  if (/^[\w-]{11}$/.test(text)) return text;
  try {
    const url = new URL(text.startsWith("http") ? text : `https://${text}`);
    const host = url.hostname.replace(/^www\.|^m\./, "");
    let id = "";
    if (host === "youtu.be") id = url.pathname.split("/")[1] ?? "";
    else if (host === "youtube.com" || host === "youtube-nocookie.com") {
      if (url.pathname === "/watch") id = url.searchParams.get("v") ?? "";
      else {
        const [, kind, rest] = url.pathname.split("/");
        if (["embed", "shorts", "live", "v"].includes(kind)) id = rest ?? "";
      }
    }
    return /^[\w-]{11}$/.test(id) ? id : "";
  } catch {
    return "";
  }
}

/** The still for a video: the one uploaded, or YouTube's own. */
export const videoPoster = (v: Pick<Video, "kind" | "src" | "poster">) => v.poster || (v.kind === "youtube" ? `https://i.ytimg.com/vi/${v.src}/hqdefault.jpg` : "");
