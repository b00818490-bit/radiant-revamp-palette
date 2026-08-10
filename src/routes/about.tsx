import { createFileRoute, Link } from "@tanstack/react-router";
import {
  HeartHandshake,
  Leaf,
  MapPin,
  Rabbit,
  Sparkles,
  FlaskConical,
  ArrowRight,
} from "lucide-react";
import modelAsset from "@/assets/greyon-model.png.asset.json";
import ingredientImg from "@/assets/ingredient.jpg";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";



export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Greyon — Everyday Beauty Crafted for Everyone" },
      {
        name: "description",
        content:
          "Greyon is a Made in India beauty brand: paraben free, cruelty free, in-house formulations built for every Indian skin tone. Beauty for all, every day.",
      },
      { property: "og:title", content: "About Greyon — Everyday Beauty Crafted for Everyone" },
      {
        property: "og:description",
        content:
          "Founded in New Delhi, Greyon makes clean, inclusive, everyday makeup — 100% Made in India, cruelty free and paraben free.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const PILLARS = [
  {
    icon: HeartHandshake,
    title: "Beauty for all",
    body: "Shades, textures and finishes built for every Indian skin tone — priced so quality never becomes a luxury.",
  },
  {
    icon: MapPin,
    title: "Made in India",
    body: "100% manufactured in New Delhi, supporting local craftsmanship and a self-reliant beauty industry.",
  },
  {
    icon: FlaskConical,
    title: "Our own formulations",
    body: "In-house R&D and manufacturing means we control the ingredients, the quality and the consistency.",
  },
  {
    icon: Leaf,
    title: "Clean and kind",
    body: "Paraben free, vegan and cruelty free formulas that stay gentle on skin, wear after wear.",
  },
  {
    icon: Sparkles,
    title: "Everyday use",
    body: "Kajal before work, gloss at brunch, a bold lip for date night. Easy enough to wear daily.",
  },
  {
    icon: Rabbit,
    title: "Makes you feel",
    body: "Makeup that enhances rather than conceals — bold, radiant and unapologetically you.",
  },
];

const TIMELINE = [
  {
    year: "1987",
    title: "Where it began",
    body: "Greyon's parent company is founded by Mr Sanjay Jain, laying the manufacturing foundation.",
  },
  {
    year: "2018",
    title: "Greygon Cosmetics LLP",
    body: "Mr Neeraj Jain and Mr Amit Pasricha join as promoters. The new enterprise is founded in New Delhi.",
  },
  {
    year: "Today",
    title: "Online, everywhere",
    body: "Greyon products are available exclusively through online portals across India.",
  },
  {
    year: "Next",
    title: "On the shelf",
    body: "Select stores across all metros — bringing ethical beauty to counters near you.",
  },
];

const SHADES = [
  "#e8a7ae",
  "#d47a8c",
  "#c94960",
  "#b83c4a",
  "#b81f2a",
  "#d94a2e",
  "#8b3a34",
  "#a05540",
  "#a97556",
  "#8a5a4a",
  "#5a3229",
  "#6a1f4a",
];

const HASHTAGS = [
  "#TimeToChangeYourBrand",
  "#BeautyForAll",
  "#MadeInIndia",
  "#MakesYouFeel",
  "#EverydayUse",
];

const GLANCE = [
  { label: "Made in India", value: "100%", note: "Manufactured in New Delhi" },
  { label: "Animal testing", value: "0", note: "Cruelty free, always" },
  { label: "Parabens", value: "0", note: "Clean formulations" },
  { label: "Skin tones", value: "All", note: "Inclusive by design" },
];

function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal text-ivory">
        <img
          src={modelAsset.url}
          alt="Greyon campaign model wearing a full Greyon look"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-30"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
        <div className="relative mx-auto max-w-[1200px] px-5 py-24 sm:px-8 lg:py-32">
          <div className="text-[11px] uppercase tracking-[0.28em] text-gold">About Greyon</div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
            We believe in beauty for all.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/80">
            Everyday beauty crafted for everyone.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/collection/$slug"
              params={{ slug: "all" }}
              className="inline-flex items-center gap-2 bg-ivory px-7 py-4 text-[12px] uppercase tracking-[0.18em] text-charcoal transition-opacity hover:opacity-90"
            >
              Shop the collection <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/shade-quiz"
              className="inline-flex items-center gap-2 border border-ivory/40 px-7 py-4 text-[12px] uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-ivory/10"
            >
              Find your shade
            </Link>
          </div>
        </div>
      </section>

      {/* Shade strip */}
      <div className="flex h-3 w-full">
        {SHADES.map((c) => (
          <div key={c} className="flex-1" style={{ backgroundColor: c }} />
        ))}
      </div>

      {/* Value proposition */}
      <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.28em] text-berry">
              Why Greyon exists
            </div>
            <h2 className="mt-4 font-display text-3xl leading-[1.05] tracking-[-0.02em] text-charcoal sm:text-4xl">
              In a crowded beauty landscape, Greyon redefines what it means to feel beautiful.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-fog">
              <p>
                Proudly Made in India with thoughtfully crafted in-house formulations, our clean,
                skin-loving products are gentle enough for daily wear and designed to enhance — not
                conceal — your natural beauty. It&apos;s how Greyon helps you feel bold, radiant and
                unapologetically you.
              </p>
              <p>
                We bring together attainable luxury and true inclusivity, offering makeup that fits
                all skin types, tones and everyday moments. From a swipe of kajal before work to a
                hint of gloss at brunch or a bold lipstick for date night — Greyon is your beauty
                ally through it all.
              </p>
            </div>
            <p className="mt-8 border-l-2 border-berry pl-5 font-display text-2xl leading-snug text-charcoal sm:text-3xl">
              Because beauty shouldn&apos;t be exclusive.
              <span className="block text-berry">It should be #BeautyForAll.</span>
            </p>
          </div>
          <div className="lg:col-span-5">
            <img
              src={modelAsset.url}
              alt="Greyon campaign model wearing a full Greyon look"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Values at a glance */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {GLANCE.map((g) => (
              <div key={g.label} className="bg-card p-8">
                <div className="font-display text-5xl text-berry">{g.value}</div>
                <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-charcoal">
                  {g.label}
                </div>
                <div className="mt-1 text-xs text-fog">{g.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="text-[11px] uppercase tracking-[0.28em] text-berry">Brand pillars</div>
        <h2 className="mt-4 max-w-2xl font-display text-3xl leading-[1.05] tracking-[-0.02em] text-charcoal sm:text-4xl">
          Six things we refuse to compromise on.
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.title} className="group bg-card p-8 transition-colors hover:bg-ivory">
              <p.icon className="h-6 w-6 text-gold" />
              <h3 className="mt-5 font-display text-2xl text-charcoal">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fog">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-charcoal text-ivory">
        <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28">
          <div className="text-[11px] uppercase tracking-[0.28em] text-gold">Our journey</div>
          <h2 className="mt-4 font-display text-3xl leading-[1.05] tracking-[-0.02em] sm:text-4xl">
            Three decades of making things, properly.
          </h2>

          <ol className="mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
            {TIMELINE.map((t, i) => (
              <li key={t.year} className="relative md:pt-10">
                <div className="hidden md:block">
                  <div className="absolute left-0 top-[13px] h-px w-full bg-ivory/20" />
                  <div
                    className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: i === 0 ? "var(--color-gold)" : "var(--color-berry)" }}
                  />
                </div>
                <div className="font-display text-4xl text-gold">{t.year}</div>
                <div className="mt-2 text-sm uppercase tracking-[0.16em]">{t.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-ivory/70">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Clean beauty split */}
      <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <img
            src={ingredientImg}
            alt="Clean, paraben free Greyon formulations"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-berry">
              Clean beauty commitment
            </div>
            <h2 className="mt-4 font-display text-3xl leading-[1.05] tracking-[-0.02em] text-charcoal sm:text-4xl">
              What goes on your skin matters as much as how it looks.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-fog">
              <p>
                Our formulations are paraben free and crafted with clean ingredients. We keep
                pushing innovation so our makeup stays long lasting and ultra glam while still
                nourishing the skin.
              </p>
              <p>
                Beauty should never come at the cost of another living being. Every Greyon product
                is 100% cruelty free — we never test on animals, and we never will. It isn&apos;t a
                trend for us; it&apos;s a founding principle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hashtag marquee */}
      <section className="overflow-hidden border-y border-border bg-ivory py-6">
        <div className="flex w-max marquee-track gap-10 whitespace-nowrap">
          {[...HASHTAGS, ...HASHTAGS, ...HASHTAGS, ...HASHTAGS].map((h, i) => (
            <span
              key={`${h}-${i}`}
              className="font-display text-2xl tracking-[-0.01em]"
              style={{ color: i % 2 ? "var(--color-berry)" : "var(--color-charcoal)" }}
            >
              {h}
            </span>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 lg:py-28">
        <p className="font-display text-3xl leading-[1.1] tracking-[-0.02em] text-charcoal sm:text-4xl">
          You were beautifully made and made to be beautiful — and it&apos;s time you embrace it.
        </p>
        <Link
          to="/collection/$slug"
          params={{ slug: "best-sellers" }}
          className="mt-9 inline-flex items-center gap-2 bg-charcoal px-7 py-4 text-[12px] uppercase tracking-[0.18em] text-ivory transition-opacity hover:opacity-90"
        >
          Shop bestsellers <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}
