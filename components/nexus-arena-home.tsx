"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Experience", href: "#experience" },
  { label: "Menu", href: "#menu" },
  { label: "Reserve", href: "#booking" },
];

const experienceCards = [
  {
    kicker: "Crafted Comfort",
    title: "Premium Lounge",
    image: "/premium-lounge.png",
    copy: "Soft seating, quiet lighting, and cafe-style tables for players who want comfort with their session.",
  },
  {
    kicker: "Private Immersion",
    title: "Squad Booths",
    image: "/squad-booths.png",
    copy: "Semi-private booths with high-refresh PCs, headset-ready comms, and space for full groups.",
  },
  {
    kicker: "Creator Ready",
    title: "Stream Pods",
    image: "/stream-pods.png",
    copy: "Focused pods with clean acoustics, fast upload lanes, and creator-friendly lighting scenes.",
  },
  {
    kicker: "Artisan Taste",
    title: "Coffee Bar",
    image: "/cafe-bar.png",
    copy: "Signature cold brews, hot snacks, loaded fries, and table-side ordering between rounds.",
  },
];

const stats = [
  ["25K+", "Brews Served"],
  ["500K+", "Hours Played"],
  ["120+", "Social Events"],
  ["15K+", "Cafe Members"],
];

const menuItems = [
  {
    name: "Cold Brew",
    image: "/menu-cold-brew.png",
    copy: "Slow-steeped, crisp, and served over ice with a smooth espresso finish.",
  },
  {
    name: "Loaded Fries",
    image: "/menu-loaded-fries.png",
    copy: "Crispy fries layered with warm toppings, herbs, and a dip built for sharing.",
  },
  {
    name: "Iced Matcha",
    image: "/menu-iced-matcha.png",
    copy: "Creamy matcha, chilled milk, and a clean finish for longer sessions.",
  },
  {
    name: "Chicken Bites",
    image: "/menu-chicken-bites.png",
    copy: "Golden crispy bites with a side dip, plated fast between matches.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function NexusArenaHome() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#1c1011] text-[#f5ddde]">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_78%_18%,rgba(85,214,245,0.16),transparent_28rem),radial-gradient(circle_at_20%_36%,rgba(255,178,186,0.14),transparent_24rem),linear-gradient(180deg,#1c1011_0%,#170b0c_52%,#1c1011_100%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.07] cafe-grid" />
      <Navigation />

      <section className="relative z-10 min-h-screen bg-[#1c1011] px-5 pt-28 sm:px-10 lg:px-16">
        <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-[1440px] items-center justify-center text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="relative max-w-6xl"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffb2ba]/10 blur-3xl" />
            <motion.p
              variants={reveal}
              className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-[#ffb2ba]"
            >
              Redefine your social play
            </motion.p>
            <motion.h1
              variants={reveal}
              className="mx-auto mt-7 font-display text-6xl font-black italic leading-[0.9] text-[#f5ddde] drop-shadow-[0_8px_0_rgba(0,0,0,0.32)] sm:text-8xl lg:text-[8.75rem]"
            >
              The Ultimate
              <span className="block text-[#ffb2ba]">Gaming Cafe</span>
            </motion.h1>
            <motion.p
              variants={reveal}
              className="mx-auto mt-8 max-w-2xl text-base leading-7 text-[#f5ddde] sm:text-xl sm:leading-8"
            >
              High-performance gaming, private squad booths, artisan drinks,
              and social nights in a lounge built for regular players.
            </motion.p>
            <motion.div variants={reveal} className="mt-11 flex flex-wrap justify-center gap-4">
              <PremiumButton href="#booking">Reserve a Spot</PremiumButton>
              <a
                href="#menu"
                className="inline-flex h-14 items-center justify-center border border-[#ffb2ba]/35 px-7 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#ffb2ba] transition hover:border-[#ffb2ba] hover:bg-[#ffb2ba]/10"
              >
                Explore Menu
              </a>
            </motion.div>
          </motion.div>

        </div>
      </section>

      <ExperienceSection />
      <CafeMenuSection />
      <BookingSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}

function Navigation() {
  const [activeSection, setActiveSection] = useState("experience");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.12, 0.24, 0.42],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    setActiveSection(href.replace("#", ""));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-[#ffb2ba]/45 bg-[#1c1011]/82 px-5 backdrop-blur-xl sm:px-10 lg:px-16"
    >
      <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between">
        <a href="#" className="font-display text-xl font-black italic tracking-tight text-[#ffb2ba]">
          NEXUS CAFE
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;

            return (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavClick(event, item.href)}
              className={`relative px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] transition ${
                isActive ? "text-[#1c1011]" : "text-[#f5ddde] hover:text-[#ffb2ba]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 -z-10 bg-[#ffb2ba]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
            );
          })}
        </div>
        <a
          href="#booking"
          className="bg-[#ffb2ba] px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#f5ddde] transition hover:bg-[#ffcee3]"
        >
          Book Table
        </a>
      </nav>
    </motion.header>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="relative z-10 bg-[#1c1011] px-5 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          title="Cafe Experience"
          copy="Explore crafted spaces for every gaming mood, from private squad booths to lively lounge sessions."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {experienceCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 44, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{
                duration: 0.72,
                delay: (index % 2) * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -8 }}
              className="group grid overflow-hidden border border-[#ffb2ba]/60 bg-[#170b0c] shadow-[0_0_42px_rgba(0,0,0,0.18)] md:grid-cols-[0.9fr_1fr]"
            >
              <div className="relative min-h-[260px] overflow-hidden border-b border-[#ffb2ba]/60 bg-[#251819] md:border-b-0 md:border-r">
                <Image
                  src={card.image}
                  alt={`${card.title} at Nexus Cafe`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 360px"
                />
              </div>
              <div className="flex min-h-[260px] flex-col justify-between p-7 sm:p-8">
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#ffb2ba]">
                    {card.kicker}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-bold text-[#f5ddde] sm:text-4xl">
                    {card.title}
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-[#f5ddde]/82 sm:text-base sm:leading-7">
                    {card.copy}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-[#ffb2ba]/60 pt-5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#ffb2ba]">
                    0{index + 1}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CafeMenuSection() {
  return (
    <section id="menu" className="relative z-10 bg-[#251819]/35 px-5 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#ffb2ba]">
            Cafe Menu
          </p>
          <h2 className="mt-5 font-display text-4xl font-black uppercase leading-tight text-[#f5ddde] sm:text-6xl">
            Drinks and bites
            <span className="block text-[#ffb2ba]">between rounds.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#f5ddde] sm:text-lg">
            Fast table-side ordering for long sessions: cold drinks, loaded
            snacks, coffee, and group combos built for cafe nights.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {menuItems.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.58,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group overflow-hidden border border-[#ffb2ba]/60 bg-[#170b0c]/72 backdrop-blur-xl transition hover:border-[#ffb2ba]/45 hover:bg-[#2a1c1d]/80"
            >
              <div className="relative h-52 overflow-hidden border-b border-[#ffb2ba]/60 bg-[#251819]">
                <Image
                  src={item.image}
                  alt={`${item.name} at Nexus Cafe`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 360px"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#ffb2ba]">
                    0{index + 1}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#ffb2ba] opacity-70 transition group-hover:scale-150" />
                </div>
                <h3 className="mt-8 font-display text-2xl font-bold text-[#f5ddde]">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#f5ddde]/78">
                  {item.copy}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  const resources = ["8 Ball Pool Table", "PS4", "PS5", "PC"];
  const [resource, setResource] = useState(resources[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [method, setMethod] = useState<"whatsapp" | "email">("whatsapp");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSlotTaken, setIsSlotTaken] = useState(false);

  // Mock reserved slots: format "YYYY-MM-DD HH:mm"
  const RESERVED_SLOTS = [
    "2026-06-01 14:00",
    "2026-06-01 15:00",
    "2026-06-02 10:00",
  ];

  const CONTACT_EMAIL = "bookings@nexus-arena.local";

  const checkSlotAvailability = (selectedDate: string, selectedTime: string) => {
    if (!selectedDate || !selectedTime) {
      setIsSlotTaken(false);
      return;
    }
    const slotDateTime = `${selectedDate} ${selectedTime}`;
    const isTaken = RESERVED_SLOTS.includes(slotDateTime);
    setIsSlotTaken(isTaken);
  };

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    checkSlotAvailability(newDate, time);
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    checkSlotAvailability(date, newTime);
  };

  const handleSubmit = () => {
    if (!date || !time || !name || !contact) {
      alert("Please complete all fields before sending your request.");
      return;
    }

    if (isSlotTaken) {
      alert("This time slot is already reserved. Please choose a different time.");
      return;
    }

    const message = `Booking request for ${resource} on ${date} at ${time}.\nName: ${name}\nContact: ${contact}`;

    if (method === "whatsapp") {
      const wa = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(wa, "_blank");
    } else {
      const subject = `Booking request - ${resource}`;
      const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      window.location.href = mailto;
    }
  };

  return (
    <section id="booking" className="relative z-10 px-5 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[900px]">
        <SectionHeading
          title="Check Availability"
          copy="Select a station or table, pick a date & time, then contact us via WhatsApp or email to confirm availability."
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 overflow-hidden rounded-[2rem] border border-[#ffb2ba]/60 bg-[#170b0c]/70 shadow-[0_0_90px_rgba(255,178,186,0.12)]"
        >
          <div className="glass-panel p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#ffb2ba]">
                  Reserve a slot
                </p>
                <h3 className="font-display text-3xl font-black text-[#f5ddde] sm:text-4xl">
                  Book your game station with a single message.
                </h3>
                <p className="text-sm leading-7 text-[#f5ddde]/90 sm:text-base">
                  Pick your preferred station, choose time, then reach out to confirm availability instantly.
                </p>
                <div className="grid gap-3 text-sm text-[#f5ddde] sm:grid-cols-2">
                  <div className="rounded-xl border border-[#ffb2ba]/15 bg-[#1c1011]/50 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#ffb2ba]">Best for groups</p>
                    <p className="mt-3">8 Ball Pool Table</p>
                  </div>
                  <div className="rounded-xl border border-[#ffb2ba]/15 bg-[#1c1011]/50 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#ffb2ba]">Quick play</p>
                    <p className="mt-3">PS4 / PS5 / PC stations</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[#ffb2ba]/80 bg-[#1c1011]/90 p-6 shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]">
                <div className="grid gap-4">
                  <label className="flex flex-col text-sm text-[#f5ddde]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#ffb2ba]">Station / Table</span>
                    <div className="relative mt-2">
                      <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="w-full rounded-xl border border-[#ffb2ba]/50 bg-[#170b0c] p-3 text-left text-sm text-[#f5ddde] outline-none transition hover:border-[#ffb2ba]/30 focus:border-[#ffb2ba] focus:ring-2 focus:ring-[#ff85bb]/20"
                      >
                        {resource}
                      </button>
                      {showDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-[#ffb2ba]/60 bg-[#1c1011] shadow-lg overflow-hidden"
                        >
                          {resources.map((r) => (
                            <button
                              key={r}
                              onClick={() => {
                                setResource(r);
                                setShowDropdown(false);
                              }}
                              className={`block w-full px-4 py-3 text-left text-sm transition ${
                                r === resource
                                  ? "bg-[#ffb2ba]/20 text-[#ffb2ba] font-semibold"
                                  : "text-[#f5ddde] hover:bg-[#2a1c1d] hover:text-[#f5ddde]"
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </label>

                  <label className="flex flex-col text-sm text-[#f5ddde]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#ffb2ba]">Date</span>
                    <div className="relative mt-2">
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => handleDateChange(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-[#ffb2ba]/50 bg-[#170b0c] p-3 text-sm text-[#f5ddde] outline-none transition hover:border-[#ffb2ba]/30 focus:border-[#ffb2ba] focus:ring-2 focus:ring-[#ff85bb]/20 cursor-pointer"
                      />
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                        <svg className="h-5 w-5 text-[#ffb2ba]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </label>

                  <label className="flex flex-col text-sm text-[#f5ddde]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#ffb2ba]">Time</span>
                    <div className="relative mt-2">
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => handleTimeChange(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-[#ffb2ba]/50 bg-[#170b0c] p-3 text-sm text-[#f5ddde] outline-none transition hover:border-[#ffb2ba]/30 focus:border-[#ffb2ba] focus:ring-2 focus:ring-[#ff85bb]/20 cursor-pointer"
                      />
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                        <svg className="h-5 w-5 text-[#ffb2ba]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    {isSlotTaken && (
                      <p className="mt-2 text-xs text-[#ffb2ba]">
                        That slot is already reserved. Please choose another time.
                      </p>
                    )}
                  </label>

                  <label className="flex flex-col text-sm text-[#f5ddde]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#ffb2ba]">Your name</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="mt-2 rounded-xl border border-[#ffb2ba]/50 bg-[#170b0c] p-3 text-sm text-[#f5ddde] outline-none focus:border-[#ffb2ba] focus:ring-2 focus:ring-[#ff85bb]/20"
                    />
                  </label>

                  <label className="flex flex-col text-sm text-[#f5ddde]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#ffb2ba]">Contact</span>
                    <input
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+1 555 555 5555 or you@domain.com"
                      className="mt-2 rounded-xl border border-[#ffb2ba]/50 bg-[#170b0c] p-3 text-sm text-[#f5ddde] outline-none focus:border-[#ffb2ba] focus:ring-2 focus:ring-[#ff85bb]/20"
                    />
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="flex items-center gap-2 rounded-xl border border-[#ffb2ba]/50 bg-[#1c1011]/60 p-3 text-xs uppercase tracking-[0.18em] text-[#f5ddde]">
                      <input
                        type="radio"
                        name="method"
                        checked={method === "whatsapp"}
                        onChange={() => setMethod("whatsapp")}
                        className="h-4 w-4 accent-[#ff85bb]"
                      />
                      WhatsApp
                    </label>
                    <label className="flex items-center gap-2 rounded-xl border border-[#ffb2ba]/50 bg-[#1c1011]/60 p-3 text-xs uppercase tracking-[0.18em] text-[#f5ddde]">
                      <input
                        type="radio"
                        name="method"
                        checked={method === "email"}
                        onChange={() => setMethod("email")}
                        className="h-4 w-4 accent-[#ff85bb]"
                      />
                      Email
                    </label>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#ffb2ba] px-6 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#1c1011] transition hover:bg-[#ffb2ba]"
                  >
                    Check Availability
                  </button>

                  <p className="text-[11px] leading-5 text-[#f5ddde]/70">
                    Your request will open in WhatsApp or email so the team can confirm availability quickly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



function FinalCTA() {
  return (
    <section id="final" className="relative z-10 overflow-hidden px-5 py-28 text-center sm:px-10 lg:px-16">
      <div className="absolute inset-0 bg-[#ffb2ba]/5" />
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-5xl"
      >
        <h2 className="font-display text-5xl font-black italic leading-tight text-[#f5ddde] sm:text-7xl">
          Sip. Play. Socialize.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[#f5ddde]">
          Book a station, reserve a booth, or bring the full squad for a private
          cafe night.
        </p>
        <div className="mt-10">
          <PremiumButton href="#booking">Experience Nexus</PremiumButton>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#ffb2ba]/35 bg-[#170b0c] px-5 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-black italic text-[#ffb2ba]">NEXUS CAFE</p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-[#f5ddde]/65">
            2026 Nexus Luxury Gaming Cafe. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 font-mono text-[10px] uppercase tracking-[0.1em] text-[#f5ddde]">
          {["Privacy", "House Rules", "Cafe Menu", "Booking Policy"].map((item) => (
            <a key={item} href="#" className="transition hover:text-[#ffb2ba]">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="font-display text-4xl font-black uppercase text-[#f5ddde] sm:text-6xl">
          {title}
        </h2>
        <div className="mt-5 h-1 w-24 bg-[#ffb2ba]" />
      </div>
      <p className="max-w-sm text-left text-sm leading-6 text-[#f5ddde] md:text-right">
        {copy}
      </p>
    </div>
  );
}

function PremiumButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.045 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex h-14 items-center justify-center bg-[#ffb2ba] px-8 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#1c1011] shadow-[0_0_35px_rgba(255,178,186,0.24)] transition hover:bg-[#ffb2ba]"
    >
      {children}
    </motion.a>
  );
}
