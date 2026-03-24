import { motion } from "framer-motion";
import TopBar from "./TopBar";
import CalendarWidget from "./CalendarWidget";
import HeroZone from "./HeroZone";
import RightColumn from "./RightColumn";

export default function MainPanel() {
  return (
    <motion.div
      className="absolute z-10"
      style={{
        left: 200,
        right: 150,
        top: 80,
        bottom: 150,
        borderRadius: 20,
        background: "rgba(18, 18, 28, 0.55)",
        backdropFilter: "blur(32px) saturate(160%)",
        WebkitBackdropFilter: "blur(32px) saturate(160%)",
        border: "1px solid rgba(255, 255, 255, 0.13)",
        boxShadow: "0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
        padding: "22px 24px 24px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 16, scale: 0.978 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
    >
      <TopBar />

      <div className="flex gap-4 flex-1 min-h-0 overflow-hidden">
        <CalendarWidget />
        <HeroZone />
        <RightColumn />
      </div>
    </motion.div>
  );
}
