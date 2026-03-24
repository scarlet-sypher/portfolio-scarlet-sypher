import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Heart, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

const MUSIC_TRACKS = [
  { title: "Blinding Lights", artist: "The Weeknd", duration: "3:20" },
  { title: "Levitating", artist: "Dua Lipa", duration: "3:23" },
  { title: "Stay", artist: "Kid Laroi", duration: "2:21" },
  { title: "Peaches", artist: "Justin Bieber", duration: "3:18" },
  { title: "Good 4 U", artist: "Olivia Rodrigo", duration: "2:58" },
];
const LIBRARY_SECTIONS = ["Recently Played", "Top Mixes", "Made For You", "Charts"];

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [likedTracks, setLikedTracks] = useState([]);

  const toggleFavoriteTrack = (index) => {
    setLikedTracks((prev) => 
      prev.includes(index) ? prev.filter((id) => id !== index) : [...prev, index]
    );
  };

  return (
    <div className="h-full flex" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
      <div
        className="w-48 flex flex-col p-4 gap-1 shrink-0"
        style={{ borderRight: "1px solid rgba(255, 255, 255, 0.07)" }}
      >
        <div className="text-[9px] tracking-[0.3em] uppercase mb-3 text-white/30">
          Library
        </div>
        
        {LIBRARY_SECTIONS.map((section) => (
          <button
            key={section}
            className="text-left text-xs px-3 py-2 rounded-lg transition-colors text-white/50"
            onMouseEnter={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.06)")}
            onMouseLeave={(e) => (e.target.style.background = "transparent")}
          >
            {section}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col p-6 min-w-0">
        <div
          className="text-sm font-semibold tracking-widest mb-4"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          NOW PLAYING
        </div>

        <div
          className="w-32 h-32 rounded-2xl mb-4 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(255, 145, 40, 0.6), rgba(145, 40, 255, 0.5))",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <span className="text-4xl">🎵</span>
        </div>

        <div className="font-semibold text-sm mb-0.5">
          {MUSIC_TRACKS[currentTrackIndex].title}
        </div>
        <div className="text-xs mb-4 text-white/35">
          {MUSIC_TRACKS[currentTrackIndex].artist}
        </div>

        <div className="w-full h-1 rounded-full mb-4 bg-white/10">
          <div className="h-full rounded-full w-2/5" style={{ background: "rgba(255, 145, 40, 0.9)" }} />
        </div>

        <div className="flex items-center gap-5 mb-6 text-white/40">
          <button onClick={() => setCurrentTrackIndex((prev) => (prev - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length)}>
            <SkipBack size={16} />
          </button>
          
          <motion.button
            onClick={() => setIsPlaying((prev) => !prev)}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
            style={{ background: "rgba(255, 145, 40, 0.85)", color: "#fff" }}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </motion.button>
          
          <button onClick={() => setCurrentTrackIndex((prev) => (prev + 1) % MUSIC_TRACKS.length)}>
            <SkipForward size={16} />
          </button>
          
          <Volume2 size={14} className="ml-auto text-white/30" />
        </div>

        <div className="flex flex-col gap-1">
          {MUSIC_TRACKS.map((track, trackIndex) => (
            <button
              key={trackIndex}
              onClick={() => setCurrentTrackIndex(trackIndex)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all"
              style={{
                background: trackIndex === currentTrackIndex ? "rgba(255, 145, 40, 0.15)" : "transparent",
                border: trackIndex === currentTrackIndex ? "1px solid rgba(255, 145, 40, 0.25)" : "1px solid transparent",
              }}
            >
              <span className="text-xs w-4 text-center text-white/25">
                {trackIndex + 1}
              </span>
              
              <div className="flex-1 min-w-0">
                <div
                  className="text-xs font-medium truncate"
                  style={{ color: trackIndex === currentTrackIndex ? "rgba(255, 165, 60, 0.95)" : "rgba(255, 255, 255, 0.75)" }}
                >
                  {track.title}
                </div>
                <div className="text-[10px] text-white/30">
                  {track.artist}
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavoriteTrack(trackIndex);
                }}
                className="cursor-pointer"
              >
                <Heart
                  size={12}
                  style={{
                    fill: likedTracks.includes(trackIndex) ? "#fb923c" : "transparent",
                    color: likedTracks.includes(trackIndex) ? "#fb923c" : "rgba(255, 255, 255, 0.2)",
                  }}
                />
              </button>
              
              <span className="text-[10px] text-white/25">
                {track.duration}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
