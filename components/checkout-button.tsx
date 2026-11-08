"use client";

import { useState } from "react";

export function CheckoutButton({ enabled }: { enabled: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function checkout() {
    setBusy(true);
    setError("");
    try {
      const storageKey = "remote-worker-checkout-key";
      let key = sessionStorage.getItem(storageKey);
      if (!key) {
        key = crypto.randomUUID();
        sessionStorage.setItem(storageKey, key);
      }
      const result = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key }) });
      const data = await result.json();
      if (result.ok && typeof data.redirectUrl === "string") {
        window.location.assign(data.redirectUrl);
        return;
      }
      if (data.retryWithNewOrder) sessionStorage.removeItem(storageKey);
      setError(typeof data.error === "string" ? data.error : "Checkout belum dapat diproses.");
    } catch {
      setError("Koneksi bermasalah. Silakan coba lagi.");
    } finally {
      setBusy(false);
    }
  }
  return <div><button type="button" className="account-submit" disabled={!enabled || busy} onClick={checkout}>{busy ? "Menyiapkan pembayaran..." : "Lanjut ke pembayaran"}</button>{error && <p role="alert" className="form-notice">{error}</p>}</div>;
}
