import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "WorkOS — Questions about WorkOS, answered";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "FAQ", title: "Questions about WorkOS, answered" });
}
