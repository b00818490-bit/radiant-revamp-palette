import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchProducts, formatMoney, type ShopifyProduct } from "@/lib/shopify";

function useDebounced<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

import {
  Search,
  ShoppingBag,
  User,
  Heart,
  Menu,
  X,
  Home,
  TrendingUp,
  ChevronRight,
  Package,
} from "lucide-react";

import logoAsset from "@/assets/greyon-logo.png.asset.json";
import { PromoBanner } from "@/components/PromoBanner";
import { campaignContent } from "@/content/campaign";
import { fillTokens } from "@/content/applyCampaign";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";

type MegaKey = "shop" | "lips" | "eyes" | "skincare";

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
      body: "Clean color and facial oils for everyday care.",
      href: "/collection/all",
    },
    columns: [
      {
        heading: "By category",
        links: [
          { label: "Lips", slug: "lips" },
          { label: "Eyes", slug: "eyes" },
          { label: "Skincare", slug: "skincare" },
        ],
      },
      {
        heading: "Shop by edit",
        links: [
          { label: "Best sellers", slug: "best-sellers" },
          { label: "New arrivals", slug: "new" },
          { label: "Under ₹300", slug: "under-300" },
        ],

      },
    ],
    feature: {
      img: "https://cdn.shopify.com/s/files/1/0727/7998/9300/files/Model_3.jpg?v=1775040862",
      tag: "This month",
      title: "Premium Matte Liquid Lipstick",
      href: "/product/premium-matte-liquid-lipcolor",
    },
  },
  {
    key: "lips",
    label: "Lips",
    intro: {
      title: "Pigment that performs.",
      body: "Matte liquid lipstick, moisturizing bullets, gloss and balm.",
      href: "/collection/lips",
    },
    columns: [
      {
        heading: "Lipsticks",
        links: [
          { label: "Premium Matte Liquid Lipstick", slug: "premium-matte-liquid-lipcolor" },
          { label: "Regular Matte Liquid Lipstick", slug: "regular-matte-liquid-lipcolor" },
          { label: "Premium Standard Matte Liquid Lipstick", slug: "premium-standard-matte-liquid-lipstick" },
          { label: "Moisturizing Lipstick", slug: "regular-moisturizing-lipstick" },
        ],
      },
      {
        heading: "Gloss & care",
        links: [
          { label: "Liquid Lip Gloss", slug: "liquid-lip-gloss" },
          { label: "Lip Gloss Stick", slug: "lip-gloss-stick" },
          { label: "Lip Balm", slug: "lip-balm" },
        ],
      },
    ],

    feature: {
      img: "https://cdn.shopify.com/s/files/1/0727/7998/9300/files/LLS1_Premium_Matte_Liquid_Lipstick_Pearly_Pink.png?v=1775040862",
      tag: "Bestseller",
      title: "Premium Matte Liquid Lipstick",
      href: "/product/premium-matte-liquid-lipcolor",
    },
  },
  {
    key: "eyes",
    label: "Eyes",
    intro: {
      title: "Eyes that stand out.",
      body: "Smudge-proof kajal, precision eyeliner and curl-loving mascara.",
      href: "/collection/eye-makeup",
    },
    columns: [
      {
        heading: "Shop eyes",
        links: [
          { label: "Smoky Black Eyeliner", slug: "greyon-smoky-eyeliner" },
          { label: "Black Curling Mascara", slug: "mascara" },
          { label: "Vacuum Precision Eyeliner (Kajal)", slug: "vacuum-precision-eyeliner-intense-black" },
        ],
      },
    ],
    feature: {
      img: "https://cdn.shopify.com/s/files/1/0727/7998/9300/files/Eyeliner04.jpg?v=1756058127",
      tag: "Bestseller",
      title: "Smoky Black Eyeliner",
      href: "/product/greyon-smoky-eyeliner",
    },
  },
  {
    key: "skincare",
    label: "Skincare",
    intro: {
      title: "Oils that nourish.",
      body: "Lightweight, skin-friendly facial oils made for everyday care.",
      href: "/collection/facial-oil",
    },
    columns: [
      {
        heading: "Shop skincare",
        links: [
          { label: "Glow Boosting Facial Oil", slug: "facial-oil" },
          { label: "Anti Acne Facial Oil", slug: "anti-acne-facial-oil" },
          { label: "Anti Ageing Facial Oil", slug: "anti-ageing-facial-oil" },
        ],
      },
    ],
    feature: {
      img: "https://cdn.shopify.com/s/files/1/0727/7998/9300/files/antiacne1_5c4caeb9-8e74-4157-a161-c9acaa2cb1db.jpg?v=1756057980",
      tag: "Popular",
      title: "Anti Acne Facial Oil",
      href: "/product/anti-acne-facial-oil",
    },
  },
];

const POPULAR = [
  "Matte liquid lipstick",
  "Smoky black eyeliner",
  "Black curling mascara",
  "Vacuum precision kajal",
  "Facial oil",
];


export function SiteHeader({
  announcement = fillTokens(campaignContent.header_announcement),
  pro = false,
}: {
  announcement?: string | false;
  pro?: boolean;
}) {
  const [openMega, setOpenMega] = useState<MegaKey | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const openCart = useCartStore((s) => s.setOpen);

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

  const debouncedQ = useDebounced(q, 250);
  const { data: results = [], isFetching } = useQuery({
    queryKey: ["header-search", debouncedQ],
    queryFn: () => searchProducts(debouncedQ, 8),
    enabled: debouncedQ.trim().length > 0,
    staleTime: 60_000,
  });

  function submitSearch(value: string) {
    const term = value.trim();
    if (!term) return;
    setSearchOpen(false);
    navigate({ to: "/search", search: { q: term } });
  }


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

      <PromoBanner />

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
              <Link
                to="/"
                onMouseEnter={() => setOpenMega(null)}
                activeOptions={{ exact: true }}
                activeProps={{ className: "py-2 normal-case tracking-normal text-[#9E2A5C] transition-colors hover:text-[#9E2A5C]" }}
                inactiveProps={{ className: "py-2 normal-case tracking-normal text-[#3B3B3D] transition-colors hover:text-[#9E2A5C]" }}
              >
                Home
              </Link>
              <Link
                to="/about"
                onMouseEnter={() => setOpenMega(null)}
                activeProps={{ className: "py-2 normal-case tracking-normal text-[#9E2A5C] transition-colors hover:text-[#9E2A5C]" }}
                inactiveProps={{ className: "py-2 normal-case tracking-normal text-[#3B3B3D] transition-colors hover:text-[#9E2A5C]" }}
              >
                Our Story
              </Link>
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
              className="h-12 w-auto md:h-14 -my-1"
            />
            {pro && (
              <span className="rounded-sm bg-[#3B3B3D] px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-widest text-white">
                Pro
              </span>
            )}
          </Link>

          {/* Right: best sellers + search + utility */}
          <div className="flex items-center justify-end gap-3 sm:gap-4">
            <Link
              to="/collection/$slug"
              params={{ slug: "best-sellers" }}
              onMouseEnter={() => setOpenMega(null)}
              className="hidden lg:inline-flex items-center gap-1.5 text-[13px] uppercase tracking-[0.14em] text-[#9E2A5C] transition-colors hover:text-[#3B3B3D]"
            >
              <TrendingUp className="h-3.5 w-3.5" /> Best sellers
            </Link>

            <div ref={searchRef} className="relative">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-2 rounded-sm border border-[#e6ded2] bg-white/70 px-3 py-2 text-xs text-[#828284] transition hover:border-[#3B3B3D] hover:text-[#3B3B3D]"
                aria-label="Search"
              >
                <Search className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">Search products…</span>
                <span className="hidden lg:inline text-[10px] uppercase tracking-widest text-[#828284]">
                  ⌘K
                </span>
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="md:hidden text-[#3B3B3D]"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              {searchOpen && (
                <SearchDropdown
                  q={q}
                  setQ={setQ}
                  results={results}
                  isFetching={isFetching}
                  onSubmit={submitSearch}
                  onClose={() => setSearchOpen(false)}
                />
              )}
            </div>


            <Link
              to="/account"
              className="hidden sm:inline-flex text-[#3B3B3D] hover:text-[#9E2A5C]"
              aria-label="Account"
            >
              <User className="h-4 w-4" />
            </Link>
            <Link
              to="/wishlist"
              className="relative hidden sm:inline-flex text-[#3B3B3D] hover:text-[#9E2A5C]"
              aria-label="Wishlist"
            >
              <Heart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#9E2A5C] px-1 text-[9px] text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => openCart(true)}
              className="relative text-[#3B3B3D] hover:text-[#9E2A5C]"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5 sm:h-4 sm:w-4" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#9E2A5C] text-[10px] font-medium text-white">
                  {cartCount}
                </span>
              )}
            </button>
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
          params={{ slug: config.key === "shop" ? "all" : config.key }}
          onClick={onClose}
          className="mt-6 inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-[#9E2A5C] hover:text-[#3B3B3D]"
        >
          Shop all <ChevronRight className="h-3 w-3" />
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
        params={{ slug: config.feature.href.split("/").pop() || "" }}
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
  isFetching,
  onSubmit,
  onClose,
}: {
  q: string;
  setQ: (v: string) => void;
  results: ShopifyProduct[];
  isFetching: boolean;
  onSubmit: (v: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-x-0 top-[calc(var(--header-h,4rem)+40px)] z-50 mx-auto max-w-2xl px-4 md:absolute md:right-0 md:left-auto md:top-full md:mt-2 md:w-[520px] md:max-w-none md:px-0">
      <div className="overflow-hidden rounded-sm border border-[#e6ded2] bg-white shadow-2xl">
        <form
          className="relative border-b border-[#e6ded2]"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(q);
          }}
        >
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#828284]" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search shades, ingredients, routines…"
            className="w-full bg-transparent px-11 py-4 text-sm outline-none placeholder:text-[#828284]"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#828284] hover:text-[#3B3B3D]"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </form>

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

        {q && (
          <div className="max-h-[60vh] overflow-y-auto p-2">
            <p className="px-2 pt-2 pb-1 text-[10px] uppercase tracking-widest text-[#828284]">
              Products
            </p>
            {isFetching && (
              <p className="px-2 py-6 text-center text-sm text-[#828284]">Searching…</p>
            )}
            {!isFetching && results.length === 0 && (
              <p className="px-2 py-6 text-center text-sm text-[#828284]">
                No results found for “{q}”
              </p>
            )}
            {!isFetching &&
              results.map((p) => {
                const node = p.node;
                const img = node.images?.edges?.[0]?.node;
                const price = node.priceRange.minVariantPrice;
                return (
                  <Link
                    key={node.id}
                    to="/product/$slug"
                    params={{ slug: node.handle }}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-sm p-2 transition hover:bg-[#FAF6F1]"
                  >
                    {img && (
                      <img
                        src={img.url}
                        alt=""
                        className="h-12 w-12 shrink-0 rounded-sm object-cover"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{node.title}</p>
                      <p className="text-xs text-[#828284]">{node.productType}</p>
                    </div>
                    <span className="shrink-0 text-sm font-medium">
                      {formatMoney(price.amount, price.currencyCode)}
                    </span>
                  </Link>
                );
              })}
            {!isFetching && results.length > 0 && (
              <button
                onClick={() => onSubmit(q)}
                className="mt-1 w-full rounded-sm py-3 text-center text-[11px] uppercase tracking-widest text-[#9E2A5C] hover:bg-[#FAF6F1]"
              >
                See all results for “{q}”
              </button>
            )}
          </div>
        )}


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
          <Link to="/" onClick={onClose} aria-label="Greyon — home">
            <img
              src={logoAsset.url}
              alt="Greyon"
              className="h-8 w-auto"
            />
          </Link>
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
            <li>
              <Link
                to="/"
                onClick={onClose}
                activeOptions={{ exact: true }}
                activeProps={{ className: "flex w-full items-center px-5 py-4 text-sm normal-case tracking-normal text-[#9E2A5C]" }}
                inactiveProps={{ className: "flex w-full items-center px-5 py-4 text-sm normal-case tracking-normal text-[#3B3B3D] hover:text-[#9E2A5C]" }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={onClose}
                activeProps={{ className: "flex w-full items-center px-5 py-4 text-sm normal-case tracking-normal text-[#9E2A5C]" }}
                inactiveProps={{ className: "flex w-full items-center px-5 py-4 text-sm normal-case tracking-normal text-[#3B3B3D] hover:text-[#9E2A5C]" }}
              >
                Our Story
              </Link>
            </li>
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
          <Link to="/account" onClick={onClose} className="flex items-center gap-3 py-2">
            <User className="h-4 w-4" /> Account
          </Link>
          <Link to="/wishlist" onClick={onClose} className="flex items-center gap-3 py-2">
            <Heart className="h-4 w-4" /> Wishlist
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
          <Link to="/account" className={linkCls} activeProps={activeCls}>
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
