"use client";

import { useState, useEffect } from "react";
import MatrixRain from "@/components/MatrixRain";

import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin,
  Mail,
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
  Moon,
  Sun,
} from "lucide-react";

function Typewriter({ words, typeSpeed = 70, deleteSpeed = 50, delaySpeed = 2000 }: { words: string[], typeSpeed?: number, deleteSpeed?: number, delaySpeed?: number }) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), delaySpeed);
        }
      } else {
        if (text.length > 0) {
          setText(currentWord.slice(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, delaySpeed]);

  return <span>{text}_</span>;
}

import Card from "@/components/Card";
import RecentTracks from "@/components/RecentTracks";
import PlacesSection from "@/components/PlacesSection";

function SectionTitle({ kicker, title }: { kicker: string, title: string }) {
  return (
    <div className="mb-12">
      <motion.p 
        className="text-sm font-bold uppercase tracking-wider mb-2 opacity-60"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.6, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {kicker}
      </motion.p>
      <motion.h2 
        className="text-5xl md:text-6xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h2>
    </div>
  );
}


export default function HomePage() {
  const [currentSection, setCurrentSection] = useState("top");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  
  
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
      
      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / windowHeight) * 100;
      setScrollProgress(progress);
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
          background: ${darkMode ? '#0a0a0a' : '#FAFAFA'};
          transition: background 0.3s ease;
        }
        
        ::selection {
          background: ${darkMode ? 'white' : 'black'};
          color: ${darkMode ? 'black' : 'white'};
        }



        .terminal-text {
          color: #00ff00;
          text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
          font-family: 'Courier New', monospace;
        }

       


        * {
          cursor: none !important;
        }

        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>

      
      
      {/* Custom Cursor */}
      <motion.div
        className="hidden md:block fixed pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.5 }}
      >
        <motion.div
          className="w-5 h-5 rounded-full border-2"
          style={{ 
            borderColor: darkMode ? 'white' : 'black',
            backgroundColor: cursorVariant === "hover" ? (darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)') : 'transparent'
          }}
          animate={{
            scale: cursorVariant === "hover" ? 2 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>

    <MatrixRain side="left" darkMode={darkMode} />
<MatrixRain side="right" darkMode={darkMode} />


      <main className={`relative min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#FAFAFA] text-black'}`} style={{ position: 'relative', zIndex: 2 }}>
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`fixed top-0 left-0 right-0 z-50 border-b-2 backdrop-blur-sm transition-colors duration-300 ${
            darkMode 
              ? 'border-white bg-black bg-opacity-95' 
              : 'border-black bg-white md:bg-white bg-opacity-95 md:bg-opacity-100'
          }`}
        >
          {/* Progress bar */}
          <div className={`absolute bottom-0 left-0 h-1 transition-all duration-150 ${darkMode ? 'bg-white' : 'bg-black'}`} style={{ width: `${scrollProgress}%` }} />
          
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
                
                {/* Dark Mode Toggle */}
                <motion.button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 cursor-pointer"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex md:hidden items-center gap-4">
                {/* Dark Mode Toggle Mobile */}
                <motion.button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 cursor-pointer"
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.button>
                
                <motion.button
                  className={`cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileTap={{ scale: 0.95 }}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`md:hidden overflow-hidden border-t-2 ${darkMode ? 'border-white' : 'border-black'}`}
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
                        <a
                          key={n.href}
                          href={n.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`text-sm font-bold uppercase tracking-wider transition-opacity cursor-pointer py-2 ${
                            active ? "opacity-100" : "opacity-40"
                          }`}
                        >
                          {n.label}
                        </a>
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
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              className={`inline-flex items-center gap-2 text-sm font-mono mb-8 border-2 px-4 py-2 transition-colors duration-300 ${
                darkMode ? 'border-white bg-black' : 'border-black bg-white'
              }`}
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Circle className="h-2 w-2 fill-current" />
              ATLANTA, GA
            </motion.div>

            <div className="text-[8vw] md:text-[6rem] font-bold leading-[0.9] mb-8 tracking-tight">
              <motion.div 
                className="block overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.span
                  className="block"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  HI, I'M
                </motion.span>
              </motion.div>
              
              <motion.div 
                className="block overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.span
                  className="block"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  MICHAEL—
                </motion.span>
              </motion.div>
              
              <motion.div 
                className="block overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <motion.span
                  className="block terminal-text"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Typewriter
                    words={["SOFTWARE ENGINEER", "PROBLEM SOLVER", "LIFELONG LEARNER"]}
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </motion.span>
              </motion.div>
            </div>

            <motion.p 
              className="text-2xl font-medium max-w-3xl mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              I design & build clean, thoughtful software. When I'm not developing, you'll probably find me on a tennis court, at a concert, or planning my next outdoor escape.
            </motion.p>

            <motion.div 
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.a 
                href="#contact"
                className={`group relative inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider overflow-hidden cursor-pointer transition-colors duration-300 ${
                  darkMode ? 'bg-white text-black' : 'bg-black text-white'
                }`}
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
                className={`inline-flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider border-2 transition-colors cursor-pointer ${
                  darkMode 
                    ? 'border-white hover:bg-white hover:text-black' 
                    : 'border-black hover:bg-black hover:text-white'
                }`}
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
              className={`md:col-span-7 border-2 p-12 cursor-pointer transition-colors duration-300 ${
                darkMode ? 'border-white bg-black' : 'border-black bg-white'
              }`}
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
              className={`md:col-span-5 border-2 p-12 cursor-pointer transition-colors duration-300 ${
                darkMode ? 'border-white bg-black' : 'border-black bg-white'
              }`}
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
                    className={`px-3 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors duration-300 ${
                      darkMode ? 'bg-white text-black' : 'bg-black text-white'
                    }`}
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
                className={`group border-2 p-8 relative overflow-hidden cursor-pointer transition-colors duration-300 ${
                  darkMode ? 'border-white bg-black' : 'border-black bg-white'
                }`}
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

        {/* Now */}
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
                className={`border-2 p-8 relative overflow-hidden group cursor-pointer transition-colors duration-300 ${
                  darkMode ? 'border-white bg-black' : 'border-black bg-white'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
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
                  className={`absolute top-4 right-4 w-12 h-12 rounded-full border-2 opacity-10 ${darkMode ? 'border-white' : 'border-black'}`}
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
                className={`group border-2 overflow-hidden cursor-pointer transition-colors duration-300 ${
                  darkMode ? 'border-white bg-black' : 'border-black bg-white'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ y: -8 }}
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
                      className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        darkMode ? 'bg-white text-black' : 'bg-black text-white'
                      }`}
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
          <div className="mx-auto max-w-7xl px-6">
<PlacesSection darkMode={darkMode} />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
          <SectionTitle kicker="Contact" title="Let's connect" />
          <div className={`border-2 p-12 transition-colors duration-300 ${
            darkMode ? 'border-white bg-black' : 'border-black bg-white'
          }`}>
            <div className="flex flex-wrap gap-4">
              {[
                { href: "https://www.linkedin.com/in/michael-chen880/", icon: Linkedin, label: "LinkedIn", external: true },
                { href: "mailto:michaelchendevs@gmail.com", icon: Mail, label: "Email Me", primary: true },
                { href: "/resume.pdf", icon: null, label: "📄 Resume", external: true }
              ].map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    link.primary 
                      ? darkMode 
                        ? "bg-white text-black hover:bg-opacity-80" 
                        : "bg-black text-white hover:bg-opacity-80"
                      : darkMode
                        ? "border-2 border-white hover:bg-white hover:text-black"
                        : "border-2 border-black hover:bg-black hover:text-white"
                  }`}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center font-mono text-sm opacity-50">
            <p>© {new Date().getFullYear()} MICHAEL CHEN</p>
          </div>
        </section>
      </main>
    </>
  );
}