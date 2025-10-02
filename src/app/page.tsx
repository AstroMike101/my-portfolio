"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';


import {
  Linkedin,
  Mail,
  MapPin,
  Plane,
  Trophy,
  Music,
  Film,
  Headphones,
  Mountain,
  Camera,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";
import RecentTracks from "@/components/RecentTracks";
import PlacesSection from "@/components/PlacesSection";


export default function HomePage() {
  const [emailShown, setEmailShown] = useState(false);
  const [currentSection, setCurrentSection] = useState("top");

  useEffect(() => {
    const sectionIds = ["top", "about", "hobbies", "now", "projects", "contact"];

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
    { title: "Tennis", desc: "Weekend leagues, long rallies, and good company.", icon: Trophy, gradient: "from-emerald-100 to-green-100", iconColor: "text-emerald-700" },
    { title: "Music", desc: "Concerts, guitars, and discovering new artists on repeat.", icon: Music, gradient: "from-blue-100 to-indigo-100", iconColor: "text-blue-700" },
    { title: "Movies", desc: "Keeping a running list of films to watch (my letterboxd is suffering)", icon: Film, gradient: "from-purple-100 to-pink-100", iconColor: "text-purple-700" },
    { title: "Outdoors", desc: "Hikes, green spaces, and good coffee outside.", icon: Mountain, gradient: "from-green-100 to-teal-100", iconColor: "text-green-700" },
    { title: "Travel", desc: "Collecting moments, not magnets. Always down for a new city or country.", icon: Plane, gradient: "from-teal-100 to-cyan-100", iconColor: "text-teal-700" },
    { title: "Capturing", desc: "Snapping little vignettes of life & friends.", icon: Camera, gradient: "from-pink-100 to-rose-100", iconColor: "text-pink-700" },
  ];

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        :root { color-scheme: light; }
        @keyframes fadeInUp { from {opacity:0; transform:translateY(30px)} to {opacity:1; transform:translateY(0)} }
        .animate-fade-in-up { animation: fadeInUp .8s ease-out forwards; }
        .glass { background: rgba(255,255,255,.8); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,.2); }
      `}</style>

      <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 text-slate-800 selection:bg-emerald-200 selection:text-slate-900 overflow-x-hidden">
        {/* Decorative blobs and grid */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-r from-emerald-200/60 to-teal-200/40 blur-3xl" />
          <div className="absolute top-1/4 -right-24 h-80 w-80 rounded-full bg-gradient-to-l from-blue-200/50 to-indigo-200/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-gradient-to-t from-purple-200/40 to-pink-200/30 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        {/* Navigation */}
        <nav className="mx-auto mb-8 mt-4 flex flex-wrap justify-center items-center gap-1 rounded-2xl border border-white/60 bg-white/70 px-2 py-1 shadow-lg backdrop-blur-xl max-w-full">
          <a
            href="#top"
            className={`mr-2 rounded-xl px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold hover:shadow ${currentSection === "top" ? "bg-emerald-100 text-slate-900" : "text-slate-700"}`}
            aria-current={currentSection === "top" ? "true" : undefined}
          >
            <span className="inline-flex items-center gap-1">
              <Sparkles className="h-4 w-4" /> Michael
            </span>
          </a>
          {[
            { href: "#about", label: "About" },
            { href: "#hobbies", label: "Hobbies" },
            { href: "#now", label: "Now" },
            { href: "#projects", label: "Projects" },
            { href: "#contact", label: "Contact" },
          ].map((n) => {
            const id = n.href.slice(1);
            const active = currentSection === id;
            return (
              <a
                key={n.href}
                href={n.href}
                className={`relative rounded-xl px-2 sm:px-3 py-1 text-xs sm:text-sm transition hover:bg-white hover:shadow ${active ? "bg-emerald-100 text-slate-900" : "text-slate-700"}`}
                aria-current={active ? "true" : undefined}
              >
                {n.label}
                <span
                  className={`absolute left-2 right-2 -bottom-[2px] h-0.5 rounded-full bg-emerald-400 transition-opacity ${active ? "opacity-100" : "opacity-0"}`}
                />
              </a>
            );
          })}
        </nav>

        {/* Hero */}
        <header id="top" className="mx-auto max-w-5xl px-6 pb-16 pt-2">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-7 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-1 text-emerald-900 shadow-sm">
                <MapPin className="h-4 w-4" />
                Atlanta, GA
              </div>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
                {/* Static line with gradient */}
                <span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-500"
                  style={{ WebkitTextFillColor: "transparent", lineHeight: "1.2" }}
                >
                  Hi, I&apos;m Michael —
                </span>

                {/* Animated line: spacer + overlay */}
                <span className="relative inline-block align-top">
                  {/* Spacer reserves width/height of the longest phrase */}
                  <span
                    aria-hidden="true"
                    className="invisible block whitespace-nowrap text-3xl md:text-6xl"
                    style={{ lineHeight: "1.2" }}
                  >
                    Software Engineer
                  </span>

                  {/* Actual animated text with its OWN gradient */}
                  <span
                    className="absolute inset-0 block whitespace-nowrap text-3xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-500"
                    style={{ WebkitTextFillColor: "transparent", lineHeight: "1.2" }}
                  >
                    <Typewriter
                      words={["Software Engineer", "Problem Solver", "Lifelong Learner"]}
                      loop
                      cursor
                      cursorStyle="|"
                      typeSpeed={90}
                      deleteSpeed={90}
                      delaySpeed={1500}
                    />
                  </span>
                </span>
              </h1>


              <p className="mt-4 max-w-xl text-lg text-slate-600 leading-relaxed">
                I design &amp; build clean, thoughtful software. When I&apos;m not developing, you&apos;ll probably find me on a tennis court, at a concert, or planning my next outdoor escape.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#contact" className="group rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-white shadow-lg hover:shadow-xl transition-all">
                  <span className="flex items-center gap-2">
                    Say hello
                    <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
                <a href="#about" className="rounded-xl border border-slate-200 glass px-5 py-3 text-slate-800 hover:shadow-lg transition-all">
                  Learn more
                </a>
              </div>
            </div>
          </motion.div>
        </header>

        {/* About Section */}
        <section id="about" className="mx-auto max-w-5xl px-6 py-8">
          <SectionTitle kicker="About" title="Who I am" />
          <div className="grid gap-6 md:grid-cols-12">
            <Card className="md:col-span-7">
              <h3 className="text-xl font-semibold">A quick snapshot</h3>
              <p className="mt-3 text-slate-600">
                I graduated from the University of Georgia in 2024 with a degree in Computer Science, and now work as a software engineer in Atlanta. I’m passionate about building software that’s reliable, intuitive, and works exactly as it should.          </p>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  Clean architecture, DX, and performance-minded code                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-teal-400" />
                  Practical problem-solver and collaborative teammate
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-400" />
                  Based in Atlanta, always open to new people and new experiences
                </li>
              </ul>
            </Card>

            <Card className="md:col-span-5">
              <h3 className="text-xl font-semibold">Stack favorites</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {[".NET / C#", "SQL / MySQL / SQL Server", "AWS (EC2, S3, SQS)", "Java", "REST APIs", "HTML/CSS/JS", "React / Next.js", "TailwindCSS", "Vue.js", "Azure DevOps", "Firebase", "Git / GitHub", "JUnit"].map((t) => (
                  <span key={t} className="rounded-lg bg-emerald-100 px-3 py-1 text-sm font-medium text-slate-800">{t}</span>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Hobbies Section */}
        <section id="hobbies" className="mx-auto max-w-5xl px-6 py-10">
          <SectionTitle kicker="Hobbies" title="Things I'm into" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hobbyCards.map((hobby) => (
              <motion.div key={hobby.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.35 }}>
                <Card className="group h-full">
                  <div className="flex items-start gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${hobby.gradient} ring-1 ring-white/60`}>
                      <hobby.icon className={`h-5 w-5 ${hobby.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{hobby.title}</h3>
                      <p className="mt-1 text-slate-600 leading-snug">{hobby.desc}</p>
                    </div>
                  </div>
                  <div className="pointer-events-none mt-4 h-1 w-0 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 transition-all duration-500 group-hover:w-full" />
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Now Section */}
        <section id="now" className="mx-auto max-w-5xl px-6 py-10">
          <SectionTitle kicker="now" title="What I'm up to" />
          <Card>
            <ul className="space-y-5">
              <li className="flex items-start gap-4"><div className="h-3 w-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-400 mt-1 flex-shrink-0" /><div><strong className="text-emerald-700 mr-2">Building:</strong><span className="text-slate-600">established saas applications at work and fun projects at home</span></div></li>
              <li className="flex items-start gap-4"><div className="h-3 w-3 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 mt-1 flex-shrink-0" /><div><strong className="text-teal-700 mr-2">Learning:</strong><span className="text-slate-600">exploring deeper systems topics and performance tuning</span></div></li>
              <li className="flex items-start gap-4"><div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 mt-1 flex-shrink-0" /><div><strong className="text-blue-700 mr-2">Life:</strong><span className="text-slate-600">weekly tennis, shows when good bands roll through, and mini trips out of ATL</span></div></li>
            </ul>
          </Card>

          <h3 className="mt-8 mb-3 text-lg font-semibold text-slate-800">Tracks I’ve been enjoying</h3>
          <RecentTracks />
        </section>

        {/* Projects Section */}
        <section id="projects" className="mx-auto max-w-5xl px-6 py-10">
          <SectionTitle kicker="Projects" title="Fun Projects" />

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Barkada Hospitality",
                desc: "A full-stack reservation and payment platform built with Next.js, TailwindCSS, and Firebase for a ATL based sushi omakase experience. Supports dynamic seat availability, two daily seating schedules, and real-time booking updates. Integrated Square for secure $50 deposits with the remaining balance paid in person. Designed with a clean, mobile-friendly UI to make booking fast and effortless for customers.",
                img: "/images/Screenshot_2.png"
              },
              {
                title: "Macro Buddy",
                desc: "A full-stack nutrition tracking web app built with the MERN stack (MongoDB, Express.js, React, Node.js). Features secure JWT authentication, personalized meal diaries, and real-time macronutrient tracking. Designed with a responsive UI for easy meal logging and a smooth user experience.",
                img: "/images/Screenshot_3.png"
              }
            ].map((proj) => (
              <Card key={proj.title} className="flex flex-col h-full overflow-hidden">
                {/* Project Image */}
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Project Content */}
                <div className="mt-4 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold">{proj.title}</h3>
                  <p className="mt-2 text-slate-600 flex-1">{proj.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
        <section id='PlacesSection'>
          <PlacesSection />


        </section>


{/* Contact Section */}
<section id="contact" className="mx-auto max-w-5xl px-6 py-12">
  <SectionTitle kicker="Contact" title="Let's connect" />
  <Card>
    <div className="flex flex-wrap items-center gap-4">
      {/* LinkedIn */}
      <a
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 glass px-4 py-3 hover:shadow-lg transition-all"
        href="https://www.linkedin.com/in/michael-chen880/"
        target="_blank"
        rel="noreferrer"
      >
        <Linkedin className="h-5 w-5 text-blue-600" />
        LinkedIn
        <ExternalLink className="h-3 w-3 opacity-60" />
      </a>

      {/* Email */}
      <a
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-white shadow-lg hover:shadow-xl transition-all"
        href="mailto:michaelchendevs@gmail.com"
      >
        <Mail className="h-5 w-5" />
        Email Me
      </a>

      {/* Resume */}
      <a
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 glass px-4 py-3 hover:shadow-lg transition-all"
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
      >
        📄 Resume
        <ExternalLink className="h-3 w-3 opacity-60" />
      </a>
    </div>
  </Card>

  <div className="mt-8 text-center">
    <div className="inline-flex items-center gap-2 text-sm text-slate-500">
      © {new Date().getFullYear()} Michael Chen — built with Next.js & Tailwind
    </div>
  </div>
</section>

      </main>
    </>
  );
}
