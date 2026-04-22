export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  details: string[];
  sizes: string[];
  images: string[];
  badge?: string;
  featured?: boolean;
  inStock: boolean;
  stripeProductId?: string;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "vx-phantom-hoodie",
    name: "VX Phantom Hoodie",
    price: 189,
    originalPrice: 240,
    category: "Hoodies",
    description:
      "The Phantom Hoodie redefines silhouette. Engineered from 420gsm heavyweight French terry with a raw-edge construction that refuses conformity. A statement piece for those who move in silence.",
    details: [
      "420gsm heavyweight French terry cotton",
      "Oversized dropped-shoulder fit",
      "Raw-edge hem and cuffs",
      "Embroidered VX logo patch",
      "Hidden kangaroo pocket",
      "Garment-washed for lived-in feel",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=90",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800&q=90",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=90",
    ],
    badge: "SALE",
    featured: true,
    inStock: true,
  },
  {
    id: "2",
    slug: "vx-ghost-tee",
    name: "VX Ghost Tee",
    price: 89,
    category: "T-Shirts",
    description:
      "Stripped back. Cut sharp. The Ghost Tee is our signature oversized silhouette in 220gsm Supima cotton. Clean lines with a deconstructed back panel that makes it unmistakably Veltrixwear.",
    details: [
      "220gsm Supima cotton",
      "Extended boxy fit",
      "Deconstructed back seam detail",
      "Screen-printed VX wordmark",
      "Pre-shrunk fabric",
      "Enzyme-washed finish",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=90",
    ],
    featured: true,
    inStock: true,
  },
  {
    id: "3",
    slug: "vx-void-cargo",
    name: "VX Void Cargo",
    price: 219,
    category: "Pants",
    description:
      "Utility meets futurism. The Void Cargo features a tapered silhouette with structured cargo pockets, tonal stitching, and a zip-off panel detail at the knee. Built for the city, engineered for style.",
    details: [
      "98% Cotton 2% Elastane ripstop",
      "Tapered fit with structured knee",
      "Detachable zip-panel at knee",
      "Six-pocket utility layout",
      "Reinforced bartack stitching",
      "Adjustable ankle cuff",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=90",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=90",
      "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=800&q=90",
    ],
    badge: "NEW",
    featured: true,
    inStock: true,
  },
  {
    id: "4",
    slug: "vx-eclipse-jacket",
    name: "VX Eclipse Jacket",
    price: 349,
    category: "Jackets",
    description:
      "The Eclipse Jacket is our flagship outerwear piece. A technical shell construction with contrast liner, hidden storm-zip, and signature VX reflective piping that catches the light in the dark.",
    details: [
      "3-layer technical shell",
      "YKK storm-zip closure",
      "Reflective VX piping detail",
      "Taped seams throughout",
      "Inner mesh liner",
      "Packable into chest pocket",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=90",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=90",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&q=90",
    ],
    badge: "NEW",
    featured: true,
    inStock: true,
  },
  {
    id: "5",
    slug: "vx-specter-shorts",
    name: "VX Specter Shorts",
    price: 119,
    category: "Shorts",
    description:
      "Above-the-knee length with a relaxed-through-thigh fit. The Specter Shorts use a washed nylon shell with an elastic waistband and tonal drawcord. Effortless summer uniform.",
    details: [
      "100% nylon shell",
      "Elastic waist with internal drawcord",
      "Two side slash pockets",
      "Veltrixwear heat-transfer label",
      "Moisture-wicking liner",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4571?w=800&q=90",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&q=90",
    ],
    inStock: true,
  },
  {
    id: "6",
    slug: "vx-signal-cap",
    name: "VX Signal Cap",
    price: 69,
    category: "Accessories",
    description:
      "Six-panel structured cap in a washed ripstop construction. Features a tonal VX embroidered logo and an adjustable strap. The finishing touch.",
    details: [
      "Washed ripstop shell",
      "Structured six-panel",
      "Tonal VX embroidery",
      "Adjustable metal buckle strap",
      "Sweat-wicking interior band",
    ],
    sizes: ["ONE SIZE"],
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=90",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=90",
    ],
    inStock: true,
  },
  {
    id: "7",
    slug: "vx-nocturne-zip",
    name: "VX Nocturne Zip",
    price: 159,
    category: "Hoodies",
    description:
      "The Nocturne Zip is a study in restraint. A minimal full-zip silhouette in 380gsm loopback fleece with a subtle raised VX logo on the chest. Designed to be worn over everything.",
    details: [
      "380gsm loopback fleece",
      "Full-length YKK zip",
      "Raised silicone VX logo",
      "Ribbed cuffs and hem",
      "Two front zip pockets",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=800&q=90",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=90",
    ],
    inStock: true,
  },
  {
    id: "8",
    slug: "vx-static-longsleeve",
    name: "VX Static Longsleeve",
    price: 109,
    originalPrice: 129,
    category: "T-Shirts",
    description:
      "A relaxed-fit longsleeve in heavyweight Supima jersey. The Static features a layered sleeve graphic and a dropped shoulder seam. Wardrobe workhorse.",
    details: [
      "240gsm Supima jersey",
      "Relaxed dropped-shoulder fit",
      "Sleeve-placed graphic print",
      "Ribbed collar and cuffs",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=90",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=90",
    ],
    badge: "SALE",
    inStock: true,
  },
];

export const categories = [
  "All",
  "Hoodies",
  "T-Shirts",
  "Pants",
  "Jackets",
  "Shorts",
  "Accessories",
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return products;
  return products.filter((p) => p.category === category);
}
