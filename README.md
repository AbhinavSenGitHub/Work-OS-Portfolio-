# WorkOS website

Marketing site for WorkOS, the desktop workspace manager. Next.js 16 (App Router), TypeScript, Tailwind CSS 4. Fully static: every route is prerendered.

## Develop

```bash
npm install
cp .env.example .env.local   # then fill in what exists
npm run dev
```

`npm run build` type-checks and builds; `npx eslint src` lints.

## Configuration

All real-world facts come from environment variables (see `.env.example`), so the site never advertises something that doesn't exist:

| Variable | Effect when empty |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonicals/sitemap point at `http://localhost:3000` — **set before deploying** |
| `NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL` | Windows shows "Coming soon"; download buttons go to `/download` |
| `NEXT_PUBLIC_PRICING_STATUS` | "Pricing not announced yet" |
| Social / contact | Links are hidden |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` | No analytics script is loaded |

## Where things live

- `src/lib/themes.ts` — theme tokens (mirrors the app's `src/island/themes.ts`) and `themeVars()`, which turns a theme into the `--cap-*` CSS variables every preview component reads.
- `src/lib/features.ts`, `src/lib/faq.ts` — page content, with a status (`available` / `in-development` / `planned`) per feature.
- `src/components/island/` — HTML recreation of the Work Island (pill, launcher, expanded panel, pages). Styles are in `src/app/globals.css` under "WorkOS interface".
- `src/components/demos/` — interactive client components (hero, feature tabs, theme gallery, workspace switcher, Pulse).
- `src/lib/seo.ts` — metadata helper and JSON-LD builders. `src/lib/og.tsx` — OpenGraph image renderer.

## Keeping claims accurate

Feature status is set by hand from the app's source. When a feature ships (e.g. screenshot history, images in notes, clipboard search, Claude Code attention), update its `status` in `src/lib/features.ts` and the related FAQ answers.
