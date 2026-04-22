"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Lock,
  CreditCard,
  Loader2,
} from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCartStore();
  const [loading, setLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const subtotal = totalPrice();
  const shipping = subtotal >= 200 ? 0 : 12.99;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setLoading(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
            size: i.size,
            image: i.product.images[0],
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setCheckoutError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-vx-black pt-20 flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-20 h-20 border border-vx-border flex items-center justify-center">
          <ShoppingBag className="w-9 h-9 text-vx-gray" />
        </div>
        <div className="text-center">
          <h1 className="font-display text-4xl tracking-wider mb-2">
            EMPTY CART
          </h1>
          <p className="text-vx-gray text-sm">
            Your cart is empty. Start browsing our collection.
          </p>
        </div>
        <Link href="/shop" className="btn-primary flex items-center gap-2">
          Shop Now <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vx-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-vx-accent text-xs font-bold tracking-[0.3em] uppercase mb-2">
            ✦ Review
          </p>
          <h1 className="font-display text-6xl tracking-wider">YOUR CART</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">
            {/* Column headers */}
            <div className="hidden md:grid grid-cols-5 gap-4 pb-3 border-b border-vx-border">
              <div className="col-span-2 text-[10px] font-bold tracking-widest uppercase text-vx-gray">
                Product
              </div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-vx-gray text-center">
                Size
              </div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-vx-gray text-center">
                Qty
              </div>
              <div className="text-[10px] font-bold tracking-widest uppercase text-vx-gray text-right">
                Total
              </div>
            </div>

            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center p-4 bg-vx-card border border-vx-border"
              >
                {/* Product */}
                <div className="col-span-2 flex items-center gap-4">
                  <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden bg-vx-muted">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-semibold text-sm text-vx-white hover:text-vx-accent transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-vx-gray text-xs mt-1">
                      {item.product.category}
                    </p>
                    <p className="text-vx-accent font-bold text-sm mt-1">
                      ${item.product.price}
                    </p>
                  </div>
                </div>

                {/* Size */}
                <div className="flex md:justify-center">
                  <span className="px-3 py-1 border border-vx-border text-xs font-bold tracking-widest">
                    {item.size}
                  </span>
                </div>

                {/* Quantity */}
                <div className="flex md:justify-center">
                  <div className="flex items-center border border-vx-border">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.size,
                          item.quantity - 1
                        )
                      }
                      className="p-2 text-vx-gray hover:text-vx-white hover:bg-vx-muted transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.size,
                          item.quantity + 1
                        )
                      }
                      className="p-2 text-vx-gray hover:text-vx-white hover:bg-vx-muted transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Total + remove */}
                <div className="flex items-center justify-between md:justify-end gap-4">
                  <span className="font-bold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="p-1.5 text-vx-gray hover:text-vx-red transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4">
              <Link
                href="/shop"
                className="flex items-center gap-2 text-vx-gray hover:text-vx-white text-sm transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-vx-gray hover:text-vx-red text-xs tracking-widest uppercase font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-vx-card border border-vx-border p-6 sticky top-24">
              <h2 className="font-display text-2xl tracking-wider mb-6">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-vx-gray">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-vx-gray">Shipping</span>
                  <span
                    className={
                      shipping === 0 ? "text-vx-accent font-medium" : ""
                    }
                  >
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[11px] text-vx-gray">
                    Add ${(200 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="w-full h-px bg-vx-border my-5" />

              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span className="text-vx-accent">${total.toFixed(2)}</span>
              </div>

              {checkoutError && (
                <div className="mb-4 p-3 bg-vx-red/10 border border-vx-red text-vx-red text-xs">
                  {checkoutError}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Proceed to Checkout
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-vx-gray">
                <Lock className="w-3.5 h-3.5" />
                <span className="text-xs">Secured by Stripe</span>
              </div>

              {/* Payment icons */}
              <div className="flex items-center justify-center gap-2 mt-3">
                {["VISA", "MC", "AMEX", "PayPal"].map((p) => (
                  <span
                    key={p}
                    className="px-2 py-1 border border-vx-border text-[9px] font-bold text-vx-gray tracking-widest"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
