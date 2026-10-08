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
| 4 Reveal | 10.0 - 13.0s | Boom, logo, "Klinik Mesra Wanita & Keluarga", "Cawangan baru, Melawati KL" |
| 5 Feature | 13.0 - 16.4s | 3 checkmark dengan ding |
| 6 CTA | 16.4 - 20.0s | SUDAH DIBUKA!, Melawati KL, asal-usul Kuantan, butang + myaclinic.my |

## Arahan

```bash
npm install
npm run sfx        # jana semula bunyi
npm run check
npm run render     # -> renders/mya-melawati-teaser.mp4
```

Render tempatan perlukan Chrome headless. Dalam container ni guna
`HYPERFRAMES_BROWSER_PATH=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`.

## Status maklumat

- Fokus: pembukaan cawangan baru Mya Clinic di Melawati, Kuala Lumpur. CTA "SUDAH DIBUKA" (disahkan klien).
- Waktu operasi Melawati: 8 pagi hingga 5 petang (disahkan klien).
- Feature 1 dan 2 ("Mesra wanita, ibu & anak", "Tempah janji temu online") asalnya dari hasil carian subpage myaclinic.my dan listing direktori, sebab laman tu masih diblok dari environment render. Janji temu online untuk Melawati disahkan klien.
- Semua handle (`@nana.mamasibuk`, `@ummi.hana`, dll) dan post adalah rekaan.
