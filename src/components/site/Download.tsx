import Link from "next/link";
import type { ReactNode } from "react";
import { withBase } from "@/lib/base";
import { downloadCount } from "@/lib/downloads";
import { isDownloadable, platforms, statusLabel, windows } from "@/lib/site";

function WindowsGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor">
      <path d="M1 2.3l5.7-.8v5.6H1zM7.5 1.4L15 .3v6.8H7.5zM1 7.9h5.7v5.6L1 12.7zM7.5 7.9H15v6.8l-7.5-1.1z" />
    </svg>
  );
}

/**
 * Primary download button. Links to the real installer when one is
 * configured; otherwise it goes to /download, which explains availability.
 */
export function DownloadButton({ size = "md", label }: { size?: "md" | "lg"; label?: string }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full bg-accent font-semibold text-accent-ink shadow-[0_0_0_1px_rgba(61,220,151,.4),0_10px_40px_-10px_rgba(61,220,151,.6)] transition hover:brightness-110 ${
    size === "lg" ? "h-12 px-6 text-[15px]" : "h-10 px-5 text-sm"
  }`;
  if (isDownloadable && windows.downloadUrl) {
    // Through /api/download, which counts the download and sends the installer.
    return (
      <a href={withBase("/api/download")} className={cls} download={windows.downloadUrl.startsWith("/") ? "" : undefined}>
        <WindowsGlyph />
        {label ?? "Download for Windows"}
      </a>
    );
  }
  return (
    <Link href="/download" className={cls}>
      <WindowsGlyph />
      {label ?? "Get WorkOS"}
    </Link>
  );
}

/** "1,234 downloads" — shown once the counter has a number. */
export async function DownloadCount({ className = "" }: { className?: string }) {
  const n = await downloadCount();
  if (n === null) return null;
  return (
    <p className={`text-xs text-dim ${className}`}>
      <span className="font-semibold text-fg tabular-nums">{n.toLocaleString("en-US")}</span> {n === 1 ? "download" : "downloads"}
    </p>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-2 px-6 text-[15px] font-medium text-fg transition hover:border-accent/50 hover:bg-white/[.03]"
    >
      {children}
    </Link>
  );
}

export function PlatformList({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] ${className}`} aria-label="Platform availability">
      {platforms.map((p) => (
        <li key={p.id} className="flex items-center gap-2">
          <span aria-hidden="true" className={`size-1.5 rounded-full ${p.status === "available" ? "bg-accent" : "bg-dim"}`} />
          <span className="text-fg">{p.name}</span>
          <span className="text-dim">— {statusLabel[p.status]}</span>
        </li>
      ))}
    </ul>
  );
}

/** Full-width call to action used at the end of most pages. */
export function DownloadBand({ title = "Get WorkOS", body }: { title?: string; body?: string }) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t border-line">
      <div className="glow-top pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:py-28">
        <h2 id="cta-title" className="text-balance text-3xl font-semibold tracking-tight text-gradient sm:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-pretty text-muted sm:text-lg">
          {body ??
            (isDownloadable
              ? "Download WorkOS for Windows and give every project its own environment."
              : "WorkOS for Windows is being prepared for public release. See what is available today and what comes next.")}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <DownloadButton size="lg" label={isDownloadable ? "Download for Windows" : "Get WorkOS"} />
          <SecondaryButton href="/features">Explore the app</SecondaryButton>
        </div>
        <PlatformList className="mt-8 justify-center" />
        {isDownloadable && <p className="mt-3 text-xs text-dim">{windows.requirements}</p>}
      </div>
    </section>
  );
}
