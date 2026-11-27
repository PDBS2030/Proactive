"use client";

import { upload } from "@vercel/blob/client";
import { useEffect, useRef, useState } from "react";
import { input } from "./ui";

/**
 * A file chooser for the dashboard forms. On the host (`direct`) the file goes from the browser straight to the media
 * store and the form only carries its address, so size limits of the site's server never apply. On the developer's
 * machine it is an ordinary file input that the form sends along.
 */
export function UploadField({ id, name, accept, direct, maxMb }: { id: string; name: string; accept: string; direct: boolean; maxMb: number }) {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [percent, setPercent] = useState(0);
  const [message, setMessage] = useState("");
  const gate = useRef<HTMLInputElement>(null);

  // while a file is still travelling, the form cannot be sent
  useEffect(() => {
    gate.current?.setCustomValidity(state === "busy" ? "Wait for the upload to finish." : "");
  }, [state]);

  if (!direct) return <input id={id} name={name} type="file" accept={accept} className={`${input} !py-2`} />;

  async function choose(file: File | undefined) {
    if (!file) return;
    if (file.size > maxMb * 1024 * 1024) {
      setState("error");
      setMessage(`That file is over ${maxMb} MB.`);
      return;
    }
    setState("busy");
    setPercent(0);
    const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").slice(-60);
    try {
      const blob = await upload(`uploads/${safe}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        multipart: file.size > 20 * 1024 * 1024,
        onUploadProgress: (e) => setPercent(Math.round(e.percentage)),
      });
      setUrl(blob.url);
      setState("done");
    } catch {
      setUrl("");
      setState("error");
      setMessage("The upload did not work. Check the file type and try again.");
    }
  }

  return (
    <>
      <input id={id} type="file" accept={accept} onChange={(e) => choose(e.target.files?.[0])} className={`${input} !py-2`} />
      <input type="hidden" name={`${name}Url`} value={url} />
      <input ref={gate} aria-hidden="true" tabIndex={-1} className="sr-only" value="" readOnly />
      {state === "busy" && (
        <span role="status" className="mt-2 block text-[13px] text-[#082b52]/70">
          Uploading… {percent}%
          <span className="mt-1 block h-1 w-full bg-[#082b52]/10">
            <span className="block h-full bg-gold transition-[width] duration-200" style={{ width: `${percent}%` }} />
          </span>
        </span>
      )}
      {state === "done" && (
        <span role="status" className="mt-2 block text-[13px] font-medium text-[#1d6b46]">
          Uploaded. It is saved when you press Save.
        </span>
      )}
      {state === "error" && (
        <span role="alert" className="mt-2 block text-[13px] font-medium text-[#a33a3a]">
          {message}
        </span>
      )}
    </>
  );
}
