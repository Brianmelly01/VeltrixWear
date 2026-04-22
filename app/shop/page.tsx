"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products, categories, getProductsByCategory } from "@/lib/products";
import type { Product } from "@/lib/products";
import clsx from "clsx";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("default");
  const [filtered, setFiltered] = useState<Product[]>(products);

  useEffect(() => {
    let result = getProductsByCategory(activeCategory);
    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    setFiltered(result);
  }, [activeCategory, sortBy]);

  return (
    <div className="min-h-screen bg-vx-black pt-20">
      {/* Header */}
      <div className="border-b border-vx-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-vx-accent text-xs font-bold tracking-[0.3em] uppercase mb-2">
            ✦ Collection
          </p>
          <h1 className="font-display text-6xl lg:text-8xl tracking-wider">
            THE SHOP
          </h1>
          <p className="text-vx-gray mt-3 text-sm">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Filters bar */}
      <div className="sticky top-16 lg:top-20 z-30 bg-vx-dark/95 backdrop-blur-md border-b border-vx-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-4">
            {/* Categories */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={clsx(
                    "px-4 py-2 text-xs font-semibold tracking-widest uppercase whitespace-nowrap transition-all duration-200",
                    activeCategory === cat
                      ? "bg-vx-accent text-vx-black"
                      : "text-vx-gray hover:text-vx-white border border-transparent hover:border-vx-border"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-vx-gray" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border border-vx-border text-vx-silver text-xs tracking-widest uppercase px-3 py-2 focus:outline-none focus:border-vx-accent transition-colors cursor-pointer"
              >
                <option value="default">Sort: Featured</option>
                <option value="price-asc">Price: Low-High</option>
                <option value="price-desc">Price: High-Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <X className="w-12 h-12 text-vx-border" />
            <p className="text-vx-gray">No products found in this category.</p>
            <button
              onClick={() => setActiveCategory("All")}
              className="btn-outline py-2 px-6 text-xs"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={i < 4}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-vx-black pt-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-vx-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
