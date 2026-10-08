import type { Metadata } from "next";
import Link from "next/link";
import { Pricing } from "@/components/sections/Home";
import { DownloadButton, DownloadCount } from "@/components/site/Download";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/site/Section";
import { pageMetadata } from "@/lib/seo";
import { release } from "@/lib/release";
import { isDownloadable, platforms, statusLabel } from "@/lib/site";

const megabytes = (bytes: number) => `${(bytes / 1048576).toFixed(1)} MB`;

export const metadata: Metadata = pageMetadata({
  title: "Download WorkOS for Windows",
  description:
    "Get WorkOS, the desktop workspace manager for developers. Built for Windows 10 and 11 (64-bit). macOS and Linux versions are coming later.",
  path: "/download",
});

const platformNotes: Record<string, string> = {
  windows: "Every WorkOS feature is built for Windows first: workspaces, context restore, the Work Island, clipboard, notes, downloads, media and system status.",
  macos: "An early macOS version is in development. Some features, like media controls, aren't supported there yet.",
  linux: "Linux support is not available yet.",
};

export default function DownloadPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Download", path: "/download" }]}
        eyebrow="Download"
        title="Get WorkOS"
        lede={
          isDownloadable
            ? "Download WorkOS for Windows. No account needed: install it and create your first workspace."
            : "WorkOS for Windows is being prepared for public release. There's no public installer yet, so no download link is shown here until there is."
        }
      />
      <section aria-labelledby="platforms-title" className="pb-20">
        <Container className="max-w-5xl">
          <h2 id="platforms-title" className="sr-only">Platforms</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {platforms.map((p) => (
              <li key={p.id} className={`card flex flex-col p-6 ${p.id === "windows" ? "border-accent/40" : ""}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-fg">{p.name}</h3>
                  <span className="pill-tag" data-tone={p.status === "available" ? "ok" : "soon"}>{statusLabel[p.status]}</span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{platformNotes[p.id]}</p>
                {p.requirements && <p className="mt-4 text-xs text-dim">{p.requirements}</p>}
                {p.status === "available" && p.downloadUrl ? (
                  <div className="mt-6">
                    <DownloadButton size="lg" />
                    <p className="mt-3 text-xs text-dim">
                      Version {release.version} · {megabytes(release.bytes)} · {release.date}
                    </p>
                    <DownloadCount className="mt-1" />
                    <p className="mt-2 text-xs text-dim">
                      Free for 30 days, then $6/month, $48/year or $99 lifetime. Updates install automatically.
                    </p>
                  </div>
                ) : (
                  <p className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-line text-sm text-dim" aria-disabled="true">
                    Not available to download yet
                  </p>
                )}
              </li>
            ))}
          </ul>

          {isDownloadable && (
            <div className="card mt-10 p-6">
              <h2 className="text-lg font-semibold text-fg">Installing on Windows</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted">
                <li>Run the installer you downloaded and follow the steps. No admin rights are needed.</li>
                <li>
                  WorkOS is not code-signed yet, so Windows SmartScreen may say &ldquo;Windows protected your PC&rdquo;.
                  Click <span className="text-fg">More info</span>, then <span className="text-fg">Run anyway</span>.
                </li>
                <li>WorkOS starts as a small island at the top of your screen. Press Ctrl+Alt+Space to open it.</li>
              </ol>
              <p className="mt-4 break-all text-xs text-dim">
                SHA-256: <span className="font-mono">{release.sha256}</span>
              </p>
            </div>
          )}

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-fg">What you get</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>Persistent <Link href="/workspaces" className="text-fg underline decoration-accent/50 underline-offset-4">workspaces</Link> with context restore</li>
                <li>The <Link href="/work-island" className="text-fg underline decoration-accent/50 underline-offset-4">Work Island</Link> and its attention signals</li>
                <li>Clipboard history, notes, downloads, media and system pages</li>
                <li>Eight <Link href="/themes" className="text-fg underline decoration-accent/50 underline-offset-4">themes</Link> you can fine-tune</li>
                <li>Optional Chrome extension for per-workspace tabs</li>
              </ul>
            </div>
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-fg">Good to know</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                <li>No account or sign-in.</li>
                <li>Data is stored locally on your computer.</li>
                <li>Works offline (weather is optional and off by default).</li>
                <li>
                  More in the <Link href="/faq" className="text-fg underline decoration-accent/50 underline-offset-4">FAQ</Link> and{" "}
                  <Link href="/privacy" className="text-fg underline decoration-accent/50 underline-offset-4">privacy notes</Link>.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16">
            <Pricing />
          </div>
        </Container>
      </section>
    </>
  );
}
