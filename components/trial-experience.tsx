"use client";

import { useEffect, useState } from "react";
import { LearningClassroom } from "@/components/learning-classroom";

type Student = { id: string; name: string; order: boolean; payment: boolean; active: boolean };
type View = "welcome" | "register" | "student" | "admin" | "lessons";
const KEY = "remote-worker-trial-v1";
const seed: Student[] = [{ id: "sample", name: "Peserta Contoh", order: true, payment: true, active: false }];

export function TrialExperience({ sources }: { sources: { videos: (string | null)[]; documents: string | null } }) {
  const [students, setStudents] = useState<Student[]>(seed);
  const [view, setView] = useState<View>("welcome");
  const [selected, setSelected] = useState("sample");
  const [name, setName] = useState("");
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) setStudents(parsed.filter((x): x is Student => x && typeof x.id === "string" && typeof x.name === "string" && typeof x.order === "boolean" && typeof x.payment === "boolean" && typeof x.active === "boolean"));
      }
    } catch { setNotice("Penyimpanan browser tidak tersedia; data percobaan mungkin tidak tersimpan."); }
    setReady(true);
  }, []);
  function save(next: Student[]) {
    setStudents(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { setNotice("Penyimpanan browser tidak tersedia; data percobaan mungkin tidak tersimpan."); }
  }
  function change(id: string, update: Partial<Student>) { save(students.map((s) => s.id === id ? { ...s, ...update } : s)); }
  const current = students.find((s) => s.id === selected);
  function register(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clean = name.trim().slice(0, 50);
    if (!clean) return;
    const next = { id: crypto.randomUUID(), name: clean, order: false, payment: false, active: false };
    save([next, ...students]); setSelected(next.id); setName(""); setView("student");
  }
  if (view === "lessons" && current?.active) return <LearningClassroom demo studentName={current.name} studentId={current.id} sources={sources} onBack={() => setView("student")} />;
  return <main className="trial-page">
    <header className="trial-header"><a className="account-brand" href="/">rw<span> remoteworker.</span></a><a href="/">← Beranda</a></header>
    <div className="trial-wrap">
      <div className="trial-banner"><strong>MODE PERCOBAAN</strong><span>Simulasi di browser ini. Gunakan nama fiktif; jangan masukkan data pribadi atau bayar sungguhan. Tautan materi belum dilindungi.</span></div>
      {notice && <p className="form-notice" role="status">{notice}</p>}
      <div className="trial-top"><div><span className="account-eyebrow">REMOTE WORKER / TEST DRIVE</span><h1>Coba pengalaman<br /><em>kelasmu.</em></h1><p>Jelajahi alur peserta dan admin sebelum sistem pembayaran dan database diaktifkan.</p></div><div className="trial-price"><span>KELAS KERJA REMOTE</span><strong>Rp99.000</strong><small>Akses seumur hidup · materi terus diperbarui</small></div></div>
      <nav className="trial-nav" aria-label="Navigasi simulasi"><button onClick={() => setView("welcome")} aria-current={view === "welcome" ? "page" : undefined}>Mulai</button><button onClick={() => setView("register")} aria-current={view === "register" ? "page" : undefined}>Daftar percobaan</button><button onClick={() => setView("student")} aria-current={view === "student" || view === "lessons" ? "page" : undefined}>Dashboard peserta</button><button onClick={() => setView("admin")} aria-current={view === "admin" ? "page" : undefined}>Dashboard admin</button></nav>
      {!ready ? <p>Menyiapkan simulasi…</p> : <>
        {view === "welcome" && <section className="trial-panel"><span className="trial-tag">SIMULASI INTERAKTIF</span><h2>Jelajahi dari dua sisi.</h2><p>Daftarkan peserta fiktif dan buat pesanan simulasi. Lalu buka dashboard admin untuk memeriksa status dan menyetujui aksesnya.</p><div className="trial-actions"><button className="trial-primary" onClick={() => setView("register")}>Daftar sebagai peserta →</button><button className="trial-secondary" onClick={() => setView("admin")}>Masuk sebagai admin demo →</button></div><p className="trial-help">Login demo tidak memakai kata sandi dan bukan keamanan akun sungguhan.</p></section>}
        {view === "register" && <section className="trial-panel trial-narrow"><span className="trial-tag">PESERTA DEMO</span><h2>Buat akun percobaan.</h2><p>Gunakan nama fiktif. Akun ini hanya ada di browser yang sedang dipakai.</p><form className="account-form" onSubmit={register}><label>Nama peserta fiktif<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Contoh: Peserta Demo" maxLength={50} required /></label><button className="trial-primary" type="submit">Buat akun demo →</button></form><button className="trial-text-button" onClick={() => setView("student")}>Sudah punya akun demo? Pilih peserta</button></section>}
        {(view === "student" || view === "lessons") && <section className="trial-panel"><span className="trial-tag">DASHBOARD PESERTA DEMO</span><h2>Ruang belajarmu.</h2><label className="trial-select">Pilih akun percobaan <select value={current?.id ?? ""} onChange={(event) => {setSelected(event.target.value); setView("student");}}>{students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>{current ? <>
          <div className="trial-card"><div><span className="trial-kicker">KELAS BERSAMA FIA</span><h3>Kerja Remote Internasional</h3><p>Rp99.000 · Seumur hidup · Update materi</p><p><strong>Status akses: {current.active ? "Aktif" : "Belum aktif"}</strong></p></div><div>{!current.order ? <button className="trial-primary" onClick={() => change(current.id, { order: true })}>Buat pesanan demo</button> : !current.payment ? <button className="trial-primary" onClick={() => change(current.id, { payment: true })}>Simulasikan konfirmasi pembayaran</button> : current.active ? <button className="trial-primary" onClick={() => setView("lessons")}>Lihat materi demo →</button> : <span className="trial-status">Menunggu persetujuan admin</span>}</div></div>
          {current.order && <p className="trial-help">Status pembayaran: {current.payment ? "dinyatakan terkirim dalam simulasi, belum diverifikasi secara nyata" : "menunggu simulasi"}. Tidak ada transaksi bank.</p>}
        </> : <p>Belum ada peserta demo. Silakan daftar terlebih dahulu.</p>}</section>}
        {view === "admin" && <section className="trial-panel"><span className="trial-tag">ADMIN DEMO</span><h2>Pusat kendali kelas.</h2><p>Periksa pesanan simulasi dan atur akses masing-masing peserta. Seluruh data di bawah hanya berada di browser ini.</p><div className="trial-stats"><div><strong>{students.length}</strong><span>Peserta demo</span></div><div><strong>{students.filter((s) => s.order && !s.active).length}</strong><span>Menunggu akses</span></div><div><strong>{students.filter((s) => s.active).length}</strong><span>Akses aktif</span></div></div><div className="trial-roster">{students.map((s) => <article key={s.id}><div><h3>{s.name}</h3><p>Pesanan: {s.order ? "Dibuat" : "Belum ada"} · Pembayaran: {s.payment ? "Dilaporkan (simulasi)" : "Belum dilaporkan"} · Akses: {s.active ? "Aktif" : "Nonaktif"}</p></div><div className="trial-actions">{s.active ? <button className="trial-secondary" onClick={() => change(s.id, { active: false })}>Nonaktifkan akses</button> : <button className="trial-primary" disabled={!s.order || !s.payment} onClick={() => change(s.id, { active: true })}>Setujui akses</button>}<button className="trial-text-button" onClick={() => {setSelected(s.id); setView("student");}}>Lihat sebagai peserta</button></div></article>)}</div><p className="trial-help">Admin demo terbuka tanpa autentikasi dan tidak memeriksa uang masuk. Untuk penggunaan sesungguhnya diperlukan login admin aman, database dan verifikasi pembayaran.</p></section>}
      </>}
    </div>
  </main>;
}
