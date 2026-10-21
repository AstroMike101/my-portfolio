"use client";

import { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { places } from "@/data/places";
import MapSketch from "@/components/MapSketch";

// Resting pose for the cards under the top one, so the pile looks hand-placed.
const TILT = [-2, 4, -5];

export default function PlacesSection() {
  const [index, setIndex] = useState(0);
  const [dir, setDir]     = useState(1);

  const n = places.length;
  const current = places[index];
  const go = (d: number) => {
    setDir(d);
    setIndex(i => (i + d + n) % n);
  };
  const pick = (i: number) => {
    if (i === index) return;
    setDir(i > index ? 1 : -1);
    setIndex(i);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 500) {
      go(info.offset.x < 0 ? 1 : -1);
    }
  };

  // Top three cards, drawn back-to-front.
  const stack = [2, 1, 0].map(pos => ({ pos, i: (index + pos) % n }));

  return (
    <div className="places">
      <style>{`
        .places { display: grid; gap: 22px; grid-template-columns: 1fr; align-items: start; }
        @media (min-width: 560px) { .places { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: stretch; } }
        .deck { position: relative; aspect-ratio: 4 / 5; width: 100%; max-width: 260px; margin: 8px auto 0; align-self: start; touch-action: pan-y; }
        .polaroid {
          position: absolute; inset: 0;
          padding: 9px 9px 38px; border-radius: 6px;
          background: var(--paper);
          box-shadow: 0 1px 2px rgba(0,0,0,.08), 0 14px 30px -12px rgba(0,0,0,.28);
          cursor: grab; user-select: none;
        }
        .polaroid:active { cursor: grabbing; }
        .polaroid img { width: 100%; height: 100%; object-fit: cover; display: block; border-radius: 3px; pointer-events: none; }
        .polaroid figcaption {
          position: absolute; left: 12px; right: 12px; bottom: 9px;
          font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 17px;
          color: #3a3a36; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .place-info { display: flex; flex-direction: column; gap: 10px; padding-top: 8px; }
        .place-name { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 400; font-size: clamp(30px, 3.4vw, 38px); line-height: 1.02; }
        .place-desc { color: var(--muted); font-size: 16px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .place-coords { display: inline-flex; align-items: center; gap: 6px; }
        .place-ctrl { display: flex; align-items: center; gap: 8px; margin-top: auto; padding-top: 6px; }
        .round {
          width: 36px; height: 36px; border-radius: 99px;
          display: inline-flex; align-items: center; justify-content: center;
          border: 1px solid var(--rule); transition: background .2s, color .2s, border-color .2s;
        }
        .round:hover { background: var(--c-adventure); border-color: var(--c-adventure); color: var(--bg); }
      `}</style>

      <div className="deck">
        <AnimatePresence initial={false} custom={dir}>
          {stack.map(({ pos, i }) => {
            const top = pos === 0;
            return (
              <motion.figure
                key={places[i].name}
                className="polaroid"
                custom={dir}
                style={{ zIndex: 3 - pos }}
                initial={{ opacity: 0, scale: 0.85, rotate: TILT[2], y: 20 }}
                animate={{ opacity: 1, scale: 1 - pos * 0.045, rotate: TILT[pos], y: pos * 8, x: 0 }}
                exit={{ x: dir * 320, rotate: dir * 18, opacity: 0, transition: { duration: 0.35 } }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                drag={top ? "x" : false}
                dragSnapToOrigin
                dragElastic={0.6}
                whileDrag={{ scale: 1.03, rotate: 0 }}
                onDragEnd={top ? onDragEnd : undefined}
                onTap={top ? () => go(1) : undefined}
              >
                <img src={places[i].img} alt={places[i].name} draggable={false} />
                <figcaption>{places[i].name.split(",")[0]}</figcaption>
              </motion.figure>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="place-info">
        <span className="mono" style={{ color: "var(--c-adventure)" }}>
          {String(index + 1).padStart(2, "0")} / {n} · from the camera roll
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            <h3 className="place-name">{current.name}</h3>
            <p className="place-desc">{current.desc}</p>
            <span className="mono place-coords">
              <MapPin size={12} />
              {current.coords[0].toFixed(2)}°, {current.coords[1].toFixed(2)}°
            </span>
          </motion.div>
        </AnimatePresence>
        <div className="place-ctrl">
          <button className="round" onClick={() => go(-1)} aria-label="Previous place"><ArrowLeft size={15} /></button>
          <button className="round" onClick={() => go(1)} aria-label="Next place"><ArrowRight size={15} /></button>
          <span className="mono" style={{ marginLeft: 6 }}>Drag or tap the photo</span>
        </div>
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <MapSketch index={index} onPick={pick} />
      </div>
    </div>
  );
}
