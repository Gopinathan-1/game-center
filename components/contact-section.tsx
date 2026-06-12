"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  TODO: Replace these placeholders with the real gaming centre details.      */
/* -------------------------------------------------------------------------- */
const WHATSAPP_NUMBER = "919876543210"; // wa.me format: country code + number, no "+"
const DISPLAY_PHONE = "+91 98765 43210";
const EMAIL = "play@nexusarena.gg";
const ADDRESS = "2nd Floor, Express Avenue Mall, Royapettah, Chennai, Tamil Nadu 600014";
const HOURS = "Open daily · 10:00 AM – 1:00 AM";
// Google Maps embed — searches the address. Swap for your exact location/coords.
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=15&output=embed`;

const WHATSAPP_MESSAGE =
  "Hi Nexus Arena! I'd like to book a gaming session. Please share availability.";
const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
/* -------------------------------------------------------------------------- */

export default function ContactSection() {
  return (
    <section id="contact" className="relative z-10 px-5 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-4 text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-cyan">
            Get in touch
          </p>
          <h2 className="font-display text-4xl font-black uppercase leading-tight text-platinum sm:text-6xl">
            Book Your <span className="text-cyan">Battlestation</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-7 text-platinum/70">
            Tap the button below to message us on WhatsApp — our team confirms
            your slot within minutes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* WhatsApp booking CTA */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-carbon/70 p-10 text-center backdrop-blur-xl"
          >
            <span className="flex size-16 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#25D366]">
              <MessageCircle className="size-8" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold text-platinum">
              Book on WhatsApp
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-platinum/65">
              Chat with us directly to reserve a gaming PC, console, or a private
              squad room. No forms, no waiting.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex h-14 w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-[#25D366] font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#06070d] transition hover:brightness-110"
            >
              <MessageCircle className="size-4" />
              Message Us
            </a>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-platinum/45">
              No account needed · Instant confirmation
            </p>
          </motion.div>

          {/* Map + contact details */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="relative h-[300px] overflow-hidden rounded-2xl border border-white/10 shadow-neon">
              <iframe
                title="Nexus Arena location"
                src={MAP_EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
                allowFullScreen
              />
            </div>

            <div className="grid gap-3 rounded-2xl border border-white/10 bg-carbon/70 p-7 backdrop-blur-xl">
              <ContactRow icon={<MapPin className="size-5" />} label="Visit us" value={ADDRESS} />
              <ContactRow icon={<Phone className="size-5" />} label="Call" value={DISPLAY_PHONE} href={`tel:${DISPLAY_PHONE.replace(/\s/g, "")}`} />
              <ContactRow icon={<Mail className="size-5" />} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
              <ContactRow icon={<Clock className="size-5" />} label="Hours" value={HOURS} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
        {icon}
      </span>
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-platinum/45">
          {label}
        </p>
        <p className="mt-1 text-sm leading-6 text-platinum/85">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="transition hover:opacity-80">
      {content}
    </a>
  ) : (
    content
  );
}
