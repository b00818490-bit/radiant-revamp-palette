import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus, Trash2, ExternalLink, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatMoney } from "@/lib/shopify";

export function CartDrawer() {
  const {
    items,
    isLoading,
    isSyncing,
    isOpen,
    setOpen,
    updateQuantity,
    removeItem,
    getCheckoutUrl,
    syncCart,
  } = useCartStore();

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "USD";
  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price.amount) * item.quantity,
    0,
  );

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
      setOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-ivory">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-2xl text-charcoal">Your bag</SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? "Your bag is empty"
              : `${totalItems} item${totalItems !== 1 ? "s" : ""} in your bag`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="h-12 w-12 text-fog mx-auto mb-4" />
                <p className="text-fog text-sm">Your bag is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => {
                    const img = item.product.node.images?.edges?.[0]?.node;
                    return (
                      <div key={item.variantId} className="flex gap-4 p-2">
                        <div className="w-20 h-20 bg-muted rounded-sm overflow-hidden flex-shrink-0">
                          {img && (
                            <img
                              src={img.url}
                              alt={img.altText ?? item.product.node.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-charcoal text-sm truncate">
                            {item.product.node.title}
                          </h4>
                          {item.variantTitle && item.variantTitle !== "Default Title" && (
                            <p className="text-xs text-fog mt-0.5">{item.variantTitle}</p>
                          )}
                          <p className="mt-1 text-sm font-medium text-charcoal">
                            {formatMoney(item.price.amount, item.price.currencyCode)}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-fog hover:text-berry"
                            onClick={() => removeItem(item.variantId)}
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          <div className="flex items-center gap-1 border border-border rounded-sm">
                            <button
                              className="h-6 w-6 flex items-center justify-center hover:bg-muted"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-xs">{item.quantity}</span>
                            <button
                              className="h-6 w-6 flex items-center justify-center hover:bg-muted"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex-shrink-0 space-y-4 pt-4 border-t border-border bg-ivory">
                <div className="flex justify-between items-center">
                  <span className="text-sm uppercase tracking-widest text-fog">Subtotal</span>
                  <span className="text-lg font-medium text-charcoal">
                    {formatMoney(totalPrice, currency)}
                  </span>
                </div>
                <p className="text-xs text-fog">Shipping & taxes calculated at checkout.</p>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-berry text-ivory hover:bg-berry/90 h-12 text-xs uppercase tracking-[0.2em] rounded-none"
                  disabled={items.length === 0 || isLoading || isSyncing}
                >
                  {isLoading || isSyncing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Checkout with Shopify
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
