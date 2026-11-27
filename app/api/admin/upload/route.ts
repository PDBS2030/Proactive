import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAdmin } from "@/lib/admin-auth";

/**
 * Hands the dashboard's browser a one-time permission to send a photograph or a video straight to the public media
 * store, so large files never pass through the site's server. Only a signed-in admin is given one, and only for
 * pictures and video files up to 190 MB.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      token: process.env.MEDIA_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async () => {
        if (!(await isAdmin())) throw new Error("Not signed in.");
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm", "video/quicktime"],
          maximumSizeInBytes: 190 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
    });
    return Response.json(result);
  } catch {
    return Response.json({ error: "not_allowed" }, { status: 400 });
  }
}
