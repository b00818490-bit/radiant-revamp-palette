import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShoppingBag,
  Sparkles,
  Percent,
  Truck,
  Clock,
  ShieldCheck,
  GraduationCap,
  Package,
  FileCheck,
  Users,
  Check,
  ArrowRight,
  Building2,
  Scissors,
  Store,
  Palette,
  Star,
  Lock,
  Mail,
  Phone,
} from "lucide-react";
import { Footer } from "@/components/Footer";

import hero from "@/assets/hero.jpg";
import prod1 from "@/assets/prod1.jpg";
import prod2 from "@/assets/prod2.jpg";
import prod3 from "@/assets/prod3.jpg";
import prod4 from "@/assets/prod4.jpg";
import ugc1 from "@/assets/ugc1.jpg";

export const Route = createFileRoute("/wholesale")({
  component: WholesalePage,
  head: () => ({
    meta: [
      { title: "Greyon Pro — Wholesale & Professional Program" },
      {
        name: "description",
        content:
          "For estheticians, MUAs, salons, and stockists. Up to 35% off, early access to launches, and dedicated account support.",
      },
      { property: "og:title", content: "Greyon Pro — Wholesale & Professional Program" },
      {
        property: "og:description",
        content:
          "Professional pricing, back-bar kits, and early access to launches for licensed beauty pros and retailers.",
      },
    ],
  }),
});

type Tier = "pro" | "wholesale" | "stockist";

function WholesalePage() {
  const [tier, setTier] = useState<Tier>("pro");

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3B3B3D]">
      <ProBar />
      <TopNav />

      <Hero />
      <TrustLogos />
      <TierSwitcher tier={tier} setTier={setTier} />
      <Benefits tier={tier} />
      <ProKitShowcase />
      <HowItWorks />
      <ProLoved />
      <ApplicationForm tier={tier} setTier={setTier} />
      <FAQ />
      <FinalCTA />

      <Footer />
    </div>
  );
}

function ProBar() {
  return (
    <div className="bg-[#3B3B3D] text-[11px] uppercase tracking-widest text-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 lg:px-12">
        <span className="flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-[#B8925A]" />
          Greyon Pro · Trade Portal
        </span>
        <div className="hidden gap-6 sm:flex">
          <a href="#apply" className="hover:text-white">Apply</a>
          <a href="#login" className="hover:text-white">Pro login</a>
          <Link to="/" className="hover:text-white">Consumer site →</Link>
        </div>
      </div>
    </div>
  );
}

function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e6ded2] bg-[#FAF6F1]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight">Greyon</span>
          <span className="rounded-sm bg-[#3B3B3D] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-white">
            Pro
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <a href="#benefits" className="hover:text-[#9E2A5C]">Benefits</a>
          <a href="#kits" className="hover:text-[#9E2A5C]">Pro kits</a>
          <a href="#how" className="hover:text-[#9E2A5C]">How it works</a>
          <a href="#faq" className="hover:text-[#9E2A5C]">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#login"
            className="hidden text-sm text-[#828284] hover:text-[#3B3B3D] sm:block"
          >
            Pro login
          </a>
          <a
            href="#apply"
            className="rounded-sm bg-[#9E2A5C] px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white hover:bg-[#3B3B3D]"
          >
            Apply now
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#e6ded2]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#B8925A]/10 px-3 py-1 text-[11px] uppercase tracking-widest text-[#B8925A]">
            <Sparkles className="h-3 w-3" /> For the trade
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight lg:text-6xl">
            Built for pros who make faces{" "}
            <em className="italic text-[#9E2A5C]">glow for a living.</em>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-[#828284]">
            Greyon Pro is our trade program for licensed estheticians, MUAs,
            salons, spas, and boutique retailers. Real pricing. Real support.
            First look at every drop.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
            <StatCard n="35%" label="Pro discount" accent="text-[#9E2A5C]" />
            <StatCard n="2wk" label="Early access" accent="text-[#B8925A]" />
            <StatCard n="24h" label="Ships out" accent="text-[#7CB342]" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-sm bg-[#9E2A5C] px-6 py-4 text-sm font-medium uppercase tracking-widest text-white hover:bg-[#3B3B3D]"
            >
              Apply for Pro <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#benefits"
              className="inline-flex items-center rounded-sm border border-[#3B3B3D] px-6 py-4 text-sm font-medium uppercase tracking-widest hover:bg-[#3B3B3D] hover:text-white"
            >
              See benefits
            </a>
          </div>

          <p className="mt-6 flex items-center gap-2 text-xs text-[#828284]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#7CB342]" />
            License verification typically under 48 hours.
          </p>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={hero}
              alt="Professional artist applying Greyon products"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3B3B3D]/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-sm bg-[#FAF6F1]/95 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[ugc1, prod2, prod3].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="h-8 w-8 rounded-full border-2 border-[#FAF6F1] object-cover"
                    />
                  ))}
                </div>
                <p className="text-xs text-[#3B3B3D]">
                  <span className="font-medium">2,400+</span> pros already
                  stocking Greyon
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 top-8 hidden rotate-3 rounded-sm bg-[#B8925A] px-4 py-3 text-white shadow-lg lg:block">
            <p className="text-[10px] uppercase tracking-widest opacity-80">Now open</p>
            <p className="font-display text-lg">Fall '26 Pro applications</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  n,
  label,
  accent,
}: {
  n: string;
  label: string;
  accent: string;
}) {
  return (
    <div className="rounded-sm border border-[#e6ded2] bg-white p-3">
      <p className={`font-display text-2xl ${accent}`}>{n}</p>
      <p className="mt-0.5 text-[10px] uppercase tracking-widest text-[#828284]">
        {label}
      </p>
    </div>
  );
}

function TrustLogos() {
  const logos = ["ALLURE", "VOGUE", "BYRDIE", "REFINERY29", "ELLE", "COSMO"];
  return (
    <section className="border-b border-[#e6ded2] bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-6 lg:px-12">
        <span className="text-[11px] uppercase tracking-widest text-[#828284]">
          Stocked & loved in
        </span>
        {logos.map((l) => (
          <span
            key={l}
            className="font-display text-lg tracking-[0.2em] text-[#828284]"
          >
            {l}
          </span>
        ))}
      </div>
    </section>
  );
}

function TierSwitcher({
  tier,
  setTier,
}: {
  tier: Tier;
  setTier: (t: Tier) => void;
}) {
  const tiers: {
    id: Tier;
    icon: React.ReactNode;
    label: string;
    who: string;
  }[] = [
    {
      id: "pro",
      icon: <Scissors className="h-5 w-5" />,
      label: "For Estheticians & MUAs",
      who: "Licensed artists, facialists, and studios",
    },
    {
      id: "wholesale",
      icon: <Store className="h-5 w-5" />,
      label: "Wholesale for retailers",
      who: "Boutiques, concept stores, and pharmacies",
    },
    {
      id: "stockist",
      icon: <Building2 className="h-5 w-5" />,
      label: "Salons, spas & academies",
      who: "Back-bar accounts and educational partners",
    },
  ];

  return (
    <section id="benefits" className="border-b border-[#e6ded2]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-widest text-[#B8925A]">
            One program · Three tiers
          </span>
          <h2 className="mt-3 font-display text-4xl leading-tight lg:text-5xl">
            Pick the door that opens for you.
          </h2>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {tiers.map((t) => {
            const active = tier === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTier(t.id)}
                className={`group rounded-sm border p-6 text-left transition ${
                  active
                    ? "border-[#3B3B3D] bg-[#3B3B3D] text-white"
                    : "border-[#e6ded2] bg-white hover:border-[#3B3B3D]"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-sm ${
                    active
                      ? "bg-[#B8925A] text-white"
                      : "bg-[#FAF6F1] text-[#3B3B3D]"
                  }`}
                >
                  {t.icon}
                </div>
                <p className="mt-4 font-display text-xl leading-tight">
                  {t.label}
                </p>
                <p
                  className={`mt-1 text-xs ${
                    active ? "text-white/70" : "text-[#828284]"
                  }`}
                >
                  {t.who}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Benefits({ tier }: { tier: Tier }) {
  const perTier: Record<Tier, { discount: string; moq: string; net: string; extras: string[] }> = {
    pro: {
      discount: "35% off retail",
      moq: "No minimum",
      net: "Prepay + Klarna",
      extras: [
        "Free monthly education webinars",
        "1:1 shade consulting for clients",
        "Feature on our 'Find a Pro' locator",
      ],
    },
    wholesale: {
      discount: "50% off retail",
      moq: "$500 opening / $250 reorder",
      net: "Net 30 after 3rd order",
      extras: [
        "Free countertop merchandising kit",
        "Co-op marketing dollars",
        "Dedicated account manager",
      ],
    },
    stockist: {
      discount: "40% back-bar rate",
      moq: "$300 opening",
      net: "Net 30 available",
      extras: [
        "Custom training for your team",
        "White-glove onboarding",
        "Salon-exclusive back-bar sizes",
      ],
    },
  };

  const t = perTier[tier];

  const benefits = [
    {
      icon: <Percent className="h-6 w-6" />,
      title: t.discount,
      body: "Straightforward pricing. No annual fee, no tiered gymnastics.",
      color: "bg-[#9E2A5C]/10 text-[#9E2A5C]",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "2-week early access",
      body: "Get every launch on your shelf before the public sees it.",
      color: "bg-[#B8925A]/10 text-[#B8925A]",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: t.moq,
      body: "Sensible order minimums so you can test before you commit.",
      color: "bg-[#16A1D4]/10 text-[#16A1D4]",
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: t.net,
      body: "Flexible payment terms once you're an established partner.",
      color: "bg-[#7CB342]/10 text-[#7CB342]",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Pro education library",
      body: "Ingredient decks, technique videos, and CE-worthy trainings.",
      color: "bg-[#DF7E35]/10 text-[#DF7E35]",
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: "Back-bar sizes",
      body: "Pro-only formats and refills that keep your margins healthy.",
      color: "bg-[#F5C518]/15 text-[#3B3B3D]",
    },
  ];

  return (
    <section className="border-b border-[#e6ded2] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group rounded-sm border border-[#e6ded2] p-6 transition hover:border-[#3B3B3D]"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-sm ${b.color}`}
              >
                {b.icon}
              </div>
              <p className="mt-5 font-display text-xl leading-tight">{b.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#828284]">{b.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-sm bg-[#FAF6F1] p-6">
          <p className="text-[11px] uppercase tracking-widest text-[#B8925A]">
            Also included in every tier
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {t.extras.map((x) => (
              <div key={x} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7CB342]" />
                <span>{x}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProKitShowcase() {
  const kits = [
    {
      img: prod1,
      name: "Starter Facial Kit",
      pcs: "12 pieces",
      retail: "$420",
      pro: "$273",
      tag: "Bestseller",
    },
    {
      img: prod2,
      name: "Back-Bar Refresh",
      pcs: "8 pieces",
      retail: "$310",
      pro: "$202",
      tag: "New",
    },
    {
      img: prod3,
      name: "MUA Shade Range",
      pcs: "24 shades",
      retail: "$680",
      pro: "$442",
      tag: null,
    },
    {
      img: prod4,
      name: "Retail Endcap Set",
      pcs: "36 SKUs",
      retail: "$1,240",
      pro: "$620",
      tag: "Wholesale",
    },
  ];

  return (
    <section id="kits" className="border-b border-[#e6ded2]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#B8925A]">
              Pro-only assortments
            </span>
            <h2 className="mt-3 font-display text-4xl leading-tight lg:text-5xl">
              Curated kits, real margins.
            </h2>
          </div>
          <a
            href="#apply"
            className="text-sm text-[#9E2A5C] hover:text-[#3B3B3D]"
          >
            See full pro catalog →
          </a>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kits.map((k) => (
            <div
              key={k.name}
              className="group flex flex-col overflow-hidden rounded-sm border border-[#e6ded2] bg-white transition hover:border-[#3B3B3D]"
            >
              <div className="relative aspect-square overflow-hidden bg-[#FAF6F1]">
                <img
                  src={k.img}
                  alt={k.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {k.tag && (
                  <span className="absolute left-3 top-3 rounded-sm bg-[#3B3B3D] px-2 py-1 text-[10px] uppercase tracking-widest text-white">
                    {k.tag}
                  </span>
                )}
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-sm bg-[#B8925A] px-2 py-1 text-[10px] font-medium uppercase tracking-widest text-white">
                  <Lock className="h-3 w-3" /> Pro
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-xs text-[#828284]">{k.pcs}</p>
                <p className="mt-1 font-display text-lg leading-tight">
                  {k.name}
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-[#828284] line-through">{k.retail}</span>
                  <span className="font-display text-xl text-[#9E2A5C]">
                    {k.pro}
                  </span>
                </div>
                <button className="mt-4 rounded-sm border border-[#3B3B3D] py-2.5 text-xs font-medium uppercase tracking-widest hover:bg-[#3B3B3D] hover:text-white">
                  Add to trade order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: <FileCheck className="h-5 w-5" />,
      title: "Apply in 3 minutes",
      body: "Tell us who you are, where you work, and what you'd like to stock.",
    },
    {
      n: "02",
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Verify credentials",
      body: "Upload your license, resale certificate, or business documents.",
    },
    {
      n: "03",
      icon: <Users className="h-5 w-5" />,
      title: "Onboarding call",
      body: "Meet your account manager and get set up in the trade portal.",
    },
    {
      n: "04",
      icon: <Package className="h-5 w-5" />,
      title: "Place your first order",
      body: "Ships within 24 hours from our Brooklyn warehouse.",
    },
  ];

  return (
    <section id="how" className="border-b border-[#e6ded2] bg-[#3B3B3D] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <div className="max-w-2xl">
          <span className="text-[11px] uppercase tracking-widest text-[#B8925A]">
            How it works
          </span>
          <h2 className="mt-3 font-display text-4xl leading-tight lg:text-5xl">
            From application to first shipment, in a week or less.
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n} className="relative">
              <div className="flex items-center gap-3">
                <span className="font-display text-3xl text-[#B8925A]">
                  {s.n}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-white/10 text-[#B8925A]">
                  {s.icon}
                </span>
              </div>
              <p className="mt-4 font-display text-xl leading-tight">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.body}</p>
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-4 hidden h-px w-8 bg-white/20 lg:block" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProLoved() {
  const quotes = [
    {
      name: "Maya Okafor",
      role: "Facialist · Brooklyn",
      body: "My clients ask for Greyon by name. The pro program pricing means I can actually stock it without eating the margin.",
      avatar: ugc1,
    },
    {
      name: "Studio Nine",
      role: "Concept store · LA",
      body: "Best-selling brand in our skincare wall. The endcap kit and co-op dollars sold themselves.",
      avatar: prod2,
    },
    {
      name: "Sasha Reyes",
      role: "MUA · Editorial",
      body: "The shade range is unmatched. Early access lets me put new products in tear sheets before anyone else.",
      avatar: prod3,
    },
  ];

  return (
    <section className="border-b border-[#e6ded2] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#B8925A]">
              Pro-loved
            </span>
            <h2 className="mt-3 font-display text-4xl leading-tight lg:text-5xl">
              A program built on their feedback.
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-[#B8925A]" />
            <span className="text-xs text-[#828284]">
              2,400+ verified pro accounts worldwide
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {quotes.map((q) => (
            <figure
              key={q.name}
              className="flex flex-col justify-between rounded-sm border border-[#e6ded2] p-6"
            >
              <div>
                <div className="flex text-[#F5C518]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-lg leading-snug text-[#3B3B3D]">
                  “{q.body}”
                </blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-[#e6ded2] pt-4">
                <img
                  src={q.avatar}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{q.name}</p>
                  <p className="text-xs text-[#828284]">{q.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplicationForm({
  tier,
  setTier,
}: {
  tier: Tier;
  setTier: (t: Tier) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  if (submitted) {
    return (
      <section id="apply" className="border-b border-[#e6ded2] bg-[#FAF6F1]">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#7CB342]/15">
            <Check className="h-8 w-8 text-[#7CB342]" />
          </div>
          <h2 className="mt-6 font-display text-4xl leading-tight">
            Application received.
          </h2>
          <p className="mt-3 text-sm text-[#828284]">
            Our trade team reviews every application within 48 hours. You'll hear
            from us by email at the address you provided.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              to="/"
              className="rounded-sm border border-[#3B3B3D] px-6 py-3 text-sm font-medium uppercase tracking-widest hover:bg-[#3B3B3D] hover:text-white"
            >
              Back to shop
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="border-b border-[#e6ded2] bg-[#FAF6F1]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[1fr_1.3fr] lg:px-12 lg:py-24">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#B8925A]">
            Apply for Greyon Pro
          </span>
          <h2 className="mt-3 font-display text-4xl leading-tight lg:text-5xl">
            The gatekeeping is intentional. So is the discount.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[#828284]">
            Every application is reviewed by a real person on our trade team.
            We verify credentials to protect your margin, our brand, and the
            clients you serve.
          </p>

          <ul className="mt-8 space-y-3 text-sm">
            {[
              "Business or license verification",
              "Resale certificate (US retailers)",
              "Portfolio or social links (artists)",
              "48-hour typical response time",
            ].map((x) => (
              <li key={x} className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#7CB342]" />
                <span>{x}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-sm bg-white p-5">
            <p className="text-xs uppercase tracking-widest text-[#828284]">
              Prefer to talk to a human?
            </p>
            <div className="mt-3 space-y-2 text-sm">
              <a
                href="mailto:pro@greyon.co"
                className="flex items-center gap-2 hover:text-[#9E2A5C]"
              >
                <Mail className="h-4 w-4" /> pro@greyon.co
              </a>
              <a
                href="tel:+18885550199"
                className="flex items-center gap-2 hover:text-[#9E2A5C]"
              >
                <Phone className="h-4 w-4" /> +1 (888) 555-0199
              </a>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step < 3) setStep(step + 1);
            else setSubmitted(true);
          }}
          className="rounded-sm border border-[#e6ded2] bg-white p-6 lg:p-8"
        >
          {/* Progress */}
          <div className="mb-8 flex items-center gap-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex flex-1 items-center gap-2">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                    n < step
                      ? "bg-[#3B3B3D] text-white"
                      : n === step
                      ? "bg-[#9E2A5C] text-white"
                      : "border border-[#e6ded2] text-[#828284]"
                  }`}
                >
                  {n < step ? <Check className="h-3.5 w-3.5" /> : n}
                </span>
                {n < 3 && (
                  <div
                    className={`h-px flex-1 ${
                      n < step ? "bg-[#3B3B3D]" : "bg-[#e6ded2]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div>
              <h3 className="font-display text-2xl">Who's applying?</h3>
              <p className="mt-1 text-sm text-[#828284]">
                Pick the tier that fits your business.
              </p>
              <div className="mt-6 space-y-3">
                {(
                  [
                    { id: "pro", label: "Esthetician / Makeup Artist", hint: "Licensed individuals" },
                    { id: "wholesale", label: "Retailer / Boutique", hint: "You resell in-store or online" },
                    { id: "stockist", label: "Salon / Spa / Academy", hint: "Back-bar or educational use" },
                  ] as { id: Tier; label: string; hint: string }[]
                ).map((o) => (
                  <label
                    key={o.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-sm border p-4 transition ${
                      tier === o.id
                        ? "border-[#9E2A5C] bg-[#9E2A5C]/5"
                        : "border-[#e6ded2] hover:border-[#3B3B3D]"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={tier === o.id}
                      onChange={() => setTier(o.id)}
                      className="mt-1 accent-[#9E2A5C]"
                    />
                    <div>
                      <p className="text-sm font-medium">{o.label}</p>
                      <p className="text-xs text-[#828284]">{o.hint}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-display text-2xl">About your business</h3>
              <p className="mt-1 text-sm text-[#828284]">
                All fields required for verification.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Field label="First name" />
                <Field label="Last name" />
                <div className="col-span-2">
                  <Field label="Business or studio name" />
                </div>
                <div className="col-span-2">
                  <Field label="Business website or Instagram" />
                </div>
                <Field label="Country" />
                <Field label="State / Region" />
                <div className="col-span-2">
                  <Field label="Work email" hint="We'll send verification here" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-display text-2xl">Credentials</h3>
              <p className="mt-1 text-sm text-[#828284]">
                Upload one document to verify your account.
              </p>
              <div className="mt-6 space-y-4">
                <div className="rounded-sm border border-dashed border-[#B8925A] bg-[#B8925A]/5 p-6 text-center">
                  <Package className="mx-auto h-6 w-6 text-[#B8925A]" />
                  <p className="mt-3 text-sm font-medium">
                    Drag your license or certificate here
                  </p>
                  <p className="mt-1 text-xs text-[#828284]">
                    PDF, JPG, PNG · max 10MB
                  </p>
                  <button
                    type="button"
                    className="mt-4 rounded-sm border border-[#3B3B3D] px-4 py-2 text-xs font-medium uppercase tracking-widest hover:bg-[#3B3B3D] hover:text-white"
                  >
                    Choose file
                  </button>
                </div>
                <Field
                  label="Estimated monthly order volume"
                  hint="Rough number is fine — helps us tier you correctly"
                />
                <label className="flex items-start gap-2 text-xs text-[#828284]">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 accent-[#9E2A5C]"
                  />
                  <span>
                    I confirm the information above is accurate and agree to
                    Greyon's{" "}
                    <a href="#" className="text-[#9E2A5C] hover:underline">
                      Pro Program Terms
                    </a>
                    .
                  </span>
                </label>
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="rounded-sm border border-[#3B3B3D] px-6 py-3 text-sm font-medium uppercase tracking-widest hover:bg-[#3B3B3D] hover:text-white"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-[#9E2A5C] py-3 text-sm font-medium uppercase tracking-widest text-white hover:bg-[#3B3B3D]"
            >
              {step === 3 ? "Submit application" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, hint }: { label: string; hint?: string }) {
  return (
    <div>
      <input
        placeholder={label}
        className="w-full rounded-sm border border-[#e6ded2] bg-white px-3 py-3 text-sm outline-none focus:border-[#9E2A5C]"
      />
      {hint && <p className="mt-1 text-[11px] text-[#828284]">{hint}</p>}
    </div>
  );
}

function FAQ() {
  const items = [
    {
      q: "How long does approval take?",
      a: "Most applications are reviewed within 48 hours. Complex retail accounts may take up to 5 business days.",
    },
    {
      q: "Do you sell on Amazon or unauthorized channels?",
      a: "No. We protect our trade partners by refusing to sell through Amazon or discount marketplaces. Ever.",
    },
    {
      q: "What's the difference between Pro and Wholesale?",
      a: "Pro (35% off) is for licensed individuals using our products with clients. Wholesale (50% off) is for businesses reselling to consumers.",
    },
    {
      q: "Can I order for personal use as a Pro?",
      a: "Yes — your pro discount applies to personal-use orders, capped at a reasonable annual volume.",
    },
    {
      q: "Do you ship internationally?",
      a: "We ship to 42 countries. Duties are calculated at checkout so there are no surprises for your customers.",
    },
    {
      q: "Do you offer training?",
      a: "Yes. All approved pros get free access to our education library and monthly live webinars with our formulation team.",
    },
  ];

  return (
    <section id="faq" className="border-b border-[#e6ded2]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#B8925A]">
              FAQ
            </span>
            <h2 className="mt-3 font-display text-4xl leading-tight">
              Trade questions, answered.
            </h2>
          </div>
          <div className="divide-y divide-[#e6ded2] border-y border-[#e6ded2]">
            {items.map((i) => (
              <details key={i.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                  {i.q}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#3B3B3D] text-lg leading-none transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#828284]">
                  {i.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-[#9E2A5C] text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-20">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl leading-tight lg:text-5xl">
            Ready to put Greyon on your shelf?
          </h2>
          <p className="mt-3 text-sm text-white/80">
            Applications are open for our Fall '26 intake. Approved partners get
            first look at three new SKUs launching in October.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="#apply"
            className="inline-flex items-center gap-2 rounded-sm bg-[#FAF6F1] px-6 py-4 text-sm font-medium uppercase tracking-widest text-[#3B3B3D] hover:bg-white"
          >
            Apply now <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="mailto:pro@greyon.co"
            className="inline-flex items-center gap-2 rounded-sm border border-white/40 px-6 py-4 text-sm font-medium uppercase tracking-widest text-white hover:bg-white/10"
          >
            <ShoppingBag className="h-4 w-4" /> Request line sheet
          </a>
        </div>
      </div>
    </section>
  );
}
