"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import {
  Linkedin,
  Mail,
  MapPin,
  Plane,
  Trophy,
  Music,
  Film,
  Mountain,
  Camera,
  ExternalLink,
  ArrowUpRight,
  Circle,
  Menu,
  X,
} from "lucide-react";

import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import RecentTracks from "@/components/RecentTracks";
import PlacesSection from "@/components/PlacesSection";

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState("top");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const sectionIds = ["top", "about", "hobbies", "now", "projects", "PlacesSection", "contact"];
    const onScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.33;
      let active = "top";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (probe >= top && probe < bottom) {
          active = id;
          break;
        }
        if (probe >= top) active = id;
      }
      setCurrentSection(active);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const hobbyCards = [
    { title: "Tennis", desc: "Weekend leagues, long rallies, and good company.", icon: Trophy, color: "#FF6B6B" },
    { title: "Music", desc: "Concerts, guitars, and discovering new artists on repeat.", icon: Music, color: "#4ECDC4" },
    { title: "Movies", desc: "Keeping a running list of films to watch (my letterboxd is suffering)", icon: Film, color: "#FFE66D" },
    { title: "Outdoors", desc: "Hikes, green spaces, and good coffee outside.", icon: Mountain, color: "#95E1D3" },
    { title: "Travel", desc: "Collecting moments, not magnets. Always down for a new city or country.", icon: Plane, color: "#F38181" },
    { title: "Capturing", desc: "Snapping little vignettes of life & friends.", icon: Camera, color: "#AA96DA" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');
        
        html { 
          scroll-behavior: smooth;
          font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        body {
          background: #FAFAFA;
        }
        
        ::selection {
          background: black;
          color: white;
        }

        .grain {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.03;
          z-index: 100;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulance type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(2deg); }
          66% { transform: translateY(-10px) rotate(-2deg); }
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }

        .terminal-text {
          color: #00ff00;
          text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
          font-family: 'Courier New', monospace;
        }
      `}</style>

      <div className="grain"></div>

      {/* Custom Cursor */}
      <motion.div
        className="hidden md:block fixed w-8 h-8 border-2 border-black rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: cursorVariant === "hover" ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{ cursor: 'none' }}
      />

      <main className="relative min-h-screen bg-[#FAFAFA] text-black">
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 border-b-2 border-black bg-white"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between h-20">
              <motion.a 
                href="#top" 
                className="text-2xl font-bold cursor-pointer"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                MC
              </motion.a>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-8">
                {[
                  { href: "#about", label: "About" },
                  { href: "#hobbies", label: "Hobbies" },
                  { href: "#now", label: "Now" },
                  { href: "#projects", label: "Projects" },
                  { href: "#PlacesSection", label: "Places" },
                  { href: "#contact", label: "Contact" },
                ].map((n, index) => {
                  const id = n.href.slice(1);
                  const active = currentSection === id;
                  return (
                    <motion.a
                      key={n.href}
                      href={n.href}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className={`text-sm font-bold uppercase tracking-wider transition-opacity cursor-pointer ${
                        active ? "opacity-100" : "opacity-40 hover:opacity-100"
                      }`}
                      onMouseEnter={() => setCursorVariant("hover")}
                      onMouseLeave={() => setCursorVariant("default")}
                    >
                      {n.label}
                    </motion.a>
                  );
                })}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden text-black cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden overflow-hidden border-t-2 border-black"
                >
                  <div className="py-4 flex flex-col gap-4">
                    {[
                      { href: "#about", label: "About" },
                      { href: "#hobbies", label: "Hobbies" },
                      { href: "#now", label: "Now" },
                      { href: "#projects", label: "Projects" },
                      { href: "#PlacesSection", label: "Places" },
                      { href: "#contact", label: "Contact" },
                    ].map((n) => {
                      const id = n.href.slice(1);
                      const active = currentSection === id;
                      return (
                        <motion.a
                          key={n.href}
                          href={n.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`text-sm font-bold uppercase tracking-wider transition-opacity cursor-pointer py-2 ${
                            active ? "opacity-100" : "opacity-40"
                          }`}
                          whileTap={{ scale: 0.95 }}
                        >
                          {n.label}
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>

        {/* Hero */}
        <header id="top" className="mx-auto max-w-7xl px-6 pt-40 pb-32">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 text-sm font-mono mb-8 border-2 border-black px-4 py-2 bg-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Circle className="h-2 w-2 fill-current" />
              ATLANTA, GA
            </motion.div>

            <motion.h1 
              className="text-[8vw] md:text-[6rem] font-bold leading-[0.9] mb-8 tracking-tight"
            >
              <motion.span 
                className="block"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                HI, I'M
              </motion.span>
              <motion.span 
                className="block"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                MICHAEL—
              </motion.span>
              <motion.span 
                className="block terminal-text"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <Typewriter
                  words={["SOFTWARE ENGINEER", "PROBLEM SOLVER", "LIFELONG LEARNER"]}
                  loop
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
              </motion.span>
            </motion.h1>

            <motion.p 
              className="text-2xl font-medium max-w-3xl mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              I design & build clean, thoughtful software. When I'm not developing, you'll probably find me on a tennis court, at a concert, or planning my next outdoor escape.
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.a 
                href="#contact"
                className="group relative inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider bg-black text-white overflow-hidden cursor-pointer"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Say Hello</span>
                <ArrowUpRight className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                <motion.div
                  className="absolute inset-0 bg-[#FF6B6B]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a 
                href="#about"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider border-2 border-black hover:bg-black hover:text-white transition-colors cursor-pointer"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>
        </header>

        {/* About */}
        <section id="about" className="mx-auto max-w-7xl px-6 py-20">
          <SectionTitle kicker="About" title="Who I am" />
          <div className="grid gap-8 md:grid-cols-12">
            <motion.div 
              className="md:col-span-7 border-2 border-black p-12 bg-white cursor-pointer"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8 }}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <h3 className="text-3xl font-bold mb-6">A quick snapshot</h3>
              <p className="text-lg mb-8 leading-relaxed opacity-80">
                I graduated from the University of Georgia in 2024 with a degree in Computer Science, and now work as a software engineer in Atlanta. I'm passionate about building software that's reliable, intuitive, and works exactly as it should.
              </p>
              <div className="space-y-4 font-mono text-sm">
                {[
                  "Clean architecture, DX, and performance-minded code",
                  "Practical problem-solver and collaborative teammate",
                  "Based in Atlanta, always open to new people and new experiences"
                ].map((text, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <span className="text-2xl">→</span>
                    <span>{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="md:col-span-5 border-2 border-black p-12 bg-white cursor-pointer"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8 }}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <h3 className="text-3xl font-bold mb-6">Stack</h3>
              <div className="flex flex-wrap gap-2">
                {[".NET / C#", "SQL", "AWS", "Java", "REST APIs", "HTML/CSS/JS", "React", "Next.js", "Tailwind", "Vue.js", "Azure", "Firebase", "Git", "JUnit"].map((t, i) => (
                  <motion.span 
                    key={t} 
                    className="px-3 py-2 text-xs font-bold bg-black text-white uppercase tracking-wider cursor-pointer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hobbies */}
        <section id="hobbies" className="mx-auto max-w-7xl px-6 py-20">
          <SectionTitle kicker="Hobbies" title="Things I'm into" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hobbyCards.map((hobby, i) => (
              <motion.div 
                key={hobby.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group border-2 border-black p-8 bg-white relative overflow-hidden cursor-pointer"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                  style={{ background: hobby.color }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.6 }}>
                      <hobby.icon className="h-8 w-8" style={{ stroke: hobby.color }} strokeWidth={2} />
                    </motion.div>
                    <div className="text-4xl font-bold opacity-10">{String(i + 1).padStart(2, '0')}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{hobby.title}</h3>
                  <p className="text-sm leading-relaxed opacity-70">{hobby.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Now - Simplified animations */}
        <section id="now" className="mx-auto max-w-7xl px-6 py-20">
          <SectionTitle kicker="Now" title="What I'm up to" />
          
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {[
              { 
                label: "Building", 
                text: "established saas applications at work and fun projects at home", 
                color: "#FF6B6B",
                icon: "🚀"
              },
              { 
                label: "Learning", 
                text: "exploring deeper systems topics and performance tuning", 
                color: "#4ECDC4",
                icon: "📚"
              },
              { 
                label: "Life", 
                text: "weekly tennis, shows when good bands roll through, and mini trips out of ATL", 
                color: "#FFE66D",
                icon: "✨"
              }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="border-2 border-black p-8 bg-white relative overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10"
                  style={{ background: item.color }}
                />
                
                <div className="text-5xl mb-4">
                  {item.icon}
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-3" style={{ color: item.color }}>
                    {item.label}
                  </h3>
                  <p className="text-base leading-relaxed opacity-80">
                    {item.text}
                  </p>
                </div>

                <div
                  className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-black opacity-10"
                  style={{ background: item.color }}
                />
              </motion.div>
            ))}
          </div>

          <motion.h3 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Tracks I've been enjoying
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <RecentTracks />
          </motion.div>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-7xl px-6 py-20">
          <SectionTitle kicker="Projects" title="Fun Projects" />
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Barkada Hospitality",
                desc: "A full-stack reservation and payment platform designed for an Atlanta based sushi omakase experience. Built with Next.js, Tailwind CSS, and Firebase.",
                img: "/images/Screenshot_2.png",
                link: "https://barkadahospitality.info",
                color: "#FF6B6B"
              },
              {
                title: "Macro Buddy",
                desc: "A full-stack nutrition tracking web app built with the MERN stack. Features secure JWT authentication, personalized meal diaries, and real-time macronutrient tracking.",
                img: "/images/Screenshot_3.png",
                color: "#4ECDC4"
              }
            ].map((proj, i) => (
              <motion.div 
                key={proj.title}
                className="group border-2 border-black bg-white overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ y: -12, rotate: i % 2 === 0 ? 2 : -2 }}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <div className="aspect-video overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 z-10 opacity-0 group-hover:opacity-20 transition-opacity"
                    style={{ background: proj.color }}
                  />
                  <motion.img
                    src={proj.img}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-4">{proj.title}</h3>
                  <p className="text-sm leading-relaxed mb-6 opacity-70">{proj.desc}</p>
                  {proj.link && (
                    <motion.a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider bg-black text-white transition-all cursor-pointer"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Live
                      <ExternalLink className="h-4 w-4" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id='PlacesSection'>
          <PlacesSection />
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
          <SectionTitle kicker="Contact" title="Let's connect" />
          <motion.div 
            className="border-2 border-black p-12 bg-white"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-wrap gap-4">
              {[
                { href: "https://www.linkedin.com/in/michael-chen880/", icon: Linkedin, label: "LinkedIn", external: true },
                { href: "mailto:michaelchendevs@gmail.com", icon: Mail, label: "Email Me", primary: true },
                { href: "/resume.pdf", icon: null, label: "📄 Resume", external: true }
              ].map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    link.primary 
                      ? "bg-black text-white hover:bg-opacity-80" 
                      : "border-2 border-black hover:bg-black hover:text-white"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="mt-12 text-center font-mono text-sm opacity-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p>© {new Date().getFullYear()} MICHAEL CHEN</p>
          </motion.div>
        </section>
      </main>
    </>
  );
}