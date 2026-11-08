import { createHash, timingSafeEqual } from "node:crypto";

export function verifyMidtransSignature(payload, serverKey) {
  if (!serverKey || typeof payload?.order_id !== "string" ||
      typeof payload?.status_code !== "string" || typeof payload?.gross_amount !== "string" ||
      typeof payload?.signature_key !== "string" || !/^[a-f0-9]{128}$/i.test(payload.signature_key)) return false;
  const expected = createHash("sha512")
    .update(payload.order_id + payload.status_code + payload.gross_amount + serverKey)
    .digest();
  const received = Buffer.from(payload.signature_key, "hex");
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export function isSuccessfulPayment(status) {
  return status?.status_code === "200" &&
    (status.transaction_status === "settlement" ||
      (status.transaction_status === "capture" && status.fraud_status === "accept"));
}

export function amountMatches(amount, expectedIdr) {
  return typeof amount === "string" && /^\d+(\.00)?$/.test(amount) &&
    Number.isSafeInteger(expectedIdr) && expectedIdr > 0 && Number(amount) === expectedIdr;
}
