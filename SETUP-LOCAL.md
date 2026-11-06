# Setup local: projek video Mya Clinic

Panduan untuk jalankan projek video Mya Clinic di komputer sendiri (Claude Desktop atau terminal), bukan dalam container cloud.

## 1. Pasang sekali

| Alat | Untuk apa | Semak |
|---|---|---|
| Node.js 20 atau lebih baru | Hyperframes, Remotion | `node -v` |
| ffmpeg | potong, encode, semak audio | `ffmpeg -version` |
| Python 3 | skrip `tools/*.py` (jana SFX, bina `index.html`) | `python3 --version` |
| Google Chrome | render video | buka sekali |

Mac: `brew install node ffmpeg python`. Windows: pasang Node.js dan Python dari laman rasmi, ffmpeg dari gyan.dev, dan tambah ke PATH.

## 2. Ambil repo

```bash
git clone https://github.com/arinahz/rocky-vault.git
cd rocky-vault
git checkout claude/friendly-dijkstra-9ikq15
```

## 3. Setiap projek

`node_modules` tak disimpan dalam repo. Masuk folder projek dan pasang dulu:

```bash
cd mya-vaksin-influenza
npm install
```

### Projek Hyperframes

Folder: `mya-melawati-teaser`, `mya-melawati-teaser-v2`, `mya-faq-first-time-mommies`, `mya-klinik-obesiti`, `mya-saringan-kesuburan`, `mya-vaksin-influenza`, `mya-vaksin-influenza-en`, `mya-specialist-online`.

```bash
npx hyperframes browser ensure    # sekali sahaja, pastikan Chrome untuk render
python3 tools/build.py            # hanya jika folder ada tools/build.py
npx hyperframes check
npx hyperframes render -q high -o renders/output.mp4
```

Projek yang ada `tools/build.py` menjana `index.html` dari `tools/index.template.html` dan transcript. Edit template atau transcript, bukan `index.html` terus.

### Projek Remotion

Folder: `mya-antenatal-ads`.

```bash
node render.mjs KTN-Antenatal-2Garis-9x16
```

Skrip guna Chrome sendiri secara automatik. Kalau nak guna Chrome tertentu: `REMOTION_BROWSER="/path/ke/chrome" node render.mjs`.

## 4. Lepas render: dua langkah biasa

Frame pertama render Hyperframes kadang-kadang hitam bila video bermula pada saat 0. Ganti dengan frame kedua, dan kecilkan saiz fail sekali:

```bash
ffmpeg -i renders/raw.mp4 -vf "trim=start_frame=1,setpts=PTS-STARTPTS,tpad=start=1:start_mode=clone" \
  -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 160k renders/final.mp4
```

## 5. Kelebihan di local

Tiada sekatan rangkaian macam dalam container cloud. TikTok, myaclinic.my dan model transcription (Whisper dari Huggingface) boleh terus dicapai, jadi transcript tak perlu lagi melalui Descript.

## 6. Rujukan brand

- Emas `#ac9364`, hitam `#050505`, krim `#faf5ee`. Font Poppins (dalam setiap `assets/fonts`).
- Logo: `mya-antenatal-ads/public/img/logo-horizontal-black.png`, ikon ibu & bayi `icon-gold.png`. Kedua-duanya diekstrak dari bahan sedia ada; ganti dengan fail logo asal bila ada.
- Peraturan iklan: jangan tanya penonton sama ada hamil (polisi Meta), tiada harga atau superlatif ("#1"), fakta klinik mesti disahkan.
