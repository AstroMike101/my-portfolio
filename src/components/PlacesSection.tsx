"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import { places, Place } from "@/data/places";
import { X } from "lucide-react";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export default function PlacesSection() {
  const [selected, setSelected] = useState<Place | null>(null);
  const [expanded, setExpanded] = useState(false);

  const globeRef = useRef<any>(null);
  const modalGlobeRef = useRef<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });

  const hasInitRef = useRef(false);

  // Track which pin should be pulsing
  const [pulsingName, setPulsingName] = useState<string | null>(null);

  // ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDims({ width, height });
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Set initial camera only once
  useEffect(() => {
    if (!globeRef.current) return;
    if (hasInitRef.current) return;
    if (dims.width === 0 || dims.height === 0) return;

    const id = setTimeout(() => {
      globeRef.current.pointOfView(
        { lat: 37.5, lng: -95, altitude: 2.6 }, // US view
        0
      );
      const controls = globeRef.current.controls?.();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.25;
        controls.update?.();
      }
      hasInitRef.current = true;
    }, 50);

    return () => clearTimeout(id);
  }, [dims]);

  // Click handler — no imperative labelDotRadius calls anymore
  const handleLabelClick = (d: object, globeInstance?: any) => {
    const place = d as Place;
    setSelected(place);
    setPulsingName(place.name);

    if (globeInstance) {
      globeInstance.pointOfView(
        { lat: place.coords[0], lng: place.coords[1], altitude: 2.2 },
        800
      );
    }

    // Reset pulse after 600ms
    setTimeout(() => setPulsingName(null), 600);
  };

  // Accessors now depend on state
  const getLabelDotRadius = (d: object) => {
    const place = d as Place;
    if (place.name === pulsingName) return 2.0; // pulse bigger
    return place.name === "San Diego" ? 1.0 : 1.0; // default size (all same)
  };

  const getLabelColor = (d: object) => {
    const place = d as Place;
    if (place.name === pulsingName) return "rgba(253, 224, 71, 1)"; // highlight pulse
    return "rgba(249, 115, 22, 0.95)"; // default orange
  };

  return (
    <section id="places" className="mx-auto max-w-6xl px-6 py-12">
      <SectionTitle kicker="Travel" title="Places I've Been" />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Globe */}
        <div className="flex flex-col gap-3">
          <div
            ref={containerRef}
            className="h-[400px] sm:h-[450px] md:h-[500px] w-full flex items-center justify-center rounded-2xl glass"
          >
            <Globe
              ref={globeRef}
              width={dims.width || 400}
              height={dims.height || 400}
              globeImageUrl="https://unpkg.com/three-globe/example/img/earth-day.jpg"
              bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
              backgroundColor="rgba(0,0,0,0)"
              showAtmosphere
              atmosphereColor="teal"
              atmosphereAltitude={0.25}
              enablePointerInteraction
              labelsData={places}
              labelLat={(d) => (d as Place).coords[0]}
              labelLng={(d) => (d as Place).coords[1]}
              labelText={() => ""}
              labelSize={1.6}
              labelDotRadius={getLabelDotRadius}
              labelColor={getLabelColor}
              onLabelClick={(d) => handleLabelClick(d, globeRef.current)}
            />
          </div>

          {/* Expand button for mobile */}
          <button
            onClick={() => setExpanded(true)}
            className="block lg:hidden rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-white shadow hover:shadow-lg transition"
          >
            Expand Globe
          </button>
        </div>

        {/* Info Panel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <Card className="flex flex-col h-full overflow-hidden">
                  <div className="w-full h-64 md:h-80 overflow-hidden rounded-lg">
                    <img
                      src={selected.img}
                      alt={selected.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-6 flex flex-col flex-1">
                    <h3 className="text-2xl font-semibold">{selected.name}</h3>
                    <p className="mt-3 text-slate-600 text-lg leading-relaxed">
                      {selected.desc}
                    </p>
                    <p className="mt-3 text-sm text-slate-400">
                      Coordinates: {selected.coords[0]}, {selected.coords[1]}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card className="flex items-center justify-center h-full text-slate-500 text-lg">
                  <p>Click a glowing pin on the globe to see details ✨</p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Fullscreen Globe Modal */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Globe
                ref={modalGlobeRef}
                globeImageUrl="https://unpkg.com/three-globe/example/img/earth-day.jpg"
                bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundColor="rgba(0,0,0,0)"
                width={window.innerWidth}
                height={window.innerHeight}
                showAtmosphere
                atmosphereColor="teal"
                atmosphereAltitude={0.25}
                labelsData={places}
                labelLat={(d) => (d as Place).coords[0]}
                labelLng={(d) => (d as Place).coords[1]}
                labelText={() => ""}
                labelSize={2.0}
                labelDotRadius={getLabelDotRadius}
                labelColor={getLabelColor}
                onLabelClick={(d) => handleLabelClick(d, modalGlobeRef.current)}
              />

              <button
                onClick={() => setExpanded(false)}
                className="absolute top-4 right-4 rounded-full bg-white/90 p-2 shadow hover:bg-white"
              >
                <X className="h-6 w-6 text-slate-800" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
