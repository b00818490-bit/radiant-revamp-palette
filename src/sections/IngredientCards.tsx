import type { SectionProps, SectionSchema } from "@/theme/types";

type Settings = { eyebrow: string; heading: string };
type BlockSettings = { name: string; note: string; color: string };

export const schema: SectionSchema = {
  name: "Ingredient cards",
  settings: [
    { id: "eyebrow", type: "text", label: "Eyebrow", default: "Ingredient spotlight" },
    { id: "heading", type: "text", label: "Heading", default: "Hero actives, at percentages that work." },
  ],
  max_blocks: 8,
  blocks: [
    {
      type: "ingredient",
      name: "Ingredient",
      settings: [
        { id: "name", type: "text", label: "Name", default: "" },
        { id: "note", type: "textarea", label: "Note", default: "" },
        { id: "color", type: "color", label: "Accent", default: "#16a1d4" },
      ],
    },
  ],
};

export function Section({ settings, blocks = [] }: SectionProps<Settings, BlockSettings>) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:py-28">
      <div className="mb-10">
        {settings.eyebrow && (
          <div className="mb-3 text-[11px] uppercase tracking-[0.28em]" style={{ color: "var(--color-primary)" }}>
            {settings.eyebrow}
          </div>
        )}
        <h2 className="max-w-3xl text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
          {settings.heading}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {blocks.map((b, i) => (
          <div
            key={i}
            className="relative flex aspect-[4/5] flex-col justify-between p-6"
            style={{ backgroundColor: "var(--color-muted)" }}
          >
            <div className="h-16 w-16 rounded-full" style={{ backgroundColor: b.settings.color }} />
            <div>
              <div className="text-2xl leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                {b.settings.name}
              </div>
              <div
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--color-fog)" }}
              >
                {b.settings.note}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
