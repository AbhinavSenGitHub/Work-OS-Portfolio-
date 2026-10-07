import type { Metadata } from "next";
import Link from "next/link";
import { WorkspaceSwitcher } from "@/components/demos/WorkspaceSwitcher";
import { DownloadBand } from "@/components/site/Download";
import { FaqList } from "@/components/site/FaqList";
import { JsonLd } from "@/components/site/JsonLd";
import { PageHero } from "@/components/site/PageHero";
import { Container, SectionHeading } from "@/components/site/Section";
import { FAQ } from "@/lib/faq";
import { faqLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "WorkOS Workspaces — Persistent Work Environments for Developers",
  description:
    "Give every project its own workspace on Windows. WorkOS remembers which apps belong to each environment, hides the rest without closing them, and restores editor folders, terminals and browser tabs.",
  path: "/workspaces",
});

const STEPS = [
  { title: "Create a workspace", body: "Name it after the work: a product, a client, a course. A default \"My Workspace\" is created on first run." },
  { title: "Add apps, or let WorkOS suggest them", body: "Add apps yourself, or accept suggestions when WorkOS notices you using a new app in this workspace. In automatic mode it adds them with an Undo." },
  { title: "Start Work", body: "Launches the workspace's apps, reuses any already running, and restores their context: project folders, terminal directories, Chrome profile and tabs." },
  { title: "Switch", body: "The target's windows come back and focus returns to the last window you used. Other workspaces' windows are hidden from the taskbar and Alt+Tab, still running." },
  { title: "Stop Work", body: "Saves context, then asks the workspace's apps to close. Apps can still prompt you to save." },
];

const WS_FAQ = FAQ.filter((f) =>
  ["What is a WorkOS workspace?", "Does WorkOS close my applications when I switch workspaces?", "Can WorkOS remember my development environment?", "Does WorkOS support multiple monitors?"].includes(f.q),
).concat([
  { q: "What happens to windows that aren't in any workspace?", a: "Nothing. WorkOS only shows and hides windows that belong to a workspace. Everything else stays exactly where it is." },
  { q: "What if WorkOS quits unexpectedly while windows are hidden?", a: "Hidden windows are shown again when WorkOS exits or crashes, and there is a \"Show all windows\" command if you ever need everything back at once." },
  { q: "Can I switch workspaces from the keyboard?", a: "Yes. Ctrl+Alt+1 to 9 switch to your first nine workspaces, and Ctrl+Alt+Space opens the Work Island. Shortcuts can be changed." },
]);

export default function WorkspacesPage() {
  return (
    <>
      <JsonLd data={faqLd(WS_FAQ)} />
      <PageHero
        crumbs={[{ name: "Workspaces", path: "/workspaces" }]}
        eyebrow="Workspaces"
        title="One computer. Multiple work environments."
        lede="A WorkOS workspace is everything you need for one piece of work: its apps, windows, folders and tabs. WorkOS remembers which applications belong to each environment and brings them forward when you switch."
      />

      <section aria-labelledby="demo-title" className="pb-20 sm:pb-28">
        <Container>
          <h2 id="demo-title" className="sr-only">Workspace switching preview</h2>
          <WorkspaceSwitcher />
        </Container>
      </section>

      <section aria-labelledby="how-title" className="border-t border-line py-20 sm:py-28">
        <Container className="max-w-4xl">
          <SectionHeading id="how-title" eyebrow="How it works" title="From a pile of windows to a set of environments" />
          <ol className="mt-12 space-y-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="card flex gap-5 p-6">
                <span className="grid size-9 flex-none place-items-center rounded-full border border-accent/40 bg-accent/10 font-mono text-sm text-accent" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-fg">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-muted">
            Want the details of what gets restored? Read about{" "}
            <Link href="/features/workspace-memory" className="text-fg underline decoration-accent/50 underline-offset-4">workspace memory</Link>, or see how the{" "}
            <Link href="/work-island" className="text-fg underline decoration-accent/50 underline-offset-4">Work Island</Link> shows your current workspace at a glance.
          </p>
        </Container>
      </section>

      <section aria-labelledby="not-title" className="border-t border-line py-20 sm:py-28">
        <Container>
          <SectionHeading id="not-title" eyebrow="Designed carefully" title="Switching that never loses your work" />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["Nothing closes on switch", "Hidden apps keep running: builds continue, servers stay up, music keeps playing."],
              ["Unowned windows are untouched", "WorkOS only manages windows that belong to a workspace."],
              ["Safe on exit", "Hidden windows reappear when WorkOS exits, even after a crash."],
            ].map(([t, b]) => (
              <li key={t} className="card p-6">
                <h3 className="font-semibold text-fg">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="faq-title" className="border-t border-line py-20 sm:py-28">
        <Container className="max-w-3xl">
          <h2 id="faq-title" className="mb-8 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Workspace questions</h2>
          <FaqList items={WS_FAQ} />
        </Container>
      </section>

      <DownloadBand title="Give every project its own environment" />
    </>
  );
}
