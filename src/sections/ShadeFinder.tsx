import { ArrowRight } from "lucide-react";
import type { SectionProps, SectionSchema } from "@/theme/types";

type Settings = {
  eyebrow: string;
  heading: string;
  body: string;
  cta_label: string;
  cta_url: string;
  caption: string;
};

type BlockSettings = { name: string; color: string };

export const schema: SectionSchema = {
  name: "Shade finder",
  settings: [
    { id: "eyebrow", type: "text", label: "Eyebrow", default: "Shade finder" },
    { id: "heading", type: "text", label: "Heading", default: "Your undertone, matched in 60 seconds." },
    { id: "body", type: "textarea", label: "Body", default: "" },
    { id: "cta_label", type: "text", label: "CTA label", default: "Start the quiz" },
    { id: "cta_url", type: "url", label: "CTA link", default: "#" },
    { id: "caption", type: "text", label: "Caption", default: "Velvet Matte Lipstick collection" },
  ],
  max_blocks: 12,
  blocks: [
    {
      type: "swatch",
      name: "Swatch",
      settings: [
        { id: "name", type: "text", label: "Shade name", default: "N°01 Bare" },
        { id: "color", type: "color", label: "Color", default: "#c99b8a" },
      ],
    },
  ],
};

export function Section({ settings, blocks = [] }: SectionProps<Settings, BlockSettings>) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          {settings.eyebrow && (
            <div className="mb-3 text-[11px] uppercase tracking-[0.28em]" style={{ color: "var(--color-primary)" }}>
              {settings.eyebrow}
            </div>
          )}
          <h2 className="mb-6 text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">{settings.heading}</h2>
          {settings.body && (
            <p className="mb-8 max-w-md text-base leading-relaxed" style={{ color: "var(--color-fog)" }}>
              {settings.body}
            </p>
          )}
          {settings.cta_label && (
            <a
              href={settings.cta_url}
              className="inline-flex items-center gap-2 px-7 py-4 text-[13px] uppercase tracking-[0.18em] text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: "var(--color-charcoal)" }}
            >
              {settings.cta_label} <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {blocks.map((b, i) => (
              <button
                key={i}
                aria-label={`Select shade ${b.settings.name}`}
                className="group relative aspect-square overflow-hidden"
                style={{ backgroundColor: b.settings.color }}
              >
                <div className="absolute inset-0 flex items-end bg-black/30 p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white">
                    {b.settings.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <div
            className="mt-6 flex items-center justify-between text-xs"
            style={{ color: "var(--color-fog)" }}
          >
            <span>{settings.caption}</span>
            <span
              className="text-[color:var(--color-charcoal)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {blocks.length} shades
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
