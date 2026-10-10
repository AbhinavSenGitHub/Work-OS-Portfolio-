/**
 * Download counter, kept in a Redis database (Upstash, connected to the
 * Vercel project from its Storage tab). Only numbers are stored: no IP
 * address, cookie or anything else about the person downloading.
 *
 * Without a database configured, nothing is counted and no count is shown.
 */

const KEY = "downloads:windows";

/** The site shows the count only once it is above this (still counted below it). */
const SHOW_FROM = 100;

const store = () => {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
};

async function redis(command: (string | number)[], init?: RequestInit): Promise<unknown> {
  const db = store();
  if (!db) return null;
  const res = await fetch(db.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${db.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    ...init,
  });
  if (!res.ok) throw new Error(`counter: ${res.status}`);
  return ((await res.json()) as { result?: unknown }).result ?? null;
}

/** Robots and link previews follow links too; they aren't downloads. */
export function isBot(userAgent: string | null): boolean {
  return !userAgent || /bot|crawl|spider|slurp|preview|facebookexternalhit|curl|wget|python|headless/i.test(userAgent);
}

/** +1 for this download (total and per version). Never throws. */
export async function countDownload(version: string): Promise<void> {
  try {
    await Promise.all([
      redis(["INCR", KEY], { cache: "no-store" }),
      redis(["INCR", `${KEY}:${version}`], { cache: "no-store" }),
    ]);
  } catch {
    // The download itself must never fail because of the counter.
  }
}

/** Total downloads to show, refreshed every 5 minutes; null when unknown or not above SHOW_FROM yet. */
export async function downloadCount(): Promise<number | null> {
  try {
    const n = Number(await redis(["GET", KEY], { next: { revalidate: 300 } }));
    return Number.isFinite(n) && n > SHOW_FROM ? n : null;
  } catch {
    return null;
  }
}
