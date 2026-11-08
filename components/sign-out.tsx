"use client";

export function SignOut() {
  async function signOut() {
    const response = await fetch("/api/auth/sign-out", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
    if (response.ok) window.location.assign("/");
  }
  return <button className="quiet-button" type="button" onClick={signOut}>Keluar</button>;
}
