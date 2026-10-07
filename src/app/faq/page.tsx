import type { Metadata } from "next";
import Link from "next/link";
import { DownloadBand } from "@/components/site/Download";
import { FaqList } from "@/components/site/FaqList";
import { JsonLd } from "@/components/site/JsonLd";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/site/Section";
import { FAQ } from "@/lib/faq";
import { faqLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "WorkOS FAQ — Workspaces, Privacy, Platforms and Themes",
  description:
    "Answers to common questions about WorkOS: how workspaces work, whether apps close when you switch, Claude Code support, multi-monitor setups, offline use, data storage and platform availability.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHero
        crumbs={[{ name: "FAQ", path: "/faq" }]}
        eyebrow="FAQ"
        title="Frequently asked questions"
        lede="Straight answers about what WorkOS does today, where your data lives and which platforms are supported."
      />
      <section aria-label="Questions" className="pb-20">
        <Container className="max-w-3xl">
          <FaqList items={FAQ} headingLevel={2} />
          <p className="mt-10 text-sm text-muted">
            Still curious? Explore <Link href="/workspaces" className="text-fg underline decoration-accent/50 underline-offset-4">workspaces</Link>, the{" "}
            <Link href="/work-island" className="text-fg underline decoration-accent/50 underline-offset-4">Work Island</Link> or{" "}
            <Link href="/features" className="text-fg underline decoration-accent/50 underline-offset-4">every feature</Link>.
          </p>
        </Container>
      </section>
      <DownloadBand />
    </>
  );
}
