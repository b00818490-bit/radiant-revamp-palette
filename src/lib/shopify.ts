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
  compareAtPrice?: { amount: string; currencyCode: string } | null;
  availableForSale: boolean;
  currentlyNotInStock?: boolean;
  sku?: string | null;
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
  availableForSale?: boolean;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: ShopifyImage }> };
  variants: { edges: Array<{ node: ShopifyVariant }> };
  options: Array<{ name: string; values: string[] }>;
}

export interface ShopifyProduct {
  node: ShopifyProductNode;
}

export interface ShopifyCollection {
  handle: string;
  title: string;
  description: string;
  image?: ShopifyImage | null;
}

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface CartCost {
  subtotalAmount: MoneyV2;
  totalAmount: MoneyV2;
  totalTaxAmount?: MoneyV2 | null;
  totalDutyAmount?: MoneyV2 | null;
}

export interface CartDiscount {
  code: string;
  applicable: boolean;
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
  availableForSale
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 8) { edges { node { url altText } } }
  variants(first: 20) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        compareAtPrice { amount currencyCode }
        availableForSale
        currentlyNotInStock
        sku

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

/**
 * Full-text product search. Shopify's `query` arg matches title, description,
 * product_type, tag, vendor and variant fields; we add a trailing `*` so
 * partial words ("mat") still match ("matte").
 */
export async function searchProducts(term: string, first = 40): Promise<ShopifyProduct[]> {
  const cleaned = term.trim();
  if (!cleaned) return [];
  const words = cleaned.split(/\s+/).filter(Boolean);
  const query = words.map((w) => `${w.replace(/["\\:()]/g, "")}*`).join(" AND ");
  const results = await fetchProducts(first, query);
  if (results.length > 0) return results;
  // Fallback: client-side contains match over the catalogue.
  const all = await fetchProducts(100);
  const lower = cleaned.toLowerCase();
  return all.filter((p) =>
    [p.node.title, p.node.productType, p.node.description]
      .filter(Boolean)
      .some((f) => String(f).toLowerCase().includes(lower)),
  );
}

const BEST_SELLERS_QUERY = `
  query GetBestSellers($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

/** Real best sellers, ordered by Shopify's own BEST_SELLING sort. */
export async function fetchBestSellers(first = 12): Promise<ShopifyProduct[]> {
  const res = await storefrontApiRequest<{ products: { edges: ShopifyProduct[] } }>(
    BEST_SELLERS_QUERY,
    { first },
  );
  return res?.data?.products?.edges ?? [];
}

const NEWEST_QUERY = `
  query GetNewest($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      edges { node { ${PRODUCT_FIELDS} } }
    }
  }
`;

/** Newest products, ordered by Shopify creation date. */
export async function fetchNewest(first = 12): Promise<ShopifyProduct[]> {
  const res = await storefrontApiRequest<{ products: { edges: ShopifyProduct[] } }>(NEWEST_QUERY, {
    first,
  });
  return res?.data?.products?.edges ?? [];
}

/* --------------------------- Collection queries --------------------------- */

const COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges { node { handle title description image { url altText } } }
    }
  }
`;

/** Every collection published to the storefront sales channel. */
export async function fetchCollections(first = 60): Promise<ShopifyCollection[]> {
  const res = await storefrontApiRequest<{
    collections: { edges: Array<{ node: ShopifyCollection }> };
  }>(COLLECTIONS_QUERY, { first });
  return res?.data?.collections?.edges?.map((e) => e.node) ?? [];
}

const COLLECTION_BY_HANDLE_QUERY = `
  query GetCollection($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
    collection(handle: $handle) {
      handle
      title
      description
      image { url altText }
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges { node { ${PRODUCT_FIELDS} } }
      }
    }
  }
`;

export type CollectionSort = "MANUAL" | "BEST_SELLING" | "CREATED" | "PRICE" | "TITLE";

export interface CollectionWithProducts extends ShopifyCollection {
  products: ShopifyProduct[];
}

/**
 * Live collection read straight from Shopify — membership, order and
 * availability are all owned by the store.
 */
export async function fetchCollectionByHandle(
  handle: string,
  opts: { first?: number; sortKey?: CollectionSort; reverse?: boolean } = {},
): Promise<CollectionWithProducts | null> {
  const res = await storefrontApiRequest<{
    collection:
      | (ShopifyCollection & { products: { edges: ShopifyProduct[] } })
      | null;
  }>(COLLECTION_BY_HANDLE_QUERY, {
    handle,
    first: opts.first ?? 100,
    sortKey: opts.sortKey ?? "MANUAL",
    reverse: opts.reverse ?? false,
  });
  const c = res?.data?.collection;
  if (!c) return null;
  return {
    handle: c.handle,
    title: c.title,
    description: c.description,
    image: c.image ?? null,
    products: c.products?.edges ?? [],
  };
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProductNode | null> {
  const res = await storefrontApiRequest<{ product: ShopifyProductNode | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
  );
  return res?.data?.product ?? null;
}

/* --------------------------------- Cart ---------------------------------- */

const CART_FIELDS = `
  id
  totalQuantity
  checkoutUrl
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
    totalTaxAmount { amount currencyCode }
    totalDutyAmount { amount currencyCode }
  }
  discountCodes { code applicable }
`;

export const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) { ${CART_FIELDS} }
  }
`;

export interface CartSnapshot {
  id: string;
  totalQuantity: number;
  checkoutUrl: string;
  cost: CartCost;
  discountCodes: CartDiscount[];
}

/** Authoritative cart totals (subtotal, tax, discounts) from Shopify. */
export async function fetchCart(cartId: string): Promise<CartSnapshot | null> {
  const res = await storefrontApiRequest<{ cart: CartSnapshot | null }>(CART_QUERY, { id: cartId });
  return res?.data?.cart ?? null;
}

const CART_BUYER_IDENTITY_MUTATION = `
  mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

export interface BuyerIdentityInput {
  email?: string;
  phone?: string;
  countryCode?: string;
  deliveryAddress?: {
    firstName?: string;
    lastName?: string;
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    zip?: string;
    country?: string;
    phone?: string;
  };
}

/** Attaches buyer email/phone/address to the Shopify cart before handoff. */
export async function updateCartBuyerIdentity(
  cartId: string,
  buyer: BuyerIdentityInput,
): Promise<CartSnapshot | null> {
  const { deliveryAddress, ...rest } = buyer;
  const buyerIdentity: Record<string, unknown> = { ...rest };
  if (deliveryAddress) {
    buyerIdentity["deliveryAddressPreferences"] = [{ deliveryAddress }];
  }
  const res = await storefrontApiRequest<{
    cartBuyerIdentityUpdate: { cart: CartSnapshot | null; userErrors: UserError[] };
  }>(CART_BUYER_IDENTITY_MUTATION, { cartId, buyerIdentity });
  const payload = res?.data?.cartBuyerIdentityUpdate;
  if (payload?.userErrors?.length) {
    console.error("Buyer identity update failed:", payload.userErrors);
  }
  return payload?.cart ?? null;
}


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
