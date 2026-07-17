import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShoppingBag,
  Search,
  User,
  Heart,
  Star,
  Truck,
  Sparkles,
  Leaf,
  ArrowRight,
  Menu,
  ChevronRight,
  Play,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import catLips from "@/assets/cat-lips.jpg";
import catFace from "@/assets/cat-face.jpg";
import catSkin from "@/assets/cat-skin.jpg";
import catEyes from "@/assets/cat-eyes.jpg";
import ugc1 from "@/assets/ugc1.jpg";
import ugc3 from "@/assets/ugc3.jpg";
import ugc4 from "@/assets/ugc4.jpg";
import prod1 from "@/assets/prod1.jpg";
import prod2 from "@/assets/prod2.jpg";
import prod3 from "@/assets/prod3.jpg";
import prod4 from "@/assets/prod4.jpg";
import ingredient from "@/assets/ingredient.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Greyon — Clean color. Serious skincare." },
      {
        name: "description",
        content:
          "Dermatologist-tested makeup and skincare with pigment that performs. Shop best-sellers, find your shade, and build a routine you'll love.",
      },
      { property: "og:title", content: "Greyon — Clean color. Serious skincare." },
      { property: "og:image", content: "https://www.greyon.co/social-cover.jpg" },
    ],
  }),
});

const nav = ["Shop", "Face", "Lips", "Eyes", "Skincare", "About", "Journal"];

const categories = [
  { name: "Face", img: catFace, tint: "#DF7E35" },
  { name: "Lips", img: catLips, tint: "#DC2E70" },
  { name: "Eyes", img: catEyes, tint: "#16A1D4" },
  { name: "Skincare", img: catSkin, tint: "#7CB342" },
];

const bestsellers = [
  { name: "Velvet Matte Lipstick", shade: "N°04 Radiant", price: 28, img: prod1, tag: "New" },
  { name: "Cheek Cushion Blush", shade: "N°02 Peony", price: 32, img: prod2, tag: "Bestseller" },
  { name: "Rescue Glow Serum", shade: "30 ml", price: 52, img: prod3, tag: null },
  { name: "Feather Volume Mascara", shade: "Ink Black", price: 26, img: prod4, tag: "Bestseller" },
];

const press = ["VOGUE", "ELLE", "ALLURE", "BAZAAR", "REFINERY29", "COSMO", "GLAMOUR"];

const ugcs = [
  { img: ugc1, handle: "@lila.m" },
  { img: ugc3, handle: "@rose.byday" },
  { img: ugc4, handle: "@studio.noor" },
  { img: ugc1, handle: "@ellacreates" },
  { img: ugc3, handle: "@mari.k" },
  { img: ugc4, handle: "@saltandsage" },
];

const ingredients = [
  {
    name: "Hyaluronic Acid",
    note: "Plumps and holds up to 1,000x its weight in water.",
    color: "#16A1D4",
  },
  {
    name: "Niacinamide 5%",
    note: "Evens tone, refines pores, calms redness.",
    color: "#7CB342",
  },
  {
    name: "Squalane",
    note: "Weightless barrier repair that never clogs.",
    color: "#DF7E35",
  },
  {
    name: "Peptide Complex",
    note: "Firms and smooths over eight clinical weeks.",
    color: "#F5C518",
  },
];

const routine = [
  { step: "01", name: "Cleanse", note: "Gentle Milk Cleanser" },
  { step: "02", name: "Treat", note: "Rescue Glow Serum" },
  { step: "03", name: "Hydrate", note: "Barrier Cream Rich" },
  { step: "04", name: "Colour", note: "Cheek Cushion + Velvet Lip" },
];

function Home() {
  return (
    <div className="min-h-screen bg-white text-[color:var(--color-charcoal)]">
      <AnnouncementBar />
      <SiteHeader announcement={false} />
      <Hero />
      <PressStrip />
      <CategoryTiles />
      <Bestsellers />
      <ShadeFinder />
      <Trust />
      <UGCWall />
      <IngredientSpotlight />
      <RoutineBuilder />
      <Journal />
      <Newsletter />
      <Footer />
    </div>
  );
}

function AnnouncementBar() {
  const items = [
    "Free shipping over $50",
    "Dermatologist tested",
    "Cruelty-free · Vegan formulas",
    "30-day happiness guarantee",
    "New: Velvet Matte in six shades",
  ];
  const loop = [...items, ...items];
  return (
    <div className="bg-[color:var(--color-charcoal)] text-white text-[11px] uppercase tracking-[0.22em] py-2.5 overflow-hidden">
      <div className="flex whitespace-nowrap ticker-track">
        {loop.map((t, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-[color:var(--color-pink)]" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur border-b border-[color:var(--color-border)]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 h-16 flex items-center justify-between">
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
        <nav className="hidden md:flex items-center gap-7 text-[13px] uppercase tracking-[0.14em]">
          {nav.slice(0, 4).map((n) => (
            <a key={n} href="#" className="hover:text-[color:var(--color-pink)] transition-colors">
              {n}
            </a>
          ))}
        </nav>
        <Link
          to="/"
          className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em] font-medium"
        >
          greyon<span className="text-[color:var(--color-pink)]">.</span>
        </Link>
        <div className="flex items-center gap-5">
          <nav className="hidden md:flex items-center gap-7 text-[13px] uppercase tracking-[0.14em]">
            {nav.slice(4).map((n) => (
              <a key={n} href="#" className="hover:text-[color:var(--color-pink)] transition-colors">
                {n}
              </a>
            ))}
          </nav>
          <Search className="h-4 w-4 hidden sm:block cursor-pointer" />
          <User className="h-4 w-4 hidden sm:block cursor-pointer" />
          <Heart className="h-4 w-4 hidden sm:block cursor-pointer" />
          <button className="relative">
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-[color:var(--color-pink)] text-white text-[10px] flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative bg-[color:var(--color-charcoal)] text-white overflow-hidden">
      <div className="mx-auto max-w-[1440px] grid lg:grid-cols-12 gap-0 min-h-[86vh]">
        {/* Copy */}
        <div className="lg:col-span-6 flex flex-col justify-between px-6 sm:px-10 lg:px-16 py-14 lg:py-20 relative">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/60">
            <span className="h-px w-8 bg-[color:var(--color-pink)]" />
            Autumn Edit · 2026
          </div>

          <div className="mt-10 lg:mt-0">
            <h1 className="font-[family-name:var(--font-display)] text-[13vw] sm:text-[9vw] lg:text-[6.5vw] leading-[0.92] tracking-[-0.035em]">
              Colour that <br />
              <span className="italic text-[color:var(--color-pink)]">actually</span> loves <br />
              your skin.
            </h1>
            <p className="mt-8 max-w-md text-white/70 text-base leading-relaxed">
              Clinically-backed makeup and skincare made with pigment that performs and formulas
              your dermatologist would sign off on. Zero mystery. Zero compromise.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#bestsellers"
                className="group inline-flex items-center gap-2 bg-[color:var(--color-pink)] text-white px-7 py-4 text-[13px] uppercase tracking-[0.18em] hover:bg-[color:var(--color-pink)]/90 transition-colors"
              >
                Shop Best Sellers
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#shade"
                className="inline-flex items-center gap-2 border border-white/25 px-7 py-4 text-[13px] uppercase tracking-[0.18em] hover:bg-white hover:text-[color:var(--color-charcoal)] transition-colors"
              >
                Find Your Shade
              </a>
            </div>
          </div>

          <div className="mt-14 lg:mt-0 grid grid-cols-3 gap-6 text-[11px] uppercase tracking-[0.18em] text-white/60 max-w-lg">
            <div>
              <div className="font-[family-name:var(--font-display)] text-white text-3xl mb-1">
                4.9<span className="text-[color:var(--color-pink)]">★</span>
              </div>
              12,400 reviews
            </div>
            <div>
              <div className="font-[family-name:var(--font-display)] text-white text-3xl mb-1">28d</div>
              Visible glow
            </div>
            <div>
              <div className="font-[family-name:var(--font-display)] text-white text-3xl mb-1">100%</div>
              Vegan
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="lg:col-span-6 relative min-h-[520px] lg:min-h-full">
          <img
            src={hero}
            alt="Greyon hero — model with radiant skin and pink lipstick"
            className="absolute inset-0 h-full w-full object-cover"
            width={1600}
            height={1808}
          />
          {/* product-over-image overlay card */}
          <div className="absolute bottom-8 left-8 right-8 lg:right-auto lg:max-w-sm bg-white text-[color:var(--color-charcoal)] p-5 shadow-2xl flex items-center gap-4">
            <img src={prod1} alt="" className="h-20 w-20 object-cover bg-[color:var(--color-charcoal)]" loading="lazy" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-pink)]">Featured</div>
              <div className="font-[family-name:var(--font-display)] text-lg leading-tight">
                Velvet Matte · N°04 Radiant
              </div>
              <div className="text-xs text-[color:var(--color-fog)] mt-1">$28 · 6 shades</div>
            </div>
            <a href="#" className="text-xs uppercase tracking-[0.18em] border-b border-[color:var(--color-charcoal)] pb-0.5">
              Shop
            </a>
          </div>

          {/* play tag */}
          <button className="absolute top-8 right-8 h-14 w-14 rounded-full bg-white/95 text-[color:var(--color-charcoal)] flex items-center justify-center hover:scale-105 transition-transform">
            <Play className="h-5 w-5 fill-current" />
          </button>
        </div>
      </div>
    </section>
  );
}

function PressStrip() {
  const loop = [...press, ...press, ...press];
  return (
    <section className="border-b border-[color:var(--color-border)] py-8 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 flex items-center gap-10">
        <div className="hidden md:block text-[11px] uppercase tracking-[0.24em] text-[color:var(--color-fog)] shrink-0 max-w-[140px]">
          As seen in
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="flex marquee-track whitespace-nowrap">
            {loop.map((p, i) => (
              <span
                key={i}
                className="mx-10 font-[family-name:var(--font-display)] text-2xl tracking-[0.08em] text-[color:var(--color-charcoal)]/70"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryTiles() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 sm:px-8 py-16 lg:py-24">
      <div className="flex items-end justify-between mb-10">
        <div>
          <div className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-pink)] mb-3">
            Shop by category
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
            Start where <em className="font-normal">you</em> want to.
          </h2>
        </div>
        <a href="#" className="hidden md:inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.18em] border-b border-[color:var(--color-charcoal)] pb-1">
          Shop all <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {categories.map((c, i) => (
          <a
            key={c.name}
            href="#"
            className="group relative aspect-[3/4] overflow-hidden bg-[color:var(--color-charcoal)]"
          >
            <img
              src={c.img}
              alt={c.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute top-4 left-4 h-7 w-7 rounded-full" style={{ backgroundColor: c.tint }} />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-white/70 mb-1">
                  0{i + 1}
                </div>
                <div className="font-[family-name:var(--font-display)] text-3xl">{c.name}</div>
              </div>
              <ChevronRight className="h-5 w-5 translate-x-0 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Bestsellers() {
  return (
    <section id="bestsellers" className="bg-[color:var(--color-charcoal)] text-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-pink)] mb-3">
              Bestsellers · Restocked
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
              The ones <em className="text-[color:var(--color-pink)] font-normal">everyone</em> keeps reordering.
            </h2>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/60">
            <span>01</span>
            <span className="h-px w-16 bg-white/25" />
            <span className="text-white">04</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {bestsellers.map((p) => (
            <div key={p.name} className="group">
              <div className="relative aspect-[4/5] bg-[color:var(--color-fog)]/20 overflow-hidden mb-4">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {p.tag && (
                  <span
                    className={`absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 ${
                      p.tag === "New"
                        ? "bg-[color:var(--color-yellow)] text-[color:var(--color-charcoal)]"
                        : "bg-[color:var(--color-pink)] text-white"
                    }`}
                  >
                    {p.tag}
                  </span>
                )}
                <button className="absolute bottom-3 left-3 right-3 bg-white text-[color:var(--color-charcoal)] py-3 text-[11px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                  Quick add · ${p.price}
                </button>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-[family-name:var(--font-display)] text-lg leading-tight">{p.name}</div>
                  <div className="text-xs text-white/50 mt-1">{p.shade}</div>
                  <div className="flex items-center gap-1 mt-2 text-[11px] text-white/60">
                    <Star className="h-3 w-3 fill-[color:var(--color-yellow)] text-[color:var(--color-yellow)]" />
                    4.9 · 1.2k reviews
                  </div>
                </div>
                <div className="text-sm">${p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShadeFinder() {
  const shades = [
    { name: "N°01 Bare", c: "#c99b8a" },
    { name: "N°02 Peony", c: "#e5748d" },
    { name: "N°03 Coral", c: "#df7e35" },
    { name: "N°04 Radiant", c: "#dc2e70" },
    { name: "N°05 Wine", c: "#7a1f3d" },
    { name: "N°06 Cocoa", c: "#4a2a22" },
  ];
  return (
    <section id="shade" className="mx-auto max-w-[1440px] px-5 sm:px-8 py-20 lg:py-28">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-5">
          <div className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-pink)] mb-3">
            Shade finder
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95] mb-6">
            Your undertone, matched in <em className="font-normal">60 seconds</em>.
          </h2>
          <p className="text-[color:var(--color-fog)] text-base leading-relaxed mb-8 max-w-md">
            Answer three quick questions. Our tool cross-references undertone, skin type and
            climate, then hands back the exact three shades that will look like they were made for you.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-[color:var(--color-charcoal)] text-white px-7 py-4 text-[13px] uppercase tracking-[0.18em] hover:bg-[color:var(--color-pink)] transition-colors"
          >
            Start the quiz <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {shades.map((s) => (
              <button
                key={s.name}
                className="group aspect-square relative overflow-hidden"
                style={{ backgroundColor: s.c }}
              >
                <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                  <span className="text-white text-[10px] uppercase tracking-[0.18em]">
                    {s.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between text-xs text-[color:var(--color-fog)]">
            <span>Velvet Matte Lipstick collection</span>
            <span className="font-[family-name:var(--font-display)] text-[color:var(--color-charcoal)]">6 shades</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const badges = [
    { icon: Sparkles, title: "Dermatologist tested", note: "Every formula, every batch." },
    { icon: Leaf, title: "Vegan · Cruelty-free", note: "Leaping Bunny certified." },
    { icon: Truck, title: "Carbon-neutral shipping", note: "Free over $50, always." },
    { icon: Heart, title: "30-day happy return", note: "Try it. Keep it. Or don't." },
  ];
  return (
    <section className="border-y border-[color:var(--color-border)] bg-[color:var(--color-muted)]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {badges.map((b) => (
          <div key={b.title} className="flex items-start gap-4">
            <div className="h-11 w-11 shrink-0 rounded-full bg-white flex items-center justify-center border border-[color:var(--color-border)]">
              <b.icon className="h-5 w-5 text-[color:var(--color-pink)]" />
            </div>
            <div>
              <div className="font-[family-name:var(--font-display)] text-lg">{b.title}</div>
              <div className="text-xs text-[color:var(--color-fog)] mt-1">{b.note}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function UGCWall() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-pink)] mb-3">
              #InMyGreyon
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
              Worn in real <em className="font-normal">light</em>, real life.
            </h2>
          </div>
          <p className="text-sm text-[color:var(--color-fog)] max-w-sm">
            Tag <span className="text-[color:var(--color-pink)]">#InMyGreyon</span> for a chance to
            be featured. New drop every Friday.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {ugcs.map((u, i) => (
            <a
              key={i}
              href="#"
              className={`group relative overflow-hidden bg-[color:var(--color-muted)] ${
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              <img
                src={u.img}
                alt={`Customer ${u.handle}`}
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-end p-4">
                <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {u.handle}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function IngredientSpotlight() {
  return (
    <section className="bg-[color:var(--color-charcoal)] text-white py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-6 relative">
          <img
            src={ingredient}
            alt="Hyaluronic acid droplet with molecular structure"
            loading="lazy"
            className="w-full aspect-[7/5] object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-[color:var(--color-pink)] text-white px-4 py-2 text-[10px] uppercase tracking-[0.22em]">
            Ingredient Spotlight
          </div>
        </div>
        <div className="lg:col-span-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95] mb-8">
            What we put <em className="text-[color:var(--color-pink)] font-normal">in</em>. And what we leave <em className="font-normal">out</em>.
          </h2>
          <p className="text-white/70 max-w-lg mb-10 leading-relaxed">
            No parabens. No sulphates. No mystery fragrance. Every hero ingredient is clinically
            dosed and traceable to source — because your skin deserves receipts.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {ingredients.map((ing) => (
              <div key={ing.name} className="border-t border-white/15 pt-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: ing.color }} />
                  <div className="font-[family-name:var(--font-display)] text-xl">{ing.name}</div>
                </div>
                <div className="text-sm text-white/60 leading-relaxed">{ing.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoutineBuilder() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 sm:px-8 py-20 lg:py-28">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-pink)] mb-3">
          The Greyon routine
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95] mb-4">
          Four steps. One <em className="font-normal">very good</em> face day.
        </h2>
        <p className="text-[color:var(--color-fog)]">
          Skincare and colour designed to layer, not fight. Here's the order.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-px bg-[color:var(--color-border)] border border-[color:var(--color-border)]">
        {routine.map((r, i) => {
          const dot = ["#DC2E70", "#DF7E35", "#F5C518", "#7CB342"][i];
          return (
            <div key={r.step} className="bg-white p-8 lg:p-10 min-h-[240px] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-display)] text-4xl text-[color:var(--color-fog)]">
                  {r.step}
                </span>
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: dot }} />
              </div>
              <div>
                <div className="font-[family-name:var(--font-display)] text-3xl mb-2">{r.name}</div>
                <div className="text-sm text-[color:var(--color-fog)]">{r.note}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <a
          href="#"
          className="inline-flex items-center gap-2 border border-[color:var(--color-charcoal)] px-7 py-4 text-[13px] uppercase tracking-[0.18em] hover:bg-[color:var(--color-charcoal)] hover:text-white transition-colors"
        >
          Build your routine <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function Journal() {
  const posts = [
    {
      cat: "How-to",
      title: "The five-minute face for slow mornings",
      read: "4 min",
      color: "#DC2E70",
    },
    {
      cat: "Ingredients",
      title: "Niacinamide, decoded: what 5% actually does",
      read: "6 min",
      color: "#7CB342",
    },
    {
      cat: "Behind the brand",
      title: "Why we test every pigment for eight weeks",
      read: "5 min",
      color: "#16A1D4",
    },
  ];
  return (
    <section className="bg-[color:var(--color-muted)] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-pink)] mb-3">
              Journal
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
              Read up. Glow up.
            </h2>
          </div>
          <a href="#" className="hidden md:inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.18em] border-b border-[color:var(--color-charcoal)] pb-1">
            All articles <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {posts.map((p) => (
            <a key={p.title} href="#" className="group bg-white p-8 flex flex-col justify-between min-h-[280px] hover:-translate-y-1 transition-transform">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]" style={{ color: p.color }}>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                {p.cat}
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl leading-tight mb-4">
                  {p.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-[color:var(--color-fog)]">
                  <span>{p.read} read</span>
                  <ArrowRight className="h-4 w-4 text-[color:var(--color-charcoal)] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="bg-[color:var(--color-pink)] text-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 grid lg:grid-cols-2 gap-8 items-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
          Get first dibs on drops, <em className="font-normal">15% off</em> your first order.
        </h2>
        <form className="flex flex-col sm:flex-row gap-3 w-full">
          <input
            type="email"
            placeholder="you@wearingpink.com"
            className="flex-1 bg-transparent border border-white/40 px-5 py-4 text-white placeholder:text-white/60 focus:outline-none focus:border-white"
          />
          <button className="bg-white text-[color:var(--color-pink)] px-8 py-4 text-[13px] uppercase tracking-[0.18em] hover:bg-[color:var(--color-charcoal)] hover:text-white transition-colors">
            Sign me up
          </button>
        </form>
      </div>
    </section>
  );
}

import { Footer } from "@/components/Footer";
export { Footer };

