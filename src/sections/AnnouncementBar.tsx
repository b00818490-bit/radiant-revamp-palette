import type { SectionProps, SectionSchema } from "@/theme/types";

type Settings = {
  background_color: string;
  text_color: string;
  accent_color: string;
  speed_seconds: number;
};

type BlockSettings = { text: string };

export const schema: SectionSchema = {
  name: "Announcement bar",
  settings: [
    { id: "background_color", type: "color", label: "Background", default: "#3b3b3d" },
    { id: "text_color", type: "color", label: "Text", default: "#faf6f1" },
    { id: "accent_color", type: "color", label: "Bullet accent", default: "#9e2a5c" },
    { id: "speed_seconds", type: "range", label: "Scroll speed (s)", min: 15, max: 90, step: 5, default: 30 },
  ],
  max_blocks: 12,
  blocks: [
    {
      type: "message",
      name: "Message",
      settings: [{ id: "text", type: "text", label: "Text", default: "Free shipping over $50" }],
    },
  ],
};

export function Section({ settings, blocks = [] }: SectionProps<Settings, BlockSettings>) {
  const items = blocks.map((b) => b.settings.text);
  const loop = [...items, ...items];
  return (
    <div
      className="overflow-hidden py-2.5 text-[11px] uppercase tracking-[0.22em]"
      style={{ backgroundColor: settings.background_color, color: settings.text_color }}
    >
      <div
        className="flex whitespace-nowrap ticker-track"
        style={{ animationDuration: `${settings.speed_seconds}s` }}
      >
        {loop.map((t, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-3">
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: settings.accent_color }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
