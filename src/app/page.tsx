import type { Metadata } from "next";
import Link from "next/link";
import { HeroDemo } from "@/components/demos/HeroDemo";
import { InAction } from "@/components/demos/InAction";
import { ThemeGallery } from "@/components/demos/ThemeGallery";
import { IslandStates } from "@/components/sections/IslandStates";
import { BeforeAfter, Comparison, ContextGallery, Developers, Pricing, Privacy } from "@/components/sections/Home";
import { DownloadBand, DownloadButton, PlatformList, SecondaryButton } from "@/components/site/Download";
import { FaqList } from "@/components/site/FaqList";
import { JsonLd } from "@/components/site/JsonLd";
import { Container, SectionHeading } from "@/components/site/Section";
import { FAQ } from "@/lib/faq";
import { faqLd, pageMetadata, softwareLd } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "WorkOS — Your Computer, Organized Around Your Work",
  description: site.description,
  path: "/",
});

const HOME_FAQ = FAQ.filter((f) =>
  [
    "What is WorkOS?",
    "Does WorkOS close my applications when I switch workspaces?",
    "Does WorkOS work with Claude Code?",
    "Where is my workspace data stored?",
    "Is WorkOS available for macOS?",
    "Can I customize the WorkOS theme?",
  ].includes(f.q),
);

export default function HomePage() {
  return (
    <>
      <JsonLd data={[softwareLd(), faqLd(HOME_FAQ)]} />

      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="glow-top pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative pb-16 pt-14 sm:pt-20 lg:pb-24">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent">WorkOS for developers</p>
            <h1 id="hero-title" className="mt-5 text-balance text-[40px] font-semibold leading-[1.04] tracking-tight text-gradient sm:text-6xl lg:text-[76px]">
              Your computer.
              <br />
              Organized around your work.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Create persistent workspaces for every project, switch contexts instantly, and keep the tools, files and activity you need close at hand.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <DownloadButton size="lg" label="Download WorkOS" />
              <SecondaryButton href="#product">Explore WorkOS</SecondaryButton>
            </div>
            <PlatformList className="mt-7 justify-center" />
          </div>
          <div className="mx-auto mt-14 max-w-5xl">
            <HeroDemo />
          </div>
        </Container>
      </section>

      {/* Story */}
      <section aria-labelledby="story-title" className="border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="story-title"
            eyebrow="Why WorkOS"
            title="Here's what your computer feels like after WorkOS"
            lede="WorkOS isn't another launcher or task list. It organizes the computer itself: which apps, folders and tabs belong to which piece of work."
          />
          <div className="mt-12">
            <BeforeAfter />
          </div>
        </Container>
      </section>

      {/* In action */}
      <section id="product" aria-labelledby="product-title" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="product-title"
            eyebrow="See WorkOS in action"
            title="One island. Everything you reach for."
            lede="The Work Island is a small pill at the top of your screen. Expand it and every page is one click away."
          />
          <div className="mt-12">
            <InAction />
          </div>
        </Container>
      </section>

      {/* Island states */}
      <section aria-labelledby="island-title" className="border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="island-title"
            eyebrow="Work Island"
            title="Your work, one glance away"
            lede="The Work Island stays quiet until something needs your attention. When an app is maximized it becomes a small W; during fullscreen video or games it hides."
          />
          <div className="mt-12">
            <IslandStates />
          </div>
          <p className="mt-8 text-center">
            <Link href="/work-island" className="text-sm font-medium text-fg underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
              See every Work Island state →
            </Link>
          </p>
        </Container>
      </section>

      {/* Themes */}
      <section aria-labelledby="themes-title" className="border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading id="themes-title" eyebrow="Themes" title="Make WorkOS feel like your workspace" lede="Eight themes, each one changing the island, panel, cards, buttons and accents. Pick one and fine-tune it." />
          <div className="mt-12">
            <ThemeGallery />
          </div>
          <p className="mt-8 text-center">
            <Link href="/themes" className="text-sm font-medium text-fg underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
              Browse all WorkOS themes →
            </Link>
          </p>
        </Container>
      </section>

      {/* Gallery */}
      <section aria-labelledby="gallery-title" className="border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading id="gallery-title" eyebrow="Interface" title="See WorkOS in context" lede="How WorkOS sits on a real desktop, next to the apps you already use." />
          <div className="mt-12">
            <ContextGallery />
          </div>
          <p className="mt-6 text-center text-xs text-dim">Interface previews recreated from the WorkOS app&apos;s components. App tiles are placeholders, not vendor logos.</p>
        </Container>
      </section>

      {/* Developers */}
      <section id="developers" aria-labelledby="dev-title" className="scroll-mt-20 border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="dev-title"
            eyebrow="Built for developers"
            title="Every project gets its own environment"
            lede={
              <>
                Four ways people organize their machine with{" "}
                <Link href="/workspaces" className="text-fg underline decoration-accent/50 underline-offset-4">workspaces</Link> and{" "}
                <Link href="/features/workspace-memory" className="text-fg underline decoration-accent/50 underline-offset-4">workspace memory</Link>.
              </>
            }
          />
          <div className="mt-12">
            <Developers />
          </div>
        </Container>
      </section>

      {/* Comparison */}
      <section aria-labelledby="compare-title" className="border-t border-line py-20 sm:py-28">
        <Container className="max-w-4xl">
          <SectionHeading id="compare-title" eyebrow="What makes it different" title="Organized around work, not apps or tasks" />
          <div className="mt-12">
            <Comparison />
          </div>
        </Container>
      </section>

      {/* Privacy */}
      <section aria-labelledby="privacy-title" className="border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading id="privacy-title" eyebrow="Local-first" title="Your workspace stays yours" lede="WorkOS runs on your computer and keeps its data there." />
          <div className="mt-12">
            <Privacy />
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section id="pricing" aria-labelledby="pricing-title" className="scroll-mt-20 border-t border-line py-20 sm:py-24">
        <Container>
          <h2 id="pricing-title" className="sr-only">Pricing</h2>
          <Pricing />
        </Container>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="border-t border-line py-20 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions, answered" />
          <div className="mt-10">
            <FaqList items={HOME_FAQ} />
          </div>
          <p className="mt-6 text-center">
            <Link href="/faq" className="text-sm font-medium text-fg underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
              All frequently asked questions →
            </Link>
          </p>
        </Container>
      </section>

      <DownloadBand />
    </>
  );
}
