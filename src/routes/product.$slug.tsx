import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Loader2,
  ShoppingBag,
  Star,
  ChevronRight,
  Share2,
  Sparkles,
  Leaf,
  Truck,
  Plus,
  Minus,
} from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import {
  fetchProductByHandle,
  fetchProducts,
  fetchBestSellers,
  formatMoney,
  type ShopifyProduct,
  type ShopifyProductNode,
  type ShopifyVariant,
} from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { WishlistButton } from "@/components/WishlistButton";
import { ProductRail } from "@/components/ProductRail";
import { getRecentlyViewed, recordRecentlyViewed } from "@/stores/recentlyViewed";

export const Route = createFileRoute("/product/$slug")({
  component: PDP,
  head: ({ params }) => {
    const name = params.slug
      .split("-")
      .map((s) => s[0]?.toUpperCase() + s.slice(1))
      .join(" ");
    const url = `https://radiant-revamp-palette.lovable.app/product/${params.slug}`;
    const description = `${name} by Greyon — shop live from our Shopify store with secure checkout.`;
    return {
      meta: [
        { title: `${name} — Greyon` },
        { name: "description", content: description },
        { property: "og:title", content: `${name} — Greyon` },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
});

function PDP() {
  const { slug } = Route.useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["shopify-product", slug],
    queryFn: () => fetchProductByHandle(slug),
    staleTime: 60_000,
  });

  return (
    <div className="min-h-screen bg-white text-charcoal">
      <SiteHeader />
      <main>
        {isLoading ? (
          <div className="flex items-center justify-center py-32 text-fog">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : !product ? (
          <div className="mx-auto max-w-2xl px-6 py-32 text-center">
            <h1 className="font-display text-4xl text-charcoal">Product not found</h1>
            <p className="mt-4 text-fog">
              This product isn't in your Shopify catalog. Browse everything else instead.
            </p>
            <Link
              to="/collection/$slug"
              params={{ slug: "all" }}
              className="mt-8 inline-block bg-berry px-6 py-3 text-xs uppercase tracking-[0.2em] text-ivory"
            >
              Shop all products
            </Link>
          </div>
        ) : (
          <ProductView product={product} />
        )}
      </main>
      <Footer />
    </div>
  );
}

function ProductView({ product }: { product: ShopifyProductNode }) {
  const images = product.images.edges.map((e) => e.node);
  const variants = product.variants.edges.map((e) => e.node);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant>(variants[0]);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const hasRealOptions = useMemo(
    () => product.options.some((o) => !(o.values.length === 1 && o.values[0] === "Default Title")),
    [product.options],
  );

  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const compareAtRaw = selectedVariant?.compareAtPrice;
  const compareAt =
    compareAtRaw && parseFloat(compareAtRaw.amount) > parseFloat(price.amount)
      ? compareAtRaw
      : null;
  const discountPct = compareAt
    ? Math.round(
        ((parseFloat(compareAt.amount) - parseFloat(price.amount)) /
          parseFloat(compareAt.amount)) *
          100,
      )
    : 0;

  /* Recently viewed — tracked locally, real products only */
  const [recentHandles, setRecentHandles] = useState<string[]>([]);
  useEffect(() => {
    setRecentHandles(getRecentlyViewed().filter((h) => h !== product.handle));
    recordRecentlyViewed(product.handle);
  }, [product.handle]);

  const { data: catalog = [] } = useQuery({
    queryKey: ["shopify-products-rail"],
    queryFn: () => fetchProducts(50),
    staleTime: 5 * 60_000,
  });
  const { data: bestSellers = [] } = useQuery({
    queryKey: ["shopify-bestsellers-rail"],
    queryFn: () => fetchBestSellers(12),
    staleTime: 5 * 60_000,
  });

  const alsoBuy = useMemo(() => {
    const pool: ShopifyProduct[] = [...bestSellers, ...catalog];
    const seen = new Set<string>([product.handle]);
    const out: ShopifyProduct[] = [];
    for (const p of pool) {
      if (seen.has(p.node.handle)) continue;
      seen.add(p.node.handle);
      out.push(p);
    }
    // prefer items from the same category first
    return out
      .sort((a, b) => {
        const score = (p: ShopifyProduct) =>
          p.node.productType && p.node.productType === product.productType ? 0 : 1;
        return score(a) - score(b);
      })
      .slice(0, 8);
  }, [bestSellers, catalog, product.handle, product.productType]);

  const recent = useMemo(
    () =>
      recentHandles
        .map((h) => catalog.find((p) => p.node.handle === h))
        .filter((p): p is ShopifyProduct => Boolean(p))
        .slice(0, 8),
    [recentHandles, catalog],
  );

  const handleAdd = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: qty,
      selectedOptions: selectedVariant.selectedOptions ?? [],
    });
    toast.success("Added to bag", { description: product.title });
  };

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 py-5 text-[11px] uppercase tracking-[0.2em] text-fog flex items-center gap-2">
        <Link to="/" className="hover:text-berry">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link
          to="/collection/$slug"
          params={{ slug: "all" }}
          className="hover:text-berry"
        >
          {product.productType || "Shop"}
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-charcoal">{product.title}</span>
      </div>

      <section className="mx-auto max-w-[1440px] px-5 sm:px-8 pb-16 lg:pb-24 grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="lg:col-span-7 grid grid-cols-12 gap-3">
          {images.length > 1 && (
            <div className="hidden lg:flex col-span-2 flex-col gap-3">
              {images.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden border-2 transition ${
                    activeImg === i ? "border-berry" : "border-transparent"
                  }`}
                >
                  <img
                    src={g.url}
                    alt={g.altText ?? ""}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
          <div
            className={`${images.length > 1 ? "col-span-12 lg:col-span-10" : "col-span-12"} bg-muted aspect-[4/5] overflow-hidden`}
          >
            {images[activeImg] && (
              <img
                src={images[activeImg].url}
                alt={images[activeImg].altText ?? product.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Buy box */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
          {product.productType && (
            <div className="text-[11px] uppercase tracking-[0.28em] text-berry mb-3">
              {product.productType}
            </div>
          )}
          <h1 className="font-display text-5xl lg:text-6xl leading-[0.95] tracking-[-0.03em] text-charcoal">
            {product.title}
          </h1>
          {product.description && (
            <>
              <p className="mt-4 text-fog leading-relaxed">
                {product.description.replace(/\s*Item\s+wt[:.]?\s*.*$/i, "").trim()}
              </p>
              {/Item\s+wt[:.]?\s*(.+)$/i.exec(product.description)?.[1] && (
                <p className="mt-3 text-sm font-semibold text-charcoal">
                  Item weight: {" "}
                  {/Item\s+wt[:.]?\s*(.+)$/i.exec(product.description)?.[1].trim()}
                </p>
              )}
            </>
          )}

          <div className="mt-6 flex flex-wrap items-baseline gap-3">
            <span className="text-2xl font-medium text-charcoal">
              {formatMoney(price.amount, price.currencyCode)}
            </span>
            {compareAt && (
              <>
                <span className="text-lg text-fog line-through">
                  {formatMoney(compareAt.amount, compareAt.currencyCode)}
                </span>
                <span className="bg-berry px-2 py-1 text-[11px] uppercase tracking-[0.18em] text-ivory">
                  Save {discountPct}%
                </span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-fog">Inclusive of all taxes</p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[11px] uppercase tracking-[0.18em] text-fog">
            {selectedVariant?.sku && <span>SKU: {selectedVariant.sku}</span>}
            <span>
              {selectedVariant?.availableForSale ? "In stock" : "Out of stock"}
            </span>
          </div>

          {/* Variants */}
          {hasRealOptions && variants.length > 1 && (
            <div className="mt-8 space-y-6">
              {product.options.map((option) => (
                <div key={option.name}>
                  <div className="mb-3 text-[11px] uppercase tracking-[0.22em] text-charcoal">
                    {option.name}:{" "}
                    <span className="text-berry">
                      {
                        selectedVariant?.selectedOptions.find((o) => o.name === option.name)
                          ?.value
                      }
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const matchingVariant = variants.find((v) =>
                        v.selectedOptions.every((o) =>
                          o.name === option.name
                            ? o.value === value
                            : o.value ===
                              selectedVariant?.selectedOptions.find((s) => s.name === o.name)
                                ?.value,
                        ),
                      );
                      const isActive =
                        selectedVariant?.selectedOptions.find((o) => o.name === option.name)
                          ?.value === value;
                      return (
                        <button
                          key={value}
                          disabled={!matchingVariant}
                          onClick={() => matchingVariant && setSelectedVariant(matchingVariant)}
                          className={`px-4 py-2 text-xs border transition ${
                            isActive
                              ? "border-charcoal bg-charcoal text-ivory"
                              : "border-border text-charcoal hover:border-charcoal"
                          } disabled:opacity-40 disabled:cursor-not-allowed`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add to bag */}
          <div className="mt-8 flex gap-3">
            <div className="flex items-center border border-charcoal">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="h-14 w-12 flex items-center justify-center hover:bg-muted"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQty(qty + 1)}
                className="h-14 w-12 flex items-center justify-center hover:bg-muted"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              disabled={isLoading || !selectedVariant?.availableForSale}
              className="flex-1 bg-berry text-ivory text-[13px] uppercase tracking-[0.18em] hover:bg-berry/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : !selectedVariant?.availableForSale ? (
                "Sold out"
              ) : (
                <>
                  Add to bag · {formatMoney(parseFloat(price.amount) * qty, price.currencyCode)}
                  <ShoppingBag className="h-4 w-4" />
                </>
              )}
            </button>
            <WishlistButton
              product={product}
              variant={selectedVariant}
              className="h-14 w-14 border border-charcoal hover:bg-charcoal hover:text-ivory transition-colors"
            />
          </div>

          <Link
            to="/wishlist"
            className="mt-3 inline-block text-[11px] uppercase tracking-[0.18em] text-fog hover:text-berry"
          >
            View wishlist
          </Link>

          {/* Trust row */}
          <div className="mt-8 pt-6 border-t border-border grid grid-cols-3 gap-4 text-[10px] uppercase tracking-[0.18em] text-fog">
            <div className="flex flex-col items-center text-center gap-2">
              <Truck className="h-4 w-4 text-berry" />
              Free ship over ₹599
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Sparkles className="h-4 w-4 text-berry" />
              Lab tested
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Leaf className="h-4 w-4 text-berry" />
              Vegan · CF
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-fog">
            <Share2 className="h-3 w-3" /> Share
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-24">
        <div className="border-t border-border pt-10">
          <h2 className="font-display text-3xl tracking-[-0.02em] text-charcoal">
            Reviews
          </h2>
          <div className="mt-4 flex items-center gap-3 text-sm text-fog">
            <div className="flex text-gold">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-4 w-4" />
              ))}
            </div>
            <span>No reviews yet — be the first to review {product.title}.</span>
          </div>
        </div>
      </section>

      {/* Legal information */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-24">
        <div className="grid gap-10 border-t border-border pt-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl tracking-[-0.02em] text-charcoal">
              Legal information
            </h2>
            <dl className="mt-6 space-y-3 text-sm text-fog">
              <LegalRow label="Country of origin" value="India" />
              <LegalRow label="Best before" value="24 months from packaging date" />
              <LegalRow
                label="Manufactured by"
                value="Greygon Cosmetics LLP, 1st Floor, Plot No. B-1 & B-2, Kh. No. 30/13, Street No. 4, Master Mohalla, Libaspur Industrial Area, Delhi-110042"
              />
              <LegalRow
                label="Marketed by"
                value="Greygon Cosmetics LLP, 2nd Floor, 17-A/38-39, Vardan Building, Ajmal Khan Road, Karol Bagh, Delhi-110005"
              />
              <LegalRow
                label="Customer care"
                value="+91 93192 34233 · info@greyon.co"
              />
            </dl>
          </div>
          <div>
            <h2 className="font-display text-3xl tracking-[-0.02em] text-charcoal">
              Shipping &amp; returns
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-fog leading-relaxed">
              <li>Free shipping on all orders above ₹599, across serviceable pin codes in India.</li>
              <li>Orders are processed in 1–2 business days; delivery takes 3–10 working days.</li>
              <li>
                Return or exchange requests can be raised within 3 days of delivery for unopened
                items in original packaging.
              </li>
              <li>Refunds are processed within 24–48 business hours of the return reaching us.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/shipping-returns"
                className="border border-charcoal px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-charcoal hover:bg-charcoal hover:text-ivory transition-colors"
              >
                Full policy
              </Link>
              <Link
                to="/faqs"
                className="border border-border px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-fog hover:text-berry"
              >
                FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProductRail
        eyebrow="Others also buy"
        title="Complete your routine"
        products={alsoBuy}
      />
      <ProductRail eyebrow="Recently viewed" title="Back to what you loved" products={recent} />
    </>
  );
}

function LegalRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.2em] text-charcoal">{label}</dt>
      <dd className="mt-1 leading-relaxed">{value}</dd>
    </div>
  );
}

