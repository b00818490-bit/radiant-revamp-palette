/**
 * Collection data shaped like Shopify's collection object.
 */
import catLips from "@/assets/cat-lips.jpg";
import catFace from "@/assets/cat-face.jpg";
import catSkin from "@/assets/cat-skin.jpg";
import catEyes from "@/assets/cat-eyes.jpg";

export interface Collection {
  handle: string;
  title: string;
  description: string;
  featured_image: string;
  accent_color: string;
  product_handles: string[];
}

export const collections: Collection[] = [
  {
    handle: "face",
    title: "Face",
    description: "Complexion products that feel like skin.",
    featured_image: catFace,
    accent_color: "#df7e35",
    product_handles: ["cheek-cushion-blush"],
  },
  {
    handle: "lips",
    title: "Lips",
    description: "Weightless color, all-day wear.",
    featured_image: catLips,
    accent_color: "#9e2a5c",
    product_handles: ["velvet-matte-lipstick"],
  },
  {
    handle: "eyes",
    title: "Eyes",
    description: "Definition without the drama.",
    featured_image: catEyes,
    accent_color: "#16a1d4",
    product_handles: ["feather-volume-mascara"],
  },
  {
    handle: "skincare",
    title: "Skincare",
    description: "Actives your derm would approve.",
    featured_image: catSkin,
    accent_color: "#7cb342",
    product_handles: ["rescue-glow-serum"],
  },
];

export function findCollection(handle: string): Collection | undefined {
  return collections.find((c) => c.handle === handle);
}
