"use client";

/**
 * VARIANT D — MEMPHIS '80s
 * Loud primary colors, hard drop-shadows, geometric shapes, bold type.
 * Same A/B flip mechanic, same exact copy from original page.tsx.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Mail, Linkedin, Play, Pause, Trophy, Music, Film, Mountain, Plane, Camera } from "lucide-react";
import RecentTracks from "@/components/RecentTracks";
import PlacesSection from "@/components/PlacesSection";

type Side = "A" | "B";

const PROJECTS = [
  {
    id: "barkada", num: "01", name: "Barkada Hospitality", year: "2026", status: "LIVE",
    type: "FULLSTACK", stack: ["Next.js", "Firebase", "Tailwind"],
    desc: "A full-stack reservation and payment platform designed for an Atlanta based sushi omakase experience. Built with Next.js, Tailwind CSS, and Firebase.",
    images: ["/images/barkad1.png", "/images/barkada2.png", "/images/barkada3.png"],
    link: "https://barkadahospitality.info",
    accent: "#ff3e5c",
  },
  {
    id: "atl-bootwatch", num: "02", name: "ATL BootWatch", year: "2026", status: "LIVE",
    type: "FULLSTACK", stack: ["Next.js", "Supabase", "Tailwind", "Google Maps API"],
    desc: "A community-driven platform for Atlanta that tracks parking booting activity, highlights where it's happening, and collects real user experiences to bring transparency to an issue many locals deal with.",
    images: ["/images/boot1.png", "/images/boot2.png", "/images/boot3.png"],
    link: "https://www.atlboot.watch/",
    accent: "#2ec4b6",
  },
  {
    id: "billr", num: "03", name: "Billr", year: "2026", status: "LIVE",
    type: "FULLSTACK", stack: ["Swift", "SwiftUI", "Supabase", "RevenueCat"],
    desc: "A clean, intuitive invoicing app built for freelancers and small businesses. Log hourly work, flat fees, and expenses, generate professional PDF invoices with your logo, and track what you're owed, all from your iPhone.",
    images: ["/images/billr1.png"],
    link: "https://apps.apple.com/us/app/billr-invoice-tracker/id6761347420",
    accent: "#ffe66d",
  },
  {
    id: "signature", num: "04", name: "Signature Studio", year: "2025", status: "LIVE",
    type: "TOOL", stack: ["Next.js", "opentype.js"],
    desc: "An interactive web app for designing custom signatures with realistic, practice-ready styles. Offers handwriting-based fonts, structural variations, and live previews.",
    images: ["/images/sig1.png", "/images/sig2.png", "/images/sig3.png"],
    link: "https://signature-studio-nine.vercel.app/",
    accent: "#ff3e5c",
  },
];

const HOBBIES = [
  { num: "01", title: "Tennis", desc: "Weekend leagues, long rallies, and good company.", icon: Trophy, color: "#ff3e5c" },
  { num: "02", title: "Music", desc: "Concerts, guitars, and discovering new artists on repeat.", icon: Music, color: "#2ec4b6" },
  { num: "03", title: "Movies", desc: "Keeping a running list of films to watch (my letterboxd is suffering)", icon: Film, color: "#ffe66d" },
  { num: "04", title: "Outdoors", desc: "Hikes, green spaces, and good coffee outside.", icon: Mountain, color: "#ff3e5c" },
  { num: "05", title: "Travel", desc: "Collecting moments, not magnets. Always down for a new city or country.", icon: Plane, color: "#2ec4b6" },
  { num: "06", title: "Capturing", desc: "Snapping little vignettes of life & friends.", icon: Camera, color: "#ffe66d" },
];

const STACK = [".NET / C#", "SQL", "AWS", "Java", "REST APIs", "HTML/CSS/JS", "React", "Next.js", "Tailwind", "Vue.js", "Azure", "Firebase", "Git", "JUnit"];

const NOW = [
  { label: "Building", text: "Established SaaS applications at work and fun projects at home", color: "#ff3e5c" },
  { label: "Learning", text: "Exploring deeper systems topics and performance tuning", color: "#2ec4b6" },
  { label: "Life", text: "Weekly tennis, shows when good bands roll through, and mini trips out of ATL", color: "#ffe66d" },
];

// Memphis palette
const M = {
  bg: "#f5f0e8",
  ink: "#0a0a0f",
  red: "#ff3e5c",
  teal: "#2ec4b6",
  yellow: "#ffe66d",
  white: "#f5f0e8",
};

export default function HomePage() {
  const [side, setSide] = useState<Side>("A");
  const [playing, setPlaying] = useState(true);
  const [flipping, setFlipping] = useState(false);
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [openHobby, setOpenHobby] = useState<string | null>(null);
  const [previewIdx, setPreviewIdx] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const proj = PROJECTS.find(p => p.id === openProject);
    if (!proj || proj.images.length < 2) return;
    setPreviewIdx(0);
    const iv = setInterval(() => setPreviewIdx(i => (i + 1) % proj.images.length), 2800);
    return () => clearInterval(iv);
  }, [openProject]);

  const flip = () => {
    if (flipping) return;
    setFlipping(true);
    setOpenProject(null);
    setOpenHobby(null);
    setTimeout(() => setSide(s => s === "A" ? "B" : "A"), 350);
    setTimeout(() => setFlipping(false), 700);
  };

  const cardStyle = (accent: string, rotate = 0): React.CSSProperties => ({
    background: M.white,
    border: `3px solid ${M.ink}`,
    boxShadow: `5px 5px 0 ${accent}`,
    padding: "20px 24px",
    transform: `rotate(${rotate}deg)`,
    transition: "box-shadow .15s, transform .15s",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700;900&display=swap');
        html,body{margin:0;background:#f5f0e8!important;color:#0a0a0f;font-family:'Space Grotesk',sans-serif;scroll-behavior:smooth;}
        ::selection{background:#ff3e5c;color:#f5f0e8;}

        /* floating shapes */
        .shape-circle{position:absolute;border-radius:50%;pointer-events:none;}
        .shape-square{position:absolute;pointer-events:none;}
        .shape-tri{position:absolute;pointer-events:none;width:0;height:0;}

        /* cassette */
        .cassette-d{transition:transform .35s ease-in-out;transform-style:preserve-3d;}
        .cassette-d.flip{transform:rotateY(90deg);}
        .reel-cw{animation:rcw 5s linear infinite;transform-origin:center;}
        .reel-ccw{animation:rccw 5s linear infinite;transform-origin:center;}
        .paused{animation-play-state:paused!important;}
        @keyframes rcw{to{transform:rotate(360deg)}}
        @keyframes rccw{to{transform:rotate(-360deg)}}

        /* buttons */
        .btn-m{background:#ffe66d;border:3px solid #0a0a0f;padding:9px 18px;font-family:'Space Grotesk',sans-serif;font-weight:900;text-transform:uppercase;letter-spacing:.08em;font-size:12px;color:#0a0a0f;cursor:pointer;box-shadow:4px 4px 0 #0a0a0f;display:inline-flex;align-items:center;gap:6px;text-decoration:none;transition:all .12s;}
        .btn-m:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 #0a0a0f;}
        .btn-m:active{transform:translate(2px,2px);box-shadow:2px 2px 0 #0a0a0f;}
        .btn-m.red{background:#ff3e5c;color:#f5f0e8;}
        .btn-m.teal{background:#2ec4b6;color:#0a0a0f;}

        /* tracks */
        .track-m:hover{background:rgba(255,62,92,.06);}
        .track-m.open{background:rgba(255,62,92,.1);}

        /* places transparent */
        .places-wrap *{background-color:transparent!important;}
        .places-wrap img,.places-wrap [style*="background-image"]{background-color:initial!important;}
      `}</style>

      <main style={{ minHeight: "100vh", paddingBottom: "5rem", position: "relative", overflow: "hidden" }}>

        {/* Background shapes */}
        <div className="shape-circle" style={{ width:80, height:80, background:M.red, top:30, right:"8%", opacity:.15 }} />
        <div className="shape-circle" style={{ width:40, height:40, background:M.teal, top:180, left:"5%", opacity:.2 }} />
        <div className="shape-square" style={{ width:30, height:30, background:M.yellow, bottom:200, right:"12%", opacity:.25, transform:"rotate(20deg)" }} />
        <div className="shape-circle" style={{ width:60, height:60, background:M.teal, bottom:400, left:"3%", opacity:.12 }} />

        {/* ── HERO ── */}
        <section style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem 2rem", textAlign: "center", position: "relative" }}>
          {/* Big side label */}
          <div style={{ position:"absolute", top:16, right:"6%", fontSize:11, fontWeight:900, letterSpacing:".15em", padding:"4px 14px", background: side==="A"?M.red:M.teal, color: side==="A"?"#f5f0e8":M.ink, border:`2px solid ${M.ink}`, boxShadow:`3px 3px 0 ${M.ink}`, transform:"rotate(4deg)" }}>
            SIDE {side}
          </div>

          <h1 style={{ fontSize:"clamp(2.6rem,7vw,5.5rem)", fontWeight:900, lineHeight:.9, marginBottom:10, letterSpacing:"-.03em" }}>
            Hi, I'm <span style={{ color:M.red }}>Michael</span>.
          </h1>
          <p style={{ fontSize:14, color:"rgba(10,10,15,.6)", marginBottom:36, maxWidth:480, margin:"0 auto 36px" }}>
            I design & build clean, thoughtful software. When I'm not developing, you'll find me on a tennis court, at a concert, or planning my next outdoor escape.
          </p>

          {/* Cassette */}
          <div
            className={`cassette-d${flipping?" flip":""}`}
            style={{ maxWidth:540, margin:"0 auto", padding:"22px 18px 16px", background:M.red, border:`3px solid ${M.ink}`, boxShadow:`6px 6px 0 ${M.teal}`, position:"relative" }}
          >
            {/* label */}
            <div style={{ background:M.yellow, border:`2px solid ${M.ink}`, padding:"10px 14px 12px", marginBottom:16, textAlign:"left", position:"relative" }}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:".2em", color:M.ink, marginBottom:2 }}>MICHAEL CHEN</div>
              <div style={{ fontSize:18, fontWeight:900, color:M.ink, letterSpacing:"-.01em" }}>{side==="A"?"Side A — Work":"Side B — Life"}</div>
              <div style={{ fontSize:10, color:M.ink, opacity:.6, marginTop:2 }}>
                {side==="A"?"the projects I've been building":"everything else I care about"}
              </div>
              <div style={{ position:"absolute", top:8, right:10, fontSize:40, fontWeight:900, color:M.ink, lineHeight:1, opacity:.9 }}>{side}</div>
            </div>

            {/* reels */}
            <div style={{ background:M.ink, padding:"14px 0", border:`2px solid ${M.ink}` }}>
              <div style={{ display:"flex", justifyContent:"space-around", alignItems:"center", padding:"0 24px" }}>
                <ReelD dir="cw" playing={playing} color={M.yellow} />
                <div style={{ flex:1, maxWidth:120, height:8, margin:"0 10px", background:M.yellow, border:`1px solid ${M.ink}` }}>
                  <div style={{ height:"100%", background:"repeating-linear-gradient(90deg,#d4a574 0 4px,#8b6f1a 4px 5px)", opacity:.8 }} />
                </div>
                <ReelD dir="ccw" playing={playing} color={M.teal} />
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", padding:"6px 36px 0", gap:3 }}>
                {Array.from({length:8}).map((_,i) => <div key={i} style={{ width:4, height:5, background:M.yellow, opacity:.6 }} />)}
              </div>
            </div>
          </div>

          <div style={{ display:"flex", justifyContent:"center", gap:10, marginTop:18, flexWrap:"wrap" }}>
            <button className="btn-m" onClick={() => setPlaying(p => !p)}>
              {playing ? "⏸" : "▶"} {playing ? "Pause" : "Play"}
            </button>
            <button className="btn-m red" onClick={flip}>⇄ FLIP TO SIDE {side==="A"?"B":"A"}</button>
            <a href="#content" className="btn-m teal">SCROLL DOWN ↓</a>
          </div>
        </section>

        <div id="content" style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>

          {/* About — always first */}
          <div style={cardStyle(M.yellow, .3)}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", color:M.red, marginBottom:3 }}>ABOUT</div>
            <h2 style={{ fontSize:26, fontWeight:900, marginBottom:12 }}>Who I am</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:18, fontSize:14, lineHeight:1.75 }}>
              <div>
                <p style={{ marginBottom:14 }}>
                  I graduated from the University of Georgia in 2024 with a degree in Computer Science, and now work as a software engineer in Atlanta. I'm passionate about building software that's reliable, intuitive, and works exactly as it should.
                </p>
                <p>Based in Atlanta — always open to new people and new experiences.</p>
              </div>
              <div style={{ background:M.ink, border:`2px solid ${M.ink}`, padding:"14px 16px", boxShadow:`4px 4px 0 ${M.teal}` }}>
                <div style={{ fontSize:10, fontWeight:700, color:M.yellow, letterSpacing:".15em", marginBottom:8 }}>MY STACK</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                  {STACK.map((s,i) => {
                    const colors=[M.red,M.teal,M.yellow];
                    const c=colors[i%3];
                    return <span key={s} style={{ fontSize:10, fontWeight:700, padding:"2px 7px", background:c, color:c===M.yellow?M.ink:"#f5f0e8" }}>{s}</span>;
                  })}
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={side} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-14 }} transition={{ duration:.28 }} style={{ display:"flex", flexDirection:"column", gap:"1.75rem" }}>

              {/* ── SIDE A ── */}
              {side === "A" && <>

                {/* Projects */}
                <div style={cardStyle(M.teal, -.3)}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", color:M.teal, marginBottom:3 }}>SIDE A</div>
                  <h2 style={{ fontSize:26, fontWeight:900, marginBottom:14 }}>What I've been building</h2>
                  {PROJECTS.map(p => {
                    const open = openProject === p.id;
                    return (
                      <div key={p.id} style={{ borderBottom:`2px solid ${M.ink}` }}>
                        <button
                          onClick={() => { setOpenProject(open ? null : p.id); setPreviewIdx(0); }}
                          className={`track-m${open?" open":""}`}
                          style={{ width:"100%", textAlign:"left", padding:"12px 6px", display:"flex", alignItems:"center", gap:12, background:"transparent", border:"none", cursor:"pointer", fontFamily:"inherit", color:"inherit" }}
                        >
                          <span style={{ fontSize:12, color:p.accent, fontWeight:900, width:22 }}>{p.num}</span>
                          <span style={{ flex:1, minWidth:0 }}>
                            <span style={{ fontSize:15, fontWeight:700, display:"block" }}>{p.name}</span>
                            <span style={{ fontSize:10, color:"rgba(10,10,15,.5)", fontWeight:700 }}>{p.type} · {p.year}</span>
                          </span>
                          <span style={{ fontSize:10, fontWeight:900, padding:"2px 8px", background:p.accent, color: p.accent===M.yellow?M.ink:"#f5f0e8", border:`1.5px solid ${M.ink}` }}>LIVE</span>
                          <span style={{ fontSize:13, width:14, textAlign:"right" }}>{open?"−":"+"}</span>
                        </button>
                        <AnimatePresence>
                          {open && (
                            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:.28 }} style={{ overflow:"hidden" }}>
                              <div style={{ padding:"0 0 20px" }}>
                                {/* Full-width image */}
                                <div style={{ position:"relative", width:"100%", aspectRatio:"16/9", overflow:"hidden", border:`3px solid ${M.ink}`, boxShadow:`5px 5px 0 ${p.accent}`, marginBottom:0 }}>
                                  <AnimatePresence mode="wait">
                                    <motion.img
                                      key={previewIdx}
                                      src={p.images[previewIdx]}
                                      alt={p.name}
                                      initial={{ opacity:0, scale:1.03 }}
                                      animate={{ opacity:1, scale:1 }}
                                      exit={{ opacity:0 }}
                                      transition={{ duration:.4 }}
                                      style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0, display:"block" }}
                                    />
                                  </AnimatePresence>
                                  {/* Image dots */}
                                  {p.images.length > 1 && (
                                    <div style={{ position:"absolute", bottom:10, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6, zIndex:10 }}>
                                      {p.images.map((_,idx) => (
                                        <button key={idx} onClick={(e) => { e.stopPropagation(); setPreviewIdx(idx); }}
                                          style={{ width:idx===previewIdx?22:8, height:8, borderRadius:4, border:"none", cursor:"pointer", background:idx===previewIdx?"#ffe66d":"rgba(255,255,255,0.6)", transition:"all .2s" }}
                                        />
                                      ))}
                                    </div>
                                  )}
                                </div>
                                {/* Info strip below image */}
                                <div style={{ background:p.accent, border:`3px solid ${M.ink}`, borderTop:"none", padding:"12px 14px", display:"flex", flexWrap:"wrap", alignItems:"center", gap:12, justifyContent:"space-between" }}>
                                  <p style={{ fontSize:13, lineHeight:1.6, margin:0, flex:"1 1 200px", color: p.accent===M.yellow?M.ink:"#f5f0e8", fontWeight:500 }}>{p.desc}</p>
                                  <div style={{ display:"flex", flexDirection:"column", gap:8, flexShrink:0 }}>
                                    <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                                      {p.stack.map(s => <span key={s} style={{ fontSize:10, fontWeight:700, padding:"2px 7px", background:M.ink, color:M.yellow }}>{s}</span>)}
                                    </div>
                                    <a href={p.link} target="_blank" rel="noreferrer" className="btn-m" style={{ fontSize:11, background:M.ink, color:M.yellow, border:`2px solid ${M.yellow}`, boxShadow:`2px 2px 0 ${M.yellow}`, alignSelf:"flex-start" }}>
                                      View Live <ExternalLink size={12} />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Stack */}
                <div style={cardStyle(M.red, .4)}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", color:M.red, marginBottom:3 }}>TOOLS</div>
                  <h2 style={{ fontSize:26, fontWeight:900, marginBottom:12 }}>My stack</h2>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {STACK.map((s, i) => {
                      const colors = [M.red, M.teal, M.yellow];
                      const c = colors[i % 3];
                      return (
                        <span key={s} style={{ fontSize:11, fontWeight:700, padding:"3px 9px", background:c, color: c===M.yellow?M.ink:"#f5f0e8", border:`2px solid ${M.ink}`, boxShadow:`2px 2px 0 ${M.ink}` }}>{s}</span>
                      );
                    })}
                  </div>
                </div>

                {/* Now */}
                <div style={cardStyle(M.yellow)}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", color:M.teal, marginBottom:3 }}>NOW</div>
                  <h2 style={{ fontSize:26, fontWeight:900, marginBottom:14 }}>What I'm up to</h2>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12 }}>
                    {NOW.map(n => (
                      <div key={n.label} style={{ background:n.color, border:`2px solid ${M.ink}`, padding:"12px 14px", boxShadow:`3px 3px 0 ${M.ink}` }}>
                        <div style={{ fontSize:9, fontWeight:900, letterSpacing:".15em", color: n.color===M.yellow?M.ink:"#f5f0e8", marginBottom:5, textTransform:"uppercase" }}>▸ {n.label}</div>
                        <div style={{ fontSize:13, lineHeight:1.55, color: n.color===M.yellow?M.ink:"#f5f0e8", fontWeight:700 }}>{n.text}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tracks */}
                <div style={cardStyle(M.teal, -.2)}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", color:M.teal, marginBottom:3 }}>ON REPEAT</div>
                  <h2 style={{ fontSize:26, fontWeight:900, marginBottom:12 }}>Tracks I've been enjoying</h2>
                  <RecentTracks />
                </div>
              </>}

              {/* ── SIDE B ── */}
              {side === "B" && <>

                {/* Hobbies */}
                <div style={cardStyle(M.teal, .2)}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", color:M.teal, marginBottom:3 }}>SIDE B</div>
                  <h2 style={{ fontSize:26, fontWeight:900, marginBottom:14 }}>Things I'm into</h2>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:10 }}>
                    {HOBBIES.map(h => (
                      <div key={h.num} style={{ background:h.color, border:`2px solid ${M.ink}`, padding:"14px", boxShadow:`3px 3px 0 ${M.ink}` }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                          <span style={{ fontSize:10, fontWeight:900, color: h.color===M.yellow?M.ink:"#f5f0e8", opacity:.7 }}>{h.num}</span>
                          <h.icon size={16} color={ h.color===M.yellow?M.ink:"#f5f0e8"} />
                          <span style={{ fontSize:14, fontWeight:900, color: h.color===M.yellow?M.ink:"#f5f0e8" }}>{h.title}</span>
                        </div>
                        <p style={{ fontSize:12, lineHeight:1.55, color: h.color===M.yellow?"rgba(10,10,15,.75)":"rgba(245,240,232,.85)" }}>{h.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Music */}
                <div style={cardStyle(M.red, -.3)}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", color:M.red, marginBottom:3 }}>LISTENING</div>
                  <h2 style={{ fontSize:26, fontWeight:900, marginBottom:12 }}>Tracks I've been enjoying</h2>
                  <RecentTracks />
                </div>
              </>}

            </motion.div>
          </AnimatePresence>

          {/* Places */}
          <div style={cardStyle(M.teal, -.2)}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", color:M.teal, marginBottom:3 }}>PLACES</div>
            <h2 style={{ fontSize:26, fontWeight:900, marginBottom:14 }}>Places I've explored</h2>
            <div className="places-wrap">
              <PlacesSection darkMode={false} />
            </div>
          </div>

          {/* Contact */}
          <div style={{ ...cardStyle(M.red), textAlign:"center", transform:"rotate(.4deg)" }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:".2em", color:M.red, marginBottom:3 }}>CONTACT</div>
            <h2 style={{ fontSize:26, fontWeight:900, marginBottom:8 }}>Let's connect.</h2>
            <p style={{ fontSize:13, color:"rgba(10,10,15,.6)", marginBottom:18 }}>Always down to chat — drop me a line.</p>
            <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:10 }}>
              <a href="mailto:michaelchendevs@gmail.com" className="btn-m"><Mail size={14} /> Email Me</a>
              <a href="https://www.linkedin.com/in/michael-chen880/" target="_blank" rel="noreferrer" className="btn-m teal"><Linkedin size={14} /> LinkedIn</a>
              <a href="/MichaelChenResume.pdf" target="_blank" rel="noreferrer" className="btn-m">📄 Resume ↗</a>
            </div>
          </div>

          <div style={{ textAlign:"center", fontSize:11, fontWeight:700, letterSpacing:".2em", color:"rgba(10,10,15,.4)", marginTop:8 }}>
            © {new Date().getFullYear()} · MICHAEL CHEN
          </div>
        </div>
      </main>
    </>
  );
}

function ReelD({ dir, playing, color }: { dir:"cw"|"ccw"; playing: boolean; color: string }) {
  return (
    <div style={{ width:62, height:62, borderRadius:"50%", background:"#1a1a24", border:`3px solid ${color}`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 0 2px #0a0a0f` }}>
      <svg width="50" height="50" viewBox="0 0 50 50" className={`${dir==="cw"?"reel-cw":"reel-ccw"}${!playing?" paused":""}`}>
        <circle cx="25" cy="25" r="22" fill="#0a0a0f" stroke={color} strokeWidth="1.5" />
        {[0,60,120,180,240,300].map(a => (
          <g key={a} transform={`rotate(${a} 25 25)`}>
            <rect x="23.5" y="4" width="3" height="10" fill={color} />
          </g>
        ))}
        <circle cx="25" cy="25" r="8" fill={color} stroke="#0a0a0f" strokeWidth="1.5" />
        <circle cx="25" cy="25" r="3" fill="#0a0a0f" />
      </svg>
    </div>
  );
}