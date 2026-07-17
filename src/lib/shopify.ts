/**
 * Shopify Storefront API client.
 * All product/cart data flows through here.
 */
import { toast } from "sonner";

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "greyoncosmetics.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "12abd9682c67f8e13b306e86ad92f8a6";

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  vendor?: string;
  productType?: string;
  tags?: string[];
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: ShopifyImage }> };
  variants: { edges: Array<{ node: ShopifyVariant }> };
  options: Array<{ name: string; values: string[] }>;
}

export interface ShopifyProduct {
  node: ShopifyProductNode;
}

export async function storefrontApiRequest<T = unknown>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<{ data?: T } | undefined> {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description:
        "Shopify API access requires an active billing plan. Visit https://admin.shopify.com to upgrade.",
    });
    return;
  }

  if (!response.ok) {
    throw new Error(`Shopify HTTP ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(`Shopify: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`);
  }
  return data;
}

/* ----------------------------- Product queries ---------------------------- */

const PRODUCT_FIELDS = `
  id
  title
  description
  handle
  vendor
  productType
  tags
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 8) { edges { node { url altText } } }
  variants(first: 20) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        availableForSale
        selectedOptions { name value }
      }
    }
  }
  options { name values }
`;

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) { ${PRODUCT_FIELDS} }
  }
`;

export async function fetchProducts(first = 24, query?: string): Promise<ShopifyProduct[]> {
  const res = await storefrontApiRequest<{ products: { edges: ShopifyProduct[] } }>(PRODUCTS_QUERY, {
    first,
    query: query ?? null,
  });
  return res?.data?.products?.edges ?? [];
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProductNode | null> {
  const res = await storefrontApiRequest<{ product: ShopifyProductNode | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
  );
  return res?.data?.product ?? null;
}

/* --------------------------------- Cart ---------------------------------- */

export const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) { id totalQuantity }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

type UserError = { field: string[] | null; message: string };
function isCartNotFoundError(userErrors: UserError[]): boolean {
  return userErrors.some(
    (e) =>
      e.message.toLowerCase().includes("cart not found") ||
      e.message.toLowerCase().includes("does not exist"),
  );
}

export interface CartLineInput {
  variantId: string;
  quantity: number;
}

export async function createShopifyCart(
  item: CartLineInput,
): Promise<{ cartId: string; checkoutUrl: string; lineId: string } | null> {
  const data = await storefrontApiRequest<{
    cartCreate: {
      cart: {
        id: string;
        checkoutUrl: string;
        lines: { edges: Array<{ node: { id: string } }> };
      } | null;
      userErrors: UserError[];
    };
  }>(CART_CREATE_MUTATION, {
    input: { lines: [{ quantity: item.quantity, merchandiseId: item.variantId }] },
  });

  const payload = data?.data?.cartCreate;
  if (payload?.userErrors?.length) {
    console.error("Cart creation failed:", payload.userErrors);
    return null;
  }
  const cart = payload?.cart;
  if (!cart?.checkoutUrl) return null;
  const lineId = cart.lines.edges[0]?.node?.id;
  if (!lineId) return null;
  return { cartId: cart.id, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId };
}

export async function addLineToShopifyCart(
  cartId: string,
  item: CartLineInput,
): Promise<{ success: boolean; lineId?: string; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest<{
    cartLinesAdd: {
      cart: { lines: { edges: Array<{ node: { id: string; merchandise: { id: string } } }> } } | null;
      userErrors: UserError[];
    };
  }>(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity: item.quantity, merchandiseId: item.variantId }],
  });

  const userErrors = data?.data?.cartLinesAdd?.userErrors ?? [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length) {
    console.error("Add line failed:", userErrors);
    return { success: false };
  }
  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges ?? [];
  const newLine = lines.find((l) => l.node.merchandise.id === item.variantId);
  return { success: true, lineId: newLine?.node?.id };
}

export async function updateShopifyCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest<{
    cartLinesUpdate: { userErrors: UserError[] };
  }>(CART_LINES_UPDATE_MUTATION, { cartId, lines: [{ id: lineId, quantity }] });
  const userErrors = data?.data?.cartLinesUpdate?.userErrors ?? [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length) {
    console.error("Update line failed:", userErrors);
    return { success: false };
  }
  return { success: true };
}

export async function removeLineFromShopifyCart(
  cartId: string,
  lineId: string,
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest<{
    cartLinesRemove: { userErrors: UserError[] };
  }>(CART_LINES_REMOVE_MUTATION, { cartId, lineIds: [lineId] });
  const userErrors = data?.data?.cartLinesRemove?.userErrors ?? [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length) {
    console.error("Remove line failed:", userErrors);
    return { success: false };
  }
  return { success: true };
}

/* ------------------------------- Formatting ------------------------------ */

export function formatMoney(amount: string | number, currencyCode = "USD"): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currencyCode} ${value.toFixed(2)}`;
  }
}
