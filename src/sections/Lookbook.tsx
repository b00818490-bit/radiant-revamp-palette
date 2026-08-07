import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { SectionProps, SectionSchema } from "@/theme/types";

type Settings = {
  eyebrow: string;
  heading: string;
  body: string;
  cta_label: string;
  cta_url: string;
};

type BlockSettings = {
  image: string;
  alt: string;
  title: string;
  caption: string;
  url: string;
};

export const schema: SectionSchema = {
  name: "Lookbook",
  settings: [
    { id: "eyebrow", type: "text", label: "Eyebrow", default: "Lookbook" },
    { id: "heading", type: "text", label: "Heading", default: "Real faces, real looks" },
    { id: "body", type: "text", label: "Body", default: "" },
    { id: "cta_label", type: "text", label: "CTA label", default: "Shop all" },
    { id: "cta_url", type: "url", label: "CTA link", default: "/collection/all" },
  ],
  max_blocks: 8,
  blocks: [
    {
      type: "look",
      name: "Look",
      settings: [
        { id: "image", type: "image_picker", label: "Image" },
        { id: "alt", type: "text", label: "Alt text", default: "" },
        { id: "title", type: "text", label: "Title", default: "" },
        { id: "caption", type: "text", label: "Caption", default: "" },
        { id: "url", type: "url", label: "Link", default: "/collection/all" },
      ],
    },
  ],
};

export function Section({ settings, blocks = [] }: SectionProps<Settings, BlockSettings>) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.7), behavior: "smooth" });
  };

  const looks = blocks.map((b) => b.settings).filter((s) => s.image);
  if (looks.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:py-24">
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          {settings.eyebrow && (
            <div className="mb-3 text-[11px] uppercase tracking-[0.28em]" style={{ color: "var(--color-primary)" }}>
              {settings.eyebrow}
            </div>
          )}
          <h2 className="text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">{settings.heading}</h2>
          {settings.body && (
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[var(--color-charcoal)]/70">{settings.body}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {settings.cta_label && (
            <Link
              to={settings.cta_url}
              className="mr-2 hidden text-[13px] uppercase tracking-[0.18em] underline underline-offset-4 transition-opacity hover:opacity-60 sm:inline-block"
            >
              {settings.cta_label}
            </Link>
          )}
          <button
            type="button"
            aria-label="Previous look"
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-charcoal)]/20 transition-colors hover:bg-[var(--color-charcoal)] hover:text-[var(--color-ivory)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next look"
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-charcoal)]/20 transition-colors hover:bg-[var(--color-charcoal)] hover:text-[var(--color-ivory)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onScroll={update}
        className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8"
      >
        {looks.map((look, i) => (
          <Link
            key={i}
            to={look.url || "/collection/all"}
            className="group w-[88vw] flex-shrink-0 snap-start sm:w-[64vw] lg:w-[calc(50%-10px)] xl:w-[calc(45%-10px)]"
          >
            <div className="relative overflow-hidden bg-[var(--color-sand,#f3ede6)]" style={{ aspectRatio: "16/9" }}>
              <img
                src={look.image}
                alt={look.alt || look.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            {(look.title || look.caption) && (
              <div className="mt-4">
                {look.title && <h3 className="text-xl leading-tight sm:text-2xl">{look.title}</h3>}
                {look.caption && (
                  <p className="mt-1 text-[13px] leading-relaxed text-[var(--color-charcoal)]/65">{look.caption}</p>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
