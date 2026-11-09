"use client";

import { useEffect, useState } from "react";
import { allClassroomLessons, classroomModules } from "@/lib/classroom-content";

type Sources = { videos: (string | null)[]; documents: string | null };
function embedUrl(value: string | null | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    const id = url.searchParams.get("v");
    return url.protocol === "https:" && url.hostname === "www.youtube.com" && url.pathname === "/watch" && id && /^[A-Za-z0-9_-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch { return null; }
}

export function LearningClassroom({ studentName, studentId, sources, onBack, demo = false }: { studentName: string; studentId: string; sources: Sources; onBack?: () => void; demo?: boolean }) {
  const [selected, setSelected] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [storageMessage, setStorageMessage] = useState("");
  const [finishedAt, setFinishedAt] = useState("");
  const [generating, setGenerating] = useState(false);
  const lesson = allClassroomLessons[selected];
  const isComplete = completed.includes(lesson.id);
  const percent = Math.round(completed.length / allClassroomLessons.length * 100);
  const key = `remote-worker-learning-v1:${studentId}`;
  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(key) ?? "[]");
      setCompleted(Array.isArray(stored) ? stored.filter((id): id is string => typeof id === "string" && allClassroomLessons.some((l) => l.id === id)).filter((id, index, arr) => arr.indexOf(id) === index) : []);
      const last = localStorage.getItem(`${key}:last`); const index = allClassroomLessons.findIndex((item) => item.id === last); if (index >= 0) setSelected(index);
      setFinishedAt(localStorage.getItem(`${key}:finished`) ?? "");
    } catch { setStorageMessage("Progres tidak dapat dimuat dari browser."); }
  }, [key]);
  function toggleCompletion() {
    const next = isComplete ? completed.filter((id) => id !== lesson.id) : [...completed, lesson.id];
    setCompleted(next);
    try { localStorage.setItem(key, JSON.stringify(next)); if (next.length === allClassroomLessons.length) { const date = localStorage.getItem(`${key}:finished`) ?? new Date().toISOString(); localStorage.setItem(`${key}:finished`, date); setFinishedAt(date); } else { localStorage.removeItem(`${key}:finished`); setFinishedAt(""); } setStorageMessage(""); } catch { setStorageMessage("Progres tidak dapat disimpan di browser."); }
  }
  function choose(index: number) { setSelected(index); try { localStorage.setItem(`${key}:last`, allClassroomLessons[index].id); } catch { /* navigation remains usable */ } window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }
  async function certificate() { if (completed.length !== allClassroomLessons.length) return; setGenerating(true); try { const { downloadCertificate } = await import("@/lib/certificate"); const date = new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(finishedAt ? new Date(finishedAt) : new Date()); await downloadCertificate(studentName, date, demo); } catch { setStorageMessage("Sertifikat belum dapat dibuat. Coba lagi di browser ini."); } finally { setGenerating(false); } }
  return <main className="learn-page">
    <header className="learn-header"><div>{onBack ? <button className="learn-back" onClick={onBack}>← Dashboard peserta</button> : <a className="learn-back" href="/dashboard">← Dashboard peserta</a>}<span className="learn-header-divider" aria-hidden="true"/><a href="/" className="learn-brand">rw<span> remoteworker.</span></a></div><span className="learn-demo-label">{demo ? "DEMO · " : ""}{studentName}</span></header>
    <div className="learn-shell"><aside className="learn-sidebar"><div className="learn-sidebar-top"><span className="learn-eyebrow">KELAS BERSAMA FIA</span><h2>Kerja Remote<br />Internasional<span>.</span></h2><p>Perjalananmu dimulai dari sini.</p><div className="learn-progress-head"><span>Progres belajar</span><strong>{percent}%</strong></div><div className="learn-progress" role="progressbar" aria-label="Progres belajar" aria-valuenow={completed.length} aria-valuemin={0} aria-valuemax={allClassroomLessons.length}><span style={{ width: `${percent}%` }}/></div><small>{completed.length} dari {allClassroomLessons.length} pelajaran selesai</small></div>
      <nav aria-label="Silabus kelas" className="learn-syllabus"><div className="learn-syllabus-heading"><strong>Silabus kelas</strong><span>{allClassroomLessons.length} MATERI</span></div>{classroomModules.map((module) => <div className="learn-module" key={module.title}><h3>{module.title}</h3>{module.lessons.map((item) => { const index = allClassroomLessons.findIndex((l) => l.id === item.id); return <button key={item.id} onClick={() => choose(index)} className={index === selected ? "is-current" : ""} aria-current={index === selected ? "step" : undefined}><span className={completed.includes(item.id) ? "learn-dot is-complete" : "learn-dot"}>{completed.includes(item.id) ? "✓" : String(index + 1).padStart(2, "0")}</span><span>{item.title}</span><span aria-hidden="true">{index === selected ? "→" : ""}</span></button>; })}</div>)}</nav>
      <div className="learn-sidebar-foot">Progres disimpan di browser ini.</div></aside>
      <div className="learn-main"><div className="learn-breadcrumb">KELAS REMOTE <span>/</span> PELAJARAN {String(selected + 1).padStart(2, "0")}</div><section className="learn-hero"><div><span className="learn-lesson-label">✳ {lesson.eyebrow}</span><h1>{lesson.title}<span>.</span></h1><p>{lesson.intro}</p></div><div className="learn-hero-count"><span>LANGKAH</span><strong>{String(selected + 1).padStart(2, "0")}</strong><small>/ {String(allClassroomLessons.length).padStart(2, "0")}</small></div></section>
        {lesson.videos?.length ? <section className="learn-video-section" aria-label="Video pembelajaran"><div className="learn-section-heading"><div><span className="learn-eyebrow">TONTON &amp; PELAJARI</span><h2>Video pembelajaran</h2></div><span>{lesson.videos.length} VIDEO</span></div>{lesson.videos.map((videoIndex, index) => { const embed = embedUrl(sources.videos[videoIndex]); return <div key={videoIndex} className="learn-video-item">{lesson.videos!.length > 1 && <h3>Bagian {index + 1}</h3>}{embed ? <div className="learn-video"><iframe key={embed} src={embed} title={`Video ${lesson.title}${lesson.videos!.length > 1 ? ` bagian ${index + 1}` : ""}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /></div> : <div className="learn-video-empty">Video untuk materi ini belum tersedia.</div>}<p>Jika video tidak dapat diputar, periksa koneksi atau pengaturan pemutaran video dari pemiliknya. {sources.videos[videoIndex] && <a href={sources.videos[videoIndex]!} target="_blank" rel="noopener noreferrer">Buka di YouTube ↗</a>}</p></div>; })}</section> : <div className="learn-reading-note"><span>✳</span><div><strong>Materi bacaan</strong><p>Pelajaran ini berisi rangkuman dan latihan. Lanjutkan membaca di bawah.</p></div></div>}
        <section className="learn-reading"><div className="learn-section-heading"><div><span className="learn-eyebrow">CATATAN KELAS</span><h2>Pelajari materinya</h2></div><span>LANGKAH {selected + 1}</span></div>{lesson.sections.map((section) => <article key={section.title}><h3>{section.title}</h3>{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</article>)}</section>
        <section className="learn-task"><span className="learn-task-icon">✳</span><div><span className="learn-eyebrow">SAATNYA PRAKTIK</span><h2>Langkah kecilmu selanjutnya.</h2><p>{lesson.task}</p></div></section>
        {lesson.resource && <section className="learn-resource"><div><span className="learn-eyebrow">BAHAN PENDUKUNG</span><h2>Template &amp; dokumen kelas</h2><p>Akses referensi CV, cover letter, portofolio, dan job tracker dari folder kelas.</p></div>{sources.documents ? <a href={sources.documents} target="_blank" rel="noopener noreferrer">Buka dokumen ↗</a> : <span>Dokumen belum tersedia.</span>}</section>}
        <div className="learn-complete"><div><strong>{isComplete ? "Pelajaran selesai ✓" : "Sudah selesai mempelajari materi ini?"}</strong><p>Tandai sendiri setelah membaca, menonton, dan mencoba latihannya.</p>{storageMessage && <p role="status">{storageMessage}</p>}</div><button onClick={toggleCompletion} className={isComplete ? "learn-button-secondary" : "learn-button"}>{isComplete ? "Batalkan tanda selesai" : "Tandai selesai ✓"}</button></div>
        {completed.length === allClassroomLessons.length && <section className="certificate-card"><div className="certificate-icon" aria-hidden="true"><svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="26" r="18" stroke="currentColor" strokeWidth="3"/><path d="m21 41-4 17 15-7 15 7-4-17M24 26l5 5 11-11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></div><div><span className="learn-eyebrow">SEMUA PELAJARAN SELESAI</span><h2>Selamat, {studentName}!</h2><p>Kamu telah menandai seluruh pelajaran selesai. Sertifikat {demo ? "demo" : "penyelesaian mandiri"} siap dibuat sebagai PDF.</p><small>{demo ? "Sertifikat percobaan, bukan sertifikat resmi atau terverifikasi." : "Penyelesaian ditandai mandiri dan belum diverifikasi."}</small></div><button className="learn-button" disabled={generating} onClick={certificate}>{generating ? "Membuat PDF…" : "Unduh sertifikat PDF ↓"}</button></section>}
        <div className="learn-pagination"><button className="learn-button-secondary" disabled={selected === 0} onClick={() => choose(selected - 1)}>← Sebelumnya</button><span>{selected + 1} / {allClassroomLessons.length}</span><button className="learn-button" disabled={selected === allClassroomLessons.length - 1} onClick={() => choose(selected + 1)}>Pelajaran berikutnya →</button></div>
      </div></div>
  </main>;
}
