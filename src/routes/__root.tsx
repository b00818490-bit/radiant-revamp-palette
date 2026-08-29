import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartSync } from "@/hooks/useCartSync";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Greyon — Clean color. Everyday care." },
      { name: "description", content: "Clean color and skincare made with pigment that performs. Shop best-sellers, find your shade, and build a routine you'll love." },
      { property: "og:title", content: "Greyon — Clean color. Everyday care." },
      { property: "og:description", content: "Clean color and skincare made with pigment that performs. Shop best-sellers, find your shade, and build a routine you'll love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Greyon — Clean color. Everyday care." },
      { name: "twitter:description", content: "Clean color and skincare made with pigment that performs. Shop best-sellers, find your shade, and build a routine you'll love." },
      { property: "og:image", content: "https://cdn.shopify.com/s/files/1/0727/7998/9300/files/Look_1_0a25c191-bcc0-4c34-b26c-d499f0c94972.png" },
      { name: "twitter:image", content: "https://cdn.shopify.com/s/files/1/0727/7998/9300/files/Look_1_0a25c191-bcc0-4c34-b26c-d499f0c94972.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Karla:wght@400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Greyon",
          url: "https://www.greyon.co",
          logo: "https://www.greyon.co/apple-touch-icon.png",
          sameAs: [
            "https://www.instagram.com/greyon_cosmetics",
            "https://x.com/GreyonCosmetics",
          ],
          description: "Clean color and skincare made with pigment that performs.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Greyon",
          url: "https://www.greyon.co",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://www.greyon.co/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify([
          { "@context": "https://schema.org", "@type": "SiteNavigationElement", name: "Shop all", url: "https://www.greyon.co/collection/all" },
          { "@context": "https://schema.org", "@type": "SiteNavigationElement", name: "Best sellers", url: "https://www.greyon.co/collection/best-sellers" },
          { "@context": "https://schema.org", "@type": "SiteNavigationElement", name: "Lips", url: "https://www.greyon.co/collection/lips" },
          { "@context": "https://schema.org", "@type": "SiteNavigationElement", name: "Eyes", url: "https://www.greyon.co/collection/eyes" },
          { "@context": "https://schema.org", "@type": "SiteNavigationElement", name: "Skincare", url: "https://www.greyon.co/collection/skincare" },
          { "@context": "https://schema.org", "@type": "SiteNavigationElement", name: "Our story", url: "https://www.greyon.co/about" },
          { "@context": "https://schema.org", "@type": "SiteNavigationElement", name: "Shipping & returns", url: "https://www.greyon.co/shipping-returns" },
          { "@context": "https://schema.org", "@type": "SiteNavigationElement", name: "FAQs", url: "https://www.greyon.co/faqs" },
        ]),
      },
    ],

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useCartSync();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <CartDrawer />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
