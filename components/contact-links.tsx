import { contact } from "@/lib/catalog";

export function ContactLinks({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-label="Kontak dan media sosial">
      <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">↗</span></a>
      <a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a>
      <a href={contact.tiktok} target="_blank" rel="noopener noreferrer">TikTok <span aria-hidden="true">↗</span></a>
    </div>
  );
}
