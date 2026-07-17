import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://radiant-revamp-palette.lovable.app";

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
  "trending",
  "under-30",
  "gifts",
  "face",
  "lips",
  "eyes",
  "skincare",
  "tools",
  "foundation",
  "skin-tint",
  "concealer",
  "primer",
  "powder",
  "blush",
  "bronzer",
  "highlighter",
  "contour",
  "matte",
  "satin",
  "stain",
  "liner",
  "balm",
  "gloss",
  "mask",
  "scrub",
  "palette",
  "cream-shadow",
  "eyeliner",
  "brow",
  "mascara",
  "lash-serum",
  "curler",
  "cleanser",
  "toner",
  "serum",
  "moisturizer",
  "spf",
  "acne",
  "dryness",
  "dark-spots",
  "fine-lines",
  "sensitive",
];

const PRODUCT_SLUGS = [
  "velvet-matte",
  "cheek-cushion",
  "rescue-glow",
  "feather-mascara",
  "dew-drops",
  "clarity-cleanser",
  "silk-foundation",
  "night-repair",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/checkout", changefreq: "monthly", priority: "0.5" },
          { path: "/wholesale", changefreq: "monthly", priority: "0.7" },
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
