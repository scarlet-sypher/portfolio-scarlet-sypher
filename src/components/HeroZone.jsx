import { motion } from "framer-motion";

// HeroZone is the flexible center column — the HeroCharacter sits above this
// as an absolutely positioned overlay, so we just need the text content at the bottom.
export default function HeroZone() {
  return (
    <div
      className="flex-1 relative flex flex-col justify-end min-w-0"
      style={{
        paddingBottom: 20,
        paddingLeft: 16,
        // Prevents this column from shrinking so aggressively that the
        // hero character loses its visual center
        minWidth: "180px",
      }}
    >
      <div className="absolute top-2 right-2 text-[9px] tracking-[0.3em] uppercase text-white/15">
        Portfolio V2.0
      </div>

      <div className="relative z-10">
        <motion.p
          className="text-[10px] tracking-[0.4em] uppercase mb-1"
          style={{ color: "rgba(255, 165, 60, 0.88)" }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Hi, I'm
        </motion.p>
        <motion.h1
          className="text-5xl font-black leading-none mb-1.5"
          style={{
            fontFamily: "'Courier New', monospace",
            color: "rgba(255, 255, 255, 0.96)",
            textShadow: "0 2px 20px rgba(0,0,0,0.8)",
            // Scale down on tighter viewports without breaking layout
            fontSize: "clamp(2rem, 4vw, 3rem)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.88 }}
        >
          Ayush Jha
        </motion.h1>
        <motion.p
          className="text-xs tracking-[0.25em] text-white/40"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.96 }}
        >
          Full Stack Developer
        </motion.p>
      </div>
    </div>
  );
}
