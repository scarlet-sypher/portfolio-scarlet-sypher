import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Heart,
  Repeat,
  Shuffle,
} from "lucide-react";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const IDENTITY_WORDS = ["ADAPTIVE", "DSA", "SYSTEMS", "BUILDER", "LEADERSHIP"];

const PROJECTS = [
  {
    name: "NexusChat",
    desc: "Real-time messaging platform",
    stack: "Socket.io · React · Node",
    front: "#38bdf8",
    side: "#0ea5e9",
  },
  {
    name: "DataForge",
    desc: "DSA visualizer & trainer",
    stack: "React · D3.js · TS",
    front: "#a78bfa",
    side: "#7c3aed",
  },
  {
    name: "APIFlow",
    desc: "REST API design tool",
    stack: "Express · MongoDB · JWT",
    front: "#34d399",
    side: "#059669",
  },
  {
    name: "SysView",
    desc: "System metrics dashboard",
    stack: "Next.js · Redis · Docker",
    front: "#fb923c",
    side: "#ea580c",
  },
];

function ClockBlock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedHour = String(time.getHours()).padStart(2, "0");
  const formattedMinute = String(time.getMinutes()).padStart(2, "0");
  const dayName = DAYS_OF_WEEK[time.getDay()];
  const paddedDate = String(time.getDate()).padStart(2, "0");
  const paddedMonth = String(time.getMonth() + 1).padStart(2, "0");

  return (
    <motion.div
      className="shrink-0"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.45 }}
      style={{
        paddingBottom: "10px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
      }}
    >
      <div
        className="text-3xl font-bold tracking-widest leading-none"
        style={{
          fontFamily: "'Courier New', monospace",
          color: "rgba(255,255,255,0.92)",
          textShadow: "0 2px 16px rgba(0,0,0,0.6)",
        }}
      >
        {formattedHour}:{formattedMinute}
      </div>
      <div
        className="text-[10px] tracking-[0.22em] mt-1 uppercase"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {dayName} {paddedDate}/{paddedMonth}
      </div>
    </motion.div>
  );
}

function IdentityDialBlock() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setWordIndex((i) => (i + 1) % IDENTITY_WORDS.length),
      2400,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="flex items-center gap-2.5 shrink-0"
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.38, duration: 0.42 }}
      style={{
        paddingBottom: "12px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
      }}
    >
      <span
        className="text-[10px] tracking-[0.28em] uppercase shrink-0"
        style={{ color: "rgba(255, 255, 255, 0.32)" }}
      >
        I AM
      </span>

      <div
        className="relative overflow-hidden flex items-center flex-1"
        style={{ height: "20px" }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={wordIndex}
            className="absolute text-[12px] font-bold tracking-[0.2em]"
            style={{ color: "rgba(255, 255, 255, 0.9)" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {IDENTITY_WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div
        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: "rgba(255, 190, 60, 0.15)",
          border: "1px solid rgba(255, 200, 80, 0.35)",
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
      </div>

      <div
        className="w-7 h-7 rounded-full overflow-hidden shrink-0"
        style={{
          border: "1.5px solid rgba(255, 255, 255, 0.22)",
          background: "rgba(255, 255, 255, 0.09)",
        }}
      />
    </motion.div>
  );
}

function ProjectCube({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ perspective: 600, width: "100%", aspectRatio: "1/1" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.08, duration: 0.4 }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
        animate={{
          rotateY: hovered ? -18 : 0,
          rotateX: hovered ? 10 : 0,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        {/* Front face */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${project.front}22 0%, ${project.front}10 100%)`,
            border: `1px solid ${project.front}44`,
            backdropFilter: "blur(8px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "8px",
            boxShadow: hovered
              ? `0 0 18px ${project.front}33, 0 4px 20px rgba(0,0,0,0.3)`
              : "0 2px 12px rgba(0,0,0,0.2)",
            transition: "box-shadow 0.3s ease",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: project.front,
              opacity: hovered ? 1 : 0.5,
              transition: "opacity 0.3s",
            }}
          />
          <div
            className="text-[10px] font-bold leading-tight"
            style={{ color: "rgba(255,255,255,0.88)" }}
          >
            {project.name}
          </div>
          <div
            className="text-[8px] mt-0.5 leading-tight"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            {project.desc}
          </div>
        </div>

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 10,
                background: `${project.side}18`,
                border: `1px solid ${project.side}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
              }}
            >
              <div
                className="text-[8px] text-center leading-relaxed"
                style={{ color: project.front, fontFamily: "monospace" }}
              >
                {project.stack}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      className="shrink-0"
      style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.07)",
        paddingTop: "10px",
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <div className="flex items-center justify-between mb-2">
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
        className="w-full rounded-full mb-2.5"
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
      className="flex flex-col shrink-0 min-h-0"
      style={{
        width: "clamp(180px, 22vw, 240px)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.07)",
        paddingLeft: "16px",
        gap: "10px",
      }}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.35, duration: 0.45 }}
    >
      {/* Clock moved here from ClockOverlay */}
      <ClockBlock />

      {/* Identity dial moved here from TopBar */}
      <IdentityDialBlock />

      {/* Projects label */}
      <div
        className="text-[9px] font-semibold tracking-[0.28em] uppercase shrink-0"
        style={{ color: "rgba(255,255,255,0.28)", fontFamily: "monospace" }}
      >
        ◈ Projects
      </div>

      {/* Project cubes — flex-1 so they fill remaining space evenly */}
      <div className="grid grid-cols-2 gap-2 flex-1 min-h-0 content-start">
        {PROJECTS.map((project, i) => (
          <ProjectCube key={project.name} project={project} index={i} />
        ))}
      </div>

      <MusicPlayer />
    </motion.div>
  );
}
