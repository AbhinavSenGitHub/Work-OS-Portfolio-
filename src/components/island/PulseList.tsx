import { Icon } from "./icons";
import { AppTile, ProgressRing } from "./Island";
import { APPS } from "@/lib/demo";

type Tone = "warn" | "accent" | "muted";

const toneColor: Record<Tone, string> = {
  warn: "#f2c14e",
  accent: "var(--cap-accent)",
  muted: "var(--cap-dim)",
};

export interface Signal {
  id: string;
  title: string;
  detail: string;
  tone: Tone;
  icon: React.ReactNode;
  planned?: boolean;
}

export const SIGNALS: Signal[] = [
  { id: "update", title: "Windows Update", detail: "Restart required", tone: "warn", icon: <Icon.Restart /> },
  { id: "suggest", title: "Postman detected", detail: "Add to Acme?", tone: "accent", icon: <AppTile app={APPS.postman} /> },
  { id: "download", title: "Download", detail: "dataset-sample.zip · Complete", tone: "accent", icon: <Icon.Check /> },
  { id: "progress", title: "Download", detail: "winit-release-notes.pdf · 72%", tone: "muted", icon: <ProgressRing value={72} size={16} stroke={2} /> },
  { id: "claude", title: "Claude Code", detail: "Waiting for permission", tone: "muted", icon: <AppTile app={APPS.claude} />, planned: true },
  { id: "build", title: "Build", detail: "Failed", tone: "muted", icon: <Icon.Info />, planned: true },
];

/** The attention list rendered inside a themed scope. */
export function PulseList({ signals = SIGNALS, showPlanned = true }: { signals?: Signal[]; showPlanned?: boolean }) {
  const list = showPlanned ? signals : signals.filter((s) => !s.planned);
  return (
    <ul style={{ display: "grid", gap: 6, listStyle: "none", margin: 0, padding: 0 }}>
      {list.map((s) => (
        <li key={s.id} className="wi-row" style={{ padding: "8px 10px", opacity: s.planned ? 0.55 : 1 }}>
          <span style={{ color: toneColor[s.tone], display: "grid", placeItems: "center", width: 20 }}>{s.icon}</span>
          <span style={{ display: "grid", minWidth: 0 }}>
            <span className="wi-trunc" style={{ fontWeight: 600 }}>{s.title}</span>
            <span className="wi-trunc wi-muted" style={{ fontSize: 11.5 }}>{s.detail}</span>
          </span>
          <span style={{ flex: 1 }} />
          {s.planned ? (
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", padding: "2px 7px", borderRadius: 999, border: "1px solid rgba(242,193,78,.4)", color: "#f2d48e" }}>
              Planned
            </span>
          ) : s.id === "suggest" ? (
            <span className="wi-btn primary" style={{ height: 24, padding: "0 9px" }}><Icon.Plus /> Add</span>
          ) : s.id === "update" ? (
            <span className="wi-btn" style={{ height: 24, padding: "0 9px" }}>Open</span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
