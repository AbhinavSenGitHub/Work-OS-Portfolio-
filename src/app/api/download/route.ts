import { countDownload, isBot } from "@/lib/downloads";
import { release } from "@/lib/release";
import { windows } from "@/lib/site";

/**
 * The Download button: counts the download, then sends the installer.
 * Auto-updates fetch the installer directly and are not counted here.
 */
export async function GET(request: Request) {
  const target = windows.downloadUrl ?? "/download";
  if (!isBot(request.headers.get("user-agent"))) {
    await countDownload(release.version);
  }
  return new Response(null, {
    status: 302,
    headers: { Location: new URL(target, request.url).toString(), "Cache-Control": "no-store" },
  });
}
