import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  ShoppingBag,
  Lock,
  Truck,
  RefreshCw,
  ShieldCheck,
  Plus,
  Minus,
  Trash2,
  Loader2,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { useCartStore } from "@/stores/cartStore";
import { formatMoney } from "@/lib/shopify";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({
    meta: [
      { title: "Secure checkout — Greyon" },
      {
        name: "description",
        content:
          "Review your Greyon bag and check out securely. Free shipping over ₹599, lab-tested formulas and easy returns within 3 days of delivery.",
      },
      { property: "og:title", content: "Secure checkout — Greyon" },
      {
        property: "og:description",
        content: "Review your bag and pay securely. Free shipping over ₹599, lab-tested formulas and easy returns within 3 days.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const FREE_SHIPPING_THRESHOLD = 599;

type Form = {
  email: string;
  full_name: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
};

const EMPTY: Form = {
  email: "",
  full_name: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
};

function CheckoutPage() {
  const navigate = useNavigate();
  const {
    items,
    isLoading,
    isSyncing,
    updateQuantity,
    removeItem,
    getCheckoutUrl,
    syncCart,
    cost,
    setBuyerIdentity,
  } = useCartStore();
  const [form, setForm] = useState<Form>(EMPTY);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    syncCart();
  }, [syncCart]);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const s = data.session;
      setSession(s);
      if (!s) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone, address1, address2, city, state, pincode")
        .eq("id", s.user.id)
        .maybeSingle();
      setForm((f) => ({
        ...f,
        email: s.user.email ?? "",
        full_name: profile?.full_name ?? "",
        phone: profile?.phone ?? "",
        address1: profile?.address1 ?? "",
        address2: profile?.address2 ?? "",
        city: profile?.city ?? "",
        state: profile?.state ?? "",
        pincode: profile?.pincode ?? "",
      }));
    });
  }, []);

  // Totals come from Shopify's cart cost object; local math is only a
  // pre-sync fallback so the UI never flashes empty.
  const currency = cost?.subtotalAmount.currencyCode ?? items[0]?.price.currencyCode ?? "INR";
  const subtotal = cost
    ? parseFloat(cost.subtotalAmount.amount)
    : items.reduce((sum, i) => sum + parseFloat(i.price.amount) * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 49;
  const total = subtotal + shipping;

  const set = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const proceed = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = getCheckoutUrl();
    if (!url) {
      toast.error("Your bag is empty");
      return;
    }
    // Open the new tab during the user gesture so mobile browsers do not
    // block it while profile and buyer details are being saved.
    const checkoutWindow = window.open("about:blank", "_blank");
    if (session) {
      await supabase.from("profiles").upsert({
        id: session.user.id,
        email: session.user.email,
        full_name: form.full_name,
        phone: form.phone,
        address1: form.address1,
        address2: form.address2,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      });
    }
    // Hand the buyer details to Shopify so its checkout is pre-filled and
    // shipping/taxes are calculated against the real delivery address.
    const [firstName, ...restName] = form.full_name.trim().split(/\s+/);
    await setBuyerIdentity({
      email: form.email || undefined,
      phone: form.phone || undefined,
      countryCode: "IN",
      deliveryAddress: {
        firstName: firstName || undefined,
        lastName: restName.join(" ") || undefined,
        address1: form.address1 || undefined,
        address2: form.address2 || undefined,
        city: form.city || undefined,
        province: form.state || undefined,
        zip: form.pincode || undefined,
        country: "IN",
        phone: form.phone || undefined,
      },
    });
    // Shopify signs this URL; changing its host or query string can make the
    // checkout invalid. Always use the latest URL exactly as returned.
    const target = getCheckoutUrl() ?? url;
    if (checkoutWindow) checkoutWindow.location.href = target;
    else window.location.assign(target);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white text-charcoal">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-6 py-28 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-fog" />
          <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-[-0.03em]">
            Your bag is empty
          </h1>
          <p className="mt-4 text-fog text-sm">
            Add something you love — or move a saved item over from your wishlist.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/collection/$slug"
              params={{ slug: "all" }}
              className="bg-berry px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-ivory"
            >
              Shop all products
            </Link>
            <Link
              to="/wishlist"
              className="border border-border px-7 py-3 text-[11px] uppercase tracking-[0.2em]"
            >
              View wishlist
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-charcoal">
      <SiteHeader />
      <main className="mx-auto max-w-[1200px] px-5 sm:px-8 py-12 lg:py-16">
        <button
          onClick={() => navigate({ to: "/collection/$slug", params: { slug: "all" } })}
          className="mb-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-fog hover:text-berry"
        >
          <ChevronLeft className="h-3 w-3" /> Continue shopping
        </button>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Details */}
          <form onSubmit={proceed} className="lg:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.28em] text-berry">Checkout</div>
            <h1 className="mt-2 font-display text-5xl leading-[0.95] tracking-[-0.03em]">
              Delivery details
            </h1>
            {!session && (
              <p className="mt-3 text-sm text-fog">
                <Link to="/account" className="text-berry underline underline-offset-4">
                  Sign in
                </Link>{" "}
                to autofill your saved address, or continue as a guest.
              </p>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Email">
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    className="input-line"
                    placeholder="you@example.com"
                  />
                </Field>
              </div>
              <Field label="Full name">
                <input required value={form.full_name} onChange={set("full_name")} className="input-line" />
              </Field>
              <Field label="Phone">
                <input required value={form.phone} onChange={set("phone")} className="input-line" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Address line 1">
                  <input required value={form.address1} onChange={set("address1")} className="input-line" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Address line 2 (optional)">
                  <input value={form.address2} onChange={set("address2")} className="input-line" />
                </Field>
              </div>
              <Field label="City">
                <input required value={form.city} onChange={set("city")} className="input-line" />
              </Field>
              <Field label="State">
                <input required value={form.state} onChange={set("state")} className="input-line" />
              </Field>
              <Field label="PIN code">
                <input required value={form.pincode} onChange={set("pincode")} className="input-line" />
              </Field>
            </div>

            <button
              type="submit"
              disabled={isLoading || isSyncing}
              className="mt-8 flex w-full items-center justify-center gap-2 bg-berry py-4 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-berry/90 disabled:opacity-60"
            >
              {isLoading || isSyncing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Continue to secure payment
                </>
              )}
            </button>
            <p className="mt-3 flex items-center gap-2 text-xs text-fog">
              <ExternalLink className="h-3 w-3" />
              Payment is completed on a secure, encrypted checkout page (UPI, cards, netbanking, COD
              where available).
            </p>
          </form>

          {/* Summary */}
          <aside className="lg:col-span-5">
            <div className="border border-border bg-ivory p-6">
              <h2 className="text-[11px] uppercase tracking-[0.24em] text-fog">Order summary</h2>

              <div className="mt-6 space-y-5">
                {items.map((item) => {
                  const img = item.product.node.images?.edges?.[0]?.node;
                  return (
                    <div key={item.variantId} className="flex gap-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden bg-muted">
                        {img && (
                          <img
                            src={img.url}
                            alt={img.altText ?? item.product.node.title}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm">{item.product.node.title}</div>
                        {item.variantTitle && item.variantTitle !== "Default Title" && (
                          <div className="mt-0.5 text-xs text-fog">{item.variantTitle}</div>
                        )}
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center border border-border">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              className="flex h-7 w-7 items-center justify-center hover:bg-muted"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-xs">{item.quantity}</span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              className="flex h-7 w-7 items-center justify-center hover:bg-muted"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            type="button"
                            aria-label="Remove item"
                            onClick={() => removeItem(item.variantId)}
                            className="text-fog hover:text-berry"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm">
                        {formatMoney(
                          parseFloat(item.price.amount) * item.quantity,
                          item.price.currencyCode,
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
                <Row label="Subtotal" value={formatMoney(subtotal, currency)} />
                <Row
                  label="Shipping"
                  value={shipping === 0 ? "Free" : formatMoney(shipping, currency)}
                />
                <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
                  <span>Total</span>
                  <span>{formatMoney(total, currency)}</span>
                </div>
                {shipping > 0 && (
                  <p className="pt-1 text-xs text-fog">
                    Add {formatMoney(FREE_SHIPPING_THRESHOLD - subtotal, currency)} more for free
                    shipping.
                  </p>
                )}
              </div>

              <div className="mt-6 grid gap-3 border-t border-border pt-5 text-[10px] uppercase tracking-[0.18em] text-fog">
                <span className="flex items-center gap-2">
                  <Truck className="h-3.5 w-3.5 text-berry" /> Free shipping over ₹599
                </span>
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-3.5 w-3.5 text-berry" /> Returns within 3 days of delivery
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-berry" /> Lab tested · Made in India
                </span>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-fog">
      <span>{label}</span>
      <span className="text-charcoal">{value}</span>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-fog">{label}</span>
      {children}
    </label>
  );
}
