"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCartStore();
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (!cleared) {
      clearCart();
      setCleared(true);
    }
  }, [clearCart, cleared]);

  return (
    <div className="min-h-screen bg-vx-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-vx-accent/10 border-2 border-vx-accent flex items-center justify-center mx-auto mb-8">
          <Check className="w-10 h-10 text-vx-accent" strokeWidth={3} />
        </div>

        <p className="text-vx-accent text-xs font-bold tracking-[0.3em] uppercase mb-3">
          ✦ Order Confirmed
        </p>
        <h1 className="font-display text-5xl tracking-wider mb-4">
          YOU&apos;RE GOOD.
        </h1>
        <p className="text-vx-silver text-sm leading-relaxed">
          Your order has been placed and you&apos;ll receive a confirmation email
          shortly. We&apos;ll notify you when it ships.
        </p>

        {sessionId && (
          <div className="mt-6 p-4 bg-vx-card border border-vx-border">
            <p className="text-[10px] text-vx-gray tracking-widest uppercase mb-1">
              Order Reference
            </p>
            <p className="text-xs font-mono text-vx-silver truncate">
              {sessionId}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link href="/shop" className="btn-primary flex items-center gap-2">
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/" className="btn-outline flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-vx-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-vx-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
