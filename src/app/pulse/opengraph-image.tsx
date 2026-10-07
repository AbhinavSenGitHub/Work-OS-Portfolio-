import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "WorkOS — Know when your computer needs you.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Pulse", title: "Know when your computer needs you." });
}
