import type { Metadata } from "next";
import Link from "next/link";
import { DownloadBand } from "@/components/site/Download";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/site/Section";
import { StatusTag } from "@/components/site/Status";
import { CORE_PAGES, FEATURES } from "@/lib/features";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "WorkOS Features — Workspaces, Work Island, Clipboard, Notes and More",
  description:
    "Everything WorkOS does, and what's still in development: persistent workspaces, context restore, the Work Island, clipboard history, notes, downloads, media, system status and themes.",
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Features", path: "/features" }]}
        eyebrow="Features"
        title="Everything WorkOS does"
        lede="WorkOS is built around one idea: your computer should be organized around the work you're doing. Here is every part of it, with an honest status for each."
      />
      <section aria-labelledby="core-title" className="pb-16">
        <Container>
          <h2 id="core-title" className="text-sm font-semibold uppercase tracking-[0.14em] text-dim">The core</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {CORE_PAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="card group block h-full p-6 transition hover:border-accent/40">
                  <h3 className="text-xl font-semibold text-fg">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.blurb}</p>
                  <span className="mt-5 block text-sm text-dim group-hover:text-fg">Explore {p.name} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section aria-labelledby="all-title" className="border-t border-line py-16">
        <Container>
          <h2 id="all-title" className="text-sm font-semibold uppercase tracking-[0.14em] text-dim">Inside the Work Island</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <li key={f.slug}>
                <Link href={`/features/${f.slug}`} className="card group flex h-full flex-col p-6 transition hover:border-line-2">
                  <span className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-fg">{f.name}</h3>
                    <StatusTag status={f.status} />
                  </span>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{f.metaDescription.split(". ")[0]}.</p>
                  <span className="mt-4 text-sm text-dim group-hover:text-fg">Learn more →</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/themes" className="card group flex h-full flex-col p-6 transition hover:border-line-2">
                <span className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-fg">Themes</h3>
                  <StatusTag status="available" />
                </span>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">Eight themes for the island and panel, each adjustable.</p>
                <span className="mt-4 text-sm text-dim group-hover:text-fg">Browse themes →</span>
              </Link>
            </li>
          </ul>
        </Container>
      </section>
      <DownloadBand />
    </>
  );
}
