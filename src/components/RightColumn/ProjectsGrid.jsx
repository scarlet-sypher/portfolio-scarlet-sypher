import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

function ProjectCube({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      style={{ perspective: 600, aspectRatio: "1 / 1", width: "100%" }}
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
            padding: 8,
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
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.3,
            }}
          >
            {project.name}
          </div>
          <div
            style={{
              fontSize: 8,
              marginTop: 2,
              color: "rgba(255,255,255,0.38)",
              lineHeight: 1.3,
            }}
          >
            {project.desc}
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
