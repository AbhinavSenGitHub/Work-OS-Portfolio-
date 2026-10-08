"use client";

import { useRef, useState } from "react";
import { Launcher, Panel, Pill, ThemeScope, type NavId } from "@/components/island/Island";
import { Icon } from "@/components/island/icons";
import { HomePage, WorkspacePage } from "@/components/island/pages";
import { NOW_PLAYING, WORKSPACES } from "@/lib/demo";
import { siteTheme } from "@/lib/themes";
import { LiveIsland } from "./LiveIsland";
import { useCycle, useInView } from "./useCycle";

const [winit, personal] = WORKSPACES;

const SCENES = [
  { caption: "Acme is running. A download reports its progress in the island.", label: "Download in progress" },
  { caption: "Music starts. The island shows it without taking more space.", label: "Media playing" },
  { caption: "Switch to Personal. Acme's apps are hidden, not closed.", label: "Switch workspace" },
  { caption: "Maximize an app and the island steps aside into a small W.", label: "Out of the way" },
];

export function HeroDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const [live, setLive] = useState<NavId | null>(null);
  const { index, setIndex, paused, setPaused, reduced } = useCycle(SCENES.length, 3800, visible && !live);
  const goLive = (id: NavId) => setLive(id);

  const ws = index >= 2 ? personal : winit;
  const download = index === 0 ? 42 : index === 1 ? 72 : undefined;

  return (
    <div ref={ref} className="relative">
      {live ? (
        <LiveIsland initialPage={live} onExit={() => { setLive(null); setPaused(false); }} className="shadow-[0_40px_120px_-40px_rgba(61,220,151,.35)]" />
      ) : (
      <ThemeScope
        theme={siteTheme.tokens}
        wallpaper
        className="relative overflow-hidden rounded-[28px] border border-line-2 p-3 pt-5 shadow-[0_40px_120px_-40px_rgba(61,220,151,.35)] sm:p-6 sm:pt-7"
      >
        <div className="flex min-h-[46px] justify-center">
          {index === 3 ? (
            <div className="wi-enter flex w-full justify-end pr-1">
              <Launcher state="active" />
            </div>
          ) : (
            <div className="wi-enter" key={`pill-${index}`}>
              <Pill
                workspace={ws.name}
                apps={ws.apps}
                download={download}
                media={index >= 1 ? { title: NOW_PLAYING.title } : undefined}
                battery={86}
                switchedFrom={index === 2 ? winit.name : undefined}
                compact
              />
            </div>
          )}
        </div>
        <div className="mx-auto mt-4 max-w-[760px]" key={`panel-${index >= 2 ? index : 0}`}>
          {index < 2 && (
            <Panel title="Home" icon={Icon.Home} workspace={ws.name} apps={ws.apps} active="home" onNavigate={goLive}>
              <HomePage ws={ws} download={download ?? 100} />
            </Panel>
          )}
          {index === 2 && (
            <Panel title="Workspace" icon={Icon.Grid} workspace={ws.name} apps={ws.apps} active="workspace" className="wi-enter" onNavigate={goLive}>
              <WorkspacePage workspaces={WORKSPACES} activeId="personal" />
            </Panel>
          )}
          {index === 3 && (
            <div className="wi-enter relative">
              <div className="grid h-[380px] place-items-center rounded-[20px] border border-white/10 bg-[#0d1117]/90 sm:h-[400px]">
                <div className="w-[92%] space-y-3" aria-hidden="true">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-white/15" />
                  </div>
                  {[72, 54, 88, 40, 66, 80, 35].map((w, i) => (
                    <div key={i} className="h-2 rounded bg-white/[.08]" style={{ width: `${w}%`, marginLeft: i % 3 ? 20 : 0 }} />
                  ))}
                </div>
                <p className="absolute bottom-4 left-4 font-mono text-[11px] text-white/40">Maximized editor · island collapsed</p>
              </div>
            </div>
          )}
        </div>
        <span className="sr-only">
          Preview of the WorkOS Work Island and expanded panel. {SCENES[index].caption}
        </span>
      </ThemeScope>
      )}

      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="min-h-[2.5rem] max-w-md text-center text-sm text-muted sm:text-left">
          {live ? (
            "Interactive preview with sample data. Click any icon, note, file or song."
          ) : (
            <>
              {SCENES[index].caption} <span className="text-accent">Click any icon in the panel to try it.</span>
            </>
          )}
        </p>
        <div className="flex items-center gap-2" role="group" aria-label="Preview controls">
          {SCENES.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => {
                setLive(null);
                setIndex(i);
                setPaused(true);
              }}
              aria-label={`Show: ${s.label}`}
              aria-pressed={!live && i === index}
              className="group grid size-7 place-items-center rounded-full"
            >
              <span className={`block h-1.5 rounded-full transition-all ${!live && i === index ? "w-5 bg-accent" : "w-1.5 bg-white/25 group-hover:bg-white/50"}`} />
            </button>
          ))}
          {!reduced && !live && (
            <button
              type="button"
              onClick={() => setPaused(!paused)}
              className="ml-1 grid size-8 place-items-center rounded-full border border-line-2 text-muted hover:text-fg"
              aria-label={paused ? "Play preview" : "Pause preview"}
            >
              {paused ? <Icon.Play /> : <Icon.Pause />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
