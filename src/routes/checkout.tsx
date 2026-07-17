import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ShoppingBag,
  Lock,
  Check,
  ChevronRight,
  Truck,
  RefreshCw,
  ShieldCheck,
  Plus,
  Minus,
  Tag,
  Sparkles,
  Package,
  Mail,
  Apple,
  CreditCard,
  Info,
} from "lucide-react";
import { Footer } from "@/components/Footer";

import prod1 from "@/assets/prod1.jpg";
import prod2 from "@/assets/prod2.jpg";
import prod3 from "@/assets/prod3.jpg";
import prod4 from "@/assets/prod4.jpg";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({
    meta: [
      { title: "Checkout — Greyon" },
      {
        name: "description",
        content:
          "Secure checkout with guest and express options. Free shipping over $50, easy returns, and upfront delivery timelines.",
      },
      { property: "og:title", content: "Checkout — Greyon" },
    ],
  }),
});

type Step = "information" | "shipping" | "payment";

const STEPS: { id: Step; label: string }[] = [
  { id: "information", label: "Information" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
];

type CartItem = {
  id: string;
  name: string;
  shade: string;
  price: number;
  qty: number;
  image: string;
};

const INITIAL_CART: CartItem[] = [
  { id: "vm", name: "Velvet Matte Lipstick", shade: "Berry Noir", price: 28, qty: 1, image: prod1 },
  { id: "gs", name: "Glow Serum", shade: "1 oz", price: 48, qty: 1, image: prod2 },
];

const BUMPS: CartItem[] = [
  { id: "tm", name: "Travel Mascara", shade: "Onyx", price: 12, qty: 1, image: prod3 },
  { id: "lb", name: "Lip Balm — Bestseller", shade: "Clear", price: 14, qty: 1, image: prod4 },
];

function CheckoutPage() {
  const [step, setStep] = useState<Step>("information");
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [addedBumps, setAddedBumps] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [payMethod, setPayMethod] = useState("card");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [placed, setPlaced] = useState(false);

  const subtotal = useMemo(
    () => cart.reduce((s, i) => s + i.price * i.qty, 0),
    [cart],
  );
  const freeShipThreshold = 50;
  const remaining = Math.max(0, freeShipThreshold - subtotal);
  const shipping =
    shippingMethod === "express" ? 12 : subtotal >= freeShipThreshold ? 0 : 6;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const tax = Math.round((subtotal - discount) * 0.08);
  const total = subtotal - discount + shipping + tax;

  const updateQty = (id: string, delta: number) =>
    setCart((c) =>
      c
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0),
    );

  const addBump = (b: CartItem) => {
    if (addedBumps.includes(b.id)) return;
    setAddedBumps((a) => [...a, b.id]);
    setCart((c) => [...c, b]);
  };

  if (placed) return <Confirmation total={total} email={email} />;

  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3B3B3D]">
      <TopBar />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 lg:grid-cols-[1fr_460px]">
        {/* Left: form */}
        <div className="border-b border-[#e6ded2] px-6 py-10 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
          <ProgressBar step={step} setStep={setStep} />

          {step === "information" && (
            <InformationStep
              email={email}
              setEmail={setEmail}
              onNext={() => setStep("shipping")}
            />
          )}
          {step === "shipping" && (
            <ShippingStep
              method={shippingMethod}
              setMethod={setShippingMethod}
              subtotal={subtotal}
              onBack={() => setStep("information")}
              onNext={() => setStep("payment")}
            />
          )}
          {step === "payment" && (
            <PaymentStep
              method={payMethod}
              setMethod={setPayMethod}
              onBack={() => setStep("shipping")}
              onPlace={() => setPlaced(true)}
              total={total}
            />
          )}

          <PolicyStrip />
        </div>

        {/* Right: order summary */}
        <aside className="bg-white px-6 py-10 lg:px-10 lg:py-14">
          <FreeShipBanner remaining={remaining} />

          <div className="mt-6 space-y-5">
            {cart.map((item) => (
              <CartRow key={item.id} item={item} onQty={updateQty} />
            ))}
          </div>

          <OrderBumps
            bumps={BUMPS.filter((b) => !addedBumps.includes(b.id))}
            onAdd={addBump}
          />

          <div className="mt-6 flex gap-2">
            <div className="relative flex-1">
              <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#828284]" />
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Promo code"
                className="w-full rounded-sm border border-[#e6ded2] bg-[#FAF6F1] py-3 pl-9 pr-3 text-sm outline-none focus:border-[#9E2A5C]"
              />
            </div>
            <button
              onClick={() => setPromoApplied(promo.trim().length > 0)}
              className="rounded-sm border border-[#3B3B3D] px-5 text-sm font-medium hover:bg-[#3B3B3D] hover:text-white"
            >
              Apply
            </button>
          </div>
          {promoApplied && (
            <p className="mt-2 flex items-center gap-1 text-xs text-[#7CB342]">
              <Check className="h-3 w-3" /> 10% off applied
            </p>
          )}

          <div className="mt-6 space-y-2 border-t border-[#e6ded2] pt-6 text-sm">
            <SummaryRow label="Subtotal" value={`$${subtotal}`} />
            {discount > 0 && (
              <SummaryRow
                label="Discount"
                value={`-$${discount}`}
                accent="text-[#9E2A5C]"
              />
            )}
            <SummaryRow
              label="Shipping"
              value={shipping === 0 ? "FREE" : `$${shipping}`}
            />
            <SummaryRow label="Tax (est.)" value={`$${tax}`} />
            <div className="flex items-baseline justify-between border-t border-[#e6ded2] pt-3 text-base font-medium">
              <span>Total</span>
              <span className="font-display text-2xl">${total}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3 rounded-sm bg-[#FAF6F1] p-4 text-xs text-[#828284]">
            <div className="flex items-start gap-2">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-[#3B3B3D]" />
              <p>
                <span className="font-medium text-[#3B3B3D]">Order by 2pm ET</span> for
                same-day dispatch. Standard arrives in 3–5 business days.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-[#3B3B3D]" />
              <p>
                <span className="font-medium text-[#3B3B3D]">30-day returns.</span>{" "}
                Free returns on unopened items, no questions asked.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#3B3B3D]" />
              <p>
                <span className="font-medium text-[#3B3B3D]">Secure checkout.</span>{" "}
                256-bit SSL. Your details are encrypted end-to-end.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}

function TopBar() {
  return (
    <header className="border-b border-[#e6ded2] bg-[#FAF6F1]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <Link to="/" className="font-display text-2xl tracking-tight">
          Greyon
        </Link>
        <div className="flex items-center gap-2 text-xs text-[#828284]">
          <Lock className="h-3.5 w-3.5" />
          Secure checkout
        </div>
      </div>
    </header>
  );
}

function ProgressBar({
  step,
  setStep,
}: {
  step: Step;
  setStep: (s: Step) => void;
}) {
  const currentIdx = STEPS.findIndex((s) => s.id === step);
  return (
    <ol className="mb-10 flex items-center gap-2 text-xs">
      {STEPS.map((s, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <li key={s.id} className="flex items-center gap-2">
            <button
              onClick={() => done && setStep(s.id)}
              className={`flex items-center gap-2 ${done ? "cursor-pointer" : "cursor-default"}`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-medium ${
                  active
                    ? "bg-[#9E2A5C] text-white"
                    : done
                    ? "bg-[#3B3B3D] text-white"
                    : "border border-[#e6ded2] text-[#828284]"
                }`}
              >
                {done ? <Check className="h-3 w-3" /> : i + 1}
              </span>
              <span
                className={`uppercase tracking-widest ${
                  active
                    ? "font-medium text-[#3B3B3D]"
                    : done
                    ? "text-[#3B3B3D]"
                    : "text-[#828284]"
                }`}
              >
                {s.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <ChevronRight className="h-3 w-3 text-[#828284]" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function ExpressButtons() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <button className="flex h-12 items-center justify-center rounded-sm bg-[#5A31F4] text-sm font-semibold text-white hover:opacity-90">
          Shop Pay
        </button>
        <button className="flex h-12 items-center justify-center gap-1 rounded-sm bg-[#3B3B3D] text-sm font-semibold text-white hover:opacity-90">
          <Apple className="h-4 w-4" /> Pay
        </button>
        <button className="flex h-12 items-center justify-center rounded-sm border border-[#e6ded2] bg-white text-sm font-semibold text-[#3B3B3D] hover:border-[#3B3B3D]">
          G Pay
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button className="flex h-11 items-center justify-center rounded-sm border border-[#e6ded2] bg-white text-xs font-medium text-[#3B3B3D] hover:border-[#3B3B3D]">
          Pay with <span className="ml-1 font-bold">Afterpay</span>
        </button>
        <button className="flex h-11 items-center justify-center rounded-sm border border-[#e6ded2] bg-white text-xs font-medium text-[#3B3B3D] hover:border-[#3B3B3D]">
          Pay with <span className="ml-1 font-bold text-[#FF69A4]">Klarna</span>
        </button>
      </div>
      <div className="flex items-center gap-3 py-2">
        <div className="h-px flex-1 bg-[#e6ded2]" />
        <span className="text-[11px] uppercase tracking-widest text-[#828284]">
          Or continue below
        </span>
        <div className="h-px flex-1 bg-[#e6ded2]" />
      </div>
    </div>
  );
}

function InformationStep({
  email,
  setEmail,
  onNext,
}: {
  email: string;
  setEmail: (v: string) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <ExpressButtons />

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl">Contact</h2>
          <Link to="/" className="text-xs text-[#9E2A5C] hover:underline">
            Have an account? Sign in
          </Link>
        </div>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#828284]" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email for order confirmation"
            className="w-full rounded-sm border border-[#e6ded2] bg-white py-3 pl-9 pr-3 text-sm outline-none focus:border-[#9E2A5C]"
          />
        </div>
        <label className="mt-3 flex items-center gap-2 text-xs text-[#828284]">
          <input type="checkbox" defaultChecked className="accent-[#9E2A5C]" />
          Email me with news and offers (10% off first order)
        </label>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 font-display text-xl">Shipping address</h2>
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name" />
          <Field label="Last name" />
          <div className="col-span-2">
            <Field
              label="Address"
              hint="Start typing — we'll auto-complete"
              icon={<Sparkles className="h-3.5 w-3.5 text-[#B8925A]" />}
            />
          </div>
          <div className="col-span-2">
            <Field label="Apartment, suite, etc. (optional)" />
          </div>
          <Field label="City" />
          <Field label="ZIP code" />
          <div className="col-span-2">
            <Field
              label="Phone (for delivery updates)"
              hint="We'll only text you about this order"
            />
          </div>
        </div>
        <p className="mt-3 flex items-center gap-1 text-xs text-[#7CB342]">
          <Check className="h-3.5 w-3.5" /> Address validated
        </p>
      </section>

      <button
        onClick={onNext}
        className="mt-8 w-full rounded-sm bg-[#9E2A5C] py-4 text-sm font-medium uppercase tracking-widest text-white transition hover:bg-[#3B3B3D]"
      >
        Continue to shipping
      </button>
    </div>
  );
}

function ShippingStep({
  method,
  setMethod,
  subtotal,
  onBack,
  onNext,
}: {
  method: string;
  setMethod: (v: string) => void;
  subtotal: number;
  onBack: () => void;
  onNext: () => void;
}) {
  const free = subtotal >= 50;
  const options = [
    {
      id: "standard",
      label: "Standard",
      eta: "3–5 business days",
      price: free ? 0 : 6,
      note: free ? "Free — you unlocked it 🎉" : "Free over $50",
    },
    {
      id: "express",
      label: "Express",
      eta: "1–2 business days",
      price: 12,
      note: "Order by 2pm ET today",
    },
  ];

  return (
    <div>
      <h2 className="font-display text-xl">Shipping method</h2>
      <p className="mt-1 text-sm text-[#828284]">
        Ships from our Brooklyn studio. Fully recyclable packaging.
      </p>

      <div className="mt-6 space-y-3">
        {options.map((o) => (
          <label
            key={o.id}
            className={`flex cursor-pointer items-start gap-3 rounded-sm border p-4 transition ${
              method === o.id
                ? "border-[#9E2A5C] bg-[#9E2A5C]/5"
                : "border-[#e6ded2] hover:border-[#3B3B3D]"
            }`}
          >
            <input
              type="radio"
              checked={method === o.id}
              onChange={() => setMethod(o.id)}
              className="mt-1 accent-[#9E2A5C]"
            />
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <span className="font-medium">{o.label}</span>
                <span className="text-sm font-medium">
                  {o.price === 0 ? "FREE" : `$${o.price}`}
                </span>
              </div>
              <p className="text-xs text-[#828284]">{o.eta}</p>
              <p className="mt-1 text-xs text-[#B8925A]">{o.note}</p>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-2 rounded-sm bg-[#FAF6F1] p-4 text-xs text-[#828284]">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#16A1D4]" />
        <p>
          Shipping cutoff today: <strong className="text-[#3B3B3D]">2:00 PM ET</strong>.
          Orders after ship next business day.
        </p>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={onBack}
          className="rounded-sm border border-[#3B3B3D] px-6 py-4 text-sm font-medium uppercase tracking-widest hover:bg-[#3B3B3D] hover:text-white"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 rounded-sm bg-[#9E2A5C] py-4 text-sm font-medium uppercase tracking-widest text-white hover:bg-[#3B3B3D]"
        >
          Continue to payment
        </button>
      </div>
    </div>
  );
}

function PaymentStep({
  method,
  setMethod,
  onBack,
  onPlace,
  total,
}: {
  method: string;
  setMethod: (v: string) => void;
  onBack: () => void;
  onPlace: () => void;
  total: number;
}) {
  return (
    <div>
      <h2 className="font-display text-xl">Payment</h2>
      <p className="mt-1 flex items-center gap-1 text-sm text-[#828284]">
        <Lock className="h-3.5 w-3.5" /> All transactions are secure and encrypted.
      </p>

      <div className="mt-6 space-y-3">
        <PayOption
          id="card"
          label="Credit / debit card"
          method={method}
          setMethod={setMethod}
          icon={<CreditCard className="h-4 w-4" />}
        >
          <div className="mt-4 space-y-3">
            <Field label="Card number" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Expiry (MM/YY)" />
              <Field label="CVC" />
            </div>
            <Field label="Name on card" />
          </div>
        </PayOption>
        <PayOption
          id="klarna"
          label="Klarna — 4 interest-free payments"
          method={method}
          setMethod={setMethod}
          icon={<span className="text-xs font-bold text-[#FF69A4]">K</span>}
        />
        <PayOption
          id="afterpay"
          label="Afterpay — Pay in 4"
          method={method}
          setMethod={setMethod}
          icon={<span className="text-xs font-bold">A</span>}
        />
      </div>

      <label className="mt-6 flex items-start gap-2 text-xs text-[#828284]">
        <input type="checkbox" defaultChecked className="mt-0.5 accent-[#9E2A5C]" />
        Save my info for a faster checkout next time (Shop Pay).
      </label>

      <div className="mt-8 flex gap-3">
        <button
          onClick={onBack}
          className="rounded-sm border border-[#3B3B3D] px-6 py-4 text-sm font-medium uppercase tracking-widest hover:bg-[#3B3B3D] hover:text-white"
        >
          Back
        </button>
        <button
          onClick={onPlace}
          className="flex-1 rounded-sm bg-[#9E2A5C] py-4 text-sm font-medium uppercase tracking-widest text-white hover:bg-[#3B3B3D]"
        >
          Pay ${total}
        </button>
      </div>
    </div>
  );
}

function PayOption({
  id,
  label,
  method,
  setMethod,
  icon,
  children,
}: {
  id: string;
  label: string;
  method: string;
  setMethod: (v: string) => void;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  const active = method === id;
  return (
    <div
      className={`rounded-sm border transition ${
        active ? "border-[#9E2A5C] bg-[#9E2A5C]/5" : "border-[#e6ded2]"
      }`}
    >
      <label className="flex cursor-pointer items-center gap-3 p-4">
        <input
          type="radio"
          checked={active}
          onChange={() => setMethod(id)}
          className="accent-[#9E2A5C]"
        />
        <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-white">
          {icon}
        </span>
        <span className="text-sm font-medium">{label}</span>
      </label>
      {active && children && <div className="border-t border-[#e6ded2] p-4">{children}</div>}
    </div>
  );
}

function Field({
  label,
  hint,
  icon,
}: {
  label: string;
  hint?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <div className="relative">
        <input
          placeholder={label}
          className="peer w-full rounded-sm border border-[#e6ded2] bg-white py-3 px-3 text-sm outline-none focus:border-[#9E2A5C]"
        />
        {icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">{icon}</span>
        )}
      </div>
      {hint && <p className="mt-1 text-[11px] text-[#828284]">{hint}</p>}
    </div>
  );
}

function FreeShipBanner({ remaining }: { remaining: number }) {
  const pct = Math.min(100, ((50 - remaining) / 50) * 100);
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between text-xs">
        <span className="uppercase tracking-widest text-[#828284]">
          Free shipping
        </span>
        <span className="font-medium text-[#3B3B3D]">
          {remaining === 0 ? "Unlocked 🎉" : `$${remaining} to go`}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[#FAF6F1]">
        <div
          className="h-full rounded-full bg-[#9E2A5C] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function CartRow({
  item,
  onQty,
}: {
  item: CartItem;
  onQty: (id: string, d: number) => void;
}) {
  return (
    <div className="flex gap-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm bg-[#FAF6F1]">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#3B3B3D] text-[10px] font-medium text-white">
          {item.qty}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{item.name}</p>
        <p className="text-xs text-[#828284]">{item.shade}</p>
        <div className="mt-2 flex items-center gap-1">
          <button
            onClick={() => onQty(item.id, -1)}
            className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#e6ded2] hover:border-[#3B3B3D]"
            aria-label="Decrease"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="w-6 text-center text-xs">{item.qty}</span>
          <button
            onClick={() => onQty(item.id, 1)}
            className="flex h-6 w-6 items-center justify-center rounded-sm border border-[#e6ded2] hover:border-[#3B3B3D]"
            aria-label="Increase"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="text-sm font-medium">${item.price * item.qty}</div>
    </div>
  );
}

function OrderBumps({
  bumps,
  onAdd,
}: {
  bumps: CartItem[];
  onAdd: (b: CartItem) => void;
}) {
  if (bumps.length === 0) return null;
  return (
    <div className="mt-8 rounded-sm border border-dashed border-[#B8925A] bg-[#B8925A]/5 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#B8925A]" />
        <p className="text-xs font-medium uppercase tracking-widest text-[#B8925A]">
          Add before you go
        </p>
      </div>
      <div className="space-y-3">
        {bumps.map((b) => (
          <div key={b.id} className="flex items-center gap-3">
            <img src={b.image} alt="" className="h-12 w-12 rounded-sm object-cover" />
            <div className="flex-1">
              <p className="text-sm font-medium leading-tight">{b.name}</p>
              <p className="text-xs text-[#828284]">${b.price}</p>
            </div>
            <button
              onClick={() => onAdd(b)}
              className="rounded-sm border border-[#3B3B3D] px-3 py-1.5 text-xs font-medium hover:bg-[#3B3B3D] hover:text-white"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-[#828284]">{label}</span>
      <span className={`font-medium ${accent ?? "text-[#3B3B3D]"}`}>{value}</span>
    </div>
  );
}

function PolicyStrip() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#e6ded2] pt-6 text-[11px] uppercase tracking-widest text-[#828284]">
      <span className="flex items-center gap-1">
        <ShieldCheck className="h-3.5 w-3.5" /> Secure SSL
      </span>
      <span className="flex items-center gap-1">
        <RefreshCw className="h-3.5 w-3.5" /> 30-day returns
      </span>
      <span className="flex items-center gap-1">
        <Truck className="h-3.5 w-3.5" /> Free ship over $50
      </span>
      <span className="flex items-center gap-1">
        <Package className="h-3.5 w-3.5" /> Carbon-neutral
      </span>
    </div>
  );
}

function Confirmation({ total, email }: { total: number; email: string }) {
  const orderId = "GRY-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  return (
    <div className="min-h-screen bg-[#FAF6F1] text-[#3B3B3D]">
      <TopBar />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7CB342]/15">
          <Check className="h-8 w-8 text-[#7CB342]" />
        </div>
        <p className="mt-6 text-xs uppercase tracking-widest text-[#828284]">
          Order {orderId}
        </p>
        <h1 className="mt-2 font-display text-4xl leading-tight">
          Thank you — your order is confirmed.
        </h1>
        <p className="mt-3 text-sm text-[#828284]">
          A confirmation is on its way to{" "}
          <span className="font-medium text-[#3B3B3D]">
            {email || "your inbox"}
          </span>
          . You'll get tracking as soon as it ships.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <TimelineStep
            n={1}
            label="Order placed"
            time="Just now"
            done
            icon={<Check className="h-4 w-4" />}
          />
          <TimelineStep
            n={2}
            label="Packed & shipped"
            time="Within 24 hrs"
            icon={<Package className="h-4 w-4" />}
          />
          <TimelineStep
            n={3}
            label="On your doorstep"
            time="3–5 business days"
            icon={<Truck className="h-4 w-4" />}
          />
        </div>

        <div className="mt-10 rounded-sm border border-[#e6ded2] bg-white p-6">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-[#828284]">Total charged</span>
            <span className="font-display text-2xl">${total}</span>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <button className="rounded-sm bg-[#9E2A5C] py-4 text-sm font-medium uppercase tracking-widest text-white hover:bg-[#3B3B3D]">
            Track order
          </button>
          <button className="rounded-sm border border-[#3B3B3D] py-4 text-sm font-medium uppercase tracking-widest hover:bg-[#3B3B3D] hover:text-white">
            Start a return
          </button>
          <Link
            to="/"
            className="flex items-center justify-center rounded-sm border border-[#e6ded2] py-4 text-sm font-medium uppercase tracking-widest hover:border-[#3B3B3D]"
          >
            Continue shopping
          </Link>
        </div>

        <div className="mt-10 rounded-sm bg-white p-6">
          <div className="flex items-start gap-3">
            <ShoppingBag className="mt-1 h-5 w-5 text-[#B8925A]" />
            <div>
              <p className="text-sm font-medium">
                Get 15% off your next order
              </p>
              <p className="text-xs text-[#828284]">
                Join the Greyon insider list for early access to drops & shade
                previews.
              </p>
            </div>
            <button className="ml-auto rounded-sm border border-[#3B3B3D] px-4 py-2 text-xs font-medium uppercase tracking-widest hover:bg-[#3B3B3D] hover:text-white">
              Join
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function TimelineStep({
  n,
  label,
  time,
  done,
  icon,
}: {
  n: number;
  label: string;
  time: string;
  done?: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-sm border p-4 ${
        done ? "border-[#7CB342] bg-[#7CB342]/5" : "border-[#e6ded2] bg-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
            done ? "bg-[#7CB342] text-white" : "bg-[#FAF6F1] text-[#828284]"
          }`}
        >
          {done ? icon : n}
        </span>
        <span className="text-xs uppercase tracking-widest text-[#828284]">
          Step {n}
        </span>
      </div>
      <p className="mt-3 text-sm font-medium">{label}</p>
      <p className="text-xs text-[#828284]">{time}</p>
    </div>
  );
}
