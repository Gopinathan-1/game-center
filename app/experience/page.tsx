import Image from "next/image";

const spaces = [
  {
    title: "Premium Lounge",
    image: "/premium-lounge.png",
    copy: "Comfort seating, warm lighting, and relaxed cafe tables for longer sessions.",
  },
  {
    title: "Squad Booths",
    image: "/squad-booths.png",
    copy: "Private group setups with focused lighting and clean team communication.",
  },
  {
    title: "Stream Pods",
    image: "/stream-pods.png",
    copy: "Creator-friendly pods with acoustic treatment and high-performance desk space.",
  },
  {
    title: "Coffee Bar",
    image: "/cafe-bar.png",
    copy: "Drinks and snacks close to the action, served for uninterrupted sessions.",
  },
];

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#1c1011] px-5 py-28 text-[#f5ddde] sm:px-10 lg:px-16">
      <section className="mx-auto max-w-[1440px]">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#ffb2ba]">
          Nexus Cafe
        </p>
        <h1 className="mt-5 font-display text-5xl font-black uppercase leading-tight sm:text-7xl">
          Cafe Experience
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f5ddde]/80">
          Explore the core spaces inside Nexus Cafe, from quiet lounge seating
          to private squad booths and creator-ready pods.
        </p>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {spaces.map((space) => (
            <article
              key={space.title}
              className="overflow-hidden border border-[#ffb2ba]/50 bg-[#170b0c]"
            >
              <div className="relative h-72">
                <Image
                  src={space.image}
                  alt={space.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="p-7">
                <h2 className="font-display text-3xl font-bold">{space.title}</h2>
                <p className="mt-4 leading-7 text-[#f5ddde]/78">{space.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
