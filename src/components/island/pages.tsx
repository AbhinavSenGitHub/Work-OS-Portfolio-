import { Icon } from "./icons";
import { AppTile, Equalizer, ProgressRing } from "./Island";
import { CLIPBOARD, DOWNLOADS, NOTES, NOW_PLAYING, type DemoWorkspace } from "@/lib/demo";

/* Page bodies for the expanded panel. They mirror the layouts of the pages
   in the WorkOS app (src/island/pages). */

function Ring({ value, label }: { value: number; label: string }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ display: "grid", justifyItems: "center", gap: 4 }}>
      <div style={{ position: "relative", width: 50, height: 50 }}>
        <svg className="wi-ring" width="50" height="50" viewBox="0 0 50 50" aria-hidden="true">
          <circle cx="25" cy="25" r={r} strokeWidth="5" stroke="rgba(255,255,255,.1)" fill="none" />
          <circle cx="25" cy="25" r={r} strokeWidth="5" stroke="#f4f4f6" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
        </svg>
        <span style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 11.5, fontWeight: 650 }}>{value}%</span>
      </div>
      <span className="wi-label">{label}</span>
    </div>
  );
}

export function HomePage({ ws, playing = true, download = 72 }: { ws: DemoWorkspace; playing?: boolean; download?: number }) {
  return (
    <div className="wi-grid-3">
      <div className="wi-card" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span className="wi-label">Workspace</span>
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 650 }}>
          <span className="wi-dot" /> {ws.name}
        </span>
        <span style={{ display: "flex", gap: 4, marginTop: "auto" }}>
          {ws.apps.slice(0, 5).map((a) => (
            <AppTile key={a.name} app={a} />
          ))}
        </span>
      </div>
      <div className="wi-card" style={{ display: "flex", flexDirection: "column" }}>
        <span className="wi-label">System</span>
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "auto" }}>
          <Ring value={23} label="CPU" />
          <Ring value={61} label="RAM" />
        </div>
      </div>
      <div className="wi-card" style={{ display: "flex", flexDirection: "column" }}>
        <span className="wi-label">Battery</span>
        <span className="wi-big" style={{ marginTop: "auto" }}>86%</span>
        <span className="wi-muted" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span className="wi-accent"><Icon.Bolt /></span> Charging
        </span>
      </div>
      <div className="wi-card" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span className="wi-label">Now playing</span>
        <span style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "auto" }}>
          <Equalizer paused={!playing} />
          <span className="wi-trunc" style={{ fontWeight: 600 }}>{NOW_PLAYING.title}</span>
        </span>
        <span className="wi-muted wi-trunc">{NOW_PLAYING.artist}</span>
      </div>
      <div className="wi-card" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span className="wi-label">Download</span>
        <span className="wi-trunc" style={{ marginTop: "auto", fontWeight: 600 }}>{DOWNLOADS[0].name}</span>
        <div className="wi-bar"><i style={{ width: `${download}%` }} /></div>
        <span className="wi-muted wi-mono" style={{ fontSize: 11 }}>{download}% · 412 KB</span>
      </div>
      <div className="wi-card" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span className="wi-label">Quick actions</span>
        <span style={{ display: "flex", gap: 6, marginTop: "auto", flexWrap: "wrap" }}>
          <span className="wi-btn"><Icon.Camera /> Screenshot</span>
          <span className="wi-btn"><Icon.Lock /> Lock</span>
        </span>
      </div>
    </div>
  );
}

export function WorkspacePage({ workspaces, activeId }: { workspaces: DemoWorkspace[]; activeId: string }) {
  const ws = workspaces.find((w) => w.id === activeId) ?? workspaces[0];
  return (
    <div className="wi-split">
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span className="wi-label" style={{ padding: "2px 4px 4px" }}>Workspaces</span>
        {workspaces.map((w) => (
          <div key={w.id} className={`wi-row${w.id === ws.id ? " active" : ""}`} style={{ padding: "6px 10px" }}>
            <span className="wi-dot" data-state={w.id === ws.id ? "running" : "stopped"} />
            <span className="wi-trunc" style={{ fontWeight: w.id === ws.id ? 650 : 500 }}>{w.name}</span>
            <span className="wi-dim" style={{ marginLeft: "auto", fontSize: 11 }}>{w.apps.length}</span>
          </div>
        ))}
      </div>
      <div className="wi-card wi-enter" key={ws.id} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 17, fontWeight: 650 }}>{ws.name}</span>
          <span className="wi-accent" style={{ fontSize: 11.5, fontWeight: 600 }}>● Running</span>
          <span style={{ flex: 1 }} />
          <span className="wi-btn wi-hide-xs"><Icon.Stop /> Stop Work</span>
        </div>
        <div className="wi-grid-2" style={{ gap: 6 }}>
          {ws.apps.map((a) => (
            <div key={a.name} className="wi-row" style={{ padding: "6px 8px" }}>
              <AppTile app={a} />
              <span style={{ display: "grid", minWidth: 0 }}>
                <span className="wi-trunc" style={{ fontWeight: 600 }}>{a.name}</span>
                {a.context && <span className="wi-trunc wi-dim wi-mono" style={{ fontSize: 10.5 }}>{a.context}</span>}
              </span>
            </div>
          ))}
        </div>
        <span className="wi-dim" style={{ marginTop: "auto", fontSize: 11.5 }}>
          Other workspaces stay running, hidden from the taskbar.
        </span>
      </div>
    </div>
  );
}

const kindIcon = {
  Code: Icon.Code,
  Link: Icon.Link,
  Image: Icon.Image,
  Text: Icon.Text,
  File: Icon.File,
  Folder: Icon.Folder,
} as const;

export function ClipboardPage({ highlight = 0 }: { highlight?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="wi-label">Recent · 6 items</span>
        <span style={{ flex: 1 }} />
        <span className="wi-btn wi-hide-xs"><Icon.Pause /> Pause</span>
        <span className="wi-btn"><Icon.Trash /> Clear all</span>
      </div>
      <div className="wi-grid-2" style={{ gap: 7 }}>
        {CLIPBOARD.map((c, i) => {
          const I = kindIcon[c.kind];
          return (
            <div key={c.text} className={`wi-row${i === highlight ? " active" : ""}`} style={{ alignItems: "flex-start", padding: "8px 10px" }}>
              {c.kind === "Image" ? (
                <span className="wi-thumb" style={{ width: 34, height: 26, flex: "none" }} />
              ) : (
                <span className="wi-muted" style={{ paddingTop: 1 }}><I /></span>
              )}
              <span style={{ display: "grid", minWidth: 0, gap: 2 }}>
                <span className={`wi-trunc ${c.kind === "Code" ? "wi-mono" : ""}`} style={{ fontSize: c.kind === "Code" ? 11 : 12 }}>{c.text}</span>
                <span className="wi-dim" style={{ fontSize: 10.5 }}>{c.kind} · {c.age}</span>
              </span>
            </div>
          );
        })}
      </div>
      <span className="wi-dim" style={{ marginTop: "auto", fontSize: 11.5 }}>Click any card to copy it again.</span>
    </div>
  );
}

export function NotesPage({ active = 0, draft }: { active?: number; draft?: string }) {
  const n = NOTES[active];
  return (
    <div className="wi-split">
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span className="wi-row" style={{ padding: "5px 9px", background: "rgba(255,255,255,.04)" }}>
          <span className="wi-dim"><Icon.Search /></span>
          <span className="wi-dim">Search notes</span>
        </span>
        {NOTES.map((x, i) => (
          <div key={x.title} className={`wi-row${i === active ? " active" : ""}`} style={{ display: "grid", gap: 1, padding: "7px 10px" }}>
            <span className="wi-trunc" style={{ fontWeight: 600 }}>{x.title}</span>
            <span className="wi-trunc wi-dim" style={{ fontSize: 11 }}>{x.body.split("\n")[0]}</span>
          </div>
        ))}
      </div>
      <div className="wi-card" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 16, fontWeight: 650 }}>{n.title}</span>
          <span style={{ flex: 1 }} />
          <span className="wi-dim" style={{ fontSize: 11 }}>Saved</span>
        </div>
        <div style={{ whiteSpace: "pre-line", lineHeight: 1.6 }} className="wi-muted">
          {draft ?? n.body}
          {draft !== undefined && <span className="wi-accent" style={{ animation: "wi-pulse 1s steps(1) infinite" }}>▍</span>}
        </div>
        <span className="wi-dim" style={{ marginTop: "auto", fontSize: 11 }}>Ctrl+N new · Ctrl+S save · autosaves as you type</span>
      </div>
    </div>
  );
}

export function DownloadsPage({ progress = 72 }: { progress?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
      <span className="wi-label">Downloads folder</span>
      <div className="wi-grid-3" style={{ gridAutoRows: "auto" }}>
        {DOWNLOADS.slice(0, 6).map((d, i) => (
          <div key={d.name} className="wi-card" style={{ padding: 8, display: "grid", gap: 6 }}>
            <div className="wi-thumb" style={{ height: 58, display: "grid", placeItems: "center", position: "relative" }}>
              <span className="wi-mono" style={{ fontSize: 11, fontWeight: 700 }}>{d.type}</span>
              {"isNew" in d && d.isNew && (
                <span style={{ position: "absolute", top: 5, left: 5, fontSize: 9.5, fontWeight: 700, padding: "1px 6px", borderRadius: 999, background: "var(--cap-accent)", color: "#06160d" }}>New</span>
              )}
            </div>
            <span className="wi-trunc" style={{ fontWeight: 600, fontSize: 11.5 }}>{d.name}</span>
            {i === 0 ? (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <ProgressRing value={progress} size={14} stroke={2} />
                <span className="wi-muted wi-mono" style={{ fontSize: 10.5 }}>{progress}%</span>
              </div>
            ) : (
              <span className="wi-dim" style={{ fontSize: 10.5 }}>{d.size} · {d.age}</span>
            )}
          </div>
        ))}
        <div className="wi-card" style={{ padding: 8, display: "grid", gap: 5, alignContent: "center" }}>
          <span className="wi-btn"><Icon.Open /> Open</span>
          <span className="wi-btn"><Icon.Folder /> Show in folder</span>
          <span className="wi-btn wi-hide-xs"><Icon.Link /> Copy path</span>
        </div>
      </div>
    </div>
  );
}

export function MediaPage({ playing = true }: { playing?: boolean }) {
  return (
    <div className="wi-card" style={{ height: "100%", display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "center", padding: 18 }}>
      <div className="wi-thumb wi-hide-xs" style={{ width: 120, height: 120, display: "grid", placeItems: "center", borderRadius: 16 }}>
        <span className="wi-accent" style={{ transform: "scale(2.2)" }}><Icon.Music /></span>
      </div>
      <div style={{ display: "grid", gap: 10, minWidth: 0 }}>
        <span className="wi-label">Now playing · {NOW_PLAYING.source}</span>
        <span style={{ fontSize: 20, fontWeight: 650 }} className="wi-trunc">{NOW_PLAYING.title}</span>
        <span className="wi-muted">{NOW_PLAYING.artist}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="wi-btn"><Icon.Prev /></span>
          <span className="wi-btn primary" style={{ width: 40 }}>{playing ? <Icon.Pause /> : <Icon.Play />}</span>
          <span className="wi-btn"><Icon.Next /></span>
          <span style={{ marginLeft: 8 }}><Equalizer paused={!playing} /></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="wi-muted"><Icon.Speaker /></span>
          <div className="wi-bar" style={{ flex: 1, maxWidth: 200 }}><i style={{ width: "64%" }} /></div>
          <span className="wi-dim" style={{ fontSize: 11 }}>64</span>
        </div>
      </div>
    </div>
  );
}

function Spark({ seed }: { seed: number }) {
  const pts = Array.from({ length: 24 }, (_, i) => 20 - (Math.sin(i * 0.7 + seed) * 6 + Math.sin(i * 1.9 + seed * 2) * 4 + 8));
  const d = pts.map((y, i) => `${i === 0 ? "M" : "L"}${i * 5},${y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox="0 0 115 22" width="100%" height="22" aria-hidden="true" preserveAspectRatio="none">
      <path d={d} fill="none" stroke="var(--cap-accent)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function SystemPage() {
  return (
    <div className="wi-grid-3" style={{ gridAutoRows: "auto" }}>
      {[
        { l: "CPU", v: "23%", s: 1 },
        { l: "Memory", v: "61%", s: 2 },
        { l: "GPU", v: "9%", s: 3 },
      ].map((m) => (
        <div key={m.l} className="wi-card" style={{ display: "grid", gap: 6 }}>
          <span className="wi-label">{m.l}</span>
          <span className="wi-big">{m.v}</span>
          <Spark seed={m.s} />
        </div>
      ))}
      <div className="wi-card" style={{ display: "grid", gap: 4 }}>
        <span className="wi-label">Network</span>
        <span className="wi-mono" style={{ fontSize: 13 }}>↓ 4.2 MB/s</span>
        <span className="wi-mono wi-muted" style={{ fontSize: 13 }}>↑ 310 KB/s</span>
      </div>
      <div className="wi-card" style={{ display: "grid", gap: 4 }}>
        <span className="wi-label">Windows Update</span>
        <span style={{ fontWeight: 600 }}>Up to date</span>
        <span className="wi-dim" style={{ fontSize: 11 }}>Checked 2h ago</span>
      </div>
      <div className="wi-card" style={{ display: "grid", gap: 6 }}>
        <span className="wi-label">Quick actions</span>
        <span style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span className="wi-btn"><Icon.Camera /> Screenshot</span>
          <span className="wi-btn"><Icon.Lock /> Lock</span>
        </span>
      </div>
    </div>
  );
}

/** Screenshot history — shown as a preview of an in-development page. */
export function ScreenshotsPage({ selected = 0 }: { selected?: number }) {
  const shots = ["14:22", "14:05", "13:41", "12:58", "11:30", "Yesterday"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="wi-label">Newest first</span>
        <span style={{ flex: 1 }} />
        <span className="wi-btn"><Icon.Note /> Add to note</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 10, flex: 1, minHeight: 0 }}>
        <div className="wi-thumb" style={{ position: "relative", overflow: "hidden", boxShadow: "inset 0 0 0 1px var(--cap-accent-line)" }}>
          <div style={{ position: "absolute", inset: 12, display: "grid", gridTemplateRows: "10px 1fr", gap: 8 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {[0, 1, 2].map((i) => <span key={i} style={{ width: 8, height: 8, borderRadius: 9, background: "rgba(255,255,255,.2)" }} />)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8 }}>
              <div style={{ borderRadius: 6, background: "rgba(255,255,255,.06)" }} />
              <div style={{ display: "grid", gap: 6, alignContent: "start" }}>
                {[80, 60, 90, 45, 70].map((w, i) => <span key={i} style={{ height: 6, width: `${w}%`, borderRadius: 4, background: i === 2 ? "var(--cap-accent-line)" : "rgba(255,255,255,.12)" }} />)}
              </div>
            </div>
          </div>
          <span style={{ position: "absolute", left: 10, bottom: 8, fontSize: 11 }} className="wi-muted">Latest · {shots[selected]}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, alignContent: "start" }}>
          {shots.slice(1).map((s, i) => (
            <div key={s} className="wi-thumb" style={{ height: 52, position: "relative", opacity: 1 - i * 0.12 }}>
              <span className="wi-dim" style={{ position: "absolute", left: 6, bottom: 4, fontSize: 10 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <span className="wi-dim" style={{ fontSize: 11 }}>Drag a screenshot straight into a chat, issue or email.</span>
    </div>
  );
}
