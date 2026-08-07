import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useWishlistStore } from "@/stores/wishlistStore";
import type { ShopifyProductNode, ShopifyVariant } from "@/lib/shopify";

export function WishlistButton({
  product,
  variant,
  className = "",
  withLabel = false,
}: {
  product: ShopifyProductNode;
  variant?: ShopifyVariant;
  className?: string;
  withLabel?: boolean;
}) {
  const items = useWishlistStore((s) => s.items);
  const toggle = useWishlistStore((s) => s.toggle);
  const saved = items.some((i) => i.handle === product.handle);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggle(product, variant);
    toast[added ? "success" : "message"](added ? "Saved to wishlist" : "Removed from wishlist", {
      description: product.title,
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
      className={`inline-flex items-center justify-center gap-2 transition ${
        saved ? "text-berry" : "text-fog hover:text-berry"
      } ${className}`}
    >
      <Heart className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
      {withLabel && (
        <span className="text-[11px] uppercase tracking-[0.2em]">
          {saved ? "Saved" : "Save"}
        </span>
      )}
    </button>
  );
}
