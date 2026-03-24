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

import gojo from "../assets/gojo.jpeg";
import kakashi from "../assets/kakashi.jpeg";
import naruto from "../assets/naruto.jpeg";
import makima from "../assets/makima.jpeg";

const AVATARS = [makima, kakashi, naruto, gojo];

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      className="shrink-0 mt-3"
      style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.07)",
        paddingTop: "12px",
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <div className="flex items-center justify-between mb-2.5">
        <div>
          <div
            className="text-[12px] font-semibold tracking-wide leading-tight"
            style={{ color: "rgba(255, 255, 255, 0.85)" }}
          >
            Untitled
          </div>
          <div
            className="text-[10px] tracking-wider mt-0.5"
            style={{ color: "rgba(255, 255, 255, 0.3)" }}
          >
            Unknown Artist
          </div>
        </div>

        <motion.button
          onClick={() => setIsLiked((prev) => !prev)}
          whileTap={{ scale: 0.8 }}
        >
          <Heart
            size={13}
            style={{
              fill: isLiked ? "#fb923c" : "transparent",
              color: isLiked ? "#fb923c" : "rgba(255, 255, 255, 0.25)",
              transition: "all 0.2s",
            }}
          />
        </motion.button>
      </div>

      <div
        className="w-full rounded-full mb-3"
        style={{ height: "2.5px", background: "rgba(255, 255, 255, 0.1)" }}
      >
        <div
          className="rounded-full"
          style={{
            width: "42%",
            height: "100%",
            background: "rgba(255, 155, 50, 0.9)",
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
          onClick={() => setIsPlaying((prev) => !prev)}
          className="flex items-center justify-center rounded-full"
          style={{
            width: "30px",
            height: "30px",
            background: "rgba(255, 145, 40, 0.85)",
            border: "1px solid rgba(255, 180, 80, 0.4)",
            color: "#fff",
          }}
          whileHover={{ scale: 1.1, background: "rgba(255, 160, 55, 0.95)" }}
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

export default function RightColumn() {
  return (
    <motion.div
      className="flex flex-col shrink-0"
      style={{
        width: "240px",
        borderLeft: "1px solid rgba(255, 255, 255, 0.07)",
        paddingLeft: "16px",
      }}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.35, duration: 0.45 }}
    >
      <div className="text-sm font-semibold tracking-wide mb-3 text-white/80">
        Hi Ayush!!
      </div>

      <div className="grid grid-cols-2 gap-2 flex-1">
        {AVATARS.map((src, i) => (
          <motion.div
            key={i}
            className="overflow-hidden"
            style={{
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
          >
            <img
              src={src}
              alt={`avatar-${i}`}
              className="w-full h-full object-cover"
              style={{ aspectRatio: "1 / 1", display: "block" }}
              draggable={false}
            />
          </motion.div>
        ))}
      </div>

      <MusicPlayer />
    </motion.div>
  );
}
