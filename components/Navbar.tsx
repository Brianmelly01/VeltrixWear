"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { toggleCart, totalItems } = useCartStore();
  const count = totalItems();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-vx-black/90 backdrop-blur-md border-b border-vx-border"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo.png"
                alt="Veltrixwear"
                width={160}
                height={56}
                className="h-12 w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "text-xs font-semibold tracking-widest uppercase transition-colors duration-200",
                    pathname === link.href
                      ? "text-vx-accent"
                      : "text-vx-silver hover:text-vx-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleCart}
                className="relative p-2 text-vx-silver hover:text-vx-white transition-colors duration-200"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-vx-accent text-vx-black text-[10px] font-bold flex items-center justify-center rounded-full">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-vx-silver hover:text-vx-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-vx-black/95 backdrop-blur-xl lg:hidden transition-all duration-300",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "font-display text-5xl tracking-widest transition-colors duration-200",
                pathname === link.href
                  ? "text-vx-accent"
                  : "text-vx-white hover:text-vx-accent"
              )}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-8 w-16 h-px bg-vx-border" />
          <button
            onClick={() => {
              setMobileOpen(false);
              toggleCart();
            }}
            className="flex items-center gap-2 text-vx-silver hover:text-vx-white transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-sm tracking-widest uppercase font-medium">
              Cart {count > 0 && `(${count})`}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
