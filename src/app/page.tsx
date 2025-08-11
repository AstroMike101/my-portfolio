"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Mail,
  MapPin,
  Plane,
  Trophy,
  Music,
  Headphones,
  Mountain,
  Camera,
  Sparkles,
} from "lucide-react";
import Card from "@/components/Card";
import SectionTitle from "@/components/SectionTitle";

export default function HomePage() {
  const [emailShown, setEmailShown] = useState(false);
  const [currentSection, setCurrentSection] = useState("top");
  const navRef = useRef<HTMLDivElement | null>(null);

  const nav = [
    { href: "#about", label: "About" },
    { href: "#hobbies", label: "Hobbies" },
    { href: "#now", label: "Now" },
    { href: "#contact", label: "Contact" },
  ];
  const sectionIds = ["top", "about", "hobbies", "now", "contact"];

  // Simple scrollspy using the middle of the viewport
  useEffect(() => {
    const onScroll = () => {
      const navH = (navRef.current?.offsetHeight ?? 0) + 12;
      const probe = window.scrollY + navH + window.innerHeight * 0.25; // 25% down from top
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
    { title: "Tennis", desc: "Weekend leagues, rally sessions, and the occasional tie-break thrill.", icon: Trophy },
    { title: "Music", desc: "Concerts, guitars, and discovering new artists on repeat.", icon: Music },
    { title: "Listening", desc: "Always queueing up fresh tracks & playlists.", icon: Headphones },
    { title: "Outdoors", desc: "Hikes, green spaces, and sunrise coffee outside.", icon: Mountain },
    { title: "Travel", desc: "Collecting moments, not magnets. Always down for a new city.", icon: Plane },
    { title: "Capturing", desc: "Snapping little vignettes of life & friends.", icon: Camera },
  ];

  return (
    <main
      className="relative min-h-screen bg-slate-50 text-slate-800 selection:bg-emerald-200 selection:text-slate-900"
      style={{ colorScheme: "light" }}
    >
      {/* Pastel variables */}
      <style>{` :root { --mint:#BAF2C2; --mint-2:#E5FBEA; --blush:#FFE6EE; --sky:#E6F6FF; --lav:#F0EAFE; } `}</style>

      {/* Background pastel blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-60" style={{ background: "radial-gradient(closest-side, var(--mint), transparent)" }} />
        <div className="absolute top-1/4 -right-20 h-96 w-96 rounded-full blur-3xl opacity-50" style={{ background: "radial-gradient(closest-side, var(--sky), transparent)" }} />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full blur-3xl opacity-40" style={{ background: "radial-gradient(closest-side, var(--lav), transparent)" }} />
        <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full blur-3xl opacity-40" style={{ background: "radial-gradient(closest-side, var(--blush), transparent)" }} />
      </div>

      {/* Sticky nav — plain anchors (no JS scroll), active highlight */}
      <nav
        ref={navRef}
        className="sticky top-4 z-20 mx-auto mb-6 flex w-fit items-center gap-1 rounded-2xl border border-white/60 bg-white/70 px-2 py-1 shadow-lg backdrop-blur-xl"
      >
        <a
          href="#top"
          className={`mr-2 rounded-xl px-3 py-1 text-sm font-semibold hover:shadow ${
            currentSection === "top" ? "bg-[var(--mint-2)] text-slate-900" : "text-slate-700"
          }`}
          aria-current={currentSection === "top" ? "true" : undefined}
        >
          <span className="inline-flex items-center gap-1">
            <Sparkles className="h-4 w-4" /> Michael
          </span>
        </a>
        {nav.map((n) => {
          const id = n.href.slice(1);
          const active = currentSection === id;
          return (
            <a
              key={n.href}
              href={n.href}
              className={`relative rounded-xl px-3 py-1 text-sm transition hover:bg-white hover:shadow ${
                active ? "bg-[var(--mint-2)] text-slate-900" : "text-slate-700"
              }`}
              aria-current={active ? "true" : undefined}
            >
              {n.label}
              <span
                className={`absolute left-2 right-2 -bottom-[2px] h-0.5 rounded-full bg-emerald-400 transition-opacity ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>
          );
        })}
      </nav>

      {/* Hero */}
      <header id="top" className="mx-auto max-w-5xl scroll-mt-28 md:scroll-mt-32 px-6 pb-16 pt-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-900">
              <MapPin className="h-4 w-4" />
              Atlanta, GA • UGA CS
            </div>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
              Hi, I’m Michael —{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">
                Software Engineer
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600">
              I design & build clean, thoughtful software. When I’m not developing, you’ll probably find me on a tennis court, at a concert, or planning my next outdoor escape.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="rounded-xl bg-emerald-500 px-5 py-3 text-white shadow hover:shadow-md">Say hello</a>
              <a href="#about" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-800 hover:shadow">Learn more</a>
            </div>
          </div>

          {/* Minimal right panel */}
          <div className="md:col-span-5">
            <QuickPanel />
          </div>
        </motion.div>
      </header>

      {/* About */}
      <section id="about" className="mx-auto max-w-5xl scroll-mt-28 md:scroll-mt-32 px-6 py-8">
        <SectionTitle kicker="About" title="Who I am" />
        <div className="grid gap-6 md:grid-cols-12">
          <Card className="md:col-span-7">
            <h3 className="text-xl font-semibold">A quick snapshot</h3>
            <p className="mt-3 text-slate-600">
              I’m a University of Georgia grad (Computer Science) now crafting user-focused, maintainable apps.
              I love shipping features that feel effortless and elegant.
            </p>
            <ul className="mt-4 grid list-disc gap-2 pl-6 text-slate-600">
              <li>Clean architecture, DX, and performance-minded code</li>
              <li>Pragmatic problem-solver, teammate, and lifelong learner</li>
              <li>Atlanta-based, open to meeting new people & trying new things</li>
            </ul>
          </Card>
          <Card className="md:col-span-5">
            <h3 className="text-xl font-semibold">Stack favorites</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                ".NET / C#",
                "SQL / MySQL / SQL Server",
                "AWS (EC2, S3, SQS)",
                "Java",
                "REST APIs",
                "HTML/CSS/JS",
                "React / Next.js",
                "TailwindCSS",
                "Vue.js",
                "Azure DevOps",
                "Firebase",
                "Git / GitHub",
                "JUnit",
              ].map((t) => (
                <span key={t} className="rounded-lg bg-[var(--mint-2)] px-3 py-1 text-sm font-medium text-slate-800">
                  {t}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Hobbies */}
      <section id="hobbies" className="mx-auto max-w-5xl scroll-mt-28 md:scroll-mt-32 px-6 py-10">
        <SectionTitle kicker="Hobbies" title="Things I’m into" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Tennis", desc: "Weekend leagues, rally sessions, and the occasional tie-break thrill.", icon: Trophy },
            { title: "Music", desc: "Concerts, guitars, and discovering new artists on repeat.", icon: Music },
            { title: "Listening", desc: "Always queueing up fresh tracks & playlists.", icon: Headphones },
            { title: "Outdoors", desc: "Hikes, green spaces, and sunrise coffee outside.", icon: Mountain },
            { title: "Travel", desc: "Collecting moments, not magnets. Always down for a new city.", icon: Plane },
            { title: "Capturing", desc: "Snapping little vignettes of life & friends.", icon: Camera },
          ].map((h) => (
            <motion.div key={h.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.35 }}>
              <Card className="group h-full">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                    <h.icon />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{h.title}</h3>
                    <p className="mt-1 text-slate-600">{h.desc}</p>
                  </div>
                </div>
                <div className="pointer-events-none mt-4 h-1 w-0 rounded bg-emerald-400 transition-all duration-300 group-hover:w-full" />
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Now */}
      <section id="now" className="mx-auto max-w-5xl scroll-mt-28 md:scroll-mt-32 px-6 py-10">
        <SectionTitle kicker="/now" title="What I’m up to" />
        <Card>
          <ul className="space-y-4">
            <li><strong className="mr-2">Building:</strong> polishing personal tools & components in Next.js + Tailwind.</li>
            <li><strong className="mr-2">Learning:</strong> exploring deeper systems topics and performance tuning.</li>
            <li><strong className="mr-2">Life:</strong> weekly tennis, shows when good bands roll through, and mini day-trips out of ATL.</li>
          </ul>
        </Card>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto max-w-5xl scroll-mt-28 md:scroll-mt-32 px-6 py-12 min-h-[60vh] pb-24"
      >
        <SectionTitle kicker="Contact" title="Let’s connect" />
        <Card>
          <div className="flex flex-wrap items-center gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 hover:shadow"
              href="https://www.linkedin.com/in/michael-chen880/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="h-5 w-5" /> LinkedIn
            </a>
            <button
              onClick={() => setEmailShown((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-white shadow hover:shadow-md"
            >
              <Mail className="h-5 w-5" /> {emailShown ? "michaelchendevs@gmail.com" : "Show email"}
            </button>
          </div>
        </Card>
        <p className="mt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Michael Chen — built with Next.js & Tailwind
        </p>
      </section>
    </main>
  );
}

/* ——— Minimal right panel ——— */
function QuickPanel() {
  return (
    <Card>
      <div className="space-y-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-zinc-500">Now Playing</div>
          <div className="mt-1 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 ring-1 ring-emerald-200" />
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">Queueing up vibes…</div>
              <div className="truncate text-xs text-zinc-600">TBD artist</div>
            </div>
          </div>
        </div>

        <div className="h-px bg-zinc-200/60" />

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <span className="rounded-lg bg-[var(--mint-2)] px-2.5 py-1 font-medium text-slate-800">Atlanta</span>
          <span className="rounded-lg bg-[var(--mint-2)] px-2.5 py-1 font-medium text-slate-800">Tennis</span>
          <span className="rounded-lg bg-[var(--mint-2)] px-2.5 py-1 font-medium text-slate-800">Live Music</span>
        </div>
      </div>
    </Card>
  );
}
