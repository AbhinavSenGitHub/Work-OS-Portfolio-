import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "WorkOS — One computer. Multiple work environments.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Workspaces", title: "One computer. Multiple work environments." });
}
