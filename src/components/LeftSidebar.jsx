import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, GraduationCap, X } from "lucide-react";

const SIDEBAR_ITEMS = [
  {
    icon: X,
    label: "GitHub",
    hoverLabel: "GitHub",
    href: "https://github.com/your-username",
  },
  {
    icon: X,
    label: "LinkedIn",
    hoverLabel: "LinkedIn",
    href: "https://linkedin.com/in/your-username",
  },
  {
    icon: Mail,
    label: "Email",
    hoverLabel: "your-email@example.com",
    href: "mailto:your-email@example.com",
  },
  {
    icon: GraduationCap,
    label: "College",
    hoverLabel: "Your College Name",
    href: "https://your-college.edu",
  },
];

const glassPanel = {
  background: "rgba(255, 255, 255, 0.09)",
  backdropFilter: "blur(24px) saturate(160%)",
  WebkitBackdropFilter: "blur(24px) saturate(160%)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)",
};

const iconButtonStyle = {
  background: "rgba(0, 0, 0, 0.30)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  color: "rgba(255, 255, 255, 0.55)",
};

const containerVariants = {
  hidden: { opacity: 0, x: -18 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.065,
      delayChildren: 0.2,
    },
  },
};

const iconsContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const iconItemVariants = {
  hidden: { opacity: 0, y: 6, scale: 0.85 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.85,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

const labelVariants = {
  hidden: { opacity: 0, x: -10, scaleX: 0.85 },
  show: {
    opacity: 1,
    x: 0,
    scaleX: 1,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -6,
    scaleX: 0.9,
    transition: { duration: 0.13, ease: "easeIn" },
  },
};

function SearchBadge() {
  return (
    <div
      className="w-10 h-10 flex items-center justify-center rounded-full select-none"
      style={{
        ...iconButtonStyle,
        fontFamily: "Georgia, serif",
        fontSize: "15px",
        fontWeight: 600,
        fontStyle: "italic",
        color: "rgba(255,255,255,0.55)",
        cursor: "default",
        letterSpacing: "0.01em",
      }}
      aria-hidden="true"
    >
      S
    </div>
  );
}

function IconButton({ item }) {
  const [hovered, setHovered] = useState(false);
  const { icon: Icon, href, hoverLabel, label } = item;

  return (
    <div className="relative" style={{ width: 40, height: 40 }}>
      <motion.button
        className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
        style={iconButtonStyle}
        variants={iconItemVariants}
        whileHover={{
          scale: 1.16,
          color: "rgba(255,255,255,0.92)",
          background: "rgba(255,255,255,0.14)",
          boxShadow: "0 0 12px rgba(255,255,255,0.08)",
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
        aria-label={label}
      >
        <Icon size={15} strokeWidth={1.8} />
      </motion.button>

      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute flex items-center px-3"
            style={{
              left: "calc(100% + 8px)",
              top: "50%",
              y: "-50%",
              height: 30,
              borderRadius: 999,
              transformOrigin: "left center",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 50,
              ...glassPanel,
              background: "rgba(255,255,255,0.11)",
            }}
            variants={labelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <span
              style={{
                color: "rgba(255,255,255,0.88)",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.025em",
                fontFamily:
                  "'SF Pro Text', 'Helvetica Neue', Helvetica, sans-serif",
              }}
            >
              {hoverLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LeftSidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="absolute z-30 top-1/2 -translate-y-1/2"
      style={{ left: 20 }}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="relative flex flex-col items-center gap-3 px-3"
        style={{
          ...glassPanel,
          borderRadius: 28,
          overflow: "visible",
          cursor: expanded ? "default" : "pointer",
        }}
        animate={{
          paddingTop: expanded ? 16 : 12,
          paddingBottom: expanded ? 16 : 12,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={!expanded ? () => setExpanded(true) : undefined}
        whileHover={
          !expanded
            ? {
                scale: 1.07,
                boxShadow:
                  "0 12px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.16)",
              }
            : {}
        }
      >
        <AnimatePresence initial={false} mode="wait">
          {!expanded ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.22 }}
            >
              <SearchBadge />
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              className="flex flex-col items-center gap-3"
              variants={iconsContainerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.div variants={iconItemVariants}>
                <SearchBadge />
              </motion.div>

              {SIDEBAR_ITEMS.map((item, i) => (
                <IconButton key={i} item={item} />
              ))}

              <motion.button
                className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer"
                style={iconButtonStyle}
                variants={iconItemVariants}
                whileHover={{
                  scale: 1.16,
                  color: "rgba(255,120,120,0.9)",
                  background: "rgba(255,80,80,0.12)",
                  boxShadow: "0 0 12px rgba(255,80,80,0.12)",
                }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(false);
                }}
                aria-label="Close sidebar"
              >
                <X size={15} strokeWidth={1.8} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
