import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { FEATURES, getFeature } from "@/lib/features";

export const alt = "WorkOS feature";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = getFeature(slug) ?? FEATURES[0];
  return ogImage({ eyebrow: f.name, title: f.h1 });
}
