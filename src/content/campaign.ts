/**
 * ============================================================================
 *  CAMPAIGN CONTENT — the one file to edit for routine content changes.
 * ============================================================================
 *
 *  This file holds CONTENT ONLY. It contains no layout, no styling and no
 *  component code, so editing it can never change the visual design.
 *  The UI components read these values; they never hardcode copy.
 *
 *  What lives here:
 *    - Hero headline / subtitle / image / CTA
 *    - Announcement bar messages
 *    - Promotional banner (off by default)
 *    - Sale text + sale percentage
 *    - Featured collection
 *    - Campaign start / end dates
 *
 *  Scheduling: set `campaign.starts_at` / `ends_at` and the campaign-only
 *  content (promo banner, sale copy, campaign announcement messages) turns
 *  itself on and off automatically on those dates. Everything outside the
 *  campaign block is evergreen and always shows.
 *
 *  Placeholders you can use inside any text field below:
 *    {{sale_percent}}  -> e.g. "25%"
 *    {{code}}          -> e.g. "GLOW25"
 *    {{ends}}          -> e.g. "31 Aug"
 */

export interface CtaContent {
  label: string;
  /** Internal path ("/collection/lips") or in-page anchor ("#bestsellers"). */
  url: string;
}

export interface CampaignContent {
  /* ---------------------------------------------------------------- Hero -- */
  hero: {
    /** Rendered as three parts; the middle word is italic. Leave blank to skip. */
    headline_line_1: string;
    headline_line_2: string;
    headline_line_2_italic: string;
    headline_line_3: string;
    eyebrow: string;
    subtitle: string;
    /** Image or video URL (mp4 plays as a looping video). */
    image: string;
    image_alt: string;
    primary_cta: CtaContent;
    secondary_cta: CtaContent;
  };

  /* ------------------------------------------------- Featured collection -- */
  /** Collection shown in the "Bestsellers" rail + where its eyebrow links. */
  featured_collection: {
    /** Collection slug, e.g. "best-sellers", "lips", "new-arrivals". */
    slug: string;
    eyebrow: string;
    heading: string;
  };

  /* --------------------------------------------------- Announcement bar -- */
  /** Always-on messages in the scrolling bar at the top of the home page. */
  announcement_messages: string[];
  /** One-line announcement used in the header on inner pages. */
  header_announcement: string;

  /* ------------------------------------------------------------ Campaign -- */
  campaign: {
    /** Master switch. Set false to force the campaign off regardless of dates. */
    enabled: boolean;
    /** ISO dates, e.g. "2026-08-15". Leave "" for "no start" / "no end". */
    starts_at: string;
    ends_at: string;

    /** Sale details, reusable via {{sale_percent}} / {{code}} / {{ends}}. */
    sale: {
      /** Number only — the "%" is added for you. Use 0 for a non-% offer. */
      percent: number;
      /** Short label, e.g. "Monsoon Sale". */
      text: string;
      /** Discount code, or "" if the offer is automatic. */
      code: string;
    };

    /** Extra messages appended to the announcement bar while the campaign runs. */
    promotional_messages: string[];

    /**
     * Slim promotional banner shown under the header.
     * `enabled: false` keeps the current design untouched.
     */
    banner: {
      enabled: boolean;
      text: string;
      cta: CtaContent;
      background_color: string;
      text_color: string;
    };
  };
}

export const campaignContent: CampaignContent = {
  hero: {
    eyebrow: "",
    headline_line_1: "Beauty",
    headline_line_2: "for",
    headline_line_2_italic: "all",
    headline_line_3: "",
    subtitle:
      "Clean color and skincare made with pigment that performs. Zero mystery. Zero compromise.",
    image: "https://cdn.shopify.com/videos/c/o/v/fbc58ea961a54186a23fc9c403fdcd1e.mp4",
    image_alt: "Greyon hero video",
    primary_cta: { label: "Shop Best Sellers", url: "#bestsellers" },
    secondary_cta: { label: "", url: "#shade" },
  },

  featured_collection: {
    slug: "best-sellers",
    eyebrow: "Bestsellers",
    heading: "Loved by our customers.",
  },

  announcement_messages: [
    "Free shipping over ₹599",
    "Lab tested",
    "Cruelty-free",
    "Easy returns within 3 days of delivery",
    "Premium Matte Liquid Lipstick — 12 shades",
  ],

  header_announcement: "Free shipping on orders above ₹599 · Lab tested · Made in India",

  campaign: {
    enabled: false,
    starts_at: "",
    ends_at: "",

    sale: {
      percent: 0,
      text: "",
      code: "",
    },

    promotional_messages: [],

    banner: {
      enabled: false,
      text: "{{sale_percent}} off sitewide with code {{code}} · ends {{ends}}",
      cta: { label: "Shop the sale", url: "/collection/all" },
      background_color: "#9e2a5c",
      text_color: "#faf6f1",
    },
  },
};
