import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "WorkOS — Your workspace stays yours";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Privacy", title: "Your workspace stays yours" });
}
