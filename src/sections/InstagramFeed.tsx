import { Instagram } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { SectionProps, SectionSchema } from "@/theme/types";
import { getInstagramFeed } from "@/lib/instagram.functions";

type Settings = {
  eyebrow: string;
  heading: string;
  cta_label: string;
  cta_url: string;
};

type BlockSettings = { image: string; url: string; alt: string };

export const schema: SectionSchema = {
  name: "Instagram feed",
  settings: [
    { id: "eyebrow", type: "text", label: "Eyebrow", default: "Follow us" },
    { id: "heading", type: "text", label: "Heading", default: "Greyon on Instagram" },
    { id: "cta_label", type: "text", label: "CTA label", default: "@greyon_cosmetics" },
    { id: "cta_url", type: "url", label: "CTA link", default: "https://www.instagram.com/greyon_cosmetics" },
  ],
  max_blocks: 12,
  blocks: [
    {
      type: "post",
      name: "Instagram post (fallback)",
      settings: [
        { id: "image", type: "image_picker", label: "Image" },
        { id: "url", type: "url", label: "Post link", default: "#" },
        { id: "alt", type: "text", label: "Alt text", default: "" },
      ],
    },
  ],
};

export function Section({ settings, blocks = [] }: SectionProps<Settings, BlockSettings>) {
  const { data } = useQuery({
    queryKey: ["instagram-feed", "greyon_cosmetics"],
    queryFn: () => getInstagramFeed(),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  const livePosts = data?.posts ?? [];
  const items =
    livePosts.length > 0
      ? livePosts.map((p) => ({ image: p.image, url: p.link, alt: p.alt }))
      : blocks.map((b) => b.settings);

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:py-24">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {settings.eyebrow && (
            <div className="mb-3 text-[11px] uppercase tracking-[0.28em]" style={{ color: "var(--color-primary)" }}>
              {settings.eyebrow}
            </div>
          )}
          <h2 className="text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">{settings.heading}</h2>
        </div>
        {settings.cta_label && (
          <a
            href={settings.cta_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.18em] transition-opacity hover:opacity-70"
            style={{ color: "var(--color-foreground)" }}
          >
            <Instagram className="h-4 w-4" />
            {settings.cta_label}
          </a>
        )}
      </div>

      <div className="relative">
        <div className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:gap-4">
          {items.map((it, i) => (
            <a
              key={i}
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-[72vw] flex-shrink-0 snap-start overflow-hidden sm:w-[42vw] lg:w-[calc(25%-12px)]"
              style={{ aspectRatio: "4/5" }}
            >
              {it.image && (
                <img
                  src={it.image}
                  alt={it.alt || `Instagram post ${i + 1}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                <Instagram className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

