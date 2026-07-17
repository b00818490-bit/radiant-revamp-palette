import type { ComponentType } from "react";
import type { SectionInstance, SectionProps, SectionSchema } from "./types";

// Section modules
import * as AnnouncementBar from "@/sections/AnnouncementBar";
import * as Hero from "@/sections/Hero";
import * as PressMarquee from "@/sections/PressMarquee";
import * as BentoCollections from "@/sections/BentoCollections";
import * as FeaturedProducts from "@/sections/FeaturedProducts";
import * as ShadeFinder from "@/sections/ShadeFinder";
import * as InstagramFeed from "@/sections/InstagramFeed";
import * as TrustBadges from "@/sections/TrustBadges";
import * as IngredientCards from "@/sections/IngredientCards";
import * as Testimonials from "@/sections/Testimonials";
import * as RichText from "@/sections/RichText";
import * as Newsletter from "@/sections/Newsletter";
import * as ImageWithText from "@/sections/ImageWithText";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SectionModule = { Section: ComponentType<SectionProps<any, any>>; schema: SectionSchema };

/**
 * Section registry — mirrors Shopify's runtime resolution of `section.type`
 * to a `sections/<type>.liquid` file. Add a section here to make it usable
 * in a template JSON.
 */
export const sectionRegistry: Record<string, SectionModule> = {
  "announcement-bar": { Section: AnnouncementBar.Section, schema: AnnouncementBar.schema },
  hero: { Section: Hero.Section, schema: Hero.schema },
  "press-marquee": { Section: PressMarquee.Section, schema: PressMarquee.schema },
  "bento-collections": { Section: BentoCollections.Section, schema: BentoCollections.schema },
  "featured-products": { Section: FeaturedProducts.Section, schema: FeaturedProducts.schema },
  "shade-finder": { Section: ShadeFinder.Section, schema: ShadeFinder.schema },
  "instagram-feed": { Section: InstagramFeed.Section, schema: InstagramFeed.schema },
  "trust-badges": { Section: TrustBadges.Section, schema: TrustBadges.schema },
  "ingredient-cards": { Section: IngredientCards.Section, schema: IngredientCards.schema },
  testimonials: { Section: Testimonials.Section, schema: Testimonials.schema },
  "rich-text": { Section: RichText.Section, schema: RichText.schema },
  newsletter: { Section: Newsletter.Section, schema: Newsletter.schema },
  "image-with-text": { Section: ImageWithText.Section, schema: ImageWithText.schema },
};

/** Export a JSON dump of every schema — useful for generating Liquid files. */
export function exportSchemas(): Record<string, SectionSchema> {
  return Object.fromEntries(
    Object.entries(sectionRegistry).map(([type, mod]) => [type, mod.schema]),
  );
}

export function getSection(type: string): SectionModule | undefined {
  return sectionRegistry[type];
}

export function isKnownSection(instance: SectionInstance): boolean {
  return Boolean(sectionRegistry[instance.type]);
}
