import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Veltrixwear — Futuristic Streetwear",
    template: "%s | Veltrixwear",
  },
  description:
    "Premium futuristic streetwear. Engineered for those who move differently. Shop hoodies, tees, cargos, and jackets.",
  keywords: ["streetwear", "futuristic fashion", "premium clothing", "veltrixwear"],
  openGraph: {
    title: "Veltrixwear — Futuristic Streetwear",
    description: "Premium futuristic streetwear. Engineered for those who move differently.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="noise bg-vx-black text-vx-white antialiased">
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
