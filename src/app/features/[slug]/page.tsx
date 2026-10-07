import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FeaturePreview } from "@/components/sections/FeaturePreview";
import { DownloadBand } from "@/components/site/Download";
import { FaqList } from "@/components/site/FaqList";
import { JsonLd } from "@/components/site/JsonLd";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/site/Section";
import { StatusTag } from "@/components/site/Status";
import { FEATURES, getFeature } from "@/lib/features";
import { faqLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/features/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const f = getFeature(slug);
  if (!f) return {};
  return pageMetadata({ title: f.seoTitle, description: f.metaDescription, path: `/features/${f.slug}` });
}

export default async function FeaturePage({ params }: PageProps<"/features/[slug]">) {
  const { slug } = await params;
  const f = getFeature(slug);
  if (!f) notFound();

  return (
    <>
      <JsonLd data={faqLd(f.faq)} />
      <PageHero
        crumbs={[
          { name: "Features", path: "/features" },
          { name: f.name, path: `/features/${f.slug}` },
        ]}
        eyebrow={
          <span className="inline-flex items-center gap-3">
            {f.name}
            {f.status !== "available" && <StatusTag status={f.status} className="normal-case tracking-normal" />}
          </span>
        }
        title={f.h1}
        lede={f.lede}
      />

      <section aria-labelledby="preview-title" className="pb-20">
        <Container className="max-w-5xl">
          <h2 id="preview-title" className="sr-only">{f.name} interface preview</h2>
          <FeaturePreview kind={f.preview} />
          {f.status !== "available" && (
            <p className="mt-3 text-center text-xs text-dim">
              Preview includes {f.status === "planned" ? "planned" : "in-development"} functionality that isn&apos;t in the current version. See the status of each detail below.
            </p>
          )}
        </Container>
      </section>

      <section aria-labelledby="uses-title" className="border-t border-line py-20">
        <Container>
          <h2 id="uses-title" className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Where it helps</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {f.useCases.map((u) => (
              <li key={u.title} className="card p-6">
                <h3 className="font-semibold text-fg">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{u.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="details-title" className="border-t border-line py-20">
        <Container className="max-w-4xl">
          <h2 id="details-title" className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Details</h2>
          <dl className="mt-8 divide-y divide-line rounded-2xl border border-line">
            {f.details.map((d) => (
              <div key={d.title} className="grid gap-2 p-5 sm:grid-cols-[220px_1fr] sm:gap-6 sm:p-6">
                <dt className="flex flex-wrap items-center gap-2 font-medium text-fg">
                  {d.title}
                  {d.status && d.status !== "available" && <StatusTag status={d.status} />}
                </dt>
                <dd className="text-sm leading-relaxed text-muted">{d.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="faq-title" className="border-t border-line py-20">
        <Container className="max-w-3xl">
          <h2 id="faq-title" className="mb-8 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{f.name} FAQ</h2>
          <FaqList items={f.faq} />
          <nav aria-label="Related pages" className="mt-12">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-dim">Related</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {f.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="inline-flex rounded-full border border-line-2 px-4 py-2 text-sm text-fg transition hover:border-accent/50">
                    {r.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      <DownloadBand />
    </>
  );
}
