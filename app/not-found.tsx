import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-vx-black flex flex-col items-center justify-center text-center px-4">
      <p className="text-vx-accent text-xs font-bold tracking-[0.3em] uppercase mb-4">
        404 — Not Found
      </p>
      <h1 className="font-display text-[clamp(5rem,20vw,15rem)] leading-none tracking-wider text-vx-border">
        404
      </h1>
      <p className="text-vx-gray text-sm mt-4 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex gap-4 mt-10">
        <Link href="/" className="btn-primary flex items-center gap-2">
          Go Home <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href="/shop" className="btn-outline">
          Shop
        </Link>
      </div>
    </div>
  );
}
