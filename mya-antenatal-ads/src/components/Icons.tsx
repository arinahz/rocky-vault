import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../config";

// Stylised pregnancy test with two lines drawing in (graphic, not stock or AI imagery).
export const TestStrip: React.FC<{ width: number; line1At: number; line2At: number }> = ({ width, line1At, line2At }) => {
  const frame = useCurrentFrame();
  const l1 = interpolate(frame, [line1At, line1At + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const l2 = interpolate(frame, [line2At, line2At + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow = interpolate(frame, [line2At + 8, line2At + 20, line2At + 40], [0, 1, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <svg width={width} viewBox="0 0 200 520" style={{ overflow: "visible" }}>
      <defs>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <rect x="20" y="10" width="160" height="500" rx="80" fill="#fff" stroke={COLORS.black} strokeWidth="6" />
      <rect x="20" y="370" width="160" height="140" rx="70" fill={COLORS.creamDeep} stroke={COLORS.black} strokeWidth="6" />
      <rect x="55" y="120" width="90" height="190" rx="22" fill={COLORS.cream} stroke={COLORS.black} strokeWidth="5" />
      <rect x="60" y="180" width="80" height="14" rx="7" fill={COLORS.gold} opacity={glow} filter="url(#soft)" />
      <rect x="60" y="240" width="80" height="14" rx="7" fill={COLORS.gold} opacity={glow} filter="url(#soft)" />
      <rect x="65" y="182" width={70 * l1} height="10" rx="5" fill={COLORS.goldDeep} />
      <rect x="65" y="242" width={70 * l2} height="10" rx="5" fill={COLORS.goldDeep} />
    </svg>
  );
};

export const Tick: React.FC<{ size: number; at: number }> = ({ size, at }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sc = interpolate(frame, [at, at + 6, at + 12], [0, 1.15, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ width: size, height: size, borderRadius: size, background: COLORS.black, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${sc})`, flex: "none" }}>
      <svg width={size * 0.6} viewBox="0 0 24 24">
        <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke={COLORS.gold} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="22" strokeDashoffset={22 * (1 - p)} />
      </svg>
    </div>
  );
};

const stroke = { fill: "none", stroke: COLORS.black, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
export const BookIcon = ({ s }: { s: number }) => (
  <svg width={s} viewBox="0 0 24 24"><path {...stroke} d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" /><path {...stroke} d="M5 17a3 3 0 0 1 3-3h10M9 8h5" /></svg>
);
export const PhoneIcon = ({ s }: { s: number }) => (
  <svg width={s} viewBox="0 0 24 24"><rect {...stroke} x="7" y="3" width="10" height="18" rx="2.5" /><path {...stroke} d="M11 18h2" /></svg>
);
export const ListIcon = ({ s }: { s: number }) => (
  <svg width={s} viewBox="0 0 24 24"><rect {...stroke} x="5" y="4" width="14" height="17" rx="2" /><path {...stroke} d="M9 9h6M9 13h6M9 17h3" /><path {...stroke} d="M10 4V3h4v1" /></svg>
);
export const WhatsAppIcon = ({ s, color = "#fff" }: { s: number; color?: string }) => (
  <svg width={s} viewBox="0 0 24 24">
    <path fill={color} d="M12 2.2a9.7 9.7 0 0 0-8.3 14.7L2.3 21.8l5-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.2.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2c0 1.2.9 2.3 1 2.5.1.2 1.7 2.6 4.1 3.6 1.5.7 2.1.7 2.9.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.5-.3z" />
  </svg>
);
