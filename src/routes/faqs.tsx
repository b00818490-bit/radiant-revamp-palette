import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/faqs")({
  component: FaqPage,
  head: () => ({
    meta: [
      { title: "FAQs — Orders, Shipping, Returns & Formulations | Greyon" },
      {
        name: "description",
        content:
          "Answers to common Greyon questions: payments and COD, shipping timelines, returns within 3 days, product formulations, shade selection and the brand behind Greyon.",
      },
      { property: "og:title", content: "Greyon FAQs" },
      {
        property: "og:description",
        content:
          "Payments, shipping, returns, formulations and brand questions — answered.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Faq = { q: string; a: string };
type Category = { id: string; title: string; faqs: Faq[] };

const CATEGORIES: Category[] = [
  {
    id: "orders-payments",
    title: "Orders & payments",
    faqs: [
      {
        q: "What payment methods can I use?",
        a: "You can pay with UPI, credit and debit cards, net banking and popular wallets. Cash on delivery is available on serviceable pin codes and is shown at checkout when eligible.",
      },
      {
        q: "Are prices inclusive of taxes?",
        a: "Yes. Every price on the site is in Indian Rupees and inclusive of all applicable taxes. Shipping, if any, is calculated at checkout.",
      },
      {
        q: "Can I change or cancel my order after placing it?",
        a: "Write to info@greyon.co or WhatsApp +91 93192 34233 as soon as possible. If the order hasn't been dispatched yet, we can usually amend or cancel it. Once it has shipped, it follows the standard return process.",
      },
      {
        q: "Do I need an account to order?",
        a: "No — you can check out as a guest. Creating an account lets you save your delivery address, keep a wishlist and check out faster next time.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping & delivery",
    faqs: [
      {
        q: "When is shipping free?",
        a: "Shipping is free on all orders above ₹599 within India. Orders below that carry a small delivery fee shown at checkout.",
      },
      {
        q: "How long will my order take?",
        a: "Orders are processed within 1–2 business days. After dispatch, delivery takes 3–10 working days depending on your location.",
      },
      {
        q: "Where do you deliver?",
        a: "We ship to all serviceable pin codes across India. If your pin code isn't covered by our courier partners, we'll inform you and refund the order in full.",
      },
      {
        q: "How do I track my order?",
        a: "You'll receive a tracking link and courier details over SMS or email once your parcel is dispatched.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & refunds",
    faqs: [
      {
        q: "What is your return window?",
        a: "You can raise a return or exchange request within 3 days of delivery for unopened items in their original packaging with seals, labels and barcodes intact.",
      },
      {
        q: "How do I start a return?",
        a: "Email info@greyon.co within 3 business days of delivery with your order ID, a photo of the product and the invoice. We arrange a pickup within 2–4 business days.",
      },
      {
        q: "When will I get my refund?",
        a: "Once the returned product reaches and passes our check, refunds are processed within 24–48 business hours to your original payment method (or by bank transfer for COD orders). Banks may take 2–3 extra business days to credit it.",
      },
      {
        q: "What can't be returned?",
        a: "Used or altered products, items missing original packaging, tags or freebies, products damaged by misuse, and personal care appliances (for hygiene reasons). Free gifts must be returned along with the order.",
      },
      {
        q: "I received a damaged or wrong product. What now?",
        a: "Contact us within 3 days of delivery with photos of the product and invoice. We'll pick it up and send a replacement, or refund you in full if the replacement isn't in stock.",
      },
    ],
  },
  {
    id: "products",
    title: "Products & formulations",
    faqs: [
      {
        q: "Are Greyon products lab tested?",
        a: "Yes. Our formulas are lab tested before they go to market, and every batch carries a manufacturing date, batch code and best-before date on the pack.",
      },
      {
        q: "Are your products vegan and cruelty-free?",
        a: "Yes — our formulations are vegan and we don't test on animals.",
      },
      {
        q: "Is the lip balm safe for daily use?",
        a: "Our Lip Balm is petroleum-free, doesn't darken lips, and is made with natural fruit extracts in Strawberry, Green Apple and Blueberry. It's designed for everyday, all-season use.",
      },
      {
        q: "What's the shelf life?",
        a: "Best before 24 months from the packaging date. The exact manufacturing date and batch code are printed on each pack and listed in the Legal Information section of every product page.",
      },
      {
        q: "Where are Greyon products made?",
        a: "Everything is made in India — manufactured and marketed by Greygon Cosmetics LLP, Delhi.",
      },
      {
        q: "How do I choose the right lipstick shade?",
        a: "Use our Lip Shade Finder quiz — a few quick questions about your skin tone, undertone and the finish you like, and it matches you to shades from the Premium Matte Liquid Lipstick range.",
      },
    ],
  },
  {
    id: "brand",
    title: "About Greyon",
    faqs: [
      {
        q: "Who is behind Greyon?",
        a: "Greyon is a beauty brand by Greygon Cosmetics LLP, Delhi, built on decades of experience in the cosmetics business and a simple idea: Beauty For All.",
      },
      {
        q: "What does Greyon stand for?",
        a: "Inclusive shade ranges, honest claims, lab-tested and vegan formulas, and accessible pricing — beauty that works for every skin tone and every day.",
      },
      {
        q: "How do I contact customer care?",
        a: "Email info@greyon.co or WhatsApp +91 93192 34233. We're happy to help with orders, shades and product questions.",
      },
      {
        q: "Where can I follow Greyon?",
        a: "We're on Instagram, Facebook, YouTube and X as @greyon_cosmetics / Greyon Cosmetics — links are in the footer.",
      },
    ],
  },
];

function FaqPage() {
  const [active, setActive] = useState(CATEGORIES[0]!.id);
  const category = CATEGORIES.find((c) => c.id === active)!;

  return (
    <div className="min-h-screen bg-white text-charcoal">
      <SiteHeader />
      <main className="mx-auto max-w-[1100px] px-6 py-16 lg:py-24">
        <div className="text-[11px] uppercase tracking-[0.28em] text-berry">Help centre</div>
        <h1 className="mt-3 font-display text-5xl lg:text-6xl leading-[0.95] tracking-[-0.03em]">
          Frequently asked questions
        </h1>
        <p className="mt-5 max-w-2xl text-fog leading-relaxed">
          Orders, shipping, returns, formulations and the brand — all in one place.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <nav className="lg:col-span-4">
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-0">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => setActive(c.id)}
                    className={`w-full border px-4 py-3 text-left text-[11px] uppercase tracking-[0.2em] transition-colors lg:border-x-0 lg:border-t-0 ${
                      active === c.id
                        ? "border-berry bg-berry text-ivory lg:bg-transparent lg:text-berry"
                        : "border-border text-fog hover:text-charcoal"
                    }`}
                  >
                    {c.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl tracking-[-0.02em]">{category.title}</h2>
            <div className="mt-6 border-t border-border">
              {category.faqs.map((faq) => (
                <FaqItem key={faq.q} faq={faq} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border border-border bg-ivory p-8">
          <h2 className="font-display text-3xl tracking-[-0.02em]">Still need a hand?</h2>
          <p className="mt-3 text-sm text-fog">
            Email{" "}
            <a href="mailto:info@greyon.co" className="text-charcoal underline underline-offset-4">
              info@greyon.co
            </a>{" "}
            or WhatsApp{" "}
            <a
              href="https://wa.me/919319234233"
              target="_blank"
              rel="noreferrer"
              className="text-charcoal underline underline-offset-4"
            >
              +91 93192 34233
            </a>
            .
          </p>
          <Link
            to="/shipping-returns"
            className="mt-6 inline-block border border-charcoal px-6 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-charcoal hover:text-ivory transition-colors"
          >
            Shipping &amp; returns policy
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FaqItem({ faq }: { faq: Faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm text-charcoal">{faq.q}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-fog transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="pb-5 text-sm leading-relaxed text-fog">{faq.a}</p>}
    </div>
  );
}
