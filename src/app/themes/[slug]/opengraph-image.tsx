import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { getTheme, THEMES } from "@/lib/themes";

export const alt = "WorkOS theme preview";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return THEMES.map((t) => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTheme(slug) ?? THEMES[0];
  return ogImage({ eyebrow: `${t.name} theme`, title: t.appDescription, accent: t.tokens.accent, base: t.tokens.base });
}
