import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, RotateCcw, ShoppingBag } from "lucide-react";
import { fetchProductByHandle, formatMoney } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

export const Route = createFileRoute("/shade-quiz")({
  head: () => ({
    meta: [
      { title: "Lip Shade Finder Quiz — Greyon Cosmetics" },
      {
        name: "description",
        content:
          "Answer four quick questions and get matched to your Greyon Premium Matte Liquid Lipstick shade. Paraben free, lab tested, made in India.",
      },
      { property: "og:title", content: "Lip Shade Finder Quiz — Greyon Cosmetics" },
      {
        property: "og:description",
        content:
          "Find your perfect Greyon liquid lipstick shade in under a minute with our tappable lip shade quiz.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShadeQuizPage,
});

const LIPSTICK_HANDLE = "premium-matte-liquid-lipcolor";

type Depth = "light" | "medium" | "deep";
type Undertone = "cool" | "warm" | "neutral";
type Family = "pink" | "red" | "brown" | "berry";
type Vibe = "everyday" | "bold";

type Shade = {
  code: string;
  name: string;
  hex: string;
  depth: Depth[];
  undertone: Undertone[];
  family: Family;
  vibe: Vibe;
};

/** Real shades from the Premium Matte Liquid Lipstick range (LLS codes). */
const SHADES: Shade[] = [
  { code: "LLS1", name: "Pearly Pink", hex: "#e8a7ae", depth: ["light", "medium"], undertone: ["cool", "neutral"], family: "pink", vibe: "everyday" },
  { code: "LLS3", name: "Roman Red", hex: "#b81f2a", depth: ["light", "medium", "deep"], undertone: ["cool", "neutral"], family: "red", vibe: "bold" },
  { code: "LLS7", name: "Faded Brown", hex: "#8a5a4a", depth: ["medium", "deep"], undertone: ["warm", "neutral"], family: "brown", vibe: "everyday" },
  { code: "LLS9", name: "Blush Pink Red", hex: "#c94960", depth: ["light", "medium"], undertone: ["cool", "neutral"], family: "pink", vibe: "bold" },
  { code: "LLS11", name: "Pueblo Brown", hex: "#a05540", depth: ["medium", "deep"], undertone: ["warm"], family: "brown", vibe: "everyday" },
  { code: "LLS13", name: "Light Brown", hex: "#a97556", depth: ["light", "medium"], undertone: ["warm", "neutral"], family: "brown", vibe: "everyday" },
  { code: "LLS15", name: "Orangy Red", hex: "#d94a2e", depth: ["light", "medium"], undertone: ["warm"], family: "red", vibe: "bold" },
  { code: "LLS17", name: "Rich Violet", hex: "#6a1f4a", depth: ["medium", "deep"], undertone: ["cool"], family: "berry", vibe: "bold" },
  { code: "LLS19", name: "Dark Brown", hex: "#5a3229", depth: ["deep"], undertone: ["warm", "neutral"], family: "brown", vibe: "bold" },
  { code: "LLS21", name: "Pearsian Pink", hex: "#d47a8c", depth: ["light", "medium"], undertone: ["cool"], family: "pink", vibe: "everyday" },
  { code: "LLS23", name: "Blush Red", hex: "#b83c4a", depth: ["medium", "deep"], undertone: ["cool", "neutral"], family: "red", vibe: "everyday" },
  { code: "LLS25", name: "Brownish Red", hex: "#8b3a34", depth: ["medium", "deep"], undertone: ["warm", "neutral"], family: "red", vibe: "bold" },
];

type Answers = {
  depth?: Depth;
  undertone?: Undertone;
  family?: Family;
  vibe?: Vibe;
};

type Question = {
  key: keyof Answers;
  eyebrow: string;
  title: string;
  help?: string;
  options: { value: string; label: string; hint?: string; swatch?: string }[];
};

const QUESTIONS: Question[] = [
  {
    key: "depth",
    eyebrow: "Question 1 of 4",
    title: "How would you describe your skin tone?",
    options: [
      { value: "light", label: "Fair to light", hint: "Rarely tans, burns easily", swatch: "#f0d3bd" },
      { value: "medium", label: "Medium to wheatish", hint: "Tans gradually", swatch: "#d3a072" },
      { value: "deep", label: "Deep", hint: "Rich, deep complexion", swatch: "#7a4a30" },
    ],
  },
  {
    key: "undertone",
    eyebrow: "Question 2 of 4",
    title: "What do the veins on your wrist look like?",
    help: "This is the easiest way to read your undertone.",
    options: [
      { value: "cool", label: "Bluish or purple", hint: "Cool undertone", swatch: "#8f9bd1" },
      { value: "warm", label: "Greenish", hint: "Warm undertone", swatch: "#b0a066" },
      { value: "neutral", label: "A mix of both", hint: "Neutral undertone", swatch: "#c2a89b" },
    ],
  },
  {
    key: "family",
    eyebrow: "Question 3 of 4",
    title: "Which shade family do you reach for most?",
    options: [
      { value: "pink", label: "Pinks", swatch: "#e8a7ae" },
      { value: "red", label: "Reds", swatch: "#b81f2a" },
      { value: "brown", label: "Browns & nudes", swatch: "#a05540" },
      { value: "berry", label: "Berry & plum", swatch: "#6a1f4a" },
    ],
  },
  {
    key: "vibe",
    eyebrow: "Question 4 of 4",
    title: "What are you shopping for?",
    options: [
      { value: "everyday", label: "Everyday wear", hint: "Soft, office and college friendly" },
      { value: "bold", label: "Going out", hint: "High impact, statement lips" },
    ],
  },
];

function scoreShade(shade: Shade, a: Answers) {
  let score = 0;
  if (a.depth && shade.depth.includes(a.depth)) score += 3;
  if (a.undertone && shade.undertone.includes(a.undertone)) score += 3;
  if (a.family && shade.family === a.family) score += 4;
  if (a.vibe && shade.vibe === a.vibe) score += 2;
  return score;
}

function ShadeQuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const done = step >= QUESTIONS.length;

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", LIPSTICK_HANDLE],
    queryFn: () => fetchProductByHandle(LIPSTICK_HANDLE),
    enabled: done,
  });

  const matches = useMemo(() => {
    if (!done) return [];
    return [...SHADES]
      .map((s) => ({ shade: s, score: scoreShade(s, answers) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [answers, done]);

  const q = QUESTIONS[step];

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-16 sm:px-10 lg:py-24">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-fog hover:text-charcoal"
      >
        <ArrowLeft className="h-3 w-3" /> Back to home
      </Link>

      <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-[-0.03em] text-charcoal sm:text-6xl lg:text-7xl">
        Lip shade finder
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-fog">
        Four quick taps and we&apos;ll match you to shades from the Premium Matte Liquid Lipstick
        range.
      </p>

      {/* Progress */}
      <div className="mt-10 flex gap-1.5">
        {QUESTIONS.map((item, i) => (
          <div
            key={item.key}
            className="h-[4px] flex-1"
            style={{
              backgroundColor:
                i < step || done ? "var(--color-charcoal)" : "var(--color-border, #e5e0d8)",
            }}
          />
        ))}
      </div>

      {!done && q && (
        <section className="mt-12">
          <div className="text-[11px] uppercase tracking-[0.28em] text-berry">{q.eyebrow}</div>
          <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl lg:text-5xl">
            {q.title}
          </h2>
          {q.help && <p className="mt-3 text-base text-fog">{q.help}</p>}

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {q.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setAnswers((prev) => ({ ...prev, [q.key]: opt.value }));
                  setStep((s) => s + 1);
                }}
                className="flex items-center gap-4 border border-border p-6 text-left transition-colors hover:border-charcoal hover:bg-charcoal/[0.03] lg:flex-col lg:items-start lg:gap-5 lg:p-8"
              >
                {opt.swatch && (
                  <span
                    className="h-12 w-12 flex-shrink-0 rounded-full lg:h-20 lg:w-20"
                    style={{ backgroundColor: opt.swatch }}
                  />
                )}
                <span>
                  <span className="block text-base text-charcoal">{opt.label}</span>
                  {opt.hint && <span className="mt-1 block text-sm text-fog">{opt.hint}</span>}
                </span>
              </button>
            ))}
          </div>

          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="mt-8 text-[11px] uppercase tracking-[0.18em] text-fog hover:text-charcoal"
            >
              ← Previous question
            </button>
          )}
        </section>
      )}


      {done && (
        <section className="mt-12">
          <div className="text-[11px] uppercase tracking-[0.28em] text-berry">Your matches</div>
          <h2 className="mt-3 font-display text-3xl text-charcoal sm:text-4xl lg:text-5xl">
            These shades were made for you.
          </h2>


          {isLoading && (
            <div className="mt-8 flex items-center gap-2 text-fog">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading shades…
            </div>
          )}

          {!isLoading && (
            <div className="mt-8 space-y-4">
              {matches.map(({ shade }, i) => (
                <ResultCard key={shade.code} shade={shade} product={product} top={i === 0} />
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setStep(0);
            }}
            className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-fog hover:text-charcoal"
          >
            <RotateCcw className="h-3 w-3" /> Retake the quiz
          </button>
        </section>
      )}
    </main>
  );
}

type ProductNode = Awaited<ReturnType<typeof fetchProductByHandle>> | undefined;

function ResultCard({
  shade,
  product,
  top,
}: {
  shade: Shade;
  product: ProductNode;
  top: boolean;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const setOpen = useCartStore((s) => s.setOpen);
  const isLoading = useCartStore((s) => s.isLoading);
  const [adding, setAdding] = useState(false);

  const variant = product?.variants?.edges?.find((e) =>
    e.node.title.toUpperCase().includes(shade.code.toUpperCase()),
  )?.node;

  const handleAdd = async () => {
    if (!product || !variant) return;
    setAdding(true);
    try {
      await addItem({
        product: { node: product },
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: 1,
        selectedOptions: variant.selectedOptions ?? [],
      });
      setOpen(true);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 border border-border p-4 sm:flex-row sm:items-center">
      <span
        className="h-16 w-16 flex-shrink-0 rounded-full"
        style={{ backgroundColor: shade.hex }}
        aria-hidden
      />
      <div className="flex-1">
        {top && (
          <div className="text-[10px] uppercase tracking-[0.22em] text-berry">Best match</div>
        )}
        <div className="font-display text-xl text-charcoal">
          {shade.name} · {shade.code}
        </div>
        <div className="mt-0.5 text-xs text-fog">Premium Matte Liquid Lipstick</div>
        {variant && (
          <div className="mt-1 text-sm text-charcoal">
            {formatMoney(variant.price.amount, variant.price.currencyCode)}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 sm:items-end">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!variant || !variant.availableForSale || adding || isLoading}
          className="inline-flex items-center justify-center gap-2 bg-charcoal px-6 py-3 text-[12px] uppercase tracking-[0.18em] text-ivory transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {adding ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {variant?.availableForSale === false ? "Sold out" : "Add to cart"}
              <ShoppingBag className="h-4 w-4" />
            </>
          )}
        </button>
        <Link
          to="/product/$slug"
          params={{ slug: LIPSTICK_HANDLE }}
          className="text-[11px] uppercase tracking-[0.18em] text-fog hover:text-charcoal"
        >
          View product
        </Link>
      </div>
    </div>
  );
}
