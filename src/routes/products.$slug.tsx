import { createFileRoute, redirect } from "@tanstack/react-router";

// Old Shopify-style links (/products/handle) forward to this site's product page.
export const Route = createFileRoute("/products/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/product/$slug", params: { slug: params.slug }, statusCode: 301 });
  },
});
