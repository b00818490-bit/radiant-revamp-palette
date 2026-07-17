# Shopify Online Store 2.0 Porting Guide

This React app is structured to port **1:1 to a Shopify OS 2.0 theme**.
Everything visible is a **section** with a typed `settings` object and optional
repeatable `blocks`. Pages are `template.json` files rendered by a section
renderer that mirrors Shopify's runtime.

## Folder → Shopify layout

| React path | Shopify path |
| --- | --- |
| `src/theme/settings.ts` | `config/settings_data.json` (values) + `config/settings_schema.json` (schema) |
| `src/theme/types.ts` | Shopify `settings` types (built-in) |
| `src/theme/registry.ts` | Shopify section auto-discovery |
| `src/theme/SectionRenderer.tsx` | `{{ content_for_layout }}` / `sections` render |
| `src/sections/<Name>.tsx` + exported `schema` | `sections/<name>.liquid` with `{% schema %}` |
| `src/templates/index.json` | `templates/index.json` (verbatim shape) |
| `src/data/products.ts` | Shopify Admin/Storefront products |
| `src/data/collections.ts` | Shopify collections |
| `src/components/SiteHeader.tsx` | `sections/header.liquid` |
| `src/components/Footer.tsx` | `sections/footer.liquid` |

## Section → Liquid mapping

Each `src/sections/*.tsx` exports a `schema` constant already shaped for
Shopify. To port a section:

1. Create `sections/<type>.liquid`.
2. Paste the `schema` object into `{% schema %}...{% endschema %}` (JSON).
3. Rewrite the JSX as Liquid. Access settings as `section.settings.<id>` and
   blocks with `{% for block in section.blocks %}...{% endfor %}`.
4. Replace `settings.image` with `{{ section.settings.image | image_url: width: 1600 | image_tag }}`.
5. Replace `product` blocks: `{% assign p = all_products[block.settings.product_handle] %}` (or use `product` type setting).

Sections implemented:

- `announcement-bar` → repeating message ticker
- `hero` → cover + copy + CTAs + overlay product card + stat blocks
- `press-marquee` → infinite marquee of logo text blocks
- `bento-collections` → tile grid with per-tile size (`sm`/`md`/`lg`/`xl`)
- `featured-products` → 4-up grid or bento; blocks reference products by handle
- `shade-finder` → swatch grid (blocks are color swatches) + CTA
- `trust-badges` → 4-up icon + copy blocks
- `ingredient-cards` → active ingredient cards
- `testimonials` → review blocks with rating
- `rich-text` → editorial copy section
- `image-with-text` → 2-col image + copy with position toggle
- `newsletter` → email capture with configurable colors

## Template → Shopify template

`src/templates/index.json` has the **exact** shape Shopify expects:

```json
{
  "order": ["sec-id-1", "sec-id-2"],
  "sections": {
    "sec-id-1": {
      "type": "hero",
      "settings": { ... },
      "blocks": [{ "type": "stat", "settings": { ... } }]
    }
  }
}
```

To port: rename `image` values from `__ASSET__hero` placeholders to real
Shopify asset URLs or `settings.image_picker` values in the theme editor.

## Global theme settings

Values in `src/theme/settings.ts` (brand, colors, typography, layout, social,
contact, compliance) become `config/settings_schema.json` inputs grouped under
matching `type: "header"` sections.

## What's not yet section-ified

- `src/routes/collection.$slug.tsx` — collection template (next up)
- `src/routes/product.$slug.tsx` — product template (next up)
- `src/routes/wholesale.tsx` — page template
- Checkout — stays as-is; Shopify provides its own checkout

These already use `src/data/*` so the migration path is: extract into
`sections/collection-grid.tsx`, `sections/product-main.tsx`, etc., following
the pattern in `src/sections/`.

## Editing content today

- **Content:** edit `src/templates/index.json` — everything on the home page
  is there (copy, links, images, colors).
- **Global colors/fonts/brand:** edit `src/theme/settings.ts`.
- **Add a new section:**
  1. Create `src/sections/MySection.tsx` exporting `{ Section, schema }`.
  2. Register it in `src/theme/registry.ts`.
  3. Reference it in `src/templates/index.json` under `order` + `sections`.
- **Products/collections:** edit `src/data/products.ts` / `src/data/collections.ts`.
