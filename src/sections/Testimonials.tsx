import { Star } from "lucide-react";
import type { SectionProps, SectionSchema } from "@/theme/types";

type Settings = { eyebrow: string; heading: string; background_color: string; text_color: string };
type BlockSettings = { quote: string; author: string; source: string; rating: number };

export const schema: SectionSchema = {
  name: "Testimonials",
  settings: [
    { id: "eyebrow", type: "text", label: "Eyebrow", default: "In their words" },
    { id: "heading", type: "text", label: "Heading", default: "12,400 five-star reviews and counting." },
    { id: "background_color", type: "color", label: "Background", default: "#faf6f1" },
    { id: "text_color", type: "color", label: "Text", default: "#3b3b3d" },
  ],
  max_blocks: 12,
  blocks: [
    {
      type: "review",
      name: "Review",
      settings: [
        { id: "quote", type: "textarea", label: "Quote", default: "" },
        { id: "author", type: "text", label: "Author", default: "" },
        { id: "source", type: "text", label: "Source", default: "Verified buyer" },
        { id: "rating", type: "range", label: "Rating", min: 1, max: 5, step: 1, default: 5 },
      ],
    },
  ],
};

export function Section({ settings, blocks = [] }: SectionProps<Settings, BlockSettings>) {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ backgroundColor: settings.background_color, color: settings.text_color }}
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            {settings.eyebrow && (
              <div className="mb-3 text-[11px] uppercase tracking-[0.28em]" style={{ color: "var(--color-primary)" }}>
                {settings.eyebrow}
              </div>
            )}
            <h2 className="max-w-2xl text-4xl leading-[0.95] sm:text-5xl">{settings.heading}</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map((b, i) => (
            <figure
              key={i}
              className="flex flex-col justify-between border p-8"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="mb-6 flex gap-1">
                {Array.from({ length: b.settings.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" style={{ color: "var(--color-yellow)" }} />
                ))}
              </div>
              <blockquote
                className="text-xl leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                “{b.settings.quote}”
              </blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-[0.2em] opacity-60">
                {b.settings.author} · {b.settings.source}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
