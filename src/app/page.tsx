"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { annotate } from "rough-notation";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, Download, Link2, Moon, Search, Sun,
} from "lucide-react";
import PlacesSection from "@/components/PlacesSection";
import { places } from "@/data/places";
import { RESUME, RESUME_PDF } from "@/data/resume";
import Doodle, { Skyline, type DoodleKind } from "@/components/Doodle";

type Accent = "eng" | "music" | "sports" | "adventure";
type NoteId = "index" | "contact" | "eng" | "experience" | "projects" | "resume" | "music" | "sports" | "adventure";

const EMAIL = "michaelchendevs@gmail.com";

const EXPERIENCE = [
  {
    date: "Jul 2025 – Now",
    role: "Software Engineer",
    co: "Infomedia",
    href: "https://www.infomedia.com.au/",
    desc: "Building core front-end and back-end systems for enterprise e-commerce platforms serving Ford, Toyota, Honda, BMW, and VW dealer networks. Full-stack across Vue.js, C#, .NET, and SQL Server.",
  },
  {
    date: "Jun 2024 – Jul 2025",
    role: "Software Engineer",
    co: "CoreForceTech",
    href: "https://www.coreforcetech.com",
    desc: "Built tools that help public safety agencies act faster and smarter. Worked on a .NET C# service with WPF GUI for automated data collection, streamlined deployments for 20+ clients, and integrated real-time APIs to improve accuracy and uptime.",
    mark: { text: "20+ clients", type: "underline" as const },
  },
  {
    date: "Jun 2023 – Aug 2023",
    role: "Software Engineer Intern",
    co: "Kohl's Corporate",
    href: "https://corporate.kohls.com/",
    desc: "Shipped React and Adobe Experience Manager pages reaching 65M+ customers. Ran A/B tests, built SPA-driven UIs.",
    mark: { text: "65M+", type: "circle" as const },
  },
];

const EDUCATION = {
  date: "Aug 2020 – May 2024",
  degree: "B.S. Computer Science",
  school: "University of Georgia",
  href: "https://www.uga.edu",
  location: "Athens, GA",
};

const STACK = [
  ".NET / C#", "Vue.js", "React / Next.js", "SQL Server",
  "AWS", "Firebase", "Java", "Tailwind CSS",
  "REST APIs", "HTML / CSS / JS", "Azure", "Node.js", "Git", "Python",
];

const PROJECTS = [
  {
    name: "Barkada Hospitality",
    href: "https://barkadahospitality.info",
    link: "barkadahospitality.info",
    img: "/images/barkad1.jpg",
    desc: "Full-stack reservation and payment platform for an Atlanta sushi omakase experience. Real-time seat availability via Firestore, non-refundable deposits via Square Payments.",
    tags: ["Next.js", "Firebase", "Square API", "Tailwind"],
  },
  {
    name: "ATL BootWatch",
    href: "https://www.atlboot.watch/",
    link: "atlboot.watch",
    img: "/images/boot1.jpg",
    desc: "Community-driven platform tracking parking boot activity across Atlanta. Users report incidents on a live map to bring transparency to a problem most locals deal with weekly.",
    tags: ["Next.js", "Supabase", "Google Maps API", "Tailwind"],
  },
  {
    name: "Billr",
    href: "https://apps.apple.com/us/app/billr-invoice-tracker/id6761347420",
    link: "App Store",
    img: "/images/billr1.jpg",
    desc: "iOS invoicing app for freelancers and small businesses. Log hours, flat fees, and expenses, then generate PDF invoices with your logo and track what you're owed from your iPhone.",
    tags: ["Swift", "SwiftUI", "Supabase", "RevenueCat"],
  },
  {
    name: "Signature Studio",
    href: "https://signature-studio-nine.vercel.app/",
    link: "signature-studio",
    img: "/images/sigstudio.jpg",
    desc: "Interactive tool for designing custom signatures. Handwriting-based fonts, structural variations, and live previews powered by opentype.js.",
    tags: ["Next.js", "opentype.js", "Tailwind"],
  },
];

const SIDEQUESTS = [
  { label: "Tennis",     text: "Seasonal leagues, long rallies, consistency, and good company." },
  { label: "Sports",     text: "Basketball weekly, lifting 3–4x a week. Sport is how I decompress." },
  { label: "Music",      text: "Concerts, guitars, and discovering new artists on repeat. There's always something playing whether I'm cooking, commuting, cleaning, or just straight up laying in bed." },
  { label: "Film",       text: "A fan of films with subtext, ambiguity, and enough restraint to let the audience connect the dots." },
  { label: "Outdoors",   text: "Hikes, green spaces, and good coffee outside. Anything that gets me outside for a few hours." },
  { label: "Collecting", text: "I like collecting things with stories behind them: pieces with interesting origins that mean something to me or the people I give them to." },
  { label: "Capturing",  text: "Snapping little vignettes of life and friends." },
];

const PANEL_COPY: Record<Accent, { eyebrow: string; title: string; intro: string; details: string[] }> = {
  eng: {
    eyebrow: "Build mode",
    title: "Software that feels useful before it feels loud.",
    intro: "I like tools with clear edges: fast paths through real workflows, thoughtful interfaces, and systems that keep doing their job after the fun prototype phase is over.",
    details: ["Enterprise ecommerce", "Full-stack product work", "Founder-style side projects"],
  },
  music: {
    eyebrow: "Music",
    title: "Always something playing.",
    intro: "Music is the constant in my day: on the drive in, while I cook, and when I wind down at night. Here's what's been on repeat.",
    details: [],
  },
  sports: {
    eyebrow: "Side quests",
    title: "Off the clock.",
    intro: "Outside of work I try to keep the week balanced: something competitive, something physical, and something just for me. Right now that's tennis, basketball and lifting, film, and a growing camera roll.",
    details: [],
  },
  adventure: {
    eyebrow: "Adventure",
    title: "Places I've been.",
    intro: "A few photos from trips and cities I've spent time in.",
    details: [],
  },
};

const TAGS: { id: Accent; label: string; desc: string; num: string }[] = [
  { id: "eng",       label: "software engineer",     desc: "work, stack, shipped projects",    num: "01" },
  { id: "music",     label: "music lover",           desc: "playlists, concerts, guitars",     num: "02" },
  { id: "sports",    label: "side quest enthusiast", desc: "tennis, training, little rituals", num: "03" },
  { id: "adventure", label: "adventure seeker",      desc: "places, photos, coordinates",      num: "04" },
];

const CONTACT_LINE = "I'm always happy to connect about work, projects, tennis, travel, or literally anything else.";

type Note = { id: NoteId; folder: string; title: string; accent?: Accent; meta: string; preview: string; keywords: string };

const NOTES: Note[] = [
  { id: "index",      folder: "Pinned",        title: "Michael Chen",          meta: "Index",          preview: "I'm a software engineer based in Atlanta, fuelled by good music, fun side quests, and a restless need to explore.", keywords: "about atlanta" },
  { id: "contact",    folder: "Pinned",        title: "Contact",               meta: "Email",          preview: CONTACT_LINE, keywords: `email linkedin resume ${EMAIL}` },
  { id: "eng",        folder: "Work",          title: "Software Engineer",     accent: "eng",       meta: "Build mode",     preview: PANEL_COPY.eng.intro, keywords: STACK.join(" ") },
  { id: "experience", folder: "Work",          title: "Experience",            accent: "eng",       meta: "2023 – Now",     preview: "Infomedia · CoreForceTech · Kohl's Corporate · University of Georgia", keywords: EXPERIENCE.map(e => e.desc).join(" ") + " uga education stack" },
  { id: "projects",   folder: "Work",          title: "Projects",              accent: "eng",       meta: `${PROJECTS.length} shipped`, preview: PROJECTS.map(p => p.name).join(" · "), keywords: PROJECTS.map(p => p.desc + p.tags.join(" ")).join(" ") },
  { id: "resume",     folder: "Work",          title: "Résumé",                accent: "eng",       meta: "PDF",            preview: "Education · Technical Skills · Experience · Projects", keywords: RESUME.experience.flatMap(e => e.bullets).join(" ") + RESUME.skills.map(k => k.items).join(" ") + " resume cv" },
  { id: "music",      folder: "Off the clock", title: "Music",                 accent: "music",     meta: "",               preview: PANEL_COPY.music.intro, keywords: "spotify playlist concerts guitar" },
  { id: "sports",     folder: "Off the clock", title: "Side Quests",           accent: "sports",    meta: "",               preview: PANEL_COPY.sports.intro, keywords: SIDEQUESTS.map(s => s.label + " " + s.text).join(" ") },
  { id: "adventure",  folder: "Off the clock", title: "Adventure",             accent: "adventure", meta: "",               preview: PANEL_COPY.adventure.intro, keywords: places.map(p => p.name).join(" ") + " travel photos" },
];

// Reading order for prev/next and the arrow keys.
const ORDER: NoteId[] = ["index", "eng", "experience", "projects", "resume", "music", "sports", "adventure", "contact"];
const FOLDERS = ["Pinned", "Work", "Off the clock"];

// rough-notation draws into SVG attributes, so it needs literal colors rather than CSS variables.
const INK: Record<"light" | "dark", Record<Accent, string>> = {
  light: { eng: "#1855a3", music: "#2a7030", sports: "#b84a10", adventure: "#9a7000" },
  dark:  { eng: "#6b9ee3", music: "#6cb872", sports: "#e8854a", adventure: "#dbb03a" },
};

// The index note gets the skyline instead of a margin doodle.
const DOODLES: Partial<Record<NoteId, { kind: DoodleKind; color: string }>> = {
  eng:        { kind: "code",      color: "var(--c-eng)" },
  experience: { kind: "coffee",    color: "var(--c-eng)" },
  projects:   { kind: "bulb",      color: "var(--c-adventure)" },
  resume:     { kind: "clip",      color: "var(--muted)" },
  music:      { kind: "notes",     color: "var(--c-music)" },
  sports:     { kind: "tennis",    color: "var(--c-sports)" },
  adventure:  { kind: "mountains", color: "var(--c-adventure)" },
  contact:    { kind: "plane",     color: "var(--c-eng)" },
};

// Forward: the current page turns away from its left edge to reveal the next.
// Backward: the previous page swings back in over the current one.
const flip: Variants = {
  enter: (dir: number) => dir > 0
    ? { rotateY: 0, opacity: 1, zIndex: 1 }
    : { rotateY: -100, opacity: 1, zIndex: 2, boxShadow: "0 0 60px rgba(0,0,0,.25)" },
  center: {
    rotateY: 0, opacity: 1, zIndex: 1, boxShadow: "0 0 0px rgba(0,0,0,0)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => dir > 0
    ? { rotateY: -100, zIndex: 2, boxShadow: "0 0 60px rgba(0,0,0,.25)", transition: { duration: 0.55, ease: [0.55, 0, 0.75, 0.3] } }
    : { opacity: 0, zIndex: 0, transition: { duration: 0.2, delay: 0.4 } },
};
const fade: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// Paper tabs on the page edge; each opens the first note of its group.
const TABS: { label: string; color: string; group: NoteId[] }[] = [
  { label: "Index",       color: "var(--ink)",         group: ["index", "contact"] },
  { label: "Work",        color: "var(--c-eng)",       group: ["eng", "experience", "projects", "resume"] },
  { label: "Music",       color: "var(--c-music)",     group: ["music"] },
  { label: "Side Quests", color: "var(--c-sports)",    group: ["sports"] },
  { label: "Adventure",   color: "var(--c-adventure)", group: ["adventure"] },
];

const ThemeCtx = createContext(false);

function Mark({ c, type = "highlight", delay = 0, children }: {
  c: Accent; type?: "highlight" | "underline" | "circle" | "box"; delay?: number; children: React.ReactNode;
}) {
  const dm = useContext(ThemeCtx);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ink = INK[dm ? "dark" : "light"][c];
    const a = annotate(ref.current, {
      type,
      color: type === "highlight" ? `${ink}${dm ? "40" : "2e"}` : ink,
      multiline: true,
      padding: type === "circle" ? [4, 8] : 2,
      strokeWidth: type === "highlight" ? 1 : 1.8,
      animationDuration: type === "highlight" ? 700 : 550,
    });
    const t = setTimeout(() => a.show(), 650 + delay);
    return () => { clearTimeout(t); a.remove(); };
  }, [c, type, delay, dm]);
  return <span ref={ref}>{children}</span>;
}

// Wraps one phrase of a sentence in a hand-drawn mark.
function marked(text: string, mark: { text: string; type: "underline" | "circle" } | undefined, c: Accent) {
  if (!mark || !text.includes(mark.text)) return text;
  const [before, after] = text.split(mark.text);
  return <>{before}<Mark c={c} type={mark.type} delay={300}>{mark.text}</Mark>{after}</>;
}

function withNumbers(text: string) {
  return text.split(/(\$?\d+(?:%\+?|\+)?(?: million)?)/).map((part, i) =>
    i % 2 ? <strong key={i} className="num-hi">{part}</strong> : part,
  );
}

export default function HomePage() {
  const [dm, setDm]         = useState(false);
  const [active, setActive] = useState<NoteId>("index");
  const [view, setView]     = useState<"list" | "note">("list");
  const [query, setQuery]   = useState("");
  const [copied, setCopied] = useState(false);
  const [night, setNight]   = useState(false);
  const [ball, setBall]     = useState<number | null>(null);
  const [placeJump, setPlaceJump] = useState<{ index: number; key: number }>();
  const [done, setDone]     = useState<Record<string, boolean>>({});
  const [dir, setDir]       = useState(1);
  const reduce = useReducedMotion();
  const searchRef = useRef<HTMLInputElement>(null);
  const paneRef   = useRef<HTMLDivElement>(null);

  const note = NOTES.find(n => n.id === active)!;
  const accent = note.accent;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NOTES;
    return NOTES.filter(n => `${n.title} ${n.meta} ${n.preview} ${n.keywords}`.toLowerCase().includes(q));
  }, [query]);

  const open = useCallback((id: NoteId) => {
    if (id !== active) setDir(ORDER.indexOf(id) >= ORDER.indexOf(active) ? 1 : -1);
    setActive(id);
    setView("note");
    paneRef.current?.scrollTo({ top: 0 });
  }, [active]);

  // The skyline lights up after dark in Atlanta.
  useEffect(() => {
    const check = () => {
      const hour = Number(new Date().toLocaleString("en-US", { hour: "numeric", hour12: false, timeZone: "America/New_York" }));
      setNight(hour >= 20 || hour < 6);
    };
    check();
    const id = setInterval(check, 10 * 60_000);
    return () => clearInterval(id);
  }, []);

  // Search easter eggs: "tennis" sends a ball across the page; a city name opens that photo.
  const onSearch = (value: string) => {
    setQuery(value);
    const q = value.trim().toLowerCase();
    if (q === "tennis" && !reduce) setBall(Date.now());
    const hit = places.findIndex(p => {
      const city = p.name.split(",")[0].toLowerCase();
      return q.length >= 4 && (city === q || city.replace(/ city$/, "") === q);
    });
    if (hit !== -1) {
      setPlaceJump({ index: hit, key: Date.now() });
      open("adventure");
    }
  };

  // Deep links: /#projects opens that note.
  useEffect(() => {
    const id = window.location.hash.slice(1) as NoteId;
    if (ORDER.includes(id)) { setActive(id); setView("note"); }
  }, []);

  useEffect(() => {
    history.replaceState(null, "", active === "index" ? window.location.pathname : `#${active}`);
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = document.activeElement === searchRef.current;
      if (e.key === "/" && !typing) { e.preventDefault(); searchRef.current?.focus(); return; }
      if (e.key === "Escape" && typing) { setQuery(""); searchRef.current?.blur(); return; }
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const list = ORDER.filter(id => results.some(r => r.id === id));
      if (!list.length) return;
      e.preventDefault();
      const i = list.indexOf(active);
      const next = e.key === "ArrowDown" ? list[Math.min(i + 1, list.length - 1)] : list[Math.max(i - 1, 0)];
      if (next) open(i === -1 ? list[0] : next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, results, open]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard unavailable; nothing to do */ }
  };

  const pos = ORDER.indexOf(active);
  const prev = pos > 0 ? NOTES.find(n => n.id === ORDER[pos - 1]) : null;
  const next = pos < ORDER.length - 1 ? NOTES.find(n => n.id === ORDER[pos + 1]) : null;

  const ThemeBtn = (
    <button className="icon" onClick={() => setDm(d => !d)} aria-label="Toggle dark mode">
      {dm ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );

  return (
    <ThemeCtx.Provider value={dm}>
      <main
        className={`app${dm ? " dark" : ""}`}
        data-view={view}
        style={{ "--a": accent ? `var(--c-${accent})` : "var(--ink)" } as React.CSSProperties}
      >
        <style>{`

          .app {
            --bg: #EEEEEA;
            --side: #E6E6E1;
            --tile: #F7F6F2;
            --paper: #fffdf8;
            --ink: #111110;
            --muted: #79796e;
            --rule: #d6d6cf;
            --dot: #cfcfc7;
            --c-eng: #1855a3;
            --c-music: #2a7030;
            --c-sports: #b84a10;
            --c-adventure: #9a7000;
            /* Fine paper grain: tinted fractal noise, tiled. */
            --grain: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .32 0 0 0 0 .27 0 0 0 0 .2 0 0 0 .09 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
            display: grid; grid-template-columns: minmax(0, 1fr);
            height: 100vh; height: 100dvh;
            background: var(--bg); color: var(--ink);
            font-family: var(--font-body), Georgia, serif; font-size: 17px;
            transition: background .4s, color .4s;
          }
          .app.dark {
            --bg: #131312;
            --side: #0e0e0d;
            --tile: #1b1b19;
            --paper: #ecebe4;
            --ink: #f0f0ec;
            --muted: #8a8a82;
            --rule: #2a2a27;
            --dot: #262624;
            --c-eng: #6b9ee3;
            --c-music: #6cb872;
            --c-sports: #e8854a;
            --c-adventure: #dbb03a;
            --grain: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 .96 0 0 0 0 .9 0 0 0 .05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
            color-scheme: dark;
          }
          :where(.app) *, :where(.app) *::before, :where(.app) *::after { box-sizing: border-box; margin: 0; padding: 0; }
          :where(.app) button { font: inherit; cursor: pointer; background: none; border: none; color: inherit; text-align: left; }
          :where(.app) a { color: inherit; text-decoration: none; }
          .app ::selection { background: var(--a); color: var(--bg); }

          .mono { font-family: var(--font-mono), monospace; font-size: 10.5px; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }
          .serif { font-family: var(--font-display), serif; font-style: italic; font-weight: 300; letter-spacing: -0.015em; }
          .hand { font-family: var(--font-hand), cursive; font-weight: 500; }
          .icon {
            width: 34px; height: 34px; border-radius: 99px; flex-shrink: 0;
            display: inline-flex; align-items: center; justify-content: center;
            color: var(--muted); transition: background .2s, color .2s;
          }
          .icon:hover { background: var(--tile); color: var(--ink); }

          /* ── Sidebar ── */
          .side {
            display: flex; flex-direction: column; min-height: 0;
            background: var(--grain), var(--side); background-size: 180px 180px; border-right: 1px solid var(--rule);
            padding-top: env(safe-area-inset-top, 0px);
          }
          .side-top { display: flex; align-items: center; justify-content: space-between; padding: 22px 18px 6px 22px; }
          .side-top h1 { font-size: 30px; line-height: 1; }
          .search { position: relative; margin: 14px 16px 6px; }
          .search svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--muted); }
          .search input {
            width: 100%; padding: 10px 34px; border-radius: 12px;
            border: 1px solid var(--rule); background: var(--tile); color: var(--ink);
            font: inherit; font-size: 16px; outline: none; transition: border-color .2s, box-shadow .2s;
          }
          .search input:focus { border-color: var(--muted); box-shadow: 0 0 0 4px color-mix(in srgb, var(--muted) 14%, transparent); }
          .search kbd { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); font-family: var(--font-mono), monospace; font-size: 10px; color: var(--muted); border: 1px solid var(--rule); border-radius: 5px; padding: 1px 6px; }
          .list { flex: 1; overflow-y: auto; padding: 6px 10px 20px; }
          .folder { padding: 18px 12px 6px; }
          .item { position: relative; display: block; width: 100%; padding: 11px 12px; border-radius: 12px; }
          .item .bg { position: absolute; inset: 0; border-radius: 12px; background: var(--tile); box-shadow: 0 1px 0 var(--rule); }
          .item > *:not(.bg) { position: relative; }
          .item-title { display: flex; align-items: center; gap: 8px; font-size: 17px; font-weight: 500; }
          .item-title i { width: 7px; height: 7px; border-radius: 99px; background: var(--c, var(--ink)); flex-shrink: 0; }
          .item-sub { display: flex; gap: 8px; margin-top: 3px; font-size: 14.5px; color: var(--muted); white-space: nowrap; overflow: hidden; }
          .item-sub span:last-child { overflow: hidden; text-overflow: ellipsis; }
          .item-sub .mono { flex-shrink: 0; padding-top: 3px; font-size: 9.5px; }
          .empty { padding: 24px 12px; color: var(--muted); font-style: italic; }
          .side-foot { padding: 14px 22px calc(16px + env(safe-area-inset-bottom, 0px)); border-top: 1px solid var(--rule); }

          /* ── Note pane ── */
          .pane { position: relative; min-height: 0; overflow-y: auto; overflow-x: hidden; background: var(--side); }
          .toolbar {
            position: sticky; top: 0; z-index: 5;
            display: flex; align-items: center; justify-content: space-between; gap: 10px;
            padding: calc(12px + env(safe-area-inset-top, 0px)) 16px 12px;
            background: var(--grain), color-mix(in srgb, var(--bg) 88%, transparent);
            background-size: 180px 180px, auto;
            backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          }
          .back { display: none; align-items: center; gap: 2px; color: var(--a); font-size: 17px; }
          .tools { display: flex; align-items: center; gap: 4px; margin-left: auto; }
          .tools .copied { color: var(--a); }

          .page { max-width: 700px; margin: 0 auto; padding: 28px clamp(20px, 5vw, 48px) 80px; }
          .eyebrow { color: var(--a); margin-bottom: 14px; }
          .title { font-size: clamp(42px, 6vw, 64px); line-height: 1; margin-bottom: 22px; }
          .lede { font-size: clamp(19px, 2.2vw, 22px); line-height: 1.6; color: var(--muted); }
          .body p + p { margin-top: 14px; }
          .label { margin: 44px 0 14px; color: var(--a); }

          .tldr { font-size: clamp(22px, 3vw, 28px); line-height: 1.55; }
          .tldr button { color: var(--c); font-size: inherit; text-align: inherit; }
          .index { margin-top: 36px; border-top: 1px solid var(--rule); }
          .index button {
            display: grid; grid-template-columns: 40px 1fr 24px; align-items: center; gap: 10px;
            width: 100%; padding: 16px 4px; border-bottom: 1px solid var(--rule);
            transition: padding .25s cubic-bezier(.22,1,.36,1);
          }
          .index button:hover { padding-left: 12px; }
          .index .num { font-family: var(--font-mono), monospace; font-size: 11px; color: var(--c); }
          .index .lbl { font-size: clamp(22px, 3vw, 28px); line-height: 1.15; }
          .index button:hover .lbl { color: var(--c); }
          .index svg { color: var(--muted); transition: transform .25s, color .25s; }
          .index button:hover svg { color: var(--c); transform: translateX(3px); }

          .details { display: flex; flex-wrap: wrap; gap: 8px 22px; margin-top: 26px; padding-block: 14px; border-block: 1px solid var(--rule); }
          .details > span { display: inline-flex; gap: 8px; align-items: baseline; font-size: 17px; }
          .details .mono { color: var(--a); }
          .chips { display: flex; flex-wrap: wrap; gap: 7px; }
          .chip {
            font-family: var(--font-mono), monospace; font-size: 10.5px; letter-spacing: .05em; text-transform: uppercase;
            padding: 6px 10px; border-radius: 8px;
            border: 1px solid color-mix(in srgb, var(--a) 30%, var(--rule));
            background: color-mix(in srgb, var(--a) 7%, var(--tile));
          }
          .jump { display: inline-flex; align-items: center; gap: 6px; margin-top: 18px; margin-right: 18px; color: var(--a); border-bottom: 1px solid currentColor; padding-bottom: 1px; }

          .row { display: grid; grid-template-columns: 1fr; gap: 6px; padding: 22px 0; border-top: 1px solid var(--rule); }
          .row:last-of-type { border-bottom: 1px solid var(--rule); }
          @media (min-width: 620px) { .row { grid-template-columns: 160px 1fr; gap: 0; } }
          .row h3 { font-size: 19px; font-weight: 500; display: flex; flex-wrap: wrap; gap: 0 9px; align-items: baseline; }
          .row h3 a { font-weight: 400; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: var(--rule); transition: text-decoration-color .2s; }
          .row h3 a:hover { text-decoration-color: var(--a); }
          .row .desc { margin-top: 6px; font-size: 16.5px; font-style: italic; line-height: 1.7; color: var(--muted); }

          .proj { display: grid; grid-template-columns: 1fr; gap: 18px; padding: 30px 0; border-top: 1px solid var(--rule); }
          @media (min-width: 620px) { .proj { grid-template-columns: 210px 1fr; gap: 26px; } }
          .snap { position: relative; align-self: start; padding: 7px; background: var(--paper); border-radius: 4px; box-shadow: 0 10px 24px -14px rgba(0,0,0,.4); transform: rotate(-1.5deg); transition: transform .4s cubic-bezier(.22,1,.36,1); }
          .proj:nth-of-type(even) .snap { transform: rotate(1.5deg); }
          .proj:hover .snap { transform: rotate(0) scale(1.02); }
          .snap::before {
            content: ""; position: absolute; top: -9px; left: 50%; width: 70px; height: 20px; transform: translateX(-50%) rotate(-3deg);
            background: color-mix(in srgb, var(--c-adventure) 22%, rgba(255,255,255,.55)); box-shadow: 0 1px 2px rgba(0,0,0,.08);
          }
          .snap img, .snap .ph { width: 100%; aspect-ratio: 16 / 11; object-fit: cover; object-position: top; display: block; border-radius: 2px; }
          .snap .ph { display: flex; align-items: center; justify-content: center; background: #f1efe8; color: #1855a3; font-size: 54px; }
          .proj h3 { font-size: 22px; font-weight: 500; }
          .proj a.lnk { display: inline-flex; align-items: center; gap: 3px; margin-top: 2px; font-size: 16px; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: color-mix(in srgb, var(--a) 60%, var(--rule)); }
          .proj p { margin: 10px 0 14px; font-size: 16.5px; line-height: 1.7; color: var(--muted); font-style: italic; }

          .check { display: grid; grid-template-columns: 26px 1fr; gap: 12px; width: 100%; padding: 16px 0; border-top: 1px solid var(--rule); }
          .check:last-child { border-bottom: 1px solid var(--rule); }
          .box {
            width: 22px; height: 22px; margin-top: 2px; border-radius: 7px; border: 1.5px solid var(--a);
            display: flex; align-items: center; justify-content: center; color: var(--bg);
            transition: background .2s;
          }
          .check[aria-checked="true"] .box { background: var(--a); }
          .check b { font-weight: 500; color: var(--a); }
          .check > span:last-child { display: block; font-size: 17px; line-height: 1.65; transition: color .2s; }
          .check[aria-checked="true"] > span:last-child { color: var(--muted); text-decoration: line-through; text-decoration-color: color-mix(in srgb, var(--a) 60%, transparent); }

          .margin { display: inline-block; font-size: 26px; color: var(--a); transform: rotate(-2deg); }
          .sheet { margin-top: 18px; padding: 24px; border-radius: 18px; background: var(--tile); border: 1px solid var(--rule); }

          .links a {
            display: flex; justify-content: space-between; align-items: center; gap: 12px;
            padding: 18px 2px; border-bottom: 1px solid var(--rule); font-size: clamp(19px, 2.4vw, 24px);
            transition: padding .25s cubic-bezier(.22,1,.36,1), color .2s;
          }
          .links a:first-child { border-top: 1px solid var(--rule); }
          .links a:hover { padding-left: 10px; color: var(--c-eng); }

          .pager { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 64px; }
          .pager button { padding: 14px 16px; border-radius: 14px; border: 1px solid var(--rule); background: var(--tile); transition: border-color .2s; }
          .pager button:hover { border-color: var(--muted); }
          .pager .mono { display: flex; align-items: center; gap: 4px; margin-bottom: 4px; }
          .pager button:last-child { text-align: right; grid-column: 2; }
          .pager button:last-child .mono { justify-content: flex-end; }

          /* Page turn */
          .pane { perspective: 2200px; }
          .leaf {
            position: relative; min-height: calc(100% - 58px);
            transform-origin: left center; backface-visibility: hidden; transform-style: preserve-3d;
            background-color: var(--bg);
            background-image: radial-gradient(var(--dot) 1px, transparent 1.2px), var(--grain);
            background-size: 24px 24px, 180px 180px;
          }
          .page { position: relative; }

          /* Doodles */
          .doodle { position: absolute; top: 18px; right: clamp(14px, 4vw, 40px); width: 62px; height: 62px; transform: rotate(-8deg); pointer-events: none; }
          .page .title { padding-right: 58px; }
          .skyline { display: block; width: 100%; height: auto; margin-top: 34px; color: var(--ink); }
          @media (min-width: 1440px) {
            .doodle { top: 70px; right: -150px; width: 118px; height: 118px; }
            .page .title { padding-right: 0; }
          }

          /* Résumé */
          .dl {
            display: inline-flex; align-items: center; gap: 6px; height: 34px; padding: 0 12px; border-radius: 99px;
            font-family: var(--font-mono), monospace; font-size: 11px; letter-spacing: .06em; text-transform: uppercase;
            background: var(--ink); color: var(--bg); transition: opacity .2s;
          }
          .dl:hover { opacity: .85; }
          .dl.big { margin-top: 18px; height: 40px; padding: 0 16px; }
          .ul { text-decoration: underline; text-underline-offset: 3px; text-decoration-color: var(--rule); transition: text-decoration-color .2s; }
          .ul:hover { text-decoration-color: var(--a); }
          .cv { margin-top: 34px; padding: clamp(20px, 4vw, 36px); border-radius: 6px; background: var(--tile); border: 1px solid var(--rule); box-shadow: 0 18px 40px -30px rgba(0,0,0,.35); font-size: 16px; line-height: 1.55; }
          .cv-h { font-variant: small-caps; font-size: 20px; font-weight: 500; letter-spacing: .02em; border-bottom: 1px solid var(--ink); padding-bottom: 2px; margin: 26px 0 10px; }
          .cv-h:first-child { margin-top: 0; }
          .cv-entry + .cv-entry { margin-top: 14px; }
          .cv-line { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
          .cv-line b { font-weight: 500; }
          .cv-line.sub { color: var(--muted); }
          .cv-skill + .cv-skill { margin-top: 2px; }
          .cv-skill b { font-weight: 500; }
          .cv ul { margin: 6px 0 0 18px; list-style: disc; }
          .cv li { margin-top: 4px; }
          .cv li::marker { color: var(--a); }
          .num-hi { font-weight: 500; color: var(--a); }

          /* Notebook tabs */
          .tabs { position: fixed; right: 0; top: 96px; z-index: 20; display: none; flex-direction: column; gap: 6px; }
          .tab {
            writing-mode: vertical-rl; padding: 16px 8px 16px 9px;
            border-radius: 10px 0 0 10px; border: 1px solid color-mix(in srgb, var(--c) 35%, var(--rule)); border-right: none;
            background: var(--grain), color-mix(in srgb, var(--c) 14%, var(--tile)); background-size: 180px 180px, auto;
            font-family: var(--font-mono), monospace; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: var(--c);
            box-shadow: -2px 2px 6px -3px rgba(0,0,0,.18);
            transform: translateX(8px); transition: transform .25s cubic-bezier(.22,1,.36,1), background .2s;
          }
          .tab:hover { transform: translateX(2px); }
          .tab.on { transform: translateX(0); background: var(--grain), color-mix(in srgb, var(--c) 26%, var(--tile)); background-size: 180px 180px, auto; }

          /* Tennis easter egg */
          .ball { position: fixed; left: 0; top: 18vh; z-index: 60; pointer-events: none; }

          @media (min-width: 861px) {
            .app { grid-template-columns: 320px minmax(0, 1fr); }
            .tabs { display: flex; }
          }
          @media (max-width: 860px) {
            .app[data-view="list"] .pane { display: none; }
            .app[data-view="note"] .side { display: none; }
            .back { display: inline-flex; }
            .side { border-right: none; }
          }
        `}</style>

        {/* ── SIDEBAR ── */}
        <aside className="side">
          <div className="side-top">
            <div>
              <h1 className="serif">Michael Chen</h1>
              <p className="mono" style={{ marginTop: 8 }}>Notebook · {NOTES.length} notes</p>
            </div>
            {ThemeBtn}
          </div>

          <div className="search">
            <Search size={15} />
            <input
              ref={searchRef}
              value={query}
              onChange={e => onSearch(e.target.value)}
              placeholder="Search notes"
              aria-label="Search notes"
            />
            {!query && <kbd>/</kbd>}
          </div>

          <nav className="list" aria-label="Notes">
            {FOLDERS.map(folder => {
              const items = results.filter(n => n.folder === folder);
              if (!items.length) return null;
              return (
                <div key={folder}>
                  <p className="mono folder">{folder}</p>
                  {items.map(n => (
                    <button
                      key={n.id}
                      className="item"
                      onClick={() => open(n.id)}
                      aria-current={active === n.id ? "page" : undefined}
                      style={{ "--c": n.accent ? `var(--c-${n.accent})` : "var(--ink)" } as React.CSSProperties}
                    >
                      {active === n.id && (
                        <motion.span layoutId="active-note" className="bg" transition={{ type: "spring", stiffness: 500, damping: 40 }} />
                      )}
                      <span className="item-title"><i />{n.title}</span>
                      <span className="item-sub">{n.meta && <span className="mono">{n.meta}</span>}<span>{n.preview}</span></span>
                    </button>
                  ))}
                </div>
              );
            })}
            {!results.length && <p className="empty">No notes match “{query}”.</p>}
          </nav>

          <div className="side-foot mono">© {new Date().getFullYear()} Michael Chen</div>
        </aside>

        {/* ── NOTE ── */}
        <section className="pane" ref={paneRef}>
          <div className="toolbar">
            <button className="back" onClick={() => setView("list")}><ChevronLeft size={20} />Notes</button>
            <div className="tools">
              {active === "resume" && (
                <a className="dl" href={RESUME_PDF} download>
                  <Download size={14} /> PDF
                </a>
              )}
              <button className={`icon${copied ? " copied" : ""}`} onClick={copyLink} aria-label="Copy link to this note">
                {copied ? <Check size={15} /> : <Link2 size={15} />}
              </button>
              {ThemeBtn}
            </div>
          </div>

          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.div
              key={active}
              className="leaf"
              custom={dir}
              variants={reduce ? fade : flip}
              initial="enter"
              animate="center"
              exit="exit"
            >
            <article className="page">
              {DOODLES[active] && <Doodle kind={DOODLES[active].kind} className="doodle" style={{ color: DOODLES[active].color }} />}
              {active === "index" && (
                <>
                  <p className="mono eyebrow">Index</p>
                  <h2 className="serif title">Michael Chen</h2>
                  <p className="tldr">
                    I&apos;m a{" "}
                    <button style={{ "--c": "var(--c-eng)" } as React.CSSProperties} onClick={() => open("eng")}><Mark c="eng">software engineer</Mark></button>{" "}
                    based in Atlanta, fuelled by{" "}
                    <button style={{ "--c": "var(--c-music)" } as React.CSSProperties} onClick={() => open("music")}><Mark c="music" delay={500}>good music</Mark></button>,{" "}
                    <button style={{ "--c": "var(--c-sports)" } as React.CSSProperties} onClick={() => open("sports")}><Mark c="sports" delay={900}>fun side quests</Mark></button>, and a{" "}
                    <button style={{ "--c": "var(--c-adventure)" } as React.CSSProperties} onClick={() => open("adventure")}><Mark c="adventure" delay={1300}>restless need to explore</Mark></button>.
                  </p>
                  <Skyline className="skyline" delay={2} lit={dm || night} />
                  <div className="index">
                    {TAGS.map(t => (
                      <button key={t.id} onClick={() => open(t.id)} style={{ "--c": `var(--c-${t.id})` } as React.CSSProperties}>
                        <span className="num">{t.num}</span>
                        <span>
                          <span className="lbl" style={{ display: "block" }}>{t.label}</span>
                          <span className="mono" style={{ display: "block", marginTop: 5, fontSize: 9.5 }}>{t.desc}</span>
                        </span>
                        <ArrowRight size={17} />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {active in PANEL_COPY && (() => {
                const copy = PANEL_COPY[active as Accent];
                return (
                  <>
                    <p className="mono eyebrow">{copy.eyebrow}</p>
                    <h2 className="serif title">{copy.title}</h2>
                    <p className="lede">{copy.intro}</p>
                    {copy.details.length > 0 && (
                      <div className="details">
                        {copy.details.map((d, i) => (
                          <span key={d}><span className="mono">{String(i + 1).padStart(2, "0")}</span>{d}</span>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}

              {active === "eng" && (
                <div className="body">
                  <p style={{ marginTop: 30, fontSize: 18, fontStyle: "italic", lineHeight: 1.8, color: "var(--muted)" }}>
                    Currently building core front-end and back-end systems for{" "}
                    <Mark c="eng" type="underline">enterprise e-commerce platforms</Mark>, with side projects that lean practical: reservations, invoices, maps, signatures, and things people can actually use.
                  </p>
                  <p className="mono label">Common tools</p>
                  <div className="chips">{STACK.slice(0, 12).map(s => <span className="chip" key={s}>{s}</span>)}</div>
                  <button className="jump" onClick={() => open("projects")}>Projects <ArrowRight size={14} /></button>
                  <button className="jump" onClick={() => open("experience")}>Experience <ArrowRight size={14} /></button>
                </div>
              )}

              {active === "experience" && (
                <>
                  <p className="mono eyebrow">Work · 2023 – Now</p>
                  <h2 className="serif title">Experience</h2>
                  {EXPERIENCE.map(e => (
                    <div className="row" key={e.co}>
                      <div className="mono" style={{ paddingTop: 5 }}>{e.date}</div>
                      <div>
                        <h3>
                          <span>{e.role}</span>
                          <span style={{ color: "var(--muted)", fontWeight: 400 }}>·</span>
                          <a href={e.href} target="_blank" rel="noreferrer">{e.co} ↗</a>
                        </h3>
                        <p className="desc">{marked(e.desc, e.mark, "eng")}</p>
                      </div>
                    </div>
                  ))}
                  <div className="row">
                    <div className="mono" style={{ paddingTop: 5 }}>{EDUCATION.date}</div>
                    <div>
                      <h3>
                        <span>{EDUCATION.degree}</span>
                        <span style={{ color: "var(--muted)", fontWeight: 400 }}>·</span>
                        <a href={EDUCATION.href} target="_blank" rel="noreferrer">{EDUCATION.school} ↗</a>
                      </h3>
                      <p className="desc">{EDUCATION.location} · <span className="hand" style={{ fontSize: 22, fontStyle: "normal", color: "#ba0c2f" }}>Go Dawgs</span></p>
                    </div>
                  </div>
                  <p className="mono label">Stack</p>
                  <div className="chips">{STACK.map(s => <span className="chip" key={s}>{s}</span>)}</div>
                </>
              )}

              {active === "projects" && (
                <>
                  <p className="mono eyebrow">{PROJECTS.length} shipped</p>
                  <h2 className="serif title">Projects</h2>
                  {PROJECTS.map(p => (
                    <div className="proj" key={p.name}>
                      <a className="snap" href={p.href} target="_blank" rel="noreferrer" aria-label={`Open ${p.name}`}>
                        {p.img ? <img src={p.img} alt={`${p.name} screenshot`} loading="lazy" /> : <span className="ph serif">Aa</span>}
                      </a>
                      <div>
                        <h3>{p.name}</h3>
                        <a className="lnk" href={p.href} target="_blank" rel="noreferrer">{p.link} <ArrowUpRight size={14} /></a>
                        <p>{p.desc}</p>
                        <div className="chips">{p.tags.map(t => <span className="chip" key={t}>{t}</span>)}</div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {active === "music" && (
                <>
                  <div className="sheet" style={{ padding: 10, marginTop: 30 }}>
                    <iframe
                      title="Spotify playlist"
                      src="https://open.spotify.com/embed/playlist/4ynAF5u8eruVcNJGGEA7R5?utm_source=generator&theme=0"
                      width="100%" height="352" frameBorder={0}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      style={{ display: "block", borderRadius: 12 }}
                    />
                  </div>
                </>
              )}

              {active === "sports" && (
                <div style={{ marginTop: 36 }}>
                  {SIDEQUESTS.map(s => {
                    const isDone = !!done[s.label];
                    return (
                      <button
                        key={s.label}
                        role="checkbox"
                        aria-checked={isDone}
                        className="check"
                        onClick={() => setDone(d => ({ ...d, [s.label]: !d[s.label] }))}
                      >
                        <span className="box">{isDone && <Check size={14} strokeWidth={3} />}</span>
                        <span><b>{s.label}</b>: {s.text}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {active === "adventure" && (
                <>
                  <p className="hand margin" style={{ marginTop: 26 }}>all pics taken by me :D</p>
                  <div className="sheet"><PlacesSection jump={placeJump} /></div>
                </>
              )}

              {active === "resume" && (
                <>
                  <p className="mono eyebrow">Work · PDF</p>
                  <h2 className="serif title">Résumé</h2>
                  <p className="lede">
                    <a href={`mailto:${EMAIL}`} className="ul">{EMAIL}</a>{" · "}
                    <a href="https://linkedin.com/in/michael-chen880/" target="_blank" rel="noreferrer" className="ul">linkedin.com/in/michael-chen880/</a>
                  </p>
                  <a className="dl big" href={RESUME_PDF} download><Download size={15} /> Download PDF</a>

                  <div className="cv">
                    <h3 className="cv-h">Education</h3>
                    <div className="cv-entry">
                      <div className="cv-line"><b>{RESUME.education.school}</b><span>{RESUME.education.location}</span></div>
                      <div className="cv-line sub"><i>{RESUME.education.degree}</i><i>{RESUME.education.date}</i></div>
                    </div>

                    <h3 className="cv-h">Technical Skills</h3>
                    {RESUME.skills.map(k => (
                      <p className="cv-skill" key={k.label}><b>{k.label}</b>: {k.items}</p>
                    ))}

                    <h3 className="cv-h">Experience</h3>
                    {RESUME.experience.map(e => (
                      <div className="cv-entry" key={e.co}>
                        <div className="cv-line"><b>{e.role}</b><span>{e.date}</span></div>
                        <div className="cv-line sub"><i>{e.co}</i><i>{e.location}</i></div>
                        <ul>{e.bullets.map(b => <li key={b.slice(0, 32)}>{withNumbers(b)}</li>)}</ul>
                      </div>
                    ))}

                    <h3 className="cv-h">Projects</h3>
                    {RESUME.projects.map(pr => (
                      <div className="cv-entry" key={pr.name}>
                        <div className="cv-line">
                          <span><b>{pr.name}</b> (<a href={pr.href} target="_blank" rel="noreferrer" className="ul">{pr.link}</a>) | <i>{pr.stack}</i></span>
                          <span>{pr.date}</span>
                        </div>
                        <ul>{pr.bullets.map(b => <li key={b.slice(0, 32)}>{withNumbers(b)}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {active === "contact" && (
                <>
                  <p className="mono eyebrow" style={{ color: "var(--c-eng)" }}>Pinned</p>
                  <h2 className="serif title">Contact</h2>
                  <p className="lede">{CONTACT_LINE}</p>
                  <div className="links" style={{ marginTop: 32 }}>
                    <a href={`mailto:${EMAIL}`}>{EMAIL} <ArrowUpRight size={18} /></a>
                    <a href="https://linkedin.com/in/michael-chen880/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={18} /></a>
                    <a href="/MichaelChenResume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={18} /></a>
                  </div>
                </>
              )}

              <nav className="pager" aria-label="More notes">
                {prev && (
                  <button onClick={() => open(prev.id)}>
                    <span className="mono"><ArrowLeft size={12} /> Previous</span>
                    {prev.title}
                  </button>
                )}
                {next && (
                  <button onClick={() => open(next.id)}>
                    <span className="mono">Next <ArrowRight size={12} /></span>
                    {next.title}
                  </button>
                )}
              </nav>
            </article>
            </motion.div>
          </AnimatePresence>
        </section>

        <nav className="tabs" aria-label="Sections">
          {TABS.map(t => (
            <button
              key={t.label}
              className={`tab${t.group.includes(active) ? " on" : ""}`}
              style={{ "--c": t.color } as React.CSSProperties}
              onClick={() => open(t.group[0])}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <AnimatePresence>
          {ball && (
            <motion.div
              key={ball}
              className="ball"
              aria-hidden="true"
              initial={{ x: "-8vw" }}
              animate={{ x: "108vw", rotate: 720 }}
              transition={{ duration: 2.6, ease: "linear" }}
              onAnimationComplete={() => setBall(null)}
            >
              <motion.svg
                viewBox="0 0 40 40" width="34" height="34"
                animate={{ y: [0, 300, 110, 300, 190, 300, 245, 300] }}
                transition={{ duration: 2.6, times: [0, .2, .35, .5, .62, .75, .86, 1], ease: ["easeIn", "easeOut", "easeIn", "easeOut", "easeIn", "easeOut", "easeIn"] }}
              >
                <circle cx="20" cy="20" r="18" fill="#d6e23a" stroke="#9aa61a" strokeWidth="1.5" />
                <path d="M6 9 C14 15 14 25 6 31 M34 9 C26 15 26 25 34 31" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </ThemeCtx.Provider>
  );
}
