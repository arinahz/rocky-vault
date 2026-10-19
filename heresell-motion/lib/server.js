// Server statik kecil untuk render dan pratonton (fetch tak jalan atas file://).
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
};

// Senarai scene yang boleh dirender (fail JSON dengan kunci "angle").
function listScenes() {
  const dir = path.join(ROOT, 'scenes');
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
        return data && data.angle ? { file: f, angle: data.angle } : null;
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function start(port = 0) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (urlPath === '/api/scenes') {
      res.writeHead(200, { 'content-type': MIME['.json'] });
      return res.end(JSON.stringify(listScenes()));
    }
    const file = path.join(ROOT, urlPath === '/' ? '/preview.html' : urlPath);
    if (!file.startsWith(ROOT + path.sep)) {
      res.writeHead(403);
      return res.end();
    }
    fs.readFile(file, (err, buf) => {
      if (err) {
        res.writeHead(404);
        return res.end('not found');
      }
      res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
      res.end(buf);
    });
  });
  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => resolve({ server, url: `http://127.0.0.1:${server.address().port}` }));
  });
}

module.exports = { start, listScenes, ROOT };
