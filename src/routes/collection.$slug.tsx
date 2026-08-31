import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ShoppingBag, ChevronDown } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import {
  fetchProducts,
  fetchCollectionByHandle,
  formatMoney,
  type CollectionSort,
  type ShopifyProduct,
} from "@/lib/shopify";

import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

function titleize(slug: string) {
  return slug
    .split("-")
    .map((s) => s[0]?.toUpperCase() + s.slice(1))
    .join(" ");
}

export const Route = createFileRoute("/collection/$slug")({
  component: CollectionPage,
  head: ({ params }) => {
    const title = titleize(params.slug);
    const url = `https://www.greyon.co/collection/${params.slug}`;
    const description = `Shop Greyon ${title.toLowerCase()}. Clean, cruelty-free makeup for every Indian skin tone. Free shipping over ₹599.`;
    return {
      meta: [
        { title: `${title} — Greyon` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} — Greyon` },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
});

/**
 * Site slug -> real Shopify collection handle(s). Shopify owns membership,
 * ordering and availability; the frontend only asks for the collection.
 */
const SHOPIFY_COLLECTIONS: Record<string, string[]> = {
  all: ["products"],
  "best-sellers": ["test"],
  bestsellers: ["test"],
  "best-selling": ["test"],
  new: ["new-arrivals"],
  "new-arrivals": ["new-arrivals"],
  "under-300": ["products"],
  lips: [
    "liquid-lipstick",
    "creme-moisturizing-lipstick",
    "glossy-moisturizing-lipsticks",
    "lip-gloss",
    "lip-balm",
  ],
  "premium-matte-liquid-lipstick": ["matte-liquid-lipcolor"],
  "regular-matte-liquid-lipcolor": ["regular-matte-liquid-lipstick"],
  "premium-moisturizing-lipstick": ["creme-moisturizing-lipstick"],
  "regular-moisturizing-lipstick": ["glossy-moisturizing-lipsticks"],
  "liquid-lip-gloss": ["liquid-lip-gloss"],
  "lip-gloss-stick": ["lip-gloss-stick"],
  "lip-balm": ["lip-balm"],
  "lip-gloss": ["lip-gloss"],
  "liquid-lipstick": ["liquid-lipstick"],
  eyes: ["eye-makeup"],
  "eye-makeup": ["eye-makeup"],
  skincare: ["facial-oil"],
  "facial-oil": ["facial-oil"],
  "facial-oils": ["facial-oil"],
  "clean-beauty": ["clean-beauty"],
};

// Slugs that point at a single product rather than a Shopify collection.
const SINGLE_PRODUCT_SLUGS: Record<string, string> = {
  mascara: "mascara",
  "greyon-smoky-eyeliner": "greyon-smoky-eyeliner",
  "vacuum-precision-eyeliner-intense-black": "vacuum-precision-eyeliner-intense-black",
  "anti-acne-facial-oil": "anti-acne-facial-oil",
  "anti-ageing-facial-oil": "anti-ageing-facial-oil",
};

const BEST_SELLER_SLUGS = ["best-sellers", "bestsellers", "best-selling"];
const NEW_SLUGS = ["new", "new-arrivals"];
const UNDER_200_SLUGS = ["under-300"];

/** Display titles that differ from the slug-derived name. */
const TITLE_OVERRIDES: Record<string, string> = {
  "regular-moisturizing-lipstick": "Moisturizing Lipstick",
  "premium-moisturizing-lipstick": "Moisturizing Lipstick",
  "liquid-lip-gloss": "Lip Gloss",
  "lip-gloss": "Lip Gloss",
  "premium-matte-liquid-lipstick": "Premium Matte Liquid Lipstick",
  "regular-matte-liquid-lipcolor": "Regular Matte Liquid Lipcolor",
  "premium-matte-liquid-lipcolor": "Premium Matte Liquid Lipstick",
};

/** Search fallback for slugs Shopify has no collection for. */
function buildQuery(slug: string): string | undefined {
  if (SHOPIFY_COLLECTIONS[slug] || SINGLE_PRODUCT_SLUGS[slug]) return undefined;
  const term = slug.replace(/-/g, " ");
  return `product_type:${term} OR tag:${term} OR title:${term}`;
}

async function loadCollection(slug: string): Promise<ShopifyProduct[]> {
  const handles = SHOPIFY_COLLECTIONS[slug];
  if (handles) {
    const sortKey: CollectionSort = BEST_SELLER_SLUGS.includes(slug)
      ? "BEST_SELLING"
      : NEW_SLUGS.includes(slug)
        ? "CREATED"
        : "MANUAL";
    const reverse = NEW_SLUGS.includes(slug);
    const results = await Promise.all(
      handles.map((h) => fetchCollectionByHandle(h, { sortKey, reverse })),
    );
    const seen = new Set<string>();
    const merged: ShopifyProduct[] = [];
    for (const c of results) {
      for (const p of c?.products ?? []) {
        if (seen.has(p.node.id)) continue;
        seen.add(p.node.id);
        merged.push(p);
      }
    }
    return merged;
  }

  const single = SINGLE_PRODUCT_SLUGS[slug];
  if (single) {
    const all = await fetchProducts(100);
    return all.filter((p) => p.node.handle === single);
  }

  return fetchProducts(50, buildQuery(slug));
}

function CollectionPage() {
  const { slug } = Route.useParams();
  const isBestSellers = BEST_SELLER_SLUGS.includes(slug);
  const isNew = NEW_SLUGS.includes(slug);
  const isUnder200 = UNDER_200_SLUGS.includes(slug);
  const title =
    slug === "all"
      ? "All products"
      : isBestSellers
        ? "Best sellers"
        : isNew
          ? "New arrivals"
          : isUnder200
            ? "Under ₹300"
            : titleize(slug);
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "title">("featured");

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["shopify-collection", slug],
    queryFn: () => loadCollection(slug),
    staleTime: 60_000,
  });

  const products = isUnder200
    ? allProducts.filter((p) => parseFloat(p.node.priceRange.minVariantPrice.amount) < 300)
    : allProducts;





  const sorted = [...products].sort((a, b) => {
    const pa = parseFloat(a.node.priceRange.minVariantPrice.amount);
    const pb = parseFloat(b.node.priceRange.minVariantPrice.amount);
    switch (sort) {
      case "price-asc":
        return pa - pb;
      case "price-desc":
        return pb - pa;
      case "title":
        return a.node.title.localeCompare(b.node.title);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="border-b border-border/60 bg-[#f1ece5]">
          <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
            <nav className="mb-6 text-xs uppercase tracking-[0.2em] text-fog">
              <Link to="/" className="hover:text-berry">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-charcoal">{title}</span>
            </nav>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-berry">Collection</p>
            <h1 className="font-display text-5xl leading-[1.05] text-charcoal md:text-7xl">
              {title}
            </h1>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-fog">
              Handpicked essentials for everyday care. Prices and availability update in real time.
            </p>
          </div>
        </section>

        <div className="sticky top-[65px] z-30 border-b border-border/60 bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-fog">
              {isLoading ? "Loading…" : `${sorted.length} product${sorted.length === 1 ? "" : "s"}`}
            </p>
            <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-charcoal">
              Sort
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="appearance-none rounded-sm border border-border bg-background py-1.5 pl-3 pr-8 text-xs uppercase tracking-[0.15em] text-charcoal focus:outline-none focus:ring-1 focus:ring-berry"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="title">Alphabetical</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-fog" />
              </div>
            </label>
          </div>
        </div>

        <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
          {isLoading ? (
            <div className="flex items-center justify-center py-24 text-fog">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : sorted.length === 0 ? (
            <div className="rounded-md border border-dashed border-border py-24 text-center">
              <p className="font-display text-2xl text-charcoal">No products found</p>
              <p className="mt-2 text-sm text-fog">
                Try a different collection, or ask me to create products for you.
              </p>
              <Link
                to="/collection/$slug"
                params={{ slug: "all" }}
                className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-berry underline"
              >
                Browse all products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
              {sorted.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ProductCard({ product }: { product: ShopifyProduct }) {
  const node = product.node;
  const img = node.images?.edges?.[0]?.node;
  const price = node.priceRange.minVariantPrice;
  const firstVariant = node.variants.edges[0]?.node;
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!firstVariant) return;
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions ?? [],
    });
    toast.success("Added to bag", { description: node.title });
  };

  return (
    <Link to="/product/$slug" params={{ slug: node.handle }} className="group">
      <div className="relative mb-4 aspect-square overflow-hidden bg-muted">
        {img && (
          <img
            src={img.url}
            alt={img.altText ?? node.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {node.variants.edges.length === 1 && firstVariant?.availableForSale && (
          <button
            onClick={handleAdd}
            disabled={isLoading}
            className="absolute inset-x-3 bottom-3 bg-charcoal text-ivory py-2.5 text-[10px] uppercase tracking-[0.2em] opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShoppingBag className="h-3 w-3" /> Quick add
          </button>
        )}
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-display text-lg leading-tight text-charcoal">{node.title}</div>
          {node.productType && (
            <div className="mt-0.5 text-xs text-fog uppercase tracking-widest">
              {node.productType}
            </div>
          )}
        </div>
        <div className="text-sm font-medium text-charcoal">
          {formatMoney(price.amount, price.currencyCode)}
        </div>
      </div>
    </Link>
  );
}
