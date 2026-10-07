import type { Metadata } from "next";
import Link from "next/link";
import { ThemeGallery } from "@/components/demos/ThemeGallery";
import { DownloadBand } from "@/components/site/Download";
import { FaqList } from "@/components/site/FaqList";
import { JsonLd } from "@/components/site/JsonLd";
import { PageHero } from "@/components/site/PageHero";
import { Container, SectionHeading } from "@/components/site/Section";
import { absoluteUrl } from "@/lib/site";
import { faqLd, pageMetadata } from "@/lib/seo";
import { THEMES } from "@/lib/themes";

export const metadata: Metadata = pageMetadata({
  title: "WorkOS Themes — Customize Your Developer Workspace",
  description:
    "Browse all eight WorkOS themes, from the Midnight default to true-black AMOLED, and preview how the Work Island, workspaces, clipboard, notes and media look in each one.",
  path: "/themes",
});

const THEME_FAQ = [
  { q: "How many themes does WorkOS have?", a: `WorkOS ships with ${THEMES.length} themes: ${THEMES.map((t) => t.name).join(", ")}.` },
  { q: "What does a theme change?", a: "A theme sets the Work Island's background, panel, cards, borders, accent, buttons, icon weight, corner radius, blur, transparency and animation level. It can also apply a matching wallpaper, but only after asking." },
  { q: "Can I adjust a theme after choosing it?", a: "Yes. Accent colour, pill opacity (35–100%), blur (0–40px), border, corner radius (8–32px), width, animation (low, medium, high) and background style (solid, gradient or glass) can all be adjusted." },
  { q: "Is there a light theme?", a: "Not currently. All WorkOS themes are dark or monochrome." },
  { q: "Can I use my own wallpaper?", a: "Yes. You can set a custom wallpaper, and WorkOS can restore your original wallpaper at any time." },
];

export default function ThemesPage() {
  return (
    <>
      <JsonLd
        data={[
          faqLd(THEME_FAQ),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "WorkOS themes",
            itemListElement: THEMES.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: `${t.name} theme`, url: absoluteUrl(`/themes/${t.slug}`) })),
          },
        ]}
      />
      <PageHero
        crumbs={[{ name: "Themes", path: "/themes" }]}
        eyebrow="Themes"
        title="Make WorkOS feel like your workspace"
        lede="Every WorkOS theme restyles the whole interface: the Work Island, the expanded panel, cards, navigation, buttons, progress and media states. Choose a theme below and explore the app in it."
      />

      <section aria-labelledby="gallery-title" className="pb-20 sm:pb-28">
        <Container>
          <h2 id="gallery-title" className="sr-only">Theme gallery</h2>
          <ThemeGallery showFilters />
        </Container>
      </section>

      <section aria-labelledby="all-title" className="border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading id="all-title" eyebrow="All themes" title="Eight starting points" lede="Each theme has its own page with a full preview, the exact design tokens and what it's best for." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {THEMES.map((t) => (
              <li key={t.slug}>
                <Link href={`/themes/${t.slug}`} className="card group block h-full p-5 transition hover:border-line-2">
                  <span className="flex items-center gap-2.5">
                    <span className="size-3 rounded-full" style={{ background: t.tokens.accent, boxShadow: `0 0 16px ${t.tokens.accent}` }} aria-hidden="true" />
                    <span className="font-semibold text-fg">{t.name}</span>
                  </span>
                  <span className="mt-2 block text-sm text-muted">{t.appDescription}</span>
                  <span className="mt-4 block text-sm text-dim group-hover:text-fg">{t.name} theme details →</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="custom-title" className="border-t border-line py-20 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading id="custom-title" eyebrow="Customize" title="Fine-tune any theme" />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {[
              ["Accent colour", "Pick any accent for status, progress and primary buttons."],
              ["Opacity", "From 35% to fully opaque for the pill."],
              ["Blur", "0 to 40px of frost behind the island."],
              ["Corners", "Anywhere from 8 to 32px."],
              ["Width", "560 to 840px for the expanded panel."],
              ["Motion", "Low, medium or high animation."],
              ["Background", "Solid, gradient or glass."],
              ["Wallpaper", "Optional matching wallpaper, rendered locally, applied only after asking."],
            ].map(([k, v]) => (
              <li key={k} className="card p-5">
                <h3 className="font-semibold text-fg">{k}</h3>
                <p className="mt-1 text-sm text-muted">{v}</p>
              </li>
            ))}
          </ul>
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-semibold text-fg">Theme questions</h2>
            <FaqList items={THEME_FAQ} />
          </div>
          <p className="mt-8 text-sm text-muted">
            Themes style the <Link href="/work-island" className="text-fg underline decoration-accent/50 underline-offset-4">Work Island</Link> and every page inside it, from{" "}
            <Link href="/workspaces" className="text-fg underline decoration-accent/50 underline-offset-4">workspaces</Link> to{" "}
            <Link href="/features" className="text-fg underline decoration-accent/50 underline-offset-4">clipboard, notes and downloads</Link>.
          </p>
        </Container>
      </section>

      <DownloadBand title="Try every theme in WorkOS" />
    </>
  );
}
