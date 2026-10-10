/**
 * Site-wide configuration. Anything that depends on a real-world decision
 * (download URLs, pricing, social links) comes from environment variables so
 * the site never advertises something that doesn't exist yet.
 */

import { basePath, withBase } from "./base";
import { release } from "./release";

const env = (key: string) => {
  const v = process.env[key];
  return v && v.trim() ? v.trim() : undefined;
};

export const site = {
  name: "WorkOS",
  /** The site's address, with the /workos path (NEXT_PUBLIC_SITE_URL is just the origin). */
  url: `${(env("NEXT_PUBLIC_SITE_URL") ?? "https://www.abhinavsen.com").replace(/\/$/, "").replace(/\/workos$/, "")}${basePath}`,
  tagline: "Your computer, organized around your work.",
  description:
    "WorkOS is a desktop workspace manager for developers. Create persistent workspaces for every project, switch contexts without closing apps, and keep clipboard, notes, downloads and media one glance away.",
  locale: "en_US",
};

export type PlatformStatus = "available" | "preview" | "coming-soon";

export interface Platform {
  id: "windows" | "macos" | "linux";
  name: string;
  status: PlatformStatus;
  requirements?: string;
  downloadUrl?: string;
}

/**
 * The installer shipped with the site (public/downloads, see release.ts),
 * unless NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL points somewhere else (a CDN).
 */
const windowsUrl = env("NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL") ?? withBase(release.file);

/** Windows is the only platform with full support in the app today. */
export const platforms: Platform[] = [
  {
    id: "windows",
    name: "Windows",
    status: windowsUrl ? "available" : "coming-soon",
    requirements: "Windows 11 / Windows 10 · 64-bit",
    downloadUrl: windowsUrl,
  },
  { id: "macos", name: "macOS", status: "coming-soon" },
  { id: "linux", name: "Linux", status: "coming-soon" },
];

export const windows = platforms[0];
export const isDownloadable = windows.status === "available";

export const statusLabel: Record<PlatformStatus, string> = {
  available: "Available now",
  preview: "Preview",
  "coming-soon": "Coming soon",
};

/** 30-day free trial, then a plan (matches the app's unlock screen). */
export const pricing = {
  headline: "Free for 30 days",
  body: "Try everything free for 30 days — no card needed. After that, pick a plan and paste your license code into WorkOS. Updates install automatically.",
  plans: [
    { name: "Monthly", price: "$6", per: "/ month" },
    { name: "Yearly", price: "$48", per: "/ year", note: "Save 33%" },
    { name: "Lifetime", price: "$99", per: "once" },
  ],
  howToBuy: "Online payment is coming soon. For now, ask the WorkOS team for a license code.",
};

/** Only links that are actually configured are rendered. */
export const social = [
  { name: "GitHub", url: env("NEXT_PUBLIC_GITHUB_URL") },
  { name: "X", url: env("NEXT_PUBLIC_X_URL") },
  { name: "Discord", url: env("NEXT_PUBLIC_DISCORD_URL") },
].filter((s): s is { name: string; url: string } => Boolean(s.url));

export const contactEmail = env("NEXT_PUBLIC_CONTACT_EMAIL");

export const absoluteUrl = (path = "/") => `${site.url}${path === "/" ? "" : path}`;

/**
 * Optional, cookieless analytics (Plausible-compatible). Nothing loads unless
 * NEXT_PUBLIC_ANALYTICS_DOMAIN is set.
 */
export const analytics = {
  domain: env("NEXT_PUBLIC_ANALYTICS_DOMAIN"),
  src: env("NEXT_PUBLIC_ANALYTICS_SRC") ?? "https://plausible.io/js/script.js",
};
