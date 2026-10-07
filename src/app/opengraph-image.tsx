import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "WorkOS — Your computer. Organized around your work.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Workspace manager for developers", title: "Your computer. Organized around your work." });
}
