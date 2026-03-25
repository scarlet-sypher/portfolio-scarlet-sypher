import { motion } from "framer-motion";
import ClockBlock from "./RightColumn/ClockBlock";
import IdentityDial from "./RightColumn/IdentityDial";
import ProjectsGrid from "./RightColumn/ProjectsGrid";
import ResumeButton from "./RightColumn/ResumeButton";
import MusicPlayer from "./RightColumn/MusicPlayer";

export default function RightColumn({ onOpenResume }) {
  return (
    <motion.div
      className="flex flex-col min-h-0 shrink-0"
      style={{
        width: "clamp(160px, 20vw, 220px)",
        borderLeft: "1px solid rgba(255,255,255,0.07)",
        paddingLeft: 16,
        gap: "clamp(8px, 1.2vh, 12px)",
        overflow: "hidden",
      }}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.35, duration: 0.45 }}
    >
      <ClockBlock />
      <IdentityDial />
      <ProjectsGrid />
      <ResumeButton onView={onOpenResume} />
      <MusicPlayer />
    </motion.div>
  );
}
