"use client";

import { places } from "@/data/places";

// "Atlanta, GA" → United States; "Kyoto, Japan" → Japan.
const countryOf = (name: string) => {
  const last = name.split(", ").pop() ?? name;
  return /^[A-Z]{2}$/.test(last) ? "United States" : last;
};

const COUNTRIES = (() => {
  const map = new Map<string, number[]>();
  places.forEach((p, i) => {
    const c = countryOf(p.name);
    map.set(c, [...(map.get(c) ?? []), i]);
  });
  return [...map.entries()].map(([country, indices]) => ({ country, indices }));
})();

export const COUNTRY_COUNT = COUNTRIES.length;

// Stamp looks cycle so neighbours never match.
const SHAPES = ["circle", "rect", "oval", "double"] as const;
const INKS = ["#b23a48", "#1855a3", "#2a7030", "#6b3fa0", "#9a7000", "#b84a10", "#2f6f73", "#7a2e5c"];
const TILTS = [-8, 5, -3, 9, -6, 4, -10, 7];
// Mini line drawings for each stamp, on a 40×40 canvas, drawn in the stamp's ink.
const LANDMARKS: Record<string, string[]> = {
  // Torii gate, as at Fushimi Inari in Kyoto
  "Japan": ["M4 9 Q20 4.5 36 9", "M8 14.5 H32", "M12 9.5 V36 M28 9.5 V36", "M20 7.5 V14.5"],
  // Cologne Cathedral's twin spires
  "Germany": ["M9 36 V18 L12.5 4 L16 18 V36", "M24 36 V18 L27.5 4 L31 18 V36", "M16 24 L20 20 L24 24 V36 H16", "M20 30 a2.5 2.5 0 1 0 0.1 0", "M5 36 H35"],
  // Canton Tower in Guangzhou
  "China": ["M14 36 C19.5 26 19.5 16 15 5", "M26 36 C20.5 26 20.5 16 25 5", "M14.6 30 H25.4 M18 21 H22 M15.6 11 H24.4", "M15 5 H25 M20 5 V1", "M8 36 H32"],
  // Lisbon's yellow tram
  "Portugal": ["M8 15 H32 V31 H8 Z", "M11 18.5 H17 V24 H11 Z M19.5 18.5 H25.5 V24 H19.5 Z M28 18.5 H30 V24", "M10 15 V12 H30 V15", "M20 12 L28 3", "M13 33.5 a2 2 0 1 0 0.1 0 M27 33.5 a2 2 0 1 0 0.1 0", "M3 36 H37"],
  // Dutch windmill
  "Netherlands": ["M15 36 L17.5 17 H22.5 L25 36 Z", "M16.5 17 L20 13 L23.5 17", "M20 13 L8 3 M20 13 L32 3 M20 13 L9 25 M20 13 L31 25", "M10.5 5 L13.5 2.5 M29.5 5 L26.5 2.5 M11 22.5 L14 25 M29 22.5 L26 25", "M18.5 36 V31 H21.5 V36", "M6 36 H34"],
  // Stepped pyramid, as at Teotihuacan outside Mexico City
  "Mexico": ["M4 35 H36", "M6 35 L8.5 29 H31.5 L34 35", "M10 29 L12.5 23 H27.5 L30 29", "M14 23 L16 17 H24 L26 23", "M17 17 L18 12 H22 L23 17", "M18 12 V8.5 H22 V12", "M19 35 L19.5 12 M21 35 L20.5 12"],
  // Maple leaf
  "Canada": ["M20 3 L22.5 9.5 L26 8 L25 15 L30 11.5 L31.5 15 L35.5 14 L33.5 19 L36.5 21 L29.5 26 L30.5 29.5 L22 28.5 L21 37 H19 L18 28.5 L9.5 29.5 L10.5 26 L3.5 21 L6.5 19 L4.5 14 L8.5 15 L10 11.5 L15 15 L14 8 L17.5 9.5 Z"],
  // Statue of Liberty
  "United States": ["M16 13 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0", "M15.5 11 L13 8 M18 9.5 L17 5.5 M22 9.5 L23 5.5 M24.5 11 L27 8", "M24 17 L28.5 6", "M27.5 6 C26.5 3.5 28.5 2 29.5 0.5 C30 2.5 31 4 29.5 6 Z", "M15.5 18 L13 36 H27 L24.5 18", "M15 22 L11 26.5 L13.5 29", "M17 25 C19 27 21 27 23 25"],
};

// Some stamps get the wavy lines of a postal cancellation.
const POSTMARK = "M0 3 q4 -3 8 0 t8 0 t8 0 t8 0 M0 9 q4 -3 8 0 t8 0 t8 0 t8 0 M0 15 q4 -3 8 0 t8 0 t8 0 t8 0";

export default function Passport({ index, onPick, onHover }: {
  index: number;
  onPick: (i: number) => void;
  onHover: (indices: number[] | null) => void;
}) {
  const visit = (indices: number[]) => {
    const at = indices.indexOf(index);
    onPick(indices[at === -1 ? 0 : (at + 1) % indices.length]);
  };

  return (
    <div className="passport">
      <style>{`
        .passport { margin-top: 22px; padding-top: 18px; border-top: 1px dashed var(--rule); }
        .stamps { display: flex; flex-wrap: wrap; gap: 14px 10px; justify-content: center; padding: 10px 0 4px; }
        .stamp {
          position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
          --ink-c: var(--ink-base);
          color: var(--ink-c); border: 2px solid var(--ink-c); text-align: center;
          font-family: 'DM Mono', monospace; text-transform: uppercase; letter-spacing: .1em;
          opacity: .62; mix-blend-mode: multiply;
          transform: rotate(var(--tilt));
          transition: opacity .2s, transform .25s cubic-bezier(.22,1,.36,1);
        }
        .app.dark .stamp { mix-blend-mode: normal; --ink-c: color-mix(in srgb, var(--ink-base) 62%, #f0f0ec); }
        .stamp:hover, .stamp:focus-visible, .stamp.here { opacity: 1; transform: rotate(var(--tilt)) scale(1.06); }
        .stamp.circle { width: 112px; height: 112px; border-radius: 50%; box-shadow: inset 0 0 0 4px var(--tile), inset 0 0 0 5.5px var(--ink-c); }
        .stamp.rect   { width: 132px; height: 100px; border-radius: 4px; }
        .stamp.oval   { width: 136px; height: 104px; border-radius: 50%; }
        .stamp.double { width: 128px; height: 100px; border-radius: 10px; border-style: double; border-width: 5px; }
        .stamp .ico { width: 42px; height: 42px; margin-bottom: 2px; }
        .stamp.circle .ico { width: 36px; height: 36px; }
        .stamp .post { position: absolute; right: -14px; top: 18px; width: 46px; height: 20px; opacity: .55; pointer-events: none; }
        .stamp .c { font-size: 11px; font-weight: 500; line-height: 1.2; max-width: 92%; }
        .stamp.circle .c { font-size: 9px; letter-spacing: .04em; max-width: 80%; }
        .stamp .n { font-size: 9px; opacity: .8; }
        .stamp .tip {
          position: absolute; top: calc(100% + 8px); left: 50%; z-index: 4; width: max-content; max-width: 220px;
          transform: translateX(-50%) rotate(calc(-1 * var(--tilt)));
          padding: 6px 10px; border-radius: 8px; background: var(--ink); color: var(--bg);
          font-family: 'EB Garamond', serif; font-size: 14px; text-transform: none; letter-spacing: 0; line-height: 1.35;
          opacity: 0; pointer-events: none; transition: opacity .15s;
        }
        .stamp:hover .tip, .stamp:focus-visible .tip { opacity: 1; }
      `}</style>
      <p className="mono">Passport · {COUNTRIES.length} countries</p>
      <div className="stamps">
        {COUNTRIES.map(({ country, indices }, k) => (
          <button
            key={country}
            className={`stamp ${SHAPES[k % SHAPES.length]}${indices.includes(index) ? " here" : ""}`}
            style={{ "--ink-base": INKS[k % INKS.length], "--tilt": `${TILTS[k % TILTS.length]}deg` } as React.CSSProperties}
            onClick={() => visit(indices)}
            onMouseEnter={() => onHover(indices)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(indices)}
            onBlur={() => onHover(null)}
            aria-label={`${country}: ${indices.map(i => places[i].name.split(",")[0]).join(", ")}`}
          >
            <svg className="ico" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {(LANDMARKS[country] ?? []).map(d => <path key={d} d={d} />)}
            </svg>
            <span className="c">{country}</span>
            <span className="n">{indices.length} {indices.length === 1 ? "city" : "cities"}</span>
            {k % 3 === 1 && (
              <svg className="post" viewBox="0 0 32 18" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d={POSTMARK} /></svg>
            )}
            <span className="tip">{indices.map(i => places[i].name.split(",")[0]).join(" · ")}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
