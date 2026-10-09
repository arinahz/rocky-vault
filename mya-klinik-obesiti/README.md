# Mya Clinic: Klinik Obesiti (versi improve, Hyperframes)

Edit semula video `assets/video/klinik-obesiti-raw.mp4` (31.6s) jadi 19s, 1080x1920, dengan hook thumbstop.

- Output: `renders/mya-klinik-obesiti.mp4`
- Komposisi: `index.html`. Footage asal di-crop terus dari video mentah (atribut `data-rect` = kawasan sumber x0,y0,x1,y1).
- Audio asal diganti dengan beat dan SFX yang dijana oleh `tools/make_sfx.py`.

## Struktur

| Scene | Masa | Isi |
|---|---|---|
| Hook | 0 - 3.3s | Potongan pantas: "Dah jaga makan" (klip makanan), "Dah selalu bersenam" (klip senaman), slam "Tapi badan tak berubah?" atas klip penimbang + boom |
| Masalah | 3.3 - 6.9s | "Usaha sendiri rasa tak cukup?" / "Kadang-kadang, anda cuma perlukan bimbingan" |
| Langkah | 6.9 - 10.3s | "Konsultasi di klinik" / "Fahami keperluan badan anda dengan jelas" |
| Sokongan | 10.3 - 13.8s | "Anda tak bersendirian": Dietitian + Pegawai sains sukan, sepanjang journey |
| CTA | 13.8 - 19s | "Ada soalan?" / "Komen atau DM kami!" + Like, Komen, Share |

Semua mesej diambil dari video asal, cuma disusun semula dan dipendekkan.

## Perhatian polisi iklan Meta

Iklan berkaitan berat badan disemak ketat. Hook "Tapi badan tak berubah?" datang dari video asal dan tidak menyebut "anda", tapi kalau iklan ditolak, tukar `#slam` kepada ayat umum seperti "Kenapa susah sangat nak berubah?".
