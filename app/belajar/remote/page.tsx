import { redirect } from "next/navigation";
import { currentSession } from "@/lib/session";
import { getPrisma } from "@/lib/prisma";
import { LearningClassroom } from "@/components/learning-classroom";

export const dynamic = "force-dynamic";
function allowedLink(value: unknown, host: string, path: string) {
  if (typeof value !== "string") return null;
  try { const url = new URL(value); return url.protocol === "https:" && url.hostname === host && url.pathname.startsWith(path) ? url.toString() : null; } catch { return null; }
}

export default async function RemoteLessonsPage() {
  const session = await currentSession();
  if (!session) redirect("/masuk");
  const now = new Date();
  const access = await getPrisma().enrollment.findFirst({ where: { userId: session.user.id, status: "ACTIVE", startsAt: { lte: now }, OR: [{ expiresAt: null }, { expiresAt: { gt: now } }], course: { slug: "kerja-remote-internasional" } } });
  if (!access) return <main className="store-page"><div className="checkout-card"><h1>Kelas belum tersedia di akunmu.</h1><p>Pastikan pembayaran sudah terkonfirmasi atau hubungi admin.</p><a href="/checkout/remote" className="under-link">Lihat detail kelas →</a></div></main>;
  let source: { videos?: unknown; documents?: unknown } = {};
  try { source = JSON.parse(process.env.REMOTE_COURSE_PRIVATE_SOURCES ?? "{}"); } catch { /* no sources configured */ }
  const videos = Array.isArray(source.videos) ? source.videos.map((video) => allowedLink(video, "www.youtube.com", "/watch")) : [];
  const documents = allowedLink(source.documents, "drive.google.com", "/drive/folders/");
  return <LearningClassroom studentName={session.user.name} studentId={session.user.id} sources={{ videos, documents }} />;
}
