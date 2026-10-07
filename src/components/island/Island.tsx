import type { CSSProperties, ReactNode } from "react";
import { Icon } from "./icons";
import { themeVars, type ThemeTokens } from "@/lib/themes";
import type { DemoApp } from "@/lib/demo";

/** Applies a theme's tokens to everything inside it. */
export function ThemeScope({
  theme,
  className = "",
  style,
  children,
  wallpaper = false,
}: {
  theme: ThemeTokens;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  wallpaper?: boolean;
}) {
  return (
    <div className={`wi ${wallpaper ? "wi-wall" : ""} ${className}`} style={{ ...themeVars(theme), ...style }}>
      {children}
    </div>
  );
}

export function AppTile({ app, large = false }: { app: DemoApp; large?: boolean }) {
  return (
    <span className={`wi-app${large ? " lg" : ""}`} style={{ background: app.color }} aria-hidden="true">
      {app.short}
    </span>
  );
}

export function Equalizer({ paused = false }: { paused?: boolean }) {
  return (
    <span className={`wi-eq${paused ? " paused" : ""}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export function ProgressRing({ value, size = 18, stroke = 2.4 }: { value: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg className="wi-ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} stroke="rgba(255,255,255,.14)" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        strokeWidth={stroke}
        stroke="var(--cap-accent)"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - value / 100)}
        style={{ transition: "stroke-dashoffset 400ms ease" }}
      />
    </svg>
  );
}

export type WsState = "running" | "starting" | "stopped";

export interface PillProps {
  workspace: string;
  state?: WsState;
  apps?: DemoApp[];
  download?: number | "done";
  media?: { title: string; paused?: boolean };
  battery?: number;
  switchedFrom?: string;
  cpu?: string;
  compact?: boolean;
}

/** The collapsed Work Island. */
export function Pill({ workspace, state = "running", apps = [], download, media, battery, switchedFrom, cpu, compact }: PillProps) {
  return (
    <div className="wi-pill" role="img" aria-label={`Work Island showing workspace ${workspace}`}>
      <span className="wi-seg">
        <span className="wi-dot" data-state={state} />
        <span style={{ fontWeight: 600 }}>
          {switchedFrom ? (
            <>
              <span className="wi-dim">{switchedFrom} → </span>
              {workspace}
            </>
          ) : (
            workspace
          )}
        </span>
      </span>
      {apps.length > 0 && (
        <span className={`wi-seg ${compact ? "wi-hide-sm" : ""}`} style={{ gap: 4 }}>
          {apps.slice(0, 5).map((a) => (
            <AppTile key={a.name} app={a} />
          ))}
        </span>
      )}
      {download !== undefined && (
        <span className="wi-seg">
          {download === "done" ? (
            <>
              <span className="wi-accent">
                <Icon.Check />
              </span>
              <span className="wi-muted">Saved</span>
            </>
          ) : (
            <>
              <ProgressRing value={download} />
              <span className="wi-mono" style={{ fontSize: 11.5 }}>
                {download}%
              </span>
            </>
          )}
        </span>
      )}
      {media && (
        <span className={`wi-seg ${compact ? "wi-hide-xs" : ""}`}>
          <Equalizer paused={media.paused} />
          <span className="wi-trunc wi-muted" style={{ maxWidth: 120 }}>
            {media.title}
          </span>
        </span>
      )}
      {cpu && (
        <span className="wi-seg is-muted wi-hide-sm">
          <span className="wi-mono" style={{ fontSize: 11.5 }}>{cpu}</span>
        </span>
      )}
      {battery !== undefined && (
        <span className="wi-seg is-muted wi-hide-xs">
          <Icon.Battery />
          <span style={{ fontSize: 11.5 }}>{battery}%</span>
        </span>
      )}
      <span className="wi-seg is-muted" style={{ padding: "0 7px" }}>
        <Icon.Chevron />
      </span>
    </div>
  );
}

export type LauncherState = "normal" | "active" | "media" | "downloading" | "downloaded" | "action" | "critical";

/** The small "W" the island collapses to when an app is maximized. */
export function Launcher({ state = "normal", progress = 42, count, large }: { state?: LauncherState; progress?: number; count?: number; large?: boolean }) {
  const label: Record<LauncherState, string> = {
    normal: "WorkOS launcher",
    active: "WorkOS launcher, workspace active",
    media: "WorkOS launcher, media playing",
    downloading: `WorkOS launcher, download ${progress}%`,
    downloaded: "WorkOS launcher, download complete",
    action: "WorkOS launcher, an app can be added to this workspace",
    critical: "WorkOS launcher, something needs attention",
  };
  let inner: ReactNode = "W";
  if (state === "media") inner = <Equalizer />;
  if (state === "downloading")
    inner = (
      <span style={{ position: "relative", display: "grid", placeItems: "center" }}>
        <ProgressRing value={progress} size={22} stroke={2.4} />
        <span style={{ position: "absolute", fontSize: 7.5, fontWeight: 700 }}>{progress}</span>
      </span>
    );
  if (state === "downloaded")
    inner = (
      <span className="wi-accent">
        <Icon.Check />
      </span>
    );
  return (
    <span className={`wi-launcher${large ? " xl" : ""}`} role="img" aria-label={label[state]}>
      {inner}
      {state === "active" && <span className="wl-under" />}
      {state === "action" && <span className="wl-dot" />}
      {state === "critical" && <span className="wl-dot ping-soft" data-tone="warn" />}
      {count !== undefined && (
        <span
          style={{
            position: "absolute",
            top: -7,
            right: -9,
            minWidth: 15,
            height: 15,
            padding: "0 4px",
            borderRadius: 999,
            background: "#f2c14e",
            color: "#1a1204",
            fontSize: 9.5,
            fontWeight: 800,
            display: "grid",
            placeItems: "center",
            boxShadow: "0 0 0 2px var(--cap-base)",
          }}
        >
          {count}
        </span>
      )}
    </span>
  );
}

export const NAV = [
  { id: "home", label: "Home", icon: Icon.Home },
  { id: "workspace", label: "Workspace", icon: Icon.Grid },
  { id: "downloads", label: "Downloads", icon: Icon.Download },
  { id: "notes", label: "Notes", icon: Icon.Note },
  { id: "media", label: "Media", icon: Icon.Music },
  { id: "clipboard", label: "Clipboard", icon: Icon.Clipboard },
  { id: "system", label: "System", icon: Icon.Windows },
  { id: "weather", label: "Weather", icon: Icon.Cloud },
  { id: "themes", label: "Themes", icon: Icon.Palette },
  { id: "settings", label: "Settings", icon: Icon.Gear },
] as const;

export type NavId = (typeof NAV)[number]["id"];

/** The expanded notch: header, page area and bottom navigation. */
export function Panel({
  title,
  icon: TitleIcon = Icon.Home,
  workspace,
  apps = [],
  battery = 86,
  active,
  onNavigate,
  pages,
  navLabel = "WorkOS panel pages",
  toast,
  children,
  className = "",
}: {
  title: string;
  icon?: (p: { className?: string }) => ReactNode;
  workspace?: string;
  apps?: DemoApp[];
  battery?: number;
  active?: NavId;
  onNavigate?: (id: NavId) => void;
  /** Pages the preview can show; other nav icons render as inert. */
  pages?: readonly NavId[];
  navLabel?: string;
  toast?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`wi-panel ${className}`}>
      <div className="wi-head">
        <span className="wi-title">
          <TitleIcon />
          {title}
        </span>
        {workspace && (
          <span className="wi-row wi-hide-xs" style={{ padding: "4px 9px", gap: 6, background: "var(--cap-raised)" }}>
            <span className="wi-dot" />
            <span style={{ fontWeight: 600, fontSize: 12 }}>{workspace}</span>
            <span className="wi-hide-sm" style={{ display: "inline-flex", gap: 3, marginLeft: 2 }}>
              {apps.slice(0, 4).map((a) => (
                <AppTile key={a.name} app={a} />
              ))}
            </span>
          </span>
        )}
        <span style={{ flex: 1 }} />
        {toast}
        <span className="wi-muted wi-hide-xs" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12 }}>
          <Icon.Battery />
          {battery}%
        </span>
        <span className="wi-muted" style={{ display: "grid", placeItems: "center", width: 28, height: 28 }} aria-hidden="true">
          <Icon.Close />
        </span>
      </div>
      <div className="wi-page">{children}</div>
      <div className="wi-foot">
        {onNavigate ? (
          <div className="wi-nav" role="toolbar" aria-label={navLabel}>
            {NAV.map(({ id, label, icon: I }) =>
              !pages || pages.includes(id) ? (
                <button key={id} type="button" aria-label={label} title={label} aria-pressed={active === id} onClick={() => onNavigate(id)}>
                  <I />
                </button>
              ) : (
                <span key={id} aria-hidden="true" style={{ opacity: 0.45 }}>
                  <I />
                </span>
              ),
            )}
          </div>
        ) : (
          <div className="wi-nav" aria-hidden="true">
            {NAV.map(({ id, icon: I }) => (
              <span key={id} aria-current={active === id ? "page" : undefined}>
                <I />
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
