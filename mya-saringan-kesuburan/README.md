# Mya Clinic: Saringan Kesuburan (edit, Kuantan)

Edit ringan video talking head `assets/video/saringan-kesuburan-raw.mp4` (53s) jadi 44s, 1080x1920.

- Output: `renders/KTN_SaringanKesuburan_9x16.mp4`
- `index.html` dijana oleh `tools/build.py` dari `tools/index.template.html`. Edit template, kemudian `python3 tools/build.py`.

## Apa yang diubah

1. Buang pembukaan "Alamak sedihnya, sakit hati, penatlah raya ni" (rujukan Raya dah lepas musim). Video mula terus pada "semua orang tanya, 'Eh, bila nak dapat anak?'".
2. Potong jeda panjang (lebih 0.4s). Zoom berselang setiap segmen untuk sorok jump cut. Kapsyen asal yang tertanam kekal selari dengan suara.
3. Kad hook "Soalan yang selalu didengar: 'Bila nak dapat anak?'" dari frame 0.
4. Pill "Saringan kesuburan suami & isteri" semasa dia sebut saringan kesuburan. Watermark logo kecil.
5. End card asal dibuang (ada "Pilihan #1 di Kuantan", dakwaan superlatif). Diganti dengan CTA "Tekan di bawah untuk temujanji", nama 3 cawangan Kuantan dan peta cawangan dari end card asal.
6. Frame 0 render asal hitam (video belum ter-decode); diganti dengan frame 1 guna ffmpeg tanpa ubah durasi.

## [SAHKAN]

- Gambar kedai Gambang dalam peta masih ada banner "AKAN DIBUKA".
- Nama dan jawatan pembicara (doktor?), dan persetujuan untuk iklan berbayar.
