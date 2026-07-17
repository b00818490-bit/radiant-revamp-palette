# Redesign as Shopify Online Store 2.0-Ready Theme

Rebuild the Greyon site so every visual and content element is data-driven and maps cleanly to Shopify sections, blocks, and theme settings. The React app stays in TanStack Start (synced to your GitHub repo), but structured so each component ports to a `.liquid` section with a matching `{% schema %}`.

## Approach

Treat every page as a stack of **sections**. Each section is a self-contained React component that:
- Receives **all** content (text, images, links, colors, layout toggles) via a typed `settings` prop
- Optionally renders a repeatable `blocks` array (mirrors Shopify's `{% for block in section.blocks %}`)
- Has a co-located `schema.ts` describing its Shopify settings/blocks contract

Pages become JSON "templates" (arrays of `{ type, settings, blocks }`) — exactly Shopify's template JSON format. Swapping the JSON source later for Shopify's `sections/*.liquid` + `templates/*.json` is mechanical.

## What gets built

### 1. Theme foundation
- `src/theme/settings.ts` — global `theme.settings` object (colors, fonts, spacing scale, button styles, announcement text, social links, footer copy). Drives CSS variables in `styles.css` at runtime.
- `src/theme/types.ts` — TS types matching Shopify setting types (`text`, `richtext`, `image_picker`, `color`, `range`, `select`, `checkbox`, `url`, `product`, `collection`, `blog`).
- `src/theme/renderSection.tsx` — registry that maps `section.type` → React component (parallel to Shopify's section rendering).

### 2. Section library (`src/sections/*`)
Each folder: `Component.tsx`, `schema.ts`, `defaults.ts`.

Sections to build:
- `announcement-bar`, `header`, `footer`
- `hero` (image/video, heading, subheading, CTAs, alignment, overlay opacity)
- `image-with-text`, `rich-text`, `marquee`, `logo-list`
- `featured-collection`, `collection-list`, `collection-banner`
- `featured-product`, `product-grid`, `product-recommendations`
- `testimonials` (blocks = individual reviews)
- `image-gallery`, `video`, `newsletter`, `faq` (blocks = Q&A pairs)
- `contact-form`, `page-content`, `custom-liquid`-equivalent (raw HTML block)

### 3. Template JSONs (`src/templates/*.json`)
- `index.json`, `product.json`, `collection.json`, `page.wholesale.json`, `cart.json` (checkout stays as-is)
- Each is `{ sections: { id: { type, settings, blocks: { id: { type, settings } } } }, order: [...] }` — identical shape to Shopify's `templates/*.json`.

### 4. Route wiring
Routes (`index.tsx`, `collection.$slug.tsx`, `product.$slug.tsx`, `wholesale.tsx`) become thin: load the template JSON, iterate `order`, render sections via the registry. No hardcoded copy in routes.

### 5. Design tokens
Colors, type scale, spacing, radii moved from hardcoded Tailwind classes → CSS vars fed by `theme.settings`. Components consume `var(--color-primary)` etc. so a settings change re-themes the whole site.

### 6. Product/collection data
Refactor the current inline `PRODUCTS` / `MEGA` arrays into `src/data/products.ts` and `src/data/collections.ts` shaped like Shopify's product/collection objects (`handle`, `title`, `featured_image`, `price`, `variants`, `metafields`). This is what a Liquid `{{ product }}` will hand you.

### 7. Docs
`SHOPIFY_PORTING.md` mapping each React section → target `sections/<name>.liquid` with the schema already written, so porting is copy-paste + Liquid tag swap.

## Redesign direction

Since this is a full redesign, I'll pin taste first: after you approve this plan I'll ask you to pick a **palette**, **type pairing**, and **layout system**, then render 3 rendered directions built on the section architecture above so you're choosing a real theme, not a mockup.

## Technical notes

- No new deps required. Zod already present for schema validation of template JSONs at load.
- Existing routes/SEO metadata/sitemap logic preserved; metadata itself becomes theme settings (site title, description, social image).
- Cart/checkout logic untouched — the redesign is UI + content architecture.
- GitHub sync: since your repo is already connected, every file lands in GitHub automatically as I ship.

## Out of scope (call out if you want them)

- Actually generating `.liquid` files (I can do this in a follow-up once the React sections are stable).
- Shopify Storefront/Admin API wiring (currently static data; can add via the Shopify integration later).
- Migrating checkout to Shopify Checkout.

## Scale warning

This touches ~15+ new section components, 4-5 template JSONs, all route files, and the theme system. It's a multi-step build — I'll ship it in one pass but the diff will be large. Confirm and I'll start with the taste-pinning questions.
