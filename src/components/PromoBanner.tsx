import { Link } from "@tanstack/react-router";
import { campaignContent } from "@/content/campaign";
import { fillTokens, isCampaignActive } from "@/content/applyCampaign";

/**
 * Slim promotional banner driven entirely by `src/content/campaign.ts`.
 * Renders nothing unless the campaign is running AND `banner.enabled` is true,
 * so the default site design is unaffected.
 */
export function PromoBanner() {
  const { banner } = campaignContent.campaign;
  if (!banner.enabled || !isCampaignActive()) return null;

  const text = fillTokens(banner.text).trim();
  if (!text) return null;
  const label = fillTokens(banner.cta.label).trim();
  const isInternal = banner.cta.url.startsWith("/");

  return (
    <div
      className="px-5 py-2.5 text-center text-[11px] uppercase tracking-[0.22em] sm:px-8"
      style={{ backgroundColor: banner.background_color, color: banner.text_color }}
    >
      <span>{text}</span>
      {label &&
        (isInternal ? (
          <Link to={banner.cta.url} className="ml-3 underline underline-offset-4 hover:opacity-70">
            {label}
          </Link>
        ) : (
          <a href={banner.cta.url} className="ml-3 underline underline-offset-4 hover:opacity-70">
            {label}
          </a>
        ))}
    </div>
  );
}
