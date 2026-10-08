export type FeatureStatus = "available" | "in-development" | "planned";

export const featureStatusLabel: Record<FeatureStatus, string> = {
  available: "Available",
  "in-development": "In development",
  planned: "Planned",
};

export type PreviewKind =
  | "clipboard"
  | "notes"
  | "screenshots"
  | "downloads"
  | "media"
  | "system"
  | "workspace"
  | "claude";

export interface Feature {
  slug: string;
  name: string;
  status: FeatureStatus;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  lede: string;
  preview: PreviewKind;
  useCases: { title: string; body: string }[];
  details: { title: string; body: string; status?: FeatureStatus }[];
  faq: { q: string; a: string }[];
  related: { href: string; label: string }[];
}

export const FEATURES: Feature[] = [
  {
    slug: "workspace-memory",
    name: "Workspace memory",
    status: "available",
    seoTitle: "WorkOS Workspace Memory — Restore Your Development Context",
    metaDescription:
      "WorkOS remembers the context of each workspace: the folder your editor had open, your terminal's working directory, your Chrome profile and tabs. Start work and pick up where you left off.",
    h1: "Pick up exactly where you left off",
    lede:
      "Each WorkOS workspace remembers more than a list of apps. When you start work, your editor reopens the project folder, the terminal opens in the right directory and Chrome comes back with the right profile and tabs.",
    preview: "workspace",
    useCases: [
      { title: "Monday morning restart", body: "Start the Acme workspace and VS Code opens ~/acme, Windows Terminal opens in the API folder and Chrome comes back on the work profile." },
      { title: "Switching clients", body: "Each client workspace keeps its own browser profile and tabs, so client A's dashboards never appear in client B's session." },
      { title: "Returning to a side project", body: "Weeks later, Start Work brings back the course repository and the reference tabs you had open, instead of an empty editor." },
    ],
    details: [
      { title: "Editor project folders", body: "Captures the open folder for VS Code, VS Code Insiders, Cursor, Windsurf and VSCodium, and reopens it when the workspace starts." },
      { title: "Terminal working directories", body: "Remembers the working directory for Windows Terminal, PowerShell, pwsh, cmd, bash and nu." },
      { title: "File Explorer folders", body: "Explorer windows reopen on the folder they were showing." },
      { title: "Chrome profile per workspace", body: "Each workspace can open Chrome with its own profile." },
      { title: "Chrome tabs per workspace", body: "With the WorkOS Browser Context extension, WorkOS saves the tabs of a workspace (URL, title, order and pinned state) and restores them. The extension talks to WorkOS locally and is currently installed manually, not from the Chrome Web Store." },
      { title: "Learns what belongs where", body: "When a new window appears, WorkOS can suggest adding that app to the current workspace, or add it automatically with an Undo toast." },
      { title: "Ready on first launch", body: "On a fresh install, every app you already have open goes into \"My Workspace\" at once, with its folder and context." },
      { title: "One window per project", body: "Open the same project in a second workspace and WorkOS reuses the window that's already open, shared by both workspaces, instead of opening a copy." },
      { title: "Which folder is which", body: "When you start a workspace, each app shows the folder or project it will open, so three VS Code windows are easy to tell apart." },
      { title: "Nothing is guessed", body: "If WorkOS can't confirm an app's context, it launches the app as configured instead of guessing. Window positions and sizes are not restored today." },
    ],
    faq: [
      { q: "Does WorkOS restore window positions?", a: "Not currently. WorkOS restores which apps belong to a workspace and their context (project folder, terminal directory, Chrome profile and tabs), but not window size or position." },
      { q: "Which editors does WorkOS support?", a: "Project-folder capture works with VS Code, VS Code Insiders, Cursor, Windsurf and VSCodium. Other apps are still launched and switched, just without folder context." },
      { q: "Is the Chrome extension required?", a: "Only for saving and restoring tabs. Chrome profiles per workspace work without it." },
    ],
    related: [
      { href: "/workspaces", label: "How WorkOS workspaces work" },
      { href: "/features/claude-code", label: "WorkOS for Claude Code users" },
      { href: "/download", label: "Download WorkOS" },
    ],
  },
  {
    slug: "clipboard",
    name: "Clipboard",
    status: "available",
    seoTitle: "WorkOS Clipboard — Clipboard History for Developers",
    metaDescription:
      "WorkOS keeps a local history of everything you copy: text, code, links, files, folders and images. Open it with Win+Shift+V and click any item to copy it again.",
    h1: "Everything you copied, ready when you need it",
    lede:
      "WorkOS records what you copy and keeps it one shortcut away. Code snippets, links, file paths, whole folders and images each get their own card, stored locally on your computer.",
    preview: "clipboard",
    useCases: [
      { title: "Moving between editor and browser", body: "Copy a token, an error message and a URL in a row, then paste each one where it belongs without switching back." },
      { title: "Re-using a snippet", body: "The command or code block you copied an hour ago is still there. Click the card to put it back on the clipboard." },
      { title: "Collecting evidence", body: "Copied screenshots and images are kept as images, not lost the moment you copy something else." },
    ],
    details: [
      { title: "Every kind of copy", body: "Text, links, code, files and folders, and images. Each type has its own card." },
      { title: "One shortcut", body: "Win+Shift+V opens the clipboard page of the Work Island. The shortcut can be changed." },
      { title: "Click to copy again", body: "Selecting a card puts it back on the system clipboard." },
      { title: "You stay in control", body: "Remove single items, clear everything or pause recording when you're handling something sensitive." },
      { title: "Sensible limits", body: "By default WorkOS keeps 50 items for 30 days. Images are stored as PNG files in the app's data folder." },
      { title: "Search", body: "Searching clipboard history is not available yet.", status: "planned" },
    ],
    faq: [
      { q: "Where is clipboard history stored?", a: "On your computer: entries are kept in WorkOS's local database and images as PNG files in the app data folder. Nothing is uploaded." },
      { q: "Can I stop WorkOS recording my clipboard?", a: "Yes. You can pause recording at any time, remove individual items or clear the whole history." },
      { q: "Does it replace the Windows clipboard history?", a: "WorkOS uses Win+Shift+V by default so it doesn't collide with Windows' own Win+V history. You can use either, or change the shortcut." },
    ],
    related: [
      { href: "/work-island", label: "The Work Island" },
      { href: "/features/notes", label: "Notes" },
      { href: "/features/screenshots", label: "Screenshots" },
    ],
  },
  {
    slug: "notes",
    name: "Notes",
    status: "available",
    seoTitle: "WorkOS Notes — Quick Local Notes for Your Work",
    metaDescription:
      "WorkOS Notes gives you fast, autosaving notes one shortcut away, with formatting, screenshots inside notes, PDF export, search and optional notes per workspace. Everything is stored locally on your computer.",
    h1: "Capture the thought before it's gone",
    lede:
      "Notes live inside the Work Island, so writing something down never means finding a window. Notes autosave as you type, can mix text with screenshots, are searchable, and can be kept per workspace so each project has its own scratchpad.",
    preview: "notes",
    useCases: [
      { title: "Debugging trail", body: "Write down what you tried, the error you saw and the fix, while it's still in front of you." },
      { title: "Standup notes", body: "Keep yesterday/today in one note and open it in a second when the meeting starts." },
      { title: "Per-project scratchpad", body: "Workspace notes keep client A's reminders out of your personal project." },
    ],
    details: [
      { title: "Autosave", body: "Notes save automatically shortly after you stop typing. Ctrl+S saves immediately and Ctrl+N starts a new note." },
      { title: "Search", body: "The note list has a search box so older notes are easy to find." },
      { title: "Per-workspace notes", body: "Optionally scope notes to the workspace you're working in." },
      { title: "Stored locally", body: "Notes are kept in WorkOS's local database on your computer." },
      { title: "Images between paragraphs", body: "Paste or drag screenshots into a note, between your paragraphs, and resize them by their corner." },
      { title: "Formatting", body: "A toolbar for text colour, highlight and alignment." },
      { title: "Bigger when you write", body: "Expand a note into a larger writing panel, centred on your screen; drag its corner to resize it." },
      { title: "Save as PDF", body: "Save any note, images included, as a PDF wherever you choose." },
    ],
    faq: [
      { q: "Can I paste screenshots into notes?", a: "Yes. Paste or drag a screenshot into a note, or drag one in from the Screenshots page." },
      { q: "Do notes sync between computers?", a: "No. Notes are stored locally and there is no account or sync service." },
      { q: "Is there a size limit?", a: "Each note can hold up to 20,000 characters." },
    ],
    related: [
      { href: "/features/screenshots", label: "Screenshot history" },
      { href: "/features/clipboard", label: "Clipboard history" },
      { href: "/workspaces", label: "Workspaces" },
    ],
  },
  {
    slug: "screenshots",
    name: "Screenshots",
    status: "available",
    seoTitle: "WorkOS Screenshots — Organize and Reuse Screenshots While Coding",
    metaDescription:
      "WorkOS keeps your latest screenshots newest first in the Work Island, ready to drag into an issue or chat, or into a note.",
    h1: "Your latest screenshots, always within reach",
    lede:
      "Screenshots are evidence: the bug, the design, the error. WorkOS keeps a screenshot history in the Work Island, so the one you just took is never buried in a folder.",
    preview: "screenshots",
    useCases: [
      { title: "Filing a bug", body: "Take a screenshot, open the island and drag it straight into the issue." },
      { title: "Design feedback", body: "Collect a few screenshots while reviewing and attach them to a note with your comments." },
      { title: "Finding yesterday's capture", body: "Scroll the history instead of searching the Pictures folder for a file name." },
    ],
    details: [
      { title: "Screenshot history", body: "Your screenshots, newest first: the latest one large, older ones below." },
      { title: "Just captured", body: "Right after you take a screenshot, the island shows a small badge so you know it's ready to use." },
      { title: "Drag out of WorkOS", body: "Drag a screenshot from the island into any app that accepts files: chat, an issue, an email." },
      { title: "Add to a note", body: "Drop a screenshot into a note, right next to your explanation." },
      { title: "Screenshot quick action", body: "The System and Home pages have a Screenshot button that opens the Windows screenshot tool." },
    ],
    faq: [
      { q: "Is screenshot history available now?", a: "Yes. Open the Screenshots page of the Work Island to see your latest screenshots, newest first." },
      { q: "Will screenshots be uploaded anywhere?", a: "No. Screenshots stay in their folder on your computer; WorkOS only reads them locally." },
    ],
    related: [
      { href: "/features/notes", label: "Notes" },
      { href: "/features/clipboard", label: "Clipboard history" },
      { href: "/work-island", label: "The Work Island" },
    ],
  },
  {
    slug: "downloads",
    name: "Downloads",
    status: "available",
    seoTitle: "WorkOS Downloads — A Visual Shelf for Recent Downloads",
    metaDescription:
      "WorkOS watches your Downloads folder and shows recent files with previews, type, size and age. Open a file, show it in its folder or copy its path, and see download progress in the Work Island.",
    h1: "Recent downloads, without opening Explorer",
    lede:
      "WorkOS keeps a visual shelf of what just landed in your Downloads folder. While a download runs, its progress sits quietly in the Work Island; when it finishes, it's one click to open.",
    preview: "downloads",
    useCases: [
      { title: "Grabbing an installer", body: "Watch the percentage in the island while you keep working, then open the file from the shelf." },
      { title: "Moving a design asset", body: "Copy the path of the PNG you just downloaded and paste it into your project." },
      { title: "Finding what you downloaded earlier", body: "Previews make the right PDF obvious without reading file names." },
    ],
    details: [
      { title: "Live Downloads folder", body: "WorkOS watches your Downloads folder and updates the shelf as files arrive." },
      { title: "Previews", body: "Tiles show a thumbnail (including PDF page previews on Windows), file name, type, size and age, with a New marker for fresh files." },
      { title: "Actions", body: "Open, Show in folder, Copy path, or remove a file from the recent list." },
      { title: "Progress in the island", body: "The Work Island shows download progress and a brief check mark when it completes. With the Chrome extension, Chrome downloads report progress too." },
    ],
    faq: [
      { q: "Does WorkOS move or delete my downloads?", a: "No. Removing a file from the shelf only hides it from the recent list; the file stays in your Downloads folder." },
      { q: "Does it work with browsers other than Chrome?", a: "The shelf works with any file that lands in the Downloads folder. Live progress from the browser currently comes from the Chrome extension." },
    ],
    related: [
      { href: "/work-island", label: "Work Island states" },
      { href: "/pulse", label: "Pulse attention signals" },
      { href: "/download", label: "Download WorkOS" },
    ],
  },
  {
    slug: "media",
    name: "Media",
    status: "available",
    seoTitle: "WorkOS Media — Now Playing and Playback Controls on Windows",
    metaDescription:
      "WorkOS shows what's playing and lets you play, pause and skip from the Work Island, using Windows' system media controls. Adjust or mute system volume without leaving your work.",
    h1: "Control your music without leaving your editor",
    lede:
      "When something is playing, the Work Island shows a small equalizer. Open it to see the track and control playback. It works with any app that reports to Windows' media controls.",
    preview: "media",
    useCases: [
      { title: "Skip a track mid-flow", body: "Skip without alt-tabbing to the music app and losing your place." },
      { title: "Pause for a call", body: "Pause playback and mute from the same panel." },
      { title: "At a glance", body: "The equalizer in the island tells you something is playing, even when the app is hidden in another workspace." },
    ],
    details: [
      { title: "Now playing", body: "Title, artist and source app from Windows' Global System Media Transport Controls." },
      { title: "Playback", body: "Play, pause, previous and next." },
      { title: "Volume", body: "System volume and mute." },
      { title: "Platform support", body: "Media controls are available on Windows. They are not yet supported on macOS." },
    ],
    faq: [
      { q: "Which music apps work?", a: "Any app that integrates with Windows' media controls, which includes most music players and browsers playing media." },
    ],
    related: [
      { href: "/work-island", label: "The Work Island" },
      { href: "/themes", label: "Themes" },
    ],
  },
  {
    slug: "system",
    name: "System",
    status: "available",
    seoTitle: "WorkOS System — CPU, Memory, Battery and Updates at a Glance",
    metaDescription:
      "WorkOS shows CPU, memory, GPU and network activity, memory per app, battery and Windows Update status in the Work Island, plus a stopwatch, timer and calculator.",
    h1: "Your system, summarized in one panel",
    lede:
      "WorkOS isn't a system monitor, but it keeps the essentials close: how busy your machine is, how much battery is left, and whether Windows is waiting for a restart.",
    preview: "system",
    useCases: [
      { title: "Is it the build or the laptop?", body: "Glance at CPU and memory while a build runs." },
      { title: "Restart when it suits you", body: "See when Windows Update needs a restart and open Update settings directly." },
      { title: "Unplugged work", body: "Battery level and charging state are always one glance away." },
    ],
    details: [
      { title: "CPU, memory and GPU", body: "Rings and sparklines sampled once a second, only while the page is visible." },
      { title: "Network", body: "Download and upload speed, plus an offline indicator." },
      { title: "Battery", body: "Percentage and charging state; a critical battery is surfaced in the island." },
      { title: "Windows Update", body: "Restart required, updates available or up to date, with a button to open Update settings." },
      { title: "PC usage per app", body: "Which apps use the most memory, including apps hidden in your other workspaces, with a Close or End button (it asks twice). Servers and developer tools are never offered for closing." },
      { title: "Quick actions", body: "Take a screenshot with the system tool or lock the PC." },
      { title: "Tools", body: "A stopwatch with laps, a timer with presets (like a 25-minute focus block) and a calculator, one click away in the island." },
    ],
    faq: [
      { q: "Does the System page slow my computer down?", a: "Metrics are sampled once a second and only while the page is open." },
    ],
    related: [
      { href: "/pulse", label: "Pulse attention signals" },
      { href: "/work-island", label: "The Work Island" },
    ],
  },
  {
    slug: "claude-code",
    name: "Claude Code",
    status: "available",
    seoTitle: "WorkOS for Claude Code — Usage, Sessions and Projects at a Glance",
    metaDescription:
      "See your Claude Code usage in the Work Island: the current 5-hour session, tokens today and this week, your account and plan, streak and activity. Keep Claude Code, your editor and terminals together in a workspace per project.",
    h1: "Claude Code sessions, organized by project",
    lede:
      "AI coding agents make context switching worse: several sessions, several terminals, several repos. WorkOS shows your Claude Code usage at a glance, keeps each agent session inside the workspace for its project, and restores the terminal in the right folder when you come back.",
    preview: "claude",
    useCases: [
      { title: "One agent per project", body: "Run Claude Code for Acme in the Acme workspace and for a client repo in that client's workspace. Switching hides the other terminals instead of mixing them together." },
      { title: "Resume tomorrow", body: "Start Work reopens your terminal in the project directory and your editor on the same folder." },
      { title: "Keep the evidence", body: "Clipboard history keeps the error, log line or snippet you copied from the agent's output." },
    ],
    details: [
      { title: "Current session", body: "How far into the current 5-hour Claude Code session you are, its tokens, and when it resets.", status: "available" },
      { title: "Tokens today and this week", body: "Today's tokens with a 7-day chart, plus prompts, tool calls and sessions.", status: "available" },
      { title: "Account and plan", body: "The Claude account and plan Claude Code is signed in with.", status: "available" },
      { title: "Streak and consistency", body: "Your daily streak and a 26-week activity grid, like a contribution graph.", status: "available" },
      { title: "Agent terminals in workspaces", body: "Add Windows Terminal, PowerShell or the Claude desktop app to a workspace like any other app.", status: "available" },
      { title: "Terminal directory restore", body: "The terminal's working directory is captured and restored when the workspace starts.", status: "available" },
      { title: "Attention in the Work Island", body: "Showing when a Claude Code session is waiting for input or permission, and jumping to that session, is planned. It is not part of the current version.", status: "planned" },
    ],
    faq: [
      { q: "Does WorkOS notify me when Claude Code needs attention?", a: "Not yet. This is planned, but the current version does not detect Claude Code session state." },
      { q: "Where does the usage come from?", a: "From Claude Code's own log files on your computer. WorkOS only reads them locally; nothing is uploaded and no Claude login is needed in WorkOS." },
      { q: "Does WorkOS send my code to an AI service?", a: "No. WorkOS has no AI features of its own and does not send your code anywhere." },
    ],
    related: [
      { href: "/workspaces", label: "Workspaces" },
      { href: "/pulse", label: "Pulse" },
      { href: "/features/workspace-memory", label: "Workspace memory" },
      { href: "/download", label: "Download WorkOS" },
    ],
  },
];

export const getFeature = (slug: string) => FEATURES.find((f) => f.slug === slug);

/** Top-level product pages that are not under /features. */
export const CORE_PAGES = [
  { href: "/workspaces", name: "Workspaces", blurb: "Persistent environments for every project. Switch without closing a thing.", status: "available" as FeatureStatus },
  { href: "/work-island", name: "Work Island", blurb: "A quiet pill at the top of your screen that expands into everything else.", status: "available" as FeatureStatus },
  { href: "/pulse", name: "Pulse", blurb: "The island's attention layer: downloads, updates, battery and suggestions.", status: "available" as FeatureStatus },
];
