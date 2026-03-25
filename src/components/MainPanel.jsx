import { motion } from "framer-motion";
import EngineerStatus from "./EngineerStatus";
import HeroZone from "./HeroZone";
import RightColumn from "./RightColumn";

export default function MainPanel({ onOpenResume }) {
  return (
    <motion.div
      className="absolute z-10 flex flex-col"
      style={{
        top: 20,
        left: 108,
        right: 16,
        bottom: 96,
        borderRadius: 20,
        background: "rgba(18,18,28,0.55)",
        backdropFilter: "blur(32px) saturate(160%)",
        WebkitBackdropFilter: "blur(32px) saturate(160%)",
        border: "1px solid rgba(255,255,255,0.13)",
        boxShadow:
          "0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
        padding: "clamp(12px, 2vh, 20px)",
        overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 16, scale: 0.978 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
    >
      {/* MAIN FLEX ROW */}
      <div className="flex flex-1 min-h-0 w-full overflow-hidden gap-3">
        {/* LEFT */}
        <EngineerStatus />

        {/* CENTER */}
        <div className="flex-1 min-w-0 flex">
          <HeroZone />
        </div>

        {/* RIGHT */}
        <RightColumn onOpenResume={onOpenResume} />
      </div>
    </motion.div>
  );
}
