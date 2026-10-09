# Mya Clinic: Antenatal ads (Remotion)

Video ads Meta untuk servis antenatal, objektif WhatsApp leads. Dibina dengan Remotion 4.0.534.

## Status

- Sampel siap: `out/KTN_Antenatal_2Garis_9x16.mp4` (Angle A, Kuantan, 9:16, 24s).
- Angle B dan C belum dibina (tunggu kelulusan sampel). Komposisi KTN/MLW x 9x16/4x5 untuk Angle A dah didaftar dalam `src/Root.tsx`.
- Storyboard: `storyboard.md`.

## Render

```bash
npm install
node render.mjs KTN-Antenatal-2Garis-9x16      # satu
node render.mjs                                 # semua komposisi
STILLS=0,150,600 node render.mjs <id>           # tambah still PNG untuk semakan
```

`render.mjs` guna Chrome headless dari `REMOTION_BROWSER` (lalai: Chromium Playwright dalam container ni). Output: `out/<KTN|MLW>_Antenatal_<Angle>_<format>.mp4`.

## Aset (semua lokal, tiada CDN)

- `public/img/logo-horizontal-black.png`, `logo-horizontal-gold.png`: diekstrak dari header poster FAQ Mya (fail logo asal tiada).
- `public/img/icon-gold.png`: ikon ibu & bayi, untuk watermark.
- `public/img/peta-kuantan.png`: peta 3 cawangan dari end card video Saringan Kesuburan.
- `public/img/melawati-kaunter.jpg`: frame kaunter Melawati dari footage before/after.
- `public/fonts`: Poppins (OFL). `public/sfx`: muzik placeholder dan SFX, dijana oleh `tools/make_sfx.py`.

## Warna

- Emas `#ac9364`: sample dari logo emas di dinding klinik (gambar video, pencahayaan mungkin ubah sedikit).
- Hitam `#050505`: sample dari logo hitam poster FAQ.
- Krim `#faf5ee`: latar poster FAQ.

Tukar dalam `src/config.ts` bila fail logo asal ada.

## Sumber fakta

Item senarai (scan sebelum 12 minggu, EDD, 'buka buku' sebelum minggu ke-12, bawa buku rekod / telefon / senarai soalan) diambil dari poster FAQ "First-Time Mommies" Mya Clinic.

## [SAHKAN]

- Nombor WhatsApp Kuantan `017-979 45092` (satu digit lebih untuk nombor 017).
