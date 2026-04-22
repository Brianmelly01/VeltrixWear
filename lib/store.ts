"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/products";

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, size: string, quantity?: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size, quantity = 1) => {
        const items = get().items;
        const existing = items.find(
          (i) => i.product.id === product.id && i.size === size
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id && i.size === size
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
            isOpen: true,
          });
        } else {
          set({ items: [...items, { product, size, quantity }], isOpen: true });
        }
      },

      removeItem: (productId, size) =>
        set({
          items: get().items.filter(
            (i) => !(i.product.id === productId && i.size === size)
          ),
        }),

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId && i.size === size
              ? { ...i, quantity }
              : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        ),
    }),
    { name: "veltrix-cart" }
  )
);
