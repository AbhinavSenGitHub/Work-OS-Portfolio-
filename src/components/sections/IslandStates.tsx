import { Launcher, Pill, ThemeScope } from "@/components/island/Island";
import { NOW_PLAYING, WORKSPACES } from "@/lib/demo";
import { siteTheme, type ThemeTokens } from "@/lib/themes";

const ws = WORKSPACES[0];

export const ISLAND_STATES = [
  {
    id: "normal",
    name: "Normal",
    body: "Your workspace and its apps. Nothing else asks for attention.",
    pill: <Pill workspace={ws.name} apps={ws.apps.slice(0, 4)} compact />,
    launcher: <Launcher state="active" large />,
  },
  {
    id: "music",
    name: "Music",
    body: "Something is playing. A small equalizer, and the track when there's room.",
    pill: <Pill workspace={ws.name} media={{ title: NOW_PLAYING.title }} compact />,
    launcher: <Launcher state="media" large />,
  },
  {
    id: "download",
    name: "Download",
    body: "Progress while it runs, a brief check when it's done.",
    pill: <Pill workspace={ws.name} download={42} compact />,
    launcher: <Launcher state="downloading" progress={42} large />,
  },
  {
    id: "attention",
    name: "Attention",
    body: "A restart is required, the battery is critical, or an app can join this workspace.",
    pill: <Pill workspace={ws.name} state="starting" compact />,
    launcher: <Launcher state="critical" large />,
  },
] as const;

export function IslandStates({ theme = siteTheme.tokens, headingLevel = 3 }: { theme?: ThemeTokens; headingLevel?: 3 | 2 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="rail -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
      {ISLAND_STATES.map((s) => (
        <li key={s.id} className="card w-[78vw] max-w-[320px] flex-none overflow-hidden p-0 sm:w-auto sm:max-w-none">
          <ThemeScope theme={theme} wallpaper className="flex h-44 flex-col items-center justify-center gap-6 border-b border-line px-3">
            {s.pill}
            <div className="py-2">{s.launcher}</div>
          </ThemeScope>
          <div className="p-5">
            <H className="text-base font-semibold text-fg">{s.name}</H>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
