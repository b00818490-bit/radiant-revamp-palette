/**
 * Shopify Online Store 2.0 setting types — mirrored in TypeScript so every
 * React section prop maps 1:1 to a Liquid `{% schema %}` input.
 *
 * When porting to a `.liquid` section, each field here becomes an entry in
 * the `settings` array of the section's schema.
 */

export type SettingType =
  | "text"
  | "textarea"
  | "richtext"
  | "url"
  | "image_picker"
  | "video_url"
  | "color"
  | "range"
  | "select"
  | "checkbox"
  | "product"
  | "collection"
  | "blog"
  | "page"
  | "link_list";

export interface SettingDefinition {
  id: string;
  type: SettingType;
  label: string;
  default?: unknown;
  info?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface BlockDefinition {
  type: string;
  name: string;
  limit?: number;
  settings: SettingDefinition[];
}

export interface SectionSchema {
  name: string;
  tag?: string;
  class?: string;
  settings: SettingDefinition[];
  blocks?: BlockDefinition[];
  max_blocks?: number;
  presets?: { name: string; settings?: Record<string, unknown> }[];
}

/** A block instance as it will exist in a Shopify template.json. */
export interface BlockInstance<T = Record<string, unknown>> {
  type: string;
  settings: T;
}

/** A section instance as it will exist in a Shopify template.json. */
export interface SectionInstance<S = Record<string, unknown>> {
  type: string;
  settings: S;
  blocks?: BlockInstance[];
  block_order?: string[];
  disabled?: boolean;
}

/** The full page template shape (identical to Shopify's templates/*.json). */
export interface PageTemplate {
  sections: Record<string, SectionInstance>;
  order: string[];
}

/** Props every section component receives. */
export interface SectionProps<S = Record<string, unknown>, B = Record<string, unknown>> {
  id: string;
  settings: S;
  blocks?: BlockInstance<B>[];
}
