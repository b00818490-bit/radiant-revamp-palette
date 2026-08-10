import { Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { SectionProps, SectionSchema } from "@/theme/types";
import { fetchProducts, formatMoney, type ShopifyProduct } from "@/lib/shopify";

type Settings = {
  eyebrow: string;
  heading: string;
  background_color: string;
  text_color: string;
  layout: "grid-4" | "bento";
  query?: string;
  limit?: number;
  /** Collection the eyebrow links to — supplied by src/content/campaign.ts. */
  collection_slug?: string;
};

export const schema: SectionSchema = {
  name: "Featured products",
  settings: [
    { id: "eyebrow", type: "text", label: "Eyebrow", default: "Bestsellers" },
    { id: "heading", type: "text", label: "Heading", default: "Loved by our customers." },
    { id: "background_color", type: "color", label: "Background", default: "#faf6f1" },
    { id: "text_color", type: "color", label: "Text", default: "#3b3b3d" },
    {
      id: "layout",
      type: "select",
      label: "Layout",
      default: "bento",
      options: [
        { value: "grid-4", label: "Grid (4 up)" },
        { value: "bento", label: "Bento" },
      ],
    },
    {
      id: "query",
      type: "text",
      label: "Shopify query filter (e.g. tag:featured)",
      default: "",
    },
    { id: "limit", type: "range", label: "Products to show", default: 4, min: 2, max: 12, step: 1 },
    { id: "collection_slug", type: "text", label: "Featured collection", default: "best-sellers" },
  ],
};

export function Section({ settings }: SectionProps<Settings>) {
  const limit = settings.limit ?? 4;
  const query = settings.query?.trim() || undefined;
  const collectionSlug = settings.collection_slug?.trim() || "best-sellers";

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["shopify-products", "featured", limit, query],
    queryFn: () => fetchProducts(limit, query),
    staleTime: 60_000,
  });

  const gridClass =
    settings.layout === "bento"
      ? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5"
      : "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5";


  return (
    <section
      className="py-16 lg:py-24"
      style={{ backgroundColor: settings.background_color, color: settings.text_color }}
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="mb-10">
          {settings.eyebrow && (
            <Link
              to="/collection/$slug"
              params={{ slug: collectionSlug }}
              className="mb-3 inline-block text-[11px] uppercase tracking-[0.28em] text-accent transition-opacity hover:opacity-70"
            >
              {settings.eyebrow}
            </Link>
          )}
          <h2 className="max-w-3xl text-4xl leading-[0.95] sm:text-5xl lg:text-6xl text-ivory">
            {settings.heading}
          </h2>
        </div>


        {isLoading ? (
          <div className="flex items-center justify-center py-24 opacity-60">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="py-24 text-center opacity-70">
            <p className="text-lg">No products found</p>
            <p className="mt-2 text-sm opacity-70">
              No featured products are set right now.
            </p>
          </div>
        ) : (
          <div className={gridClass}>
            {products.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function categoryLabel(title: string, productType?: string) {
  const t = title.toLowerCase();
  if (t.includes("lipcolor") || t.includes("lipstick") || t.includes("lip color")) return "Lipstick";
  if (t.includes("lip gloss") || t.includes("lipgloss")) return "Lip gloss";
  if (t.includes("lip balm") || t.includes("lipbalm")) return "Lip balm";
  if (t.includes("lip liner")) return "Lip liner";
  if (t.includes("kajal")) return "Kajal";
  if (t.includes("mascara")) return "Mascara";
  if (t.includes("eyeliner") || t.includes("eye liner")) return "Eyeliner";
  if (t.includes("oil")) return "Facial oil";
  if (t.includes("serum")) return "Serum";
  if (!productType || productType.toLowerCase() === "cosmetics") return "";
  return productType;
}

function ProductCard({ product }: { product: ShopifyProduct }) {
  const node = product.node;
  const img = node.images?.edges?.[0]?.node;
  const price = node.priceRange.minVariantPrice;

  return (
    <Link to="/product/$slug" params={{ slug: node.handle }} className="group">
      <div
        className="relative mb-4 overflow-hidden aspect-square"
        style={{ backgroundColor: "rgba(130,130,132,0.2)" }}
      >

        {img && (
          <img
            src={img.url}
            alt={img.altText ?? node.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <span
          className="absolute bottom-3 left-3 right-3 bg-white py-3 text-center text-[11px] uppercase tracking-[0.2em] opacity-0 transition-opacity group-hover:opacity-100"
          style={{ color: "var(--color-charcoal)" }}
        >
          View · {formatMoney(price.amount, price.currencyCode)}
        </span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div
            className="text-lg leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {node.title}
          </div>
          {categoryLabel(node.title, node.productType) && (
            <div className="mt-1 text-xs text-ivory/70">
              {categoryLabel(node.title, node.productType)}
            </div>
          )}
        </div>
        <div className="text-sm">{formatMoney(price.amount, price.currencyCode)}</div>
      </div>
    </Link>
  );
}
