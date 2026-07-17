import type { PageTemplate } from "./types";
import { getSection } from "./registry";

interface SectionRendererProps {
  template: PageTemplate;
}

/**
 * Renders a page from a template JSON — the React equivalent of Shopify's
 * `{% sections 'template-name' %}` rendering loop.
 *
 * Reads `template.order` to determine section order, looks each up in
 * `template.sections`, resolves the component via the registry, and passes
 * `id`, `settings`, and `blocks` through as props.
 */
export function SectionRenderer({ template }: SectionRendererProps) {
  return (
    <>
      {template.order.map((id) => {
        const instance = template.sections[id];
        if (!instance || instance.disabled) return null;
        const mod = getSection(instance.type);
        if (!mod) {
          console.warn(`[theme] Unknown section type: ${instance.type}`);
          return null;
        }
        const { Section } = mod;
        return (
          <Section
            key={id}
            id={id}
            settings={instance.settings}
            blocks={instance.blocks ?? []}
          />
        );
      })}
    </>
  );
}
