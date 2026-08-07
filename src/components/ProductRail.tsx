import { Link } from "@tanstack/react-router";
import { formatMoney, type ShopifyProduct } from "@/lib/shopify";

export function ProductRail({
  title,
  eyebrow,
  products,
}: {
  title: string;
  eyebrow?: string;
  products: ShopifyProduct[];
}) {
  if (!products.length) return null;

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 py-14 lg:py-20">
        {eyebrow && (
          <p className="text-[11px] uppercase tracking-[0.28em] text-berry">{eyebrow}</p>
        )}
        <h2 className="mt-2 font-display text-3xl lg:text-4xl tracking-[-0.02em] text-charcoal">
          {title}
        </h2>

        <div className="mt-8 flex gap-5 overflow-x-auto pb-2 snap-x lg:grid lg:grid-cols-4 lg:overflow-visible">
          {products.slice(0, 8).map(({ node }) => {
            const image = node.images.edges[0]?.node;
            const variant = node.variants.edges[0]?.node;
            const price = variant?.price ?? node.priceRange.minVariantPrice;
            const compareAt =
              variant?.compareAtPrice &&
              parseFloat(variant.compareAtPrice.amount) > parseFloat(price.amount)
                ? variant.compareAtPrice
                : null;

            return (
              <Link
                key={node.id}
                to="/product/$slug"
                params={{ slug: node.handle }}
                className="group min-w-[62%] sm:min-w-[42%] lg:min-w-0 snap-start"
              >
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  {image && (
                    <img
                      src={image.url}
                      alt={image.altText ?? node.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <h3 className="mt-4 text-sm text-charcoal group-hover:text-berry transition-colors">
                  {node.title}
                </h3>
                <div className="mt-1 flex items-baseline gap-2 text-sm">
                  <span className="text-charcoal">
                    {formatMoney(price.amount, price.currencyCode)}
                  </span>
                  {compareAt && (
                    <span className="text-xs text-fog line-through">
                      {formatMoney(compareAt.amount, compareAt.currencyCode)}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
