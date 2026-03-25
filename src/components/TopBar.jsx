import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IDENTITY_WORDS = ["ADAPTIVE", "DSA", "SYSTEMS", "BUILDER", "LEADERSHIP"];

function IdentityDial() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setWordIndex((i) => (i + 1) % IDENTITY_WORDS.length),
      2400,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <span
        className="text-[11px] tracking-[0.3em] uppercase"
        style={{ color: "rgba(255, 255, 255, 0.35)" }}
      >
        I AM
      </span>
      <div
        className="relative overflow-hidden flex items-center"
        style={{ height: "22px", minWidth: "132px" }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={wordIndex}
            className="absolute text-sm font-bold tracking-[0.22em]"
            style={{ color: "rgba(255, 255, 255, 0.92)" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {IDENTITY_WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
      {/* Pulse indicator */}
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: "rgba(255, 190, 60, 0.15)",
          border: "1px solid rgba(255, 200, 80, 0.38)",
        }}
      >
        <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
      </div>
      {/* Avatar placeholder */}
      <div
        className="w-8 h-8 rounded-full overflow-hidden shrink-0"
        style={{
          border: "1.5px solid rgba(255, 255, 255, 0.25)",
          background: "rgba(255, 255, 255, 0.10)",
        }}
      />
    </div>
  );
}

export default function TopBar() {
  return (
    <motion.div
      className="flex items-center justify-end shrink-0"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.45 }}
    >
      <IdentityDial />
    </motion.div>
  );
}
