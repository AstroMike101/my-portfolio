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
const MARKS = ["✈", "✦", "◆", "★"];

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
          color: var(--ink-c); border: 2px solid var(--ink-c); text-align: center;
          font-family: 'DM Mono', monospace; text-transform: uppercase; letter-spacing: .1em;
          opacity: .62; mix-blend-mode: multiply;
          transform: rotate(var(--tilt));
          transition: opacity .2s, transform .25s cubic-bezier(.22,1,.36,1);
        }
        .app.dark .stamp { mix-blend-mode: normal; filter: brightness(1.55) saturate(.85); }
        .stamp:hover, .stamp:focus-visible, .stamp.here { opacity: 1; transform: rotate(var(--tilt)) scale(1.06); }
        .stamp.circle { width: 96px; height: 96px; border-radius: 50%; box-shadow: inset 0 0 0 4px var(--tile), inset 0 0 0 5.5px var(--ink-c); }
        .stamp.rect   { width: 124px; height: 72px; border-radius: 4px; }
        .stamp.oval   { width: 128px; height: 80px; border-radius: 50%; }
        .stamp.double { width: 118px; height: 76px; border-radius: 10px; border-style: double; border-width: 5px; }
        .stamp .c { font-size: 11px; font-weight: 500; line-height: 1.2; max-width: 92%; }
        .stamp.circle .c { font-size: 9px; letter-spacing: .04em; max-width: 80%; }
        .stamp .n { font-size: 9px; opacity: .8; }
        .stamp .m { font-size: 11px; line-height: 1; }
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
            style={{ "--ink-c": INKS[k % INKS.length], "--tilt": `${TILTS[k % TILTS.length]}deg` } as React.CSSProperties}
            onClick={() => visit(indices)}
            onMouseEnter={() => onHover(indices)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(indices)}
            onBlur={() => onHover(null)}
            aria-label={`${country}: ${indices.map(i => places[i].name.split(",")[0]).join(", ")}`}
          >
            <span className="m">{MARKS[k % MARKS.length]}</span>
            <span className="c">{country}</span>
            <span className="n">{indices.length} {indices.length === 1 ? "city" : "cities"}</span>
            <span className="tip">{indices.map(i => places[i].name.split(",")[0]).join(" · ")}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
