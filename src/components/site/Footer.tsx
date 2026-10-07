import Link from "next/link";
import { Logo } from "./Logo";
import { analytics, contactEmail, site, social } from "@/lib/site";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/workspaces", label: "Workspaces" },
      { href: "/work-island", label: "Work Island" },
      { href: "/pulse", label: "Pulse" },
      { href: "/themes", label: "Themes" },
      { href: "/download", label: "Download" },
    ],
  },
  {
    title: "Features",
    links: [
      { href: "/features/workspace-memory", label: "Workspace memory" },
      { href: "/features/clipboard", label: "Clipboard" },
      { href: "/features/notes", label: "Notes" },
      { href: "/features/downloads", label: "Downloads" },
      { href: "/features/claude-code", label: "Claude Code" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/privacy", label: "Privacy" },
      ...(contactEmail ? [{ href: `mailto:${contactEmail}`, label: "Contact" }] : []),
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">{site.tagline}</p>
          {social.length > 0 && (
            <ul className="mt-5 flex gap-4 text-sm">
              {social.map((s) => (
                <li key={s.name}>
                  <a href={s.url} rel="noopener me" className="text-muted hover:text-fg">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        {COLUMNS.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-dim">{c.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted transition hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-dim sm:flex-row sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} WorkOS. All rights reserved.</p>
          <p>{analytics.domain ? "This website uses no cookies. Page views are counted anonymously." : "This website uses no cookies and no tracking scripts."}</p>
        </div>
      </div>
    </footer>
  );
}
