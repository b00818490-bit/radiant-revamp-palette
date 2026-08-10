import { ChevronRight } from "lucide-react";
import type { SectionProps, SectionSchema } from "@/theme/types";

type Settings = {
  eyebrow: string;
  heading: string;
  view_all_label: string;
  view_all_url: string;
};

type BlockSettings = {
  title: string;
  image: string;
  accent_color: string;
  url: string;
  size: "sm" | "md" | "lg" | "xl";
};

export const schema: SectionSchema = {
  name: "Bento collections",
  settings: [
    { id: "eyebrow", type: "text", label: "Eyebrow", default: "Shop by category" },
    { id: "heading", type: "text", label: "Heading", default: "Start where you want to." },
    { id: "view_all_label", type: "text", label: "View all label", default: "Shop all" },
    { id: "view_all_url", type: "url", label: "View all link", default: "/collection/all" },
  ],
  max_blocks: 8,
  blocks: [
    {
      type: "tile",
      name: "Collection tile",
      settings: [
        { id: "title", type: "text", label: "Title", default: "" },
        { id: "image", type: "image_picker", label: "Image" },
        { id: "accent_color", type: "color", label: "Accent color", default: "#9e2a5c" },
        { id: "url", type: "url", label: "Link", default: "#" },
        {
          id: "size",
          type: "select",
          label: "Tile size",
          default: "md",
          options: [
            { value: "sm", label: "Small (1×1)" },
            { value: "md", label: "Medium (2×2)" },
            { value: "lg", label: "Large (2×3)" },
            { value: "xl", label: "XL (3×3)" },
          ],
        },
      ],
    },
  ],
};

const sizeMap: Record<BlockSettings["size"], string> = {
  sm: "col-span-1 row-span-3 sm:row-span-2 lg:col-span-2",
  md: "col-span-1 row-span-3 lg:col-span-4",
  lg: "col-span-1 row-span-4 lg:col-span-4",
  xl: "col-span-1 row-span-4 lg:col-span-4",
};

export function Section({ settings, blocks = [] }: SectionProps<Settings, BlockSettings>) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:py-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          {settings.eyebrow && (
            <div className="mb-3 text-[11px] uppercase tracking-[0.28em]" style={{ color: "var(--color-primary)" }}>
              {settings.eyebrow}
            </div>
          )}
          <h2 className="text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">{settings.heading}</h2>
        </div>
        {settings.view_all_label && (
          <a
            href={settings.view_all_url}
            className="hidden items-center gap-2 border-b pb-1 text-[13px] uppercase tracking-[0.18em] md:inline-flex"
            style={{ borderColor: "var(--color-foreground)" }}
          >
            {settings.view_all_label}
            <ChevronRight className="h-4 w-4" />
          </a>
        )}
      </div>

      <div className="grid auto-rows-[60px] grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-12">
        {blocks.map((b, i) => (
          <a
            key={i}
            href={b.settings.url}
            className={`group relative overflow-hidden ${sizeMap[b.settings.size]}`}
            style={{ backgroundColor: "var(--color-charcoal)" }}
          >
            {b.settings.image && (
              <img
                src={b.settings.image}
                alt={`Shop ${b.settings.title}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
              <div>
                <div className="mb-1 text-[10px] uppercase tracking-[0.24em] text-white/70">
                  0{i + 1}
                </div>
                <div className="text-3xl" style={{ fontFamily: "var(--font-display)" }}>
                  {b.settings.title}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
