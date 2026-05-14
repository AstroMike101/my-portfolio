"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import PlacesSection from "@/components/PlacesSection";

type PanelId = "eng" | "music" | "sports" | "adventure";

const EXPERIENCE = [
  {
    date: "Jul 2025 — Now",
    role: "Software Engineer",
    co: "Infomedia",
    href: "https://www.infomedia.com.au/",
    desc: "Building core front-end and back-end systems for enterprise e-commerce platforms — Ford, Toyota, Honda, BMW, and VW dealer networks. Full-stack across Vue.js, C#, .NET, and SQL Server.",
  },
  {
    date: "Jun 2024 — Jul 2025",
    role: "Software Engineer",
    co: "CoreForceTech",
    href: "https://www.coreforcetech.com",
    desc: "Built tools that help public safety agencies act faster and smarter. Worked on a .NET C# service with WPF GUI for automated data collection, streamlined deployments for 20+ clients, and integrated real-time APIs to improve accuracy and uptime.",
  },
  {
    date: "Jun 2023 — Aug 2023",
    role: "Software Engineer Intern",
    co: "Kohl's Corporate",
    href: "https://corporate.kohls.com/",
    desc: "Shipped React and Adobe Experience Manager pages reaching 65M+ customers. Ran A/B tests, built SPA-driven UIs.",
  },
];

const EDUCATION = {
  date: "Aug 2020 — May 2024",
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
    link: "barkadahospitality.info ↗",
    desc: "Full-stack reservation and payment platform for an Atlanta sushi omakase experience. Real-time seat availability via Firestore, non-refundable deposits via Square Payments.",
    tags: ["Next.js", "Firebase", "Square API", "Tailwind"],
  },
  {
    name: "ATL BootWatch",
    href: "https://www.atlboot.watch/",
    link: "atlboot.watch ↗",
    desc: "Community-driven platform tracking parking boot activity across Atlanta. Users report incidents on a live map to bring transparency to a problem most locals deal with weekly.",
    tags: ["Next.js", "Supabase", "Google Maps API", "Tailwind"],
  },
  {
    name: "Billr",
    href: "https://apps.apple.com/us/app/billr-invoice-tracker/id6761347420",
    link: "App Store ↗",
    desc: "iOS invoicing app for freelancers and small businesses. Log hours, flat fees, and expenses — generate PDF invoices with your logo and track what you're owed from your iPhone.",
    tags: ["Swift", "SwiftUI", "Supabase", "RevenueCat"],
  },
  {
    name: "Signature Studio",
    href: "https://signature-studio-nine.vercel.app/",
    link: "signature-studio ↗",
    desc: "Interactive tool for designing custom signatures. Handwriting-based fonts, structural variations, and live previews powered by opentype.js.",
    tags: ["Next.js", "opentype.js", "Tailwind"],
  },
];

const SIDEQUESTS = [
  { label: "Tennis",     text: "Seasonal leagues, long rallies, consistency, and good company." },
  { label: "Sports",     text: "Basketball weekly, lifting 3–4x a week. Sport is how I decompress — competitive enough to keep it interesting, consistent enough that it's just part of the routine." },
  { label: "Music",      text: "Concerts, guitars, and discovering new artists on repeat. There's always something playing whether I'm cooking, commuting, cleaning, or just straight up laying in bed." },
  { label: "Film",       text: "A fan of films with subtext, ambiguity, and enough restraint to let the audience connect the dots." },
  { label: "Outdoors",   text: "Hikes, green spaces, and good coffee outside. Anything that gets me outside for a few hours." },
  { label: "Collecting", text: "I like collecting things with stories behind them — pieces with interesting origins that mean something to me or the people I give them to." },
  { label: "Capturing",  text: "Snapping little vignettes of life and friends. I shoot on my phone mostly — nothing staged, just moments worth keeping." },
];

const TAG_META: Record<PanelId, { color: string; label: string }> = {
  eng:       { color: "#1855a3", label: "Software Engineer" },
  music:     { color: "#2a7030", label: "Music Lover" },
  sports:    { color: "#b84a10", label: "Side Quest Enthusiast" },
  adventure: { color: "#9a7000", label: "Adventure Seeker" },
};

function useTheme(dm: boolean) {
  return {
    bg:    dm ? "#131312" : "#EEEEEA",
    ink:   dm ? "#f0f0ec" : "#111110",
    muted: dm ? "#8a8a82" : "#79796e",
    rule:  dm ? "#2e2e2c" : "#d0d0ca",
    pill:  dm ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
  };
}

export default function HomePage() {
  const [dm, setDm]       = useState(false);
  const [panel, setPanel] = useState<PanelId | null>(null);
  const panelWrapRef = useRef<HTMLDivElement>(null);
  const t = useTheme(dm);

  const toggle = (id: PanelId) => {
    const opening = panel !== id;
    setPanel(opening ? id : null);
    if (opening) {
      setTimeout(() => {
        if (!panelWrapRef.current) return;
        const y =
          panelWrapRef.current.getBoundingClientRect().top +
          window.scrollY -
          48;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 80);
    }
  };

  const tags: { id: PanelId; label: string; num: string; color: string }[] = [
    { id: "eng",       label: "software engineer",    num: "1", color: TAG_META.eng.color },
    { id: "music",     label: "music lover",           num: "2", color: TAG_META.music.color },
    { id: "sports",    label: "side quest enthusiast", num: "3", color: TAG_META.sports.color },
    { id: "adventure", label: "adventure seeker",      num: "4", color: TAG_META.adventure.color },
  ];

  const mono: React.CSSProperties = {
    fontFamily: "'DM Mono', monospace",
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: t.muted,
  };

  const px   = "clamp(20px, 5vw, 72px)";
  const maxW = 960;

  return (
    <main style={{
      minHeight: "100vh",
      background: t.bg,
      color: t.ink,
      fontFamily: "'EB Garamond', Georgia, serif",
      transition: "background 0.3s, color 0.3s",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #111110; color: #EEEEEA; }
        button { font-family: inherit; cursor: pointer; background: none; border: none; }
        a { text-decoration: none; }

        .w { max-width: ${maxW}px; margin: 0 auto; width: 100%; }

        .hero-inner {
          display: flex;
          flex-direction: column;
          min-height: clamp(280px, 38vh, 460px);
        }
        .hero-name {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          padding: clamp(36px,6vw,72px) 0 clamp(24px,4vw,48px);
          border-bottom: 0.5px solid ${t.rule};
        }
        .hero-tags {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: clamp(24px,4vw,52px) 0 clamp(28px,5vw,56px);
          gap: 4px;
        }
        @media (min-width: 720px) {
          .hero-inner { flex-direction: row; align-items: stretch; }
          .hero-name  {
            width: 44%;
            border-bottom: none;
            border-right: 0.5px solid ${t.rule};
            padding-right: clamp(24px,3vw,56px);
            align-items: center;
            justify-content: center;
          }
          .hero-tags  { padding-left: clamp(24px,3vw,56px); }
        }

        .exp-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
          padding: 24px 0;
          border-top: 0.5px solid ${t.rule};
        }
        @media (min-width: 580px) {
          .exp-row { grid-template-columns: 175px 1fr; gap: 0; }
        }

        .tag-btn { transition: opacity 0.18s; }
        .tag-btn:hover { opacity: 0.5 !important; }

        .co-link {
          color: inherit;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: ${t.rule};
          transition: text-decoration-color 0.15s;
        }
        .co-link:hover { text-decoration-color: ${t.muted}; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: t.bg, borderBottom: `0.5px solid ${t.rule}`,
        transition: "background 0.3s",
      }}>
        <div className="w" style={{
          display: "flex", justifyContent: "flex-end", alignItems: "center",
          padding: `0 ${px}`, height: 48,
        }}>
          <button
            onClick={() => setDm(d => !d)}
            aria-label="Toggle dark mode"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, color: t.muted }}
          >
            {dm ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ borderBottom: `0.5px solid ${t.rule}` }}>
        <div className="w" style={{ padding: `0 ${px}` }}>
          <div className="hero-inner">
            <div className="hero-name">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(72px, 9vw, 96px)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  lineHeight: 1.06,
                  color: t.ink,
                  letterSpacing: "-0.01em",
                }}
              >
                Michael<br />Chen
              </motion.div>
            </div>

            <div className="hero-tags">
              {tags.map((tag, i) => (
                <motion.button
                  key={tag.id}
                  onClick={() => toggle(tag.id)}
                  className="tag-btn"
                  initial={{ opacity: 0, x: 14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  style={{
                    display: "flex", alignItems: "baseline", gap: 8,
                    width: "fit-content", padding: "3px 0",
                    opacity: panel && panel !== tag.id ? 0.2 : 1,
                  }}
                >
                  <span style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: "clamp(22px, 3.6vw, 38px)",
                    fontWeight: 400, lineHeight: 1.3, color: t.ink,
                  }}>
                    {tag.label}
                  </span>
                  <sup style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11, fontWeight: 500,
                    color: tag.color, verticalAlign: "super", lineHeight: 0,
                  }}>
                    {tag.num}
                  </sup>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TLDR ── */}
      <div style={{ borderBottom: `0.5px solid ${t.rule}` }}>
        <div className="w" style={{
          padding: `14px ${px}`,
          fontFamily: "'DM Mono', monospace",
          fontSize: 11, textTransform: "uppercase",
          letterSpacing: "0.07em", lineHeight: 2, color: t.ink,
        }}>
          I&apos;m a <strong style={{ color: "#1855a3" }}>software engineer</strong> based in Atlanta —
          fuelled by <strong style={{ color: "#2a7030" }}>good music</strong>,{" "}
          <strong style={{ color: "#b84a10" }}>fun side quests</strong>, and a{" "}
          <strong style={{ color: "#9a7000" }}>restless need to explore</strong>.
        </div>
      </div>

      {/* ── PANEL WRAPPER ── */}
      <div ref={panelWrapRef}>
        <AnimatePresence initial={false}>
          {panel && (
            <motion.div
              key={panel}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: "hidden", borderBottom: `0.5px solid ${t.rule}` }}
            >
              <div style={{
                position: "sticky", top: 48, zIndex: 40,
                background: TAG_META[panel].color,
              }}>
                <div className="w" style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: `11px ${px}`,
                }}>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11, fontWeight: 500,
                    textTransform: "uppercase", letterSpacing: "0.12em",
                    color: "#fff",
                  }}>
                    {TAG_META[panel].label}
                  </span>
                  <button
                    onClick={() => setPanel(null)}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10, color: "rgba(255,255,255,0.75)",
                      textTransform: "uppercase", letterSpacing: "0.1em",
                      display: "flex", alignItems: "center", gap: 6,
                    }}
                  >
                    Close ✕
                  </button>
                </div>
              </div>

              <div className="w" style={{ padding: `0 ${px}` }}>
                {panel === "eng" && (
                  <div style={{ paddingTop: 64, paddingBottom: 64, maxWidth: 640 }}>
                    <p style={{ fontSize: 18, fontStyle: "italic", lineHeight: 1.8, color: t.muted }}>
                      I build software for work and personal projects, ranging from enterprise systems to mobile apps. Computer Science graduate from UGA, currently working at Infomedia in Atlanta.
                    </p>
                  </div>
                )}

                {panel === "music" && (
                  <div style={{ paddingTop: 64, paddingBottom: 64, maxWidth: 620 }}>
                    <p style={{ fontSize: 17, fontStyle: "italic", lineHeight: 1.8, color: t.muted, marginBottom: 28 }}>
                      Concerts, guitars, and new artists on constant repeat. Music is always on —
                      commuting, coding, hiking, doesn&apos;t matter. I lean towards anything with texture:
                      indie, alt-folk, ambient, and occasionally something that makes no sense but hits
                      exactly right.
                    </p>
                    <iframe
                      src="https://open.spotify.com/embed/playlist/4ynAF5u8eruVcNJGGEA7R5?utm_source=generator&theme=0"
                      width="100%" height="152" frameBorder={0}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      style={{ display: "block", borderRadius: 2 }}
                    />
                  </div>
                )}

                {panel === "sports" && (
                  <div style={{ paddingTop: 64, paddingBottom: 64, maxWidth: 680 }}>
                    <p style={{ fontSize: 17, fontStyle: "italic", lineHeight: 1.8, color: t.muted, marginBottom: 28 }}>
                      Outside of work, I try to stay busy. There&apos;s always something on the go.
                    </p>
                    {SIDEQUESTS.map(s => (
                      <div key={s.label} className="exp-row">
                        <div style={{ ...mono, paddingTop: 3 }}>{s.label}</div>
                        <div style={{ fontSize: 17, lineHeight: 1.75, color: t.ink }}>{s.text}</div>
                      </div>
                    ))}
                  </div>
                )}

                {panel === "adventure" && (
                  <div style={{ paddingTop: 64, paddingBottom: 64 }}>
                    <PlacesSection darkMode={dm} />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── HISTORY ── */}
      <div style={{ borderBottom: `0.5px solid ${t.rule}` }}>
        <div className="w" style={{ padding: `56px ${px}` }}>
          <div style={{ maxWidth: 720 }}>

            <p style={{ ...mono, marginBottom: 32 }}>Experience</p>

            {EXPERIENCE.map((e, i) => (
              <div key={i} className="exp-row">
                <div style={{ ...mono, paddingTop: 4 }}>{e.date}</div>
                <div>
                  <div style={{
                    fontSize: 18, fontWeight: 500, marginBottom: 6, color: t.ink,
                    display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0 10px",
                  }}>
                    <span>{e.role}</span>
                    <span style={{ color: t.muted, fontWeight: 400, fontSize: 16 }}>—</span>
                    <a href={e.href} target="_blank" rel="noreferrer" className="co-link" style={{ fontSize: 17, fontWeight: 400 }}>
                      {e.co} ↗
                    </a>
                  </div>
                  <div style={{ fontSize: 15.5, fontStyle: "italic", lineHeight: 1.75, color: t.muted }}>
                    {e.desc}
                  </div>
                </div>
              </div>
            ))}

            <div className="exp-row" style={{ borderBottom: `0.5px solid ${t.rule}` }}>
              <div style={{ ...mono, paddingTop: 4 }}>{EDUCATION.date}</div>
              <div>
                <div style={{
                  fontSize: 18, fontWeight: 500, marginBottom: 6, color: t.ink,
                  display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0 10px",
                }}>
                  <span>{EDUCATION.degree}</span>
                  <span style={{ color: t.muted, fontWeight: 400, fontSize: 16 }}>—</span>
                  <a href={EDUCATION.href} target="_blank" rel="noreferrer" className="co-link" style={{ fontSize: 17, fontWeight: 400 }}>
                    {EDUCATION.school} ↗
                  </a>
                </div>
                <div style={{ fontSize: 15.5, fontStyle: "italic", color: t.muted }}>
                  {EDUCATION.location} · Go Dawgs 🐾
                </div>
              </div>
            </div>

            <p style={{ ...mono, marginTop: 48, marginBottom: 18 }}>Stack</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {STACK.map(s => (
                <span key={s} style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 10,
                  textTransform: "uppercase", letterSpacing: "0.06em",
                  padding: "5px 12px", background: t.pill, color: t.ink, borderRadius: 2,
                }}>
                  {s}
                </span>
              ))}
            </div>

            <p style={{ ...mono, marginTop: 48, marginBottom: 4 }}>Projects</p>
            {PROJECTS.map(p => (
              <div key={p.name} style={{ padding: "24px 0", borderTop: `0.5px solid ${t.rule}` }}>
                <div style={{
                  fontSize: 18, fontWeight: 500, marginBottom: 6, color: t.ink,
                  display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0 10px",
                }}>
                  <span>{p.name}</span>
                  <span style={{ color: t.muted, fontWeight: 400, fontSize: 16 }}>—</span>
                  <a href={p.href} target="_blank" rel="noreferrer" className="co-link" style={{ fontSize: 17, fontWeight: 400 }}>
                    {p.link}
                  </a>
                </div>
                <p style={{ fontSize: 15.5, fontStyle: "italic", lineHeight: 1.75, color: t.muted, marginBottom: 12 }}>
                  {p.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: "'DM Mono', monospace", fontSize: 9.5,
                      textTransform: "uppercase", letterSpacing: "0.06em",
                      padding: "3px 9px", background: t.pill, color: t.muted, borderRadius: 2,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
<div style={{ borderBottom: `0.5px solid ${t.rule}` }}>
  <div className="w" style={{ padding: `52px ${px}` }}>
    <p style={{ fontSize: 17, fontStyle: "italic", color: t.muted, marginBottom: 22, lineHeight: 1.7 }}>
      I&apos;m always happy to connect — about work, projects, tennis, travel, or literally anything else.
    </p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 22 }}>
      <a href="mailto:michaelchendevs@gmail.com" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11.5, color: "#1855a3", textDecoration: "underline", textUnderlineOffset: 4 }}>
        michaelchendevs@gmail.com
      </a>
      <a href="https://linkedin.com/in/michael-chen880/" target="_blank" rel="noreferrer" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11.5, color: "#1855a3", textDecoration: "underline", textUnderlineOffset: 4 }}>
        LinkedIn ↗
      </a>
      <a href="/MichaelChenResume.pdf" style={{ fontFamily: "'DM Mono', monospace", fontSize: 11.5, color: "#1855a3", textDecoration: "underline", textUnderlineOffset: 4 }}>
        Resume ↗
      </a>
    </div>
  </div>
</div>

      {/* ── FOOTER ── */}
      <div className="w" style={{
        display: "flex", flexWrap: "wrap", justifyContent: "space-between",
        alignItems: "center", gap: 8, padding: `18px ${px}`,
      }}>
        <p style={{ ...mono }}>© {new Date().getFullYear()} Michael Chen</p>
      </div>
    </main>
  );
}