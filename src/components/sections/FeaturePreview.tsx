import { AppTile, Launcher, Panel, Pill, ThemeScope, type NavId } from "@/components/island/Island";
import { Icon } from "@/components/island/icons";
import { ClipboardPage, DownloadsPage, MediaPage, NotesPage, ScreenshotsPage, SystemPage, WorkspacePage } from "@/components/island/pages";
import { PulseList, SIGNALS } from "@/components/island/PulseList";
import { APPS, NOW_PLAYING, WORKSPACES, type DemoApp } from "@/lib/demo";
import type { PreviewKind } from "@/lib/features";
import { siteTheme } from "@/lib/themes";

const META: Record<PreviewKind, { title: string; nav?: NavId; icon: (p: { className?: string }) => React.ReactNode }> = {
  clipboard: { title: "Clipboard", nav: "clipboard", icon: Icon.Clipboard },
  notes: { title: "Notes", nav: "notes", icon: Icon.Note },
  screenshots: { title: "Screenshots", icon: Icon.Camera },
  downloads: { title: "Downloads", nav: "downloads", icon: Icon.Download },
  media: { title: "Media", nav: "media", icon: Icon.Music },
  system: { title: "System", nav: "system", icon: Icon.Windows },
  workspace: { title: "Workspace", nav: "workspace", icon: Icon.Grid },
  claude: { title: "Workspace", nav: "workspace", icon: Icon.Grid },
};

function Body({ kind }: { kind: PreviewKind }) {
  switch (kind) {
    case "clipboard": return <ClipboardPage />;
    case "notes": return <NotesPage />;
    case "screenshots": return <ScreenshotsPage />;
    case "downloads": return <DownloadsPage />;
    case "media": return <MediaPage />;
    case "system": return <SystemPage />;
    case "claude":
      return (
        <div className="wi-grid-2" style={{ height: "100%", alignContent: "start" }}>
          <div className="wi-card" style={{ display: "grid", gap: 6, alignContent: "start" }}>
            <span className="wi-label">Acme · running</span>
            {([APPS.terminal, APPS.claude, APPS.vscode] as DemoApp[]).map((a) => (
              <div key={a.name} className="wi-row" style={{ padding: "6px 8px" }}>
                <AppTile app={a} />
                <span style={{ display: "grid", minWidth: 0 }}>
                  <span className="wi-trunc" style={{ fontWeight: 600 }}>{a.name}</span>
                  {a.context && <span className="wi-trunc wi-dim wi-mono" style={{ fontSize: 10.5 }}>{a.context}</span>}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gap: 6, alignContent: "start" }}>
            <span className="wi-label" style={{ padding: "2px 4px" }}>Attention · planned</span>
            <PulseList signals={SIGNALS.filter((s) => s.planned)} />
          </div>
        </div>
      );
    default: return <WorkspacePage workspaces={WORKSPACES} activeId="winit" />;
  }
}

export function FeaturePreview({ kind }: { kind: PreviewKind }) {
  const m = META[kind];
  const ws = WORKSPACES[0];
  return (
    <ThemeScope theme={siteTheme.tokens} wallpaper className="overflow-hidden rounded-[26px] border border-line-2 p-3 sm:p-5">
      <div className="mb-3 flex items-center justify-center gap-4">
        <Pill
          workspace={ws.name}
          apps={ws.apps}
          download={kind === "downloads" ? 72 : undefined}
          media={kind === "media" ? { title: NOW_PLAYING.title } : undefined}
          battery={86}
          compact
        />
        {kind === "downloads" && <span className="hidden sm:inline-flex"><Launcher state="downloading" progress={72} /></span>}
      </div>
      <Panel title={m.title} icon={m.icon} workspace={ws.name} apps={ws.apps} active={m.nav}>
        <Body kind={kind} />
      </Panel>
    </ThemeScope>
  );
}
