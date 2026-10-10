import type { Metadata } from "next";
import { HeroDemo } from "@/components/demos/HeroDemo";
import { EmbedHeight } from "./EmbedHeight";

/**
 * The home page's interactive island demo on its own, for other sites to
 * show in an <iframe> (abhinavsen.com). No header, footer or links: clicks
 * stay inside the demo.
 */
export const metadata: Metadata = {
  title: "WorkOS demo",
  robots: { index: false, follow: false },
};

export default function EmbedDemo() {
  return (
    <div className="embed-root p-1">
      <HeroDemo />
      <EmbedHeight />
    </div>
  );
}
