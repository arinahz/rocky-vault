# Melangkah Selepas Patah: Landing Page Brief

Draf page: `melangkah-selepas-patah-lp.html` (artifact: https://claude.ai/artifact/NmnAqkZ8vW5oXneKEHrzbG)
Produk: Turath: Melangkah Selepas Patah: Seni Berdamai dengan Kehilangan (2026), PTS Publishing House. RM27 (asal RM30).

Status: **provisional**. Strategi dibina daripada product page, kulit buku dan nota [[Don’t sell to who they are. Sell to when it hurts.]]. Belum ada data pelanggan sebenar (komen iklan, ulasan, soalan CS).

## Tugas page (satu ayat)
Buat ibu atau ayah yang baru kehilangan anak rasa buku ini ditulis untuk mereka, lalu beli satu naskhah RM27 di Shop@PTS.

## Angle
- **Value prop:** terjemahan Melayu kitab klasik *Bard al-Akbad 'inda Faqd al-Awlad* oleh ulama hadis Damsyik, 232 m/s.
- **Benefit:** penghiburan bersandarkan hadis yang boleh dibaca sedikit demi sedikit.
- **Angle:** ibu bapa yang anaknya pergi dahulu (keguguran, bayi, kanak-kanak), pada saat "orang tanya anak berapa orang" atau "baju kecil masih dalam almari".

Kenapa ini dan bukan "semua jenis kehilangan": tajuk Arab pada kulit hadapan bermaksud "penyejuk hati ketika kehilangan anak", dan kulit menunjukkan sepasang suami isteri. Blurb PTS terlalu umum, jadi page ini menajamkannya. **Semak dengan editor PTS** bahawa isi terjemahan kekal fokus kepada kehilangan anak.

## 5 soalan diagnosis (jawapan andaian, sahkan)
1. Untuk siapa: ibu bapa Muslim yang kehilangan anak dalam 0 hingga 24 bulan lepas.
2. Masalah: rindu, rasa bersalah, dan "sabar" terasa kosong.
3. Janji iklan: mesti sama dengan hero ("Tangan masih ingat beratnya...").
4. Skeptisisme: kitab lama = bahasa berat; takut buku menyuruh "move on"; adakah sesuai untuk kehilangan lain.
5. Beli apa: 1 naskhah RM27. Pembeli kedua: sahabat yang mahu beri hadiah takziah.

## Calon sebab (dipendekkan) dan 5 yang dipilih
Calon yang dibuang: "terbitan PTS dipercayai" (pesaing boleh claim), "kulit cantik" (tak jejas keputusan), "harga murah" (sudah di tawaran), "penterjemah berpengalaman" (tiada bukti), "sesuai semua umur" (melemahkan angle), "bahasa mudah" (belum dibuktikan).

Dipilih, ikut urutan:
1. Bercakap terus tentang kehilangan anak. Bukti: tajuk Arab pada kulit.
2. Penghiburan bersandar hadis. Bukti: kredibiliti penulis.
3. Memberi ruang bersedih. Bukti: petikan kulit belakang. Menjawab bantahan "takut disuruh move on".
4. Nipis, boleh baca sikit-sikit. Bukti: 232 m/s, 19.5 x 13.5 cm, 0.23 kg.
5. Hadiah takziah. Menutup jualan dan membuka pembeli kedua.

## Modul dan soalan yang dijawab
| Modul | Soalan pembaca |
|---|---|
| Hero | Ini apa, untuk saya ke, berapa? |
| Saat-saat (moments) | Adakah mereka faham apa yang saya rasa? |
| 5 sebab | Kenapa buku ini dan bukan nasihat biasa? |
| Petikan + kredibiliti | Bahasanya macam mana? Siapa penulis? |
| Tawaran | Berapa sebenarnya, ada apa-apa bonus? |
| FAQ | Bantahan terakhir sebelum beli |
| CTA akhir | Ulang tawaran |

## Perlu diisi sebelum iklan jalan
- [ ] URL produk Shop@PTS dalam `CHECKOUT_URL` (skrip bawah page)
- [ ] Tarikh tamat tawaran sebenar
- [ ] 2 testimoni sebenar (ibu/ayah yang kehilangan anak; pemberi hadiah), dengan izin
- [ ] Nombor bukti sosial sebenar (naskhah terjual / ulasan)
- [ ] Tempoh dan kos penghantaran
- [ ] Sahkan dengan editor: isi tentang kehilangan anak, dan hadis Nabi ﷺ menangis atas pemergian Ibrahim (Sahih al-Bukhari) relevan dengan buku
- [ ] Pasang pixel TikTok/Meta: ViewContent, klik `data-track` CTA, AddToCart, Purchase

## Ad → page → checkout
Iklan mesti guna hook yang sama dengan hero dan tunjuk kulit buku yang sama. Jangan hantar trafik iklan ke product page Shop@PTS terus; blurb di sana terlalu umum untuk angle ini.

## Pelan ujian (ikut keutamaan)
1. **Angle:** ibu bapa kehilangan anak vs pemberi hadiah takziah (page kedua, hero berbeza).
2. **Hook hero:** "Tangan masih ingat beratnya" vs "Orang tanya anak berapa orang. Anda diam sekejap."
3. **Urutan sebab:** sebab 5 (hadiah) di tempat 2 untuk trafik pemberi hadiah.
4. **Bukti:** testimoni ibu vs petikan kitab di atas lipatan.
5. **Tawaran:** 1 naskhah vs "beli 2, satu untuk sahabat" (perlu kelulusan PTS jika ada harga pakej).
6. Perkara kecil (warna butang, teks CTA) hanya selepas di atas.

Metrik: scroll depth, klik CTA (per `data-track`), add-to-cart, purchase, revenue per session, conversion ikut angle.

## Nota sensitiviti
Audiens sedang berduka. Elakkan urgency agresif (kiraan detik, "stok hampir habis") dan retargeting yang terlalu kerap. Tarikh tamat sebenar sahaja.
