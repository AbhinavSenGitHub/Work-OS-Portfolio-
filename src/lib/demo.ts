/**
 * Sample content for the interface previews. Apps are drawn as neutral
 * lettered tiles rather than vendor logos.
 */

export interface DemoApp {
  name: string;
  short: string;
  color: string;
  context?: string;
}

export const APPS = {
  vscode: { name: "VS Code", short: "VS", color: "#2f7fd8", context: "~/acme" },
  chrome: { name: "Chrome", short: "Ch", color: "#e0a526", context: "Profile · Work" },
  terminal: { name: "Terminal", short: ">_", color: "#3a3f4b", context: "~/acme/api" },
  claude: { name: "Claude", short: "Cl", color: "#d97757" },
  postman: { name: "Postman", short: "Pm", color: "#ef5b25" },
  spotify: { name: "Spotify", short: "Sp", color: "#1db954" },
  explorer: { name: "Explorer", short: "Ex", color: "#d6a22d", context: "Documents\\Taxes" },
  slack: { name: "Slack", short: "Sl", color: "#7c3a8c" },
  teams: { name: "Teams", short: "Te", color: "#5b5fc7" },
  figma: { name: "Figma", short: "Fi", color: "#a259ff" },
  obsidian: { name: "Obsidian", short: "Ob", color: "#7c5bd9" },
  cursor: { name: "Cursor", short: "Cu", color: "#4b5563", context: "~/course/rust-book" },
  docker: { name: "Docker", short: "Dk", color: "#1d63ed" },
  database: { name: "DB client", short: "DB", color: "#336791" },
  word: { name: "Word", short: "W", color: "#2b579a" },
} satisfies Record<string, DemoApp>;

export interface DemoWorkspace {
  id: string;
  name: string;
  description: string;
  apps: DemoApp[];
}

export const WORKSPACES: DemoWorkspace[] = [
  {
    id: "winit",
    name: "Acme",
    description: "Product work: editor on the repo, API terminal, docs in Chrome.",
    apps: [APPS.vscode, APPS.chrome, APPS.terminal, APPS.claude, APPS.postman],
  },
  {
    id: "personal",
    name: "Personal",
    description: "Music, personal browser profile and a folder of paperwork.",
    apps: [APPS.chrome, APPS.spotify, APPS.explorer],
  },
  {
    id: "freelance",
    name: "Freelance",
    description: "Client chat, design files and the client's repository.",
    apps: [APPS.slack, APPS.figma, APPS.vscode, APPS.chrome],
  },
  {
    id: "learning",
    name: "Learning",
    description: "A course repo in Cursor, notes and reference tabs.",
    apps: [APPS.cursor, APPS.obsidian, APPS.chrome],
  },
  {
    id: "client-a",
    name: "Client A",
    description: "Meetings and documents for one client, kept separate.",
    apps: [APPS.teams, APPS.word, APPS.chrome, APPS.explorer],
  },
];

export const CLIPBOARD = [
  { kind: "Code", text: "const token = jwt.sign({ sub: user.id }, SECRET, { expiresIn: \"15m\" });", age: "just now" },
  { kind: "Link", text: "https://github.com/rust-windowing/winit/issues", age: "2m" },
  { kind: "Image", text: "Screenshot 2026-09-28 142211.png", age: "6m" },
  { kind: "Text", text: "Refresh tokens are rotated on every use and revoked on logout.", age: "14m" },
  { kind: "File", text: "invoice-client-a-sept.pdf", age: "32m" },
  { kind: "Folder", text: "D:\\projects\\winit\\crates", age: "1h" },
] as const;

export const DOWNLOADS = [
  { name: "winit-release-notes.pdf", type: "PDF", size: "412 KB", age: "Downloading", progress: 72 },
  { name: "wireframe-v3.png", type: "PNG", size: "1.8 MB", age: "just now", isNew: true },
  { name: "dataset-sample.zip", type: "ZIP", size: "24.6 MB", age: "5m" },
  { name: "node-v22-x64.msi", type: "MSI", size: "30.1 MB", age: "1h" },
  { name: "demo-recording.mp4", type: "MP4", size: "84 MB", age: "yesterday" },
] as const;

export const NOTES = [
  { title: "Auth refactor", body: "Move token refresh into middleware.\nRotate refresh tokens on every use.\nCheck clock skew on the Windows runner.", age: "2m" },
  { title: "Standup", body: "Yesterday: island DPI fix. Today: workspace learning undo.", age: "1h" },
  { title: "Client A call", body: "Wants export as CSV. Follow up Friday.", age: "Tue" },
] as const;

export const NOW_PLAYING = { title: "Deep Focus Mix", artist: "Lo-fi Radio", source: "Spotify" };
