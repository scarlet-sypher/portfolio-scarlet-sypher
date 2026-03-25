import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IDENTITY_WORDS = ["ADAPTIVE", "DSA", "SYSTEMS", "BUILDER", "LEADERSHIP"];

export default function IdentityDial() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setWordIndex((i) => (i + 1) % IDENTITY_WORDS.length),
      2400,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      className="flex items-center gap-2.5"
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.38, duration: 0.42 }}
      style={{
        paddingBottom: 10,
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.32)",
          flexShrink: 0,
        }}
      >
        I AM
      </span>

      <div
        className="relative overflow-hidden flex items-center flex-1"
        style={{ height: 20 }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={wordIndex}
            className="absolute"
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.9)",
            }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {IDENTITY_WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "rgba(255,190,60,0.15)",
          border: "1px solid rgba(255,200,80,0.35)",
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
      </div>

      <div
        className="shrink-0 rounded-full overflow-hidden"
        style={{
          width: 28,
          height: 28,
          border: "1.5px solid rgba(255,255,255,0.22)",
          background: "rgba(255,255,255,0.09)",
        }}
      />
    </motion.div>
  );
}
