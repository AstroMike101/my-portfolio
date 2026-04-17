"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { places } from "@/data/places";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

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
      className="places-arrow-btn"
      style={{
        width: 40, height: 40, borderRadius: "50%",
        background: "#1a1a1a", border: "2px solid #1a1a1a",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", opacity: disabled ? 0.35 : 1,
        transition: "opacity .2s", flexShrink: 0,
      }}
    >
      {children}
    </button>
  );

  return (
    <>
      <p style={{ fontSize: 12, fontWeight: 600, fontStyle: "italic", opacity: .4, marginBottom: 20 }}>
        all photos taken by me :D
      </p>

      {/* ── DESKTOP ── */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 36, alignItems: "center" }}>

        {/* Polaroid */}
        <div style={{ position: "relative" }}>
          <div style={{
            background: "#fff", padding: "12px 12px 52px",
            border: "3px solid #1a1a1a", boxShadow: "6px 6px 0 #1a1a1a",
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

              {/* Counter badge — black on white, always readable on the photo */}
              <div style={{
                position: "absolute", top: 10, right: 10, zIndex: 10,
                background: "#1a1a1a", color: "#ffffff",
                fontSize: 11, fontWeight: 700, fontFamily: "monospace",
                padding: "3px 10px",
              }}>
                {currentIndex + 1} / {places.length}
              </div>
            </div>

            {/* Caption */}
            <div style={{ paddingTop: 12, textAlign: "center" }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, fontWeight: 700, color: "#1a1a1a", letterSpacing: ".04em" }}>
                {currentPlace.name}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 4, opacity: .45 }}>
                <MapPin size={11} color="#1a1a1a" />
                <span style={{ fontFamily: "monospace", fontSize: 10, color: "#1a1a1a" }}>
                  {currentPlace.coords[0].toFixed(2)}°, {currentPlace.coords[1].toFixed(2)}°
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: arrows + description + dots */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ArrowBtn onClick={prevPlace} disabled={isAnimating}><ChevronLeft size={18} color="#ffffff" /></ArrowBtn>
            <ArrowBtn onClick={nextPlace} disabled={isAnimating}><ChevronRight size={18} color="#ffffff" /></ArrowBtn>
            <span style={{ fontSize: 11, fontWeight: 600, opacity: .4, fontFamily: "monospace" }}>swipe or click</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`desc-${currentIndex}`}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.3 }}
            >
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{currentPlace.name}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.75, opacity: .65 }}>{currentPlace.desc}</p>
            </motion.div>
          </AnimatePresence>

          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {places.map((_, idx) => (
              <button key={idx} onClick={() => go(idx)} style={{
                height: 7, width: idx === currentIndex ? 26 : 7,
                borderRadius: 4, border: "none", cursor: "pointer",
                background: idx === currentIndex ? "#1a1a1a" : "rgba(26,26,26,.2)",
                transition: "all .25s",
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="md:hidden places-section-mobile" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>

        {/* Polaroid */}
        <div style={{
          background: "#fff", padding: "10px 10px 44px",
          border: "3px solid #1a1a1a", boxShadow: "5px 5px 0 #1a1a1a",
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
                transition={{ duration: 0.3 }}
                style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, display: "block" }}
              />
            </AnimatePresence>
            <div style={{
              position: "absolute", top: 10, right: 10, zIndex: 10,
              background: "#1a1a1a", color: "#ffffff",
              fontSize: 10, fontWeight: 700, fontFamily: "monospace",
              padding: "2px 8px",
            }}>
              {currentIndex + 1} / {places.length}
            </div>
          </div>
          <div style={{ paddingTop: 10, textAlign: "center" }}>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>
              {currentPlace.name}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 4, opacity: .45 }}>
              <MapPin size={11} color="#1a1a1a" />
              <span style={{ fontFamily: "monospace", fontSize: 10, color: "#1a1a1a" }}>
                {currentPlace.coords[0].toFixed(2)}°, {currentPlace.coords[1].toFixed(2)}°
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`mob-desc-${currentIndex}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ fontSize: 14, lineHeight: 1.7, opacity: .65, marginBottom: 18 }}
          >
            {currentPlace.desc}
          </motion.p>
        </AnimatePresence>

        {/* Nav buttons — both black, fully explicit after CSS reset */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          {[{ label: "← Prev", fn: prevPlace }, { label: "Next →", fn: nextPlace }].map((b) => (
            <button
              key={b.label}
              onClick={b.fn}
              disabled={isAnimating}
              className="places-nav-btn"
              style={{
                flex: 1, padding: "11px 0", fontWeight: 700, fontSize: 13,
                display: "block", textAlign: "center",
                backgroundColor: "#1a1a1a",
                border: "2px solid #1a1a1a",
                color: "#ffffff",
                cursor: "pointer", fontFamily: "inherit",
                opacity: isAnimating ? 0.4 : 1, transition: "opacity .2s",
              }}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 7, justifyContent: "center" }}>
          {places.map((_, idx) => (
            <button key={idx} onClick={() => go(idx)} style={{
              height: 7, width: idx === currentIndex ? 22 : 7,
              borderRadius: 4, border: "none", cursor: "pointer",
              background: idx === currentIndex ? "#1a1a1a" : "rgba(26,26,26,.2)",
              transition: "all .25s",
            }} />
          ))}
        </div>
      </div>
    </>
  );
}