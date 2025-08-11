"use client";

export default function RecentTracks() {
  return (
    <div className="group rounded-2xl overflow-hidden shadow-lg border border-white/50 glass transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
      <iframe
        src="https://open.spotify.com/embed/playlist/4ynAF5u8eruVcNJGGEA7R5?utm_source=generator&theme=0"
        width="100%"
        height="380"
        style={{ minHeight: 380 }}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none -z-10 blur-lg" />
    </div>
  );
}
