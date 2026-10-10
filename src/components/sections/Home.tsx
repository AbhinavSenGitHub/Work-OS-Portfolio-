import Link from "next/link";
import { AppTile, Launcher, Pill, ThemeScope } from "@/components/island/Island";
import { Icon } from "@/components/island/icons";
import { ClipboardPage, DownloadsPage, NotesPage } from "@/components/island/pages";
import { Panel } from "@/components/island/Island";
import { APPS, NOW_PLAYING, WORKSPACES, type DemoApp } from "@/lib/demo";
import { pricing } from "@/lib/site";
import { siteTheme, THEMES } from "@/lib/themes";

/* ───────────── Before / after ───────────── */

export function BeforeAfter() {
  const chaos = [
    "14 windows across 3 projects",
    "Which terminal was the API?",
    "The screenshot from an hour ago",
    "A client's tab in your personal browser",
    "installer (3).exe in Downloads",
    "Copied it… then copied over it",
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
      <article className="card relative overflow-hidden p-6 sm:p-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-dim">Before WorkOS</p>
        <h3 className="mt-2 text-xl font-semibold text-fg">Everything, everywhere, at once</h3>
        <div className="relative mt-6 h-56" aria-hidden="true">
          {[APPS.vscode, APPS.chrome, APPS.terminal, APPS.slack, APPS.spotify, APPS.figma, APPS.explorer, APPS.postman, APPS.claude].map((a, i) => (
            <div
              key={a.name}
              className="absolute w-32 rounded-lg border border-white/10 bg-[#11161a] shadow-xl"
              style={{ left: `${(i * 37) % 62}%`, top: `${(i * 53) % 70}%`, transform: `rotate(${((i * 7) % 9) - 4}deg)` }}
            >
              <div className="flex items-center gap-1.5 border-b border-white/5 px-2 py-1.5">
                <AppTile app={a} />
                <span className="truncate text-[11px] text-white/60">{a.name}</span>
              </div>
              <div className="space-y-1 p-2">
                <div className="h-1 w-3/4 rounded bg-white/10" />
                <div className="h-1 w-1/2 rounded bg-white/10" />
              </div>
            </div>
          ))}
        </div>
        <ul className="mt-4 grid gap-2 text-sm text-muted sm:grid-cols-2">
          {chaos.map((c) => (
            <li key={c} className="flex gap-2">
              <span className="text-dim" aria-hidden="true">·</span>
              {c}
            </li>
          ))}
        </ul>
      </article>

      <div className="flex items-center justify-center py-2 lg:py-0" aria-hidden="true">
        <div className="grid size-12 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent lg:rotate-0">
          <span className="rotate-90 lg:rotate-0">→</span>
        </div>
      </div>

      <article className="card relative overflow-hidden p-6 sm:p-8" style={{ borderColor: "rgba(61,220,151,.3)" }}>
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">After WorkOS</p>
        <h3 className="mt-2 text-xl font-semibold text-fg">One environment per piece of work</h3>
        <ThemeScope theme={siteTheme.tokens} className="mt-6 grid gap-2">
          {WORKSPACES.slice(0, 4).map((w, i) => (
            <div key={w.id} className={`wi-row${i === 0 ? " active" : ""}`} style={{ padding: "10px 12px" }}>
              <span className="wi-dot" data-state={i === 0 ? "running" : "stopped"} />
              <span style={{ fontWeight: 600, fontSize: 14 }}>{w.name}</span>
              <span style={{ flex: 1 }} />
              <span style={{ display: "inline-flex", gap: 3 }}>
                {w.apps.slice(0, 4).map((a) => (
                  <AppTile key={a.name} app={a} />
                ))}
              </span>
            </div>
          ))}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, paddingTop: 14 }}>
            <Launcher state="normal" />
            <Launcher state="media" />
            <Launcher state="downloading" progress={72} />
            <Launcher state="critical" count={2} />
            <span className="wi-muted" style={{ fontSize: 12.5 }}>…and the island tells you when something needs you.</span>
          </div>
        </ThemeScope>
      </article>
    </div>
  );
}

/* ───────────── Screenshot-style gallery ───────────── */

function Window({ app, title, children }: { app: DemoApp; title: string; children?: React.ReactNode }) {
  return (
    <div className="absolute inset-x-3 bottom-3 top-14 overflow-hidden rounded-xl border border-white/10 bg-[#0d1116]/95 shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/5 px-3 py-2">
        <AppTile app={app} />
        <span className="truncate text-[11px] text-white/60">{title}</span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

const lines = (n: number, accent = -1) => (
  <div className="space-y-1.5" aria-hidden="true">
    {Array.from({ length: n }, (_, i) => (
      <div key={i} className="h-1.5 rounded" style={{ width: `${40 + ((i * 29) % 55)}%`, marginLeft: (i % 4) * 10, background: i === accent ? "var(--cap-accent-line)" : "rgba(255,255,255,.09)" }} />
    ))}
  </div>
);

const SHOTS = [
  {
    title: "The desktop",
    caption: "The Work Island sits at the top of the screen: workspace, apps, music and battery in one pill.",
    body: (
      <>
        <div className="absolute left-1/2 top-4 -translate-x-1/2 scale-90">
          <Pill workspace="Acme" apps={WORKSPACES[0].apps.slice(0, 4)} media={{ title: NOW_PLAYING.title }} compact />
        </div>
      </>
    ),
  },
  {
    title: "VS Code, maximized",
    caption: "When an app covers the pill, the island collapses to a small W at the edge of the screen.",
    body: (
      <>
        <div className="absolute right-4 top-4"><Launcher state="active" /></div>
        <Window app={APPS.vscode} title="auth.rs — acme">{lines(8, 3)}</Window>
      </>
    ),
  },
  {
    title: "Chrome, work profile",
    caption: "The Acme workspace opens Chrome with its own profile and tabs, restored by the extension.",
    body: (
      <>
        <div className="absolute left-1/2 top-4 -translate-x-1/2 scale-90"><Pill workspace="Acme" download={72} compact /></div>
        <Window app={APPS.chrome} title="acme · Issues">
          <div className="mb-2 flex gap-1">{["Issues", "Docs", "CI"].map((t) => <span key={t} className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/60">{t}</span>)}</div>
          {lines(5, 1)}
        </Window>
      </>
    ),
  },
  {
    title: "Notes",
    caption: "Notes open from the island and autosave as you type.",
    body: (
      <div className="absolute inset-3 top-4 origin-top scale-[.62] sm:scale-[.58]" style={{ width: "160%" }}>
        <Panel title="Notes" icon={Icon.Note} workspace="Acme" active="notes"><NotesPage /></Panel>
      </div>
    ),
  },
  {
    title: "Clipboard",
    caption: "Code, links, files and images you copied, each one click away from the clipboard again.",
    body: (
      <div className="absolute inset-3 top-4 origin-top scale-[.62] sm:scale-[.58]" style={{ width: "160%" }}>
        <Panel title="Clipboard" icon={Icon.Clipboard} workspace="Acme" active="clipboard"><ClipboardPage /></Panel>
      </div>
    ),
  },
  {
    title: "Downloads",
    caption: "The Downloads folder as a shelf of previews, with Open and Show in folder.",
    body: (
      <div className="absolute inset-3 top-4 origin-top scale-[.62] sm:scale-[.58]" style={{ width: "160%" }}>
        <Panel title="Downloads" icon={Icon.Download} workspace="Acme" active="downloads"><DownloadsPage /></Panel>
      </div>
    ),
  },
];

export function ContextGallery() {
  return (
    <ul className="rail -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
      {SHOTS.map((s) => (
        <li key={s.title} className="w-[82vw] max-w-[380px] flex-none sm:w-auto sm:max-w-none">
          <figure className="card overflow-hidden p-0">
            <ThemeScope theme={siteTheme.tokens} wallpaper className="relative h-56 overflow-hidden" style={{}}>
              <div role="img" aria-label={`Interface preview: ${s.title}`} className="absolute inset-0">
                {s.body}
              </div>
            </ThemeScope>
            <figcaption className="p-5">
              <span className="block text-[15px] font-semibold text-fg">{s.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{s.caption}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

/* ───────────── Comparison ───────────── */

const ROWS: { label: string; workos: "yes" | "dev"; }[] = [
  { label: "Persistent workspaces", workos: "yes" },
  { label: "Context restore (folders, terminals, tabs)", workos: "yes" },
  { label: "Always-available Work Island", workos: "yes" },
  { label: "Clipboard history", workos: "yes" },
  { label: "Quick notes", workos: "yes" },
  { label: "Download shelf", workos: "yes" },
  { label: "Attention signals (Pulse)", workos: "yes" },
  { label: "Screenshot history", workos: "dev" },
];

export function Comparison() {
  return (
    <div>
      <div className="relative overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">What WorkOS is built for, compared with the typical focus of other tool categories</caption>
          <thead className="bg-surface/60 text-dim">
            <tr>
              <th scope="col" className="px-5 py-4 font-medium">Built around</th>
              <th scope="col" className="px-5 py-4 font-semibold text-accent">WorkOS</th>
              <th scope="col" className="px-5 py-4 font-medium">App launcher</th>
              <th scope="col" className="px-5 py-4 font-medium">Task manager</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {ROWS.map((r) => (
              <tr key={r.label}>
                <th scope="row" className="px-5 py-3.5 font-normal text-fg">{r.label}</th>
                <td className="px-5 py-3.5">
                  {r.workos === "yes" ? (
                    <span className="inline-flex items-center gap-1.5 text-accent"><Icon.Check /><span className="sr-only">Yes</span></span>
                  ) : (
                    <span className="pill-tag" data-tone="soon">In development</span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-dim"><span aria-hidden="true">—</span><span className="sr-only">Not the core focus</span></td>
                <td className="px-5 py-3.5 text-dim"><span aria-hidden="true">—</span><span className="sr-only">Not the core focus</span></td>
              </tr>
            ))}
            <tr>
              <th scope="row" className="px-5 py-3.5 font-normal text-fg">Primary job</th>
              <td className="px-5 py-3.5 text-muted">Organize the computer around the work</td>
              <td className="px-5 py-3.5 text-muted">Find and open apps, files and commands fast</td>
              <td className="px-5 py-3.5 text-muted">Track and plan tasks and projects</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-center text-xs text-dim">
        Compared by category, not by specific product. Many launchers and task managers offer some of these through extensions; WorkOS can work alongside them.
      </p>
    </div>
  );
}

/* ───────────── Developers ───────────── */

const PERSONAS = [
  {
    role: "Frontend developer",
    apps: [APPS.vscode, APPS.chrome, APPS.terminal, APPS.claude],
    body: "The editor opens on the repo, the dev server terminal comes back in the right folder and Chrome returns with the localhost tabs you were testing.",
  },
  {
    role: "Backend developer",
    apps: [APPS.vscode, APPS.postman, APPS.docker, APPS.terminal, APPS.database],
    body: "Keep Postman, Docker, a database client and service terminals together, and hide them all when you switch to something else.",
  },
  {
    role: "Freelancer",
    apps: [APPS.slack, APPS.teams, APPS.chrome, APPS.vscode, APPS.explorer],
    body: "One workspace per client, each with its own Chrome profile, folders and chat. Client A's tabs never show up during client B's call.",
  },
  {
    role: "AI developer",
    apps: [APPS.claude, APPS.vscode, APPS.terminal, APPS.chrome, APPS.docker],
    body: "Keep each agent session with the project it works on, so terminals from different repos never get mixed up. Clipboard history keeps the output you copied.",
  },
];

export function Developers() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {PERSONAS.map((p) => (
        <li key={p.role} className="card p-6">
          <h3 className="text-lg font-semibold text-fg">{p.role}</h3>
          <ThemeScope theme={siteTheme.tokens} className="mt-4 flex flex-wrap gap-2">
            {p.apps.map((a) => (
              <span key={a.name} className="wi-row" style={{ padding: "5px 9px", gap: 7 }}>
                <AppTile app={a} />
                <span style={{ fontSize: 12.5 }}>{a.name}</span>
              </span>
            ))}
          </ThemeScope>
          <p className="mt-4 text-sm leading-relaxed text-muted">{p.body}</p>
        </li>
      ))}
    </ul>
  );
}

/* ───────────── Privacy ───────────── */

export const PRIVACY_POINTS = [
  { title: "No account", body: "There is nothing to sign up for. Install and use it." },
  { title: "Workspaces stay local", body: "Workspace setup and app context are stored in a local database on your computer." },
  { title: "Notes stay local", body: "Notes are saved on your machine. There is no sync service." },
  { title: "Clipboard stays local", body: "Clipboard history and copied images never leave your computer. Pause it anytime." },
  { title: "Files stay where they are", body: "Downloads and screenshots stay in their folders. WorkOS only reads them locally." },
  { title: "No analytics in the app", body: "The app has no telemetry. The browser extension talks only to WorkOS on your machine." },
];

export function Privacy() {
  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PRIVACY_POINTS.map((p) => (
          <li key={p.title} className="card p-6">
            <span className="grid size-9 place-items-center rounded-xl bg-accent/10 text-accent" aria-hidden="true"><Icon.Lock /></span>
            <h3 className="mt-4 font-semibold text-fg">{p.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-dim">
        The one exception: the optional weather card, off by default, sends the city you enter to the Open-Meteo weather service. Everything else works offline.{" "}
        <Link href="/privacy" className="text-muted underline underline-offset-4 hover:text-fg">Read more about privacy</Link>
      </p>
    </div>
  );
}

/* ───────────── Pricing ───────────── */

export function Pricing() {
  return (
    <div className="card mx-auto max-w-2xl p-8 text-center">
      <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">Pricing</p>
      <h3 className="mt-3 text-2xl font-semibold text-fg">{pricing.headline}</h3>
      <p className="mt-3 text-muted">{pricing.body}</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
        {pricing.plans.map((p) => (
          <li key={p.name} className="rounded-2xl border border-line p-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-dim">{p.name}</p>
            <p className="mt-1 text-2xl font-semibold text-fg">
              {p.price} <span className="text-xs font-normal text-dim">{p.per}</span>
            </p>
            {p.note && <p className="mt-1 text-xs font-semibold text-accent">{p.note}</p>}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-dim">{pricing.howToBuy}</p>
    </div>
  );
}

/* ───────────── Theme strip ───────────── */

export function ThemeStrip() {
  return (
    <ul className="rail -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
      {THEMES.map((t) => (
        <li key={t.slug} className="w-[44vw] max-w-[200px] flex-none sm:w-auto sm:max-w-none">
          <Link href={`/themes/${t.slug}`} className="group block rounded-2xl border border-line p-2 transition hover:border-line-2">
            <ThemeScope theme={t.tokens} wallpaper className="grid h-24 place-items-center overflow-hidden rounded-xl">
              <span className="flex items-center gap-3">
                <Launcher state="active" />
                <Launcher state="media" />
              </span>
            </ThemeScope>
            <span className="flex items-center justify-between px-1.5 pb-1 pt-2.5 text-sm">
              <span className="font-medium text-fg">{t.name}</span>
              <span className="text-dim transition group-hover:text-fg" aria-hidden="true">→</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
