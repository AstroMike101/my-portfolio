export default function RecentTracks() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-white/50 glass">
      <iframe
        src="https://open.spotify.com/embed/playlist/4ynAF5u8eruVcNJGGEA7R5?utm_source=generator&theme=0"
        width="100%"
        height="380"
        style={{ minHeight: 380 }}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}
