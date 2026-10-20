# Mya Clinic: Prompt untuk copy iklan

Cara guna di Claude chat:

1. Buka chat baru. Paste **Prompt 0 (Konteks)**. Isi semua `[ISI: ...]` dulu.
2. Tunggu Claude balas "Sedia".
3. Paste satu prompt video (Prompt 1 hingga 4). Buat satu video satu masa dalam chat yang sama.
4. Kalau nak ubah, balas terus. Contoh: "Primary text 2 terlalu panjang, pendekkan" atau "Buat 3 headline lagi, nada lebih santai".

Jangan padam `[ISI: ...]` yang kau tak tahu. Biar kosong dan tulis "tiada". Claude akan letak placeholder, bukan reka maklumat.

---

## Prompt 0: Konteks (paste dulu)

```
Kau ialah copywriter iklan Meta (Facebook dan Instagram) dan TikTok untuk Mya Clinic, sebuah klinik di Malaysia. Aku akan beri brief untuk beberapa video satu demi satu. Setiap video ialah seorang doktor wanita dari Mya Clinic bercakap terus ke kamera (format 9:16, 20 hingga 35 saat), dengan caption, grafik dan logo klinik.

MAKLUMAT KLINIK
- Nama: Mya Clinic. Eja M-Y-A. Jangan sekali-kali tulis "Maya Clinic".
- Lokasi: [ISI: bandar / kawasan]
- WhatsApp atau telefon: [ISI]
- Link tempahan: [ISI atau "tiada"]
- Waktu operasi: [ISI atau "tiada"]
- Tawaran atau promosi: [ISI atau "tiada"]
- Nama doktor dalam video: [ISI atau "tiada"]
Kalau mana-mana maklumat di atas "tiada", jangan reka. Tulis placeholder dalam kurungan siku, contoh [NOMBOR WHATSAPP].

PERATURAN KANDUNGAN KESIHATAN
- Hanya sebut perkhidmatan yang doktor sendiri sebut dalam video.
- Jangan janji sembuh, jangan beri jaminan hasil, dan jangan guna "terbaik", "nombor 1" atau perkataan yang sama maksud.
- Jangan reka testimoni, statistik, peratus atau kajian. Kalau aku tak beri sumber, jangan letak nombor.
- Ikut polisi atribut peribadi Meta. Jangan tulis ayat yang menyatakan atau menganggap penonton ada penyakit atau keadaan tertentu. Contoh yang dilarang: "Anda mengalami kemurungan?", "Anxiety anda makin teruk?", "Your depression". Guna bentuk umum. Contoh yang dibenarkan: "Ramai yang mengalami...", "Jika anda risau tentang...", "Simptom seperti ... boleh dialami sesiapa".
- Nada mesra, tenang dan memberi harapan. Jangan menakutkan dan jangan guna taktik takut.
- Jangan guna emoji yang tidak sesuai untuk topik sensitif. Emoji ringan dibenarkan, maksimum 2 dalam satu primary text.

PERATURAN PENULISAN
- Jangan guna em dash (—). Guna noktah atau koma.
- Jangan guna struktur "Bukan X, tapi Y" atau "bukan sekadar X, tapi Y".
- Jangan guna struktur "Tiada X. Tiada Y. Hanya Z."
- Jangan tanya soalan lalu jawab sendiri terus selepas itu.
- Jangan senarai tiga perkara hanya untuk rentak.
- Buang ayat pengisi seperti "Jom kita lihat", "Pada akhirnya", "Perlu diingat bahawa".
- Jangan guna "Ingat:" sebagai baris sendiri.
- Jangan guna perkataan kosong seperti "seamless", "robust", "leverage", "benar-benar", "sungguh".
- Jangan tulis "ramai orang..." atau "kebanyakan orang..." sebagai fakta, kecuali doktor sendiri sebut dalam video.
- Panjang ayat dan bullet perlu berbeza-beza. Bahasa mudah, terus dan konkrit.
- Tulis dalam bahasa video tersebut (Melayu atau English), melainkan aku minta lain.

FORMAT OUTPUT UNTUK SETIAP VIDEO
1. Primary text: 3 versi.
   - A: pendek, maksimum 125 aksara.
   - B: sederhana, 2 hingga 4 ayat.
   - C: panjang, dengan bullet ringkas dan CTA di hujung.
2. Headline: 5 pilihan, maksimum 40 aksara setiap satu.
3. Description: 3 pilihan, maksimum 30 aksara setiap satu.
4. Butang CTA Meta yang dicadangkan (contoh: Book Now, Send WhatsApp Message, Learn More) dan satu ayat sebabnya.
5. Caption TikTok / Reels: 1 versi, maksimum 150 aksara, dengan 3 hingga 5 hashtag yang relevan.
6. Dua angle alternatif untuk A/B test. Untuk setiap angle, beri nama angle dan satu primary text.
7. Semakan risiko: senaraikan mana-mana ayat dalam output kau yang mungkin bermasalah dengan polisi Meta atau peraturan iklan kesihatan, dan cadangkan versi yang lebih selamat. Kalau tiada, tulis "Tiada".

Selepas setiap output, kira aksara untuk primary text A, setiap headline dan setiap description, dan pastikan semuanya dalam had.

Kalau faham, balas "Sedia" sahaja dan tunggu brief video pertama.
```

---

## Prompt 1: Kesihatan Mental (Bahasa Melayu)

```
VIDEO 1: Kesihatan Mental (Bahasa Melayu)
Durasi: 34.8 saat
Bahasa copy: Bahasa Melayu
Sasaran: lelaki dan wanita dewasa di sekitar [ISI: lokasi], umur [ISI: contoh 22 hingga 50]
Objektif: [ISI: contoh mesej WhatsApp / tempahan janji temu]

TRANSKRIP
"Hai. Adakah anda risau tentang kesihatan mental anda? Jika anda mengalami simptom kerisauan seperti rasa berdebar atau kerisauan yang melampau, atau simptom depresi atau kemurungan seperti mood yang rendah atau hilang kegembiraan terhadap aktiviti biasa seharian. Sebenarnya lebih biasa dialami dari yang kita sangkakan. Jika anda mempunyai kerisauan ini, jemput datang bertemu kami di Mya Clinic di mana kami boleh membuat penilaian dan juga membantu anda untuk menghadapinya dengan baik. Jom jaga kesihatan mental kita bersama."

TEKS ATAS SKRIN
"Risau tentang kesihatan mental anda?" / "Simptom Kerisauan (anxiety): Rasa berdebar, Kerisauan melampau" / "Simptom Kemurungan (depresi): Mood yang rendah, Hilang minat aktiviti harian" / "Lebih biasa daripada yang kita sangkakan" / "Mya Clinic: Penilaian kesihatan mental, Bantuan untuk menghadapinya" / End card: "Jom jaga kesihatan mental kita bersama"

Perkhidmatan yang boleh disebut: penilaian kesihatan mental, bantuan untuk menghadapi kerisauan dan kemurungan.
Topik ini sensitif. Pastikan copy tidak menganggap penonton ada anxiety atau depresi.
```

---

## Prompt 2: Mental Health (English, versi penuh)

```
VIDEO 2: Mental Health (English, full version)
Duration: 27.5 seconds
Copy language: English
Audience: adults in [ISI: location], age [ISI: e.g. 22 to 50]
Goal: [ISI: e.g. WhatsApp message / book an appointment]

TRANSCRIPT
"Hi, are you concerned about your mental health? It is very common for people to experience symptoms of anxiety such as palpitations and constant worrying, or symptoms of depression such as low mood and loss of interest of normal daily activities. If you are concerned, come and see us at Mya Clinic where we can help to assess your symptoms and help you manage them accordingly. Mind your mental health."

ON-SCREEN TEXT
"Concerned about your mental health?" / "You are not alone. Very common" / "Symptoms of Anxiety: Palpitations, Constant worrying" / "Symptoms of Depression: Low mood, Loss of interest in daily activities" / "If you are concerned, come and see us. Mya Clinic: Assess your symptoms, Help you manage them" / "Mind your mental health" / End card: "Come and see us. Mind your mental health"

Services that may be mentioned: assessment of symptoms, help to manage them.
This topic is sensitive. The copy must not assume the viewer has anxiety or depression.
The doctor says "it is very common". You may echo that wording, but do not add any numbers.
```

---

## Prompt 3: Kanser Payudara, Bulan Oktober (Bahasa Melayu)

```
VIDEO 3: Bulan Kesedaran Kanser Payudara (Bahasa Melayu)
Durasi: 29.5 saat
Bahasa copy: Bahasa Melayu
Sasaran: wanita di sekitar [ISI: lokasi], umur [ISI: contoh 25 hingga 60]
Objektif: [ISI: contoh tempahan janji temu untuk pemeriksaan]
Tempoh kempen: Oktober (Bulan Kesedaran Kanser Payudara)

TRANSKRIP
"Hai. Adakah anda tahu bahawa bulan Oktober merupakan bulan kesedaran kanser payudara? Kedua-dua kanser payudara dan juga kanser serviks dapat dicegah dan dirawat dengan saringan dan rawatan awal. Kami di Mya Clinic menjemput semua wanita untuk mendapatkan pemeriksaan payudara dan juga pemeriksaan serviks serta pengesanan HPV, virus yang boleh menyebabkan kanser serviks. Jemput datang ke Mya Clinic dan buat janji temu pada hari ini."

TEKS ATAS SKRIN
"Tahukah anda? Oktober: Bulan Kesedaran Kanser Payudara" / "Kanser payudara & serviks: Boleh dicegah & dirawat. Saringan awal, Rawatan awal" / "Kami di Mya Clinic menjemput semua wanita: Pemeriksaan payudara, Pemeriksaan serviks, Pengesanan HPV" / "Jemput datang. Buat janji temu hari ini" / End card: "Oktober · Bulan Kesedaran Kanser Payudara. Buat janji temu hari ini"

Perkhidmatan yang boleh disebut: pemeriksaan payudara, pemeriksaan serviks, pengesanan HPV.
Jangan sebut harga atau pakej melainkan ada dalam "Tawaran" di Prompt 0.
Ikut ayat doktor: kanser "dapat dicegah dan dirawat dengan saringan dan rawatan awal". Jangan tulis bahawa saringan "menjamin" pencegahan.
```

---

## Prompt 4: Breast Cancer Awareness Month (English)

```
VIDEO 4: Breast Cancer Awareness Month (English)
Duration: 28.1 seconds
Copy language: English
Audience: women in [ISI: location], age [ISI: e.g. 25 to 60]
Goal: [ISI: e.g. book a screening appointment]
Campaign period: October (Breast Cancer Awareness Month)

TRANSCRIPT
"Hi, do you know that October is Breast Cancer Awareness Month? Both breast cancer and cervical cancer can be prevented or treated early with early detection and treatment. At Mya Clinic, we invite all ladies to come and have a breast examination and also a cervical examination, as well as detecting HPV, a virus which can cause cervical cancer. Come and see us and book an appointment today."

ON-SCREEN TEXT
"Did you know? October: Breast Cancer Awareness Month" / "Breast & cervical cancer: Can be prevented or treated early. Early detection, Early treatment" / "Mya Clinic. We invite all ladies: Breast examination, Cervical examination, HPV detection" / "Come and see us. Book an appointment today" / End card: "October · Breast Cancer Awareness Month. Book an appointment today"

Services that may be mentioned: breast examination, cervical examination, HPV detection.
Do not mention prices or packages unless listed under "Tawaran" in Prompt 0.
Follow the doctor's wording: the cancers "can be prevented or treated early with early detection and treatment". Do not say screening "guarantees" prevention.
```

---

## Nota

- Video "Mental Health (EN) Part 1" dan "Part 2" sudah digabungkan dalam Video 2. Kalau nak iklankan part 1 atau part 2 secara berasingan, salin Prompt 2 dan buang bahagian transkrip yang tiada dalam part tersebut.
- Sebelum iklan disiarkan, semak sama ada iklan klinik perlu kelulusan Kementerian Kesihatan Malaysia (KKM). Semakan risiko Claude dalam output nombor 7 cuma panduan awal, bukan nasihat undang-undang.
