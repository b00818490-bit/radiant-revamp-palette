import { createServerFn } from "@tanstack/react-start";

export type InstagramPost = {
  id: string;
  image: string;
  link: string;
  alt: string;
};

// Greyon uses the Instafeed (nfcube) app on greyon.co — we hit the same
// public endpoint their storefront uses so the posts stay in sync.
const FEED_URL =
  "https://api.nfcube.com/feed/v6?limit=12&account=greyoncosmetics.myshopify.com&fu=0&fid=0&hash=255ad33267bb56cb2151b604a61aa23f&locale=en&handle=greyon_cosmetics";

export const getInstagramFeed = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ posts: InstagramPost[]; error?: string }> => {
    try {
      const res = await fetch(FEED_URL, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) return { posts: [], error: `HTTP ${res.status}` };
      const json = (await res.json()) as {
        data?: Array<{
          id?: string;
          link?: string;
          permalink?: string;
          images?: { standard_resolution?: { url?: string } };
          thumbnail?: string;
          caption?: string | { text?: string };
        }>;
      };
      const posts: InstagramPost[] = (json.data ?? [])
        .map((p, i) => {
          const image =
            p.images?.standard_resolution?.url || p.thumbnail || "";
          const link = p.link || p.permalink || "#";
          const cap =
            typeof p.caption === "string"
              ? p.caption
              : p.caption?.text ?? "";
          return {
            id: p.id || String(i),
            image,
            link,
            alt: cap.slice(0, 120) || `Instagram post ${i + 1}`,
          };
        })
        .filter((p) => p.image);
      return { posts };
    } catch (e) {
      return { posts: [], error: (e as Error).message };
    }
  },
);
