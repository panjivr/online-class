import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Remote Worker — Belajar untuk peluang kerja global",
  description: "Bangun keterampilan, portofolio, dan kesiapan untuk mencari peluang kerja remote internasional.",
  openGraph: {
    title: "Remote Worker",
    description: "Mulai langkahmu menuju peluang kerja remote global.",
    type: "website",
    locale: "id_ID"
  },
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
