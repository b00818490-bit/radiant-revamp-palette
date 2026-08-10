import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  addLineToShopifyCart,
  createShopifyCart,
  fetchCart,
  removeLineFromShopifyCart,
  updateCartBuyerIdentity,
  updateShopifyCartLine,
  type BuyerIdentityInput,
  type CartCost,
  type CartDiscount,
  type ShopifyProduct,
} from "@/lib/shopify";

export interface CartItem {
  lineId: string | null;
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  /** Authoritative totals from Shopify (null until the cart exists). */
  cost: CartCost | null;
  discountCodes: CartDiscount[];
  isLoading: boolean;
  isSyncing: boolean;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "lineId">) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  refreshCost: () => Promise<void>;
  setBuyerIdentity: (buyer: BuyerIdentityInput) => Promise<void>;
  getCheckoutUrl: () => string | null;
}


export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      cost: null,
      discountCodes: [],

      isLoading: false,
      isSyncing: false,
      isOpen: false,

      setOpen: (open) => set({ isOpen: open }),

      addItem: async (item) => {
        const { items, cartId, clearCart } = get();
        const existingItem = items.find((i) => i.variantId === item.variantId);

        set({ isLoading: true });
        try {
          if (!cartId) {
            const result = await createShopifyCart({
              variantId: item.variantId,
              quantity: item.quantity,
            });
            if (result) {
              set({
                cartId: result.cartId,
                checkoutUrl: result.checkoutUrl,
                items: [{ ...item, lineId: result.lineId }],
                isOpen: true,
              });
            }
          } else if (existingItem) {
            const newQuantity = existingItem.quantity + item.quantity;
            if (!existingItem.lineId) return;
            const result = await updateShopifyCartLine(cartId, existingItem.lineId, newQuantity);
            if (result.success) {
              const currentItems = get().items;
              set({
                items: currentItems.map((i) =>
                  i.variantId === item.variantId ? { ...i, quantity: newQuantity } : i,
                ),
                isOpen: true,
              });
            } else if (result.cartNotFound) {
              clearCart();
            }
          } else {
            const result = await addLineToShopifyCart(cartId, {
              variantId: item.variantId,
              quantity: item.quantity,
            });
            if (result.success) {
              const currentItems = get().items;
              set({
                items: [...currentItems, { ...item, lineId: result.lineId ?? null }],
                isOpen: true,
              });
            } else if (result.cartNotFound) {
              clearCart();
            }
          }
        } catch (error) {
          console.error("Failed to add item:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(variantId);
          return;
        }
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;

        set({ isLoading: true });
        try {
          const result = await updateShopifyCartLine(cartId, item.lineId, quantity);
          if (result.success) {
            const currentItems = get().items;
            set({
              items: currentItems.map((i) => (i.variantId === variantId ? { ...i, quantity } : i)),
            });
          } else if (result.cartNotFound) {
            clearCart();
          }
        } catch (error) {
          console.error("Failed to update quantity:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (variantId) => {
        const { items, cartId, clearCart } = get();
        const item = items.find((i) => i.variantId === variantId);
        if (!item?.lineId || !cartId) return;

        set({ isLoading: true });
        try {
          const result = await removeLineFromShopifyCart(cartId, item.lineId);
          if (result.success) {
            const currentItems = get().items;
            const newItems = currentItems.filter((i) => i.variantId !== variantId);
            if (newItems.length === 0) clearCart();
            else set({ items: newItems });
          } else if (result.cartNotFound) {
            clearCart();
          }
        } catch (error) {
          console.error("Failed to remove item:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: () =>
        set({ items: [], cartId: null, checkoutUrl: null, cost: null, discountCodes: [] }),
      getCheckoutUrl: () => get().checkoutUrl,

      /** Pulls Shopify's authoritative totals (subtotal, tax, discounts). */
      refreshCost: async () => {
        const { cartId } = get();
        if (!cartId) return;
        try {
          const cart = await fetchCart(cartId);
          if (!cart) return;
          set({
            cost: cart.cost,
            discountCodes: cart.discountCodes ?? [],
            checkoutUrl: cart.checkoutUrl ?? get().checkoutUrl,
          });
        } catch (error) {
          console.error("Failed to refresh cart cost:", error);
        }
      },

      setBuyerIdentity: async (buyer) => {
        const { cartId } = get();
        if (!cartId) return;
        try {
          const cart = await updateCartBuyerIdentity(cartId, buyer);
          if (!cart) return;
          set({
            cost: cart.cost,
            discountCodes: cart.discountCodes ?? [],
            checkoutUrl: cart.checkoutUrl ?? get().checkoutUrl,
          });
        } catch (error) {
          console.error("Failed to set buyer identity:", error);
        }
      },

      syncCart: async () => {
        const { cartId, isSyncing, clearCart } = get();
        if (!cartId || isSyncing) return;

        set({ isSyncing: true });
        try {
          const cart = await fetchCart(cartId);
          if (!cart) {
            clearCart();
            return;
          }
          if (cart.totalQuantity === 0) {
            clearCart();
            return;
          }
          set({
            cost: cart.cost,
            discountCodes: cart.discountCodes ?? [],
            checkoutUrl: cart.checkoutUrl ?? get().checkoutUrl,
          });
        } catch (error) {
          console.error("Failed to sync cart with Shopify:", error);
        } finally {
          set({ isSyncing: false });
        }
      },

    }),
    {
      name: "shopify-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        cartId: state.cartId,
        checkoutUrl: state.checkoutUrl,
      }),
    },
  ),
);
