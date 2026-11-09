export async function downloadCertificate(name: string, date: string, demo: boolean, lessonCount: number) {
  const { jsPDF } = await import("jspdf");
  const canvas = document.createElement("canvas");
  canvas.width = 1800; canvas.height = 1272;
  const c = canvas.getContext("2d");
  if (!c) throw new Error("Canvas tidak tersedia");
  c.fillStyle = "#f7f8f1"; c.fillRect(0, 0, 1800, 1272);
  c.fillStyle = "#172119"; c.fillRect(0, 0, 1800, 100); c.fillStyle = "#caff56"; c.fillRect(0, 100, 1800, 12);
  c.strokeStyle = "#bdc7b4"; c.lineWidth = 3; c.strokeRect(45, 145, 1710, 1075);
  c.textAlign = "center"; c.fillStyle = "#1d2b1c";
  const text = (value: string, y: number, font: string, color = "#1d2b1c") => { c.font = font; c.fillStyle = color; c.fillText(value, 900, y, 1500); };
  text("REMOTE WORKER  /  LEARNING SPACE", 215, "bold 25px sans-serif", "#586b50");
  text(demo ? "SERTIFIKAT PENYELESAIAN • DEMO" : "SERTIFIKAT PENYELESAIAN MANDIRI", 320, "bold 32px sans-serif");
  text("Certificate of Completion", 425, "bold 78px sans-serif");
  text("Diberikan kepada", 520, "30px sans-serif", "#586b50");
  text(name.trim().slice(0, 80) || "Peserta", 625, "bold 72px sans-serif");
  c.strokeStyle = "#a7cf53"; c.lineWidth = 4; c.beginPath(); c.moveTo(420, 663); c.lineTo(1380, 663); c.stroke();
  text("telah menyelesaikan seluruh materi kelas", 735, "30px sans-serif", "#586b50");
  text("Kerja Remote Internasional dari Nol", 800, "bold 42px sans-serif");
  text(`${lessonCount} pelajaran • Fia / @fiiiremoteworker`, 870, "28px sans-serif", "#586b50");
  text(date, 1010, "bold 27px sans-serif");
  text(demo ? "CONTOH • BUKAN SERTIFIKAT RESMI ATAU TERVERIFIKASI" : "Penyelesaian ditandai mandiri • belum diverifikasi", 1130, "bold 21px sans-serif", "#586b50");
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true });
  pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, 297, 210);
  pdf.save(demo ? "sertifikat-remote-worker-DEMO.pdf" : "sertifikat-remote-worker.pdf");
}
