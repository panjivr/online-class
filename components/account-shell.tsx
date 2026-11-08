export function AccountShell({ eyebrow, title, description, children }: {
  eyebrow: string; title: string; description: string; children: React.ReactNode;
}) {
  return (
    <main className="account-page">
      <header className="account-header"><a className="account-brand" href="/">rw<span> remoteworker.</span></a><a href="/">← Kembali ke beranda</a></header>
      <div className="account-layout"><aside className="account-aside"><span>REMOTE WORKER / LEARNING SPACE</span><strong>YOUR NEXT<br />CHAPTER<span>✳</span></strong><p>Bangun skill. Buka peluang. Melangkah lebih jauh.</p></aside>
        <section className="account-panel"><span className="account-eyebrow">{eyebrow}</span><h1>{title}</h1><p className="account-intro">{description}</p>{children}</section>
      </div>
    </main>
  );
}
