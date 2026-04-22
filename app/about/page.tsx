import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

const values = [
  {
    num: "01",
    title: "Uncompromising Quality",
    desc: "Every piece is made from premium fabrics sourced from the best mills in Portugal and Japan. We don't cut corners.",
  },
  {
    num: "02",
    title: "Futuristic Design",
    desc: "Our design language is rooted in utility, informed by architecture, and executed with precision. Form follows function.",
  },
  {
    num: "03",
    title: "Responsible Production",
    desc: "Small-batch production, ethical factories, and minimum waste. We build less to build better.",
  },
  {
    num: "04",
    title: "Community First",
    desc: "We are built by our community. Every drop is shaped by feedback, culture, and the people who wear us.",
  },
];

const team = [
  {
    name: "Marcus Veltrix",
    role: "Founder & Creative Director",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Zara Chen",
    role: "Head of Design",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "Ade Okafor",
    role: "Brand & Culture",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
];

export const metadata = {
  title: "About",
  description: "The story behind Veltrixwear — futuristic streetwear built on quality, culture, and community.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-vx-black pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85"
          alt="Veltrixwear story"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-vx-black via-vx-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <p className="text-vx-accent text-xs font-bold tracking-[0.3em] uppercase mb-3">
            ✦ Our Story
          </p>
          <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-none tracking-wider">
            BUILT
            <br />
            DIFFERENT.
          </h1>
        </div>
      </section>

      {/* Story section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-vx-silver text-lg leading-relaxed mb-6">
              Veltrixwear was born in 2022 from a single frustration: the gap
              between streetwear culture and genuine quality. We were tired of
              paying premium prices for mediocre fabrics and hype-driven
              aesthetics.
            </p>
            <p className="text-vx-silver text-lg leading-relaxed mb-6">
              We started with one hoodie. 50 units, sold out in 4 hours. That
              told us everything we needed to know. People were hungry for
              something real — clothes that looked like the future and felt like
              they were built to last.
            </p>
            <p className="text-vx-silver text-lg leading-relaxed">
              Today, we release small collections with obsessive attention to
              detail. Every seam, every fabric, every fit is deliberate. We
              don&apos;t rush. We don&apos;t overproduce. We just build the best
              streetwear we possibly can.
            </p>

            <div className="flex items-center gap-3 mt-10">
              <div className="w-8 h-8 bg-vx-accent flex items-center justify-center">
                <Zap
                  className="w-4 h-4 text-vx-black"
                  fill="currentColor"
                />
              </div>
              <span className="font-display text-xl tracking-widest">
                VELTRIX<span className="text-vx-accent">WEAR</span>
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden border border-vx-border">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85"
                alt="Our workshop"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-vx-accent text-vx-black px-6 py-4 font-display text-3xl tracking-wider">
              EST. 2022
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-vx-dark border-y border-vx-border py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <p className="text-vx-accent text-xs font-bold tracking-[0.3em] uppercase mb-2">
              ✦ What We Stand For
            </p>
            <h2 className="font-display text-5xl lg:text-6xl tracking-wider">
              OUR VALUES
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-vx-border">
            {values.map(({ num, title, desc }) => (
              <div
                key={num}
                className="bg-vx-dark p-8 hover:bg-vx-card transition-colors duration-300"
              >
                <span className="font-display text-5xl text-vx-border">
                  {num}
                </span>
                <h3 className="font-display text-2xl tracking-wider text-vx-accent mt-4 mb-3">
                  {title.toUpperCase()}
                </h3>
                <p className="text-vx-silver text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-16">
          <p className="text-vx-accent text-xs font-bold tracking-[0.3em] uppercase mb-2">
            ✦ The Minds Behind It
          </p>
          <h2 className="font-display text-5xl lg:text-6xl tracking-wider">
            THE TEAM
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {team.map(({ name, role, img }) => (
            <div key={name} className="group">
              <div className="relative aspect-square overflow-hidden bg-vx-card border border-vx-border mb-4">
                <Image
                  src={img}
                  alt={name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <h3 className="font-semibold text-sm text-vx-white">{name}</h3>
              <p className="text-vx-gray text-xs mt-0.5">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-vx-border bg-vx-card py-20 text-center">
        <p className="text-vx-accent text-xs font-bold tracking-[0.3em] uppercase mb-4">
          ✦ Ready?
        </p>
        <h2 className="font-display text-5xl tracking-wider mb-6">
          EXPLORE THE COLLECTION
        </h2>
        <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
          Shop Now <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
