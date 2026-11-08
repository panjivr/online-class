import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { amountMatches, isSuccessfulPayment, verifyMidtransSignature } from "../lib/payment-rules.mjs";

test("webhook signature must match order, status, amount and server key", () => {
  const key = "test-server-key";
  const payload = { order_id: "order-1", status_code: "200", gross_amount: "299000.00" };
  const signature_key = createHash("sha512").update(payload.order_id + payload.status_code + payload.gross_amount + key).digest("hex");
  assert.equal(verifyMidtransSignature({ ...payload, signature_key }, key), true);
  assert.equal(verifyMidtransSignature({ ...payload, gross_amount: "1000.00", signature_key }, key), false);
  assert.equal(verifyMidtransSignature({ ...payload, signature_key: "bad" }, key), false);
  assert.equal(verifyMidtransSignature({ ...payload, signature_key }, ""), false);
});

test("only confirmed successful transaction states activate access", () => {
  assert.equal(isSuccessfulPayment({ status_code: "200", transaction_status: "settlement" }), true);
  assert.equal(isSuccessfulPayment({ status_code: "200", transaction_status: "capture", fraud_status: "accept" }), true);
  assert.equal(isSuccessfulPayment({ status_code: "200", transaction_status: "capture", fraud_status: "challenge" }), false);
  assert.equal(isSuccessfulPayment({ status_code: "200", transaction_status: "pending" }), false);
  assert.equal(isSuccessfulPayment({ status_code: "201", transaction_status: "settlement" }), false);
});

test("the provider amount must equal the stored integer amount", () => {
  assert.equal(amountMatches("299000.00", 299000), true);
  assert.equal(amountMatches("299000", 299000), true);
  assert.equal(amountMatches("299001.00", 299000), false);
  assert.equal(amountMatches("299000.50", 299000), false);
  assert.equal(amountMatches("1e3", 1000), false);
  assert.equal(amountMatches("-1", -1), false);
});
