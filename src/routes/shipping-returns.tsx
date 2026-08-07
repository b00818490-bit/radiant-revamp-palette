import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, RefreshCw, PackageCheck, Wallet, Mail } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/shipping-returns")({
  component: ShippingReturnsPage,
  head: () => ({
    meta: [
      { title: "Shipping & Returns Policy — Greyon" },
      {
        name: "description",
        content:
          "Greyon shipping and returns: free shipping on orders above ₹599, delivery in 3–10 working days across India, and easy returns within 3 days of delivery.",
      },
      { property: "og:title", content: "Shipping & Returns Policy — Greyon" },
      {
        property: "og:description",
        content:
          "Free shipping above ₹599, delivery in 3–10 working days, and returns within 3 days of delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const HIGHLIGHTS = [
  { Icon: Truck, title: "Free shipping over ₹599", copy: "On all orders shipped within India." },
  { Icon: PackageCheck, title: "Dispatch in 1–2 days", copy: "Delivery in 3–10 working days." },
  { Icon: RefreshCw, title: "3-day return window", copy: "Raise a request within 3 days of delivery." },
  { Icon: Wallet, title: "Refunds in 24–48 hrs", copy: "Processed once the return reaches us." },
];

function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-white text-charcoal">
      <SiteHeader />
      <main className="mx-auto max-w-[1000px] px-6 py-16 lg:py-24">
        <div className="text-[11px] uppercase tracking-[0.28em] text-berry">Customer care</div>
        <h1 className="mt-3 font-display text-5xl lg:text-6xl leading-[0.95] tracking-[-0.03em]">
          Shipping &amp; returns
        </h1>
        <p className="mt-5 max-w-2xl text-fog leading-relaxed">
          Everything about how your Greyon order reaches you, and what to do if something isn't
          right.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map(({ Icon, title, copy }) => (
            <div key={title} className="border border-border bg-ivory p-6">
              <Icon className="h-5 w-5 text-berry" />
              <div className="mt-4 text-sm font-medium">{title}</div>
              <p className="mt-1 text-xs text-fog leading-relaxed">{copy}</p>
            </div>
          ))}
        </div>

        <Section title="Shipping charges">
          <ul>
            <li>Free shipping on all orders above ₹599.</li>
            <li>Orders below ₹599 carry a nominal shipping fee shown at checkout.</li>
          </ul>
        </Section>

        <Section title="Delivery timeline">
          <ul>
            <li>Orders are typically processed within 1–2 business days.</li>
            <li>Once shipped, delivery takes 3–10 working days depending on your location.</li>
            <li>You receive a tracking link over SMS or email once the order is dispatched.</li>
          </ul>
        </Section>

        <Section title="Delivery coverage">
          <p>
            We ship across all serviceable pin codes in India. If your pin code isn't covered by our
            delivery partners, we'll inform you and process a full refund.
          </p>
        </Section>

        <Section title="Delays">
          <p>
            Deliveries may occasionally be delayed by public holidays, natural calamities or local
            restrictions. We appreciate your patience during such times.
          </p>
        </Section>

        <Section title="Returns &amp; exchanges (India)">
          <p>
            You can raise a return or exchange request within 3 days of delivery. Partial returns
            are accepted — you may return one or all products in an order.
          </p>
          <ol>
            <li>
              Email <a href="mailto:info@greyon.co" className="text-berry underline underline-offset-4">info@greyon.co</a>{" "}
              within 3 business days of receiving the order.
            </li>
            <li>Share your order ID, an image of the product and the invoice.</li>
            <li>
              We pick up the products within 2–4 business days. Refund or replacement is initiated
              only if products arrive in original packaging with seals, labels and barcodes intact.
            </li>
          </ol>
        </Section>

        <Section title="What cannot be returned">
          <ul>
            <li>Products damaged due to misuse or overuse.</li>
            <li>Items returned without original packaging, price tags, labels or freebies.</li>
            <li>Used or altered products, or products with tampered serial numbers.</li>
            <li>Requests raised after the return window has closed.</li>
            <li>Free products or gifts provided by the brand (these must be returned with the order).</li>
            <li>Personal care appliances, for hygiene reasons.</li>
          </ul>
        </Section>

        <Section title="Damaged, defective or wrong product">
          <p>
            Every shipment goes through a quality check, but if a product reaches you damaged,
            defective or incorrect, contact us within 3 days of delivery with photos of the product
            and invoice. We'll arrange a pickup and process a replacement or refund. Replacements
            are subject to stock; if unavailable, we refund the full amount.
          </p>
        </Section>

        <Section title="Refunds">
          <ul>
            <li>
              Card and net banking payments are refunded to the original account within 24–48
              business hours of the return being received and verified; banks may take 2–3 extra
              business days to reflect it.
            </li>
            <li>
              Cash-on-delivery orders are refunded by bank transfer to the details you share, on the
              same timeline.
            </li>
            <li>Refunds can also be issued as Greyon coupons for future purchases.</li>
          </ul>
        </Section>

        <div className="mt-16 border border-border bg-ivory p-8">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-berry">
            <Mail className="h-4 w-4" /> Need help?
          </div>
          <p className="mt-3 text-sm text-fog">
            Write to{" "}
            <a href="mailto:info@greyon.co" className="text-charcoal underline underline-offset-4">
              info@greyon.co
            </a>{" "}
            or WhatsApp us at{" "}
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
            to="/faqs"
            className="mt-6 inline-block border border-charcoal px-6 py-3 text-[11px] uppercase tracking-[0.2em] hover:bg-charcoal hover:text-ivory transition-colors"
          >
            Read the FAQs
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14 border-t border-border pt-8">
      <h2 className="font-display text-3xl tracking-[-0.02em]">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-fog [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:pl-5 [&_ul]:pl-5 [&_li]:mt-2">
        {children}
      </div>
    </section>
  );
}
