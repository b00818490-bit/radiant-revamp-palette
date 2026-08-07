/**
 * Product data shaped like Shopify's product object.
 * On port, this file is replaced by Storefront API queries or Liquid loops
 * that hand back the same shape via `{{ product }}`.
 */
import prod1 from "@/assets/prod1.jpg";
import prod2 from "@/assets/prod2.jpg";
import prod3 from "@/assets/prod3.jpg";
import prod4 from "@/assets/prod4.jpg";

export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  compare_at_price?: number;
  available: boolean;
  swatch_color?: string;
  featured_image?: string;
}

export interface Product {
  handle: string;
  title: string;
  vendor: string;
  product_type: string;
  tags: string[];
  price: number;
  compare_at_price?: number;
  featured_image: string;
  images: string[];
  description: string;
  variants: ProductVariant[];
  rating?: number;
  reviews_count?: number;
  badge?: "new" | "bestseller" | "restock" | "limited";
}

export const products: Product[] = [
  {
    handle: "premium-matte-liquid-lipcolor",
    title: "Premium Matte Liquid Lipstick",
    vendor: "Greyon",
    product_type: "Lips",
    tags: ["new", "lips", "matte"],
    price: 839,
    featured_image: prod1,
    images: [prod1],
    description:
      "Our first matte liquid lip formulation: intense one-stroke colour with a lightweight, suede finish that stays comfortable and transfer-proof all day. 5 ml.",
    badge: "new",
    variants: [
      { id: "LLS1", title: "Pearly Pink - LLS1", price: 839, available: true, swatch_color: "#e8a7ae" },
      { id: "LLS3", title: "Roman Red - LLS3", price: 839, available: true, swatch_color: "#b81f2a" },
      { id: "LLS7", title: "Faded Brown - LLS7", price: 839, available: true, swatch_color: "#8a5a4a" },
      { id: "LLS9", title: "Blush Pink Red - LLS9", price: 839, available: true, swatch_color: "#c94960" },
      { id: "LLS11", title: "Pueblo Brown - LLS11", price: 839, available: true, swatch_color: "#a05540" },
      { id: "LLS13", title: "Light Brown - LLS13", price: 839, available: true, swatch_color: "#a97556" },
      { id: "LLS15", title: "Orangy Red - LLS15", price: 839, available: true, swatch_color: "#d94a2e" },
      { id: "LLS17", title: "Rich Violet - LLS17", price: 839, available: true, swatch_color: "#6a1f4a" },
      { id: "LLS19", title: "Dark Brown - LLS19", price: 839, available: true, swatch_color: "#5a3229" },
      { id: "LLS21", title: "Pearsian Pink - LLS21", price: 839, available: true, swatch_color: "#d47a8c" },
      { id: "LLS23", title: "Blush Red - LLS23", price: 839, available: true, swatch_color: "#b83c4a" },
      { id: "LLS25", title: "Brownish Red - LLS25", price: 839, available: true, swatch_color: "#8b3a34" },
    ],
  },
  {
    handle: "cheek-cushion-blush",
    title: "Cheek Cushion Blush",
    vendor: "Greyon",
    product_type: "Face",
    tags: ["bestseller", "face", "blush"],
    price: 32,
    featured_image: prod2,
    images: [prod2],
    description: "Cushion-diffused pigment for a lit-from-within finish.",
    rating: 4.8,
    reviews_count: 890,
    badge: "bestseller",
    variants: [
      { id: "cc-01", title: "N°01 Bloom", price: 32, available: true, swatch_color: "#f5b8b8" },
      { id: "cc-02", title: "N°02 Peony", price: 32, available: true, swatch_color: "#e88aab" },
      { id: "cc-03", title: "N°03 Sunset", price: 32, available: true, swatch_color: "#df7e35" },
    ],
  },
  {
    handle: "anti-acne-facial-oil",
    title: "Anti Acne Facial Oil",
    vendor: "Greyon",
    product_type: "Skincare",
    tags: ["skincare", "facial-oil", "hero"],
    price: 319,
    featured_image: prod3,
    images: [prod3],
    description: "Lightweight facial oil for everyday care.",
    rating: 4.9,
    reviews_count: 2140,
    variants: [{ id: "aa-30", title: "30 ml", price: 319, available: true }],
  },
  {
    handle: "feather-volume-mascara",
    title: "Feather Volume Mascara",
    vendor: "Greyon",
    product_type: "Eyes",
    tags: ["bestseller", "eyes"],
    price: 26,
    featured_image: prod4,
    images: [prod4],
    description: "Lifted, feathered lashes without flaking.",
    rating: 4.7,
    reviews_count: 1580,
    badge: "bestseller",
    variants: [
      { id: "fv-ink", title: "Ink Black", price: 26, available: true, swatch_color: "#0d0d0d" },
      { id: "fv-brn", title: "Cocoa", price: 26, available: true, swatch_color: "#3d2817" },
    ],
  },
];

export function findProduct(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}
