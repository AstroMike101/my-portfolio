"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { places } from "@/data/places";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

/**
 * PlacesSection v3 — no globe, polaroid/photograph frame layout.
 * No internal title or Card wrapper — parent controls that.
 */
export default function PlacesSection({ darkMode }: { darkMode?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const currentPlace = places[currentIndex];
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (d > minSwipeDistance) nextPlace();
    if (d < -minSwipeDistance) prevPlace();
  };

  const go = (idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(idx);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const nextPlace = () => go((currentIndex + 1) % places.length);
  const prevPlace = () => go((currentIndex - 1 + places.length) % places.length);

  const ArrowBtn = ({ onClick, disabled, children }: { onClick: () => void; disabled: boolean; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 42, height: 42, borderRadius: "50%",
        background: "#0a0a0f", border: "2.5px solid #ffe66d",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", boxShadow: "3px 3px 0 #ffe66d",
        opacity: disabled ? 0.4 : 1, transition: "opacity .2s, transform .1s",
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );

  return (
    <>
      <p style={{ fontSize: 12, fontWeight: 700, fontStyle: "italic", opacity: .45, marginBottom: 20 }}>
        all photos taken by me :D
      </p>

      {/* ── DESKTOP ── */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "center" }}>

        {/* Polaroid frame */}
        <div style={{ position: "relative" }}>
          <div style={{
            background: "#fff", padding: "12px 12px 52px",
            border: "3px solid #0a0a0f", boxShadow: "7px 7px 0 #0a0a0f",
            transform: "rotate(-1.5deg)", position: "relative",
          }}>
            <div
              style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}
              onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={currentPlace.img}
                  alt={currentPlace.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45 }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, display: "block" }}
                />
              </AnimatePresence>
            </div>

            {/* Badge inside image — always readable */}
              <div style={{
                position: "absolute", top: 10, right: 10, zIndex: 10,
                background: "#0a0a0f", border: "2px solid #ffe66d",
                color: "#ffe66d", fontSize: 11, fontWeight: 900,
                padding: "3px 10px", boxShadow: "2px 2px 0 #ffe66d",
              }}>
                {currentIndex + 1} / {places.length}
              </div>

            {/* Caption strip */}
            <div style={{ paddingTop: 12, textAlign: "center" }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 14, fontWeight: 700, color: "#0a0a0f", letterSpacing: ".04em" }}>
                {currentPlace.name}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 4, opacity: .5 }}>
                <MapPin size={11} color="#0a0a0f" />
                <span style={{ fontFamily: "monospace", fontSize: 10, color: "#0a0a0f" }}>
                  {currentPlace.coords[0].toFixed(2)}°, {currentPlace.coords[1].toFixed(2)}°
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right panel: arrows row + description + dots */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Arrow row at top */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ArrowBtn onClick={prevPlace} disabled={isAnimating}><ChevronLeft size={20} color="#ffe66d" /></ArrowBtn>
            <ArrowBtn onClick={nextPlace} disabled={isAnimating}><ChevronRight size={20} color="#ffe66d" /></ArrowBtn>
            <span style={{ fontSize: 12, fontWeight: 700, opacity: .45, fontFamily: "monospace" }}>
              swipe or click to navigate
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`desc-${currentIndex}`}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35 }}
            >
              <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 10, color: "#0a0a0f" }}>
                {currentPlace.name}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(10,10,15,.65)" }}>
                {currentPlace.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot nav */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {places.map((_, idx) => (
              <button
                key={idx}
                onClick={() => go(idx)}
                style={{
                  height: 8, width: idx === currentIndex ? 28 : 8,
                  borderRadius: 4, border: "none", cursor: "pointer",
                  background: idx === currentIndex ? "#ff3e5c" : "rgba(10,10,15,.2)",
                  boxShadow: idx === currentIndex ? "2px 2px 0 #0a0a0f" : "none",
                  transition: "all .25s",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="md:hidden" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>

        {/* Polaroid */}
        <div style={{
          background: "#fff", padding: "10px 10px 46px",
          border: "3px solid #0a0a0f", boxShadow: "5px 5px 0 #0a0a0f",
          transform: "rotate(-1deg)", marginBottom: 20, position: "relative",
        }}>
          <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={`mob-${currentIndex}`}
                src={currentPlace.img}
                alt={currentPlace.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, display: "block" }}
              />
            </AnimatePresence>
            <div style={{
              position: "absolute", top: 10, right: 10, zIndex: 10,
              background: "#0a0a0f", border: "2px solid #ffe66d",
              color: "#ffe66d", fontSize: 10, fontWeight: 900,
              padding: "2px 8px", boxShadow: "2px 2px 0 #ffe66d",
            }}>
              {currentIndex + 1} / {places.length}
            </div>
          </div>
          <div style={{ paddingTop: 10, textAlign: "center" }}>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, fontWeight: 700, color: "#0a0a0f" }}>
              {currentPlace.name}
            </div>
          </div>
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`mob-desc-${currentIndex}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(10,10,15,.65)", marginBottom: 18 }}
          >
            {currentPlace.desc}
          </motion.p>
        </AnimatePresence>

        {/* Both nav buttons — identical Memphis style */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          {[{ label: "← Prev", fn: prevPlace }, { label: "Next →", fn: nextPlace }].map((b) => (
            <button
              key={b.label}
              onClick={b.fn}
              disabled={isAnimating}
              style={{
                flex: 1, padding: "11px 0", fontWeight: 900, fontSize: 13,
                background: "#ffe66d", border: "2px solid #0a0a0f",
                color: "#0a0a0f", cursor: "pointer", fontFamily: "inherit",
                boxShadow: "3px 3px 0 #0a0a0f",
                opacity: isAnimating ? 0.5 : 1, transition: "opacity .2s",
              }}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {places.map((_, idx) => (
            <button
              key={idx}
              onClick={() => go(idx)}
              style={{
                height: 8, width: idx === currentIndex ? 24 : 8,
                borderRadius: 4, border: "none", cursor: "pointer",
                background: idx === currentIndex ? "#ff3e5c" : "rgba(10,10,15,.2)",
                transition: "all .25s",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}