// Render compositions to out/<KTN|MLW>_Antenatal_<Angle>_<format>.mp4
// Usage: node render.mjs [compositionId ...]   (no args = all)
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia, renderStill } from "@remotion/renderer";

const browserExecutable = process.env.REMOTION_BROWSER || "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const comps = await getCompositions(serveUrl, { browserExecutable });
const wanted = process.argv.slice(2);
for (const c of comps.filter((c) => !wanted.length || wanted.includes(c.id))) {
  const name = c.id.replace(/-/g, "_");
  const out = path.resolve("out", `${name}.mp4`);
  console.log("rendering", c.id, "->", out);
  await renderMedia({ composition: c, serveUrl, codec: "h264", crf: 20, outputLocation: out, browserExecutable, concurrency: 4,
    onProgress: ({ progress }) => process.stdout.write(`\r${(progress * 100).toFixed(0)}%   `) });
  console.log();
  if (process.env.STILLS) {
    for (const f of process.env.STILLS.split(",").map(Number)) {
      await renderStill({ composition: c, serveUrl, frame: f, output: path.resolve("out/stills", `${name}_f${f}.png`), browserExecutable });
    }
  }
}
