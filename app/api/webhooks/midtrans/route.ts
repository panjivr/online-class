import { getPrisma } from "@/lib/prisma";
import { midtransBase, midtransHeaders } from "@/lib/payments";
import { amountMatches, isSuccessfulPayment, verifyMidtransSignature } from "@/lib/payment-rules.mjs";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const key = process.env.MIDTRANS_SERVER_KEY;
  if (!key || !process.env.DATABASE_URL) return Response.json({ error: "Not configured" }, { status: 503 });
  const raw = await request.text();
  if (raw.length > 16384) return Response.json({ error: "Invalid request" }, { status: 413 });
  let payload: Record<string, unknown>;
  try { payload = JSON.parse(raw); } catch { return Response.json({ error: "Invalid JSON" }, { status: 400 }); }
  if (!verifyMidtransSignature(payload, key) || typeof payload.order_id !== "string") return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const statusResponse = await fetch(`${midtransBase().api}/v2/${encodeURIComponent(payload.order_id)}/status`, { headers: midtransHeaders(), cache: "no-store" });
    if (!statusResponse.ok) return Response.json({ error: "Verification unavailable" }, { status: 503 });
    const status = await statusResponse.json();
    const db = getPrisma();
    const order = await db.order.findUnique({ where: { id: payload.order_id }, include: { items: true } });
    if (!order || status.order_id !== order.id || !amountMatches(status.gross_amount, order.amountIdr)) return Response.json({ error: "Order mismatch" }, { status: 409 });
    if (!isSuccessfulPayment(status)) return Response.json({ received: true });
    await db.$transaction(async (tx) => {
      const updated = await tx.order.updateMany({
        where: { id: order.id, status: { in: ["CREATED", "PENDING", "EXPIRED", "FAILED"] } },
        data: { status: "PAID" }
      });
      if (updated.count === 0) return;
      const startsAt = new Date();
      for (const item of order.items) {
        const expiresAt = item.accessDaysSnapshot === null ? null : new Date(startsAt.getTime() + item.accessDaysSnapshot * 86_400_000);
        await tx.enrollment.create({ data: { userId: order.userId, courseId: item.courseId, sourceOrderId: order.id, startsAt, expiresAt } });
      }
    });
    return Response.json({ received: true });
  } catch {
    return Response.json({ error: "Processing failed" }, { status: 503 });
  }
}
