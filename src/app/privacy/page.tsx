import type { Metadata } from "next";
import { PRIVACY_POINTS } from "@/components/sections/Home";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/site/Section";
import { pageMetadata } from "@/lib/seo";
import { analytics } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "WorkOS Privacy — Local-First by Design",
  description:
    "How WorkOS handles your data: no account, no telemetry, and workspaces, notes and clipboard history stored locally on your computer. Plus how this website handles visits.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Privacy", path: "/privacy" }]}
        eyebrow="Privacy"
        title="Your workspace stays yours"
        lede="WorkOS is a local-first desktop app. This page explains what the app stores, where, and the few cases where anything leaves your computer."
      />
      <section className="pb-20">
        <Container className="max-w-3xl">
          <article className="prose-wos space-y-12">
            <section aria-labelledby="app-title">
              <h2 id="app-title" className="mb-4 text-2xl font-semibold text-fg">The WorkOS app</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {PRIVACY_POINTS.map((p) => (
                  <li key={p.title} className="card p-5">
                    <h3 className="font-semibold text-fg">{p.title}</h3>
                    <p className="mt-1 text-sm">{p.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="where-title">
              <h2 id="where-title" className="mb-4 text-2xl font-semibold text-fg">Where data is stored</h2>
              <p>
                Workspaces, app context, clipboard history, notes, preferences and system event history are stored in a SQLite database in your Windows user&apos;s
                app data folder. Clipboard images are saved as PNG files alongside it. Uninstalling WorkOS and deleting that folder removes everything.
              </p>
              <p>
                The optional Chrome extension stores workspace tab information in Chrome&apos;s own extension storage and communicates only with the WorkOS app on your computer,
                through a local channel.
              </p>
            </section>

            <section aria-labelledby="network-title">
              <h2 id="network-title" className="mb-4 text-2xl font-semibold text-fg">What uses the network</h2>
              <p>
                Only the optional weather card. It is off by default. When you enable it, WorkOS sends the city name you enter, and then its coordinates, to the free Open-Meteo
                weather service to fetch a forecast. No API key, account or identifier is involved.
              </p>
              <p>Everything else in WorkOS works offline. The app has no telemetry, analytics or crash reporting that sends data anywhere.</p>
            </section>

            <section aria-labelledby="site-title">
              <h2 id="site-title" className="mb-4 text-2xl font-semibold text-fg">This website</h2>
              <p>This website does not set cookies and does not use advertising or cross-site tracking.</p>
              {analytics.domain ? (
                <p>We count page views with a cookieless, privacy-focused analytics service that doesn&apos;t collect personal data or track you across sites.</p>
              ) : (
                <p>No analytics scripts are loaded.</p>
              )}
              <p>Fonts are served from this site, not from a third-party font service.</p>
            </section>
          </article>
        </Container>
      </section>
    </>
  );
}
