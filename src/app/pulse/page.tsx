import type { Metadata } from "next";
import Link from "next/link";
import { PulseDemo } from "@/components/demos/PulseDemo";
import { DownloadBand } from "@/components/site/Download";
import { FaqList } from "@/components/site/FaqList";
import { JsonLd } from "@/components/site/JsonLd";
import { PageHero } from "@/components/site/PageHero";
import { Container, SectionHeading } from "@/components/site/Section";
import { StatusTag } from "@/components/site/Status";
import type { FeatureStatus } from "@/lib/features";
import { faqLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "WorkOS Pulse — Know When Your Computer Needs You",
  description:
    "Pulse is the Work Island's attention layer. It surfaces local signals like a required restart, critical battery, finished downloads and apps to add to a workspace, in one compact place.",
  path: "/pulse",
});

const SIGNALS: { name: string; body: string; status: FeatureStatus }[] = [
  { name: "Windows Update", body: "Restart required or updates available, with a shortcut to Update settings.", status: "available" },
  { name: "Critical battery", body: "Shown with priority so you can plug in before it's too late.", status: "available" },
  { name: "Downloads", body: "Progress while running and a check mark when complete.", status: "available" },
  { name: "Workspace suggestions", body: "A new app appeared in this workspace: add it with one click.", status: "available" },
  { name: "Media", body: "An equalizer when something is playing.", status: "available" },
  { name: "Claude Code sessions", body: "Show when a session is waiting for input or permission, and jump to it.", status: "planned" },
  { name: "Build results", body: "Surface failed or finished builds.", status: "planned" },
];

const PULSE_FAQ = [
  { q: "What is Pulse?", a: "Pulse is how the Work Island signals attention. Instead of a stream of notifications, the island's launcher shows a dot, a count or a progress ring, and the most important signal wins." },
  { q: "Does Pulse monitor every app?", a: "No. Pulse only uses signals WorkOS can read locally today: Windows Update state, battery, downloads, media and workspace suggestions. It does not read other apps' notifications." },
  { q: "Can Pulse tell me when Claude Code needs attention?", a: "Not yet. Claude Code session signals are planned but not part of the current version." },
];

export default function PulsePage() {
  return (
    <>
      <JsonLd data={faqLd(PULSE_FAQ)} />
      <PageHero
        crumbs={[{ name: "Pulse", path: "/pulse" }]}
        eyebrow="Pulse"
        title="Know when your computer needs you."
        lede="Pulse brings useful local activity signals into one compact place: the Work Island. It stays silent until something matters, then shows you exactly what."
        aside={<PulseDemo />}
      />

      <section aria-labelledby="priority-title" className="border-t border-line py-20 sm:py-28">
        <Container className="max-w-4xl">
          <SectionHeading
            id="priority-title"
            eyebrow="Priority"
            title="One signal at a time, the most important first"
            lede="When the island is collapsed to its launcher, it shows a single state in this order: something critical, an app to add, a download, a finished download, media, and finally the plain W."
          />
        </Container>
      </section>

      <section aria-labelledby="signals-title" className="border-t border-line py-20 sm:py-28">
        <Container className="max-w-4xl">
          <h2 id="signals-title" className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Signals</h2>
          <ul className="mt-8 divide-y divide-line rounded-2xl border border-line">
            {SIGNALS.map((s) => (
              <li key={s.name} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:gap-6">
                <span className="font-medium text-fg sm:w-56">{s.name}</span>
                <span className="flex-1 text-sm text-muted">{s.body}</span>
                <StatusTag status={s.status} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="faq-title" className="border-t border-line py-20 sm:py-28">
        <Container className="max-w-3xl">
          <h2 id="faq-title" className="mb-8 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Pulse questions</h2>
          <FaqList items={PULSE_FAQ} />
          <p className="mt-8 text-sm text-muted">
            Pulse lives in the <Link href="/work-island" className="text-fg underline decoration-accent/50 underline-offset-4">Work Island</Link>. Using AI coding agents? See{" "}
            <Link href="/features/claude-code" className="text-fg underline decoration-accent/50 underline-offset-4">WorkOS for Claude Code</Link>.
          </p>
        </Container>
      </section>

      <DownloadBand />
    </>
  );
}
