// Komponen kongsi: telefon dengan salespage, item checklist, ikon.
(function () {
  const { esc, capFirst, set, clamp } = HM;

  const icons = {
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9.5 2.5h5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  };

  // Ilustrasi produk ringkas (CSS sahaja). Pilih ikut niche.visual atau teka dari nama produk.
  function visualKind(niche) {
    if (niche.visual) return niche.visual;
    const p = String(niche.produk || '').toLowerCase();
    if (/kek|cake|kuih|biskut|cookie/.test(p)) return 'kek';
    return 'kotak';
  }
  const visuals = {
    kek: '<div class="vis vis-kek"><div class="plate"></div><div class="slice"></div></div>',
    kotak: '<div class="vis vis-kotak"><div class="box"><div class="tape"></div></div></div>',
  };

  function phone(root, niche) {
    const kind = visualKind(niche);
    root.innerHTML = `
      <div class="phone">
        <div class="screen">
          <div class="sbar"><span>9:41</span><span class="sig"><i></i><i></i><i></i></span></div>
          <div class="addr"><span class="lock">${icons.lock}</span>
            <span class="addr-t"><span class="addr-draft">Draf, belum live</span><span class="addr-live"></span></span></div>
          <div class="page">
            <div class="part p-hero"><div class="sk"></div><div class="real">${visuals[kind] || visuals.kotak}</div></div>
            <div class="part p-copy"><div class="sk sk-lines"><i></i><i></i><i></i></div>
              <div class="real">
                <div class="pg-title">${esc(niche.produk || 'Produk kita')}</div>
                <div class="pg-tag">${esc(niche.tagline || 'Tempah terus, bayar dengan FPX.')}</div>
              </div></div>
            <div class="part p-price"><div class="sk sk-price"><i></i><i></i></div>
              <div class="real price-row">
                <span class="pg-price">${esc(niche.harga || 'RM0')}</span>
                ${niche.promo ? `<span class="pg-promo">${esc(capFirst(niche.promo))}</span>` : ''}
              </div></div>
            <div class="part p-buy"><div class="sk sk-btn"></div>
              <div class="real">
                <div class="pg-btn">Beli sekarang</div>
                <div class="pg-fpx"><span class="ok-s">${icons.check}</span>Bayar dengan FPX</div>
              </div></div>
          </div>
        </div>
      </div>`;
    const q = (s) => root.querySelector(s);
    // Urutan bina ikut checklist default: copy, gambar, harga+promo, checkout.
    const parts = [q('.p-copy'), q('.p-hero'), q('.p-price'), q('.p-buy')];
    return {
      render(t, { built, live, url }) {
        parts.forEach((el, i) => {
          const p = built[i] || 0;
          el.querySelector('.sk').style.opacity = 1 - p;
          set(el.querySelector('.real'), { y: (1 - p) * 14, opacity: p });
        });
        q('.addr-live').textContent = url;
        q('.addr-draft').style.opacity = 1 - live;
        q('.addr-live').style.opacity = live;
        q('.addr').classList.toggle('is-live', live > 0.5);
      },
    };
  }

  const checkItem = (label) =>
    `<div class="ck"><span class="box"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span class="lbl">${esc(label)}</span></div>`;

  // draw: 0..1 lukis tanda semak; pop: spring untuk kotak.
  function renderCheck(el, draw, pop) {
    const path = el.querySelector('path');
    path.style.strokeDasharray = 24;
    path.style.strokeDashoffset = 24 * (1 - draw);
    const box = el.querySelector('.box');
    box.classList.toggle('on', draw > 0);
    set(box, { scale: draw > 0 ? 0.8 + 0.2 * pop : 1, opacity: 1 });
    el.querySelector('.lbl').style.opacity = 0.55 + 0.45 * clamp(draw * 2);
  }

  window.HMParts = { icons, phone, checkItem, renderCheck };
})();
