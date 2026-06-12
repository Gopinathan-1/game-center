"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Monitor,
  Gamepad2,
  Trophy,
  Headphones,
  Wifi,
  Coffee,
  Check,
  Star,
  Quote,
} from "lucide-react";
import ContactSection from "./contact-section";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const stats = [
  ["48", "Gaming Rigs"],
  ["240Hz", "Display Refresh"],
  ["12", "Squad Rooms"],
  ["18K+", "Members"],
];

const features = [
  {
    icon: Monitor,
    title: "High-Refresh Gaming PCs",
    copy: "RTX 40-series rigs on 240Hz displays with mechanical keyboards and pro-grade peripherals.",
  },
  {
    icon: Gamepad2,
    title: "Console Lounges",
    copy: "PS5 and Xbox Series X stations on 4K OLED TVs with comfy recliners for couch co-op.",
  },
  {
    icon: Trophy,
    title: "Tournaments & Events",
    copy: "Weekly Valorant, FIFA, and BGMI competitions with cash prizes and live brackets.",
  },
  {
    icon: Headphones,
    title: "Private Squad Rooms",
    copy: "Soundproofed booths for 5-stacks with shared comms and a closed-door competitive setup.",
  },
  {
    icon: Wifi,
    title: "1 Gbps Fibre",
    copy: "Low-ping, lag-free connections on a dedicated gaming line built for ranked grinds.",
  },
  {
    icon: Coffee,
    title: "Fuel Bar",
    copy: "Energy drinks, cold brews, and quick bites delivered to your station between matches.",
  },
];

const aboutCards = [
  { image: "/premium-lounge.png", title: "Premium Lounge" },
  { image: "/squad-booths.png", title: "Squad Booths" },
  { image: "/stream-pods.png", title: "Stream Pods" },
];

const pricing = [
  {
    name: "Casual",
    price: "₹99",
    unit: "/ hour",
    tagline: "Drop in and play",
    features: [
      "Any open gaming PC or console",
      "240Hz displays & pro peripherals",
      "1 Gbps low-ping connection",
      "Walk-in friendly",
    ],
    highlight: true,
  },
];

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Valorant · Immortal",
    quote:
      "Best setup in the city, hands down. The 240Hz monitors and zero-lag connection completely changed my ranked games. The squad rooms are perfect for scrims.",
  },
  {
    name: "Priya Nair",
    role: "Content Creator",
    quote:
      "I stream from the pods every weekend. Clean audio, fast upload, and the staff genuinely care. It feels premium without the premium price tag.",
  },
  {
    name: "Rahul Verma",
    role: "FIFA Tournament Winner",
    quote:
      "Walked in for a casual session, ended up winning the weekend cup. The events here are properly organised and the vibe is unmatched.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function NexusArenaHome() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-midnight text-platinum">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_80%_12%,rgba(34,211,238,0.16),transparent_30rem),radial-gradient(circle_at_15%_40%,rgba(139,92,246,0.16),transparent_28rem),linear-gradient(180deg,#06070d_0%,#080a12_55%,#06070d_100%)]" />
      <div className="arena-grid pointer-events-none fixed inset-0 z-0 opacity-90" />
      <Navigation />
      <Hero />
      <AboutSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

function Navigation() {
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.12, 0.24, 0.42] },
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
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 px-5 transition-colors duration-300 sm:px-10 lg:px-16 ${
        scrolled
          ? "border-b border-white/10 bg-midnight/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-black italic tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-md bg-gradient-to-br from-cyan to-violet text-midnight">
            <Gamepad2 className="size-5" />
          </span>
          <span>
            NEXUS <span className="text-cyan">ARENA</span>
          </span>
        </a>
        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className={`relative px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  isActive ? "text-midnight" : "text-platinum/80 hover:text-cyan"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-cyan"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </div>
        <a
          href="#contact"
          className="rounded-full bg-gradient-to-r from-cyan to-violet px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-midnight transition hover:brightness-110"
        >
          Book Now
        </a>
      </nav>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="relative z-10 px-5 pt-28 sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-[1440px] items-center">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="relative"
          >
            <motion.div
              variants={reveal}
              className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan"
            >
              <span className="size-2 animate-pulse rounded-full bg-cyan" />
              Now open · Bengaluru
            </motion.div>
            <motion.h1
              variants={reveal}
              className="mt-7 font-display text-5xl font-black uppercase leading-[0.95] text-platinum sm:text-7xl lg:text-8xl"
            >
              Where Gamers
              <span className="block bg-gradient-to-r from-cyan to-violet bg-clip-text text-transparent">
                Level Up
              </span>
            </motion.h1>
            <motion.p
              variants={reveal}
              className="mt-7 max-w-xl text-base leading-7 text-platinum/70 sm:text-lg"
            >
              A premium gaming centre built for the grind — high-refresh PCs,
              next-gen consoles, private squad rooms, and tournaments every week.
              Reserve your station in seconds over WhatsApp.
            </motion.p>
            <motion.div variants={reveal} className="mt-9 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-cyan to-violet px-8 font-mono text-xs font-bold uppercase tracking-[0.16em] text-midnight shadow-neon transition hover:brightness-110"
              >
                Book a Station
              </a>
              <a
                href="#pricing"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/15 px-8 font-mono text-xs font-bold uppercase tracking-[0.16em] text-platinum transition hover:border-cyan hover:text-cyan"
              >
                View Pricing
              </a>
            </motion.div>

            <motion.div
              variants={reveal}
              className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
            >
              {stats.map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-2xl font-black text-cyan sm:text-3xl">
                    {value}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-platinum/50">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <Image
              src="/nexus-arena-hero.png"
              alt="Futuristic gaming setup at Nexus Arena"
              width={560}
              height={700}
              priority
              className="h-auto w-full rounded-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative z-10 px-5 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          kicker="About Nexus Arena"
          title="Built For Players, By Players"
          copy="We obsess over the details so you can focus on the game — premium hardware, zero lag, and a crew that gets it."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: (index % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="group rounded-2xl border border-white/10 bg-carbon/60 p-7 backdrop-blur-xl transition hover:border-cyan/40"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan/20 to-violet/20 text-cyan transition group-hover:from-cyan group-hover:to-violet group-hover:text-midnight">
                <feature.icon className="size-6" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold text-platinum">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-platinum/65">
                {feature.copy}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {aboutCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent" />
              <h3 className="absolute bottom-5 left-5 font-display text-xl font-bold text-platinum">
                {card.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="relative z-10 px-5 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          kicker="Pricing"
          title="Simple, Fair Rates"
          copy="Pay by the hour or grab a membership and play more for less. No hidden fees, ever."
        />

        <div className="mx-auto mt-14 grid max-w-md gap-6">
          {pricing.map((tier, index) => (
            <motion.article
              key={tier.name}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col rounded-2xl border p-8 backdrop-blur-xl ${
                tier.highlight
                  ? "border-cyan/50 bg-gradient-to-b from-cyan/10 to-violet/5 shadow-neon"
                  : "border-white/10 bg-carbon/60"
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan to-violet px-4 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-midnight">
                  Most Popular
                </span>
              )}
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan">
                {tier.name}
              </p>
              <p className="mt-2 text-sm text-platinum/60">{tier.tagline}</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="font-display text-5xl font-black text-platinum">
                  {tier.price}
                </span>
                <span className="mb-1.5 font-mono text-xs uppercase tracking-[0.12em] text-platinum/50">
                  {tier.unit}
                </span>
              </div>
              <ul className="mt-7 flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-platinum/80">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-cyan/15 text-cyan">
                      <Check className="size-3.5" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 flex h-12 items-center justify-center rounded-xl font-mono text-xs font-bold uppercase tracking-[0.16em] transition ${
                  tier.highlight
                    ? "bg-gradient-to-r from-cyan to-violet text-midnight hover:brightness-110"
                    : "border border-white/15 text-platinum hover:border-cyan hover:text-cyan"
                }`}
              >
                Book {tier.name}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative z-10 px-5 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          kicker="Testimonials"
          title="Loved By The Community"
          copy="Thousands of sessions played, countless ranks climbed. Here's what our regulars say."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-2xl border border-white/10 bg-carbon/60 p-8 backdrop-blur-xl"
            >
              <Quote className="size-8 text-cyan/40" />
              <div className="mt-4 flex gap-1 text-cyan">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-cyan" />
                ))}
              </div>
              <p className="mt-5 flex-1 text-sm leading-7 text-platinum/80">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="font-display text-base font-bold text-platinum">
                  {t.name}
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-cyan">
                  {t.role}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-midnight px-5 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="flex items-center gap-2 font-display text-lg font-black italic">
            <span className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-cyan to-violet text-midnight">
              <Gamepad2 className="size-4" />
            </span>
            NEXUS <span className="text-cyan">ARENA</span>
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-platinum/45">
            © 2026 Nexus Arena Gaming Centre. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 font-mono text-[10px] uppercase tracking-[0.12em] text-platinum/70">
          {["About", "Pricing", "Reviews", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="transition hover:text-cyan"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({
  kicker,
  title,
  copy,
}: {
  kicker: string;
  title: string;
  copy: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-cyan">
          {kicker}
        </p>
        <h2 className="mt-4 font-display text-4xl font-black uppercase leading-tight text-platinum sm:text-5xl">
          {title}
        </h2>
        <div className="mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-cyan to-violet" />
      </div>
      <p className="max-w-sm text-sm leading-6 text-platinum/65 md:text-right">
        {copy}
      </p>
    </motion.div>
  );
}
