// Brand + campaign data. Facts here must come from the client; anything unconfirmed stays out.

export const COLORS = {
  // sampled: gold from the clinic wall signage, black from the logo on the FAQ poster
  gold: "#ac9364",
  goldDeep: "#8a733f", // darker gold for text on cream (contrast)
  black: "#050505",
  ink: "#1a1712",
  cream: "#faf5ee", // poster background
  creamDeep: "#f1e8da",
  whatsapp: "#25d366",
};

export const FPS = 30;
export const DURATION_S = 24;

export type BranchKey = "KTN" | "MLW";
export type FormatKey = "9x16" | "4x5";

export const BRANCHES: Record<BranchKey, { line: string; waDisplay: string; waLink: string; image: string; imageAlt: string }> = {
  KTN: {
    line: "Kg Pandan · Semambu · Gambang",
    waDisplay: "017-979 45092", // [SAHKAN] number has one extra digit for a 017 line
    waLink: "wa.me/601797945092",
    image: "img/peta-kuantan.png",
    imageAlt: "Peta 3 cawangan Mya Clinic Kuantan",
  },
  MLW: {
    line: "Kini di Wangsa Melawati",
    waDisplay: "017-561 4170",
    waLink: "wa.me/60175614170",
    image: "img/melawati-kaunter.jpg",
    imageAlt: "Kaunter Mya Clinic Melawati",
  },
};

export const FORMATS: Record<FormatKey, { width: number; height: number; safeTop: number; safeBottom: number; scale: number }> = {
  // 9:16 keeps text out of the top 14% and bottom 20%
  "9x16": { width: 1080, height: 1920, safeTop: 269, safeBottom: 1536, scale: 1 },
  "4x5": { width: 1080, height: 1350, safeTop: 80, safeBottom: 1270, scale: 0.82 },
};

export const CTA_TEXT = "WhatsApp kami\nuntuk temujanji";
export const TAGLINE = "Safe Space for Women";
