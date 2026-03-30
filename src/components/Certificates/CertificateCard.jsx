import { useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const CERT_COLORS = [
  {
    bg: "linear-gradient(145deg,#ff6b6b,#ee0979)",
    accent: "#ff6b6b",
    text: "#fff",
  },
  {
    bg: "linear-gradient(145deg,#f7971e,#ffd200)",
    accent: "#ffd200",
    text: "#1a1000",
  },
  {
    bg: "linear-gradient(145deg,#43e97b,#38f9d7)",
    accent: "#43e97b",
    text: "#002a1a",
  },
  {
    bg: "linear-gradient(145deg,#4facfe,#00f2fe)",
    accent: "#4facfe",
    text: "#001833",
  },
  {
    bg: "linear-gradient(145deg,#a18cd1,#fbc2eb)",
    accent: "#c084fc",
    text: "#1a0028",
  },
  {
    bg: "linear-gradient(145deg,#f093fb,#f5576c)",
    accent: "#f093fb",
    text: "#1a0015",
  },
  {
    bg: "linear-gradient(145deg,#4481eb,#04befe)",
    accent: "#04befe",
    text: "#001833",
  },
  {
    bg: "linear-gradient(145deg,#fa709a,#fee140)",
    accent: "#fa709a",
    text: "#1a0010",
  },
  {
    bg: "linear-gradient(145deg,#30cfd0,#330867)",
    accent: "#30cfd0",
    text: "#000d33",
  },
  {
    bg: "linear-gradient(145deg,#a1ffce,#faffd1)",
    accent: "#a1ffce",
    text: "#001a10",
  },
];

export default function CertificateCard({
  cert,
  categoryKey,
  categoryColor,
  onView,
  index,
}) {
  const [hovered, setHovered] = useState(false);
  const cs = CERT_COLORS[index % CERT_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.045,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered
          ? `0 16px 40px rgba(0,0,0,0.5), 0 0 0 1.5px ${cs.accent}55`
          : "0 4px 14px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-3px)" : "translateY(0px)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      <div
        style={{
          background: hovered ? cs.bg : "rgba(26,26,40,0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: hovered
            ? "1px solid rgba(255,255,255,0.26)"
            : "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
          transition: "background 0.3s, border 0.3s",
        }}
      >
        {hovered && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
              borderRadius: "16px 16px 0 0",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
        )}

        <div
          style={{
            height: 118,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            background: hovered
              ? "rgba(0,0,0,0.14)"
              : `linear-gradient(140deg, ${cs.accent}16, rgba(255,255,255,0.02))`,
            transition: "background 0.3s",
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke={hovered ? "rgba(255,255,255,0.9)" : cs.accent}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transition: "stroke 0.25s, transform 0.25s",
              transform: hovered ? "scale(1.1)" : "scale(1)",
              filter: hovered
                ? "drop-shadow(0 2px 8px rgba(0,0,0,0.3))"
                : "none",
            }}
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="9" y1="13" x2="15" y2="13" />
            <line x1="9" y1="17" x2="11" y2="17" />
          </svg>
        </div>

        <div
          style={{
            padding: "10px 13px 13px",
            background: hovered ? "rgba(0,0,0,0.26)" : "rgba(8,8,18,0.7)",
            borderTop: hovered
              ? "1px solid rgba(255,255,255,0.13)"
              : "1px solid rgba(255,255,255,0.05)",
            transition: "background 0.3s, border-top 0.3s",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: hovered
                ? "rgba(255,255,255,0.95)"
                : "rgba(255,255,255,0.5)",
              letterSpacing: "0.03em",
              transition: "color 0.2s",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginBottom: 8,
            }}
          >
            {cert.name}
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onView(cert);
            }}
            whileHover={{ scale: 1.04, filter: "brightness(1.1)" }}
            whileTap={{ scale: 0.93 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              width: "100%",
              padding: "7px 0",
              borderRadius: 10,
              background: hovered ? cs.accent : "rgba(255,255,255,0.07)",
              border: hovered ? "none" : "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: hovered ? (cs.text ?? "#fff") : "rgba(255,255,255,0.5)",
              transition: "background 0.25s, color 0.25s",
            }}
          >
            <Eye size={11} />
            VIEW
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
