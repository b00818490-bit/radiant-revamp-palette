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
      className="relative overflow-hidden py-12 lg:py-16"
      style={{ backgroundColor: settings.background_color, color: settings.text_color }}
    >
      {settings.image && (
        <>
          <div
            className={`pointer-events-none absolute inset-y-0 w-full opacity-20 sm:w-3/4 lg:w-1/2 ${
              reverse ? "right-0" : "left-0"
            }`}
          >
            <img
              src={settings.image}
              alt={settings.image_alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className={`pointer-events-none absolute inset-y-0 w-full sm:w-3/4 lg:w-1/2 ${
              reverse ? "right-0" : "left-0"
            }`}
            style={{
              background: reverse
                ? `linear-gradient(to left, ${settings.background_color} 0%, transparent 60%)`
                : `linear-gradient(to right, ${settings.background_color} 0%, transparent 60%)`,
            }}
          />
        </>
      )}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8">
        <div
          className={`max-w-xl ${reverse ? "ml-auto text-right" : "mr-auto text-left"}`}
        >
          {settings.eyebrow && (
            <div className="mb-3 text-[11px] uppercase tracking-[0.28em]" style={{ color: "var(--color-primary)" }}>
              {settings.eyebrow}
            </div>
          )}
          {settings.heading && (
            <h2 className="mb-5 text-3xl leading-[1] sm:text-4xl">{settings.heading}</h2>
          )}
          {settings.body && <p className="mb-6 text-base leading-relaxed opacity-80">{settings.body}</p>}
          {settings.cta_label && (
            <a
              href={settings.cta_url}
              className="inline-flex items-center gap-2 px-6 py-3 text-[12px] uppercase tracking-[0.18em] text-white"
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
