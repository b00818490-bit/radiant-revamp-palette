/**
 * Global theme settings — the equivalent of Shopify's `config/settings_data.json`.
 * Every value here maps to an input in `config/settings_schema.json` when porting.
 */

export const themeSettings = {
  brand: {
    name: "Greyon",
    tagline: "Beauty For All",
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
    { platform: "instagram", url: "https://instagram.com/greyon_cosmetics" },
    { platform: "facebook", url: "https://www.facebook.com/greyon.co/" },
    { platform: "youtube", url: "https://youtube.com/@greyon_cosmetics" },
    { platform: "linkedin", url: "https://www.linkedin.com/company/greyon/" },
    { platform: "whatsapp", url: "https://wa.me/919319234233" },
  ],
  contact: {
    email: "info@greyon.co",
    whatsapp: "+91 93192 34233",
    hours: "Mon–Sat, 10am–7pm IST",
    address_line_1: "",
    address_line_2: "",
  },
  compliance: {
    fda_notice: "",
    eu_responsible_party: "",
  },
} as const;

export type ThemeSettings = typeof themeSettings;
