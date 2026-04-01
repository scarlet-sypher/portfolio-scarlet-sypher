import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IDENTITY_WORDS = [
  "OPERATING IN SILENCE",
  "CONTROLLED CHAOS",
  "PRECISION OVER NOISE",
  "QUIETLY CALCULATING",
  "ZERO WASTED MOTION",
  "DISCIPLINE OVER HYPE",
  "SILENCE IS STRATEGY",
  "CALM UNDER CHAOS",
];

export default function IdentityDial() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setWordIndex((i) => (i + 1) % IDENTITY_WORDS.length),
      3000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.45 }}
      style={{
        paddingBottom: 12,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Word Switch */}
      <div
        className="relative overflow-hidden flex items-center flex-1"
        style={{ height: 22 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={wordIndex}
            className="absolute"
            style={{
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.14em",
              fontFamily: "Inter, SF Pro Display, system-ui, sans-serif",
              background:
                "linear-gradient(90deg, #ffffff, rgba(255,255,255,0.55))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            initial={{ y: "120%", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-120%", opacity: 0, filter: "blur(6px)" }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {IDENTITY_WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
