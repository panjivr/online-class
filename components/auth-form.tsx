"use client";

import { useState } from "react";

type Mode = "login" | "register" | "forgot" | "reset";

export function AuthForm({ mode, configured, token }: { mode: Mode; configured: boolean; token?: string }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const endpoint = mode === "register" ? "sign-up/email" : mode === "login" ? "sign-in/email" :
      mode === "forgot" ? "request-password-reset" : "reset-password";
    const body = mode === "register"
      ? { name: String(data.get("name") ?? "").trim(), email, password, callbackURL: "/dashboard" }
      : mode === "login" ? { email, password, callbackURL: "/dashboard" }
      : mode === "forgot" ? { email, redirectTo: `${window.location.origin}/reset-password` }
      : { newPassword: password, token };
    try {
      const response = await fetch(`/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        setMessage(response.status === 503
          ? "Layanan akun sedang disiapkan. Silakan hubungi admin."
          : mode === "login"
            ? "Tidak bisa masuk. Periksa email, kata sandi, dan verifikasi emailmu."
            : "Permintaan belum berhasil. Periksa data dan coba lagi.");
      } else if (mode === "login") {
        window.location.assign("/dashboard");
        return;
      } else if (mode === "register") {
        setMessage("Periksa emailmu dan ikuti tautan verifikasi sebelum masuk.");
      } else if (mode === "forgot") {
        setMessage("Jika email terdaftar, petunjuk untuk mengatur ulang kata sandi akan dikirim.");
      } else {
        setMessage("Kata sandi berhasil diperbarui. Kamu bisa masuk sekarang.");
      }
    } catch {
      setMessage("Koneksi bermasalah. Periksa jaringan dan coba lagi.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="account-form" onSubmit={submit}>
      {mode === "register" && <label>Nama lengkap<input name="name" autoComplete="name" required maxLength={100} /></label>}
      {mode !== "reset" && <label>Alamat email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>}
      {(mode === "login" || mode === "register" || mode === "reset") && <label>Kata sandi<input name="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} minLength={10} maxLength={128} required />{mode !== "login" && <small>Minimal 10 karakter.</small>}</label>}
      {!configured && <p className="form-notice">Layanan akun sedang disiapkan. Pendaftaran dan login belum aktif.</p>}
      {mode === "reset" && !token && <p className="form-notice">Tautan tidak lengkap. Minta tautan pengaturan ulang yang baru.</p>}
      {message && <p className="form-notice" role="status">{message}</p>}
      <button className="account-submit" type="submit" disabled={busy || !configured || (mode === "reset" && !token)}>
        {busy ? "Memproses..." : mode === "login" ? "Masuk" : mode === "register" ? "Buat akun" : mode === "forgot" ? "Kirim tautan" : "Simpan kata sandi"}
      </button>
      {mode === "login" && <div className="account-form-links"><a href="/lupa-password">Lupa kata sandi?</a><a href="/daftar">Buat akun</a></div>}
      {mode !== "login" && <div className="account-form-links"><a href="/masuk">Sudah punya akun? Masuk</a></div>}
    </form>
  );
}
