"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AppTile, Equalizer, Panel, Pill, ProgressRing, ThemeScope, NAV, type NavId } from "@/components/island/Island";
import { Icon } from "@/components/island/icons";
import { CLIPBOARD, DOWNLOADS, NOTES, WORKSPACES } from "@/lib/demo";
import { siteTheme, THEMES } from "@/lib/themes";
import { useReducedMotion } from "./useCycle";

/*
 * A fully clickable WorkOS panel running on sample data. Nothing here touches
 * the visitor's computer except "copy", which puts the sample text on their
 * clipboard.
 */

const TRACKS = [
  { title: "Deep Focus Mix", artist: "Lo-fi Radio", source: "Spotify" },
  { title: "Night Drive", artist: "Synthwave FM", source: "Spotify" },
  { title: "Rain on Glass", artist: "Ambient Works", source: "Chrome" },
];

const WEATHER = {
  city: "Bengaluru",
  temp: 27,
  desc: "Partly cloudy",
  days: [
    { d: "Thu", hi: 28, lo: 20, icon: Icon.Cloud },
    { d: "Fri", hi: 29, lo: 21, icon: Icon.Sun },
    { d: "Sat", hi: 26, lo: 20, icon: Icon.Rain },
    { d: "Sun", hi: 25, lo: 19, icon: Icon.Thunder },
    { d: "Mon", hi: 27, lo: 20, icon: Icon.Cloud },
  ],
};

const kindIcon = { Code: Icon.Code, Link: Icon.Link, Image: Icon.Image, Text: Icon.Text, File: Icon.File, Folder: Icon.Folder } as const;

type Note = { id: number; title: string; body: string; age: string };
type Clip = (typeof CLIPBOARD)[number] & { id: number };

const TITLES: Record<NavId, string> = Object.fromEntries(NAV.map((n) => [n.id, n.label])) as Record<NavId, string>;
const ICONS = Object.fromEntries(NAV.map((n) => [n.id, n.icon])) as Record<NavId, (p: { className?: string }) => ReactNode>;

export function LiveIsland({
  initialPage = "home",
  className = "",
  onExit,
}: {
  initialPage?: NavId;
  className?: string;
  /** Renders a "Back to tour" control when provided. */
  onExit?: () => void;
}) {
  const reduced = useReducedMotion();
  const [page, setPage] = useState<NavId>(initialPage);
  const [themeSlug, setThemeSlug] = useState(siteTheme.slug);
  const [wsId, setWsId] = useState("winit");
  const [prevWs, setPrevWs] = useState<string>();
  const [stopped, setStopped] = useState<string[]>([]);
  const [playing, setPlaying] = useState(true);
  const [track, setTrack] = useState(0);
  const [volume, setVolume] = useState(64);
  const [muted, setMuted] = useState(false);
  const [notes, setNotes] = useState<Note[]>(() => NOTES.map((n, i) => ({ id: i + 1, ...n })));
  const [noteId, setNoteId] = useState(1);
  const [noteQuery, setNoteQuery] = useState("");
  const [clips, setClips] = useState<Clip[]>(() => CLIPBOARD.map((c, i) => ({ id: i + 1, ...c })));
  const [clipPaused, setClipPaused] = useState(false);
  const [copied, setCopied] = useState<number>();
  const [downloads, setDownloads] = useState(() => DOWNLOADS.map((d, i) => ({ id: i + 1, ...d })));
  const [progress, setProgress] = useState(42);
  const [selectedDl, setSelectedDl] = useState(2);
  const [settings, setSettings] = useState({ startup: true, clipboard: true, learning: true, weather: true, suggestions: true });
  const [toast, setToast] = useState<{ id: number; msg: string }>();
  const toastTimer = useRef<number>(undefined);
  const toastSeq = useRef(0);

  const theme = THEMES.find((t) => t.slug === themeSlug) ?? siteTheme;
  const ws = WORKSPACES.find((w) => w.id === wsId) ?? WORKSPACES[0];
  const wsRunning = !stopped.includes(ws.id);
  const t = TRACKS[track];

  const say = (msg: string) => {
    window.clearTimeout(toastTimer.current);
    toastSeq.current += 1;
    setToast({ id: toastSeq.current, msg });
    toastTimer.current = window.setTimeout(() => setToast(undefined), 2200);
  };
  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  // The sample download finishes on its own, then a new one starts.
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setProgress((p) => (p >= 100 ? 100 : Math.min(100, p + 3))), 700);
    return () => window.clearInterval(id);
  }, [reduced]);
  useEffect(() => {
    if (progress < 100) return;
    const id = window.setTimeout(() => setProgress(8), 4000);
    return () => window.clearTimeout(id);
  }, [progress]);

  const switchTo = (id: string) => {
    if (id === wsId) return;
    setPrevWs(ws.name);
    setWsId(id);
    const next = WORKSPACES.find((w) => w.id === id);
    say(`Switched to ${next?.name}. Other apps hidden, still running.`);
  };

  const copy = (c: Clip) => {
    navigator.clipboard?.writeText(c.text).catch(() => {});
    setCopied(c.id);
    say(`Copied ${c.kind.toLowerCase()} to clipboard`);
    window.setTimeout(() => setCopied((v) => (v === c.id ? undefined : v)), 1600);
  };

  const note = notes.find((n) => n.id === noteId) ?? notes[0];
  const shownNotes = useMemo(() => {
    const q = noteQuery.trim().toLowerCase();
    return q ? notes.filter((n) => (n.title + n.body).toLowerCase().includes(q)) : notes;
  }, [notes, noteQuery]);
  const editNote = (patch: Partial<Note>) => setNotes((list) => list.map((n) => (n.id === note?.id ? { ...n, ...patch, age: "now" } : n)));
  const newNote = () => {
    const id = Math.max(0, ...notes.map((n) => n.id)) + 1;
    setNotes((list) => [{ id, title: "Untitled", body: "", age: "now" }, ...list]);
    setNoteId(id);
    setNoteQuery("");
  };

  const pillDownload = progress < 100 ? progress : ("done" as const);

  /* ───────── pages ───────── */

  const pages: Record<NavId, ReactNode> = {
    home: (
      <div className="wi-grid-3">
        <button type="button" className="wi-card" onClick={() => setPage("workspace")} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="wi-label">Workspace</span>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 650 }}>
            <span className="wi-dot" data-state={wsRunning ? "running" : "stopped"} /> {ws.name}
          </span>
          <span style={{ display: "flex", gap: 4, marginTop: "auto" }}>
            {ws.apps.slice(0, 5).map((a) => <AppTile key={a.name} app={a} />)}
          </span>
        </button>
        <button type="button" className="wi-card" onClick={() => setPage("system")} style={{ display: "flex", flexDirection: "column" }}>
          <span className="wi-label">System</span>
          <span className="wi-big" style={{ marginTop: "auto" }}>23%</span>
          <span className="wi-muted">CPU · RAM 61%</span>
        </button>
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
            <span className="wi-trunc" style={{ fontWeight: 600 }}>{t.title}</span>
          </span>
          <span style={{ display: "flex", gap: 6 }}>
            <button type="button" className="wi-btn" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying((p) => !p)}>
              {playing ? <Icon.Pause /> : <Icon.Play />}
            </button>
            <button type="button" className="wi-btn" aria-label="Next track" onClick={() => setTrack((i) => (i + 1) % TRACKS.length)}>
              <Icon.Next />
            </button>
          </span>
        </div>
        <button type="button" className="wi-card" onClick={() => setPage("downloads")} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span className="wi-label">Download</span>
          <span className="wi-trunc" style={{ marginTop: "auto", fontWeight: 600 }}>{downloads[0]?.name}</span>
          <div className="wi-bar" style={{ width: "100%" }}><i style={{ width: `${progress}%` }} /></div>
          <span className="wi-muted wi-mono" style={{ fontSize: 11 }}>{progress < 100 ? `${progress}%` : "Complete"}</span>
        </button>
        <div className="wi-card" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="wi-label">Quick actions</span>
          <span style={{ display: "flex", gap: 6, marginTop: "auto", flexWrap: "wrap" }}>
            <button type="button" className="wi-btn" onClick={() => say("Would open the Windows screenshot tool")}><Icon.Camera /> Screenshot</button>
            <button type="button" className="wi-btn" onClick={() => say("Would lock the PC")}><Icon.Lock /> Lock</button>
          </span>
        </div>
      </div>
    ),

    workspace: (
      <div className="wi-split">
        <div className="wi-scroll" style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span className="wi-label" style={{ padding: "2px 4px 4px" }}>Workspaces · click to switch</span>
          {WORKSPACES.map((w) => (
            <button key={w.id} type="button" onClick={() => switchTo(w.id)} className={`wi-row${w.id === ws.id ? " active" : ""}`} style={{ padding: "6px 10px" }} aria-pressed={w.id === ws.id}>
              <span className="wi-dot" data-state={w.id === ws.id && !stopped.includes(w.id) ? "running" : "stopped"} />
              <span className="wi-trunc" style={{ fontWeight: w.id === ws.id ? 650 : 500 }}>{w.name}</span>
              <span className="wi-dim" style={{ marginLeft: "auto", fontSize: 11 }}>{w.apps.length}</span>
            </button>
          ))}
        </div>
        <div className="wi-card wi-enter" key={ws.id} style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 17, fontWeight: 650 }}>{ws.name}</span>
            <span className={wsRunning ? "wi-accent" : "wi-dim"} style={{ fontSize: 11.5, fontWeight: 600 }}>● {wsRunning ? "Running" : "Stopped"}</span>
            <span style={{ flex: 1 }} />
            <button
              type="button"
              className={`wi-btn${wsRunning ? "" : " primary"}`}
              onClick={() => {
                setStopped((s) => (wsRunning ? [...s, ws.id] : s.filter((x) => x !== ws.id)));
                say(wsRunning ? `Stopped ${ws.name}. Apps asked to close.` : `Started ${ws.name}. Apps launched with their context.`);
              }}
            >
              {wsRunning ? <><Icon.Stop /> Stop Work</> : <><Icon.Play /> Start Work</>}
            </button>
          </div>
          <div className="wi-grid-2 wi-scroll" style={{ gap: 6 }}>
            {ws.apps.map((a) => (
              <div key={a.name} className="wi-row" style={{ padding: "6px 8px", opacity: wsRunning ? 1 : 0.5 }}>
                <AppTile app={a} />
                <span style={{ display: "grid", minWidth: 0 }}>
                  <span className="wi-trunc" style={{ fontWeight: 600 }}>{a.name}</span>
                  {"context" in a && a.context && <span className="wi-trunc wi-dim wi-mono" style={{ fontSize: 10.5 }}>{a.context}</span>}
                </span>
              </div>
            ))}
          </div>
          <span className="wi-dim" style={{ marginTop: "auto", fontSize: 11.5 }}>Other workspaces stay running, hidden from the taskbar.</span>
        </div>
      </div>
    ),

    downloads: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="wi-label">Downloads folder · click a file</span>
          <span style={{ flex: 1 }} />
          {downloads.length < DOWNLOADS.length && (
            <button type="button" className="wi-btn" onClick={() => setDownloads(DOWNLOADS.map((d, i) => ({ id: i + 1, ...d })))}>Restore list</button>
          )}
        </div>
        <div className="wi-grid-3 wi-scroll" style={{ gridAutoRows: "auto" }}>
          {downloads.map((d) => {
            const active = d.id === 1 && progress < 100;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDl(d.id)}
                className="wi-card"
                style={{ padding: 8, display: "grid", gap: 6, boxShadow: d.id === selectedDl ? "inset 0 0 0 1px var(--cap-accent-line)" : undefined }}
              >
                <div className="wi-thumb" style={{ height: 50, display: "grid", placeItems: "center" }}>
                  <span className="wi-mono" style={{ fontSize: 11, fontWeight: 700 }}>{d.type}</span>
                </div>
                <span className="wi-trunc" style={{ fontWeight: 600, fontSize: 11.5 }}>{d.name}</span>
                {active ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <ProgressRing value={progress} size={14} stroke={2} />
                    <span className="wi-muted wi-mono" style={{ fontSize: 10.5 }}>{progress}%</span>
                  </span>
                ) : (
                  <span className="wi-dim" style={{ fontSize: 10.5 }}>{d.size} · {d.id === 1 ? "just now" : d.age}</span>
                )}
              </button>
            );
          })}
        </div>
        {downloads.some((d) => d.id === selectedDl) && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "auto" }}>
            <button type="button" className="wi-btn primary" onClick={() => say("Would open the file")}><Icon.Open /> Open</button>
            <button type="button" className="wi-btn" onClick={() => say("Would show it in File Explorer")}><Icon.Folder /> Show in folder</button>
            <button type="button" className="wi-btn" onClick={() => say("Path copied (sample)")}><Icon.Link /> Copy path</button>
            <button
              type="button"
              className="wi-btn"
              onClick={() => {
                setDownloads((l) => l.filter((d) => d.id !== selectedDl));
                say("Removed from recent. The file stays in Downloads.");
              }}
            >
              <Icon.Trash /> Remove from recent
            </button>
          </div>
        )}
      </div>
    ),

    notes: (
      <div className="wi-split">
        <div style={{ display: "flex", flexDirection: "column", gap: 6, minHeight: 0 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <label className="wi-field" style={{ flex: 1 }}>
              <span className="wi-dim"><Icon.Search /></span>
              <input className="wi-input" placeholder="Search notes" value={noteQuery} onChange={(e) => setNoteQuery(e.target.value)} aria-label="Search notes" />
            </label>
            <button type="button" className="wi-btn" aria-label="New note" onClick={newNote}><Icon.Plus /></button>
          </div>
          <div className="wi-scroll" style={{ display: "grid", gap: 6, alignContent: "start" }}>
            {shownNotes.map((x) => (
              <button key={x.id} type="button" onClick={() => setNoteId(x.id)} className={`wi-row${x.id === note?.id ? " active" : ""}`} style={{ display: "grid", gap: 1, padding: "7px 10px" }}>
                <span className="wi-trunc" style={{ fontWeight: 600 }}>{x.title || "Untitled"}</span>
                <span className="wi-trunc wi-dim" style={{ fontSize: 11 }}>{x.body.split("\n")[0] || "Empty note"}</span>
              </button>
            ))}
            {shownNotes.length === 0 && <span className="wi-dim" style={{ padding: 8 }}>No notes match.</span>}
          </div>
        </div>
        {note ? (
          <div className="wi-card" style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input className="wi-input" value={note.title} onChange={(e) => editNote({ title: e.target.value })} aria-label="Note title" style={{ fontSize: 16, fontWeight: 650 }} />
              <span className="wi-dim" style={{ fontSize: 11, whiteSpace: "nowrap" }}>Saved</span>
              <button
                type="button"
                className="wi-btn"
                aria-label="Delete note"
                onClick={() => {
                  const rest = notes.filter((n) => n.id !== note.id);
                  setNotes(rest);
                  setNoteId(rest[0]?.id ?? 0);
                  say("Note deleted");
                }}
              >
                <Icon.Trash />
              </button>
            </div>
            <textarea
              className="wi-input wi-scroll wi-muted"
              value={note.body}
              onChange={(e) => editNote({ body: e.target.value })}
              placeholder="Start typing… it saves automatically."
              aria-label="Note text"
              style={{ flex: 1, lineHeight: 1.6 }}
            />
            <span className="wi-dim" style={{ fontSize: 11 }}>Try typing. Sample notes reset when you reload.</span>
          </div>
        ) : (
          <div className="wi-card" style={{ display: "grid", placeItems: "center" }}>
            <button type="button" className="wi-btn primary" onClick={newNote}><Icon.Plus /> New note</button>
          </div>
        )}
      </div>
    ),

    media: (
      <div className="wi-card" style={{ height: "100%", display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "center", padding: 18 }}>
        <div className="wi-thumb wi-hide-xs" style={{ width: 120, height: 120, display: "grid", placeItems: "center", borderRadius: 16 }}>
          <span className="wi-accent" style={{ transform: "scale(2.2)" }}><Icon.Music /></span>
        </div>
        <div style={{ display: "grid", gap: 10, minWidth: 0 }}>
          <span className="wi-label">Now playing · {t.source}</span>
          <span key={track} className="wi-trunc wi-enter" style={{ fontSize: 20, fontWeight: 650 }}>{t.title}</span>
          <span className="wi-muted">{t.artist}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button type="button" className="wi-btn" aria-label="Previous track" onClick={() => setTrack((i) => (i + TRACKS.length - 1) % TRACKS.length)}><Icon.Prev /></button>
            <button type="button" className="wi-btn primary" style={{ width: 40 }} aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying((p) => !p)}>
              {playing ? <Icon.Pause /> : <Icon.Play />}
            </button>
            <button type="button" className="wi-btn" aria-label="Next track" onClick={() => setTrack((i) => (i + 1) % TRACKS.length)}><Icon.Next /></button>
            <span style={{ marginLeft: 8 }}><Equalizer paused={!playing} /></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button type="button" className="wi-btn" style={{ padding: "0 7px" }} aria-label={muted ? "Unmute" : "Mute"} onClick={() => setMuted((m) => !m)}>
              {muted ? <Icon.Muted /> : <Icon.Speaker />}
            </button>
            <input type="range" min={0} max={100} value={muted ? 0 : volume} onChange={(e) => { setVolume(+e.target.value); setMuted(false); }} className="wi-range" aria-label="Volume" />
            <span className="wi-dim wi-mono" style={{ fontSize: 11, width: 22 }}>{muted ? 0 : volume}</span>
          </div>
        </div>
      </div>
    ),

    clipboard: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className="wi-label">Recent · {clips.length} items</span>
          <span style={{ flex: 1 }} />
          <button type="button" className="wi-btn wi-hide-xs" onClick={() => { setClipPaused((p) => !p); say(clipPaused ? "Recording resumed" : "Recording paused"); }}>
            {clipPaused ? <><Icon.Play /> Resume</> : <><Icon.Pause /> Pause</>}
          </button>
          {clips.length > 0 ? (
            <button type="button" className="wi-btn" onClick={() => { setClips([]); say("Clipboard history cleared"); }}><Icon.Trash /> Clear all</button>
          ) : (
            <button type="button" className="wi-btn" onClick={() => setClips(CLIPBOARD.map((c, i) => ({ id: i + 1, ...c })))}>Restore samples</button>
          )}
        </div>
        <div className="wi-grid-2 wi-scroll" style={{ gap: 7, alignContent: "start" }}>
          {clips.map((c) => {
            const I = kindIcon[c.kind];
            return (
              <div key={c.id} className={`wi-row${copied === c.id ? " active" : ""}`} style={{ padding: 0, alignItems: "stretch" }}>
                <button type="button" onClick={() => copy(c)} title="Click to copy" style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 4px 8px 10px", flex: 1, minWidth: 0, background: "none", border: 0 }}>
                  {c.kind === "Image" ? <span className="wi-thumb" style={{ width: 34, height: 26, flex: "none" }} /> : <span className="wi-muted" style={{ paddingTop: 1 }}><I /></span>}
                  <span style={{ display: "grid", minWidth: 0, gap: 2 }}>
                    <span className={`wi-trunc ${c.kind === "Code" ? "wi-mono" : ""}`} style={{ fontSize: c.kind === "Code" ? 11 : 12 }}>{c.text}</span>
                    <span className="wi-dim" style={{ fontSize: 10.5 }}>{copied === c.id ? "Copied!" : `${c.kind} · ${c.age}`}</span>
                  </span>
                </button>
                <button type="button" aria-label="Remove item" className="wi-dim" onClick={() => setClips((l) => l.filter((x) => x.id !== c.id))} style={{ background: "none", border: 0, padding: "0 8px" }}>
                  <Icon.Close />
                </button>
              </div>
            );
          })}
        </div>
        <span className="wi-dim" style={{ marginTop: "auto", fontSize: 11.5 }}>Click any card to copy it again{clipPaused ? " · recording paused" : ""}.</span>
      </div>
    ),

    system: (
      <div className="wi-grid-3" style={{ gridAutoRows: "auto" }}>
        {[
          { l: "CPU", v: "23%", w: 23 },
          { l: "Memory", v: "61%", w: 61 },
          { l: "GPU", v: "9%", w: 9 },
        ].map((m) => (
          <div key={m.l} className="wi-card" style={{ display: "grid", gap: 6 }}>
            <span className="wi-label">{m.l}</span>
            <span className="wi-big">{m.v}</span>
            <div className="wi-bar"><i style={{ width: `${m.w}%` }} /></div>
          </div>
        ))}
        <div className="wi-card" style={{ display: "grid", gap: 4 }}>
          <span className="wi-label">Network</span>
          <span className="wi-mono" style={{ fontSize: 13 }}>↓ 4.2 MB/s</span>
          <span className="wi-mono wi-muted" style={{ fontSize: 13 }}>↑ 310 KB/s</span>
        </div>
        <div className="wi-card" style={{ display: "grid", gap: 6 }}>
          <span className="wi-label">Windows Update</span>
          <span style={{ fontWeight: 600 }}>Up to date</span>
          <button type="button" className="wi-btn" onClick={() => say("Would open Windows Update settings")}>Open settings</button>
        </div>
        <div className="wi-card" style={{ display: "grid", gap: 6 }}>
          <span className="wi-label">Quick actions</span>
          <span style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button type="button" className="wi-btn" onClick={() => say("Would open the Windows screenshot tool")}><Icon.Camera /> Screenshot</button>
            <button type="button" className="wi-btn" onClick={() => say("Would lock the PC")}><Icon.Lock /> Lock</button>
          </span>
        </div>
      </div>
    ),

    weather: settings.weather ? (
      <div style={{ display: "grid", gap: 10, height: "100%", gridTemplateRows: "auto 1fr" }}>
        <div className="wi-card" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span className="wi-accent" style={{ transform: "scale(2)", margin: "0 10px" }}><Icon.Cloud /></span>
          <div style={{ display: "grid" }}>
            <span className="wi-label">{WEATHER.city} · sample</span>
            <span className="wi-big">{WEATHER.temp}°C</span>
            <span className="wi-muted">{WEATHER.desc}</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0,1fr))", gap: 8 }}>
          {WEATHER.days.map((d) => (
            <div key={d.d} className="wi-card" style={{ display: "grid", justifyItems: "center", alignContent: "center", gap: 6, padding: 8 }}>
              <span className="wi-label">{d.d}</span>
              <span className="wi-muted"><d.icon /></span>
              <span style={{ fontWeight: 600 }}>{d.hi}°</span>
              <span className="wi-dim" style={{ fontSize: 11 }}>{d.lo}°</span>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div className="wi-card" style={{ height: "100%", display: "grid", placeItems: "center", textAlign: "center", gap: 8 }}>
        <div style={{ display: "grid", gap: 8, justifyItems: "center" }}>
          <span className="wi-muted"><Icon.Cloud /></span>
          <span style={{ fontWeight: 600 }}>Weather is off</span>
          <span className="wi-dim" style={{ maxWidth: 300 }}>It&apos;s the only feature that uses the internet, so it&apos;s off by default.</span>
          <button type="button" className="wi-btn primary" onClick={() => setSettings((s) => ({ ...s, weather: true }))}>Turn on</button>
        </div>
      </div>
    ),

    themes: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
        <span className="wi-label">Themes · click to apply</span>
        <div className="wi-grid-3 wi-scroll" style={{ gridAutoRows: "auto" }}>
          {THEMES.map((th) => (
            <button
              key={th.slug}
              type="button"
              onClick={() => { setThemeSlug(th.slug); say(`${th.name} applied`); }}
              className={`wi-row${th.slug === themeSlug ? " active" : ""}`}
              style={{ padding: "8px 10px" }}
              aria-pressed={th.slug === themeSlug}
            >
              <span style={{ width: 22, height: 22, borderRadius: 7, flex: "none", background: `linear-gradient(135deg, ${th.tokens.base}, ${th.tokens.accent})`, boxShadow: "inset 0 0 0 1px rgba(255,255,255,.15)" }} />
              <span style={{ display: "grid", minWidth: 0 }}>
                <span className="wi-trunc" style={{ fontWeight: 600 }}>{th.name}</span>
                <span className="wi-trunc wi-dim" style={{ fontSize: 10.5 }}>{th.appDescription}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    ),

    settings: (
      <div className="wi-scroll" style={{ display: "grid", gap: 6, height: "100%", alignContent: "start" }}>
        {(
          [
            ["startup", "Start WorkOS when Windows starts"],
            ["clipboard", "Record clipboard history"],
            ["suggestions", "Suggest apps for the current workspace"],
            ["learning", "Add suggested apps automatically (with Undo)"],
            ["weather", "Weather (uses Open-Meteo)"],
          ] as const
        ).map(([k, label]) => (
          <div key={k} className="wi-row" style={{ padding: "9px 12px" }}>
            <span style={{ flex: 1 }}>{label}</span>
            <button
              type="button"
              role="switch"
              aria-checked={settings[k]}
              aria-label={label}
              className="wi-switch"
              onClick={() => setSettings((s) => ({ ...s, [k]: !s[k] }))}
            />
          </div>
        ))}
        <div className="wi-row" style={{ padding: "9px 12px", flexWrap: "wrap" }}>
          <span style={{ flex: 1 }}>Shortcuts</span>
          <span className="wi-mono wi-dim" style={{ fontSize: 11 }}>Ctrl+Alt+Space · Win+Shift+V · Ctrl+Alt+1…9</span>
        </div>
      </div>
    ),
  };

  return (
    <ThemeScope theme={theme.tokens} wallpaper className={`relative overflow-hidden rounded-[28px] border border-line-2 p-3 pt-5 sm:p-6 sm:pt-7 ${className}`}>
      <div className="flex min-h-[46px] items-center justify-center gap-3">
        <button type="button" onClick={() => setPage("home")} aria-label="Open Home" className="max-w-full rounded-full">
          <Pill
            workspace={ws.name}
            state={wsRunning ? "running" : "stopped"}
            apps={ws.apps}
            download={pillDownload}
            media={playing ? { title: t.title } : undefined}
            battery={86}
            switchedFrom={prevWs}
            compact
          />
        </button>
      </div>
      <div className="mx-auto mt-4 max-w-[760px]">
        <Panel
          title={TITLES[page]}
          icon={ICONS[page]}
          workspace={ws.name}
          apps={ws.apps}
          active={page}
          onNavigate={setPage}
          navLabel="WorkOS panel pages"
          toast={toast && <span key={toast.id} className="wi-toast wi-hide-xs" aria-hidden="true">{toast.msg}</span>}
        >
          <div key={page} className="wi-enter h-full">{pages[page]}</div>
        </Panel>
      </div>
      <p className="mt-3 min-h-[1.25rem] text-center text-xs text-white/70 sm:sr-only" role="status">{toast?.msg}</p>
      {onExit && (
        <div className="mt-3 flex justify-center">
          <button type="button" onClick={onExit} className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-white/70 hover:text-white">
            ↺ Back to the tour
          </button>
        </div>
      )}
    </ThemeScope>
  );
}
