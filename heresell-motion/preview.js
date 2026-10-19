#!/usr/bin/env node
// Pratonton dengan slider masa, tanpa render penuh.
//   node preview.js            (port 4321)
//   PORT=5000 node preview.js
const { spawn } = require('child_process');
const { start } = require('./lib/server');

(async () => {
  const port = Number(process.env.PORT || 4321);
  const { url } = await start(port);
  console.log(`Pratonton: ${url}`);
  console.log('Space = main/jeda, anak panah kiri/kanan = satu frame. Ctrl+C untuk berhenti.');
  const opener = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'cmd' : 'xdg-open';
  const args = process.platform === 'win32' ? ['/c', 'start', '', url] : [url];
  try {
    spawn(opener, args, { stdio: 'ignore', detached: true }).on('error', () => {}).unref();
  } catch {
    // Tiada pembuka browser (contoh server tanpa GUI): buka URL di atas secara manual.
  }
})();
