"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowLeft,
  Share2,
  Package,
  RefreshCw,
} from "lucide-react";
import { getProductBySlug, products } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";
import clsx from "clsx";

interface Props {
  params: { slug: string };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const { addItem } = useCartStore();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  return (
    <div className="min-h-screen bg-vx-black pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-xs text-vx-gray">
          <Link href="/" className="hover:text-vx-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-vx-white transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-vx-silver">{product.name}</span>
        </div>
      </div>

      {/* Product Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* ─── Image Gallery ─── */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-vx-card border border-vx-border group">
              {product.badge && (
                <div
                  className={clsx(
                    "absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold tracking-widest uppercase",
                    product.badge === "SALE"
                      ? "bg-vx-red text-white"
                      : "bg-vx-accent text-vx-black"
                  )}
                >
                  {product.badge}
                </div>
              )}
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Prev/Next arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage(
                        (activeImage - 1 + product.images.length) %
                          product.images.length
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-vx-black/60 backdrop-blur-sm border border-vx-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-vx-accent hover:text-vx-accent text-vx-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImage(
                        (activeImage + 1) % product.images.length
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-vx-black/60 backdrop-blur-sm border border-vx-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-vx-accent hover:text-vx-accent text-vx-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={clsx(
                      "relative w-20 aspect-square overflow-hidden border-2 transition-all duration-200 flex-shrink-0",
                      activeImage === i
                        ? "border-vx-accent"
                        : "border-vx-border hover:border-vx-muted"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── Product Info ─── */}
          <div className="lg:pt-4">
            <p className="text-vx-accent text-xs font-bold tracking-[0.3em] uppercase mb-3">
              {product.category}
            </p>
            <h1 className="font-display text-5xl lg:text-6xl tracking-wider leading-none">
              {product.name.toUpperCase()}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-3xl font-bold text-vx-accent">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-vx-gray text-lg line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="px-2 py-0.5 bg-vx-red text-white text-xs font-bold">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            <div className="w-full h-px bg-vx-border my-8" />

            {/* Size selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold tracking-widest uppercase text-vx-gray">
                  Select Size
                </h3>
                <button className="text-xs text-vx-accent underline underline-offset-2">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={clsx(
                      "h-10 px-4 text-xs font-bold tracking-widest uppercase border transition-all duration-200",
                      selectedSize === size
                        ? "bg-vx-accent border-vx-accent text-vx-black"
                        : sizeError
                        ? "border-vx-red text-vx-red hover:border-vx-accent hover:text-vx-white"
                        : "border-vx-border text-vx-silver hover:border-vx-accent hover:text-vx-white"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="text-vx-red text-xs mt-2 tracking-wide">
                  Please select a size before adding to cart
                </p>
              )}
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={clsx(
                  "btn-primary flex-1 flex items-center justify-center gap-2 transition-all",
                  added
                    ? "bg-green-500 hover:bg-green-500 text-white"
                    : ""
                )}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>
              <button
                className="w-12 h-12 border border-vx-border flex items-center justify-center text-vx-gray hover:border-vx-accent hover:text-vx-accent transition-all duration-200"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[
                { icon: Package, text: "Free shipping over $200" },
                { icon: RefreshCw, text: "30-day free returns" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-xs text-vx-gray border border-vx-border p-3"
                >
                  <Icon className="w-3.5 h-3.5 text-vx-accent flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-vx-border my-8" />

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-vx-gray mb-3">
                Description
              </h3>
              <p className="text-vx-silver text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Details */}
            <div className="mt-6">
              <h3 className="text-xs font-bold tracking-widest uppercase text-vx-gray mb-3">
                Details
              </h3>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-vx-silver">
                    <span className="text-vx-accent mt-1 text-xs">✦</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Back */}
            <Link
              href="/shop"
              className="flex items-center gap-2 text-vx-gray hover:text-vx-white text-sm tracking-wide mt-10 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Shop
            </Link>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="mb-10">
              <p className="text-vx-accent text-xs font-bold tracking-[0.3em] uppercase mb-2">
                ✦ You May Also Like
              </p>
              <h2 className="font-display text-4xl tracking-wider">
                RELATED PRODUCTS
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
