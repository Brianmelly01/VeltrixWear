"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Eye } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/lib/products";
import clsx from "clsx";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCartStore();
  const defaultSize = product.sizes[2] || product.sizes[0];

  return (
    <div className="group relative bg-vx-card border border-vx-border card-hover overflow-hidden">
      {/* Badge */}
      {product.badge && (
        <div
          className={clsx(
            "absolute top-3 left-3 z-10 px-2 py-1 text-[10px] font-bold tracking-widest uppercase",
            product.badge === "SALE"
              ? "bg-vx-red text-white"
              : "bg-vx-accent text-vx-black"
          )}
        >
          {product.badge}
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-vx-muted">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-vx-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            href={`/product/${product.slug}`}
            className="w-10 h-10 bg-vx-white/10 backdrop-blur-sm border border-vx-white/20 flex items-center justify-center text-white hover:bg-vx-accent hover:border-vx-accent hover:text-vx-black transition-all duration-200"
            aria-label="View product"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => addItem(product, defaultSize)}
            className="w-10 h-10 bg-vx-white/10 backdrop-blur-sm border border-vx-white/20 flex items-center justify-center text-white hover:bg-vx-accent hover:border-vx-accent hover:text-vx-black transition-all duration-200"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] text-vx-gray tracking-widest uppercase mb-1">
          {product.category}
        </p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-sm text-vx-white group-hover:text-vx-accent transition-colors duration-200 leading-tight">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-vx-accent font-bold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-vx-gray text-xs line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
