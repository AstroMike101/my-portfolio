"use client";

import { useMemo } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import land110 from "world-atlas/land-110m.json";
import { places } from "@/data/places";

const W = 640;
// Crop to the band where the photos actually are (North America → East Asia).
const FRAME = { type: "MultiPoint" as const, coordinates: [[-128, 12], [146, 12], [-128, 62], [146, 62]] };

export default function MapSketch({ index, onPick }: { index: number; onPick: (i: number) => void }) {
  const { land, points, viewBox } = useMemo(() => {
    const topo = land110 as unknown as Topology<{ land: GeometryCollection }>;
    const projection = geoNaturalEarth1().fitWidth(W, FRAME);
    const path = geoPath(projection);
    const [[x0, y0], [x1, y1]] = path.bounds(FRAME);
    return {
      land: path(feature(topo, topo.objects.land)) ?? "",
      points: places.map(p => projection([p.coords[1], p.coords[0]]) ?? [0, 0]),
      viewBox: `${x0} ${y0} ${x1 - x0} ${y1 - y0}`,
    };
  }, []);

  const [cx, cy] = points[index];

  return (
    <div className="mapsketch">
      <style>{`
        .mapsketch { margin-top: 22px; padding-top: 18px; border-top: 1px dashed var(--rule); }
        .mapsketch svg { display: block; width: 100%; height: auto; overflow: hidden; }
        .mapsketch .land { fill: url(#hatch); stroke: var(--muted); stroke-width: .9; stroke-linejoin: round; }
        .mapsketch .pin { cursor: pointer; }
        .mapsketch .dot { fill: var(--tile); stroke: var(--ink); stroke-width: 1.2; transition: fill .2s; }
        .mapsketch .pin:hover .dot { fill: var(--c-adventure); }
        .mapsketch .here { fill: var(--c-adventure); }
        .mapsketch .ring { fill: none; stroke: var(--c-adventure); stroke-width: 1.4; transform-box: fill-box; transform-origin: center; animation: mapping 1.8s ease-out infinite; }
        @keyframes mapping { from { transform: scale(1); opacity: .9; } to { transform: scale(3.2); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .mapsketch .ring { animation: none; } }
      `}</style>
      <svg viewBox={viewBox} role="img" aria-label="Sketch map of places I've photographed">
        <defs>
          <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
            <line x1="0" y1="0" x2="0" y2="5" stroke="var(--muted)" strokeWidth=".6" opacity=".45" />
          </pattern>
          <filter id="map-wobble">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="2" />
          </filter>
        </defs>
        <path className="land" d={land} filter="url(#map-wobble)" />
        {points.map(([x, y], i) => (
          <g key={places[i].name} className="pin" onClick={() => onPick(i)}>
            <title>{places[i].name}</title>
            <circle className="dot" cx={x} cy={y} r={i === index ? 0 : 3} />
            <circle cx={x} cy={y} r={9} fill="transparent" />
          </g>
        ))}
        <circle className="ring" cx={cx} cy={cy} r={4.5} />
        <circle className="here" cx={cx} cy={cy} r={4.5} />
      </svg>
    </div>
  );
}
