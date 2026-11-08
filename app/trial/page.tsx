import { TrialExperience } from "@/components/trial-experience";

export const dynamic = "force-dynamic";
export default function TrialPage() {
  let raw: { videos?: unknown; documents?: unknown } = {};
  try { raw = JSON.parse(process.env.REMOTE_COURSE_PRIVATE_SOURCES ?? "{}"); } catch { /* no sources configured */ }
  function allowed(value: unknown, host: string, path: string) {
    if (typeof value !== "string") return null;
    try { const url = new URL(value); return url.protocol === "https:" && url.hostname === host && url.pathname.startsWith(path) ? url.toString() : null; } catch { return null; }
  }
  const videos = Array.isArray(raw.videos) ? raw.videos.map((v) => allowed(v, "www.youtube.com", "/watch")) : [];
  const documents = allowed(raw.documents, "drive.google.com", "/drive/folders/");
  return <TrialExperience sources={{ videos, documents }} />;
}
