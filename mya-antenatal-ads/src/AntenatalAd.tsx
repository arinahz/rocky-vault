import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BRANCHES, BranchKey, COLORS, CTA_TEXT, FORMATS, FormatKey, TAGLINE } from "./config";
import { SceneFade, WordReveal } from "./components/WordReveal";
import { BookIcon, ListIcon, PhoneIcon, Tick, TestStrip, WhatsAppIcon } from "./components/Icons";

export type AdProps = { branch: BranchKey; format: FormatKey };

// Scene timing (frames @30fps). ACR: Attention 0-90, Credibility 90-540, Response 540-720.
const T = { hook: [0, 90], feel: [90, 180], intro: [180, 270], list: [270, 450], bring: [450, 540], cta: [540, 645], end: [645, 720] } as const;
const len = (k: keyof typeof T) => T[k][1] - T[k][0];

const Frame: React.FC<{ format: FormatKey; children: React.ReactNode }> = ({ format, children }) => {
  const f = FORMATS[format];
  // content box = safe zone; children lay out inside it
  return (
    <div style={{ position: "absolute", left: 70, right: 70, top: f.safeTop, height: f.safeBottom - f.safeTop, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {children}
    </div>
  );
};

const Pill: React.FC<{ children: React.ReactNode; s: number; dark?: boolean }> = ({ children, s, dark }) => (
  <div style={{ display: "inline-block", padding: `${14 * s}px ${36 * s}px`, borderRadius: 999, background: dark ? COLORS.black : COLORS.gold, color: dark ? COLORS.gold : COLORS.black, fontWeight: 800, fontSize: 40 * s }}>{children}</div>
);

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 60) * 30;
  return (
    <AbsoluteFill style={{ background: COLORS.cream }}>
      <div style={{ position: "absolute", width: 900, height: 900, borderRadius: 900, left: -380 + drift, top: -300, background: COLORS.creamDeep }} />
      <div style={{ position: "absolute", width: 1000, height: 1000, borderRadius: 1000, right: -520 - drift, bottom: -380, background: COLORS.creamDeep }} />
    </AbsoluteFill>
  );
};

const Watermark: React.FC<{ format: FormatKey }> = ({ format }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [10, 25, 640, 650], [0, 0.9, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <Img src={staticFile("img/icon-gold.png")} style={{ position: "absolute", right: 60, top: FORMATS[format].safeTop - 10, width: 96 * FORMATS[format].scale, opacity: o }} />;
};

export const AntenatalAd: React.FC<AdProps> = ({ branch, format }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = FORMATS[format].scale;
  const b = BRANCHES[branch];

  return (
    <AbsoluteFill style={{ fontFamily: "Poppins, sans-serif", color: COLORS.ink }}>
      <Background />

      {/* ATTENTION: third person, no assumption about the viewer */}
      <Sequence from={T.hook[0]} durationInFrames={len("hook")}>
        <SceneFade dur={len("hook")} inF={0}>
          <Frame format={format}>
            <WordReveal text={"Untuk mummies yang\nbaru dapat 2 garis..."} start={-12} perWord={4} size={80 * s} />
            <div style={{ height: 50 * s }} />
            <TestStrip width={260 * s} line1At={14} line2At={30} />
          </Frame>
        </SceneFade>
      </Sequence>

      <Sequence from={T.feel[0]} durationInFrames={len("feel")}>
        <SceneFade dur={len("feel")}>
          <Frame format={format}>
            <Img src={staticFile("img/icon-gold.png")} style={{ width: 360 * s, marginBottom: 60 * s, transform: `scale(${1 + Math.sin((frame - T.feel[0]) / 9) * 0.03})` }} />
            <WordReveal text={"Excited, tapi berdebar\nnak ke klinik?"} start={4} perWord={5} size={70 * s} />
          </Frame>
        </SceneFade>
      </Sequence>

      <Sequence from={T.intro[0]} durationInFrames={len("intro")}>
        <SceneFade dur={len("intro")}>
          <Frame format={format}>
            <Pill s={s} dark>Lawatan antenatal pertama</Pill>
            <div style={{ height: 40 * s }} />
            <WordReveal text={"Ni yang mummies\nperlu tahu"} start={8} perWord={5} size={96 * s} />
          </Frame>
        </SceneFade>
      </Sequence>

      {/* CREDIBILITY: the three facts come from Mya Clinic's own FAQ poster */}
      <Sequence from={T.list[0]} durationInFrames={len("list")}>
        <SceneFade dur={len("list")}>
          <Frame format={format}>
            {[
              "Waktu sesuai scan:\nsebelum 12 minggu",
              "Scan bantu kira jangkaan\ntarikh bersalin (EDD)",
              "'Buka buku' sebelum\nminggu ke-12",
            ].map((txt, i) => {
              const at = 6 + i * 55;
              const p = spring({ frame: frame - T.list[0] - at, fps, config: { damping: 16 } });
              return (
                <div key={i} style={{ width: "100%", display: "flex", alignItems: "center", gap: 30 * s, padding: `${34 * s}px ${36 * s}px`, marginBottom: 34 * s, borderRadius: 40 * s, background: "#fff", border: `4px solid ${COLORS.black}`, boxShadow: `14px 14px 0 ${COLORS.gold}`, opacity: p, transform: `translateX(${interpolate(p, [0, 1], [120, 0])}px)` }}>
                  <Tick size={92 * s} at={at + 8} />
                  <WordReveal text={txt} start={at + 4} perWord={4} size={48 * s} weight={800} align="left" lineHeight={1.18} />
                </div>
              );
            })}
          </Frame>
        </SceneFade>
      </Sequence>

      <Sequence from={T.bring[0]} durationInFrames={len("bring")}>
        <SceneFade dur={len("bring")}>
          <Frame format={format}>
            <WordReveal text={"Tak perlu risau.\nBawa ni je:"} start={2} perWord={5} size={90 * s} />
            <div style={{ height: 60 * s }} />
            <div style={{ display: "flex", gap: 28 * s, width: "100%", justifyContent: "center" }}>
              {[
                { icon: <BookIcon s={96 * s} />, t: "Buku rekod" },
                { icon: <PhoneIcon s={96 * s} />, t: "Telefon" },
                { icon: <ListIcon s={96 * s} />, t: "Senarai soalan" },
              ].map((it, i) => {
                const p = spring({ frame: frame - T.bring[0] - 30 - i * 10, fps, config: { damping: 12 } });
                return (
                  <div key={i} style={{ flex: 1, maxWidth: 290 * s, padding: `${34 * s}px ${16 * s}px`, borderRadius: 36 * s, background: "#fff", border: `4px solid ${COLORS.black}`, textAlign: "center", transform: `scale(${p})` }}>
                    {it.icon}
                    <div style={{ fontWeight: 800, fontSize: 40 * s, marginTop: 14 * s, lineHeight: 1.15 }}>{it.t}</div>
                  </div>
                );
              })}
            </div>
          </Frame>
        </SceneFade>
      </Sequence>

      {/* RESPONSE */}
      <Sequence from={T.cta[0]} durationInFrames={len("cta")}>
        <SceneFade dur={len("cta")} outF={6}>
          <Frame format={format}>
            <WordReveal text={CTA_TEXT} start={2} perWord={5} size={92 * s} />
            <div style={{ height: 40 * s }} />
            <Img src={staticFile(b.image)} style={{ width: (format === "9x16" ? 520 : 420) * s, maxHeight: (format === "9x16" ? 560 : 380) * s, objectFit: "cover", borderRadius: 30 * s, border: `5px solid ${COLORS.black}`, boxShadow: `14px 14px 0 ${COLORS.gold}` }} />
            <div style={{ height: 46 * s }} />
            {(() => {
              const p = spring({ frame: frame - T.cta[0] - 30, fps, config: { damping: 11 } });
              const pulse = 1 + Math.max(0, Math.sin((frame - T.cta[0] - 50) / 6)) * 0.04;
              return (
                <div style={{ display: "flex", alignItems: "center", gap: 22 * s, padding: `${26 * s}px ${50 * s}px`, borderRadius: 999, background: COLORS.black, color: COLORS.gold, fontWeight: 900, fontSize: 58 * s, transform: `scale(${p * pulse})` }}>
                  <WhatsAppIcon s={70 * s} color={COLORS.gold} />
                  {b.waDisplay}
                </div>
              );
            })()}
          </Frame>
        </SceneFade>
      </Sequence>

      <Sequence from={T.end[0]} durationInFrames={len("end")}>
        <SceneFade dur={len("end")} outF={1}>
          <Frame format={format}>
            <Img src={staticFile("img/logo-horizontal-black.png")} style={{ width: 820 * s }} />
            <div style={{ height: 30 * s }} />
            <div style={{ fontWeight: 800, fontSize: 52 * s, color: COLORS.goldDeep, letterSpacing: "0.02em" }}>{TAGLINE}</div>
            <div style={{ height: 50 * s }} />
            <Pill s={s} dark>{b.line}</Pill>
            <div style={{ height: 40 * s }} />
            <div style={{ display: "flex", alignItems: "center", gap: 14 * s, fontWeight: 800, fontSize: 46 * s }}>
              <WhatsAppIcon s={52 * s} color={COLORS.black} /> {b.waDisplay}
            </div>
          </Frame>
        </SceneFade>
      </Sequence>

      <Watermark format={format} />

      {/* placeholder music (synthesized, low volume) + soft sfx */}
      <Audio src={staticFile("sfx/bed-soft.wav")} volume={(f) => interpolate(f, [0, 15, 690, 720], [0, 0.28, 0.28, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      {[0, 280, 335, 390].map((f, i) => (
        <Sequence key={"p" + i} from={f} durationInFrames={10}><Audio src={staticFile("sfx/pop.wav")} volume={0.45} /></Sequence>
      ))}
      {[14, 30, 284, 339, 394].map((f, i) => (
        <Sequence key={"d" + i} from={f} durationInFrames={27}><Audio src={staticFile("sfx/ding.wav")} volume={0.35} /></Sequence>
      ))}
      {[89, 179, 269, 449, 539, 644].map((f, i) => (
        <Sequence key={"w" + i} from={f} durationInFrames={15}><Audio src={staticFile("sfx/whoosh.wav")} volume={0.35} /></Sequence>
      ))}
      <Sequence from={570} durationInFrames={10}><Audio src={staticFile("sfx/pop.wav")} volume={0.6} /></Sequence>
    </AbsoluteFill>
  );
};
