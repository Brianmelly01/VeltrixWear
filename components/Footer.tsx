"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, Youtube, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "Hoodies", href: "/shop?category=Hoodies" },
    { label: "T-Shirts", href: "/shop?category=T-Shirts" },
    { label: "Jackets", href: "/shop?category=Jackets" },
    { label: "Accessories", href: "/shop?category=Accessories" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  Support: [
    { label: "FAQ", href: "#" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Size Guide", href: "#" },
  ],
};

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "X / Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-vx-dark border-t border-vx-border mt-24">
      {/* Newsletter */}
      <div className="border-b border-vx-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-3xl tracking-widest text-vx-white">
                JOIN THE MOVEMENT
              </h3>
              <p className="text-vx-gray text-sm mt-1">
                Get early access to drops, exclusive offers and no noise.
              </p>
            </div>
            <form
              className="flex w-full lg:w-auto gap-0"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="vx-input flex-1 lg:w-64"
              />
              <button
                type="submit"
                className="btn-primary px-6 py-3 text-xs whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="Veltrixwear"
                width={140}
                height={50}
                className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
              />
            </Link>
            <p className="text-vx-gray text-sm leading-relaxed max-w-xs">
              Futuristic streetwear engineered for those who move in silence and
              speak through style.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-vx-border flex items-center justify-center text-vx-gray hover:border-vx-accent hover:text-vx-accent transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[10px] font-bold tracking-widest uppercase text-vx-gray mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-vx-silver hover:text-vx-accent transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 pt-8 border-t border-vx-border">
          <p className="text-vx-gray text-xs tracking-wide">
            © {new Date().getFullYear()} Veltrixwear. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-vx-gray text-xs hover:text-vx-silver transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-vx-gray text-xs hover:text-vx-silver transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
