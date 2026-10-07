import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const alt = "WorkOS — Everything WorkOS does";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "Features", title: "Everything WorkOS does" });
}
