import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ShoppingBag, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import { formatMoney } from "@/lib/shopify";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
  head: () => ({
    meta: [
      { title: "Your wishlist — Greyon" },
      {
        name: "description",
        content:
          "Everything you've saved at Greyon in one place. Move your favourite lip, eye and skincare picks straight to your shopping bag.",
      },
      { property: "og:title", content: "Your wishlist — Greyon" },
      {
        property: "og:description",
        content: "Saved Greyon favourites, ready to move to your bag whenever you are.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const remove = useWishlistStore((s) => s.remove);
  const clear = useWishlistStore((s) => s.clear);
  const addItem = useCartStore((s) => s.addItem);
  const [busy, setBusy] = useState<string | null>(null);

  const moveToBag = async (handle: string, keep = false) => {
    const item = items.find((i) => i.handle === handle);
    if (!item || !item.variantId) return;
    setBusy(handle);
    try {
      await addItem({
        product: { node: item.product },
        variantId: item.variantId,
        variantTitle: item.variantTitle,
        price: item.price,
        quantity: 1,
        selectedOptions: item.selectedOptions,
      });
      if (!keep) remove(handle);
      toast.success("Moved to bag", { description: item.title });
    } finally {
      setBusy(null);
    }
  };

  const moveAll = async () => {
    for (const item of [...items]) {
      await moveToBag(item.handle);
    }
  };

  return (
    <div className="min-h-screen bg-white text-charcoal">
      <SiteHeader />
      <main className="mx-auto max-w-[1200px] px-5 sm:px-8 py-14 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-berry">Saved for later</div>
            <h1 className="mt-2 font-display text-5xl lg:text-6xl leading-[0.95] tracking-[-0.03em]">
              Your wishlist
            </h1>
            <p className="mt-3 text-fog text-sm">
              {items.length === 0
                ? "Nothing saved yet."
                : `${items.length} item${items.length !== 1 ? "s" : ""} saved on this device.`}
            </p>
          </div>
          {items.length > 0 && (
            <div className="flex gap-3">
              <button
                onClick={moveAll}
                disabled={busy !== null}
                className="bg-berry px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-berry/90 disabled:opacity-60"
              >
                Move all to bag
              </button>
              <button
                onClick={clear}
                className="border border-border px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-fog hover:text-berry"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-16 border border-border py-24 text-center">
            <Heart className="mx-auto h-10 w-10 text-fog" />
            <p className="mt-5 text-fog">
              Tap the heart on any product to save it here.
            </p>
            <Link
              to="/collection/$slug"
              params={{ slug: "all" }}
              className="mt-8 inline-block bg-berry px-7 py-3 text-[11px] uppercase tracking-[0.2em] text-ivory"
            >
              Shop all products
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-x-6 gap-y-12 grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item.handle} className="group">
                <Link
                  to="/product/$slug"
                  params={{ slug: item.handle }}
                  className="block relative aspect-square overflow-hidden bg-muted"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-contain transition duration-700 group-hover:scale-[1.04]"
                    />
                  )}
                </Link>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      to="/product/$slug"
                      params={{ slug: item.handle }}
                      className="block text-sm text-charcoal hover:text-berry"
                    >
                      {item.title}
                    </Link>
                    <div className="mt-1 text-sm text-fog">
                      {formatMoney(item.price.amount, item.price.currencyCode)}
                    </div>
                  </div>
                  <button
                    onClick={() => remove(item.handle)}
                    aria-label={`Remove ${item.title} from wishlist`}
                    className="text-fog hover:text-berry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => moveToBag(item.handle)}
                  disabled={busy === item.handle || !item.variantId}
                  className="mt-4 flex w-full items-center justify-center gap-2 bg-charcoal py-3 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-berry disabled:opacity-60"
                >
                  {busy === item.handle ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      Move to bag
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
