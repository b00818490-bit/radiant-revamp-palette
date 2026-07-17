import type { SectionProps, SectionSchema } from "@/theme/types";

type Settings = {
  eyebrow: string;
  speed_seconds: number;
  background_color: string;
  text_color: string;
  divider: boolean;
};

type BlockSettings = { label: string };

export const schema: SectionSchema = {
  name: "Press marquee",
  settings: [
    { id: "eyebrow", type: "text", label: "Eyebrow", default: "As seen in" },
    { id: "speed_seconds", type: "range", label: "Speed (s)", min: 20, max: 120, step: 5, default: 40 },
    { id: "background_color", type: "color", label: "Background", default: "#faf6f1" },
    { id: "text_color", type: "color", label: "Text", default: "#3b3b3d" },
    { id: "divider", type: "checkbox", label: "Show divider", default: true },
  ],
  max_blocks: 20,
  blocks: [
    { type: "logo", name: "Logo text", settings: [{ id: "label", type: "text", label: "Label", default: "VOGUE" }] },
  ],
};

export function Section({ settings, blocks = [] }: SectionProps<Settings, BlockSettings>) {
  const items = blocks.map((b) => b.settings.label);
  const loop = [...items, ...items, ...items];
  return (
    <section
      className={`overflow-hidden py-8 ${settings.divider ? "border-y" : ""}`}
      style={{
        backgroundColor: settings.background_color,
        color: settings.text_color,
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-10 px-6 sm:px-10">
        {settings.eyebrow && (
          <div className="hidden max-w-[140px] shrink-0 text-[11px] uppercase tracking-[0.24em] opacity-60 md:block">
            {settings.eyebrow}
          </div>
        )}
        <div className="relative flex-1 overflow-hidden">
          <div
            className="marquee-track flex whitespace-nowrap"
            style={{ animationDuration: `${settings.speed_seconds}s` }}
          >
            {loop.map((p, i) => (
              <span
                key={i}
                className="mx-10 text-2xl tracking-[0.08em] opacity-70"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
