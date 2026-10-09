import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../config";

// Word-by-word caption: each word pops in on its own frame, the newest word is gold.
// "\n" in the text forces a line break. Keep lines to 6 words or fewer.
export const WordReveal: React.FC<{
  text: string;
  start?: number; // frame (local) when the first word appears
  perWord?: number; // frames between words
  size: number;
  weight?: number;
  color?: string;
  active?: string;
  align?: "center" | "left";
  lineHeight?: number;
}> = ({ text, start = 0, perWord = 5, size, weight = 900, color = COLORS.ink, active = COLORS.goldDeep, align = "center", lineHeight = 1.12 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines = text.split("\n").map((l) => l.split(" ").filter(Boolean));
  const total = lines.reduce((n, l) => n + l.length, 0);
  let idx = 0;
  return (
    <div style={{ textAlign: align, fontSize: size, fontWeight: weight, lineHeight, letterSpacing: "-0.015em", color }}>
      {lines.map((words, li) => (
        <div key={li} style={{ whiteSpace: "nowrap" }}>
          {words.map((w, wi) => {
            const i = idx++;
            const t0 = start + i * perWord;
            const s = spring({ frame: frame - t0, fps, config: { damping: 14, stiffness: 180 } });
            const visible = frame >= t0;
            // active while it is the newest word; the last word stays gold a little longer
            const isActive = visible && (i === total - 1 ? frame < t0 + perWord * 4 : frame < t0 + perWord);
            return (
              <span
                key={wi}
                style={{
                  display: "inline-block",
                  marginRight: wi < words.length - 1 ? "0.26em" : 0,
                  opacity: visible ? interpolate(s, [0, 1], [0.2, 1]) : 0,
                  transform: `translateY(${interpolate(s, [0, 1], [18, 0])}px) scale(${interpolate(s, [0, 1], [0.92, 1])})`,
                  color: isActive ? active : color,
                }}
              >
                {w}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Fade/slide wrapper so each scene enters and leaves softly.
export const SceneFade: React.FC<{ children: React.ReactNode; dur: number; inF?: number; outF?: number }> = ({ children, dur, inF = 8, outF = 8 }) => {
  const frame = useCurrentFrame();
  // inF = 0 means "already on screen at the first frame" (used for the hook / thumbnail)
  const o = inF === 0
    ? interpolate(frame, [dur - outF, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(frame, [0, inF, dur - outF, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = inF === 0 ? 0 : interpolate(frame, [0, inF], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ position: "absolute", inset: 0, opacity: o, transform: `translateY(${y}px)` }}>{children}</div>;
};
