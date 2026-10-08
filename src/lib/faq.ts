export interface Faq {
  q: string;
  a: string;
}

export const FAQ: Faq[] = [
  {
    q: "What is WorkOS?",
    a: "WorkOS is a desktop workspace manager for developers and power users. It groups the apps, folders and browser tabs you use for each project into workspaces, lets you switch between them without closing anything, and keeps clipboard history, notes, downloads, media and system status in a small Work Island at the top of your screen.",
  },
  {
    q: "How does WorkOS work?",
    a: "You create a workspace for each project and add the apps that belong to it (WorkOS can also suggest them as you work). Switching workspaces shows that workspace's windows and hides the others. Starting a workspace launches its apps and restores their context, such as the editor's project folder and the terminal's working directory.",
  },
  {
    q: "What is a WorkOS workspace?",
    a: "A workspace is a named work environment, like \"Acme\", \"Personal\" or \"Client A\". It owns a set of apps and windows, remembers their context, and can have its own notes, Chrome profile and tabs.",
  },
  {
    q: "Does WorkOS close my applications when I switch workspaces?",
    a: "No. Switching hides the other workspaces' windows from the taskbar and Alt+Tab; the apps keep running. Windows that don't belong to any workspace are never touched. Apps are only closed if you choose Stop Work, and even then they can ask to save first.",
  },
  {
    q: "Does WorkOS work with Claude Code?",
    a: "You can keep Claude Code terminals in a workspace, and WorkOS restores the terminal's working directory when you start that workspace. Dedicated Claude Code attention signals in the Work Island are planned but not available in the current version.",
  },
  {
    q: "Can WorkOS remember my development environment?",
    a: "Yes. WorkOS remembers which apps belong to each workspace and restores their context: the open folder in VS Code, Cursor, Windsurf, VSCodium and VS Code Insiders, terminal working directories, File Explorer folders, the Chrome profile, and Chrome tabs via the optional extension. It does not currently restore window positions or sizes.",
  },
  {
    q: "Does WorkOS support multiple monitors?",
    a: "Yes. The Work Island handles multiple monitors, per-monitor scaling and negative coordinates, stays inside the usable screen area, and moves to a remaining screen if a monitor is unplugged. Switching workspaces shows and hides windows without moving them between monitors.",
  },
  {
    q: "Does WorkOS work offline?",
    a: "Yes. Everything works offline except the optional weather card, which is off by default and uses the Open-Meteo service when you turn it on, and the update check, which looks for a new version on this website about once an hour when you are online.",
  },
  {
    q: "Where is my workspace data stored?",
    a: "On your computer. Workspaces, clipboard history, notes and preferences are stored in a local SQLite database in your user's app data folder, and clipboard images are stored as files next to it. WorkOS has no account, no sync and no analytics."
  },
  {
    q: "How does WorkOS update?",
    a: "Automatically. When you're online WorkOS checks for a new version about once an hour, downloads it in the background and installs it while you aren't using WorkOS itself, so you can keep working in other apps. It restarts in a few seconds with your workspace as it was. Updates are signed, and WorkOS refuses any file that isn't."
  },
  {
    q: "Is WorkOS free?",
    a: "Every feature is free for 30 days, with no card needed. After that, a plan unlocks it: $6 a month, $48 a year or $99 once. You paste your license code into WorkOS; it works offline and isn't tied to an account."
  },
  {
    q: "Does WorkOS start with Windows?",
    a: "Yes, if you want it to. WorkOS starts right after you sign in and is ready in a moment. You can turn this off in Settings.",
  },
  {
    q: "Does WorkOS support Windows?",
    a: "Yes. WorkOS is built for Windows 10 and Windows 11 (64-bit), and every feature is designed for Windows first.",
  },
  {
    q: "Is WorkOS available for macOS?",
    a: "Not yet. An early macOS version is in development, but it isn't available for download and some features, such as media controls, aren't supported there yet.",
  },
  {
    q: "Is WorkOS available for Linux?",
    a: "Not yet. Linux support is not available in the current version.",
  },
  {
    q: "Can I customize the WorkOS theme?",
    a: "Yes. WorkOS ships with eight themes (Midnight, Aurora, Ocean, Purple, Sunset, Minimal, Glass and AMOLED) and you can adjust the accent colour, opacity, blur, border, corner radius, width, animation level and background style. Themes can also apply a matching wallpaper, only after asking you.",
  },
];
