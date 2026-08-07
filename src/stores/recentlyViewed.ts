const KEY = "greyon-recently-viewed";
const MAX = 12;

export function getRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((h) => typeof h === "string") : [];
  } catch {
    return [];
  }
}

export function recordRecentlyViewed(handle: string) {
  if (typeof window === "undefined" || !handle) return;
  const next = [handle, ...getRecentlyViewed().filter((h) => h !== handle)].slice(0, MAX);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable */
  }
}
