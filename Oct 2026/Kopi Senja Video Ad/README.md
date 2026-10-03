# Kopi Senja: Video Ad 60s (Meta)

Format: 9:16, 1080x1920, 60 saat, 30fps. Untuk Reels, Stories dan Feed. Teks diletak di tengah frame supaya tak dilindungi UI Reels.

Mood: hangat, cahaya petang, tenang tapi yakin. Video tiada muzik (track audio senyap). Tambah muzik dari Meta Sound Collection semasa upload.

## 3 hook (0 hingga 5 saat)

| Fail | Angle | Teks |
|---|---|---|
| `kopi-senja-60s-hook1.mp4` | Duit | "RM15 sehari untuk kopi cafe. Cuba kira berapa sebulan." |
| `kopi-senja-60s-hook2.mp4` | POV pekerja pejabat | "POV: 8 pagi. Dah lewat. Tapi otak tak jalan tanpa kopi." |
| `kopi-senja-60s-hook3.mp4` | Laju + tiada gula | "Iced latte tanpa gula tambahan. Siap dalam 30 saat. Di rumah, bukan di cafe." |

## Isi (sama untuk ketiga-tiga video)

| Masa | Babak |
|---|---|
| 5 hingga 11s | Kopi cafe RM12 hingga RM18 secawan. 22 hari kerja = sampai RM396 sebulan. |
| 11 hingga 17s | Kenalkan Kopi Senja. Cold brew concentrate 500ml, lebih kurang 8 cawan. |
| 17 hingga 29s | Cara buat: tuang, campur air atau susu, tambah ais. Siap dalam 30 saat. |
| 29 hingga 36s | Tiada gula tambahan. Simpan dalam peti sejuk. |
| 36 hingga 46s | Banding harga: RM15 vs ~RM5.60 secawan. Jimat lebih RM200 sebulan (anggaran 22 hari, RM15 secawan). |
| 46 hingga 53s | Tawaran 3 botol RM119 (asal RM135). Penghantaran percuma. Bawah RM5 secawan. |

## Penutup / CTA (53 hingga 60s)

"Order hari ini. WhatsApp atau Shopee." + butang "Tekan Shop Now".

## Kenapa tolak bundle 3 botol

Penghantaran percuma bermula RM100. Satu botol (RM45) tak layak, jadi pembeli satu botol bayar pos. Bundle RM119 layak, dan nilai pesanan lebih tinggi bantu ROAS.

## Ujian

Jalankan ketiga-tiga video dalam satu ad set dengan isi dan CTA yang sama. Bila sudah cukup data, simpan hook yang paling banyak jualan, buang yang lain, dan tulis hook baru untuk batch seterusnya.

## Edit semula

Semua teks ada dalam `render.py`. Tukar teks, kemudian jalankan:

```
pip install pillow
python3 render.py all          # render 3 video ke output/
python3 render.py hook1 --preview   # contact sheet cepat
```
