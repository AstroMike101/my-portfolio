import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Michael Chen: software engineer based in Atlanta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (pkg: string, file: string) =>
  readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

// Marker-style highlight, matching the hand-drawn ones on the index note.
const mark = (color: string) => ({
  backgroundColor: color,
  borderRadius: 6,
  padding: "0 6px",
  margin: "0 -2px",
});

export default async function OpengraphImage() {
  const [display, body, mono] = await Promise.all([
    font("cormorant-garamond", "cormorant-garamond-latin-300-italic.woff"),
    font("eb-garamond", "eb-garamond-latin-400-normal.woff"),
    font("dm-mono", "dm-mono-latin-400-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 84px",
          backgroundColor: "#EEEEEA",
          backgroundImage: "radial-gradient(circle, #cfcfc7 1.6px, transparent 1.6px)",
          backgroundSize: "28px 28px",
          color: "#111110",
          fontFamily: "EB Garamond",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "DM Mono", fontSize: 20, letterSpacing: 3, color: "#79796e" }}>
          <span>INDEX</span>
          <span>MICHAELCHEN.LIVE</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Cormorant Garamond", fontStyle: "italic", fontWeight: 300, fontSize: 150, lineHeight: 1, letterSpacing: -3 }}>
            Michael Chen
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 34, fontSize: 42, lineHeight: 1.5 }}>
            <div style={{ display: "flex", whiteSpace: "pre" }}>
              <span>{"I'm a "}</span>
              <span style={{ ...mark("rgba(24,85,163,.2)"), color: "#1855a3" }}>software engineer</span>
              <span>{" based in Atlanta, fuelled by"}</span>
            </div>
            <div style={{ display: "flex", whiteSpace: "pre" }}>
              <span style={{ ...mark("rgba(42,112,48,.2)"), color: "#2a7030" }}>good music</span>
              <span>{", "}</span>
              <span style={{ ...mark("rgba(184,74,16,.2)"), color: "#b84a10" }}>fun side quests</span>
              <span>{", and a "}</span>
              <span style={{ ...mark("rgba(154,112,0,.22)"), color: "#9a7000" }}>restless need to explore</span>
              <span>.</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["#1855a3", "#2a7030", "#b84a10", "#9a7000"].map(c => (
            <div key={c} style={{ width: 14, height: 14, borderRadius: 99, backgroundColor: c }} />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant Garamond", data: display, style: "italic", weight: 300 },
        { name: "EB Garamond", data: body, style: "normal", weight: 400 },
        { name: "DM Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
