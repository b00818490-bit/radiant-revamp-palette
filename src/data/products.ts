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
  rating: number;
  reviews_count: number;
  badge?: "new" | "bestseller" | "restock" | "limited";
}

export const products: Product[] = [
  {
    handle: "velvet-matte-lipstick",
    title: "Velvet Matte Lipstick",
    vendor: "Greyon",
    product_type: "Lips",
    tags: ["new", "lips", "matte"],
    price: 28,
    featured_image: prod1,
    images: [prod1],
    description:
      "A featherweight matte with 8-hour comfortable wear. 92% naturally derived pigment.",
    rating: 4.9,
    reviews_count: 1240,
    badge: "new",
    variants: [
      { id: "vm-01", title: "N°01 Bare", price: 28, available: true, swatch_color: "#c99b8a" },
      { id: "vm-02", title: "N°02 Peony", price: 28, available: true, swatch_color: "#e5748d" },
      { id: "vm-03", title: "N°03 Coral", price: 28, available: true, swatch_color: "#df7e35" },
      { id: "vm-04", title: "N°04 Radiant", price: 28, available: true, swatch_color: "#dc2e70" },
      { id: "vm-05", title: "N°05 Wine", price: 28, available: false, swatch_color: "#7a1f3d" },
      { id: "vm-06", title: "N°06 Cocoa", price: 28, available: true, swatch_color: "#4a2a22" },
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
    handle: "rescue-glow-serum",
    title: "Rescue Glow Serum",
    vendor: "Greyon",
    product_type: "Skincare",
    tags: ["skincare", "serum", "hero"],
    price: 52,
    featured_image: prod3,
    images: [prod3],
    description: "Niacinamide 5% + hyaluronic acid. 30 ml.",
    rating: 4.9,
    reviews_count: 2140,
    variants: [{ id: "rs-30", title: "30 ml", price: 52, available: true }],
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
