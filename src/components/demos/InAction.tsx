"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { Launcher, Panel, Pill, ThemeScope, type NavId } from "@/components/island/Island";
import { Icon } from "@/components/island/icons";
import { ClipboardPage, DownloadsPage, MediaPage, NotesPage, ScreenshotsPage, WorkspacePage } from "@/components/island/pages";
import { PulseList } from "@/components/island/PulseList";
import { NOW_PLAYING, WORKSPACES } from "@/lib/demo";
import { siteTheme } from "@/lib/themes";
import { featureStatusLabel, type FeatureStatus } from "@/lib/features";

interface Tab {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  href: string;
  status: FeatureStatus;
  nav?: NavId;
  icon: (p: { className?: string }) => React.ReactNode;
}

const TABS: Tab[] = [
  {
    id: "workspace", label: "Workspace", eyebrow: "Workspace", icon: Icon.Grid, nav: "workspace",
    title: "Everything for this project.",
    body: "A workspace owns its apps and windows. Switch and the others step aside, still running, out of the taskbar and Alt+Tab.",
    points: ["Start Work launches the apps and restores their context", "Switch with Ctrl+Alt+1…9", "Windows outside any workspace are never touched"],
    href: "/workspaces", status: "available",
  },
  {
    id: "notes", label: "Notes", eyebrow: "Notes", icon: Icon.Note, nav: "notes",
    title: "Write it down without finding a window.",
    body: "Quick notes live inside the island. They autosave as you type and can belong to a workspace.",
    points: ["Autosave, Ctrl+N and Ctrl+S", "Search across notes", "Images inside notes are in development"],
    href: "/features/notes", status: "available",
  },
  {
    id: "clipboard", label: "Clipboard", eyebrow: "Clipboard", icon: Icon.Clipboard, nav: "clipboard",
    title: "Everything you copied, ready when you need it.",
    body: "Text, code, links, files, folders and images are kept locally. Click any card to copy it again.",
    points: ["Open with Win+Shift+V", "Pause, remove or clear anytime", "Stored on your computer only"],
    href: "/features/clipboard", status: "available",
  },
  {
    id: "screenshots", label: "Screenshots", eyebrow: "Screenshots · In development", icon: Icon.Camera,
    title: "Your latest screenshots, always within reach.",
    body: "A newest-first screenshot history you can drag into an issue or attach to a note is being built. Today the island includes a quick action for the Windows screenshot tool.",
    points: ["Newest first with previews", "Drag out into any app", "Add to a note"],
    href: "/features/screenshots", status: "in-development",
  },
  {
    id: "downloads", label: "Downloads", eyebrow: "Downloads", icon: Icon.Download, nav: "downloads",
    title: "What just landed, one glance away.",
    body: "WorkOS watches your Downloads folder and shows previews, while live progress sits quietly in the island.",
    points: ["Thumbnails and PDF previews", "Open, show in folder, copy path", "Progress and completion in the pill"],
    href: "/features/downloads", status: "available",
  },
  {
    id: "media", label: "Media", eyebrow: "Media", icon: Icon.Music, nav: "media",
    title: "Music control without leaving your editor.",
    body: "Now playing, play/pause and skip, plus system volume, through Windows' own media controls.",
    points: ["Works with apps that report to Windows media controls", "Equalizer in the island while playing", "Volume and mute"],
    href: "/features/media", status: "available",
  },
  {
    id: "pulse", label: "Pulse", eyebrow: "Pulse", icon: Icon.Sparkle,
    title: "Know when something needs you.",
    body: "The island stays quiet until something matters: a restart, a finished download, an app that belongs in this workspace.",
    points: ["Windows Update, battery and downloads today", "Workspace suggestions with one-click add", "Claude Code and build signals are planned"],
    href: "/pulse", status: "available",
  },
];

function Preview({ tab }: { tab: Tab }) {
  const ws = WORKSPACES[0];
  switch (tab.id) {
    case "workspace":
      return <WorkspacePage workspaces={WORKSPACES} activeId="winit" />;
    case "notes":
      return <NotesPage />;
    case "clipboard":
      return <ClipboardPage />;
    case "screenshots":
      return <ScreenshotsPage />;
    case "downloads":
      return <DownloadsPage />;
    case "media":
      return <MediaPage />;
    default:
      return (
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, height: "100%" }}>
          <div className="wi-hide-xs" style={{ display: "grid", placeItems: "center", width: 110 }}>
            <Launcher state="critical" count={3} large />
          </div>
          <div style={{ overflow: "hidden" }}>
            <PulseList />
            <span className="wi-dim" style={{ display: "block", marginTop: 8, fontSize: 11 }}>Illustration of signals for {ws.name}</span>
          </div>
        </div>
      );
  }
}

export function InAction() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = TABS[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = TABS.length - 1;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      refs.current[next]?.focus();
    }
  };

  return (
    <div>
      <div role="tablist" aria-label="WorkOS features" className="rail -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={i === active}
            aria-controls={`panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKey}
            className="flex h-10 flex-none items-center gap-2 rounded-full border border-line px-4 text-sm text-muted transition hover:text-fg aria-selected:border-accent/50 aria-selected:bg-accent/10 aria-selected:text-fg"
          >
            <t.icon />
            {t.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${tab.id}`}
        aria-labelledby={`tab-${tab.id}`}
        className="mt-8 grid items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12"
      >
        <ThemeScope theme={siteTheme.tokens} wallpaper className="overflow-hidden rounded-[26px] border border-line-2 p-3 sm:p-5">
          <div className="mb-3 flex justify-center">
            <Pill workspace={WORKSPACES[0].name} apps={WORKSPACES[0].apps} media={{ title: NOW_PLAYING.title }} battery={86} compact />
          </div>
          <div key={tab.id} className="wi-enter">
            <Panel title={tab.label} icon={tab.icon} workspace={WORKSPACES[0].name} apps={WORKSPACES[0].apps} active={tab.nav}>
              <Preview tab={tab} />
            </Panel>
          </div>
        </ThemeScope>

        <div key={tab.id} className="wi-enter">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">{tab.eyebrow}</p>
          <h3 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{tab.title}</h3>
          <p className="mt-4 text-pretty leading-relaxed text-muted">{tab.body}</p>
          <ul className="mt-6 space-y-3">
            {tab.points.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] text-fg/90">
                <span className="mt-0.5 text-accent" aria-hidden="true">
                  <Icon.Check />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={tab.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-fg underline decoration-accent/50 underline-offset-4 hover:decoration-accent">
              Learn more about {tab.label.toLowerCase()} <span aria-hidden="true">→</span>
            </Link>
            {tab.status !== "available" && (
              <span className="pill-tag" data-tone="soon">
                {featureStatusLabel[tab.status]}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
