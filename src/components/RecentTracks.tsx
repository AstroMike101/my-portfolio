"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  external_urls: { spotify: string };
}

export default function RecentTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const res = await fetch("/api/spotify/recent");
        if (!res.ok) throw new Error("Failed to fetch tracks");
        const data = await res.json();
        const items = data.items?.map((item: any) => ({
          id: item.track.id,
          name: item.track.name,
          artists: item.track.artists,
          album: item.track.album,
          external_urls: item.track.external_urls,
        }));
        setTracks(items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTracks();
  }, []);

  if (loading) {
    return <p className="text-slate-500">Loading recent tracks…</p>;
  }

  if (!tracks.length) {
    return <p className="text-slate-500">No recent tracks found.</p>;
  }

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-4">
        {tracks.map((track, index) => (
          <motion.a
            key={track.id}
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-44 rounded-xl bg-white/80 shadow hover:shadow-lg transition transform hover:-translate-y-1"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <img
              src={track.album.images[0]?.url}
              alt={track.name}
              className="w-full h-44 object-cover rounded-t-xl"
            />
            <div className="p-3">
              <p className="font-semibold truncate">{track.name}</p>
              <p className="text-sm text-slate-600 truncate">
                {track.artists.map((a) => a.name).join(", ")}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
