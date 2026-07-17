import { useState } from "react";
import { Mail } from "lucide-react";
import type { SectionProps, SectionSchema } from "@/theme/types";

type Settings = {
  eyebrow: string;
  heading: string;
  body: string;
  placeholder: string;
  button_label: string;
  disclaimer: string;
  background_color: string;
  text_color: string;
  accent_color: string;
};

export const schema: SectionSchema = {
  name: "Newsletter",
  settings: [
    { id: "eyebrow", type: "text", label: "Eyebrow", default: "Join the list" },
    { id: "heading", type: "text", label: "Heading", default: "10% off your first order." },
    { id: "body", type: "textarea", label: "Body", default: "" },
    { id: "placeholder", type: "text", label: "Placeholder", default: "you@email.com" },
    { id: "button_label", type: "text", label: "Button label", default: "Subscribe" },
    { id: "disclaimer", type: "textarea", label: "Disclaimer", default: "" },
    { id: "background_color", type: "color", label: "Background", default: "#3b3b3d" },
    { id: "text_color", type: "color", label: "Text", default: "#faf6f1" },
    { id: "accent_color", type: "color", label: "Button color", default: "#9e2a5c" },
  ],
};

export function Section({ settings }: SectionProps<Settings>) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section
      className="py-16 lg:py-20"
      style={{ backgroundColor: settings.background_color, color: settings.text_color }}
    >
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          {settings.eyebrow && (
            <p
              className="text-[11px] uppercase tracking-[0.3em]"
              style={{ color: settings.accent_color }}
            >
              {settings.eyebrow}
            </p>
          )}
          <h2
            className="mt-3 text-4xl leading-[1.05] md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {settings.heading}
          </h2>
          {settings.body && (
            <p className="mt-4 max-w-md text-sm leading-relaxed opacity-70">{settings.body}</p>
          )}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setDone(true);
          }}
        >
          <div
            className="flex items-stretch overflow-hidden border"
            style={{ borderColor: `${settings.text_color}4d` }}
          >
            <div className="flex items-center pl-4 opacity-60">
              <Mail className="h-4 w-4" />
            </div>
            <input
              type="email"
              required
              placeholder={settings.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent px-3 py-4 text-sm focus:outline-none"
              style={{ color: settings.text_color }}
            />
            <button
              className="px-6 text-[11px] uppercase tracking-[0.25em]"
              style={{ backgroundColor: settings.accent_color, color: settings.text_color }}
            >
              {done ? "Thanks ✓" : settings.button_label}
            </button>
          </div>
          {settings.disclaimer && (
            <p className="mt-3 text-[11px] leading-relaxed opacity-50">{settings.disclaimer}</p>
          )}
        </form>
      </div>
    </section>
  );
}
