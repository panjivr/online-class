import "server-only";

export function remotePrice() {
  const raw = process.env.REMOTE_COURSE_PRICE_IDR ?? "";
  if (!/^[1-9]\d*$/.test(raw)) return null;
  const amount = Number(raw);
  return Number.isSafeInteger(amount) && amount >= 1000 && amount <= 100_000_000 ? amount : null;
}

export function paymentConfigured() {
  return Boolean(process.env.MIDTRANS_SERVER_KEY && remotePrice());
}

export function midtransBase() {
  return process.env.MIDTRANS_IS_PRODUCTION === "true"
    ? { snap: "https://app.midtrans.com", api: "https://api.midtrans.com" }
    : { snap: "https://app.sandbox.midtrans.com", api: "https://api.sandbox.midtrans.com" };
}

export function midtransHeaders() {
  return { Authorization: `Basic ${Buffer.from(`${process.env.MIDTRANS_SERVER_KEY}:`).toString("base64")}`, "Content-Type": "application/json", Accept: "application/json" };
}
