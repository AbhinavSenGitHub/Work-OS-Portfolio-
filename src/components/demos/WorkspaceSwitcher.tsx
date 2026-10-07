"use client";

import { useState } from "react";
import { AppTile, Panel, Pill, ThemeScope } from "@/components/island/Island";
import { Icon } from "@/components/island/icons";
import { WORKSPACES } from "@/lib/demo";
import { siteTheme } from "@/lib/themes";

/** Pick a workspace and watch the island and taskbar change. */
export function WorkspaceSwitcher() {
  const [active, setActive] = useState("winit");
  const [from, setFrom] = useState<string | undefined>();
  const ws = WORKSPACES.find((w) => w.id === active) ?? WORKSPACES[0];
  const hidden = WORKSPACES.filter((w) => w.id !== active).flatMap((w) => w.apps);

  const choose = (id: string) => {
    if (id === active) return;
    setFrom(ws.name);
    setActive(id);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-10">
      <div className="min-w-0">
        <p id="ws-pick" className="text-sm font-medium text-fg">Pick a workspace</p>
        <div role="radiogroup" aria-labelledby="ws-pick" className="rail -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
          {WORKSPACES.map((w) => (
            <button
              key={w.id}
              type="button"
              role="radio"
              aria-checked={w.id === active}
              onClick={() => choose(w.id)}
              className="flex flex-none items-center gap-3 rounded-2xl border border-line px-4 py-3 text-left transition hover:border-line-2 aria-checked:border-accent/50 aria-checked:bg-accent/[.07]"
            >
              <span className={`size-2 rounded-full ${w.id === active ? "bg-accent shadow-[0_0_0_3px_rgba(61,220,151,.18)]" : "border border-dim"}`} aria-hidden="true" />
              <span>
                <span className="block text-[15px] font-medium text-fg">{w.name}</span>
                <span className="hidden text-xs text-dim lg:block">{w.apps.map((a) => a.name).join(" · ")}</span>
              </span>
            </button>
          ))}
        </div>
        <p className="mt-4 hidden text-sm leading-relaxed text-muted lg:block" aria-live="polite">
          {ws.description}
        </p>
      </div>

      <ThemeScope theme={siteTheme.tokens} wallpaper className="overflow-hidden rounded-[26px] border border-line-2 p-3 sm:p-5">
        <div className="flex justify-center" key={`pill-${active}`}>
          <div className="wi-enter">
            <Pill workspace={ws.name} apps={ws.apps} switchedFrom={from} compact />
          </div>
        </div>
        <div className="mx-auto mt-4 max-w-[760px]">
          <Panel title="Workspace" icon={Icon.Grid} workspace={ws.name} apps={ws.apps} active="workspace">
            <div key={active} className="wi-enter" style={{ display: "grid", gap: 10, height: "100%", gridTemplateRows: "auto 1fr auto" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 18, fontWeight: 650 }}>{ws.name}</span>
                <span className="wi-accent" style={{ fontSize: 11.5, fontWeight: 600 }}>● Running</span>
              </div>
              <div className="wi-grid-3" style={{ gridAutoRows: "auto", alignContent: "start" }}>
                {ws.apps.map((a) => (
                  <div key={a.name} className="wi-row" style={{ padding: "9px 10px" }}>
                    <AppTile app={a} large />
                    <span style={{ display: "grid", minWidth: 0 }}>
                      <span className="wi-trunc" style={{ fontWeight: 600 }}>{a.name}</span>
                      <span className="wi-trunc wi-dim wi-mono" style={{ fontSize: 10.5 }}>{a.context ?? "Visible"}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="wi-card" style={{ padding: "9px 12px", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span className="wi-label">Hidden, still running</span>
                <span style={{ display: "inline-flex", gap: 4, flexWrap: "wrap" }}>
                  {Array.from(new Map(hidden.map((a) => [a.name, a])).values())
                    .filter((a) => !ws.apps.some((b) => b.name === a.name))
                    .map((a) => (
                      <span key={a.name} style={{ opacity: 0.6 }}>
                        <AppTile app={a} />
                      </span>
                    ))}
                </span>
              </div>
            </div>
          </Panel>
        </div>
        {/* Taskbar */}
        <div className="mx-auto mt-4 flex max-w-[760px] items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur" aria-label={`Taskbar shows: ${ws.apps.map((a) => a.name).join(", ")}`} role="img">
          <span className="mr-2 grid size-7 place-items-center rounded-md bg-white/10 text-[11px] font-bold text-white/80" aria-hidden="true">⊞</span>
          {ws.apps.map((a) => (
            <span key={a.name} className="wi-enter">
              <AppTile app={a} large />
            </span>
          ))}
        </div>
      </ThemeScope>
    </div>
  );
}
