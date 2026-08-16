/* build.mjs — rebuilds QA/qa-build.html from the real application source.
 *
 *   node QA/build.mjs
 *
 * Bundles QA/build-entry.jsx (which imports the actual default export of
 * APPLICATION/ai-digital-learning-dashboard.jsx — no copy, no re-derivation) with esbuild,
 * then wraps the result in the same self-contained HTML shell the QA build has always used:
 * Tailwind from CDN for styling only, everything else (React, ReactDOM, lucide-react, the
 * app itself) inlined into one <script>. This exists so verify.mjs and a real browser are
 * never testing two different implementations again — see M14.1.
 */
import { build } from "esbuild";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const result = await build({
  entryPoints: [join(__dirname, "build-entry.jsx")],
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2020",
  write: false,
  legalComments: "eof",
});

const js = result.outputFiles[0].text;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AI &amp; Digital Learning — runtime QA build</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
  .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}
</style>
</head>
<body>
<div id="root"></div>
<script>${js}</script>
</body>
</html>
`;

writeFileSync(join(__dirname, "qa-build.html"), html, "utf8");
console.log("QA/qa-build.html rebuilt —", (html.length / 1024).toFixed(1) + " KB");
