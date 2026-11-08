import { redirect } from "next/navigation";
import { currentSession } from "@/lib/session";
import { getPrisma } from "@/lib/prisma";
import { authConfigured } from "@/lib/auth";
import { SignOut } from "@/components/sign-out";
export const dynamic = "force-dynamic";
export default async function DashboardPage() {
  if (!authConfigured()) return <main className="store-page"><div className="account-panel"><h1>Area peserta sedang disiapkan.</h1><p>Silakan kembali ke beranda atau hubungi admin untuk informasi kelas.</p><a className="under-link" href="/">Kembali ke beranda</a></div></main>;
  const session = await currentSession();
  if (!session) redirect("/masuk");
  const now = new Date();
  const enrollments = await getPrisma().enrollment.findMany({ where: { userId: session.user.id, status: "ACTIVE", startsAt: { lte: now }, expiresAt: { gt: now } }, include: { course: true }, orderBy: { expiresAt: "asc" } });
  return <main className="store-page"><header className="store-header"><a href="/">← Beranda</a><SignOut /></header><span className="account-eyebrow">RUANG BELAJARMU</span><h1>Halo, {session.user.name}.</h1><p className="store-lead">Temukan kelas yang sudah terhubung ke akunmu.</p><section className="dashboard-classes"><h2>Kelas saya</h2>{enrollments.length === 0 ? <div className="empty-card"><p>Belum ada kelas aktif di akun ini.</p><a className="account-submit link-button" href="/checkout/remote">Lihat kelas kerja remote ↗</a></div> : enrollments.map((e) => <article className="empty-card" key={e.id}><h3>{e.course.title}</h3><p>Akses sampai {new Intl.DateTimeFormat("id-ID", { dateStyle: "long", timeZone: "Asia/Jakarta" }).format(e.expiresAt)}</p>{e.course.slug === "kerja-remote-internasional" && <a className="account-submit link-button" href="/belajar/remote">Buka kelas ↗</a>}</article>)}</section></main>;
}
