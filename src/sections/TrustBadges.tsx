import { Sparkles, Leaf, Truck, Heart, ShieldCheck, Award } from "lucide-react";
import type { SectionProps, SectionSchema } from "@/theme/types";

const iconMap = { sparkles: Sparkles, leaf: Leaf, truck: Truck, heart: Heart, shield: ShieldCheck, award: Award };

type Settings = { background_color: string; text_color: string; divider: boolean };
type BlockSettings = { icon: keyof typeof iconMap; title: string; body: string };

export const schema: SectionSchema = {
  name: "Trust badges",
  settings: [
    { id: "background_color", type: "color", label: "Background", default: "#f1ece5" },
    { id: "text_color", type: "color", label: "Text", default: "#3b3b3d" },
    { id: "divider", type: "checkbox", label: "Border", default: true },
  ],
  max_blocks: 6,
  blocks: [
    {
      type: "badge",
      name: "Badge",
      settings: [
        {
          id: "icon",
          type: "select",
          label: "Icon",
          default: "sparkles",
          options: [
            { value: "sparkles", label: "Sparkles" },
            { value: "leaf", label: "Leaf" },
            { value: "truck", label: "Truck" },
            { value: "heart", label: "Heart" },
            { value: "shield", label: "Shield" },
            { value: "award", label: "Award" },
          ],
        },
        { id: "title", type: "text", label: "Title", default: "" },
        { id: "body", type: "text", label: "Body", default: "" },
      ],
    },
  ],
};

export function Section({ settings, blocks = [] }: SectionProps<Settings, BlockSettings>) {
  return (
    <section
      className={settings.divider ? "border-y" : ""}
      style={{
        backgroundColor: settings.background_color,
        color: settings.text_color,
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-5 py-14 sm:px-8 md:grid-cols-4">
        {blocks.map((b, i) => {
          const Icon = iconMap[b.settings.icon] ?? Sparkles;
          return (
            <div key={i} className="flex flex-col gap-3">
              <Icon className="h-5 w-5" style={{ color: "var(--color-primary)" }} />
              <div className="text-xs uppercase tracking-[0.2em]">{b.settings.title}</div>
              <div className="text-xs leading-relaxed opacity-70">{b.settings.body}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
