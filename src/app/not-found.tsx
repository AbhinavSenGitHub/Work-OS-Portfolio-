import type { Metadata } from "next";
import Link from "next/link";
import { Launcher, ThemeScope } from "@/components/island/Island";
import { siteTheme } from "@/lib/themes";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <ThemeScope theme={siteTheme.tokens} className="mb-10">
        <Launcher state="critical" large />
      </ThemeScope>
      <h1 className="text-4xl font-semibold tracking-tight text-gradient">This page isn&apos;t in any workspace</h1>
      <p className="mt-4 text-muted">The page you were looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink">
          Go home
        </Link>
        <Link href="/features" className="inline-flex h-11 items-center rounded-full border border-line-2 px-5 text-sm text-fg">
          Explore features
        </Link>
      </div>
    </section>
  );
}
