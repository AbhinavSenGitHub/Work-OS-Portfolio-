import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "WorkOS — Make WorkOS feel like your workspace";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Themes", title: "Make WorkOS feel like your workspace" });
}
