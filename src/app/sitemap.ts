import type { MetadataRoute } from "next";
import { FEATURES } from "@/lib/features";
import { absoluteUrl } from "@/lib/site";
import { THEMES } from "@/lib/themes";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["/", 1],
    ["/workspaces", 0.9],
    ["/work-island", 0.9],
    ["/themes", 0.9],
    ["/features", 0.8],
    ["/pulse", 0.8],
    ["/download", 0.8],
    ["/faq", 0.7],
    ["/privacy", 0.4],
    ...FEATURES.map((f) => [`/features/${f.slug}`, 0.7] as [string, number]),
    ...THEMES.map((t) => [`/themes/${t.slug}`, 0.6] as [string, number]),
  ];
  return pages.map(([path, priority]) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  }));
}
