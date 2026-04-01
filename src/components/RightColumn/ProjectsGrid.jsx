import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, Brain, Bug, Headphones } from "lucide-react";

const PROJECTS = [
  {
    name: "WhisperTails",
    desc: "Pet adoption platform",
    stack: "MERN · Socket.IO · JWT",
    front: "#38bdf8",
    side: "#0ea5e9",
    live: "https://example.com",
    logo: PawPrint,
  },
  {
    name: "HelpMeMake",
    desc: "AI mentorship platform",
    stack: "MERN · Gemini · OAuth",
    front: "#a78bfa",
    side: "#7c3aed",
    live: "https://example.com",
    logo: Brain,
  },
  {
    name: "CryBug",
    desc: "Bug tracking system",
    stack: "PHP · MySQL · JS",
    front: "#34d399",
    side: "#059669",
    live: "https://example.com",
    logo: Bug,
  },
  {
    name: "PodcastRec",
    desc: "Podcast recommender",
    stack: "Flask · Python · API",
    front: "#fb923c",
    side: "#ea580c",
    live: "https://example.com",
    logo: Headphones,
  },
];

const DOT_POSITIONS = [
  { bottom: 8, right: 8 },
  { bottom: 8, left: 8 },
  { top: 8, right: 8 },
  { top: 8, left: 8 },
];

function ProjectCube({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const dotPos = DOT_POSITIONS[index % 4];
  const Icon = project.logo;

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ perspective: 600, aspectRatio: "1 / 1", width: "100%" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => window.open(project.live, "_blank")}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.08, duration: 0.4 }}
      whileHover={{ scale: 1.04 }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
        animate={{ rotateY: hovered ? -18 : 0, rotateX: hovered ? 10 : 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
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
            padding: "10px 10px 12px",
            gap: 6,
            boxShadow: hovered
              ? `0 0 18px ${project.front}33, 0 4px 20px rgba(0,0,0,0.3)`
              : "0 2px 12px rgba(0,0,0,0.2)",
            transition: "box-shadow 0.3s ease",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: project.front,
              opacity: hovered ? 1 : 0.5,
              transition: "opacity 0.3s",
              ...dotPos,
            }}
          />

          <motion.div
            style={{
              position: "absolute",
              top: 10,
              left: "40%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: hovered ? 0 : 0.9,
              color: project.front,
              pointerEvents: "none",
            }}
            animate={{ y: hovered ? -6 : 0, opacity: hovered ? 0 : 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <Icon size={20} strokeWidth={1.8} />
          </motion.div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(255,255,255,0.88)",
                lineHeight: 1.3,
              }}
            >
              {project.name}
            </div>

            <motion.div
              style={{
                fontSize: 8,
                color: "rgba(255,255,255,0.38)",
                lineHeight: 1.3,
              }}
              animate={{ opacity: hovered ? 1 : 0.4, y: hovered ? 0 : 4 }}
              transition={{ duration: 0.25 }}
            >
              {project.desc}
            </motion.div>
          </div>
        </div>

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
                padding: 8,
              }}
            >
              <div
                style={{
                  fontSize: 8,
                  textAlign: "center",
                  lineHeight: 1.6,
                  color: project.front,
                  fontFamily: "monospace",
                }}
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

export default function ProjectsGrid() {
  return (
    <div>
      <div
        style={{
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
          fontFamily: "monospace",
          marginBottom: 8,
        }}
      >
        ◈ Projects
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCube key={project.name} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
