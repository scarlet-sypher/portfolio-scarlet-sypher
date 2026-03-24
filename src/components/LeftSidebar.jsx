import { motion } from "framer-motion";
import { Search, Music, Camera, BookOpen, Image, X } from "lucide-react";

const SIDEBAR_ICONS = [Search, Music, Camera, BookOpen, Image, X];

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

const itemVariants = {
  hidden: { opacity: 0, x: -8, scale: 0.82 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function LeftSidebar() {
  return (
    <motion.div
      className="absolute z-30 top-1/2 -translate-y-1/2"
      style={{ left: 20 }}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div
        className="flex flex-col items-center gap-3 py-4 px-3 rounded-[28px]"
        style={{
          background: "rgba(255, 255, 255, 0.09)",
          backdropFilter: "blur(24px) saturate(160%)",
          WebkitBackdropFilter: "blur(24px) saturate(160%)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {SIDEBAR_ICONS.map((Icon, i) => (
          <motion.button
            key={i}
            className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200"
            style={{
              background: "rgba(0, 0, 0, 0.30)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "rgba(255, 255, 255, 0.55)",
            }}
            variants={itemVariants}
            whileHover={{
              scale: 1.16,
              color: "rgba(255,255,255,0.92)",
              background: "rgba(255,255,255,0.14)",
              boxShadow: "0 0 12px rgba(255,255,255,0.08)",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
          >
            <Icon size={15} strokeWidth={1.8} />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
