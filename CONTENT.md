# Editing campaign content

All routinely-changed copy lives in **one file**: `src/content/campaign.ts`.
It contains text, image URLs, links, dates and numbers only — no layout,
no CSS, no components. Editing it can't change the design.

| What you want to change | Field in `src/content/campaign.ts` |
| --- | --- |
| Hero headline | `hero.headline_line_1` / `headline_line_2` / `headline_line_2_italic` / `headline_line_3` |
| Hero subtitle | `hero.subtitle` |
| Hero image or video | `hero.image` (+ `hero.image_alt`) |
| Hero CTA | `hero.primary_cta` / `hero.secondary_cta` (`label` + `url`) |
| Announcement bar | `announcement_messages` (home) and `header_announcement` (inner pages) |
| Featured collection | `featured_collection.slug` / `.eyebrow` / `.heading` |
| Campaign dates | `campaign.starts_at` / `campaign.ends_at` (`"2026-08-15"`, `""` = open-ended) |
| Sale text | `campaign.sale.text` |
| Sale percentage | `campaign.sale.percent` (number, `%` added automatically) |
| Discount code | `campaign.sale.code` |
| Promotional messages | `campaign.promotional_messages` (added to the announcement bar while the campaign runs) |
| Promotional banner | `campaign.banner` (`enabled`, `text`, `cta`, colors) |

## Placeholders

Any text field can reuse the sale values so you only type them once:

- `{{sale_percent}}` → `25%`
- `{{code}}` → `GLOW25`
- `{{ends}}` → `31 Aug`

Example: `"{{sale_percent}} off sitewide with code {{code}} · ends {{ends}}"`.

## Scheduling a campaign

1. Fill in `campaign.sale`, `campaign.promotional_messages`, `campaign.banner.text`.
2. Set `campaign.starts_at` and `campaign.ends_at`.
3. Set `campaign.enabled: true` (and `campaign.banner.enabled: true` if you want the banner).

The promo banner, promo messages and sale copy switch themselves on at the
start date and off after the end date — no further edits needed. Setting
`campaign.enabled: false` kills the campaign instantly, whatever the dates say.

Everything outside the `campaign` block (hero, announcement messages, featured
collection) is evergreen and always shows.

## Updating after deployment

Easiest route, no code knowledge needed:

1. Open the project in Lovable and ask in chat, e.g.
   *"Set the hero headline to X and turn on a 30% sale from 1–10 Sept."*
   The change is a single edit to `src/content/campaign.ts`.
2. Check the preview.
3. Click **Publish**.

Prefer doing it yourself? Edit `src/content/campaign.ts` directly (in Lovable's
code view or in GitHub if the repo is connected), then publish. Nothing else
needs to be touched.

## What is NOT in here (on purpose)

Products, prices, compare-at prices, inventory, collections and discounts come
live from Shopify. Change those in Shopify admin and the site updates on its
own — never hardcode them here.

Design values (colors, fonts, spacing, section order) live in
`src/theme/settings.ts` and `src/templates/index.json`.
