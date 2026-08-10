/**
 * Applies CONTENT (src/content/campaign.ts) onto PRESENTATION
 * (src/templates/index.json) at render time.
 *
 * The template keeps every design decision — colors, layout, section order,
 * animation speeds. This file only swaps the text, images, links and messages
 * that come from the campaign config. Nothing here renders anything.
 */
import { campaignContent, type CampaignContent } from "@/content/campaign";
import type { PageTemplate } from "@/theme/types";

/** True when the campaign is switched on and today falls inside its dates. */
export function isCampaignActive(
  content: CampaignContent = campaignContent,
  now: Date = new Date(),
): boolean {
  const { enabled, starts_at, ends_at } = content.campaign;
  if (!enabled) return false;
  const today = now.getTime();
  if (starts_at) {
    const start = new Date(`${starts_at}T00:00:00`).getTime();
    if (!Number.isNaN(start) && today < start) return false;
  }
  if (ends_at) {
    // End date is inclusive — the campaign runs through the end of that day.
    const end = new Date(`${ends_at}T23:59:59`).getTime();
    if (!Number.isNaN(end) && today > end) return false;
  }
  return true;
}

/** "25%" when a percentage is set, otherwise "". */
export function salePercentLabel(content: CampaignContent = campaignContent): string {
  const pct = content.campaign.sale.percent;
  return pct > 0 ? `${pct}%` : "";
}

/** Replaces {{sale_percent}}, {{code}} and {{ends}} inside any copy. */
export function fillTokens(text: string, content: CampaignContent = campaignContent): string {
  const ends = content.campaign.ends_at
    ? new Date(`${content.campaign.ends_at}T00:00:00`).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
      })
    : "";
  return text
    .replace(/\{\{\s*sale_percent\s*\}\}/g, salePercentLabel(content))
    .replace(/\{\{\s*code\s*\}\}/g, content.campaign.sale.code)
    .replace(/\{\{\s*ends\s*\}\}/g, ends);
}

/** The announcement-bar messages, including campaign ones while it runs. */
export function announcementMessages(content: CampaignContent = campaignContent): string[] {
  const base = content.announcement_messages;
  const promo = isCampaignActive(content) ? content.campaign.promotional_messages : [];
  return [...promo, ...base].map((m) => fillTokens(m, content)).filter(Boolean);
}

/**
 * Returns a copy of the template with campaign content merged in.
 * Section types, order, colors and all other settings are left untouched.
 */
export function applyCampaign(
  template: PageTemplate,
  content: CampaignContent = campaignContent,
): PageTemplate {
  const next: PageTemplate = {
    ...template,
    sections: { ...template.sections },
  };

  const hero = next.sections["hero"];
  if (hero) {
    next.sections["hero"] = {
      ...hero,
      settings: {
        ...hero.settings,
        eyebrow: fillTokens(content.hero.eyebrow, content),
        heading_line_1: content.hero.headline_line_1,
        heading_line_2: content.hero.headline_line_2,
        heading_line_2_italic: content.hero.headline_line_2_italic,
        heading_line_3: content.hero.headline_line_3,
        body: fillTokens(content.hero.subtitle, content),
        image: content.hero.image,
        image_alt: content.hero.image_alt,
        primary_cta_label: fillTokens(content.hero.primary_cta.label, content),
        primary_cta_url: content.hero.primary_cta.url,
        secondary_cta_label: fillTokens(content.hero.secondary_cta.label, content),
        secondary_cta_url: content.hero.secondary_cta.url,
      },
    };
  }

  const announcement = next.sections["announcement"];
  if (announcement) {
    next.sections["announcement"] = {
      ...announcement,
      blocks: announcementMessages(content).map((text) => ({
        type: "message",
        settings: { text },
      })),
    };
  }

  const featured = next.sections["featured_products"];
  if (featured) {
    next.sections["featured_products"] = {
      ...featured,
      settings: {
        ...featured.settings,
        eyebrow: fillTokens(content.featured_collection.eyebrow, content),
        heading: fillTokens(content.featured_collection.heading, content),
        collection_slug: content.featured_collection.slug,
      },
    };
  }

  return next;
}
