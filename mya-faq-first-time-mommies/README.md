# Mya Clinic: FAQ First-Time Mommies (Hyperframes)

Video 1080x1920, 30fps, 22 saat, diubah dari carousel poster "Soalan Yang Kerap Ditanya Oleh First-Time Mommies".

- Output: `renders/mya-faq-first-time-mommies.mp4`
- Komposisi: `index.html`
- Aset offline: GSAP (`assets/js`), Poppins + Space Mono (`assets/fonts`, OFL), logo dan ilustrasi ibu-bayi (`assets/img`, diekstrak dari poster asal)
- Bunyi: `assets/sfx/*.wav`, disintesis oleh `tools/make_sfx.py`

## Struktur

| Scene | Masa | Isi |
|---|---|---|
| Cover | 0 - 3.6s | "Soalan yang kerap ditanya / First-Time Mommies" + ilustrasi |
| Soalan 1 | 3.6 - 10.0s | Bila waktu sesuai buat scan pertama? Sebelum 12 minggu. Tepat kira tarikh bersalin (EDD). 'Buka buku' sebelum minggu ke-12 |
| Soalan 2 | 10.0 - 16.8s | Temu janji pertama, nak bawa apa? Tak perlu risau! Buku rekod kehamilan, telefon, senarai soalan untuk doktor |
| CTA | 16.8 - 22.0s | "Tekan link di bawah untuk buat temu janji" + anak panah |

Teks dipendekkan dari poster tanpa ubah maksud perubatan. Semua fakta datang dari poster klien.

## Arahan

```bash
npm install
npm run sfx
npm run check
npm run render
```
