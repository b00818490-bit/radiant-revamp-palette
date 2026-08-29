import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { policies } from "@/data/policies";

const BASE_URL = "https://www.greyon.co";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const COLLECTION_SLUGS = [
  "all",
  "best-sellers",
  "new",
  "under-300",
  "lips",
  "eyes",
  "skincare",
];

const PRODUCT_SLUGS = [
  "premium-matte-liquid-lipcolor",
  "regular-matte-liquid-lipcolor",
  "creme-moisturizing-lipstick",
  "regular-moisturizing-lipstick",
  "greyon-liquid-lip-gloss",
  "lip-gloss-stick",
  "lip-balm",
  "greyon-smoky-eyeliner",
  "mascara",
  "vacuum-precision-eyeliner-intense-black",
  "anti-acne-facial-oil",
  "anti-ageing-facial-oil",
  "facial-oil",
];


export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/checkout", changefreq: "monthly", priority: "0.5" },
          ...policies.map((p) => ({
            path: `/policies/${p.slug}`,
            changefreq: "yearly" as const,
            priority: "0.4",
          })),
          ...COLLECTION_SLUGS.map((slug) => ({
            path: `/collection/${slug}`,
            changefreq: "weekly" as const,
            priority: "0.8",
          })),
          ...PRODUCT_SLUGS.map((slug) => ({
            path: `/product/${slug}`,
            changefreq: "weekly" as const,
            priority: "0.9",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
