#!/usr/bin/env node
// Render scene JSON jadi MP4 dalam 3 saiz serentak.
//   node render.js scenes/prompt-to-live.json
//   node render.js --all
// Pilihan:
//   --formats 16x9,9x16,1x1   pilih saiz (default semua)
//   --fps 30                  frame sesaat
//   --stills 1.5,8,15         simpan PNG pada saat tertentu sahaja (semakan cepat)
//   --out out                 folder output
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { chromium } = require('playwright');
const { start, listScenes, ROOT } = require('./lib/server');

const FORMATS = {
  '16x9': { name: 'landscape', w: 1920, h: 1080 },
  '9x16': { name: 'portrait', w: 1080, h: 1920 },
  '1x1': { name: 'square', w: 1080, h: 1080 },
};

function parseArgs(argv) {
  const opts = { files: [], all: false, formats: Object.keys(FORMATS), fps: 30, stills: null, out: 'out' };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === '--all') opts.all = true;
    else if (a === '--formats') opts.formats = next().split(',').map((s) => s.trim());
    else if (a === '--fps') opts.fps = Number(next());
    else if (a === '--stills') opts.stills = next().split(',').map(Number);
    else if (a === '--out') opts.out = next();
    else if (a.startsWith('--')) throw new Error(`Pilihan tak dikenali: ${a}`);
    else opts.files.push(a);
  }
  for (const f of opts.formats) if (!FORMATS[f]) throw new Error(`Format tak dikenali: ${f} (guna 16x9, 9x16, 1x1)`);
  return opts;
}

// Satu fail scene boleh hasilkan beberapa job (contoh niche-batch: satu job setiap niche).
function jobsFor(file) {
  const scene = JSON.parse(fs.readFileSync(file, 'utf8'));
  const base = path.basename(file, '.json');
  if (!scene.angle) throw new Error(`${file}: tiada "angle"`);
  const template = path.join(ROOT, 'templates', `${scene.angle}.html`);
  if (!fs.existsSync(template)) throw new Error(`${file}: template templates/${scene.angle}.html tiada`);
  return [{ name: base, angle: scene.angle, scene }];
}

function ffmpeg(outFile, fps) {
  const args = [
    '-y', '-loglevel', 'error',
    '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-tune', 'animation',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-r', String(fps),
    outFile,
  ];
  const proc = spawn('ffmpeg', args, { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((resolve, reject) => {
    proc.on('error', reject);
    proc.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg keluar dengan kod ${code}`))));
  });
  return { proc, done };
}

async function openScene(browser, baseUrl, job, fmtKey) {
  const f = FORMATS[fmtKey];
  const page = await browser.newPage({ viewport: { width: f.w, height: f.h }, deviceScaleFactor: 1 });
  page.on('pageerror', (e) => console.error(`  [${job.name} ${fmtKey}] ${e.message}`));
  await page.addInitScript((s) => { window.__SCENE__ = s; }, job.scene);
  await page.goto(`${baseUrl}/templates/${job.angle}.html?format=${f.name}`);
  await page.waitForFunction(() => window.__ready === true || window.__error, null, { timeout: 30000 });
  const err = await page.evaluate(() => window.__error);
  if (err) throw new Error(`${job.name} ${fmtKey}: ${err}`);
  return page;
}

async function renderFormat(browser, baseUrl, job, fmtKey, opts) {
  const page = await openScene(browser, baseUrl, job, fmtKey);
  const outDir = path.join(ROOT, opts.out, job.name);
  fs.mkdirSync(outDir, { recursive: true });

  if (opts.stills) {
    for (const t of opts.stills) {
      await page.evaluate((x) => window.render(x), t);
      await page.screenshot({ path: path.join(outDir, `${job.name}_${fmtKey}_t${t}.png`) });
    }
    await page.close();
    return;
  }

  const duration = await page.evaluate(() => window.DURATION);
  const total = Math.round(duration * opts.fps);
  const outFile = path.join(outDir, `${job.name}_${fmtKey}.mp4`);
  const enc = ffmpeg(outFile, opts.fps);
  const started = Date.now();
  for (let i = 0; i < total; i++) {
    await page.evaluate((x) => window.render(x), i / opts.fps);
    const buf = await page.screenshot({ type: 'png' });
    if (!enc.proc.stdin.write(buf)) await new Promise((r) => enc.proc.stdin.once('drain', r));
  }
  enc.proc.stdin.end();
  await enc.done;
  await page.close();
  const secs = ((Date.now() - started) / 1000).toFixed(1);
  process.stdout.write(`  ${job.name} ${fmtKey}: siap ${total} frame dalam ${secs}s -> ${path.relative(ROOT, outFile)}\n`);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  let files = opts.files;
  if (opts.all) files = listScenes().map((s) => path.join('scenes', s.file));
  if (!files.length) {
    console.log('Guna: node render.js scenes/<nama>.json   atau   node render.js --all');
    process.exit(1);
  }
  const jobs = files.flatMap((f) => jobsFor(path.resolve(f)));
  const { server, url } = await start();
  const browser = await chromium.launch();
  try {
    for (const job of jobs) {
      console.log(`Render ${job.name} (${job.angle}) dalam ${opts.formats.join(', ')}`);
      await Promise.all(opts.formats.map((fmt) => renderFormat(browser, url, job, fmt, opts)));
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
