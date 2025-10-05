"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import { places, Place } from "@/data/places";
import { X, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function PlacesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const globeRef = useRef<any>(null);
  const modalGlobeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [globeReady, setGlobeReady] = useState(false);

  const currentPlace = places[currentIndex];

  // Start centered on US
  const US_VIEW = { lat: 39.8283, lng: -98.5795, altitude: 2.5 };

  // Minimum swipe distance
  const minSwipeDistance = 50;

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextPlace();
    }
    if (isRightSwipe) {
      prevPlace();
    }
  };

  // Resize observer
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDims({ width, height });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Initialize globe to US
  useEffect(() => {
    if (!globeRef.current || !globeReady) return;

    const setView = () => {
      try {
        globeRef.current.pointOfView(US_VIEW, 0);
        const controls = globeRef.current.controls?.();
        if (controls) {
          controls.autoRotate = false;
          controls.enableZoom = false;
          controls.enablePan = false;
          controls.enableRotate = true;
          controls.update?.();
        }
      } catch (e) {
        console.log('Globe not ready');
      }
    };

    setView();
    const t1 = setTimeout(setView, 100);
    const t2 = setTimeout(setView, 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [globeReady, dims]);

  // When current place changes, animate globe to that location
  useEffect(() => {
    if (!globeRef.current || !currentPlace) return;

    const timer = setTimeout(() => {
      globeRef.current.pointOfView(
        {
          lat: currentPlace.coords[0],
          lng: currentPlace.coords[1],
          altitude: 1.8
        },
        1500
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [currentIndex, currentPlace]);

  const nextPlace = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % places.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const prevPlace = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + places.length) % places.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  // Get only the current place as a pin
  const currentPlaceData = [currentPlace];

  // Custom pin rendering with HTML marker
  const getHtmlElement = () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div style="position: relative; width: 40px; height: 40px;">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.4);
          animation: pulse 2s ease-in-out infinite;
        "></div>
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: ripple 2s ease-out infinite;
        "></div>
      </div>
      <style>
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
      </style>
    `;
    return el;
  };

  // Modal globe
  useEffect(() => {
    if (expanded && modalGlobeRef.current) {
      const g = modalGlobeRef.current;
      setTimeout(() => {
        g.pointOfView(
          {
            lat: currentPlace.coords[0],
            lng: currentPlace.coords[1],
            altitude: 1.8
          },
          0
        );
        const controls = g.controls?.();
        if (controls) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 0.5;
          controls.update?.();
        }
      }, 100);
    }
  }, [expanded, currentPlace]);

  return (
    <section id="places" className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <SectionTitle kicker="Travel" title="Places I've explored" />
      <p className="text-center text-sm text-slate-400 -mt-4 mb-8 italic">all photos taken by me :D</p>

      {/* Main carousel layout */}
      <div className="relative">
        <Card className="overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: Image with navigation */}
            <div 
              className="relative h-[450px] sm:h-[500px] lg:h-[600px]"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={currentPlace.img}
                    alt={currentPlace.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Navigation overlays - hidden on small mobile, visible on tablet+ */}
              <div className="hidden sm:flex absolute inset-0 items-center justify-between px-4">
                <button
                  onClick={prevPlace}
                  disabled={isAnimating}
                  className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-slate-800" />
                </button>
                <button
                  onClick={nextPlace}
                  disabled={isAnimating}
                  className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-slate-800" />
                </button>
              </div>

              {/* Bottom info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <motion.div
                  key={`info-${currentIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                      <MapPin className="w-3 h-3 text-white" />
                      <span className="text-xs text-white font-medium">
                        {currentPlace.coords[0].toFixed(2)}°, {currentPlace.coords[1].toFixed(2)}°
                      </span>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/80 backdrop-blur-md text-white text-xs font-medium">
                      {currentIndex + 1} of {places.length}
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {currentPlace.name}
                  </h3>
                  {/* Show description on mobile only */}
                  <p className="lg:hidden text-sm sm:text-base text-white/90 leading-relaxed line-clamp-3">
                    {currentPlace.desc}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right: Globe + Description - hidden on mobile, visible on desktop */}
            <div className="hidden lg:flex flex-col p-6 lg:p-8 gap-6">
              {/* Globe */}
              <div
                ref={containerRef}
                className="relative h-[300px] flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden"
              >
                <Globe
                  ref={globeRef}
                  width={dims.width || 400}
                  height={300}
                  globeImageUrl="https://unpkg.com/three-globe/example/img/earth-day.jpg"
                  bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                  backgroundColor="rgba(0,0,0,0)"
                  showAtmosphere
                  atmosphereColor="rgba(16, 185, 129, 0.3)"
                  atmosphereAltitude={0.15}
                  enablePointerInteraction={true}
                  htmlElementsData={currentPlaceData}
                  htmlLat={(d) => (d as Place).coords[0]}
                  htmlLng={(d) => (d as Place).coords[1]}
                  htmlElement={getHtmlElement}
                  onGlobeReady={() => setGlobeReady(true)}
                />

                <button
                  onClick={() => setExpanded(true)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-sm text-xs font-medium text-slate-700 shadow hover:bg-white transition-all"
                >
                  Expand Globe
                </button>
              </div>

              {/* Description */}
              <div className="flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`desc-${currentIndex}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex-1"
                  >
                    <p className="text-slate-600 leading-relaxed text-base lg:text-lg">
                      {currentPlace.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Dot indicators */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {places.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!isAnimating) {
                          setIsAnimating(true);
                          setCurrentIndex(idx);
                          setTimeout(() => setIsAnimating(false), 400);
                        }
                      }}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentIndex
                          ? 'w-8 bg-gradient-to-r from-emerald-500 to-teal-500'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile navigation buttons at bottom */}
          <div className="sm:hidden flex items-center justify-center gap-3 p-4 border-t border-slate-100">
            <button
              onClick={prevPlace}
              disabled={isAnimating}
              className="flex-1 max-w-[140px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center gap-2 font-medium text-slate-700 shadow-sm hover:shadow transition-all disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              onClick={nextPlace}
              disabled={isAnimating}
              className="flex-1 max-w-[140px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center gap-2 font-medium text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile dot indicators */}
          <div className="lg:hidden flex items-center justify-center gap-2 pb-4">
            {places.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(idx);
                    setTimeout(() => setIsAnimating(false), 400);
                  }
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-8 bg-gradient-to-r from-emerald-500 to-teal-500'
                    : 'w-2 bg-slate-300 active:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Fullscreen Globe Modal */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Globe
                ref={modalGlobeRef}
                globeImageUrl="https://unpkg.com/three-globe/example/img/earth-day.jpg"
                bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundColor="rgba(0,0,0,0)"
                width={typeof window !== 'undefined' ? window.innerWidth : 800}
                height={typeof window !== 'undefined' ? window.innerHeight : 600}
                showAtmosphere
                atmosphereColor="rgba(16, 185, 129, 0.3)"
                atmosphereAltitude={0.2}
                htmlElementsData={currentPlaceData}
                htmlLat={(d) => (d as Place).coords[0]}
                htmlLng={(d) => (d as Place).coords[1]}
                htmlElement={getHtmlElement}
              />

              <button
                onClick={() => setExpanded(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full bg-white/90 backdrop-blur-md p-2.5 sm:p-3 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700 group-hover:text-slate-900 transition-colors" />
              </button>

              {/* Modal info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 sm:bottom-8 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-2xl"
              >
                <div className="glass rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20">
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-2xl font-bold text-slate-800 mb-2">
                        {currentPlace.name}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                        {currentPlace.desc}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={prevPlace}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-all"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                      </button>
                      <button
                        onClick={nextPlace}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-all"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}