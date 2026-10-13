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
          the demo shown inside abhinavsen.com isn't counted as a visit.
          The standard /_vercel path, not this project's own random one: on
          abhinavsen.com/workos the root belongs to the portfolio's project,
          which 404s our path — this one it serves (and counts the visit). */}
      <Analytics
        scriptSrc="/_vercel/insights/script.js"
        endpoint="/_vercel/insights"
        viewEndpoint="/_vercel/insights/view"
        eventEndpoint="/_vercel/insights/event"
        sessionEndpoint="/_vercel/insights/session"
      />
    </>
  );
}
