import hero from "@/assets/hero.jpg";
import prod1 from "@/assets/prod1.jpg";
import prod2 from "@/assets/prod2.jpg";
import prod3 from "@/assets/prod3.jpg";
import prod4 from "@/assets/prod4.jpg";
import catFace from "@/assets/cat-face.jpg";
import catLips from "@/assets/cat-lips.jpg";
import catEyes from "@/assets/cat-eyes.jpg";
import catSkin from "@/assets/cat-skin.jpg";
import ingredient from "@/assets/ingredient.jpg";
import ugc1 from "@/assets/ugc1.jpg";
import ugc3 from "@/assets/ugc3.jpg";
import ugc4 from "@/assets/ugc4.jpg";

/**
 * Asset registry — maps the `__ASSET__<name>` placeholders in template JSONs
 * to bundled asset URLs. On Shopify, these become `{{ 'file.jpg' | asset_url }}`
 * or `settings.image | image_url`.
 */
export const assetRegistry: Record<string, string> = {
  hero,
  prod1,
  prod2,
  prod3,
  prod4,
  catFace,
  catLips,
  catEyes,
  catSkin,
  ingredient,
  ugc1,
  ugc3,
  ugc4,
};

const ASSET_PREFIX = "__ASSET__";

/** Recursively resolves `__ASSET__foo` strings inside a template. */
export function resolveAssets<T>(value: T): T {
  if (typeof value === "string") {
    if (value.startsWith(ASSET_PREFIX)) {
      const key = value.slice(ASSET_PREFIX.length);
      return (assetRegistry[key] ?? value) as unknown as T;
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((v) => resolveAssets(v)) as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = resolveAssets(v);
    }
    return out as T;
  }
  return value;
}
