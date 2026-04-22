import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Shield, Truck, RefreshCw } from "lucide-react";
import { getFeaturedProducts, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const marqueeItems = [
  "NEW COLLECTION",
  "PHANTOM HOODIE",
  "FREE SHIPPING OVER $200",
  "VOID CARGO",
  "LIMITED DROPS",
  "ECLIPSE JACKET",
  "FUTURISTIC STREETWEAR",
  "VX SIGNAL CAP",
];

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "On all orders over $200",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "30-day hassle-free returns",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    desc: "256-bit SSL encryption",
  },
  {
    icon: Zap,
    title: "Premium Quality",
    desc: "Crafted to outlast trends",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts();
  const latest = products.slice(4, 8);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85"
            alt="Hero background"
            fill
            priority
            className="object-cover opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-vx-black via-vx-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-vx-black via-transparent to-vx-black/40" />
        </div>

        {/* Accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-vx-accent to-transparent opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-vx-accent" />
              <span className="text-vx-accent text-xs font-bold tracking-[0.3em] uppercase">
                SS 2026 Collection
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-[clamp(4rem,12vw,9rem)] leading-none tracking-wider text-vx-white">
              WEAR
              <br />
              THE{" "}
              <span className="text-gradient">VOID.</span>
            </h1>

            <p className="mt-6 text-vx-silver text-lg max-w-md leading-relaxed">
              Futuristic streetwear engineered for the next generation. Bold
              silhouettes. Premium fabrics. Zero compromise.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-10">
              <Link href="/shop" className="btn-primary flex items-center gap-2">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about" className="btn-outline">
                Our Story
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-16">
              {[
                { value: "10K+", label: "Customers" },
                { value: "50+", label: "Products" },
                { value: "4.9★", label: "Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl tracking-wider text-vx-accent">
                    {stat.value}
                  </div>
                  <div className="text-vx-gray text-xs tracking-widest uppercase mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-vx-accent to-transparent animate-pulse" />
          <span className="text-[10px] text-vx-gray tracking-[0.3em] uppercase">
            Scroll
          </span>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="border-y border-vx-border bg-vx-card overflow-hidden py-4">
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="font-display text-lg tracking-[0.2em] text-vx-white px-6">
                {item}
              </span>
              <span className="text-vx-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-vx-accent text-xs font-bold tracking-[0.3em] uppercase mb-2">
              ✦ Featured
            </p>
            <h2 className="font-display text-5xl lg:text-6xl tracking-wider">
              THE DROP
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-2 text-vx-gray hover:text-vx-white text-sm tracking-widest uppercase font-medium transition-colors group"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 2} />
          ))}
        </div>

        <div className="sm:hidden mt-8 text-center">
          <Link href="/shop" className="btn-outline inline-flex items-center gap-2">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── SPLIT BANNER ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left – bold */}
          <Link
            href="/shop?category=Hoodies"
            className="group relative overflow-hidden aspect-[4/3] bg-vx-card border border-vx-border"
          >
            <Image
              src="https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=900&q=85"
              alt="Hoodies collection"
              fill
              className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vx-black/80 via-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-vx-accent text-xs tracking-widest uppercase mb-2">
                New In
              </p>
              <h3 className="font-display text-5xl tracking-wider text-white">
                HOODIES
              </h3>
              <div className="flex items-center gap-2 mt-3 text-sm text-vx-silver group-hover:text-vx-accent transition-colors">
                Shop Collection <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Right – 2 stacked */}
          <div className="grid grid-rows-2 gap-4">
            {[
              {
                label: "T-Shirts",
                category: "T-Shirts",
                img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
              },
              {
                label: "Accessories",
                category: "Accessories",
                img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
              },
            ].map(({ label, category, img }) => (
              <Link
                key={label}
                href={`/shop?category=${category}`}
                className="group relative overflow-hidden bg-vx-card border border-vx-border"
              >
                <Image
                  src={img}
                  alt={label}
                  fill
                  className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 1024px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-vx-black/60" />
                <div className="absolute inset-0 flex items-center px-8">
                  <div>
                    <h3 className="font-display text-3xl tracking-wider text-white">
                      {label.toUpperCase()}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-vx-silver group-hover:text-vx-accent transition-colors">
                      Explore <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LATEST PRODUCTS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-vx-accent text-xs font-bold tracking-[0.3em] uppercase mb-2">
              ✦ Latest
            </p>
            <h2 className="font-display text-5xl lg:text-6xl tracking-wider">
              JUST DROPPED
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {latest.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="border-y border-vx-border bg-vx-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-10 h-10 border border-vx-border flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-vx-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-vx-white">{title}</h4>
                  <p className="text-vx-gray text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0 bg-gradient-radial from-vx-accent/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-vx-accent text-xs font-bold tracking-[0.3em] uppercase mb-4">
            ✦ Limited Edition
          </p>
          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-none tracking-wider text-vx-white">
            THE PHANTOM
            <br />
            IS HERE.
          </h2>
          <p className="text-vx-silver text-lg mt-6 max-w-lg mx-auto">
            420gsm heavyweight French terry. Raw-edge construction.
            Unmistakably Veltrixwear.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/product/vx-phantom-hoodie"
              className="btn-primary flex items-center gap-2"
            >
              Shop the Phantom <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
