import { notFound, redirect } from "next/navigation";
import { currentSession } from "@/lib/session";
import { getPrisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await currentSession();
  if (!session) redirect("/masuk");
  const { id } = await params;
  const order = await getPrisma().order.findFirst({ where: { id, userId: session.user.id }, include: { items: true } });
  if (!order) notFound();
  const description = order.status === "PAID" ? "Pembayaran terkonfirmasi. Kelas bisa dibuka dari dashboard." : "Status pembayaran akan diperbarui setelah konfirmasi dari penyedia pembayaran.";
  return <main className="store-page"><header className="store-header"><a href="/dashboard">← Dashboard</a></header><div className="checkout-card"><span className="account-eyebrow">STATUS PESANAN</span><h1>{order.status === "PAID" ? "Pembayaran berhasil." : "Pesanan sedang diproses."}</h1><p>{description}</p><p>Status: <strong>{order.status}</strong></p><a href="/dashboard" className="account-submit link-button">Ke dashboard ↗</a><p><a className="under-link" href={`/pesanan/${order.id}`}>Perbarui status</a></p></div></main>;
}
