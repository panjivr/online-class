import { currentSession } from "@/lib/session";
import { getPrisma } from "@/lib/prisma";
import { accessDays, midtransBase, midtransHeaders, paymentConfigured, remotePrice } from "@/lib/payments";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return Response.json({ error: "Permintaan tidak valid." }, { status: 403 });
  if (!paymentConfigured()) return Response.json({ error: "Pembayaran belum tersedia. Hubungi admin untuk informasi kelas." }, { status: 503 });
  const session = await currentSession();
  if (!session?.user?.emailVerified) return Response.json({ error: "Masuk dengan email yang sudah diverifikasi." }, { status: 401 });
  let input: { key?: unknown };
  try { input = await request.json(); } catch { return Response.json({ error: "Permintaan tidak valid." }, { status: 400 }); }
  if (typeof input.key !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(input.key)) return Response.json({ error: "Permintaan tidak valid." }, { status: 400 });
  const price = remotePrice()!;
  const days = accessDays()!;
  const db = getPrisma();
  try {
    const course = await db.course.upsert({
      where: { slug: "kerja-remote-internasional" },
      create: { slug: "kerja-remote-internasional", title: "Kerja Remote Internasional dari Nol", description: "Panduan kerja remote internasional", priceIdr: price, accessDurationDays: days },
      update: { priceIdr: price, accessDurationDays: days }
    });
    const enrolled = await db.enrollment.findFirst({ where: { userId: session.user.id, courseId: course.id, status: "ACTIVE", startsAt: { lte: new Date() }, expiresAt: { gt: new Date() } } });
    if (enrolled) return Response.json({ error: "Kamu sudah memiliki akses ke kelas ini." }, { status: 409 });
    const order = await db.order.upsert({
      where: { idempotencyKey: input.key },
      create: { userId: session.user.id, amountIdr: price, idempotencyKey: input.key, items: { create: { courseId: course.id, titleSnapshot: course.title, amountIdr: price, accessDaysSnapshot: days } } },
      update: {},
      include: { items: true }
    });
    if (order.userId !== session.user.id || order.items.length !== 1 || order.items[0].courseId !== course.id) return Response.json({ error: "Permintaan tidak valid." }, { status: 403 });
    if (order.status === "PAID") return Response.json({ error: "Pesanan ini sudah dibayar. Buka dashboard." }, { status: 409 });
    if (["FAILED", "EXPIRED", "CANCELLED", "REFUNDED", "DISPUTED"].includes(order.status)) return Response.json({ error: "Pesanan ini tidak aktif. Silakan coba lagi untuk membuat pesanan baru.", retryWithNewOrder: true }, { status: 409 });
    const base = midtransBase();
    const result = await fetch(`${base.snap}/snap/v1/transactions`, {
      method: "POST",
      headers: midtransHeaders(),
      cache: "no-store",
      body: JSON.stringify({
        transaction_details: { order_id: order.id, gross_amount: order.amountIdr },
        item_details: [{ id: course.id, price: order.amountIdr, quantity: 1, name: "Kelas Kerja Remote" }],
        customer_details: { first_name: session.user.name, email: session.user.email },
        callbacks: { finish: `${new URL(request.url).origin}/pesanan/${order.id}` }
      })
    });
    if (!result.ok) {
      await db.order.updateMany({ where: { id: order.id, status: "CREATED" }, data: { status: "FAILED" } });
      return Response.json({ error: "Pembayaran belum dapat dibuat. Silakan coba lagi." }, { status: 502 });
    }
    const data: unknown = await result.json();
    const redirectUrl = typeof data === "object" && data !== null && "redirect_url" in data && typeof data.redirect_url === "string" ? data.redirect_url : "";
    const url = new URL(redirectUrl);
    if (url.protocol !== "https:" || url.origin !== base.snap) throw new Error("Invalid payment destination");
    await db.order.updateMany({ where: { id: order.id, status: "CREATED" }, data: { status: "PENDING" } });
    return Response.json({ redirectUrl });
  } catch {
    return Response.json({ error: "Checkout belum dapat diproses. Silakan hubungi admin." }, { status: 503 });
  }
}
