// Copies the latest WorkOS Windows installer (built with `npm run release`
// in ../workOS: product "WorkOS", its own app id and data folder) into public/downloads and records its version, size and
// SHA-256 in src/lib/release.ts, which the download buttons use.
//
//   npm run publish:installer                 (uses ../workOS)
//   npm run publish:installer -- <path-to-setup.exe>

import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const bundle = resolve(root, "..", "workOS", "src-tauri", "target", "release", "bundle", "nsis");

function latestInstaller() {
  const given = process.argv[2];
  if (given) return resolve(given);
  const found = readdirSync(bundle)
    .filter((f) => /-setup\.exe$/i.test(f))
    .map((f) => join(bundle, f))
    .sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs);
  if (!found.length) throw new Error(`No installer in ${bundle}. Build WorkOS first (npm run release in ../workOS).`);
  return found[0];
}

const source = latestInstaller();
const version = /_(\d+\.\d+\.\d+)_/.exec(basename(source))?.[1] ?? "0.0.0";
const name = `WorkOS-Setup-${version}-x64.exe`;
const outDir = join(root, "public", "downloads");
mkdirSync(outDir, { recursive: true });
// Only the current installer is served.
for (const old of readdirSync(outDir)) if (/^WorkOS-Setup-.*\.exe$/i.test(old) && old !== name) rmSync(join(outDir, old));
copyFileSync(source, join(outDir, name));

const bytes = readFileSync(join(outDir, name));
const sha256 = createHash("sha256").update(bytes).digest("hex");
const date = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(root, "src", "lib", "release.ts"),
  `/**
 * The Windows installer shipped with this site (in /public/downloads).
 * Written by \`npm run publish:installer\` — don't edit by hand.
 */
export const release = {
  version: "${version}",
  file: "/downloads/${name}",
  bytes: ${bytes.length},
  sha256: "${sha256}",
  date: "${date}",
} as const;
`,
);
// Auto-update: installed copies read /updates/latest.json, download the
// installer and check it against the signature (made by `npm run release`
// with TAURI_SIGNING_PRIVATE_KEY set).
const sigFile = `${source}.sig`;
let signature;
try {
  signature = readFileSync(sigFile, "utf8").trim();
} catch {
  throw new Error(`No ${sigFile}. Build with TAURI_SIGNING_PRIVATE_KEY set so the update is signed.`);
}
const siteUrl = (process.env.UPDATE_BASE_URL ?? "https://workos-abhinav.vercel.app").replace(/\/$/, "");
mkdirSync(join(root, "public", "updates"), { recursive: true });
writeFileSync(
  join(root, "public", "updates", "latest.json"),
  JSON.stringify(
    {
      version,
      notes: `WorkOS ${version}`,
      pub_date: new Date().toISOString(),
      platforms: { "windows-x86_64": { signature, url: `${siteUrl}/downloads/${name}` } },
    },
    null,
    2,
  ) + "\n",
);

console.log(`Published ${name} (${(bytes.length / 1048576).toFixed(1)} MB)\nSHA-256 ${sha256}`);
