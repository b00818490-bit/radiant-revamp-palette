import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { searchProducts, formatMoney, type ShopifyProduct } from "@/lib/shopify";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): { q: string } => ({
    q: typeof search.q === "string" ? search.q : "",
  }),

  head: () => ({
    meta: [
      { title: "Search — Greyon Cosmetics" },
      {
        name: "description",
        content:
          "Search Greyon lipsticks, eyeliners, kajal, mascara and facial oils. Lab-tested, paraben-free beauty made in India.",
      },
      { property: "og:title", content: "Search — Greyon Cosmetics" },
      {
        property: "og:description",
        content: "Find your next Greyon product — clean colour and everyday care.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [term, setTerm] = useState(q);

  useEffect(() => setTerm(q), [q]);

  const { data: results = [], isFetching } = useQuery({
    queryKey: ["shopify-search", q],
    queryFn: () => searchProducts(q, 40),
    enabled: q.trim().length > 0,
    staleTime: 60_000,
  });

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3B3B3D]">
      <SiteHeader />
      <main className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8">
        <h1 className="font-display text-4xl sm:text-5xl">Search</h1>

        <form
          className="relative mt-6 max-w-xl"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ search: { q: term.trim() } });
          }}
        >
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#828284]" />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search shades, products, ingredients…"
            className="w-full rounded-sm border border-[#e6ded2] bg-white px-11 py-3.5 text-sm outline-none placeholder:text-[#828284] focus:border-[#3B3B3D]"
          />
        </form>

        {q ? (
          <p className="mt-6 text-sm text-[#828284]">
            {isFetching
              ? "Searching…"
              : `${results.length} result${results.length === 1 ? "" : "s"} for “${q}”`}
          </p>
        ) : (
          <p className="mt-6 text-sm text-[#828284]">
            Type a product, shade or ingredient to begin.
          </p>
        )}

        {isFetching ? (
          <div className="flex items-center justify-center py-24 opacity-60">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : q && results.length === 0 ? (
          <div className="py-20">
            <p className="font-display text-2xl">No results found for “{q}”.</p>
            <p className="mt-2 text-sm text-[#828284]">
              Try a shorter word, or browse everything we make.
            </p>
            <Link
              to="/collection/$slug"
              params={{ slug: "all" }}
              className="mt-6 inline-block border-b border-[#9E2A5C] pb-1 text-[11px] uppercase tracking-[0.22em] text-[#9E2A5C]"
            >
              Shop all products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {results.map((p) => (
              <ResultCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function ResultCard({ product }: { product: ShopifyProduct }) {
  const node = product.node;
  const img = node.images?.edges?.[0]?.node;
  const price = node.priceRange.minVariantPrice;

  return (
    <Link to="/product/$slug" params={{ slug: node.handle }} className="group">
      <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-[#eee9e2]">
        {img && (
          <img
            src={img.url}
            alt={img.altText ?? node.title}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-lg leading-tight">{node.title}</div>
          {node.productType && (
            <div className="mt-1 text-xs opacity-50">{node.productType}</div>
          )}
        </div>
        <div className="text-sm">{formatMoney(price.amount, price.currencyCode)}</div>
      </div>
    </Link>
  );
}
