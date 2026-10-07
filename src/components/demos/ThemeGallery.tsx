"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { Launcher, Panel, Pill, ThemeScope, type NavId } from "@/components/island/Island";
import { Icon } from "@/components/island/icons";
import { ClipboardPage, DownloadsPage, HomePage, MediaPage, NotesPage, SystemPage, WorkspacePage } from "@/components/island/pages";
import { NOW_PLAYING, WORKSPACES } from "@/lib/demo";
import { THEMES, THEME_CATEGORIES, type Theme } from "@/lib/themes";

const PAGES: { id: NavId; title: string; icon: (p: { className?: string }) => React.ReactNode }[] = [
  { id: "home", title: "Home", icon: Icon.Home },
  { id: "workspace", title: "Workspace", icon: Icon.Grid },
  { id: "downloads", title: "Downloads", icon: Icon.Download },
  { id: "notes", title: "Notes", icon: Icon.Note },
  { id: "media", title: "Media", icon: Icon.Music },
  { id: "clipboard", title: "Clipboard", icon: Icon.Clipboard },
  { id: "system", title: "System", icon: Icon.Windows },
];
const PAGE_IDS = PAGES.map((p) => p.id);

function PageBody({ id }: { id: NavId }) {
  const ws = WORKSPACES[0];
  switch (id) {
    case "workspace": return <WorkspacePage workspaces={WORKSPACES} activeId="winit" />;
    case "downloads": return <DownloadsPage />;
    case "notes": return <NotesPage />;
    case "media": return <MediaPage />;
    case "clipboard": return <ClipboardPage />;
    case "system": return <SystemPage />;
    default: return <HomePage ws={ws} />;
  }
}

/** Large, fully themed application preview. */
export function ThemeStage({ theme, interactive = true }: { theme: Theme; interactive?: boolean }) {
  const [page, setPage] = useState<NavId>("home");
  const meta = PAGES.find((p) => p.id === page) ?? PAGES[0];
  const ws = WORKSPACES[0];
  return (
    <ThemeScope theme={theme.tokens} wallpaper className="relative min-w-0 overflow-hidden rounded-[28px] border border-line-2 p-3 pt-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Pill workspace={ws.name} apps={ws.apps} download={72} media={{ title: NOW_PLAYING.title }} battery={86} compact />
      </div>
      <div className="mx-auto mt-4 max-w-[760px]">
        <Panel
          title={meta.title}
          icon={meta.icon}
          workspace={ws.name}
          apps={ws.apps}
          active={page}
          onNavigate={interactive ? (id) => PAGE_IDS.includes(id) && setPage(id) : undefined}
          pages={PAGE_IDS}
          navLabel={`${theme.name} preview pages`}
        >
          <div key={page} className="wi-enter h-full">
            <PageBody id={page} />
          </div>
        </Panel>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-5" aria-label="Launcher states">
        <Launcher state="normal" />
        <Launcher state="active" />
        <Launcher state="media" />
        <Launcher state="downloading" progress={72} />
        <Launcher state="downloaded" />
        <Launcher state="action" />
        <Launcher state="critical" />
      </div>
    </ThemeScope>
  );
}

function MiniPreview({ theme }: { theme: Theme }) {
  return (
    <ThemeScope theme={theme.tokens} wallpaper className="pointer-events-none relative h-28 overflow-hidden rounded-[14px]">
      <div className="absolute left-1/2 top-3 -translate-x-1/2 scale-[.72]">
        <Pill workspace="Winit" apps={WORKSPACES[0].apps.slice(0, 3)} />
      </div>
      <div
        className="absolute inset-x-5 bottom-0 top-14 rounded-t-[14px] border border-b-0"
        style={{ background: "var(--cap-panel)", borderColor: "var(--cap-line)" }}
      >
        <div className="grid grid-cols-3 gap-1.5 p-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-7 rounded-md" style={{ background: "var(--cap-raised)" }}>
              {i === 0 && <div className="m-1.5 h-1 w-6 rounded" style={{ background: "var(--cap-accent)" }} />}
            </div>
          ))}
        </div>
      </div>
    </ThemeScope>
  );
}

export function ThemeGallery({
  initial = "midnight",
  showFilters = false,
  linkToDetail = true,
}: {
  initial?: string;
  showFilters?: boolean;
  linkToDetail?: boolean;
}) {
  const [slug, setSlug] = useState(initial);
  const [cat, setCat] = useState<(typeof THEME_CATEGORIES)[number]>("All");
  const name = useId();
  const list = useMemo(() => (cat === "All" ? THEMES : THEMES.filter((t) => t.categories.includes(cat))), [cat]);
  const theme = THEMES.find((t) => t.slug === slug) ?? THEMES[0];

  return (
    <div>
      {showFilters && (
        <div role="group" aria-label="Filter themes" className="rail -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:justify-center sm:px-0">
          {THEME_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={c === cat}
              onClick={() => setCat(c)}
              className="h-9 flex-none rounded-full border border-line px-4 text-sm text-muted transition hover:text-fg aria-pressed:border-accent/50 aria-pressed:bg-accent/10 aria-pressed:text-fg"
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <fieldset className="min-w-0">
        <legend className="sr-only">Choose a theme to preview</legend>
        <div className="rail -mx-4 flex gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:grid-cols-4">
          {list.map((t) => (
            <label
              key={t.slug}
              className="group relative w-[62vw] max-w-[260px] flex-none cursor-pointer rounded-[18px] border border-line bg-surface/50 p-2 transition hover:border-line-2 has-[:checked]:border-[color:var(--sel)] has-[:checked]:shadow-[0_0_0_1px_var(--sel),0_12px_40px_-12px_var(--sel)] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent sm:w-auto sm:max-w-none"
              style={{ ["--sel" as string]: t.tokens.accent }}
            >
              <input
                type="radio"
                name={name}
                value={t.slug}
                checked={t.slug === slug}
                onChange={() => setSlug(t.slug)}
                className="sr-only"
              />
              <MiniPreview theme={t} />
              <span className="flex items-center justify-between px-1.5 pb-1 pt-3">
                <span className="text-[15px] font-semibold text-fg">{t.name}</span>
                <span className="size-2.5 rounded-full" style={{ background: t.tokens.accent }} aria-hidden="true" />
              </span>
              <span className="block px-1.5 pb-1 text-[13px] text-muted">{t.appDescription}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px] lg:items-start">
        <div className="min-w-0">
          <ThemeStage key={theme.slug} theme={theme} />
          <p className="mt-3 text-center text-xs text-dim">Use the round buttons at the bottom of the panel to browse pages in this theme.</p>
        </div>
        <aside className="card p-6 lg:sticky lg:top-24">
          <p className="sr-only" aria-live="polite">Previewing the {theme.name} theme</p>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: theme.tokens.accent }}>
            Selected theme
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-fg">{theme.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{theme.intro}</p>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-[13px]">
            {[
              ["Accent", theme.tokens.accent],
              ["Background", theme.tokens.background],
              ["Blur", `${theme.tokens.blur}px`],
              ["Opacity", `${Math.round(theme.tokens.opacity * 100)}%`],
              ["Corners", `${theme.tokens.radius}px`],
              ["Icons", theme.tokens.iconStyle],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-line px-3 py-2">
                <dt className="text-dim">{k}</dt>
                <dd className="mt-0.5 flex items-center gap-2 font-mono text-fg">
                  {k === "Accent" && <span className="size-2.5 rounded-full" style={{ background: v }} aria-hidden="true" />}
                  {v}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-col gap-2">
            <Link
              href="/download"
              className="inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold text-[#06160d] transition hover:brightness-110"
              style={{ background: theme.tokens.accent }}
            >
              Use {theme.name} in WorkOS
            </Link>
            {linkToDetail && (
              <Link href={`/themes/${theme.slug}`} className="inline-flex h-11 items-center justify-center rounded-full border border-line-2 text-sm text-fg hover:bg-white/[.03]">
                About the {theme.name} theme
              </Link>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
