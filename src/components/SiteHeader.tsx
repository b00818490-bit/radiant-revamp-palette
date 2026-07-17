import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  Menu,
  X,
  Home,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Package,
} from "lucide-react";

import prod1 from "@/assets/prod1.jpg";
import prod2 from "@/assets/prod2.jpg";
import prod3 from "@/assets/prod3.jpg";
import prod4 from "@/assets/prod4.jpg";
import catFace from "@/assets/cat-face.jpg";
import catLips from "@/assets/cat-lips.jpg";
import catEyes from "@/assets/cat-eyes.jpg";
import catSkin from "@/assets/cat-skin.jpg";
import logoAsset from "@/assets/greyon-logo.png.asset.json";

type MegaKey = "shop" | "face" | "lips" | "eyes" | "skincare";

type MegaConfig = {
  key: MegaKey;
  label: string;
  intro: { title: string; body: string; href: string };
  columns: { heading: string; links: { label: string; slug: string }[] }[];
  feature: { img: string; tag: string; title: string; href: string };
};

const MEGA: MegaConfig[] = [
  {
    key: "shop",
    label: "Shop",
    intro: {
      title: "Shop everything",
      body: "Clean color and serious skincare — 92 products, six routines.",
      href: "/collection/all",
    },
    columns: [
      {
        heading: "By category",
        links: [
          { label: "Face", slug: "face" },
          { label: "Lips", slug: "lips" },
          { label: "Eyes", slug: "eyes" },
          { label: "Skincare", slug: "skincare" },
          { label: "Tools & brushes", slug: "tools" },
        ],
      },
      {
        heading: "Shop by edit",
        links: [
          { label: "Best sellers", slug: "best-sellers" },
          { label: "New arrivals", slug: "new" },
          { label: "Trending", slug: "trending" },
          { label: "Under $30", slug: "under-30" },
          { label: "Gift sets", slug: "gifts" },
        ],
      },
    ],
    feature: {
      img: prod1,
      tag: "This month",
      title: "The Velvet Matte drop",
      href: "/product/velvet-matte",
    },
  },
  {
    key: "face",
    label: "Face",
    intro: {
      title: "Complexion, corrected.",
      body: "Skin-first foundations, blurring primers, and cushion blush.",
      href: "/collection/face",
    },
    columns: [
      {
        heading: "Base",
        links: [
          { label: "Foundation", slug: "foundation" },
          { label: "Skin tint", slug: "skin-tint" },
          { label: "Concealer", slug: "concealer" },
          { label: "Primer", slug: "primer" },
          { label: "Setting powder", slug: "powder" },
        ],
      },
      {
        heading: "Colour",
        links: [
          { label: "Blush", slug: "blush" },
          { label: "Bronzer", slug: "bronzer" },
          { label: "Highlighter", slug: "highlighter" },
          { label: "Contour", slug: "contour" },
        ],
      },
    ],
    feature: {
      img: catFace,
      tag: "New",
      title: "Cushion Blush in 8 shades",
      href: "/collection/face",
    },
  },
  {
    key: "lips",
    label: "Lips",
    intro: {
      title: "Pigment that performs.",
      body: "12-hour matte, plumping gloss, and the balm that started it all.",
      href: "/collection/lips",
    },
    columns: [
      {
        heading: "Colour",
        links: [
          { label: "Matte lipstick", slug: "matte" },
          { label: "Satin lipstick", slug: "satin" },
          { label: "Lip stain", slug: "stain" },
          { label: "Lip liner", slug: "liner" },
        ],
      },
      {
        heading: "Care",
        links: [
          { label: "Lip balm", slug: "balm" },
          { label: "Plumping gloss", slug: "gloss" },
          { label: "Overnight mask", slug: "mask" },
          { label: "Exfoliator", slug: "scrub" },
        ],
      },
    ],
    feature: {
      img: catLips,
      tag: "Bestseller",
      title: "Velvet Matte in Berry Noir",
      href: "/product/velvet-matte",
    },
  },
  {
    key: "eyes",
    label: "Eyes",
    intro: {
      title: "Definition, on your terms.",
      body: "Buildable shadows and lash-loving formulas your ophthalmologist would approve.",
      href: "/collection/eyes",
    },
    columns: [
      {
        heading: "Colour",
        links: [
          { label: "Eyeshadow palette", slug: "palette" },
          { label: "Cream shadow", slug: "cream-shadow" },
          { label: "Eyeliner", slug: "eyeliner" },
          { label: "Brow pencil", slug: "brow" },
        ],
      },
      {
        heading: "Lashes",
        links: [
          { label: "Mascara", slug: "mascara" },
          { label: "Lash serum", slug: "lash-serum" },
          { label: "Curler", slug: "curler" },
        ],
      },
    ],
    feature: {
      img: catEyes,
      tag: "New",
      title: "The Everyday Palette",
      href: "/collection/eyes",
    },
  },
  {
    key: "skincare",
    label: "Skincare",
    intro: {
      title: "Serious skincare.",
      body: "Dermatologist-tested actives, prebiotic barriers, and clinical proof.",
      href: "/collection/skincare",
    },
    columns: [
      {
        heading: "Routine",
        links: [
          { label: "Cleanser", slug: "cleanser" },
          { label: "Toner", slug: "toner" },
          { label: "Serum", slug: "serum" },
          { label: "Moisturizer", slug: "moisturizer" },
          { label: "SPF", slug: "spf" },
        ],
      },
      {
        heading: "By concern",
        links: [
          { label: "Acne", slug: "acne" },
          { label: "Dryness", slug: "dryness" },
          { label: "Dark spots", slug: "dark-spots" },
          { label: "Fine lines", slug: "fine-lines" },
          { label: "Sensitive skin", slug: "sensitive" },
        ],
      },
    ],
    feature: {
      img: catSkin,
      tag: "Award",
      title: "Rescue Glow Serum",
      href: "/product/glow-serum",
    },
  },
];

const POPULAR = [
  "Velvet matte lipstick",
  "Glow serum",
  "Cushion blush",
  "Barrier cream",
  "Everyday palette",
  "SPF 45",
];

const SEARCH_PRODUCTS = [
  { name: "Velvet Matte Lipstick", cat: "Lips · Bestseller", price: "$28", img: prod1, slug: "velvet-matte" },
  { name: "Rescue Glow Serum", cat: "Skincare · Award", price: "$48", img: prod2, slug: "glow-serum" },
  { name: "Cushion Blush", cat: "Face · New", price: "$32", img: prod3, slug: "cushion-blush" },
  { name: "Barrier Cream Rich", cat: "Skincare", price: "$42", img: prod4, slug: "barrier-cream" },
];

export function SiteHeader({
  announcement = "Free shipping over $50 · Dermatologist tested · 30-day happiness guarantee",
  pro = false,
  cartCount = 2,
}: {
  announcement?: string | false;
  pro?: boolean;
  cartCount?: number;
}) {
  const [openMega, setOpenMega] = useState<MegaKey | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMega(null);
        setSearchOpen(false);
        setMobileOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const filtered = q
    ? SEARCH_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase()),
      )
    : SEARCH_PRODUCTS;

  return (
    <>
      {announcement && (
        <div className="bg-[#3B3B3D] text-white text-[11px] uppercase tracking-[0.22em] py-2.5 overflow-hidden">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 text-center">
            <span className="h-1 w-1 rounded-full bg-[#9E2A5C]" />
            <span className="truncate">{announcement}</span>
          </div>
        </div>
      )}

      <header
        className="sticky top-0 z-40 border-b border-[#e6ded2] bg-[#FAF6F1]/95 backdrop-blur"
        onMouseLeave={() => setOpenMega(null)}
      >
        {/* Top row */}
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 md:px-8 lg:grid-cols-[1fr_auto_1fr]">
          {/* Left: mobile menu + desktop primary nav */}
          <div className="flex min-w-0 items-center gap-6">
            <button
              className="lg:hidden text-[#3B3B3D]"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav className="hidden lg:flex items-center gap-6 text-[13px] uppercase tracking-[0.14em]">
              {MEGA.map((m) => (
                <button
                  key={m.key}
                  onMouseEnter={() => setOpenMega(m.key)}
                  onFocus={() => setOpenMega(m.key)}
                  onClick={() => setOpenMega(openMega === m.key ? null : m.key)}
                  className={`relative py-2 transition-colors hover:text-[#9E2A5C] ${
                    openMega === m.key ? "text-[#9E2A5C]" : "text-[#3B3B3D]"
                  }`}
                  aria-expanded={openMega === m.key}
                >
                  {m.label}
                  {openMega === m.key && (
                    <span className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-[#9E2A5C]" />
                  )}
                </button>
              ))}
              <Link
                to="/collection/$slug"
                params={{ slug: "best-sellers" }}
                onMouseEnter={() => setOpenMega(null)}
                className="inline-flex items-center gap-1.5 text-[#9E2A5C] hover:text-[#3B3B3D]"
              >
                <TrendingUp className="h-3.5 w-3.5" /> Best sellers
              </Link>
            </nav>
          </div>

          {/* Center: logo */}
          <Link
            to="/"
            aria-label="Greyon — produits de beauté"
            className="justify-self-center flex items-center gap-2"
          >
            <img
              src={logoAsset.url}
              alt="Greyon"
              className="h-9 w-auto md:h-10"
            />
            {pro && (
              <span className="rounded-sm bg-[#3B3B3D] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-widest text-white">
                Pro
              </span>
            )}
          </Link>

          {/* Right: search + utility */}
          <div className="flex items-center justify-end gap-3 sm:gap-4">
            {/* Inline search on desktop */}
            <div ref={searchRef} className="relative hidden md:block">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 rounded-sm border border-[#e6ded2] bg-white/70 px-3 py-2 text-xs text-[#828284] transition hover:border-[#3B3B3D] hover:text-[#3B3B3D]"
                aria-label="Search"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">Search products…</span>
                <span className="hidden lg:inline text-[10px] uppercase tracking-widest text-[#828284]">
                  ⌘K
                </span>
              </button>
              {searchOpen && (
                <SearchDropdown
                  q={q}
                  setQ={setQ}
                  results={filtered}
                  onClose={() => setSearchOpen(false)}
                />
              )}
            </div>

            <button
              onClick={() => setSearchOpen(true)}
              className="md:hidden text-[#3B3B3D]"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            <a
              href="#account"
              className="hidden sm:inline-flex text-[#3B3B3D] hover:text-[#9E2A5C]"
              aria-label="Account"
            >
              <User className="h-4 w-4" />
            </a>
            <a
              href="#wishlist"
              className="hidden sm:inline-flex text-[#3B3B3D] hover:text-[#9E2A5C]"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" />
            </a>
            <Link to="/checkout" className="relative text-[#3B3B3D] hover:text-[#9E2A5C]" aria-label="Cart">
              <ShoppingBag className="h-5 w-5 sm:h-4 sm:w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#9E2A5C] text-[10px] font-medium text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mega menu panel */}
        {openMega && (
          <div
            className="absolute inset-x-0 top-full border-t border-[#e6ded2] bg-white shadow-lg"
            onMouseEnter={() => setOpenMega(openMega)}
          >
            <MegaPanel
              config={MEGA.find((m) => m.key === openMega)!}
              onClose={() => setOpenMega(null)}
            />
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <MobileDrawer onClose={() => setMobileOpen(false)} />
      )}

      {/* Mobile bottom nav */}
      <MobileBottomNav
        cartCount={cartCount}
        onSearch={() => setSearchOpen(true)}
      />
    </>
  );
}

function MegaPanel({
  config,
  onClose,
}: {
  config: MegaConfig;
  onClose: () => void;
}) {
  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-8 py-10 lg:grid-cols-[1.1fr_1fr_1fr_1.2fr]">
      <div>
        <span className="text-[11px] uppercase tracking-widest text-[#B8925A]">
          {config.label}
        </span>
        <h3 className="mt-3 font-display text-3xl leading-tight">
          {config.intro.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#828284]">
          {config.intro.body}
        </p>
        <Link
          to="/collection/$slug"
          params={{ slug: config.key }}
          onClick={onClose}
          className="mt-6 inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-[#9E2A5C] hover:text-[#3B3B3D]"
        >
          Shop all {config.label} <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
      {config.columns.map((col) => (
        <div key={col.heading}>
          <p className="text-[11px] uppercase tracking-widest text-[#828284]">
            {col.heading}
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {col.links.map((l) => (
              <li key={l.slug}>
                <Link
                  to="/collection/$slug"
                  params={{ slug: l.slug }}
                  onClick={onClose}
                  className="text-[#3B3B3D] transition hover:text-[#9E2A5C]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link
        to="/product/$slug"
        params={{ slug: "velvet-matte" }}
        onClick={onClose}
        className="group relative overflow-hidden rounded-sm"
      >
        <img
          src={config.feature.img}
          alt={config.feature.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3B3B3D]/70 via-transparent" />
        <div className="absolute inset-x-4 bottom-4 text-white">
          <span className="rounded-sm bg-[#9E2A5C] px-2 py-0.5 text-[10px] uppercase tracking-widest">
            {config.feature.tag}
          </span>
          <p className="mt-2 font-display text-xl leading-tight">
            {config.feature.title}
          </p>
          <span className="mt-1 inline-flex items-center gap-1 text-[11px] uppercase tracking-widest">
            Shop now <ChevronRight className="h-3 w-3" />
          </span>
        </div>
      </Link>
    </div>
  );
}

function SearchDropdown({
  q,
  setQ,
  results,
  onClose,
}: {
  q: string;
  setQ: (v: string) => void;
  results: typeof SEARCH_PRODUCTS;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-x-0 top-[calc(var(--header-h,4rem)+40px)] z-50 mx-auto max-w-2xl px-4 md:absolute md:right-0 md:left-auto md:top-full md:mt-2 md:w-[520px] md:max-w-none md:px-0">
      <div className="overflow-hidden rounded-sm border border-[#e6ded2] bg-white shadow-2xl">
        <div className="relative border-b border-[#e6ded2]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#828284]" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search shades, ingredients, routines…"
            className="w-full bg-transparent px-11 py-4 text-sm outline-none placeholder:text-[#828284]"
          />
          <button
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#828284] hover:text-[#3B3B3D]"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {!q && (
          <div className="border-b border-[#e6ded2] p-4">
            <p className="text-[10px] uppercase tracking-widest text-[#828284]">
              Popular searches
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {POPULAR.map((p) => (
                <button
                  key={p}
                  onClick={() => setQ(p)}
                  className="rounded-sm border border-[#e6ded2] px-3 py-1.5 text-xs hover:border-[#3B3B3D]"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="max-h-[60vh] overflow-y-auto p-2">
          <p className="px-2 pt-2 pb-1 text-[10px] uppercase tracking-widest text-[#828284]">
            Products
          </p>
          {results.length === 0 && (
            <p className="px-2 py-6 text-center text-sm text-[#828284]">
              No matches for "{q}"
            </p>
          )}
          {results.map((p) => (
            <Link
              key={p.slug}
              to="/product/$slug"
              params={{ slug: p.slug }}
              onClick={onClose}
              className="flex items-center gap-3 rounded-sm p-2 transition hover:bg-[#FAF6F1]"
            >
              <img
                src={p.img}
                alt=""
                className="h-12 w-12 shrink-0 rounded-sm object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{p.name}</p>
                <p className="text-xs text-[#828284]">{p.cat}</p>
              </div>
              <span className="shrink-0 text-sm font-medium">{p.price}</span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 border-t border-[#e6ded2]">
          <Link
            to="/collection/$slug"
            params={{ slug: "all" }}
            onClick={onClose}
            className="flex items-center justify-center gap-2 py-3 text-[11px] uppercase tracking-widest text-[#3B3B3D] hover:bg-[#FAF6F1]"
          >
            <Package className="h-3.5 w-3.5" /> Shop all
          </Link>
          <Link
            to="/collection/$slug"
            params={{ slug: "best-sellers" }}
            onClick={onClose}
            className="flex items-center justify-center gap-2 border-l border-[#e6ded2] py-3 text-[11px] uppercase tracking-widest text-[#9E2A5C] hover:bg-[#FAF6F1]"
          >
            <TrendingUp className="h-3.5 w-3.5" /> Best sellers
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<MegaKey | null>(null);
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-[#3B3B3D]/60"
        onClick={onClose}
        aria-hidden
      />
      <aside className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-[#FAF6F1]">
        <div className="flex items-center justify-between border-b border-[#e6ded2] px-5 py-5">
          <span className="font-display text-2xl">
            greyon<span className="text-[#9E2A5C]">.</span>
          </span>
          <button onClick={onClose} aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="border-b border-[#e6ded2] p-5">
            <Link
              to="/collection/$slug"
              params={{ slug: "best-sellers" }}
              onClick={onClose}
              className="flex items-center justify-between rounded-sm bg-[#9E2A5C] px-4 py-3 text-xs font-medium uppercase tracking-widest text-white"
            >
              <span className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Shop best sellers
              </span>
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              to="/collection/$slug"
              params={{ slug: "all" }}
              onClick={onClose}
              className="mt-2 flex items-center justify-between rounded-sm border border-[#3B3B3D] px-4 py-3 text-xs font-medium uppercase tracking-widest"
            >
              <span className="flex items-center gap-2">
                <Package className="h-4 w-4" /> Shop all
              </span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="divide-y divide-[#e6ded2]">
            {MEGA.map((m) => (
              <li key={m.key}>
                <button
                  onClick={() => setExpanded(expanded === m.key ? null : m.key)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left text-sm uppercase tracking-widest"
                >
                  {m.label}
                  <ChevronRight
                    className={`h-4 w-4 transition ${
                      expanded === m.key ? "rotate-90 text-[#9E2A5C]" : ""
                    }`}
                  />
                </button>
                {expanded === m.key && (
                  <div className="bg-white px-5 pb-5 pt-1">
                    {m.columns.map((c) => (
                      <div key={c.heading} className="mt-4">
                        <p className="text-[10px] uppercase tracking-widest text-[#B8925A]">
                          {c.heading}
                        </p>
                        <ul className="mt-2 space-y-2">
                          {c.links.map((l) => (
                            <li key={l.slug}>
                              <Link
                                to="/collection/$slug"
                                params={{ slug: l.slug }}
                                onClick={onClose}
                                className="text-sm text-[#3B3B3D] hover:text-[#9E2A5C]"
                              >
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-[#e6ded2] p-5 text-sm">
          <a href="#account" className="flex items-center gap-3 py-2">
            <User className="h-4 w-4" /> Account
          </a>
          <a href="#wishlist" className="flex items-center gap-3 py-2">
            <Heart className="h-4 w-4" /> Wishlist
          </a>
          <Link
            to="/wholesale"
            onClick={onClose}
            className="flex items-center gap-3 py-2 text-[#B8925A]"
          >
            <Sparkles className="h-4 w-4" /> For professionals
          </Link>
        </div>
      </aside>
    </div>
  );
}

function MobileBottomNav({
  cartCount,
  onSearch,
}: {
  cartCount: number;
  onSearch: () => void;
}) {
  const linkCls =
    "flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] uppercase tracking-widest text-[#3B3B3D]";
  const activeCls = { className: `${linkCls} text-[#9E2A5C]` };
  return (
    <>
      <div className="h-16 lg:hidden" aria-hidden />
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e6ded2] bg-[#FAF6F1]/95 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5">
          <Link to="/" activeOptions={{ exact: true }} className={linkCls} activeProps={activeCls}>
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            to="/collection/$slug"
            params={{ slug: "all" }}
            className={linkCls}
            activeProps={activeCls}
          >
            <Package className="h-5 w-5" />
            Shop
          </Link>
          <button onClick={onSearch} className={linkCls}>
            <Search className="h-5 w-5" />
            Search
          </button>
          <Link to="/wholesale" className={linkCls} activeProps={activeCls}>
            <User className="h-5 w-5" />
            Account
          </Link>
          <Link to="/checkout" className={linkCls} activeProps={activeCls}>
            <span className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#9E2A5C] text-[9px] font-medium text-white">
                  {cartCount}
                </span>
              )}
            </span>
            Cart
          </Link>
        </div>
      </nav>
    </>
  );
}
