import type { Metadata } from "next";
import Link from "next/link";
import { Pricing } from "@/components/sections/Home";
import { DownloadButton, DownloadCount } from "@/components/site/Download";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/site/Section";
import { pageMetadata } from "@/lib/seo";
import { linuxRelease } from "@/lib/linuxRelease";
import { release } from "@/lib/release";
import { isDownloadable, linux, platforms, statusLabel } from "@/lib/site";

const megabytes = (bytes: number) => `${(bytes / 1048576).toFixed(1)} MB`;

function TuxGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
      <path d="M8 1c-1.7 0-2.7 1.4-2.7 3.2 0 .9.2 1.5.1 2.2-.1.8-.9 1.6-1.6 2.9-.7 1.3-1 2.4-.6 3 .3.4.9.4 1.4.6.6.2 1 .6 1.6.6.5 0 .8-.3 1.1-.4h1.4c.3.1.6.4 1.1.4.6 0 1-.4 1.6-.6.5-.2 1.1-.2 1.4-.6.4-.6.1-1.7-.6-3-.7-1.3-1.5-2.1-1.6-2.9-.1-.7.1-1.3.1-2.2C10.7 2.4 9.7 1 8 1zm-1 3.1c.3 0 .5.3.5.7s-.2.7-.5.7-.5-.3-.5-.7.2-.7.5-.7zm2 0c.3 0 .5.3.5.7s-.2.7-.5.7-.5-.3-.5-.7.2-.7.5-.7zM8 6.1c.6 0 1.3.4 1.3.6 0 .3-.7.8-1.3.8s-1.3-.5-1.3-.8c0-.2.7-.6 1.3-.6z" />
    </svg>
  );
}

export const metadata: Metadata = pageMetadata({
  title: "Download WorkOS for Windows and Linux",
  description:
    "Get WorkOS, the desktop workspace manager for developers. Built for Windows 10 and 11 (64-bit), with an early Linux beta (.deb). A macOS version is coming later.",
  path: "/download",
});

const platformNotes: Record<string, string> = {
  windows: "Every WorkOS feature is built for Windows first: workspaces, context restore, the Work Island, clipboard, notes, downloads, media and system status.",
  macos: "An early macOS version is in development. Some features, like media controls, aren't supported there yet.",
  linux:
    "Early beta. The island, notes, clipboard and themes work; launching apps, the shortcut, media, downloads and system stats are still being built for Linux.",
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
                ) : p.id === "linux" && p.downloadUrl ? (
                  <div className="mt-6">
                    <a
                      href={p.downloadUrl}
                      download=""
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-accent/50 px-6 text-[15px] font-semibold text-fg transition hover:bg-accent/10"
                    >
                      <TuxGlyph />
                      Download for Linux (beta)
                    </a>
                    <p className="mt-3 text-xs text-dim">
                      Version {linuxRelease.version} · {megabytes(linuxRelease.bytes)} · .deb · {linuxRelease.date}
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

          {linux.downloadUrl && (
            <div className="card mt-6 p-6">
              <h2 className="text-lg font-semibold text-fg">Installing on Linux (beta)</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted">
                <li>
                  Open a terminal in the folder you downloaded to and run{" "}
                  <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-fg">sudo apt install ./WorkOS-{linuxRelease.version}-amd64.deb</code>
                </li>
                <li>
                  Start it from your apps menu, or run <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-fg">WorkOS</code>.
                </li>
                <li>
                  On Wayland (the default on recent Ubuntu and Fedora) the island may not sit exactly at the top. For the best
                  result, choose &ldquo;Ubuntu on Xorg&rdquo; on the login screen.
                </li>
                <li>The beta doesn&rsquo;t update itself yet: download the new version from this page when one comes out.</li>
              </ol>
              <p className="mt-4 break-all text-xs text-dim">
                SHA-256: <span className="font-mono">{linuxRelease.sha256}</span>
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
