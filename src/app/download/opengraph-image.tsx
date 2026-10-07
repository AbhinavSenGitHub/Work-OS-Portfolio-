import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "WorkOS — Get WorkOS for Windows";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Download", title: "Get WorkOS for Windows" });
}
