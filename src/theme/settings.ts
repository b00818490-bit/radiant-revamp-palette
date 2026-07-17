/**
 * Global theme settings — the equivalent of Shopify's `config/settings_data.json`.
 * Every value here maps to an input in `config/settings_schema.json` when porting.
 */

export const themeSettings = {
  brand: {
    name: "Greyon",
    tagline: "Clean color. Serious skincare.",
    logo_text: "greyon",
    social_image: "https://www.greyon.co/social-cover.jpg",
  },
  colors: {
    background: "#faf6f1",
    foreground: "#3b3b3d",
    primary: "#9e2a5c",
    primary_foreground: "#faf6f1",
    accent: "#b8925a",
    muted: "#f1ece5",
    border: "#e6ded2",
    // Palette accents
    charcoal: "#3b3b3d",
    ivory: "#faf6f1",
    fog: "#828284",
    berry: "#9e2a5c",
    gold: "#b8925a",
    orange: "#df7e35",
    yellow: "#f5c518",
    green: "#7cb342",
    blue: "#16a1d4",
  },
  typography: {
    heading_family: "'Cormorant Garamond', ui-serif, Georgia, serif",
    body_family: "'Karla', ui-sans-serif, system-ui, sans-serif",
    heading_weight: 500,
    heading_tracking: "-0.02em",
  },
  layout: {
    container_max: "1440px",
    section_padding_y: "5rem",
    section_gap: "1rem",
    radius: "4px",
  },
  social: [
    { platform: "instagram", url: "https://instagram.com/greyon" },
    { platform: "facebook", url: "https://facebook.com/greyon" },
    { platform: "youtube", url: "https://youtube.com/@greyon" },
  ],
  contact: {
    email: "hello@greyon.co",
    hours: "Mon–Fri, 9am–6pm CET",
    address_line_1: "Herengracht 168",
    address_line_2: "1016 BP Amsterdam, NL",
  },
  compliance: {
    fda_notice: "Formulas registered under the U.S. Modernization of Cosmetics Regulation Act (MoCRA).",
    eu_responsible_party: "Greyon EU B.V., Herengracht 168, 1016 BP Amsterdam, NL. CPNP-notified per EC 1223/2009.",
  },
} as const;

export type ThemeSettings = typeof themeSettings;
