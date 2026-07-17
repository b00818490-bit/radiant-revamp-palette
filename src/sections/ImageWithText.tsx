import { ArrowRight } from "lucide-react";
import type { SectionProps, SectionSchema } from "@/theme/types";

type Settings = {
  eyebrow: string;
  heading: string;
  body: string;
  cta_label: string;
  cta_url: string;
  image: string;
  image_alt: string;
  image_position: "left" | "right";
  background_color: string;
  text_color: string;
};

export const schema: SectionSchema = {
  name: "Image with text",
  settings: [
    { id: "eyebrow", type: "text", label: "Eyebrow", default: "" },
    { id: "heading", type: "text", label: "Heading", default: "" },
    { id: "body", type: "richtext", label: "Body", default: "" },
    { id: "cta_label", type: "text", label: "CTA label", default: "" },
    { id: "cta_url", type: "url", label: "CTA link", default: "#" },
    { id: "image", type: "image_picker", label: "Image" },
    { id: "image_alt", type: "text", label: "Image alt", default: "" },
    {
      id: "image_position",
      type: "select",
      label: "Image position",
      default: "left",
      options: [
        { value: "left", label: "Left" },
        { value: "right", label: "Right" },
      ],
    },
    { id: "background_color", type: "color", label: "Background", default: "#faf6f1" },
    { id: "text_color", type: "color", label: "Text", default: "#3b3b3d" },
  ],
};

export function Section({ settings }: SectionProps<Settings>) {
  const reverse = settings.image_position === "right";
  return (
    <section
      className="py-16 lg:py-24"
      style={{ backgroundColor: settings.background_color, color: settings.text_color }}
    >
      <div
        className={`mx-auto grid max-w-[1440px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="aspect-[4/5] overflow-hidden">
          {settings.image && (
            <img
              src={settings.image}
              alt={settings.image_alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div>
          {settings.eyebrow && (
            <div className="mb-3 text-[11px] uppercase tracking-[0.28em]" style={{ color: "var(--color-primary)" }}>
              {settings.eyebrow}
            </div>
          )}
          {settings.heading && (
            <h2 className="mb-6 text-4xl leading-[0.95] sm:text-5xl">{settings.heading}</h2>
          )}
          {settings.body && <p className="mb-8 text-base leading-relaxed opacity-80">{settings.body}</p>}
          {settings.cta_label && (
            <a
              href={settings.cta_url}
              className="inline-flex items-center gap-2 px-7 py-4 text-[13px] uppercase tracking-[0.18em] text-white"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {settings.cta_label} <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
