import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "WorkOS — Your work, one glance away.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Work Island", title: "Your work, one glance away." });
}
