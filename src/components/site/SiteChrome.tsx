"use client";

import { Analytics } from "@vercel/analytics/next";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * The header, footer, skip link and visit counting around every page — except embeds
 * (/embed/…), which other sites show inside an <iframe> on their own.
 */
export function SiteChrome({ header, footer, children }: { header: ReactNode; footer: ReactNode; children: ReactNode }) {
  const embed = usePathname()?.startsWith("/embed") ?? false;
  if (embed) return <>{children}</>;
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {header}
      <main id="main">{children}</main>
      {footer}
      {/* Vercel Web Analytics: cookieless page-view counts. Not on embeds, so
          the demo shown inside abhinavsen.com isn't counted as a visit. */}
      <Analytics />
    </>
  );
}
