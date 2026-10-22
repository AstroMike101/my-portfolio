"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

// Same heart outline as the floating hearts, on a 40×37 canvas.
const HEART = "M20 34 C8 25 3 18 3 12 C3 7 7 3 12 3 C15.5 3 18.5 5 20 8 C21.5 5 24.5 3 28 3 C33 3 37 7 37 12 C37 18 32 25 20 34 Z";
const ROSE = "#d45d79";
const BURST = Array.from({ length: 9 }, (_, i) => {
  const a = (i / 9) * Math.PI * 2 - Math.PI / 2;
  return { x: Math.cos(a) * 120, y: Math.sin(a) * 105, size: 12 + (i % 3) * 5 };
});

// A heart that draws itself with two sets of initials inside, pierced by an arrow.
// `text` is what was typed, so the initials come from the visitor, not the code.
export default function Carving({ text, calm, onDone }: { text: string; calm: boolean; onDone: () => void }) {
  useEffect(() => {
    const id = setTimeout(onDone, 5800);
    return () => clearTimeout(id);
  }, [onDone]);

  const half = Math.ceil(text.length / 2);
  const label = `${text.slice(0, half)} + ${text.slice(half)}`.toUpperCase();
  const t = (s: number) => (calm ? 0 : s);

  return (
    <motion.div
      className="carving"
      onClick={onDone}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 5.6, times: [0, 0.05, 0.88, 1] }}
    >
      <style>{`
        .carving {
          position: fixed; inset: 0; z-index: 70; display: flex; align-items: center; justify-content: center; cursor: pointer;
          background: color-mix(in srgb, var(--bg) 72%, transparent);
          backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px);
        }
        .carving::before {
          content: ""; position: absolute; width: min(520px, 110vw); aspect-ratio: 1;
          background: radial-gradient(circle, color-mix(in srgb, var(--bg) 92%, transparent) 0, color-mix(in srgb, var(--bg) 70%, transparent) 45%, transparent 70%);
        }
        .carving svg { position: relative; width: min(340px, 86vw); height: auto; overflow: visible; }
      `}</style>

      <svg viewBox="0 0 320 280" aria-label={label} role="img">
        {/* Heart, drawn as one stroke */}
        <g transform="translate(60 38) scale(5)">
          <motion.path
            d={HEART}
            fill="none"
            stroke={ROSE}
            strokeWidth={2.6}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: calm ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
          <motion.path
            d={HEART}
            fill={ROSE}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 0.8, delay: t(1) }}
          />
        </g>

        {/* Initials */}
        <motion.text
          x="160" y="124"
          textAnchor="middle"
          fill={ROSE}
          style={{ fontFamily: "var(--font-hand), cursive", fontSize: 40, fontWeight: 600 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: t(1) }}
        >
          {label}
        </motion.text>

        {/* Arrow flies in from the left and sticks through the heart */}
        <motion.g
          initial={{ x: calm ? 0 : -260, opacity: calm ? 1 : 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.38, delay: t(1.7), ease: [0.3, 0, 0.2, 1] }}
        >
          <g transform="translate(160 168) rotate(-16)" stroke="#8a5a3c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M-150 0 H138" />
            <path d="M126 -8 L142 0 L126 8" fill="#8a5a3c" />
            <path d="M-150 0 L-162 -10 M-140 0 L-152 -10 M-150 0 L-162 10 M-140 0 L-152 10" stroke={ROSE} />
          </g>
        </motion.g>

        {/* Little hearts pop out where it lands */}
        {!calm && BURST.map((b, i) => (
          <motion.g
            key={i}
            initial={{ x: 160, y: 150, scale: 0, opacity: 0 }}
            animate={{ x: 160 + b.x, y: 150 + b.y, scale: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 1.1, delay: 2.05 + i * 0.03, ease: "easeOut" }}
          >
            <path d={HEART} transform={`translate(${-b.size / 2} ${-b.size / 2}) scale(${b.size / 40})`} fill={i % 2 ? ROSE : "#f2a7b8"} />
          </motion.g>
        ))}
      </svg>
    </motion.div>
  );
}
