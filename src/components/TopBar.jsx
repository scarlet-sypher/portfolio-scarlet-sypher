import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IDENTITY_WORDS = ["ADAPTIVE", "DSA", "SYSTEMS", "BUILDER", "LEADERSHIP"];
const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function LiveClock() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const formattedHour = String(time.getHours()).padStart(2, "0");
  const formattedMinute = String(time.getMinutes()).padStart(2, "0");
  const dayName = DAYS_OF_WEEK[time.getDay()];
  const paddedDate = String(time.getDate()).padStart(2, "0");
  const paddedMonth = String(time.getMonth() + 1).padStart(2, "0");
  
  return (
    <div>
      <div
        className="text-4xl font-bold tracking-widest leading-none"
        style={{ fontFamily: "'Courier New', monospace", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
      >
        {formattedHour}:{formattedMinute}
      </div>
      <div className="text-[11px] tracking-[0.22em] text-white/45 mt-1 uppercase">
        {dayName} {paddedDate}/{paddedMonth}
      </div>
    </div>
  );
}

function IdentitySlot() {
  const [wordIndex, setWordIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => setWordIndex((i) => (i + 1) % IDENTITY_WORDS.length), 2400);
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
      
      <div className="relative overflow-hidden flex items-center h-[22px] min-w-[126px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={wordIndex}
            className="absolute text-sm font-bold tracking-[0.22em]"
            style={{ color: "rgba(255, 255, 255, 0.92)" }}
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-105%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {IDENTITY_WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
      
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: "rgba(255, 190, 60, 0.15)",
          border: "1px solid rgba(255, 200, 80, 0.38)",
        }}
      >
        <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
      </div>
      
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
      className="flex items-center justify-between shrink-0"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.45 }}
    >
      <LiveClock />
      <IdentitySlot />
    </motion.div>
  );
}
