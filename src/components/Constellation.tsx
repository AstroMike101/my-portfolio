"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

type Pt = [number, number];

// A tiny stroke alphabet on a 4×6 grid (y down). Each glyph is a list of
// polylines; every vertex becomes a star. The text drawn comes from what the
// visitor typed, so no particular word lives in this file.
const O: Pt[] = [[1, 0], [3, 0], [4, 1], [4, 5], [3, 6], [1, 6], [0, 5], [0, 1], [1, 0]];
const P: Pt[] = [[0, 6], [0, 0], [3, 0], [4, 1], [4, 2], [3, 3], [0, 3]];
const GLYPHS: Record<string, Pt[][]> = {
  a: [[[0, 6], [2, 0], [4, 6]], [[1, 3.5], [3, 3.5]]],
  b: [[[0, 6], [0, 0], [3, 0], [4, 1], [4, 2], [3, 3], [0, 3]], [[3, 3], [4, 4], [4, 5], [3, 6], [0, 6]]],
  c: [[[4, 1], [3, 0], [1, 0], [0, 1], [0, 5], [1, 6], [3, 6], [4, 5]]],
  d: [[[0, 0], [0, 6], [3, 6], [4, 5], [4, 1], [3, 0], [0, 0]]],
  e: [[[4, 0], [0, 0], [0, 6], [4, 6]], [[0, 3], [3, 3]]],
  f: [[[4, 0], [0, 0], [0, 6]], [[0, 3], [3, 3]]],
  g: [[[4, 1], [3, 0], [1, 0], [0, 1], [0, 5], [1, 6], [3, 6], [4, 5], [4, 3], [2, 3]]],
  h: [[[0, 0], [0, 6]], [[4, 0], [4, 6]], [[0, 3], [4, 3]]],
  i: [[[1, 0], [3, 0]], [[2, 0], [2, 6]], [[1, 6], [3, 6]]],
  j: [[[4, 0], [4, 5], [3, 6], [1, 6], [0, 5]]],
  k: [[[0, 0], [0, 6]], [[4, 0], [0, 3.5]], [[1.2, 2.8], [4, 6]]],
  l: [[[0, 0], [0, 6], [4, 6]]],
  m: [[[0, 6], [0, 0], [2, 3], [4, 0], [4, 6]]],
  n: [[[0, 6], [0, 0], [4, 6], [4, 0]]],
  o: [O],
  p: [P],
  q: [O, [[2.5, 4.5], [4, 6]]],
  r: [P, [[2, 3], [4, 6]]],
  s: [[[4, 1], [3, 0], [1, 0], [0, 1], [0, 2], [1, 3], [3, 3], [4, 4], [4, 5], [3, 6], [1, 6], [0, 5]]],
  t: [[[0, 0], [4, 0]], [[2, 0], [2, 6]]],
  u: [[[0, 0], [0, 5], [1, 6], [3, 6], [4, 5], [4, 0]]],
  v: [[[0, 0], [2, 6], [4, 0]]],
  w: [[[0, 0], [1, 6], [2, 3], [3, 6], [4, 0]]],
  x: [[[0, 0], [4, 6]], [[4, 0], [0, 6]]],
  y: [[[0, 0], [2, 3], [4, 0]], [[2, 3], [2, 6]]],
  z: [[[0, 0], [4, 0], [0, 6], [4, 6]]],
  "+": [[[2, 1.5], [2, 4.5]], [[0.5, 3], [3.5, 3]]],
};

const W = 440, H = 400;
const STEP = 0.16;      // seconds between strokes
const START = 0.9;      // first stroke, once the sky has darkened

const pathOf = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

export default function Constellation({ text, calm, onDone }: { text: string; calm: boolean; onDone: () => void }) {
  const scene = useMemo(() => {
    // "abcd" → "ab + cd"
    const half = Math.ceil(text.length / 2);
    const chars = [...`${text.slice(0, half)}+${text.slice(half)}`.toLowerCase()];

    const unit = 9, gap = 2.4;
    const totalW = (chars.length * 4 + (chars.length - 1) * gap) * unit;
    const ox = (W - totalW) / 2, oy = H * 0.4 - 3 * unit;
    const strokes: Pt[][] = [];
    chars.forEach((ch, i) => {
      (GLYPHS[ch] ?? []).forEach(line =>
        strokes.push(line.map(([x, y]) => [ox + (x + i * (4 + gap)) * unit, oy + y * unit])),
      );
    });

    // Heart curve, fitted to the canvas, sampled into star points.
    const raw: Pt[] = Array.from({ length: 23 }, (_, k) => {
      const t = (k / 22) * Math.PI * 2;
      return [16 * Math.sin(t) ** 3, -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))];
    });
    const xs = raw.map(p => p[0]), ys = raw.map(p => p[1]);
    const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const k = Math.min((W - 40) / (maxX - minX), (H - 40) / (maxY - minY));
    const fitted: Pt[] = raw.map(([x, y]) => [W / 2 + (x - (minX + maxX) / 2) * k, H / 2 + (y - (minY + maxY) / 2) * k]);
    // The curve's sampling bunches up at the dip and the tip; drop near-duplicate stars.
    const heart: Pt[] = [];
    for (const p of fitted) {
      const last = heart[heart.length - 1];
      if (!last || Math.hypot(p[0] - last[0], p[1] - last[1]) > 26) heart.push(p);
    }
    heart.push(heart[0]); // close the loop back at the dip

    const sky = Array.from({ length: 70 }, () => ({
      x: Math.random() * 100, y: Math.random() * 100, r: 0.6 + Math.random() * 1.2, d: Math.random() * 3, s: 1.6 + Math.random() * 2.4,
    }));
    return { strokes, heart, sky };
  }, [text]);

  const heartAt = START + scene.strokes.length * STEP + 0.6;
  const shootAt = heartAt + 1.8;
  const total = shootAt + 3.4;   // linger on the finished sky before fading
  const t = (s: number) => (calm ? 0 : s);

  useEffect(() => {
    const id = setTimeout(onDone, total * 1000);
    return () => clearTimeout(id);
  }, [onDone, total]);

  const star = (x: number, y: number, at: number, key: string, big = false) => (
    <motion.circle
      key={key}
      cx={x} cy={y} r={big ? 2.8 : 2.2}
      fill="#fff"
      filter="url(#glow)"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: calm ? 1 : [0, 1, 0.75, 1], scale: [0, 1.6, 1] }}
      transition={{ duration: 0.6, delay: t(at), opacity: { duration: 2.4, delay: t(at), times: [0, 0.15, 0.6, 1] } }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    />
  );

  return (
    <motion.div
      className="sky"
      onClick={onDone}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: total, times: [0, 0.6 / total, (total - 0.9) / total, 1], ease: "linear" }}
    >
      <style>{`
        .sky {
          position: fixed; inset: 0; z-index: 70; display: flex; align-items: center; justify-content: center; cursor: pointer; overflow: hidden;
          background: radial-gradient(120% 90% at 50% 100%, #2a2f5c 0%, #141936 45%, #070a1a 100%);
        }
        .sky .dot { position: absolute; border-radius: 50%; background: #fff; animation: twinkle var(--s) ease-in-out var(--d) infinite alternate; }
        @keyframes twinkle { from { opacity: .15; } to { opacity: .9; } }
        .sky svg { position: relative; width: min(520px, 94vw); height: auto; overflow: visible; }
        .sky .shoot {
          position: absolute; top: 18%; left: 70%; width: 140px; height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, #fff, rgba(255,255,255,0));
          transform: rotate(-24deg); transform-origin: left center;
        }
        @media (prefers-reduced-motion: reduce) { .sky .dot { animation: none; opacity: .6; } }
      `}</style>

      {scene.sky.map((d, i) => (
        <span key={i} className="dot" style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.r * 2, height: d.r * 2, "--d": `${d.d}s`, "--s": `${d.s}s` } as React.CSSProperties} />
      ))}

      <svg viewBox={`0 0 ${W} ${H}`} aria-label={`${text.toUpperCase()} written in the stars`} role="img">
        <defs>
          <filter id="glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Letters: each stroke traces between its stars */}
        {scene.strokes.map((pts, i) => (
          <g key={`s${i}`}>
            <motion.path
              d={pathOf(pts)}
              fill="none"
              stroke="rgba(205, 218, 255, .6)"
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: calm ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: t(START + i * STEP + 0.12), ease: "easeInOut" }}
            />
            {pts.map(([x, y], j) => star(x, y, START + i * STEP + (j / pts.length) * 0.4, `s${i}-${j}`))}
          </g>
        ))}

        {/* A heart-shaped constellation around them */}
        <motion.path
          d={pathOf(scene.heart)}
          fill="none"
          stroke="rgba(255, 182, 206, .55)"
          strokeWidth={1.1}
          strokeDasharray="1 0"
          initial={{ pathLength: calm ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: t(heartAt), ease: "easeInOut" }}
        />
        {scene.heart.slice(0, -1).map(([x, y], j) => star(x, y, heartAt + (j / scene.heart.length) * 1.6, `h${j}`, j % 4 === 0))}
      </svg>

      {!calm && (
        <motion.span
          className="shoot"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: -520, y: 232, opacity: [0, 1, 0] }}
          transition={{ duration: 0.9, delay: shootAt, ease: "easeIn" }}
        />
      )}
    </motion.div>
  );
}
