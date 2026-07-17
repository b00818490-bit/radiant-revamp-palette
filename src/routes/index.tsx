import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { SectionRenderer } from "@/theme/SectionRenderer";
import { resolveAssets } from "@/theme/assets";
import type { PageTemplate } from "@/theme/types";
import indexTemplate from "@/templates/index.json";

/**
 * The home route is now a thin renderer of `templates/index.json`.
 * All content is data — see `src/theme/settings.ts` for globals,
 * `src/templates/index.json` for section order + content, and
 * `src/sections/*` for each section (paired with its Shopify schema).
 *
 * See SHOPIFY_PORTING.md for the mapping to Shopify OS 2.0 sections.
 */
export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ property: "og:url", content: "https://radiant-revamp-palette.lovable.app/" }],
    links: [{ rel: "canonical", href: "https://radiant-revamp-palette.lovable.app/" }],
  }),
});

function Home() {
  const template = resolveAssets(indexTemplate) as PageTemplate;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader announcement={false} />
      <main>
        <SectionRenderer template={template} />
      </main>
      <Footer />
    </div>
  );
}
