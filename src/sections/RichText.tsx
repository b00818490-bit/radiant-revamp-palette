import type { SectionProps, SectionSchema } from "@/theme/types";

type Settings = {
  eyebrow: string;
  heading: string;
  body: string;
  alignment: "left" | "center";
  background_color: string;
  text_color: string;
  padding_y: number;
};

export const schema: SectionSchema = {
  name: "Rich text",
  settings: [
    { id: "eyebrow", type: "text", label: "Eyebrow", default: "" },
    { id: "heading", type: "text", label: "Heading", default: "" },
    { id: "body", type: "richtext", label: "Body", default: "" },
    {
      id: "alignment",
      type: "select",
      label: "Alignment",
      default: "left",
      options: [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
      ],
    },
    { id: "background_color", type: "color", label: "Background", default: "#faf6f1" },
    { id: "text_color", type: "color", label: "Text", default: "#3b3b3d" },
    { id: "padding_y", type: "range", label: "Padding Y (rem)", min: 2, max: 12, step: 1, default: 6 },
  ],
};

export function Section({ settings }: SectionProps<Settings>) {
  const align = settings.alignment === "center" ? "text-center items-center mx-auto" : "text-left";
  return (
    <section
      style={{
        backgroundColor: settings.background_color,
        color: settings.text_color,
        paddingTop: `${settings.padding_y}rem`,
        paddingBottom: `${settings.padding_y}rem`,
      }}
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className={`flex max-w-3xl flex-col ${align}`}>
          {settings.eyebrow && (
            <div className="mb-3 text-[11px] uppercase tracking-[0.28em]" style={{ color: "var(--color-primary)" }}>
              {settings.eyebrow}
            </div>
          )}
          {settings.heading && (
            <h2 className="text-4xl leading-[0.95] sm:text-5xl">{settings.heading}</h2>
          )}
          {settings.body && (
            <p className="mt-6 text-base leading-relaxed opacity-80">{settings.body}</p>
          )}
        </div>
      </div>
    </section>
  );
}
