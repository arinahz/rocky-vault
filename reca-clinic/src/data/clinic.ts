// ─────────────────────────────────────────────────────────────
// Reca Clinic: all site content lives in this file.
// Edit the values below; components read from here.
// Anything marked [TODO] still needs real clinic information.
// ─────────────────────────────────────────────────────────────

export interface Hours {
  days: string;
  time: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Doctor {
  slug: string;
  name: string;
  qualifications: string;
  mmc: string;
  bio: string;
}

export interface Service {
  slug: string; // becomes the URL: /perkhidmatan/<slug>/
  name: string;
  short: string; // one line, used on cards
  intro: string; // 1–2 sentences under the H1
  about: string[]; // paragraphs
  facts: {
    duration: string;
    price: string;
    booking: string;
    recovery: string;
  };
  suitable: string[];
  steps: { title: string; text: string }[];
  preparation: string;
  aftercare: string;
  risks: string;
  doctor: string; // doctor slug
  faqs: Faq[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface Review {
  quote: string;
  name: string;
  date: string;
}

export const clinic = {
  name: 'Reca Clinic',
  area: '[TODO: Kawasan]',
  type: '[TODO: Jenis klinik]',
  // WhatsApp number in international format, digits only (e.g. 60123456789).
  whatsapp: '60000000000', // [TODO]
  phone: '+60300000000', // [TODO] used in tel: links
  phoneDisplay: '[TODO: 03-XXXX XXXX]',
  address: '[TODO: No., Jalan, Taman, Poskod, Bandar, Negeri]',
  mapsUrl: 'https://maps.google.com/?q=Reca+Clinic', // [TODO] paste the real Google Maps share link
  hoursToday: '[TODO: 9.00 pg–9.00 mlm]',
  hoursShort: '[TODO: Isn–Sab]',
  hours: [
    { days: 'Isnin – Jumaat', time: '[TODO]' },
    { days: 'Sabtu', time: '[TODO]' },
    { days: 'Ahad & cuti umum', time: '[TODO]' },
  ] as Hours[],
  landmark: '[TODO: berhampiran …]',
  kkmNumber: '[TODO]',
  kkliuNumber: '[TODO]',
  doctorCount: '[TODO: bil. doktor]',
  google: {
    rating: '[TODO: 4.x]',
    reviewCount: '[TODO]',
    reviewsUrl: 'https://maps.google.com/?q=Reca+Clinic', // [TODO] link to the Google reviews panel
  },
};

export const doctors: Doctor[] = [
  {
    slug: 'doktor-1',
    name: 'Dr. [TODO: Nama penuh]',
    qualifications: '[TODO: Kelayakan, cth. MBBS (Universiti)]',
    mmc: '[TODO]',
    bio: '[TODO: 2 ayat tentang pengalaman dan bidang tumpuan doktor, ditulis secara faktual.]',
  },
];

const todoService = (n: number): Service => ({
  slug: `perkhidmatan-${n}`, // [TODO] change to a short BM slug, e.g. "rawatan-jerawat"
  name: `[TODO: Perkhidmatan ${n}]`,
  short: '[TODO: Satu ayat, apa rawatan ini dan untuk siapa]',
  intro:
    '[TODO: 1–2 ayat. Apa rawatan ini, siapa yang biasanya memerlukannya, dan apa yang anda boleh jangka semasa lawatan.]',
  about: [
    '[TODO: Penerangan faktual 2–3 perenggan pendek. Apa itu, bagaimana ia dilakukan, berapa lama, dan bila doktor biasanya mencadangkannya.]',
  ],
  facts: {
    duration: '[TODO] minit',
    price: 'Dari RM[TODO]',
    booking: '[TODO: Perlu / Walk-in]',
    recovery: '[TODO]',
  },
  suitable: [
    '[TODO: Situasi atau simptom 1]',
    '[TODO: Situasi atau simptom 2]',
    '[TODO: Situasi atau simptom 3]',
  ],
  steps: [
    { title: 'Pendaftaran', text: 'Tunjukkan kad pengenalan di kaunter.' },
    { title: 'Konsultasi dengan doktor', text: '[TODO: Apa yang doktor akan periksa dan bincangkan]' },
    { title: 'Rawatan', text: '[TODO: Penerangan ringkas prosedur]' },
    { title: 'Susulan', text: '[TODO: Temujanji susulan jika perlu]' },
  ],
  preparation: '[TODO: Apa yang perlu dibuat sebelum datang]',
  aftercare: '[TODO: Penjagaan selepas rawatan dan masa pemulihan biasa]',
  risks: '[TODO: Senarai faktual, disahkan oleh doktor]',
  doctor: 'doktor-1',
  faqs: [
    { q: 'Adakah rawatan ini sakit?', a: '[TODO: Jawapan faktual daripada doktor]' },
    { q: 'Berapa sesi yang diperlukan?', a: '[TODO: Bergantung pada penilaian doktor, julat biasa]' },
    { q: 'Bolehkah saya bekerja selepas rawatan?', a: '[TODO]' },
  ],
});

export const services: Service[] = [todoService(1), todoService(2), todoService(3), todoService(4)];

export const reviews: Review[] = [
  { quote: '[TODO: Petikan ulasan Google sebenar, disalin tanpa diubah.]', name: '[TODO: Nama]', date: '[TODO: Bulan Tahun]' },
  { quote: '[TODO: Petikan ulasan Google sebenar, disalin tanpa diubah.]', name: '[TODO: Nama]', date: '[TODO: Bulan Tahun]' },
];

export const faqs: Faq[] = [
  { q: 'Perlukah saya buat temujanji dahulu?', a: '[TODO: Jawapan klinik, cth. walk-in diterima atau temujanji sahaja]' },
  { q: 'Berapakah kos konsultasi?', a: '[TODO: Julat harga atau “dari RM…”, dan apa yang termasuk]' },
  { q: 'Adakah klinik menerima panel atau insurans?', a: '[TODO: Senarai panel / syarikat insurans]' },
  { q: 'Ada tempat letak kereta?', a: '[TODO: Maklumat parkir]' },
];
