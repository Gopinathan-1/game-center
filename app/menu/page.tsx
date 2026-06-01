import Image from "next/image";

const items = [
  {
    name: "Cold Brew",
    image: "/menu-cold-brew.png",
    copy: "Slow-steeped, crisp, and served over ice.",
  },
  {
    name: "Loaded Fries",
    image: "/menu-loaded-fries.png",
    copy: "Crispy fries with warm toppings and dip.",
  },
  {
    name: "Iced Matcha",
    image: "/menu-iced-matcha.png",
    copy: "Creamy, cold, and clean for long sessions.",
  },
  {
    name: "Chicken Bites",
    image: "/menu-chicken-bites.png",
    copy: "Golden bites plated fast between matches.",
  },
];

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-[#1c1011] px-5 py-28 text-[#f5ddde] sm:px-10 lg:px-16">
      <section className="mx-auto max-w-[1440px]">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#ffb2ba]">
          Cafe Menu
        </p>
        <h1 className="mt-5 font-display text-5xl font-black uppercase leading-tight sm:text-7xl">
          Drinks and bites
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f5ddde]/80">
          Food and drinks built for gaming sessions: quick, clean, and easy to
          share with your table.
        </p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.name}
              className="overflow-hidden border border-[#ffb2ba]/50 bg-[#170b0c]"
            >
              <div className="relative h-60">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl font-bold">{item.name}</h2>
                <p className="mt-3 text-sm leading-6 text-[#f5ddde]/78">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
