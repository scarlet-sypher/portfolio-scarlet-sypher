import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Repeat,
  Shuffle,
} from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 10 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Untitled
          </div>
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.12em",
              marginTop: 2,
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Unknown Artist
          </div>
        </div>
        <motion.button
          onClick={() => setIsLiked((p) => !p)}
          whileTap={{ scale: 0.8 }}
        >
          <Heart
            size={13}
            style={{
              fill: isLiked ? "#fb923c" : "transparent",
              color: isLiked ? "#fb923c" : "rgba(255,255,255,0.25)",
              transition: "all 0.2s",
            }}
          />
        </motion.button>
      </div>

      <div
        className="w-full rounded-full mb-2.5"
        style={{ height: 2.5, background: "rgba(255,255,255,0.1)" }}
      >
        <div
          className="rounded-full"
          style={{
            width: "42%",
            height: "100%",
            background: "rgba(255,155,50,0.9)",
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <button className="opacity-25 hover:opacity-55 transition-opacity">
          <Repeat size={11} />
        </button>
        <motion.button
          className="opacity-45 hover:opacity-85 transition-opacity"
          whileTap={{ scale: 0.85 }}
        >
          <SkipBack size={13} />
        </motion.button>
        <motion.button
          onClick={() => setIsPlaying((p) => !p)}
          className="flex items-center justify-center rounded-full"
          style={{
            width: 30,
            height: 30,
            background: "rgba(255,145,40,0.85)",
            border: "1px solid rgba(255,180,80,0.4)",
            color: "#fff",
          }}
          whileHover={{ scale: 1.1, background: "rgba(255,160,55,0.95)" }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          {isPlaying ? (
            <Pause size={12} />
          ) : (
            <Play size={12} className="ml-px" />
          )}
        </motion.button>
        <motion.button
          className="opacity-45 hover:opacity-85 transition-opacity"
          whileTap={{ scale: 0.85 }}
        >
          <SkipForward size={13} />
        </motion.button>
        <button className="opacity-25 hover:opacity-55 transition-opacity">
          <Shuffle size={11} />
        </button>
      </div>
    </motion.div>
  );
}
