import { faqs, modules } from "@/lib/course";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? "↗" : "→"}</span>;
}

function Brand() {
  return (
    <a href="#top" className="brand" aria-label="Remote Worker, ke atas halaman">
      <span className="brand-mark" aria-hidden="true"><span>r</span><span>w</span><i /></span>
      <span className="brand-name">remote<span>worker.</span></span>
    </a>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="visual-grid" />
      <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      <div className="visual-top"><span>YOUR NEXT CHAPTER</span><span>✳&nbsp; REMOTE READY</span></div>
      <div className="spark spark-one">✳</div><div className="spark spark-two">✦</div>
      <div className="center-orb"><div className="orb-inner"><span>WORK</span><span>FROM</span><strong>ANYWHERE<span>*</span></strong><small>*sesuai ketentuan pekerjaan</small></div></div>
      <div className="float-card card-location"><span className="float-icon">↗</span><div><small>YOUR DIRECTION</small><strong>Go further.</strong></div></div>
      <div className="float-card card-progress"><span className="status-dot" /><div><small>THE FIRST STEP</small><strong>Mulai dari sini</strong></div></div>
      <span className="visual-coordinate coord-top">07° 52&apos; S<br />111° 28&apos; E</span>
      <span className="visual-coordinate coord-bottom">BEYOND<br />BOUNDARIES ↗</span>
      <div className="visual-bottom"><span>LEARN AT YOUR PACE</span><span>EST. 2026</span></div>
    </div>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={light ? "eyebrow eyebrow-light" : "eyebrow"}><span className="eyebrow-dot" />{children}</div>;
}

export default function Home() {
  return (
    <main id="top">
      <div className="announcement"><span>✳</span> Ruang belajar untuk langkah karier berikutnya <a href="#kelas">Kenali kelasnya <Arrow /></a></div>
      <header className="site-header">
        <div className="wrap nav-row">
          <Brand />
          <nav className="desktop-nav" aria-label="Navigasi utama"><a href="#tentang">Tentang</a><a href="#belajar">Alur belajar</a><a href="#kurikulum">Kurikulum</a><a href="#faq">FAQ</a></nav>
          <a className="nav-cta" href="#kelas">Jelajahi kelas <Arrow diagonal /></a>
          <details className="mobile-menu"><summary aria-label="Buka menu navigasi"><span /><span /></summary><nav aria-label="Navigasi seluler"><a href="#tentang">Tentang</a><a href="#belajar">Alur belajar</a><a href="#kurikulum">Kurikulum</a><a href="#faq">FAQ</a><a href="#kelas">Jelajahi kelas ↗</a></nav></details>
        </div>
      </header>

      <section className="hero wrap">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="kicker-spark">✳</span> A NEW WAY TO WORK <span className="kicker-line" /></div>
          <h1>Kerja bisa<br />dari <em>mana</em><br /><span>saja<span className="hero-period">.</span></span></h1>
          <p>Kesempatanmu lebih luas dari yang kamu kira. Siapkan skill, portofolio, dan langkahmu untuk dunia kerja remote.</p>
          <div className="hero-actions"><a className="button button-dark" href="#kelas">Mulai jelajahi <span><Arrow diagonal /></span></a><a className="text-link" href="#belajar">Lihat cara belajarnya <Arrow /></a></div>
          <div className="hero-note"><div className="mini-avatars"><span>↗</span><span>✳</span><span>◎</span></div><p>Untuk kamu yang ingin<br /><strong>mulai melangkah lebih jauh.</strong></p></div>
        </div>
        <HeroVisual />
        <div className="hero-side-label">YOUR CAREER, YOUR WAY &nbsp; / &nbsp; 01 — 26</div>
      </section>

      <div className="ticker" aria-label="Topik belajar"><div><span>GLOBAL OPPORTUNITIES</span><b>✳</b><span>BUILD YOUR SKILLS</span><b>✳</b><span>WORK BEYOND BORDERS</span><b>✳</b><span>YOUR NEXT MOVE</span><b>✳</b><span>GLOBAL OPPORTUNITIES</span><b>✳</b></div></div>

      <section className="intro section-pad" id="tentang">
        <div className="wrap intro-grid"><div><SectionLabel>TENTANG REMOTE WORKER</SectionLabel><h2>Peluang besar<br />dimulai dari <em>langkah kecil.</em></h2></div><div className="intro-copy"><p className="intro-lead">Bukan soal harus langsung tahu semuanya. Yang penting, kamu tahu harus mulai dari mana.</p><p>Remote Worker adalah ruang belajar yang dirancang untuk membantumu mengenal dunia kerja remote, membangun kemampuan, dan menyiapkan diri untuk peluang yang lebih luas.</p><a className="under-link" href="#belajar">Kenali perjalananmu <Arrow diagonal /></a></div></div>
        <div className="wrap statement-row"><span>LEARN</span><span className="statement-star">✳</span><span>GROW</span><span className="statement-star">✳</span><span>GO FURTHER</span></div>
      </section>

      <section className="path section-pad" id="belajar">
        <div className="wrap"><div className="section-heading"><div><SectionLabel>YOUR JOURNEY</SectionLabel><h2>Satu langkah.<br /><em>Banyak kemungkinan.</em></h2></div><p>Belajar dengan arah yang lebih jelas, dari mengenali kemampuan sampai siap menunjukkan hasil kerjamu.</p></div>
          <div className="path-grid">
            <article className="path-card"><div className="card-index"><span>01 / DISCOVER</span><span>↗</span></div><div className="path-art art-lime"><span className="target-ring"><i /><i /><i /><b>✳</b></span></div><h3>Kenali arahmu.</h3><p>Temukan bidang yang sesuai dengan kemampuan, minat, dan kebutuhan pasar.</p></article>
            <article className="path-card"><div className="card-index"><span>02 / BUILD</span><span>↗</span></div><div className="path-art art-lavender"><div className="art-window"><span>✳ &nbsp; YOUR SKILLS</span><i /><i /><i /><b>✦</b></div></div><h3>Bangun bekalmu.</h3><p>Siapkan CV, profil profesional, dan portofolio yang menunjukkan kemampuanmu.</p></article>
            <article className="path-card"><div className="card-index"><span>03 / EXPLORE</span><span>↗</span></div><div className="path-art art-peach"><div className="art-globe"><span>✳</span><i /><b>↗</b></div></div><h3>Jelajahi peluang.</h3><p>Pelajari cara mencari lowongan, mengirim lamaran, dan menghadapi interview.</p></article>
          </div>
        </div>
      </section>

      <section className="course-section section-pad" id="kelas">
        <div className="wrap"><div className="section-heading course-heading"><div><SectionLabel light>THE LEARNING SPACE</SectionLabel><h2>Siap untuk<br /><em>langkah berikutnya?</em></h2></div><p>Sebuah ruang belajar praktis, disiapkan untuk kamu yang ingin memahami peluang kerja remote dari awal.</p></div>
          <div className="course-card"><div className="course-art"><div className="course-art-top"><span>REMOTE WORKER / CLASS 01</span><span>✳</span></div><div className="course-art-center"><span>THE</span><strong>REMOTE<br />STARTER<span>✳</span></strong><small>YOUR CAREER, BEYOND BOUNDARIES</small></div><div className="course-art-bottom"><span>LEARN. BUILD. EXPLORE.</span><span>↗</span></div></div>
            <div className="course-info"><div className="pill"><span /> DALAM PERSIAPAN</div><p className="course-category">KELAS ONLINE / PEMULA</p><h3>Remote Worker:<br /><em>Mulai dari Nol.</em></h3><p>Kenali dunia kerja remote dan siapkan bekal yang kamu butuhkan, selangkah demi selangkah.</p><div className="course-tags"><span>✳ &nbsp; Praktis</span><span>✳ &nbsp; Bahasa Indonesia</span><span>✳ &nbsp; Belajar mandiri</span></div><div className="course-card-footer"><div><small>STATUS KELAS</small><strong>Sedang dipersiapkan</strong></div><a href="#kurikulum" className="circle-link" aria-label="Lihat rencana kurikulum">↗</a></div></div>
          </div><p className="course-disclaimer">Informasi kelas, harga, instruktur, dan akses akan diumumkan setelah siap. Hasil belajar setiap peserta berbeda dan tidak menjamin pekerjaan atau penghasilan.</p>
        </div>
      </section>

      <section className="curriculum section-pad" id="kurikulum">
        <div className="wrap curriculum-grid"><div className="curriculum-intro"><SectionLabel>WHAT YOU WILL LEARN</SectionLabel><h2>Bekal untuk<br /><em>melangkah.</em></h2><p>Ini adalah rancangan topik yang sedang kami siapkan. Materi akhir dapat disesuaikan sebelum kelas dibuka.</p><div className="curriculum-stamp"><span>✳</span><div>MADE FOR<br /><strong>YOUR NEXT MOVE</strong></div></div></div>
          <div className="module-list">{modules.map((item) => <details className="module" key={item.number}><summary><span className="module-number">{item.number}</span><span>{item.title}</span><span className="module-plus" aria-hidden="true">+</span></summary><p>{item.detail}</p></details>)}</div></div>
      </section>

      <section className="manifesto"><div className="wrap manifesto-inner"><span className="manifesto-spark">✳</span><div><SectionLabel light>BUILT FOR THE CURIOUS</SectionLabel><h2>Bukan tentang<br />seberapa jauh kamu,<br /><em>tapi ke mana kamu mau pergi.</em></h2></div><div className="manifesto-side"><span>01 / KEEP LEARNING</span><span>02 / KEEP GROWING</span><span>03 / KEEP EXPLORING</span></div></div></section>

      <section className="faq section-pad" id="faq"><div className="wrap faq-grid"><div><SectionLabel>GOOD TO KNOW</SectionLabel><h2>Masih ada<br /><em>pertanyaan?</em></h2><p>Beberapa hal yang mungkin ingin kamu ketahui sebelum memulai.</p></div><div className="faq-list">{faqs.map((item) => <details className="faq-item" key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></div></section>

      <section className="final-cta"><div className="wrap final-cta-inner"><div><span className="final-kicker">THE WORLD IS OPEN ↗</span><h2>Langkah barumu<br />dimulai <em>di sini.</em></h2><p>Kenali apa yang sedang kami siapkan untuk perjalanan remote-mu.</p><a className="button button-dark" href="#kelas">Jelajahi kelas <span><Arrow diagonal /></span></a></div><div className="final-art" aria-hidden="true"><span>✳</span><strong>GO<br />FURTHER<span>.</span></strong><small>YOUR NEXT CHAPTER AWAITS / RW</small></div></div></section>
      <footer><div className="wrap footer-main"><div><Brand /><p>Bangun skill. Buka peluang.<br />Melangkah lebih jauh.</p></div><div className="footer-nav"><div><strong>JELAJAHI</strong><a href="#tentang">Tentang</a><a href="#belajar">Alur belajar</a><a href="#kurikulum">Kurikulum</a></div><div><strong>INFORMASI</strong><a href="#faq">Pertanyaan umum</a><a href="#kelas">Status kelas</a></div></div></div><div className="wrap footer-bottom"><span>© 2026 REMOTE WORKER</span><span>MADE FOR YOUR NEXT MOVE &nbsp; ✳</span></div></footer>
    </main>
  );
}
