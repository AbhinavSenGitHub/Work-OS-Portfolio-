import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ThemeStage } from "@/components/demos/ThemeGallery";
import { IslandStates } from "@/components/sections/IslandStates";
import { DownloadBand, DownloadButton, SecondaryButton } from "@/components/site/Download";
import { FaqList } from "@/components/site/FaqList";
import { JsonLd } from "@/components/site/JsonLd";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/site/Section";
import { faqLd, pageMetadata } from "@/lib/seo";
import { getTheme, THEMES } from "@/lib/themes";

export const dynamicParams = false;

export function generateStaticParams() {
  return THEMES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/themes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = getTheme(slug);
  if (!t) return {};
  return pageMetadata({ title: t.seoTitle, description: t.metaDescription, path: `/themes/${t.slug}` });
}

export default async function ThemePage({ params }: PageProps<"/themes/[slug]">) {
  const { slug } = await params;
  const theme = getTheme(slug);
  if (!theme) notFound();

  const faq = [
    ...theme.faq,
    { q: `How do I switch to the ${theme.name} theme?`, a: `Open the Work Island, go to the Themes page and select ${theme.name}. The change applies immediately, and you can adjust it from there.` },
  ];
  const tk = theme.tokens;
  const tokens: [string, string][] = [
    ["Background", `${tk.background}`],
    ["Base", tk.base],
    ["Base end", tk.baseEnd],
    ["Text", tk.text],
    ["Accent", tk.accent],
    ["Pill opacity", `${Math.round(tk.opacity * 100)}%`],
    ["Blur", `${tk.blur}px`],
    ["Border", `${Math.round(tk.border * 100)}%`],
    ["Corner radius", `${tk.radius}px`],
    ["Icons", tk.iconStyle],
    ["Motion", tk.animation],
    ["Wallpaper", tk.wallpaper ? "Included (optional)" : "None"],
  ];
  const others = THEMES.filter((t) => t.slug !== theme.slug);

  return (
    <>
      <JsonLd data={faqLd(faq)} />
      <PageHero
        crumbs={[
          { name: "Themes", path: "/themes" },
          { name: theme.name, path: `/themes/${theme.slug}` },
        ]}
        eyebrow={<span style={{ color: tk.accent }}>WorkOS theme · {theme.appDescription}</span>}
        title={theme.h1}
        lede={theme.intro}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <DownloadButton size="lg" label={`Use ${theme.name} in WorkOS`} />
          <SecondaryButton href="/themes">Compare all themes</SecondaryButton>
        </div>
      </PageHero>

      <section aria-labelledby="preview-title" className="pb-20">
        <Container>
          <h2 id="preview-title" className="sr-only">{theme.name} theme preview</h2>
          <ThemeStage theme={theme} />
          <p className="mt-3 text-center text-xs text-dim">Interactive preview. Use the round buttons at the bottom of the panel to browse pages in {theme.name}.</p>
        </Container>
      </section>

      <section aria-labelledby="char-title" className="border-t border-line py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="char-title" className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">What makes {theme.name} different</h2>
            <ul className="mt-6 space-y-4">
              {theme.character.map((c) => (
                <li key={c} className="flex gap-3 leading-relaxed text-muted">
                  <span className="mt-2 size-1.5 flex-none rounded-full" style={{ background: tk.accent }} aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
            <h2 className="mt-12 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Best for</h2>
            <ul className="mt-6 space-y-3">
              {theme.bestFor.map((c) => (
                <li key={c} className="flex gap-3 text-muted">
                  <span className="mt-2 size-1.5 flex-none rounded-full bg-dim" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Design tokens</h2>
            <p className="mt-3 text-sm text-muted">The exact values {theme.name} uses in the WorkOS app.</p>
            <dl className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {tokens.map(([k, v]) => (
                <div key={k} className="rounded-xl border border-line bg-surface/40 px-3 py-2.5">
                  <dt className="text-xs text-dim">{k}</dt>
                  <dd className="mt-1 flex items-center gap-2 font-mono text-[13px] text-fg">
                    {v.startsWith("#") && <span className="size-3 rounded-full border border-white/15" style={{ background: v }} aria-hidden="true" />}
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section aria-labelledby="states-title" className="border-t border-line py-20">
        <Container>
          <h2 id="states-title" className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">The Work Island in {theme.name}</h2>
          <p className="mt-3 max-w-2xl text-muted">
            The same four states you&apos;ll see every day, in {theme.name}. Learn more about{" "}
            <Link href="/work-island" className="text-fg underline decoration-accent/50 underline-offset-4">how the Work Island works</Link>.
          </p>
          <div className="mt-10">
            <IslandStates theme={tk} />
          </div>
        </Container>
      </section>

      <section aria-labelledby="faq-title" className="border-t border-line py-20">
        <Container className="max-w-3xl">
          <h2 id="faq-title" className="mb-8 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{theme.name} theme FAQ</h2>
          <FaqList items={faq} />
        </Container>
      </section>

      <nav aria-labelledby="more-title" className="border-t border-line py-20">
        <Container>
          <h2 id="more-title" className="text-2xl font-semibold tracking-tight text-fg">More WorkOS themes</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((t) => (
              <li key={t.slug}>
                <Link href={`/themes/${t.slug}`} className="card flex items-center gap-3 p-4 transition hover:border-line-2">
                  <span className="size-3 flex-none rounded-full" style={{ background: t.tokens.accent }} aria-hidden="true" />
                  <span>
                    <span className="block font-medium text-fg">{t.name} theme</span>
                    <span className="block text-xs text-dim">{t.appDescription}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <DownloadBand title={`Try ${theme.name} on your desktop`} />
    </>
  );
}
