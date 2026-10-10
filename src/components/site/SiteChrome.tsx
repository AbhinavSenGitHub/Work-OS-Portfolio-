"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * The header, footer and skip link around every page — except embeds
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
    </>
  );
}
