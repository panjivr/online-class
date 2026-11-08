import { designCourses, remoteLessons, whatsappFor } from "@/lib/catalog";

export function CourseCatalog() {
  return (
    <section className="more-courses section-pad" aria-labelledby="more-courses-title">
      <div className="wrap">
        <div className="catalog-heading">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" />EXPLORE MORE</div>
            <h2 id="more-courses-title">Belajar, berkarya,<br /><em>dan melangkah lebih jauh.</em></h2>
          </div>
          <p>Temukan jalur belajar untuk membangun karier remote dan mengembangkan kemampuan kreatifmu.</p>
        </div>
        <div className="design-course-grid">
          {designCourses.map((course) => (
            <article className="design-course" id={course.id} key={course.id}>
              <div className={`design-course-art ${course.theme}`} aria-hidden="true">
                <div><span>REMOTE WORKER / CLASS {course.number}</span><span>↗</span></div>
                <strong>{course.theme === "lavender" ? <>DESIGN<br />WITH<br />PURPOSE<span>✳</span></> : <>CREATE<br />WITH<br />AI<span>✳</span></>}</strong>
                <small>IDEAS INTO IMPACT / {course.number}</small>
              </div>
              <div className="design-course-body">
                <div className="catalog-status"><span /> {course.stage}</div>
                <p className="catalog-kicker">{course.kicker}</p>
                <h3>{course.title}<br /><em>{course.highlight}</em></h3>
                <p>{course.summary}</p>
                <div className="course-meta"><span>Pengajar: <strong>{course.instructor}</strong></span><span>{course.duration}</span></div>
                <details className="catalog-details">
                  <summary>Lihat topik kelas <span aria-hidden="true">+</span></summary>
                  <p>{course.description}</p>
                  <ul>{course.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
                </details>
                <a href={whatsappFor(course.title + " " + course.highlight)} className="catalog-contact" target="_blank" rel="noopener noreferrer">Tanya kelas via WhatsApp <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
        <div className="remote-lesson-box" id="materi-remote">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" />REMOTE CLASS / BY FIA</div>
            <h3>Isi kelas<br /><em>kerja remote.</em></h3>
            <p>Delapan topik video dari pengenalan sampai interview, ditambah panduan dan dokumen pendukung. Hubungi admin untuk informasi akses.</p>
            <p className="included-docs"><strong>Materi pendukung:</strong> panduan kerja remote, template CV dan cover letter, referensi portofolio, job tracker, serta referensi mencari peluang kerja.</p>
            <a className="under-link" href={whatsappFor("Kerja Remote Internasional")} target="_blank" rel="noopener noreferrer">Tanya akses kelas <span aria-hidden="true">↗</span></a>
          </div>
          <ol className="remote-lessons">
            {remoteLessons.map((lesson, index) => <li key={lesson}><span>{String(index + 1).padStart(2, "0")}</span>{lesson}</li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
