import { Star } from "lucide-react";
import type { SectionProps, SectionSchema } from "@/theme/types";
import { findProduct } from "@/data/products";

type Settings = {
  eyebrow: string;
  heading: string;
  background_color: string;
  text_color: string;
  layout: "grid-4" | "bento";
};

type BlockSettings = {
  product_handle: string;
  featured_size?: "normal" | "tall";
};

export const schema: SectionSchema = {
  name: "Featured products",
  settings: [
    { id: "eyebrow", type: "text", label: "Eyebrow", default: "Bestsellers" },
    { id: "heading", type: "text", label: "Heading", default: "The ones everyone keeps reordering." },
    { id: "background_color", type: "color", label: "Background", default: "#3b3b3d" },
    { id: "text_color", type: "color", label: "Text", default: "#faf6f1" },
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
  ],
  max_blocks: 8,
  blocks: [
    {
      type: "product",
      name: "Product",
      settings: [
        { id: "product_handle", type: "product", label: "Product" },
        {
          id: "featured_size",
          type: "select",
          label: "Card size",
          default: "normal",
          options: [
            { value: "normal", label: "Normal" },
            { value: "tall", label: "Tall" },
          ],
        },
      ],
    },
  ],
};

export function Section({ settings, blocks = [] }: SectionProps<Settings, BlockSettings>) {
  const items = blocks
    .map((b) => ({ block: b, product: findProduct(b.settings.product_handle) }))
    .filter((x): x is { block: typeof blocks[number]; product: NonNullable<ReturnType<typeof findProduct>> } => Boolean(x.product));

  const gridClass =
    settings.layout === "bento"
      ? "grid grid-cols-2 gap-4 lg:grid-cols-12 lg:gap-6 auto-rows-fr"
      : "grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6";

  return (
    <section
      className="py-20 lg:py-28"
      style={{ backgroundColor: settings.background_color, color: settings.text_color }}
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="mb-12">
          {settings.eyebrow && (
            <div className="mb-3 text-[11px] uppercase tracking-[0.28em]" style={{ color: "var(--color-primary)" }}>
              {settings.eyebrow}
            </div>
          )}
          <h2 className="max-w-3xl text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
            {settings.heading}
          </h2>
        </div>

        <div className={gridClass}>
          {items.map(({ block, product }, i) => {
            const tall = settings.layout === "bento" && (block.settings.featured_size === "tall" || i === 0);
            const span = settings.layout === "bento" ? (tall ? "lg:col-span-6 lg:row-span-2" : "lg:col-span-3") : "";
            return (
              <a
                key={product.handle}
                href={`/product/${product.handle}`}
                className={`group ${span}`}
              >
                <div
                  className={`relative mb-4 overflow-hidden ${tall ? "aspect-[4/6]" : "aspect-[4/5]"}`}
                  style={{ backgroundColor: "rgba(130,130,132,0.2)" }}
                >
                  <img
                    src={product.featured_image}
                    alt={product.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span
                      className="absolute left-3 top-3 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em]"
                      style={{
                        backgroundColor:
                          product.badge === "new" ? "var(--color-yellow)" : "var(--color-primary)",
                        color: product.badge === "new" ? "var(--color-charcoal)" : "#fff",
                      }}
                    >
                      {product.badge}
                    </span>
                  )}
                  <span
                    className="absolute bottom-3 left-3 right-3 bg-white py-3 text-center text-[11px] uppercase tracking-[0.2em] opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ color: "var(--color-charcoal)" }}
                  >
                    Quick add · ${product.price}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                      {product.title}
                    </div>
                    <div className="mt-1 text-xs opacity-50">{product.variants[0]?.title}</div>
                    <div className="mt-2 flex items-center gap-1 text-[11px] opacity-60">
                      <Star className="h-3 w-3 fill-current" style={{ color: "var(--color-yellow)" }} />
                      {product.rating} · {product.reviews_count.toLocaleString()} reviews
                    </div>
                  </div>
                  <div className="text-sm">${product.price}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
