import React from "react";
import { Composition, continueRender, delayRender, staticFile } from "remotion";
import { AntenatalAd, AdProps } from "./AntenatalAd";
import { BranchKey, DURATION_S, FORMATS, FormatKey, FPS } from "./config";

// Load bundled Poppins (no CDN) before any frame renders.
const fontHandle = delayRender("fonts");
Promise.all(
  [600, 700, 800, 900].map((w) => {
    const f = new FontFace("Poppins", `url(${staticFile(`fonts/poppins-latin-${w}-normal.woff2`)})`, { weight: String(w) });
    return f.load().then((loaded) => document.fonts.add(loaded));
  }),
).then(() => continueRender(fontHandle));

// Composition id doubles as the output file name stem.
// Angle A only for now ("2Garis"); B and C get their own components after approval.
const variants: { branch: BranchKey; format: FormatKey }[] = [
  { branch: "KTN", format: "9x16" },
  { branch: "KTN", format: "4x5" },
  { branch: "MLW", format: "9x16" },
  { branch: "MLW", format: "4x5" },
];

export const Root: React.FC = () => (
  <>
    {variants.map((v) => (
      <Composition
        key={`${v.branch}-${v.format}`}
        id={`${v.branch}-Antenatal-2Garis-${v.format}`}
        component={AntenatalAd as React.FC<AdProps>}
        durationInFrames={DURATION_S * FPS}
        fps={FPS}
        width={FORMATS[v.format].width}
        height={FORMATS[v.format].height}
        defaultProps={v}
      />
    ))}
  </>
);
