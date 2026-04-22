"use client";

import { useEffect, useRef } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import clsx from "clsx";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCartStore();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  const total = totalPrice();

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={clsx(
          "fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-vx-dark border-l border-vx-border",
          "flex flex-col transition-transform duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-vx-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-vx-accent" />
            <h2 className="font-display text-xl tracking-widest">YOUR CART</h2>
            {items.length > 0 && (
              <span className="px-2 py-0.5 bg-vx-accent text-vx-black text-xs font-bold rounded-full">
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-vx-gray hover:text-vx-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6">
              <div className="w-16 h-16 border border-vx-border rounded-full flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-vx-gray" />
              </div>
              <p className="text-vx-gray text-sm tracking-wide">
                Your cart is empty
              </p>
              <button
                onClick={closeCart}
                className="btn-outline text-xs py-3 px-6"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-vx-border">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 px-6 py-4 hover:bg-vx-card/50 transition-colors"
                >
                  {/* Image */}
                  <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden bg-vx-card">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-vx-white truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-vx-gray mt-0.5">
                      Size: {item.size}
                    </p>
                    <p className="text-sm font-bold text-vx-accent mt-1">
                      ${item.product.price}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-vx-border">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="p-1.5 text-vx-gray hover:text-vx-white hover:bg-vx-card transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
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
                          className="p-1.5 text-vx-gray hover:text-vx-white hover:bg-vx-card transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.size)
                        }
                        className="p-1.5 text-vx-gray hover:text-vx-red transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Line total */}
                  <div className="text-sm font-bold text-vx-white flex-shrink-0">
                    ${(item.product.price * item.quantity).toFixed(0)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-vx-border px-6 py-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-vx-gray tracking-wide uppercase">
                Subtotal
              </span>
              <span className="font-bold text-lg">${total.toFixed(2)}</span>
            </div>
            <p className="text-xs text-vx-gray">
              Shipping & taxes calculated at checkout
            </p>
            <Link
              href="/cart"
              onClick={closeCart}
              className="btn-primary flex items-center justify-center gap-2 w-full"
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={closeCart}
              className="btn-ghost w-full text-center py-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
