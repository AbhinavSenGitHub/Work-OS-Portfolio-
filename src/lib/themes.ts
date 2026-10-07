import type { CSSProperties } from "react";

/**
 * Theme tokens mirror the WorkOS app (src/island/themes.ts) exactly, so the
 * previews on this site render with the same values the app ships with.
 * Components never hardcode colours: they read the CSS variables produced by
 * `themeVars()`.
 */
export interface ThemeTokens {
  base: string;
  baseEnd: string;
  text: string;
  accent: string;
  background: "solid" | "gradient" | "glass";
  opacity: number;
  blur: number;
  border: number;
  radius: number;
  iconStyle: "thin" | "regular" | "bold";
  animation: "low" | "medium" | "high";
  wallpaper: [string, string, string, string] | null;
}

export type ThemeCategory = "Featured" | "Dark" | "Minimal" | "Developer" | "Colorful" | "OLED";

export interface ThemeFaq {
  q: string;
  a: string;
}

export interface Theme {
  slug: string;
  name: string;
  /** The in-app description, verbatim. */
  appDescription: string;
  categories: ThemeCategory[];
  tokens: ThemeTokens;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  character: string[];
  bestFor: string[];
  faq: ThemeFaq[];
}

export const THEMES: Theme[] = [
  {
    slug: "midnight",
    name: "Midnight",
    appDescription: "Black glass, quiet blue accent",
    categories: ["Featured", "Dark", "Developer"],
    tokens: {
      base: "#0d0e12", baseEnd: "#060709", text: "#f3f4f7", accent: "#4f8cff",
      background: "gradient", opacity: 0.96, blur: 14, border: 0.35, radius: 26,
      iconStyle: "regular", animation: "medium",
      wallpaper: ["#0b1020", "#020308", "#1d3a8a", "#0e1a44"],
    },
    seoTitle: "Midnight Theme for WorkOS | Dark Developer Workspace",
    metaDescription:
      "Explore WorkOS Midnight, the default dark theme: near-black glass with a quiet blue accent, built for developers who want a calm, distraction-free desktop workspace.",
    h1: "Midnight: the quiet, dark default",
    intro:
      "Midnight is the theme WorkOS starts with. The Work Island and its expanded panel sit on a near-black gradient that fades from #0d0e12 to #060709, with a single restrained blue accent for the things that matter: the active workspace, progress and primary actions.",
    character: [
      "Near-opaque pill (96%) with a light 14px frost, so the island stays readable over any wallpaper.",
      "Medium motion: expanding and switching feel responsive without drawing the eye.",
      "Optional deep-navy wallpaper that matches the panel, rendered locally on your machine if you choose to apply it.",
    ],
    bestFor: [
      "Long coding sessions in dark editors like VS Code or Cursor",
      "Developers who want the island to disappear until it is needed",
      "Setups with mixed wallpapers where contrast has to stay predictable",
    ],
    faq: [
      { q: "Is Midnight the default WorkOS theme?", a: "Yes. A fresh install of WorkOS uses Midnight until you pick another preset in the Themes page of the Work Island." },
      { q: "Can I change Midnight's accent colour?", a: "Yes. Every preset is a starting point: you can change the accent, pill opacity, blur, border, corner radius, width, animation level and background style after selecting it." },
    ],
  },
  {
    slug: "aurora",
    name: "Aurora",
    appDescription: "Dark glass with green–blue lights",
    categories: ["Featured", "Dark", "Colorful"],
    tokens: {
      base: "#0a1412", baseEnd: "#05080c", text: "#eefaf5", accent: "#3ddc97",
      background: "gradient", opacity: 0.93, blur: 18, border: 0.4, radius: 26,
      iconStyle: "regular", animation: "high",
      wallpaper: ["#04121a", "#02060a", "#12b886", "#2f6fdb"],
    },
    seoTitle: "Aurora Theme for WorkOS | Green and Teal Dark Workspace",
    metaDescription:
      "WorkOS Aurora pairs dark glass with green and blue light. See how the Work Island, workspaces, clipboard and media look in this atmospheric developer theme.",
    h1: "Aurora: dark glass with green–blue light",
    intro:
      "Aurora gives the Work Island a slightly deeper frost and a mint-green accent that reads clearly against its green-black gradient. It is the most atmospheric of the dark presets and the one this website borrows its colours from.",
    character: [
      "93% pill opacity with an 18px blur, so a hint of the desktop shows through the island.",
      "High motion setting for livelier expand and switch transitions.",
      "Optional wallpaper with green and blue glows that continue the panel's light into the desktop.",
    ],
    bestFor: [
      "People who like a bit of colour without leaving dark mode",
      "Desktop setups where the island sits over a dark wallpaper",
      "Anyone who wants running workspaces to stand out with a bright status dot",
    ],
    faq: [
      { q: "Does Aurora change my wallpaper automatically?", a: "No. WorkOS only applies a theme wallpaper after asking you, and it can restore your own wallpaper at any time." },
      { q: "Is Aurora harder on performance than a solid theme?", a: "Aurora uses a backdrop blur on the pill, which is handled by the system compositor. If you prefer no blur at all, the Minimal and AMOLED presets use solid backgrounds." },
    ],
  },
  {
    slug: "ocean",
    name: "Ocean",
    appDescription: "Deep blue with cyan",
    categories: ["Dark", "Developer", "Colorful"],
    tokens: {
      base: "#08121a", baseEnd: "#04080d", text: "#eef8ff", accent: "#22c3ee",
      background: "gradient", opacity: 0.94, blur: 16, border: 0.38, radius: 26,
      iconStyle: "regular", animation: "medium",
      wallpaper: ["#031424", "#01060c", "#0891b2", "#1e40af"],
    },
    seoTitle: "Ocean Theme for WorkOS | Deep Blue Developer Workspace",
    metaDescription:
      "WorkOS Ocean combines deep blue panels with a cyan accent. Preview the Work Island, workspace switcher and system cards in this cool, focused developer theme.",
    h1: "Ocean: deep blue with a cyan edge",
    intro:
      "Ocean moves the WorkOS panel into deep blue and uses cyan for accents and progress. It keeps the calm of Midnight but with a cooler, more saturated tone that pairs well with blue-leaning editor themes.",
    character: [
      "Blue-black gradient from #08121a to #04080d under a 16px frost.",
      "Cyan accent (#22c3ee) for the active workspace, download progress and primary buttons.",
      "Optional wallpaper with teal and cobalt glows.",
    ],
    bestFor: [
      "Editor themes like One Dark, Tokyo Night or GitHub Dark",
      "People who find pure black panels too stark",
      "Multi-monitor desks with cool-toned wallpapers",
    ],
    faq: [
      { q: "How is Ocean different from Midnight?", a: "Both are dark gradients. Midnight is closer to neutral black with a soft blue accent, while Ocean tints the whole panel blue and uses a brighter cyan accent." },
      { q: "Can I use Ocean with a glass background?", a: "Yes. The background style (solid, gradient or glass) is an adjustment you can change after picking any preset." },
    ],
  },
  {
    slug: "purple",
    name: "Purple",
    appDescription: "Violet night",
    categories: ["Dark", "Colorful"],
    tokens: {
      base: "#110c18", baseEnd: "#07050b", text: "#f6f1ff", accent: "#a36bff",
      background: "gradient", opacity: 0.95, blur: 14, border: 0.36, radius: 26,
      iconStyle: "regular", animation: "medium",
      wallpaper: ["#12081f", "#05030a", "#7c3aed", "#c026d3"],
    },
    seoTitle: "Purple Theme for WorkOS | Violet Dark Desktop Workspace",
    metaDescription:
      "WorkOS Purple is a violet night theme for the Work Island. Explore how workspaces, clipboard history, notes and media controls look with its soft violet accent.",
    h1: "Purple: a violet night for your desktop",
    intro:
      "Purple wraps the Work Island in a violet-black gradient with a lavender accent. It is the warmest of the cool presets and a good match for purple editor themes and evening work.",
    character: [
      "Violet-black gradient with 95% opacity and a 14px frost.",
      "Lavender accent (#a36bff) that stays legible on dark surfaces.",
      "Optional wallpaper with violet and magenta glows.",
    ],
    bestFor: [
      "Dracula, Shades of Purple and similar editor themes",
      "Late-evening sessions where a softer accent feels easier",
      "People who want a personal look while keeping the panel dark",
    ],
    faq: [
      { q: "Is there a light version of Purple?", a: "Not currently. All eight WorkOS presets are dark or monochrome. You can raise the accent brightness, but there is no light theme yet." },
      { q: "Will Purple change colours inside my other apps?", a: "No. WorkOS themes only style the Work Island and its panel, plus an optional wallpaper you choose to apply." },
    ],
  },
  {
    slug: "sunset",
    name: "Sunset",
    appDescription: "Warm orange and pink",
    categories: ["Colorful", "Dark"],
    tokens: {
      base: "#160d0e", baseEnd: "#0a0608", text: "#fff4ef", accent: "#ff7a59",
      background: "gradient", opacity: 0.95, blur: 14, border: 0.35, radius: 26,
      iconStyle: "regular", animation: "medium",
      wallpaper: ["#1a0b14", "#07040a", "#ff6a3d", "#d6336c"],
    },
    seoTitle: "Sunset Theme for WorkOS | Warm Orange Desktop Workspace",
    metaDescription:
      "WorkOS Sunset brings warm orange and pink to a dark Work Island. See the theme applied to workspaces, downloads, media and the expanded panel.",
    h1: "Sunset: warm light on a dark panel",
    intro:
      "Sunset is the warm preset. A dark, slightly red-tinted gradient carries a coral accent that makes active workspaces, playback and progress feel friendly without becoming loud.",
    character: [
      "Warm near-black gradient from #160d0e to #0a0608.",
      "Coral accent (#ff7a59) for status, progress and primary buttons.",
      "Optional wallpaper with orange and pink glows.",
    ],
    bestFor: [
      "Warm editor palettes like Gruvbox or Monokai",
      "Displays with night-light or reduced blue light enabled",
      "Anyone who wants the desktop to feel less clinical",
    ],
    faq: [
      { q: "Does Sunset work with night light on Windows?", a: "Yes. Sunset's warm accent stays distinguishable when Windows night light shifts the display toward warmer colours." },
      { q: "Can I keep Sunset's colours but remove the blur?", a: "Yes. Set blur to 0 and opacity to 100% in the theme adjustments to get a solid Sunset panel." },
    ],
  },
  {
    slug: "minimal",
    name: "Minimal",
    appDescription: "Monochrome, nothing extra",
    categories: ["Featured", "Minimal", "Developer"],
    tokens: {
      base: "#111112", baseEnd: "#111112", text: "#ededed", accent: "#d4d4d8",
      background: "solid", opacity: 1, blur: 0, border: 0.22, radius: 18,
      iconStyle: "thin", animation: "low",
      wallpaper: ["#161618", "#0b0b0c", "#2a2a2e", "#1c1c1f"],
    },
    seoTitle: "Minimal Theme for WorkOS | Monochrome Developer Workspace",
    metaDescription:
      "WorkOS Minimal is a solid monochrome theme with thin icons, tighter corners and low motion. Preview a distraction-free Work Island for focused development.",
    h1: "Minimal: monochrome, nothing extra",
    intro:
      "Minimal removes everything decorative. The panel is a solid #111112 with no blur, the accent is a neutral grey, icons use a thin stroke and corners tighten to 18px. Motion is set to low.",
    character: [
      "Solid background with 100% opacity and no backdrop blur.",
      "Thin 1.3px icon strokes and an 18px corner radius for a sharper silhouette.",
      "Low animation: transitions are short and subtle.",
    ],
    bestFor: [
      "Developers who treat colour as a signal, not decoration",
      "Presentations and screen sharing where a neutral UI is safer",
      "Lower-powered machines where you want to avoid blur",
    ],
    faq: [
      { q: "Is Minimal the most lightweight theme?", a: "Minimal and AMOLED both use solid backgrounds with no blur and low motion, which keeps rendering as simple as possible." },
      { q: "Can I add a colour accent to Minimal?", a: "Yes. The accent is adjustable on every preset, so you can keep Minimal's solid surface and thin icons with a coloured accent." },
    ],
  },
  {
    slug: "glass",
    name: "Glass",
    appDescription: "See-through, frosted",
    categories: ["Featured", "Colorful"],
    tokens: {
      base: "#1a1d24", baseEnd: "#0e1015", text: "#ffffff", accent: "#7dd3fc",
      background: "glass", opacity: 0.62, blur: 28, border: 0.7, radius: 28,
      iconStyle: "regular", animation: "high",
      wallpaper: null,
    },
    seoTitle: "Glass Theme for WorkOS | Frosted Translucent Workspace",
    metaDescription:
      "WorkOS Glass is a frosted, see-through theme with a heavy blur and bright borders. See how a translucent Work Island looks over your desktop.",
    h1: "Glass: see-through and frosted",
    intro:
      "Glass is the most translucent preset. The pill drops to 62% opacity behind a 28px frost, borders are brighter so edges stay defined, and the corners round out to 28px. It is designed to let your own wallpaper do the work.",
    character: [
      "62% pill opacity and a strong 28px blur.",
      "Brighter borders and raised surfaces so cards stay readable on busy backgrounds.",
      "No theme wallpaper: Glass is meant to sit over the wallpaper you already have.",
    ],
    bestFor: [
      "Personal wallpapers and photography",
      "People who want the island to feel part of the desktop",
      "Setups with a single, uncluttered display",
    ],
    faq: [
      { q: "Is Glass readable on bright wallpapers?", a: "Glass raises border and surface contrast to compensate for translucency. On very bright or busy wallpapers you can raise the opacity in theme adjustments." },
      { q: "Why doesn't Glass include a wallpaper?", a: "Glass is intentionally designed to show your own wallpaper through the frost, so it does not ship with one." },
    ],
  },
  {
    slug: "amoled",
    name: "AMOLED",
    appDescription: "Pure black, no transparency",
    categories: ["OLED", "Minimal", "Dark"],
    tokens: {
      base: "#000000", baseEnd: "#000000", text: "#ffffff", accent: "#4cd98a",
      background: "solid", opacity: 1, blur: 0, border: 0.18, radius: 24,
      iconStyle: "bold", animation: "low",
      wallpaper: ["#000000", "#000000", "#0a0a0a", "#050505"],
    },
    seoTitle: "AMOLED Theme for WorkOS | True Black OLED Workspace",
    metaDescription:
      "WorkOS AMOLED is a true-black theme with no transparency, bold icons and a green accent. Built for OLED displays and maximum contrast.",
    h1: "AMOLED: true black, no transparency",
    intro:
      "AMOLED paints the Work Island pure #000000 with no transparency and no blur. On OLED displays, black pixels are off, so the panel blends into a black desktop and only text, icons and the green accent remain lit.",
    character: [
      "Pure black, fully opaque surface with faint borders.",
      "Bold 2.1px icon strokes for maximum legibility against black.",
      "Green accent (#4cd98a) and low motion.",
    ],
    bestFor: [
      "OLED laptops and monitors",
      "Maximum text contrast",
      "Dark rooms and late-night work",
    ],
    faq: [
      { q: "Does AMOLED save battery?", a: "On OLED displays, pure black pixels are turned off, which can reduce power use compared with grey surfaces. On LCD displays there is no power difference." },
      { q: "Is AMOLED good for burn-in?", a: "A black panel with small lit elements is generally gentler on OLED than bright static UI, but the Work Island is still a persistent element. WorkOS hides it during fullscreen video and games." },
    ],
  },
];

export const THEME_CATEGORIES: ("All" | ThemeCategory)[] = ["All", "Featured", "Dark", "Minimal", "Developer", "Colorful", "OLED"];

export const getTheme = (slug: string) => THEMES.find((t) => t.slug === slug);
export const defaultTheme = THEMES[0];
export const siteTheme = THEMES[1]; // Aurora — the site's own accent

const rgb = (hex: string) => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
};
export const rgba = (hex: string, a: number) => `rgba(${rgb(hex).join(",")},${a})`;

const stroke = { thin: 1.3, regular: 1.6, bold: 2.1 } as const;
const duration = { low: "140ms", medium: "220ms", high: "320ms" } as const;

/** Same derivation as the app's `themeVars`, plus a glow token for the site. */
export function themeVars(t: ThemeTokens): CSSProperties {
  const glass = t.background === "glass";
  const panel =
    t.background === "solid"
      ? `linear-gradient(180deg, ${t.base}, ${t.base})`
      : `radial-gradient(120% 90% at 0% 0%, ${rgba(t.accent, glass ? 0.1 : 0.08)}, transparent 60%), linear-gradient(180deg, ${t.base}, ${t.baseEnd})`;
  const pill =
    t.background === "solid"
      ? rgba(t.base, t.opacity)
      : `radial-gradient(120% 90% at 0% 0%, ${rgba(t.accent, glass ? 0.1 : 0.08)}, transparent 60%), linear-gradient(180deg, ${rgba(t.base, t.opacity)}, ${rgba(t.baseEnd, t.opacity)})`;
  const [w0, w1, g0, g1] = t.wallpaper ?? ["#2a3140", "#10131a", t.accent, "#6d7890"];
  return {
    "--cap-base": t.base,
    "--cap-text": t.text,
    "--cap-muted": rgba(t.text, 0.62),
    "--cap-dim": rgba(t.text, 0.4),
    "--cap-accent": t.accent,
    "--cap-accent-soft": rgba(t.accent, 0.16),
    "--cap-accent-line": rgba(t.accent, 0.55),
    "--cap-glow": rgba(t.accent, 0.28),
    "--cap-line": `rgba(255,255,255,${(0.03 + t.border * 0.17).toFixed(3)})`,
    "--cap-raised": glass ? "rgba(255,255,255,.09)" : "rgba(255,255,255,.055)",
    "--cap-hover": glass ? "rgba(255,255,255,.13)" : "rgba(255,255,255,.08)",
    "--cap-pill": pill,
    "--cap-panel": panel,
    "--cap-blur": `${t.blur}px`,
    "--cap-radius": `${t.radius}px`,
    "--cap-stroke": String(stroke[t.iconStyle]),
    "--cap-dur": duration[t.animation],
    "--cap-wall": `radial-gradient(60% 50% at 20% 15%, ${rgba(g0, 0.55)}, transparent 70%), radial-gradient(55% 45% at 85% 80%, ${rgba(g1, 0.5)}, transparent 70%), linear-gradient(180deg, ${w0}, ${w1})`,
  } as CSSProperties;
}
