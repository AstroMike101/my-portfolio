"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const HEART = "M20 34 C8 25 3 18 3 12 C3 7 7 3 12 3 C15.5 3 18.5 5 20 8 C21.5 5 24.5 3 28 3 C33 3 37 7 37 12 C37 18 32 25 20 34 Z";
const PINKS = ["#e07a93", "#d45d79", "#f2a7b8", "#c94f6d"];

// Hand-drawn hearts drifting up the page, with a small note in the middle.
// `name` is whatever was typed, so the note greets them by it.
export default function Hearts({ name, calm, onDone }: { name: string; calm: boolean; onDone: () => void }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: calm ? 0 : 18 }, (_, i) => ({
        left: 4 + Math.random() * 92,
        size: 16 + Math.random() * 22,
        delay: Math.random() * 1.6,
        duration: 3.4 + Math.random() * 1.8,
        sway: (Math.random() < 0.5 ? -1 : 1) * (14 + Math.random() * 26),
        tilt: -18 + Math.random() * 36,
        color: PINKS[i % PINKS.length],
        filled: i % 3 !== 0,
      })),
    [calm],
  );

  useEffect(() => {
    const id = setTimeout(onDone, 5600);
    return () => clearTimeout(id);
  }, [onDone]);

  const greeting = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className="hearts" aria-live="polite">
      <style>{`
        .hearts { position: fixed; inset: 0; z-index: 70; pointer-events: none; overflow: hidden; }
        .hearts .h { position: absolute; bottom: -48px; }
        .hearts .note {
          position: absolute; left: 50%; top: 42%; pointer-events: auto; cursor: pointer;
          padding: 22px 30px 18px; min-width: 200px; text-align: center;
          background: #fde4ea; color: #a8364f; border-radius: 3px;
          box-shadow: 0 2px 4px rgba(0,0,0,.08), 0 18px 40px -16px rgba(168,54,79,.45);
          font-family: var(--font-hand), cursive; font-size: 34px; line-height: 1.1;
        }
        .hearts .note::before {
          content: ""; position: absolute; top: -10px; left: 50%; width: 64px; height: 20px; transform: translateX(-50%) rotate(-4deg);
          background: rgba(255,255,255,.6); box-shadow: 0 1px 2px rgba(0,0,0,.06);
        }
        .hearts .note svg { display: block; margin: 6px auto 0; }
      `}</style>

      {hearts.map((h, i) => (
        <motion.svg
          key={i}
          className="h"
          viewBox="0 0 40 37"
          width={h.size}
          height={h.size}
          style={{ left: `${h.left}%` }}
          initial={{ y: 0, x: 0, opacity: 0, rotate: h.tilt }}
          animate={{ y: "-112vh", x: [0, h.sway, -h.sway * 0.6, h.sway * 0.4], opacity: [0, 1, 1, 0], rotate: h.tilt * -0.5 }}
          transition={{ duration: h.duration, delay: h.delay, ease: "easeOut", opacity: { times: [0, 0.1, 0.75, 1], duration: h.duration, delay: h.delay } }}
        >
          <path d={HEART} fill={h.filled ? h.color : "none"} fillOpacity={0.85} stroke={h.color} strokeWidth={2.2} strokeLinejoin="round" />
        </motion.svg>
      ))}

      <motion.div
        className="note"
        onClick={onDone}
        initial={{ opacity: 0, scale: 0.6, rotate: -10, x: "-50%", y: "-50%" }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.6, 1.04, 1, 0.96], rotate: [-10, -3, -3, -3], x: "-50%", y: "-50%" }}
        transition={{ duration: 5.4, times: [0, 0.08, 0.85, 1], ease: "easeOut" }}
      >
        hi {greeting}
        <svg viewBox="0 0 40 37" width="34" height="32" fill="none" aria-hidden="true">
          <motion.path
            d={HEART}
            stroke="#d45d79"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
