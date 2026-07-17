import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ShoppingBag,
  Star,
  ChevronDown,
  SlidersHorizontal,
  Plus,
  Eye,
  X,
  Sparkles,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

import prod1 from "@/assets/prod1.jpg";
import prod2 from "@/assets/prod2.jpg";
import prod3 from "@/assets/prod3.jpg";
import prod4 from "@/assets/prod4.jpg";
import catFace from "@/assets/cat-face.jpg";
import catLips from "@/assets/cat-lips.jpg";
import catSkin from "@/assets/cat-skin.jpg";
import catEyes from "@/assets/cat-eyes.jpg";

export const Route = createFileRoute("/collection/$slug")({
  component: CollectionPage,
  head: ({ params }) => {
    const title = titleize(params.slug);
    const url = `https://radiant-revamp-palette.lovable.app/collection/${params.slug}`;
    const description = `Shop Greyon ${title.toLowerCase()}. Filter by concern, ingredient, and price. Quick-add without leaving the page.`;
    return {
      meta: [
        { title: `${title} — Greyon` },
        { name: "description", content: description },
        { property: "og:title", content: `${title} — Greyon` },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:title", content: `${title} — Greyon` },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${title} — Greyon`,
            description,
            url,
          }),
        },
      ],
    };
  },
});

function titleize(slug: string) {
  return slug
    .split("-")
    .map((s) => s[0]?.toUpperCase() + s.slice(1))
    .join(" ");
}

type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  img: string;
  shades: { name: string; hex: string }[];
  concerns: string[];
  type: string;
  ingredients: string[];
  badge?: string;
  rating: number;
  reviews: number;
};

const PRODUCTS: Product[] = [
  {
    id: "velvet-matte",
    name: "Velvet Matte Lipstick",
    tagline: "12-hour weightless pigment",
    price: 28,
    img: prod1,
    shades: [
      { name: "Radiant", hex: "#9e2a5c" },
      { name: "Ember", hex: "#b8925a" },
      { name: "Fig", hex: "#5a2438" },
      { name: "Peach", hex: "#df7e35" },
    ],
    concerns: ["Dryness"],
    type: "Lips",
    ingredients: ["Hyaluronic Acid", "Squalane"],
    badge: "Bestseller",
    rating: 4.8,
    reviews: 2410,
  },
  {
    id: "cheek-cushion",
    name: "Cheek Cushion Blush",
    tagline: "Buildable, second-skin flush",
    price: 32,
    img: prod2,
    shades: [
      { name: "Peony", hex: "#dc7a91" },
      { name: "Poppy", hex: "#c74a3a" },
      { name: "Nectar", hex: "#df7e35" },
    ],
    concerns: ["Dullness"],
    type: "Face",
    ingredients: ["Niacinamide"],
    badge: "New",
    rating: 4.7,
    reviews: 1180,
  },
  {
    id: "rescue-glow",
    name: "Rescue Glow Serum",
    tagline: "5% niacinamide + peptides",
    price: 52,
    img: prod3,
    shades: [{ name: "30 ml", hex: "#faf6f1" }],
    concerns: ["Acne", "Dullness", "Redness"],
    type: "Skincare",
    ingredients: ["Niacinamide", "Peptides"],
    badge: "Trending",
    rating: 4.9,
    reviews: 3204,
  },
  {
    id: "feather-mascara",
    name: "Feather Volume Mascara",
    tagline: "Lifts, separates, holds",
    price: 26,
    img: prod4,
    shades: [
      { name: "Ink Black", hex: "#1a1a1a" },
      { name: "Espresso", hex: "#3a2418" },
    ],
    concerns: [],
    type: "Eyes",
    ingredients: ["Castor Oil"],
    badge: "Bestseller",
    rating: 4.6,
    reviews: 890,
  },
  {
    id: "dew-drops",
    name: "Dew Drops Highlighter",
    tagline: "Liquid glow, no glitter",
    price: 34,
    img: prod2,
    shades: [
      { name: "Champagne", hex: "#e8c98a" },
      { name: "Rose Gold", hex: "#d4967a" },
    ],
    concerns: ["Dullness"],
    type: "Face",
    ingredients: ["Squalane"],
    rating: 4.7,
    reviews: 612,
  },
  {
    id: "clarity-cleanser",
    name: "Clarity Gel Cleanser",
    tagline: "BHA + green tea, pH balanced",
    price: 28,
    img: prod3,
    shades: [{ name: "150 ml", hex: "#faf6f1" }],
    concerns: ["Acne", "Oiliness"],
    type: "Skincare",
    ingredients: ["Salicylic Acid", "Green Tea"],
    rating: 4.8,
    reviews: 1502,
  },
  {
    id: "silk-foundation",
    name: "Silk Skin Foundation",
    tagline: "Medium coverage, 24 shades",
    price: 42,
    img: prod1,
    shades: [
      { name: "Porcelain", hex: "#f2ddc4" },
      { name: "Honey", hex: "#d4a373" },
      { name: "Cocoa", hex: "#6b3f26" },
    ],
    concerns: ["Redness", "Dullness"],
    type: "Face",
    ingredients: ["Hyaluronic Acid", "Niacinamide"],
    badge: "New",
    rating: 4.5,
    reviews: 740,
  },
  {
    id: "night-repair",
    name: "Night Repair Cream",
    tagline: "Retinal + ceramides",
    price: 68,
    img: prod3,
    shades: [{ name: "50 ml", hex: "#faf6f1" }],
    concerns: ["Dryness", "Fine Lines"],
    type: "Skincare",
    ingredients: ["Retinal", "Ceramides"],
    rating: 4.9,
    reviews: 2103,
  },
];

const CONCERNS = ["Acne", "Dryness", "Dullness", "Oiliness", "Redness", "Fine Lines"];
const TYPES = ["Face", "Lips", "Eyes", "Skincare"];
const INGREDIENTS = [
  "Hyaluronic Acid",
  "Niacinamide",
  "Peptides",
  "Retinal",
  "Salicylic Acid",
  "Squalane",
  "Ceramides",
];
const SORTS = ["Bestsellers", "New", "Trending", "Price: Low → High", "Price: High → Low"];

const relatedCollections = [
  { name: "Face", img: catFace, slug: "face" },
  { name: "Lips", img: catLips, slug: "lips" },
  { name: "Eyes", img: catEyes, slug: "eyes" },
  { name: "Skincare", img: catSkin, slug: "skincare" },
];

function CollectionPage() {
  const { slug } = Route.useParams();
  const title = titleize(slug);

  const [concerns, setConcerns] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [ings, setIngs] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(80);
  const [sort, setSort] = useState<string>("Bestsellers");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = (set: string[], v: string, fn: (s: string[]) => void) =>
    fn(set.includes(v) ? set.filter((x) => x !== v) : [...set, v]);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.price <= price);
    if (concerns.length) list = list.filter((p) => p.concerns.some((c) => concerns.includes(c)));
    if (types.length) list = list.filter((p) => types.includes(p.type));
    if (ings.length) list = list.filter((p) => p.ingredients.some((i) => ings.includes(i)));
    switch (sort) {
      case "Price: Low → High":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "Price: High → Low":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "New":
        list = [...list].sort((a) => (a.badge === "New" ? -1 : 1));
        break;
      case "Trending":
        list = [...list].sort((a) => (a.badge === "Trending" ? -1 : 1));
        break;
      default:
        list = [...list].sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [concerns, types, ings, price, sort]);

  const activeCount = concerns.length + types.length + ings.length + (price < 80 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />


      {/* Breadcrumb + Hero intro */}
      <section className="border-b border-border/60 bg-[#f1ece5]">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
          <nav className="mb-6 text-xs uppercase tracking-[0.2em] text-fog">
            <Link to="/" className="hover:text-berry">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-charcoal">{title}</span>
          </nav>
          <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-berry">Collection</p>
              <h1 className="font-display text-5xl leading-[1.05] text-charcoal md:text-7xl">
                {title}
              </h1>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-fog">
                Dermatologist-tested formulas built for real skin. Filter by concern, ingredient, or
                price and shop with confidence.
              </p>
            </div>
            {/* Educational intro */}
            <div className="rounded-md border border-border bg-background p-6">
              <div className="flex items-center gap-2 text-berry">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.25em]">New here?</span>
              </div>
              <h3 className="mt-3 font-display text-2xl text-charcoal">What is a serum?</h3>
              <p className="mt-2 text-sm leading-relaxed text-fog">
                A lightweight, concentrated treatment that layers between cleanser and moisturizer.
                Choose one that targets your top concern — hydration, brightening, or clarity.
              </p>
              <a href="#" className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-[0.25em] text-berry">
                Read the guide →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-[65px] z-30 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <button
            onClick={() => setFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 rounded-sm border border-border px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-charcoal"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filters {activeCount ? `(${activeCount})` : ""}
          </button>
          <p className="hidden lg:block text-xs uppercase tracking-[0.2em] text-fog">
            {filtered.length} products
          </p>
          <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-charcoal">
            Sort
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none rounded-sm border border-border bg-background py-1.5 pl-3 pr-8 text-xs uppercase tracking-[0.15em] text-charcoal focus:outline-none focus:ring-1 focus:ring-berry"
              >
                {SORTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-fog" />
            </div>
          </label>
        </div>
      </div>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <FilterPanel
              concerns={concerns}
              types={types}
              ings={ings}
              price={price}
              toggleConcern={(v) => toggle(concerns, v, setConcerns)}
              toggleType={(v) => toggle(types, v, setTypes)}
              toggleIng={(v) => toggle(ings, v, setIngs)}
              setPrice={setPrice}
              onClear={() => {
                setConcerns([]);
                setTypes([]);
                setIngs([]);
                setPrice(80);
              }}
            />
          </aside>

          {/* Grid */}
          <div>
            {activeCount > 0 && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {[...concerns, ...types, ...ings].map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 rounded-full bg-charcoal px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-ivory"
                  >
                    {chip}
                    <button
                      onClick={() => {
                        if (concerns.includes(chip)) setConcerns(concerns.filter((c) => c !== chip));
                        if (types.includes(chip)) setTypes(types.filter((c) => c !== chip));
                        if (ings.includes(chip)) setIngs(ings.filter((c) => c !== chip));
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="rounded-md border border-dashed border-border py-24 text-center">
                <p className="font-display text-2xl text-charcoal">No matches</p>
                <p className="mt-2 text-sm text-fog">Try removing a filter to see more products.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onQuickView={() => setQuickView(p)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related collections */}
      <section className="border-t border-border/60 bg-[#f1ece5]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <h2 className="font-display text-3xl text-charcoal md:text-4xl">Explore the shop</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {relatedCollections.map((c) => (
              <Link
                key={c.slug}
                to="/collection/$slug"
                params={{ slug: c.slug }}
                className="group relative aspect-[3/4] overflow-hidden rounded-md"
              >
                <img
                  src={c.img}
                  alt={c.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-charcoal/25" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-2xl text-ivory">{c.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal/40" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-background p-6">
            <div className="mb-6 flex items-center justify-between">
              <p className="font-display text-2xl text-charcoal">Filters</p>
              <button onClick={() => setFiltersOpen(false)}>
                <X className="h-5 w-5 text-charcoal" />
              </button>
            </div>
            <FilterPanel
              concerns={concerns}
              types={types}
              ings={ings}
              price={price}
              toggleConcern={(v) => toggle(concerns, v, setConcerns)}
              toggleType={(v) => toggle(types, v, setTypes)}
              toggleIng={(v) => toggle(ings, v, setIngs)}
              setPrice={setPrice}
              onClear={() => {
                setConcerns([]);
                setTypes([]);
                setIngs([]);
                setPrice(80);
              }}
            />
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-8 w-full rounded-sm bg-berry py-3 text-xs uppercase tracking-[0.25em] text-ivory"
            >
              Show {filtered.length} products
            </button>
          </div>
        </div>
      )}

      {/* Quick view modal */}
      {quickView && <QuickView product={quickView} onClose={() => setQuickView(null)} />}
    </div>
  );
}

function FilterPanel({
  concerns,
  types,
  ings,
  price,
  toggleConcern,
  toggleType,
  toggleIng,
  setPrice,
  onClear,
}: {
  concerns: string[];
  types: string[];
  ings: string[];
  price: number;
  toggleConcern: (v: string) => void;
  toggleType: (v: string) => void;
  toggleIng: (v: string) => void;
  setPrice: (v: number) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.25em] text-charcoal">Refine</p>
        <button onClick={onClear} className="text-[11px] uppercase tracking-[0.2em] text-berry">
          Clear all
        </button>
      </div>

      <FilterGroup title="Concern">
        {CONCERNS.map((c) => (
          <Check key={c} label={c} checked={concerns.includes(c)} onChange={() => toggleConcern(c)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Product type">
        {TYPES.map((c) => (
          <Check key={c} label={c} checked={types.includes(c)} onChange={() => toggleType(c)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Key ingredient">
        {INGREDIENTS.map((c) => (
          <Check key={c} label={c} checked={ings.includes(c)} onChange={() => toggleIng(c)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        <input
          type="range"
          min={20}
          max={80}
          step={2}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full accent-berry"
        />
        <div className="mt-2 flex justify-between text-xs text-fog">
          <span>$20</span>
          <span className="text-charcoal">Up to ${price}</span>
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-border pb-6">
      <button
        onClick={() => setOpen(!open)}
        className="mb-4 flex w-full items-center justify-between text-xs uppercase tracking-[0.25em] text-charcoal"
      >
        {title}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && <div className="space-y-2.5">{children}</div>}
    </div>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-charcoal/85 hover:text-charcoal">
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
          checked ? "border-berry bg-berry" : "border-border bg-background"
        }`}
      >
        {checked && <span className="h-1.5 w-1.5 rounded-[1px] bg-ivory" />}
      </span>
      {label}
    </label>
  );
}

function ProductCard({ product, onQuickView }: { product: Product; onQuickView: () => void }) {
  const [shade, setShade] = useState(product.shades[0]);
  const [added, setAdded] = useState(false);

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-ivory px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-charcoal">
            {product.badge}
          </span>
        )}
        <button
          onClick={onQuickView}
          className="absolute right-3 top-3 hidden h-8 w-8 items-center justify-center rounded-full bg-ivory text-charcoal shadow-sm md:group-hover:flex"
          aria-label="Quick view"
        >
          <Eye className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            setAdded(true);
            setTimeout(() => setAdded(false), 1200);
          }}
          className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 rounded-sm bg-charcoal py-2.5 text-[11px] uppercase tracking-[0.25em] text-ivory opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
        >
          {added ? "Added ✓" : (<><Plus className="h-3.5 w-3.5" /> Quick add</>)}
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link
            to="/product/$slug"
            params={{ slug: product.id }}
            className="font-display text-lg leading-tight text-charcoal hover:text-berry"
          >
            {product.name}
          </Link>
          <p className="mt-0.5 text-xs text-fog">{product.tagline}</p>
        </div>
        <p className="whitespace-nowrap text-sm text-charcoal">${product.price}</p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {product.shades.slice(0, 5).map((s) => (
            <button
              key={s.name}
              onClick={() => setShade(s)}
              aria-label={s.name}
              className={`h-4 w-4 rounded-full ring-1 ring-inset ring-black/10 transition ${
                shade.name === s.name ? "ring-2 ring-offset-2 ring-charcoal ring-offset-background" : ""
              }`}
              style={{ backgroundColor: s.hex }}
            />
          ))}
          {product.shades.length > 5 && (
            <span className="text-[10px] text-fog">+{product.shades.length - 5}</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-fog">
          <Star className="h-3 w-3 fill-gold text-gold" />
          {product.rating} <span className="text-fog/60">({product.reviews.toLocaleString()})</span>
        </div>
      </div>
    </div>
  );
}

function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const [shade, setShade] = useState(product.shades[0]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-charcoal/50" onClick={onClose} />
      <div className="relative z-10 grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-md bg-background md:grid-cols-2">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-ivory text-charcoal"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="aspect-square bg-muted md:aspect-auto">
          <img src={product.img} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col p-8">
          {product.badge && (
            <span className="mb-2 text-[11px] uppercase tracking-[0.25em] text-berry">{product.badge}</span>
          )}
          <h3 className="font-display text-3xl leading-tight text-charcoal">{product.name}</h3>
          <p className="mt-1 text-sm text-fog">{product.tagline}</p>
          <div className="mt-3 flex items-center gap-3 text-xs text-fog">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              {product.rating}
            </div>
            <span>·</span>
            <span>{product.reviews.toLocaleString()} reviews</span>
          </div>
          <p className="mt-6 text-xl text-charcoal">${product.price}</p>

          <div className="mt-6">
            <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal">Shade — <span className="text-fog">{shade.name}</span></p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.shades.map((s) => (
                <button
                  key={s.name}
                  onClick={() => setShade(s)}
                  className={`h-8 w-8 rounded-full ring-1 ring-inset ring-black/10 ${
                    shade.name === s.name ? "ring-2 ring-offset-2 ring-charcoal ring-offset-background" : ""
                  }`}
                  style={{ backgroundColor: s.hex }}
                  aria-label={s.name}
                />
              ))}
            </div>
          </div>

          {product.concerns.length > 0 && (
            <div className="mt-6">
              <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal">Good for</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {product.concerns.map((c) => (
                  <span key={c} className="rounded-full bg-muted px-2.5 py-1 text-xs text-charcoal">{c}</span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto flex gap-3 pt-8">
            <button className="flex-1 rounded-sm bg-berry py-3 text-xs uppercase tracking-[0.25em] text-ivory hover:bg-berry/90">
              Add to bag
            </button>
            <Link
              to="/product/$slug"
              params={{ slug: product.id }}
              className="rounded-sm border border-charcoal px-4 py-3 text-xs uppercase tracking-[0.25em] text-charcoal"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
