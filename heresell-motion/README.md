# heresell-motion

Sistem motion video untuk Heresell. Satu fail JSON = satu video, keluar dalam 3 saiz serentak:
16:9 (1920x1080), 9:16 (1080x1920) dan 1:1 (1080x1080).

## Sediakan sekali

```bash
cd heresell-motion
npm install
npx playwright install chromium   # langkau kalau Chromium dah ada
```

Perlu Node 18+ dan `ffmpeg` (dengan libx264) dalam PATH.

## Render

```bash
node render.js scenes/prompt-to-live.json   # satu scene, 3 saiz
node render.js --all                        # semua JSON dalam scenes/
```

Output masuk `out/<nama-json>/<nama-json>_16x9.mp4`, `_9x16.mp4` dan `_1x1.mp4`
(H.264, yuv420p, faststart, 30fps).

Pilihan tambahan:

- `--formats 9x16` render satu saiz sahaja
- `--stills 2,8,15` simpan PNG pada saat tertentu, untuk semak cepat tanpa render penuh

## Pratonton

```bash
node preview.js
```

Buka `http://127.0.0.1:4321`. Pilih scene, tarik slider untuk scrub, Space untuk main atau jeda,
anak panah kiri dan kanan untuk gerak satu frame. Lepas edit JSON, tekan "Muat semula".

## Buat variasi baru

Salin `scenes/prompt-to-live.json` ke nama baru, tukar isi, kemudian render. Medan utama:

| Medan | Kegunaan |
| --- | --- |
| `angle` | Template yang dipakai (`templates/<angle>.html`) |
| `niche.produk`, `niche.harga`, `niche.promo` | Isi page dalam telefon |
| `niche.subdomain` | Jadi `<subdomain>.heresell.my` |
| `niche.tagline` | Pilihan. Ayat pendek bawah nama produk |
| `niche.visual` | Pilihan. Ilustrasi produk: `kek` atau `kotak` |
| `hook`, `prompt_ditaip`, `checklist`, `cta` | Teks dalam video |
| `demo_label` | Label kecil di sudut bila ada angka atas skrin |
| `durasi_saat` | Panjang video. Semua animasi di-skala ikut nilai ni |

## Tambah niche baru

Untuk sekarang, salin `scenes/prompt-to-live.json` dan tukar blok `niche`, `prompt_ditaip` dan `hook`.
Render batch untuk banyak niche sekali gus (`scenes/niches.json`) akan ditambah dalam langkah seterusnya.

## Peraturan kandungan

- Bahasa Malaysia santai, guna "kita". Tiada dash panjang.
- Angka jualan dan order ialah data contoh sahaja. Setiap scene yang tunjuk angka papar `demo_label`.
- Jangan tambah testimoni, statistik atau claim pendapatan.
- Untuk 9:16, teks kekal antara 12% atas dan 12% bawah.

## Struktur

```
assets/logo.svg       logo (versi putih dijana automatik untuk latar gelap)
assets/fonts/         Plus Jakarta Sans (disimpan setempat supaya render tak perlu internet)
lib/motion.js         easing, spring, boot scene, pengesanan format
lib/parts.js|css      komponen kongsi: telefon, checklist, timer, chat, penutup
templates/<angle>.html  satu template setiap angle, dedah render(t)
scenes/*.json         data setiap video
render.js, preview.js
```

Setiap template dedahkan `window.render(t)` yang bergantung pada masa sahaja (tiada CSS transition atau timer),
jadi frame boleh dicapture satu-satu dan slider boleh scrub ke mana-mana titik.

## Logo

`assets/logo.svg` sekarang ialah **placeholder** (wordmark teks). Gantikan dengan fail logo rasmi Heresell.
Kekalkan warna dalam atribut `fill` supaya versi putih boleh dijana.
