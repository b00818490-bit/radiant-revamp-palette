import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShoppingBag,
  Star,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Leaf,
  Truck,
  Heart,
  Share2,
  Play,
  Check,
  X,
  Camera,
  Wand2,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import prod1 from "@/assets/prod1.jpg";
import prod2 from "@/assets/prod2.jpg";
import prod3 from "@/assets/prod3.jpg";
import prod4 from "@/assets/prod4.jpg";
import catLips from "@/assets/cat-lips.jpg";
import ugc1 from "@/assets/ugc1.jpg";
import ugc3 from "@/assets/ugc3.jpg";
import ugc4 from "@/assets/ugc4.jpg";

export const Route = createFileRoute("/product/$slug")({
  component: PDP,
  head: ({ params }) => ({
    meta: [
      { title: `Velvet Matte Lipstick — Greyon` },
      {
        name: "description",
        content:
          "Velvet Matte Lipstick in six dermatologist-tested shades. 12-hour wear, 0 dryness. Find your match with our shade finder or AR try-on.",
      },
      { property: "og:title", content: "Velvet Matte Lipstick — Greyon" },
      { property: "og:image", content: "https://www.greyon.co/social-cover.jpg" },
    ],
  }),
});

const shades = [
  { name: "N°01 Bare", c: "#c99b8a" },
  { name: "N°02 Peony", c: "#e5748d" },
  { name: "N°03 Coral", c: "#df7e35" },
  { name: "N°04 Radiant", c: "#dc2e70", featured: true },
  { name: "N°05 Wine", c: "#7a1f3d" },
  { name: "N°06 Cocoa", c: "#4a2a22" },
];

const textures = [
  { name: "Velvet Matte", note: "Airy, second-skin", img: prod1 },
  { name: "Cream Satin", note: "Softly cushioned", img: prod2 },
  { name: "Glass Shine", note: "High-gloss, plumping", img: prod3 },
];

const gallery = [hero, prod1, catLips, prod2];

const benefits = [
  { icon: "💧", label: "12-hour hydrating wear" },
  { icon: "🎯", label: "Full pigment, one swipe" },
  { icon: "🪶", label: "Weightless, no transfer" },
  { icon: "🌿", label: "Vegan · 100% cruelty-free" },
  { icon: "🧪", label: "Dermatologist tested on 42 skin tones" },
  { icon: "🧴", label: "Refillable aluminum case" },
];

const goodFor = [
  "Dry, chapped or sensitive lips",
  "All-day wear (weddings, presentations, red-eye flights)",
  "Layering under gloss for extra dimension",
  "Fitzpatrick I–VI · every undertone",
];
const notFor = [
  "Anyone allergic to castor oil",
  "Wear directly over active exfoliating peel",
];

const skinConcerns = [
  { c: "#DC2E70", t: "Dryness" },
  { c: "#DF7E35", t: "Fine lines" },
  { c: "#F5C518", t: "Uneven tone" },
  { c: "#7CB342", t: "Sensitivity" },
];

const reviews = [
  {
    name: "Amelia R.",
    tone: "Fair · Cool",
    type: "Combination",
    age: "25–34",
    rating: 5,
    title: "Actually the softest matte ever.",
    body:
      "I have super dry lips and matte formulas usually eat me alive. This one lasted through dinner and two coffees without a single flake. Shade N°04 is chef's kiss.",
    img: ugc1,
    verified: true,
  },
  {
    name: "Priya S.",
    tone: "Medium · Warm",
    type: "Normal",
    age: "35–44",
    rating: 5,
    title: "Wedding-day approved.",
    body:
      "Wore N°02 Peony for eleven hours including the first dance. Zero touch-ups. Now buying three.",
    img: ugc3,
    verified: true,
  },
  {
    name: "Naomi T.",
    tone: "Deep · Neutral",
    type: "Sensitive",
    age: "18–24",
    rating: 4,
    title: "Great pigment on deeper skin.",
    body:
      "N°05 Wine reads exactly like the swatch on my skin — that never happens. Docked a star only because I want more shades in this range.",
    img: ugc4,
    verified: true,
  },
];

const bundle = [
  { name: "Velvet Matte Lipstick · N°04", price: 28, img: prod1, main: true },
  { name: "Lip Prep & Prime Balm", price: 18, img: prod3 },
  { name: "Precision Lip Liner · Radiant", price: 16, img: prod4 },
];

const fbt = [
  { name: "Cheek Cushion Blush · Peony", price: 32, img: prod2 },
  { name: "Feather Volume Mascara", price: 26, img: prod4 },
  { name: "Rescue Glow Serum", price: 52, img: prod3 },
  { name: "Lip Prep & Prime Balm", price: 18, img: catLips },
];

function PDP() {
  return (
    <div className="min-h-screen bg-white text-[color:var(--color-charcoal)]">
      <Announce />
      <MiniHeader />
      <Breadcrumb />
      <ProductBlock />
      <ShadeTools />
      <RoutineUpsell />
      <FBT />
      <RatingsSummary />
      <ReviewsList />
      <DetailsBelow />
      <Footer />
    </div>
  );
}

function Announce() {
  return (
    <div className="bg-[color:var(--color-charcoal)] text-white text-[11px] uppercase tracking-[0.22em] py-2.5 text-center">
      <span className="inline-flex items-center gap-3">
        <span className="h-1 w-1 rounded-full bg-[color:var(--color-pink)]" />
        Free shipping over $50 · Dermatologist tested
      </span>
    </div>
  );
}

function MiniHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-[color:var(--color-border)]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 h-16 flex items-center justify-between">
        <nav className="hidden md:flex items-center gap-7 text-[13px] uppercase tracking-[0.14em]">
          <a href="#" className="hover:text-[color:var(--color-pink)]">Shop</a>
          <a href="#" className="hover:text-[color:var(--color-pink)]">Face</a>
          <Link to="/product/$slug" params={{ slug: "velvet-matte" }} className="text-[color:var(--color-pink)]">Lips</Link>
          <a href="#" className="hover:text-[color:var(--color-pink)]">Eyes</a>
        </nav>
        <Link to="/" className="font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em] font-medium">
          greyon<span className="text-[color:var(--color-pink)]">.</span>
        </Link>
        <div className="flex items-center gap-6">
          <a href="#shade-tools" className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-pink)]">
            <Wand2 className="h-4 w-4" /> Find your shade
          </a>
          <button className="relative">
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-[color:var(--color-pink)] text-white text-[10px] flex items-center justify-center">2</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Breadcrumb() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 sm:px-8 py-5 text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-fog)] flex items-center gap-2">
      <Link to="/" className="hover:text-[color:var(--color-pink)]">Home</Link>
      <ChevronRight className="h-3 w-3" />
      <a href="#" className="hover:text-[color:var(--color-pink)]">Lips</a>
      <ChevronRight className="h-3 w-3" />
      <span className="text-[color:var(--color-charcoal)]">Velvet Matte Lipstick</span>
    </div>
  );
}

function ProductBlock() {
  const [shade, setShade] = useState(3);
  const [texture, setTexture] = useState(0);
  const [qty, setQty] = useState(1);
  const [purchase, setPurchase] = useState<"one" | "sub">("one");
  const [active, setActive] = useState(0);

  return (
    <section className="mx-auto max-w-[1440px] px-5 sm:px-8 pb-16 lg:pb-24 grid lg:grid-cols-12 gap-10 lg:gap-16">
      {/* Gallery */}
      <div className="lg:col-span-7 grid grid-cols-12 gap-3">
        <div className="hidden lg:flex col-span-2 flex-col gap-3">
          {gallery.map((g, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`aspect-square overflow-hidden border-2 transition ${active === i ? "border-[color:var(--color-pink)]" : "border-transparent"}`}
            >
              <img src={g} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
          <button className="aspect-square bg-[color:var(--color-charcoal)] text-white flex flex-col items-center justify-center gap-1">
            <Play className="h-4 w-4 fill-current" />
            <span className="text-[9px] uppercase tracking-[0.2em]">Video</span>
          </button>
        </div>
        <div className="col-span-12 lg:col-span-10 relative bg-[color:var(--color-charcoal)] aspect-[4/5] overflow-hidden">
          <img src={gallery[active]} alt="Velvet Matte Lipstick" className="h-full w-full object-cover" />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="bg-[color:var(--color-yellow)] text-[color:var(--color-charcoal)] text-[10px] uppercase tracking-[0.2em] px-2.5 py-1">New shade</span>
            <span className="bg-[color:var(--color-pink)] text-white text-[10px] uppercase tracking-[0.2em] px-2.5 py-1">Bestseller</span>
          </div>
          <button className="absolute bottom-4 right-4 bg-white/95 px-4 py-3 text-[11px] uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-white">
            <Camera className="h-4 w-4" /> AR try-on
          </button>
        </div>
      </div>

      {/* Buy box */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
        <div className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-pink)] mb-3">
          Lips · Signature
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-5xl lg:text-6xl leading-[0.95] tracking-[-0.03em]">
          Velvet Matte Lipstick
        </h1>
        <p className="mt-4 text-[color:var(--color-fog)] leading-relaxed">
          The impossible thing: a true matte that hydrates. 12 hours of transfer-proof colour with
          a barrier-repair core of squalane + peptides.
        </p>

        <div className="mt-5 flex items-center gap-3 text-sm">
          <div className="flex text-[color:var(--color-yellow)]">
            {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}
          </div>
          <span className="text-[color:var(--color-fog)]">4.9 · <a href="#reviews" className="underline hover:text-[color:var(--color-pink)]">1,284 reviews</a></span>
        </div>

        {/* Shade swatches */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] uppercase tracking-[0.22em]">
              Shade: <span className="text-[color:var(--color-pink)]">{shades[shade].name}</span>
            </div>
            <a href="#shade-tools" className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-pink)] flex items-center gap-1">
              <Wand2 className="h-3 w-3" /> Find my shade
            </a>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {shades.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setShade(i)}
                aria-label={s.name}
                className={`aspect-square relative transition ${shade === i ? "ring-2 ring-offset-2 ring-[color:var(--color-charcoal)]" : "hover:opacity-90"}`}
                style={{ backgroundColor: s.c }}
              >
                {shade === i && <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Texture thumbnails */}
        <div className="mt-6">
          <div className="text-[11px] uppercase tracking-[0.22em] mb-3">
            Texture: <span className="text-[color:var(--color-pink)]">{textures[texture].name}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {textures.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setTexture(i)}
                className={`text-left p-2 border transition ${texture === i ? "border-[color:var(--color-charcoal)]" : "border-[color:var(--color-border)] hover:border-[color:var(--color-fog)]"}`}
              >
                <div className="aspect-square overflow-hidden mb-2 bg-[color:var(--color-muted)]">
                  <img src={t.img} alt="" className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="text-[11px] font-medium">{t.name}</div>
                <div className="text-[10px] text-[color:var(--color-fog)] mt-0.5">{t.note}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Purchase options */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => setPurchase("one")}
            className={`w-full flex items-center justify-between p-4 border-2 transition ${purchase === "one" ? "border-[color:var(--color-charcoal)] bg-[color:var(--color-muted)]" : "border-[color:var(--color-border)]"}`}
          >
            <div className="flex items-center gap-3">
              <span className={`h-4 w-4 rounded-full border-2 ${purchase === "one" ? "border-[color:var(--color-charcoal)] bg-[color:var(--color-charcoal)]" : "border-[color:var(--color-fog)]"}`} />
              <span className="text-sm font-medium">One-time · $28.00</span>
            </div>
          </button>
          <button
            onClick={() => setPurchase("sub")}
            className={`w-full flex items-center justify-between p-4 border-2 transition ${purchase === "sub" ? "border-[color:var(--color-pink)] bg-[color:var(--color-pink)]/5" : "border-[color:var(--color-border)]"}`}
          >
            <div className="flex items-center gap-3">
              <span className={`h-4 w-4 rounded-full border-2 ${purchase === "sub" ? "border-[color:var(--color-pink)] bg-[color:var(--color-pink)]" : "border-[color:var(--color-fog)]"}`} />
              <div className="text-left">
                <div className="text-sm font-medium">Subscribe · $22.40 <span className="text-[color:var(--color-pink)] text-xs">save 20%</span></div>
                <div className="text-[11px] text-[color:var(--color-fog)] mt-0.5">Ships every 8 weeks · pause anytime</div>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] bg-[color:var(--color-pink)] text-white px-2 py-1">Best</span>
          </button>
        </div>

        {/* Add to bag */}
        <div className="mt-6 flex gap-3">
          <div className="flex items-center border border-[color:var(--color-charcoal)]">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-14 w-12 flex items-center justify-center hover:bg-[color:var(--color-muted)]"><Minus className="h-4 w-4" /></button>
            <span className="w-10 text-center text-sm">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="h-14 w-12 flex items-center justify-center hover:bg-[color:var(--color-muted)]"><Plus className="h-4 w-4" /></button>
          </div>
          <button className="flex-1 bg-[color:var(--color-pink)] text-white text-[13px] uppercase tracking-[0.18em] hover:bg-[color:var(--color-pink)]/90 transition-colors flex items-center justify-center gap-2">
            Add to bag · ${(purchase === "sub" ? 22.4 : 28) * qty}
            <ShoppingBag className="h-4 w-4" />
          </button>
          <button aria-label="Wishlist" className="h-14 w-14 border border-[color:var(--color-charcoal)] flex items-center justify-center hover:bg-[color:var(--color-charcoal)] hover:text-white transition-colors">
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Benefits */}
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 text-sm">
          {benefits.map((b) => (
            <li key={b.label} className="flex items-start gap-2.5">
              <span className="text-lg leading-none mt-0.5">{b.icon}</span>
              <span>{b.label}</span>
            </li>
          ))}
        </ul>

        {/* Trust row */}
        <div className="mt-8 pt-6 border-t border-[color:var(--color-border)] grid grid-cols-3 gap-4 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-fog)]">
          <div className="flex flex-col items-center text-center gap-2"><Truck className="h-4 w-4 text-[color:var(--color-pink)]" />Free ship $50+</div>
          <div className="flex flex-col items-center text-center gap-2"><Sparkles className="h-4 w-4 text-[color:var(--color-pink)]" />Derm tested</div>
          <div className="flex flex-col items-center text-center gap-2"><Leaf className="h-4 w-4 text-[color:var(--color-pink)]" />Vegan · CF</div>
        </div>

        <div className="mt-4 flex items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-fog)]">
          <Share2 className="h-3 w-3" /> Share
        </div>
      </div>
    </section>
  );
}

function GoodBad() {
  return (
    <div className="grid md:grid-cols-2 gap-px bg-[color:var(--color-border)] border border-[color:var(--color-border)]">
      <div className="bg-white p-8">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-green)] mb-4">
          <Check className="h-4 w-4" /> Good for
        </div>
        <ul className="space-y-3 text-sm">
          {goodFor.map((g) => (
            <li key={g} className="flex items-start gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-green)] mt-2 shrink-0" />
              {g}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-8">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-pink)] mb-4">
          <X className="h-4 w-4" /> Not for
        </div>
        <ul className="space-y-3 text-sm">
          {notFor.map((n) => (
            <li key={n} className="flex items-start gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-pink)] mt-2 shrink-0" />
              {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ShadeTools() {
  return (
    <section id="shade-tools" className="bg-[color:var(--color-charcoal)] text-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 grid md:grid-cols-2 gap-4">
        <div className="p-8 lg:p-12 border border-white/10 relative overflow-hidden group">
          <div className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-pink)] mb-4 flex items-center gap-2">
            <Wand2 className="h-4 w-4" /> 60-second shade quiz
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl lg:text-5xl leading-[0.95] mb-4">
            Get 3 shades made for your undertone.
          </h2>
          <p className="text-white/70 mb-8 max-w-md">
            Three questions. Undertone, skin type, and how much wear you need. We do the rest.
          </p>
          <a href="#" className="inline-flex items-center gap-2 bg-[color:var(--color-pink)] px-6 py-3.5 text-[13px] uppercase tracking-[0.18em] hover:bg-[color:var(--color-pink)]/90">
            Start the quiz <ArrowRight className="h-4 w-4" />
          </a>
          <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-[color:var(--color-pink)]/20 blur-3xl" />
        </div>
        <div className="p-8 lg:p-12 border border-white/10 relative overflow-hidden">
          <div className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-blue)] mb-4 flex items-center gap-2">
            <Camera className="h-4 w-4" /> AR try-on · beta
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-4xl lg:text-5xl leading-[0.95] mb-4">
            See every shade on <em className="text-[color:var(--color-blue)] font-normal">you</em>.
          </h2>
          <p className="text-white/70 mb-8 max-w-md">
            Turn on your camera and swipe through six shades in real time. Nothing is stored. Ever.
          </p>
          <a href="#" className="inline-flex items-center gap-2 border border-white/40 px-6 py-3.5 text-[13px] uppercase tracking-[0.18em] hover:bg-white hover:text-[color:var(--color-charcoal)]">
            Launch try-on <ArrowRight className="h-4 w-4" />
          </a>
          <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-[color:var(--color-blue)]/20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}

function RoutineUpsell() {
  const [added, setAdded] = useState<Record<number, boolean>>({ 0: true, 1: true, 2: false });
  const total = bundle.reduce((sum, b, i) => sum + (added[i] ? b.price : 0), 0);
  const savings = total > 0 ? (total * 0.15).toFixed(2) : "0.00";

  return (
    <section className="mx-auto max-w-[1440px] px-5 sm:px-8 py-16 lg:py-24">
      <div className="mb-10 flex items-end justify-between flex-wrap gap-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-pink)] mb-3">
            The complete lip bundle
          </div>
          <h2 className="text-4xl sm:text-5xl leading-[0.95]">
            Build the set. <em className="font-normal">Save 15%</em>.
          </h2>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-fog)]">Bundle total</div>
          <div className="font-[family-name:var(--font-display)] text-4xl">
            ${(total * 0.85).toFixed(2)}
            <span className="text-base text-[color:var(--color-fog)] line-through ml-3">${total.toFixed(2)}</span>
          </div>
          <div className="text-xs text-[color:var(--color-green)] mt-1">You save ${savings}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 lg:gap-4">
        {bundle.map((b, i) => (
          <div key={b.name} className={`border-2 p-5 flex flex-col ${added[i] ? "border-[color:var(--color-pink)] bg-[color:var(--color-pink)]/5" : "border-[color:var(--color-border)]"}`}>
            <div className="aspect-square bg-[color:var(--color-charcoal)] overflow-hidden mb-4 relative">
              <img src={b.img} alt="" className="h-full w-full object-cover" loading="lazy" />
              {b.main && <span className="absolute top-2 left-2 bg-white text-[10px] uppercase tracking-[0.2em] px-2 py-1">This item</span>}
            </div>
            <div className="flex-1">
              <div className="font-[family-name:var(--font-display)] text-xl leading-tight">{b.name}</div>
              <div className="text-sm text-[color:var(--color-fog)] mt-1">${b.price}</div>
            </div>
            <button
              onClick={() => setAdded({ ...added, [i]: !added[i] })}
              className={`mt-4 text-[11px] uppercase tracking-[0.2em] py-3 flex items-center justify-center gap-2 ${added[i] ? "bg-[color:var(--color-pink)] text-white" : "border border-[color:var(--color-charcoal)] hover:bg-[color:var(--color-charcoal)] hover:text-white"}`}
            >
              {added[i] ? <><Check className="h-4 w-4" /> Added</> : <><Plus className="h-4 w-4" /> Add to bundle</>}
            </button>
          </div>
        ))}
      </div>

      <button className="mt-8 w-full bg-[color:var(--color-charcoal)] text-white py-5 text-[13px] uppercase tracking-[0.2em] hover:bg-[color:var(--color-pink)] transition-colors flex items-center justify-center gap-2">
        Add bundle to bag · ${(total * 0.85).toFixed(2)} <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}

function FBT() {
  return (
    <section className="bg-[color:var(--color-muted)] py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="mb-10">
          <div className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-pink)] mb-3">
            Frequently bought with
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl leading-[0.95]">
            Others who bought this <em className="font-normal">also grabbed</em>.
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {fbt.map((p) => (
            <div key={p.name} className="bg-white group">
              <div className="aspect-square bg-[color:var(--color-charcoal)] overflow-hidden">
                <img src={p.img} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-4">
                <div className="font-[family-name:var(--font-display)] text-lg leading-tight">{p.name}</div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm">${p.price}</span>
                  <button className="text-[11px] uppercase tracking-[0.18em] border-b border-[color:var(--color-charcoal)] pb-0.5 hover:text-[color:var(--color-pink)] hover:border-[color:var(--color-pink)]">Quick add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RatingsSummary() {
  const dist = [
    { s: 5, v: 82, c: "#7CB342" },
    { s: 4, v: 12, c: "#16A1D4" },
    { s: 3, v: 4, c: "#F5C518" },
    { s: 2, v: 1, c: "#DF7E35" },
    { s: 1, v: 1, c: "#DC2E70" },
  ];
  return (
    <section id="reviews" className="mx-auto max-w-[1440px] px-5 sm:px-8 pt-20 pb-8">
      <div className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-pink)] mb-3">Reviews</div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.95]">
          1,284 humans, <em className="font-normal">one lipstick</em>.
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start pb-10 border-b border-[color:var(--color-border)]">
        <div className="lg:col-span-3 text-center lg:text-left">
          <div className="font-[family-name:var(--font-display)] text-7xl leading-none">4.9</div>
          <div className="flex text-[color:var(--color-yellow)] mt-2 justify-center lg:justify-start">
            {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-5 w-5 fill-current" />)}
          </div>
          <div className="text-xs text-[color:var(--color-fog)] mt-2">Based on 1,284 verified reviews</div>
        </div>

        <div className="lg:col-span-5 space-y-2">
          {dist.map((d) => (
            <div key={d.s} className="flex items-center gap-3 text-sm">
              <span className="w-6 text-[color:var(--color-fog)]">{d.s}★</span>
              <div className="flex-1 h-2 bg-[color:var(--color-muted)] overflow-hidden">
                <div className="h-full" style={{ width: `${d.v}%`, backgroundColor: d.c }} />
              </div>
              <span className="w-10 text-right text-[color:var(--color-fog)] text-xs">{d.v}%</span>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-3 text-sm">
          <Attribute label="Wear time" left="Short" right="12h+" pct={92} />
          <Attribute label="Hydration" left="Dries lips" right="Softens" pct={88} />
          <Attribute label="Pigment" left="Sheer" right="Full" pct={95} />
        </div>
      </div>

      <ReviewFilters />
    </section>
  );
}

function Attribute({ label, left, right, pct }: { label: string; left: string; right: string; pct: number }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-fog)] mb-1.5">
        <span>{label}</span>
      </div>
      <div className="relative h-1 bg-[color:var(--color-muted)]">
        <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[color:var(--color-pink)]" style={{ left: `calc(${pct}% - 6px)` }} />
      </div>
      <div className="flex justify-between text-[10px] text-[color:var(--color-fog)] mt-1.5">
        <span>{left}</span><span>{right}</span>
      </div>
    </div>
  );
}

function ReviewFilters() {
  const groups = [
    { label: "Skin type", opts: ["All", "Dry", "Normal", "Oily", "Combination", "Sensitive"] },
    { label: "Tone", opts: ["All tones", "Fair", "Light", "Medium", "Tan", "Deep"] },
    { label: "Age", opts: ["All ages", "18–24", "25–34", "35–44", "45+"] },
  ];
  return (
    <div className="pt-8 flex flex-wrap items-center gap-3 text-xs">
      <span className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-fog)] mr-2">Filter reviews</span>
      {groups.map((g, gi) => (
        <div key={g.label} className="relative">
          <select className="appearance-none border border-[color:var(--color-border)] pl-3 pr-8 py-2.5 text-xs bg-white hover:border-[color:var(--color-charcoal)] focus:outline-none focus:border-[color:var(--color-pink)]">
            {g.opts.map((o) => <option key={o}>{o}</option>)}
          </select>
          <ChevronDown className="h-3 w-3 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      ))}
      <button className="ml-auto text-[11px] uppercase tracking-[0.18em] border-b border-[color:var(--color-charcoal)] pb-0.5 hover:text-[color:var(--color-pink)]">
        With photos only
      </button>
    </div>
  );
}

function ReviewsList() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 sm:px-8 pb-20">
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
        {reviews.map((r) => (
          <article key={r.name} className="border border-[color:var(--color-border)] p-6 flex flex-col">
            <div className="flex items-center gap-1 text-[color:var(--color-yellow)] mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`h-3.5 w-3.5 ${s <= r.rating ? "fill-current" : "opacity-30"}`} />
              ))}
              {r.verified && <span className="ml-2 text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-green)] flex items-center gap-1"><Check className="h-3 w-3" /> Verified</span>}
            </div>
            <div className="font-[family-name:var(--font-display)] text-xl mb-2">{r.title}</div>
            <p className="text-sm text-[color:var(--color-fog)] leading-relaxed mb-4 flex-1">{r.body}</p>
            <div className="aspect-[4/3] bg-[color:var(--color-muted)] overflow-hidden mb-4">
              <img src={r.img} alt={`${r.name} review photo`} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="text-sm font-medium">{r.name}</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[r.tone, r.type, r.age].map((tag) => (
                <span key={tag} className="text-[10px] uppercase tracking-[0.14em] bg-[color:var(--color-muted)] px-2 py-1 text-[color:var(--color-fog)]">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10 text-center">
        <button className="inline-flex items-center gap-2 border border-[color:var(--color-charcoal)] px-7 py-4 text-[13px] uppercase tracking-[0.18em] hover:bg-[color:var(--color-charcoal)] hover:text-white">
          Read all 1,284 reviews <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function DetailsBelow() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 sm:px-8 pb-20 lg:pb-28 grid lg:grid-cols-12 gap-10 lg:gap-16">
      <div className="lg:col-span-5 space-y-10">
        <div>
          <div className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-pink)] mb-3">
            Made for / Not for
          </div>
          <h2 className="text-3xl sm:text-4xl leading-[0.95] mb-6">
            Set the expectation. <em className="font-normal">Skip the guesswork</em>.
          </h2>
          <GoodBad />
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-pink)] mb-4">
            Targets these concerns
          </div>
          <div className="flex flex-wrap gap-2">
            {skinConcerns.map((s) => (
              <span key={s.t} className="inline-flex items-center gap-2 border border-[color:var(--color-border)] px-4 py-2 text-sm">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.c }} />
                {s.t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-4">
        <Details title="Full ingredient list" defaultOpen>
          <p className="text-[color:var(--color-fog)] leading-relaxed">
            Aqua, Squalane (Olive-derived), Ricinus Communis (Castor) Seed Oil, Cetearyl Alcohol,
            Palmitoyl Tripeptide-38, Tocopherol (Vitamin E), Bisabolol, CI 15850, CI 77491, CI 77492.
          </p>
          <p className="text-sm mt-4">
            <span className="text-[color:var(--color-green)] uppercase tracking-[0.18em] text-[10px]">Free from </span>
            parabens · sulphates · phthalates · synthetic fragrance · mineral oil · talc.
          </p>
        </Details>
        <Details title="How to use">
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3"><span className="font-[family-name:var(--font-display)] text-2xl leading-none text-[color:var(--color-pink)]">1</span><span>Prep with Lip Prime Balm. Wait 60 seconds so it absorbs — this is the trick.</span></li>
            <li className="flex gap-3"><span className="font-[family-name:var(--font-display)] text-2xl leading-none text-[color:var(--color-pink)]">2</span><span>Line with matching Precision Liner for a sharper outline.</span></li>
            <li className="flex gap-3"><span className="font-[family-name:var(--font-display)] text-2xl leading-none text-[color:var(--color-pink)]">3</span><span>Apply Velvet Matte from the centre outwards. One coat for daytime, two for high-drama.</span></li>
            <li className="flex gap-3"><span className="font-[family-name:var(--font-display)] text-2xl leading-none text-[color:var(--color-pink)]">4</span><span>Blot lightly with a tissue. Do not rub.</span></li>
          </ol>
        </Details>
        <Details title="FAQs">
          <div className="space-y-6 text-sm">
            <Faq q="Is it really transfer-proof?" a="Yes — once set (about 90 seconds), it stays put through coffee, wine and light kisses. Oily foods will lift the edges." />
            <Faq q="Is this comfortable for sensitive lips?" a="It's dermatologist tested on 42 skin tones and formulated without fragrance or common allergens. If castor oil bothers you, we recommend patch-testing first." />
            <Faq q="Pregnancy-safe?" a="All ingredients are considered safe during pregnancy. Always run your specific list past your OB if you're unsure." />
            <Faq q="What's the return policy?" a="Try it for 30 days. If you don't love it, we'll refund it — even if the tube is empty." />
          </div>
        </Details>
        <Details title="Shipping & returns">
          <p className="text-[color:var(--color-fog)] text-sm leading-relaxed">
            Free carbon-neutral shipping on orders over $50 (US + Canada). 2–5 business day
            delivery. Returns are free within 30 days, no questions asked.
          </p>
        </Details>
      </div>
    </section>
  );
}

function Details({ title, defaultOpen, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="border-b border-[color:var(--color-border)]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="font-[family-name:var(--font-display)] text-2xl">{title}</span>
        {open ? <Minus className="h-5 w-5 text-[color:var(--color-pink)]" /> : <Plus className="h-5 w-5" />}
      </button>
      {open && <div className="pb-6">{children}</div>}
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <div className="font-medium mb-1.5">{q}</div>
      <div className="text-[color:var(--color-fog)] leading-relaxed">{a}</div>
    </div>
  );
}

import { Footer } from "@/components/Footer";
export { Footer };

