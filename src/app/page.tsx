"use client";

/**
 * CONCEPT 6 — EDITORIAL NEWSPAPER / BROADSHEET
 * Cream newsprint, serif type, column grid, crimson accent.
 * Mobile-responsive.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Mail, Linkedin, Trophy, Music, Film, Mountain, Plane, Camera } from "lucide-react";
import RecentTracks from "@/components/RecentTracks";
import PlacesSection from "@/components/PlacesSection";

type Side = "A" | "B";

const N = { paper:"#f9f6f0", ink:"#1a1a1a", red:"#c41230", muted:"rgba(26,26,26,.5)", rule:"#ccc8bc", sans:"Helvetica,Arial,sans-serif" };

const PROJECTS = [
  { id:"barkada", num:"01", name:"Barkada Hospitality", year:"2026", type:"FULLSTACK", stack:["Next.js","Firebase","Tailwind"], desc:"A full-stack reservation and payment platform designed for an Atlanta based sushi omakase experience. Built with Next.js, Tailwind CSS, and Firebase.", images:["/images/barkad1.png","/images/barkada2.png","/images/barkada3.png"], link:"https://barkadahospitality.info" },
  { id:"atl-bootwatch", num:"02", name:"ATL BootWatch", year:"2026", type:"FULLSTACK", stack:["Next.js","Supabase","Tailwind","Google Maps API"], desc:"A community-driven platform for Atlanta that tracks parking booting activity, highlights where it's happening, and collects real user experiences to bring transparency to an issue many locals deal with.", images:["/images/boot1.png","/images/boot2.png","/images/boot3.png"], link:"https://www.atlboot.watch/" },
  { id:"billr", num:"03", name:"Billr", year:"2026", type:"FULLSTACK", stack:["Swift","SwiftUI","Supabase","RevenueCat"], desc:"A clean, intuitive invoicing app built for freelancers and small businesses. Log hourly work, flat fees, and expenses, generate professional PDF invoices with your logo, and track what you're owed, all from your iPhone.", images:["/images/billr1.png"], link:"https://apps.apple.com/us/app/billr-invoice-tracker/id6761347420" },
  { id:"signature", num:"04", name:"Signature Studio", year:"2025", type:"TOOL", stack:["Next.js","opentype.js"], desc:"An interactive web app for designing custom signatures with realistic, practice-ready styles. Offers handwriting-based fonts, structural variations, and live previews.", images:["/images/sig1.png","/images/sig2.png","/images/sig3.png"], link:"https://signature-studio-nine.vercel.app/" },
];

const HOBBIES = [
  { num:"01", title:"Tennis", desc:"Weekend leagues, long rallies, and good company.", icon:Trophy },
  { num:"02", title:"Music", desc:"Concerts, guitars, and discovering new artists on repeat.", icon:Music },
  { num:"03", title:"Movies", desc:"Keeping a running list of films to watch (my letterboxd is suffering)", icon:Film },
  { num:"04", title:"Outdoors", desc:"Hikes, green spaces, and good coffee outside.", icon:Mountain },
  { num:"05", title:"Travel", desc:"Collecting moments, not magnets. Always down for a new city or country.", icon:Plane },
  { num:"06", title:"Capturing", desc:"Snapping little vignettes of life & friends.", icon:Camera },
];

const STACK = [".NET / C#","SQL","AWS","Java","REST APIs","HTML/CSS/JS","React","Next.js","Tailwind","Vue.js","Azure","Firebase","Git","JUnit"];
const NOW = [
  { label:"Building", text:"Established SaaS applications at work and fun projects at home" },
  { label:"Learning", text:"Exploring deeper systems topics and performance tuning" },
  { label:"Life", text:"Weekly tennis, shows when good bands roll through, and mini trips out of ATL" },
];

export default function HomePage() {
  const [side, setSide] = useState<Side>("A");
  const [playing, setPlaying] = useState(true);
  const [flipping, setFlipping] = useState(false);
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [previewIdx, setPreviewIdx] = useState(0);

  useEffect(() => {
    const proj = PROJECTS.find(p => p.id === openProject);
    if (!proj || proj.images.length < 2) return;
    setPreviewIdx(0);
    const iv = setInterval(() => setPreviewIdx(i => (i+1) % proj.images.length), 2800);
    return () => clearInterval(iv);
  }, [openProject]);

  const flip = () => {
    if (flipping) return;
    setFlipping(true);
    setOpenProject(null);
    setTimeout(() => setSide(s => s==="A"?"B":"A"), 400);
    setTimeout(() => setFlipping(false), 800);
  };

  const Kicker = ({ children }: { children:React.ReactNode }) => (
    <div style={{ fontFamily:N.sans, fontSize:9, fontWeight:700, letterSpacing:".3em", textTransform:"uppercase", color:N.red, marginBottom:6 }}>{children}</div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Serif+4:wght@400;600&display=swap');
        html,body{margin:0;background:#f9f6f0!important;color:#1a1a1a;font-family:Georgia,serif;scroll-behavior:smooth;}
        ::selection{background:#c41230;color:#f9f6f0;}
        .cassette-n{transition:transform .4s ease-in-out;}
        .cassette-n.flip{transform:rotateY(90deg);}
        .reel-cw{animation:rcw 8s linear infinite;transform-origin:center;}
        .reel-ccw{animation:rccw 8s linear infinite;transform-origin:center;}
        .paused{animation-play-state:paused!important;}
        @keyframes rcw{to{transform:rotate(360deg)}}
        @keyframes rccw{to{transform:rotate(-360deg)}}
        .btn-n{background:#1a1a1a;border:none;padding:9px 18px;font-family:Helvetica,Arial,sans-serif;font-weight:700;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#f9f6f0;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:6px;text-decoration:none;transition:opacity .15s;}
        .btn-n:hover{opacity:.8;}
        .btn-n.red{background:#c41230;}
        .btn-n.out{background:transparent;color:#1a1a1a;border:1px solid #1a1a1a;}
        .track-n{border-bottom:1px solid #ddd8cc;transition:background .15s;}
        .track-n:hover{background:rgba(196,18,48,.04);}
        .track-n.open{background:rgba(196,18,48,.06);}
        .places-wrap *{background-color:transparent!important;}
        .places-wrap img,.places-wrap [style*="background-image"]{background-color:initial!important;}
        .places-section-mobile .places-nav-btn{background-color:#1a1a1a!important;color:#ffffff!important;border:2px solid #1a1a1a!important;}
        .places-wrap .places-arrow-btn{background-color:#1a1a1a!important;border-color:#1a1a1a!important;}
        .drop-cap::first-letter{font-family:'Playfair Display',Georgia,serif;font-size:3.2em;font-weight:900;float:left;line-height:.75;margin-right:5px;margin-top:4px;color:#1a1a1a;}

        /* ── Mobile ── */
        @media(max-width:768px){
          .hero-cols{grid-template-columns:1fr!important;}
          .hero-vr{display:none!important;}
          .hero-right{padding-left:0!important;padding-top:1.5rem;border-top:1px solid #ccc8bc;}
          .about-cols{grid-template-columns:1fr!important;}
          .about-vr{display:none!important;}
          .about-right{padding-left:0!important;padding-top:1.5rem;border-top:1px solid #ccc8bc;}
          .now-cols{grid-template-columns:1fr!important;}
          .now-cell{border-right:none!important;border-bottom:1px solid #ccc8bc;padding-bottom:12px;margin-bottom:4px;}
          .hobby-cols{column-count:1!important;}
          .contact-cols{grid-template-columns:1fr!important;gap:16px!important;}
        }
      `}</style>

      <main style={{ minHeight:"100vh", paddingBottom:"4rem", background:N.paper }}>

        {/* NAMEPLATE */}
        <header>
          <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 1.25rem" }}>
            <div style={{ borderTop:`4px solid ${N.ink}`, borderBottom:`1px solid ${N.red}`, height:6, marginBottom:4 }} />
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", paddingBottom:8, borderBottom:`3px double ${N.ink}`, flexWrap:"wrap", gap:8 }}>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(1.6rem,6vw,3.5rem)", fontWeight:900, lineHeight:1 }}>
                The Michael Chen
              </div>
              <div style={{ textAlign:"right", fontFamily:N.sans }}>
                <div style={{ fontSize:9, letterSpacing:".2em", color:N.muted, textTransform:"uppercase" }}>VOL. I · ISSUE 2026</div>
                <div style={{ fontSize:9, letterSpacing:".12em", color:N.red, fontWeight:700, textTransform:"uppercase", marginTop:2 }}>Now Playing: Side {side}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:16, padding:"5px 0", fontSize:10, fontFamily:N.sans, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:N.muted, borderBottom:`1px solid ${N.rule}`, overflowX:"auto" }}>
              {["Who I Am","Projects","Stack","Now","Hobbies","Places","Contact"].map(l => <span key={l} style={{ whiteSpace:"nowrap" }}>{l}</span>)}
            </div>
          </div>
        </header>

        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 1.25rem" }}>

          {/* HERO */}
          <div className="hero-cols" style={{ display:"grid", gridTemplateColumns:"2fr 1px 1.2fr", gap:0, paddingTop:18, paddingBottom:18, borderBottom:`2px solid ${N.ink}` }}>
            <div style={{ paddingRight:24 }}>
              <Kicker>Software Engineer · Atlanta, GA</Kicker>
              <h1 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(2rem,6vw,3.5rem)", fontWeight:900, lineHeight:.92, letterSpacing:"-.02em", marginBottom:14 }}>
                I design & build<br/><span style={{ color:N.red }}>clean, thoughtful</span><br/>software.
              </h1>
              <p className="drop-cap" style={{ fontSize:"clamp(13px,3.5vw,14px)", lineHeight:1.8, color:N.muted, marginBottom:10, fontFamily:"'Source Serif 4',Georgia,serif" }}>
                I graduated from the University of Georgia in 2024 with a degree in Computer Science, and now work as a software engineer in Atlanta. I'm passionate about building software that's reliable, intuitive, and works exactly as it should.
              </p>
              <p style={{ fontSize:13, lineHeight:1.7, color:N.muted, fontFamily:"'Source Serif 4',Georgia,serif" }}>
                When I'm not developing, you'll find me on a tennis court, at a concert, or planning my next outdoor escape. Based in Atlanta — always open to new people and new experiences.
              </p>
            </div>

            <div className="hero-vr" style={{ background:N.rule }} />

            <div className="hero-right" style={{ paddingLeft:24 }}>
              <Kicker>Now Playing</Kicker>
              <div className={`cassette-n${flipping?" flip":""}`} style={{ marginBottom:12 }}>
                <div style={{ background:N.ink, padding:"10px" }}>
                  <div style={{ background:N.paper, border:`1px solid ${N.rule}`, padding:"7px 10px", marginBottom:8, position:"relative" }}>
                    <div style={{ fontFamily:N.sans, fontSize:8, letterSpacing:".2em", color:N.red, fontWeight:700, textTransform:"uppercase", marginBottom:2 }}>Michael Chen / Edition 2026</div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:13, fontWeight:700, color:N.ink }}>{side==="A"?"Side A — Work":"Side B — Life"}</div>
                    <div style={{ fontFamily:N.sans, fontSize:9, color:N.muted, marginTop:2 }}>{side==="A"?"the projects I've been building":"everything else I care about"}</div>
                    <div style={{ position:"absolute", top:6, right:8, fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:900, color:N.red, lineHeight:1, opacity:.7 }}>{side}</div>
                  </div>
                  <div style={{ background:"#ede8de", padding:"7px 10px", display:"flex", justifyContent:"space-around", alignItems:"center" }}>
                    <NewsReel dir="cw" playing={playing} />
                    <div style={{ flex:1, maxWidth:40, margin:"0 8px", height:3, background:"#888", opacity:.5 }} />
                    <NewsReel dir="ccw" playing={playing} />
                  </div>
                </div>
              </div>
              <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:14 }}>
                <button className="btn-n" style={{ flex:1 }} onClick={() => setPlaying(p=>!p)}>{playing?"⏸ Pause":"▶ Play"}</button>
                <button className="btn-n red" style={{ flex:1 }} onClick={flip}>⇄ Flip {side==="A"?"B":"A"}</button>
              </div>
              <Kicker>My Stack</Kicker>
              <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                {STACK.map(s => <span key={s} style={{ fontFamily:N.sans, fontSize:10, fontWeight:700, padding:"3px 6px", background:N.ink, color:N.paper }}>{s}</span>)}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={side} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:.2 }}>

              {side === "A" && <>
                {/* Projects */}
                <div style={{ paddingTop:18, paddingBottom:18, borderBottom:`2px solid ${N.ink}` }}>
                  <Kicker>Side A — What I've been building</Kicker>
                  <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(22px,5vw,30px)", fontWeight:900, marginBottom:18 }}>What I've been building</h2>
                  {PROJECTS.map(p => {
                    const open = openProject === p.id;
                    return (
                      <div key={p.id} className={`track-n${open?" open":""}`}>
                        <button onClick={() => { setOpenProject(open?null:p.id); setPreviewIdx(0); }}
                          style={{ width:"100%", textAlign:"left", padding:"12px 0", display:"flex", alignItems:"center", gap:10, background:"transparent", border:"none", cursor:"pointer", fontFamily:"inherit", color:"inherit" }}>
                          <span style={{ fontFamily:N.sans, fontSize:10, color:N.red, fontWeight:700, flexShrink:0, width:24 }}>{p.num}</span>
                          <span style={{ flex:1, minWidth:0 }}>
                            <span style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(14px,4vw,16px)", fontWeight:700, display:"block" }}>{p.name}</span>
                            <span style={{ fontFamily:N.sans, fontSize:10, color:N.muted }}>{p.type} · {p.year} · {p.stack.slice(0,2).join(", ")}</span>
                          </span>
                          <span style={{ fontFamily:N.sans, fontSize:9, fontWeight:700, padding:"2px 8px", background:N.red, color:"#fff", flexShrink:0, whiteSpace:"nowrap" }}>LIVE</span>
                          <span style={{ fontSize:14, color:N.muted, flexShrink:0, width:16, textAlign:"right" }}>{open?"−":"+"}</span>
                        </button>
                        <AnimatePresence>
                          {open && (
                            <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:.25 }} style={{ overflow:"hidden" }}>
                              <div style={{ paddingBottom:16 }}>
                                <div style={{ position:"relative", aspectRatio:"16/9", overflow:"hidden", border:`1px solid ${N.rule}` }}>
                                  <AnimatePresence mode="wait">
                                    <motion.img key={previewIdx} src={p.images[previewIdx]} alt={p.name}
                                      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:.4 }}
                                      style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0, display:"block" }} />
                                  </AnimatePresence>
                                  {p.images.length > 1 && (
                                    <div style={{ position:"absolute", bottom:8, left:"50%", transform:"translateX(-50%)", display:"flex", gap:5 }}>
                                      {p.images.map((_,idx) => (
                                        <button key={idx} onClick={e=>{e.stopPropagation();setPreviewIdx(idx);}}
                                          style={{ width:idx===previewIdx?20:7, height:7, border:"none", cursor:"pointer", background:idx===previewIdx?N.red:"rgba(255,255,255,.6)", transition:"all .2s" }} />
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <div style={{ background:N.red, padding:"12px 14px", display:"flex", flexWrap:"wrap", gap:14, alignItems:"center", justifyContent:"space-between" }}>
                                  <p style={{ fontFamily:"'Source Serif 4',Georgia,serif", fontSize:13, lineHeight:1.65, color:"#fff", margin:0, flex:"1 1 180px" }}>{p.desc}</p>
                                  <div style={{ display:"flex", flexDirection:"column", gap:7, flexShrink:0 }}>
                                    <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                                      {p.stack.map(s => <span key={s} style={{ fontFamily:N.sans, fontSize:10, fontWeight:700, padding:"2px 5px", background:"rgba(255,255,255,.2)", color:"#fff", border:"1px solid rgba(255,255,255,.35)" }}>{s}</span>)}
                                    </div>
                                    <a href={p.link} target="_blank" rel="noreferrer" className="btn-n out" style={{ fontSize:10, background:N.paper, color:N.ink, alignSelf:"flex-start" }}>View Live <ExternalLink size={11}/></a>
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

                {/* Now */}
                <div style={{ paddingTop:18, paddingBottom:18, borderBottom:`1px solid ${N.rule}` }}>
                  <Kicker>Dispatches</Kicker>
                  <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(22px,5vw,28px)", fontWeight:900, marginBottom:14 }}>What I'm up to</h2>
                  <div className="now-cols" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:18 }}>
                    {NOW.map(n => (
                      <div key={n.label} className="now-cell">
                        <div style={{ fontFamily:N.sans, fontSize:9, fontWeight:700, letterSpacing:".2em", color:N.red, marginBottom:4, textTransform:"uppercase", borderBottom:`1px solid ${N.rule}`, paddingBottom:4 }}>{n.label}</div>
                        <p style={{ fontFamily:"'Source Serif 4',Georgia,serif", fontSize:13, lineHeight:1.7, color:N.muted, margin:0 }}>{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ paddingTop:18, paddingBottom:18, borderBottom:`1px solid ${N.rule}` }}>
                  <Kicker>Arts & Culture</Kicker>
                  <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(22px,5vw,28px)", fontWeight:900, marginBottom:14 }}>Tracks I've been enjoying</h2>
                  <RecentTracks />
                </div>
              </>}

              {side === "B" && <>
                <div style={{ paddingTop:18, paddingBottom:18, borderBottom:`1px solid ${N.rule}` }}>
                  <Kicker>Side B — Everything else</Kicker>
                  <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(22px,5vw,28px)", fontWeight:900, marginBottom:14 }}>Things I'm into</h2>
                  <div className="hobby-cols" style={{ columnCount:2, columnGap:28, columnRule:`1px solid ${N.rule}` }}>
                    {HOBBIES.map(h => (
                      <div key={h.num} style={{ marginBottom:16, breakInside:"avoid" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                          <span style={{ fontFamily:N.sans, fontSize:9, color:N.red, fontWeight:700 }}>{h.num}</span>
                          <h.icon size={12} color={N.red} />
                          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:700 }}>{h.title}</span>
                        </div>
                        <p style={{ fontFamily:"'Source Serif 4',Georgia,serif", fontSize:12, lineHeight:1.65, color:N.muted }}>{h.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ paddingTop:18, paddingBottom:18, borderBottom:`1px solid ${N.rule}` }}>
                  <Kicker>On the turntable</Kicker>
                  <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(22px,5vw,28px)", fontWeight:900, marginBottom:14 }}>Tracks I've been enjoying</h2>
                  <RecentTracks />
                </div>
              </>}
            </motion.div>
          </AnimatePresence>

          {/* Places */}
          <div style={{ paddingTop:18, paddingBottom:18, borderBottom:`1px solid ${N.rule}` }}>
            <Kicker>Travel</Kicker>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(22px,5vw,28px)", fontWeight:900, marginBottom:14 }}>Places I've explored</h2>
            <div className="places-wrap"><PlacesSection darkMode={false} /></div>
          </div>

          {/* Contact */}
          <div className="contact-cols" style={{ paddingTop:18, paddingBottom:18, borderBottom:`1px solid ${N.rule}`, display:"grid", gridTemplateColumns:"1fr 1fr", gap:28, alignItems:"center" }}>
            <div>
              <Kicker>Letters to the Editor</Kicker>
              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif", fontSize:"clamp(22px,5vw,28px)", fontWeight:900, marginBottom:8 }}>Let's connect.</h2>
              <p style={{ fontFamily:"'Source Serif 4',Georgia,serif", fontSize:14, lineHeight:1.7, color:N.muted }}>Always down to chat — drop me a line.</p>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
              <a href="mailto:michaelchendevs@gmail.com" className="btn-n red"><Mail size={13}/> Email Me</a>
              <a href="https://www.linkedin.com/in/michael-chen880/" target="_blank" rel="noreferrer" className="btn-n"><Linkedin size={13}/> LinkedIn</a>
              <a href="/MichaelChenResume.pdf" target="_blank" rel="noreferrer" className="btn-n out">📄 Resume ↗</a>
            </div>
          </div>

          <div style={{ padding:"1rem 0", display:"flex", justifyContent:"space-between", fontSize:9, fontFamily:N.sans, fontWeight:700, letterSpacing:".2em", color:N.muted, textTransform:"uppercase" }}>
            <span>© {new Date().getFullYear()} · Michael Chen</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </main>
    </>
  );
}

function NewsReel({ dir, playing }: { dir:"cw"|"ccw"; playing:boolean }) {
  return (
    <div style={{ width:40, height:40, borderRadius:"50%", background:"#1a1a1a", border:`1px solid #555`, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <svg width="30" height="30" viewBox="0 0 30 30" className={`${dir==="cw"?"reel-cw":"reel-ccw"}${!playing?" paused":""}`}>
        <circle cx="15" cy="15" r="12" fill="#1a1a1a" stroke="#555" strokeWidth="1"/>
        {[0,60,120,180,240,300].map(a=>(
          <g key={a} transform={`rotate(${a} 15 15)`}>
            <rect x="13.5" y="3.5" width="3" height="6" fill={N.red}/>
          </g>
        ))}
        <circle cx="15" cy="15" r="5" fill={N.paper} stroke="#555" strokeWidth="1"/>
        <circle cx="15" cy="15" r="2" fill="#1a1a1a"/>
      </svg>
    </div>
  );
}