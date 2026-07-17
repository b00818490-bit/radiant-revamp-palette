import { ArrowRight, Play } from "lucide-react";
import type { SectionProps, SectionSchema } from "@/theme/types";

type Settings = {
  eyebrow: string;
  heading_line_1: string;
  heading_line_2: string;
  heading_line_2_italic: string;
  heading_line_3: string;
  body: string;
  primary_cta_label: string;
  primary_cta_url: string;
  secondary_cta_label: string;
  secondary_cta_url: string;
  image: string;
  image_alt: string;
  overlay_product_name: string;
  overlay_product_meta: string;
  overlay_product_image: string;
  overlay_cta_label: string;
  overlay_cta_url: string;
  background_color: string;
  text_color: string;
  accent_color: string;
  show_video_button: boolean;
};

type BlockSettings = { value: string; label: string };

export const schema: SectionSchema = {
  name: "Hero",
  settings: [
    { id: "eyebrow", type: "text", label: "Eyebrow", default: "Autumn Edit · 2026" },
    { id: "heading_line_1", type: "text", label: "Heading line 1", default: "Colour that" },
    { id: "heading_line_2", type: "text", label: "Heading line 2 (before italic)", default: "" },
    { id: "heading_line_2_italic", type: "text", label: "Italic emphasis", default: "actually" },
    { id: "heading_line_3", type: "text", label: "Heading line 3", default: "loves your skin." },
    { id: "body", type: "textarea", label: "Body copy", default: "" },
    { id: "primary_cta_label", type: "text", label: "Primary CTA label", default: "Shop Best Sellers" },
    { id: "primary_cta_url", type: "url", label: "Primary CTA link", default: "#" },
    { id: "secondary_cta_label", type: "text", label: "Secondary CTA label", default: "Find Your Shade" },
    { id: "secondary_cta_url", type: "url", label: "Secondary CTA link", default: "#" },
    { id: "image", type: "image_picker", label: "Hero image" },
    { id: "image_alt", type: "text", label: "Hero image alt", default: "" },
    { id: "overlay_product_name", type: "text", label: "Overlay product name", default: "" },
    { id: "overlay_product_meta", type: "text", label: "Overlay product meta", default: "" },
    { id: "overlay_product_image", type: "image_picker", label: "Overlay product image" },
    { id: "overlay_cta_label", type: "text", label: "Overlay CTA label", default: "Shop" },
    { id: "overlay_cta_url", type: "url", label: "Overlay CTA link", default: "#" },
    { id: "background_color", type: "color", label: "Background", default: "#3b3b3d" },
    { id: "text_color", type: "color", label: "Text", default: "#faf6f1" },
    { id: "accent_color", type: "color", label: "Accent", default: "#9e2a5c" },
    { id: "show_video_button", type: "checkbox", label: "Show video button", default: true },
  ],
  max_blocks: 6,
  blocks: [
    {
      type: "stat",
      name: "Stat",
      settings: [
        { id: "value", type: "text", label: "Value", default: "4.9★" },
        { id: "label", type: "text", label: "Label", default: "12,400 reviews" },
      ],
    },
  ],
};

export function Section({ settings, blocks = [] }: SectionProps<Settings, BlockSettings>) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: settings.background_color, color: settings.text_color }}
    >
      <div className="mx-auto grid min-h-[86vh] max-w-[1440px] gap-0 lg:grid-cols-12">
        <div className="relative flex flex-col justify-between px-6 py-14 sm:px-10 lg:col-span-6 lg:px-16 lg:py-20">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] opacity-60">
            <span className="h-px w-8" style={{ backgroundColor: settings.accent_color }} />
            {settings.eyebrow}
          </div>

          <div className="mt-10 lg:mt-0">
            <h1
              className="text-[13vw] leading-[0.92] tracking-[-0.035em] sm:text-[9vw] lg:text-[6.5vw]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {settings.heading_line_1}
              <br />
              {settings.heading_line_2}{" "}
              <span className="italic" style={{ color: settings.accent_color }}>
                {settings.heading_line_2_italic}
              </span>{" "}
              <br />
              {settings.heading_line_3}
            </h1>
            {settings.body && (
              <p className="mt-8 max-w-md text-base leading-relaxed opacity-70">{settings.body}</p>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              {settings.primary_cta_label && (
                <a
                  href={settings.primary_cta_url}
                  className="group inline-flex items-center gap-2 px-7 py-4 text-[13px] uppercase tracking-[0.18em] transition-opacity hover:opacity-90"
                  style={{ backgroundColor: settings.accent_color, color: settings.text_color }}
                >
                  {settings.primary_cta_label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              )}
              {settings.secondary_cta_label && (
                <a
                  href={settings.secondary_cta_url}
                  className="inline-flex items-center gap-2 border px-7 py-4 text-[13px] uppercase tracking-[0.18em] transition-colors"
                  style={{ borderColor: `${settings.text_color}40` }}
                >
                  {settings.secondary_cta_label}
                </a>
              )}
            </div>
          </div>

          {blocks.length > 0 && (
            <div className="mt-14 grid max-w-lg grid-cols-3 gap-6 text-[11px] uppercase tracking-[0.18em] opacity-70 lg:mt-0">
              {blocks.map((b, i) => (
                <div key={i}>
                  <div
                    className="mb-1 text-3xl"
                    style={{ fontFamily: "var(--font-display)", color: settings.text_color }}
                  >
                    {b.settings.value}
                  </div>
                  {b.settings.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative min-h-[520px] lg:col-span-6 lg:min-h-full">
          {settings.image && (
            <img
              src={settings.image}
              alt={settings.image_alt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
          )}
          {settings.overlay_product_name && (
            <div
              className="absolute bottom-8 left-8 right-8 flex items-center gap-4 p-5 shadow-2xl lg:right-auto lg:max-w-sm"
              style={{ backgroundColor: "#ffffff", color: settings.background_color }}
            >
              {settings.overlay_product_image && (
                <img
                  src={settings.overlay_product_image}
                  alt=""
                  className="h-20 w-20 object-cover"
                  loading="lazy"
                />
              )}
              <div className="min-w-0 flex-1">
                <div
                  className="text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: settings.accent_color }}
                >
                  Featured
                </div>
                <div className="text-lg leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                  {settings.overlay_product_name}
                </div>
                <div className="mt-1 text-xs opacity-60">{settings.overlay_product_meta}</div>
              </div>
              <a
                href={settings.overlay_cta_url}
                className="border-b pb-0.5 text-xs uppercase tracking-[0.18em]"
                style={{ borderColor: settings.background_color }}
              >
                {settings.overlay_cta_label}
              </a>
            </div>
          )}
          {settings.show_video_button && (
            <button
              aria-label="Play brand video"
              className="absolute right-8 top-8 flex h-14 w-14 items-center justify-center rounded-full bg-white/95 transition-transform hover:scale-105"
              style={{ color: settings.background_color }}
            >
              <Play className="h-5 w-5 fill-current" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
