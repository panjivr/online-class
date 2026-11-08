import { redirect } from "next/navigation";
import { currentSession } from "@/lib/session";
import { getPrisma } from "@/lib/prisma";
import { remoteLessons } from "@/lib/catalog";
export const dynamic = "force-dynamic";

function allowedLink(value: unknown, host: string, path: string) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === host && url.pathname === path ? url.toString() : null;
  } catch { return null; }
}

export default async function RemoteLessonsPage() {
  const session = await currentSession();
  if (!session) redirect("/masuk");
  const now = new Date();
  const access = await getPrisma().enrollment.findFirst({ where: { userId: session.user.id, status: "ACTIVE", startsAt: { lte: now }, OR: [{ expiresAt: null }, { expiresAt: { gt: now } }], course: { slug: "kerja-remote-internasional" } } });
  if (!access) return <main className="store-page"><div className="checkout-card"><h1>Kelas belum tersedia di akunmu.</h1><p>Pastikan pembayaran sudah terkonfirmasi atau hubungi admin.</p><a href="/checkout/remote" className="under-link">Lihat detail kelas →</a></div></main>;
  let source: { videos?: unknown[]; documents?: unknown } = {};
  try { source = JSON.parse(process.env.REMOTE_COURSE_PRIVATE_SOURCES ?? "{}"); } catch { /* no private source configured */ }
  const videos = Array.isArray(source.videos) ? source.videos : [];
  let docs: string | null = null;
  if (typeof source.documents === "string") {
    try { const url = new URL(source.documents); if (url.protocol === "https:" && url.hostname === "drive.google.com" && url.pathname.startsWith("/drive/folders/")) docs = url.toString(); } catch { /* invalid source */ }
  }
  return <main className="store-page"><header className="store-header"><a href="/dashboard">← Dashboard</a></header><span className="account-eyebrow">KELAS KERJA REMOTE</span><h1>Mulai belajarmu.</h1><p className="store-lead">Pilih materi untuk membuka video atau dokumen pendukung.</p><ol className="lesson-links">{remoteLessons.map((title, index) => {
    const link = allowedLink(videos[index], "www.youtube.com", "/watch");
    return <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong>{link ? <a href={link} target="_blank" rel="noopener noreferrer">Buka video ↗</a> : <span>Belum tersedia</span>}</li>;
  })}</ol><div className="empty-card"><h2>Dokumen pendukung</h2><p>CV, cover letter, portofolio, job tracker, dan panduan.</p>{docs ? <a href={docs} target="_blank" rel="noopener noreferrer" className="under-link">Buka dokumen ↗</a> : <span>Belum tersedia</span>}</div></main>;
}
