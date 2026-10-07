import type { Metadata } from "next";
import Link from "next/link";
import { Launcher, Pill, ThemeScope } from "@/components/island/Island";
import { IslandStates } from "@/components/sections/IslandStates";
import { DownloadBand } from "@/components/site/Download";
import { FaqList } from "@/components/site/FaqList";
import { JsonLd } from "@/components/site/JsonLd";
import { PageHero } from "@/components/site/PageHero";
import { Container, SectionHeading } from "@/components/site/Section";
import { NOW_PLAYING, WORKSPACES } from "@/lib/demo";
import { faqLd, pageMetadata } from "@/lib/seo";
import { siteTheme } from "@/lib/themes";

export const metadata: Metadata = pageMetadata({
  title: "WorkOS Work Island — Your Work, One Glance Away",
  description:
    "The Work Island is a small pill at the top of your screen showing your workspace, apps, music, downloads and battery. It steps aside when apps are maximized and hides during fullscreen video.",
  path: "/work-island",
});

const ISLAND_FAQ = [
  { q: "Where does the Work Island appear?", a: "At the top of your screen by default. It can be dragged, remembers its position, and stays within the usable area of your monitor." },
  { q: "Will it cover my apps?", a: "When an app is maximized or covers the pill, the island shrinks to a small W at the edge of the screen. During fullscreen video or games it hides completely; Ctrl+Alt+Space still opens it." },
  { q: "Does it show in the taskbar?", a: "No. The island is always on top and has no taskbar entry." },
  { q: "Can I open it from the keyboard?", a: "Yes. Ctrl+Alt+Space opens the expanded panel and Win+Shift+V opens clipboard history. Both shortcuts can be changed." },
];

const ws = WORKSPACES[0];

export default function WorkIslandPage() {
  return (
    <>
      <JsonLd data={faqLd(ISLAND_FAQ)} />
      <PageHero
        crumbs={[{ name: "Work Island", path: "/work-island" }]}
        eyebrow="Work Island"
        title="Your work, one glance away."
        lede="The Work Island stays quiet until something needs your attention. It's a small pill at the top of your screen that shows where you are and expands into everything WorkOS does."
        aside={
          <ThemeScope theme={siteTheme.tokens} wallpaper className="grid min-h-[280px] place-items-center gap-8 rounded-[28px] border border-line-2 p-6">
            <div className="float-slow">
              <Pill workspace={ws.name} apps={ws.apps} media={{ title: NOW_PLAYING.title }} battery={86} compact />
            </div>
            <div className="flex items-center gap-8">
              <Launcher state="active" large />
              <Launcher state="downloading" progress={72} large />
              <Launcher state="critical" count={2} large />
            </div>
          </ThemeScope>
        }
      />

      <section aria-labelledby="states-title" className="border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading id="states-title" eyebrow="States" title="Four states you'll learn in a day" lede="Each state appears as the full pill on your desktop, and as the small launcher when an app is maximized." />
          <div className="mt-12">
            <IslandStates />
          </div>
        </Container>
      </section>

      <section aria-labelledby="pill-title" className="border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading id="pill-title" eyebrow="Anatomy" title="What the pill shows" />
          <ThemeScope theme={siteTheme.tokens} wallpaper className="mt-12 grid place-items-center overflow-hidden rounded-[26px] border border-line-2 px-3 py-10">
            <Pill workspace={ws.name} apps={ws.apps} download={42} media={{ title: NOW_PLAYING.title }} battery={86} />
          </ThemeScope>
          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Workspace", "The current workspace with a status dot. After a switch it briefly shows “Winit → Personal”."],
              ["App chips", "The apps in this workspace."],
              ["Download", "Live progress while a file downloads, then a brief check mark."],
              ["Now playing", "An equalizer and the track title while media plays."],
              ["System", "Battery, and when no workspace is active: weather, CPU/RAM and volume."],
              ["Expand", "Opens the panel with Home, Workspace, Downloads, Notes, Media, Clipboard, System, Weather, Themes and Settings."],
            ].map(([k, v]) => (
              <div key={k} className="card p-5">
                <dt className="font-semibold text-fg">{k}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="adapt-title" className="border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading id="adapt-title" eyebrow="Adaptive" title="It knows when to step aside" />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["On the desktop", "The full pill, with workspace, apps and activity."],
              ["App maximized", "A 30px W at the edge of the screen. Its dot and underline still tell you what's happening."],
              ["Fullscreen video or game", "Hidden entirely. Ctrl+Alt+Space brings it back on demand."],
            ].map(([t, b]) => (
              <li key={t} className="card p-6">
                <h3 className="font-semibold text-fg">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-muted">
            Multi-monitor aware: per-monitor scaling is handled, and if a monitor is unplugged the island moves to one that remains.
          </p>
        </Container>
      </section>

      <section aria-labelledby="faq-title" className="border-t border-line py-20 sm:py-28">
        <Container className="max-w-3xl">
          <h2 id="faq-title" className="mb-8 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Work Island questions</h2>
          <FaqList items={ISLAND_FAQ} />
          <p className="mt-8 text-sm text-muted">
            Next: see how the island signals attention with{" "}
            <Link href="/pulse" className="text-fg underline decoration-accent/50 underline-offset-4">Pulse</Link>, or restyle it with{" "}
            <Link href="/themes" className="text-fg underline decoration-accent/50 underline-offset-4">themes</Link>.
          </p>
        </Container>
      </section>

      <DownloadBand />
    </>
  );
}
