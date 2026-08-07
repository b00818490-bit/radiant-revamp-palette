import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ShopifyProductNode, ShopifyVariant } from "@/lib/shopify";

export interface WishlistItem {
  handle: string;
  title: string;
  image: string | null;
  price: { amount: string; currencyCode: string };
  variantId: string;
  variantTitle: string;
  selectedOptions: Array<{ name: string; value: string }>;
  product: ShopifyProductNode;
  addedAt: number;
}

interface WishlistStore {
  items: WishlistItem[];
  has: (handle: string) => boolean;
  toggle: (product: ShopifyProductNode, variant?: ShopifyVariant) => boolean;
  remove: (handle: string) => void;
  clear: () => void;
}

export function toWishlistItem(
  product: ShopifyProductNode,
  variant?: ShopifyVariant,
): WishlistItem {
  const v = variant ?? product.variants.edges[0]?.node;
  return {
    handle: product.handle,
    title: product.title,
    image: product.images.edges[0]?.node.url ?? null,
    price: v?.price ?? product.priceRange.minVariantPrice,
    variantId: v?.id ?? "",
    variantTitle: v?.title ?? "",
    selectedOptions: v?.selectedOptions ?? [],
    product,
    addedAt: Date.now(),
  };
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      has: (handle) => get().items.some((i) => i.handle === handle),

      toggle: (product, variant) => {
        const exists = get().items.some((i) => i.handle === product.handle);
        if (exists) {
          set({ items: get().items.filter((i) => i.handle !== product.handle) });
          return false;
        }
        set({ items: [toWishlistItem(product, variant), ...get().items] });
        return true;
      },

      remove: (handle) => set({ items: get().items.filter((i) => i.handle !== handle) }),

      clear: () => set({ items: [] }),
    }),
    {
      name: "greyon-wishlist",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
