// Runtime kongsi untuk semua template. Setiap template panggil HM.boot(init),
// dan init(scene, fmt) pulangkan { duration, render(t) }.
// render(t) mesti fungsi tulen masa: tiada CSS transition, tiada setTimeout,
// supaya frame boleh dicapture satu-satu dan slider boleh scrub ke depan atau belakang.
(function () {
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, p) => a + (b - a) * p;

  const ease = {
    linear: (p) => p,
    outCubic: (p) => 1 - Math.pow(1 - p, 3),
    outQuint: (p) => 1 - Math.pow(1 - p, 5),
    inOutCubic: (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
    inCubic: (p) => p * p * p,
    // Spring ringan: overshoot sekitar 6%, settle sebelum p = 1.
    spring: (p) => (p >= 1 ? 1 : 1 - Math.exp(-6 * p) * Math.cos(p * Math.PI * 2.2)),
  };

  // Progress 0..1 bagi segmen [start, start + dur].
  const seg = (t, start, dur) => (dur <= 0 ? (t >= start ? 1 : 0) : clamp((t - start) / dur));
  const tw = (t, start, dur, e = 'outCubic') => ease[e](seg(t, start, dur));

  // Tetapkan transform dan opacity dari nilai. Semua kunci pilihan.
  function set(el, o) {
    if (!el) return;
    const x = o.x || 0, y = o.y || 0, s = o.scale == null ? 1 : o.scale, r = o.rot || 0;
    el.style.transform = `translate(${x}px, ${y}px) scale(${s}) rotate(${r}deg)`;
    if (o.opacity != null) {
      const op = clamp(o.opacity);
      el.style.opacity = op;
      el.style.visibility = op <= 0 ? 'hidden' : 'visible';
    }
  }

  // Masuk standard: naik sikit + fade. p ialah progress yang sudah di-ease.
  const rise = (el, p, dist = 40, extra = {}) =>
    set(el, Object.assign({ y: (1 - p) * dist, opacity: clamp(p * 1.4) }, extra));

  const pad2 = (n) => String(n).padStart(2, '0');
  const fmtClock = (sec) => {
    const s = Math.max(0, Math.floor(sec));
    return `${pad2(Math.floor(s / 60))}:${pad2(s % 60)}`;
  };

  const FORMATS = {
    landscape: { w: 1920, h: 1080, tag: '16x9' },
    portrait: { w: 1080, h: 1920, tag: '9x16' },
    square: { w: 1080, h: 1080, tag: '1x1' },
  };

  function detectFormat() {
    const q = new URLSearchParams(location.search).get('format');
    if (q && FORMATS[q]) return q;
    const r = innerWidth / innerHeight;
    return r > 1.2 ? 'landscape' : r < 0.8 ? 'portrait' : 'square';
  }

  // Stage direka pada saiz piksel tetap ikut format, kemudian di-scale ke viewport.
  // Waktu render saiz viewport = saiz reka, jadi scale = 1.
  function setupStage(fmt) {
    const f = FORMATS[fmt];
    document.body.classList.add('fmt-' + fmt);
    const stage = document.getElementById('stage');
    stage.style.width = f.w + 'px';
    stage.style.height = f.h + 'px';
    const fit = () => {
      const s = Math.min(innerWidth / f.w, innerHeight / f.h);
      stage.style.transform = `scale(${s})`;
    };
    fit();
    addEventListener('resize', fit);
  }

  async function loadScene() {
    if (window.__SCENE__) return window.__SCENE__;
    const src = new URLSearchParams(location.search).get('scene');
    if (!src) throw new Error('Tiada scene. Guna ?scene=/scenes/<nama>.json');
    const res = await fetch(src);
    if (!res.ok) throw new Error('Gagal baca ' + src);
    return res.json();
  }

  // Inline logo SVG. white: tukar semua fill (kecuali none) jadi #FFFFFF.
  async function loadLogo(target, { white = false } = {}) {
    const res = await fetch('/assets/logo.svg');
    let svg = await res.text();
    if (white) {
      svg = svg
        .replace(/fill="(?!none)[^"]*"/gi, 'fill="#FFFFFF"')
        .replace(/fill:\s*(?!none)[^;"]+/gi, 'fill:#FFFFFF');
    }
    target.innerHTML = svg;
    const el = target.querySelector('svg');
    el.removeAttribute('width');
    el.removeAttribute('height');
    el.style.width = '100%';
    el.style.height = 'auto';
    el.style.display = 'block';
  }

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const capFirst = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  async function boot(init) {
    window.__ready = false;
    try {
      const fmt = detectFormat();
      setupStage(fmt);
      const scene = await loadScene();
      const api = await init(scene, fmt);
      await document.fonts.ready;
      window.DURATION = api.duration;
      window.FORMAT = fmt;
      window.render = (t) => api.render(clamp(t, 0, api.duration));
      window.render(0);
      window.__ready = true;
    } catch (err) {
      window.__error = String(err && err.stack || err);
      document.body.insertAdjacentHTML('beforeend', `<pre class="hm-error">${esc(window.__error)}</pre>`);
      throw err;
    }
  }

  window.HM = { clamp, lerp, ease, seg, tw, set, rise, fmtClock, FORMATS, boot, loadLogo, esc, capFirst };
})();
