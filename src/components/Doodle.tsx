"use client";

import { motion } from "framer-motion";

export type DoodleKind =
  | "code" | "coffee" | "bulb" | "notes" | "tennis" | "mountains" | "plane" | "clip";

// Single-stroke sketches on a 120×120 canvas; each path draws itself in order.
const PATHS: Record<DoodleKind, string[]> = {
  code: [
    "M44 34 L20 60 L44 86",
    "M76 34 L100 60 L76 86",
    "M66 28 L54 92",
  ],
  coffee: [
    "M26 54 h58 v22 a22 22 0 0 1 -22 22 h-14 a22 22 0 0 1 -22 -22 z",
    "M84 60 c16 0 16 20 0 20",
    "M42 44 c-7 -8 7 -12 0 -22",
    "M58 44 c-7 -8 7 -12 0 -22",
    "M18 108 h82",
  ],
  bulb: [
    "M60 22 a28 28 0 0 0 -16 51 v12 h32 v-12 a28 28 0 0 0 -16 -51 z",
    "M48 93 h24 M51 101 h18",
    "M52 72 c0 -10 8 -12 8 -20 c0 8 8 10 8 20",
    "M60 4 v9 M24 18 l7 7 M96 18 l-7 7 M8 50 h9 M103 50 h9",
  ],
  notes: [
    "M38 30 C60 24 76 36 70 58 C66 74 52 92 44 96 C36 92 22 74 18 58 C14 36 22 32 38 30 Z",
    "M92 26 v42",
    "M92 68 c0 6 -12 8 -12 2 c0 -6 12 -8 12 -2",
    "M92 26 c8 4 14 10 12 22",
    "M104 78 v20 M104 98 c0 5 -9 6 -9 1 c0 -5 9 -6 9 -1",
  ],
  tennis: [
    "M60 26 C80 26 94 40 94 60 C94 80 80 94 60 94 C40 94 26 80 26 60 C26 40 40 26 60 26 Z",
    "M36 36 C52 48 52 72 36 84",
    "M84 36 C68 48 68 72 84 84",
    "M6 48 h12 M2 60 h14 M6 72 h12",
  ],
  mountains: [
    "M6 98 L40 46 L58 70 L76 50 L114 98",
    "M32 58 l8 6 l8 -6",
    "M90 30 a10 10 0 1 0 0.1 0",
    "M14 30 q5 -6 10 0 q5 -6 10 0",
    "M6 106 h108",
  ],
  plane: [
    "M10 62 L110 22 L80 100 L62 72 Z",
    "M110 22 L62 72",
    "M62 72 L60 94 L72 82",
    "M8 104 C26 112 42 92 30 84 C20 78 14 94 34 98",
  ],
  clip: [
    "M46 14 v72 a14 14 0 0 0 28 0 v-62 a9 9 0 0 0 -18 0 v58",
  ],
};

export default function Doodle({ kind, className, style }: { kind: DoodleKind; className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <defs>
        <filter id={`wobble-${kind}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="2.2" />
        </filter>
      </defs>
      <g filter={`url(#wobble-${kind})`} stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {PATHS[kind].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ pathLength: { duration: 0.8, delay: 0.55 + i * 0.22, ease: "easeInOut" }, opacity: { duration: 0.01, delay: 0.55 + i * 0.22 } }}
          />
        ))}
      </g>
    </svg>
  );
}

// Atlanta skyline, left to right: SkyView wheel, State Capitol, Westin Peachtree Plaza,
// One Atlantic Center, Bank of America Plaza, Truist Plaza, 191 Peachtree Tower.
const SKYLINE_STROKES = [
  "M4 120 H396",
  // SkyView Atlanta
  "M40 73 C52 73 62 83 62 95 C62 107 52 117 40 117 C28 117 18 107 18 95 C18 83 28 73 40 73 Z",
  "M40 73 V117 M18 95 H62 M25 80 L55 110 M55 80 L25 110",
  "M30 120 L40 95 L50 120",
  // Georgia State Capitol
  "M74 120 V104 H126 V120 M74 104 L100 98 L126 104",
  "M89 98 V91 H111 V98",
  "M90 91 C90 77 110 77 110 91",
  "M100 79 V70",
  // Westin Peachtree Plaza
  "M140 120 V42 C140 36 158 36 158 42 V120",
  "M140 42 C140 47 158 47 158 42 M140 58 C146 61 152 61 158 58 M140 74 C146 77 152 77 158 74",
  // One Atlantic Center
  "M170 120 V50 H192 V120 M181 50 V120",
  "M168 50 L181 26 L194 50",
  // Bank of America Plaza
  "M208 120 V42 H238 V120 M223 42 V120",
  "M208 42 L223 16 L238 42 Z M214 42 L223 26 L232 42",
  "M223 16 V2",
  // Truist Plaza
  "M252 120 V60 H256 V54 H260 V48 H268 V54 H272 V60 H276 V120",
  // 191 Peachtree Tower
  "M290 120 V56 H314 V120 M292 56 V47 H299 V56 M305 56 V47 H312 V56",
  // Low-rise
  "M326 120 V86 H346 V120 M352 120 V98 H376 V120 M380 120 V106 H394",
];

// Only the details that really have color: gold leaf on the Capitol dome and the
// Bank of America Plaza crown, and the Westin's glass.
const SKYLINE_FILLS = [
  { d: "M90 91 C90 77 110 77 110 91 Z", fill: "#d4a72c", opacity: 0.9 },
  { d: "M208 42 L223 16 L238 42 Z", fill: "#d4a72c", opacity: 0.85 },
  { d: "M140 120 V42 C140 36 158 36 158 42 V120 Z", fill: "#6f9fc8", opacity: 0.28 },
];

export function Skyline({ className, delay = 0.8 }: { className?: string; delay?: number }) {
  const step = 0.09;
  const fillsAt = delay + SKYLINE_STROKES.length * step + 0.5;
  return (
    <svg className={className} viewBox="0 0 400 124" fill="none" role="img" aria-label="Sketch of the Atlanta skyline">
      <defs>
        <filter id="wobble-skyline">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="11" />
          <feDisplacementMap in="SourceGraphic" scale="1.1" />
        </filter>
      </defs>
      <g filter="url(#wobble-skyline)">
        {SKYLINE_FILLS.map(f => (
          <motion.path
            key={f.d}
            d={f.d}
            fill={f.fill}
            initial={{ opacity: 0 }}
            animate={{ opacity: f.opacity }}
            transition={{ duration: 0.8, delay: fillsAt }}
          />
        ))}
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {SKYLINE_STROKES.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ pathLength: { duration: 0.6, delay: delay + i * step, ease: "easeInOut" }, opacity: { duration: 0.01, delay: delay + i * step } }}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
