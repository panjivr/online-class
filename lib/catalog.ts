export const contact = {
  whatsapp: "https://wa.me/6282241793442",
  instagram: "https://www.instagram.com/fiiiremoteworker/",
  tiktok: "https://www.tiktok.com/@fiiiremoteworker/"
};

export function whatsappFor(course: string) {
  return `${contact.whatsapp}?text=${encodeURIComponent(`Halo, saya ingin bertanya tentang kelas ${course} di Remote Worker.`)}`;
}

export const remoteLessons = [
  "Pengenalan kerja remote",
  "Tahapan apply kerja remote — bagian 1",
  "Tahapan apply kerja remote — bagian 2",
  "Membuat proyek dummy untuk portofolio",
  "Melamar kerja remote di LinkedIn",
  "Melamar kerja remote di Upwork",
  "Melamar melalui job market dan website perusahaan",
  "Persiapan interview online"
];

export const designCourses = [
  {
    id: "kelas-canva",
    number: "02",
    kicker: "FUNDAMENTAL DESIGN · CANVA",
    title: "Dari Nol Jadi",
    highlight: "Visual Designer.",
    summary: "Belajar berpikir seperti desainer, dari prinsip visual sampai menyusun karya dengan Canva.",
    instructor: "Panji Vr",
    stage: "DALAM PENGEMBANGAN",
    duration: "Rencana 12 minggu",
    description: "Mulai dari pengenalan Canva, hierarki, tipografi dan warna, lalu praktik membuat konten, branding, presentasi, hingga proyek akhir.",
    topics: [
      "Mengenal Canva, layer, resize, dan format desain",
      "Nirmana, komposisi, hierarki visual, tipografi, dan warna",
      "Foto, elemen, layout, grid, feed, story, dan carousel",
      "Branding, Brand Kit, hook, CTA, dan copy visual",
      "Membaca brief, presentasi, revisi, dan ekspor",
      "Proyek akhir dan penyusunan portofolio"
    ],
    theme: "lavender"
  },
  {
    id: "kelas-ai",
    number: "03",
    kicker: "ADVANCED DESIGN · AI",
    title: "Desain Lebih Jauh",
    highlight: "dengan AI.",
    summary: "Gunakan AI sebagai asisten kreatif untuk mengembangkan ide, visual, produksi, dan portofolio.",
    instructor: "Panji Vr",
    stage: "DALAM PENGEMBANGAN",
    duration: "Kelas lanjutan",
    description: "Lanjutan untuk membangun alur kerja kreatif dari brief dan riset sampai proyek brand, dengan tetap memakai penilaian dan strategi desainer.",
    topics: [
      "Riset, membaca brief, moodboard, dan pengembangan ide",
      "Prompt visual dan copy, serta konsistensi gaya",
      "Produksi konten dan eksplorasi alat desain berbantuan AI",
      "Branding, kampanye, dan produksi aset secara efisien",
      "Portofolio, menawarkan jasa, dan menentukan harga",
      "Etika, hak cipta AI, dan proyek akhir klien fiktif"
    ],
    theme: "peach"
  }
];
