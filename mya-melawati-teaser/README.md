# Mya Clinic Melawati: teaser 20s (Hyperframes)

Video teaser 1080x1920, 30fps, 20 saat, guna footage before/after Melawati.

- Output: `renders/mya-melawati-teaser.mp4`
- Komposisi: `index.html` (GSAP timeline, didaftar sebagai `main`)
- Aset offline: `assets/js/gsap.min.js`, `assets/fonts/` (Poppins, OFL), `assets/logo-mya-white.png` (diekstrak dari frame akhir footage), `assets/video/`
- SFX: `assets/sfx/*.wav`, semua disintesis oleh `tools/make_sfx.py` (numpy sahaja, tiada sampel luar)
- Snapshot semakan: `snapshots/`

## Struktur

| Scene | Masa | Isi |
|---|---|---|
| 1 Hook trend | 0 - 3.4s | Kad post rekaan, like naik ke 12.8K, pill `#SupportLocal` |
| 2 Kesan | 3.4 - 7.0s | 6 balasan rekaan bertimbun, badge loceng naik ke 99+ |
| 3 Pain | 7.0 - 10.0s | 3 cara lama kena strike merah, beat berhenti, riser masuk |
| 4 Reveal | 10.0 - 13.0s | Boom, logo, "Klinik Mesra Wanita & Keluarga", footage klinik |
| 5 Feature | 13.0 - 16.4s | 3 checkmark dengan ding |
| 6 CTA | 16.4 - 20.0s | OKTOBER 2026, asal-usul Kuantan, butang + myaclinic.my |

## Arahan

```bash
npm install
npm run sfx        # jana semula bunyi
npm run check
npm run render     # -> renders/mya-melawati-teaser.mp4
```

Render tempatan perlukan Chrome headless. Dalam container ni guna
`HYPERFRAMES_BROWSER_PATH=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`.

## Perkara yang perlu disahkan sebelum post

1. **Lokasi**: brief kata "di Kuantan kini buka di Melawati". Footage tulis "MELAWATI (KL)", dan cawangan lain (Kg Pandan, Semambu, Gambang) semua di Kuantan. Video guna "Dari Kuantan, kini lebih dekat" dan "Melawati KL".
2. **Tarikh**: brief kata "kini buka", footage kata "COMING THIS OCTOBER". Tiada tarikh atau hari tepat, jadi CTA guna "OKTOBER 2026 / Bulan ni". Tukar `#s6-date`, `#s6-year`, `#s6-day` dalam `index.html` bila tarikh sah.
3. **Feature**: myaclinic.my diblok dari environment render, jadi feature diambil dari hasil carian subpage laman tu (cawangan, janji temu) dan listing direktori:
   - "Mesra wanita, ibu & anak"
   - "Tempah janji temu online" (laman ada page /janji-temu/)
   - "Buka setiap hari, 8.30 pagi hingga 10.30 malam" (page cawangan, untuk cawangan Kuantan). **Waktu Melawati belum disahkan.**
4. Semua handle (`@nana.mamasibuk`, `@ummi.hana`, dll) dan post adalah rekaan.
