import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ClockBlock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const h = String(time.getHours()).padStart(2, "0");
  const m = String(time.getMinutes()).padStart(2, "0");
  const day = DAYS[time.getDay()];
  const d = String(time.getDate()).padStart(2, "0");
  const mo = String(time.getMonth() + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.45 }}
      style={{
        paddingBottom: 10,
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        style={{
          fontFamily: "'Courier New', monospace",
          color: "rgba(255,255,255,0.92)",
          textShadow: "0 2px 16px rgba(0,0,0,0.6)",
          fontSize: "clamp(1.1rem, 2vw, 1.75rem)",
          fontWeight: 700,
          letterSpacing: "0.08em",
          lineHeight: 1,
        }}
      >
        {h}:{m}
      </div>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.22em",
          marginTop: 4,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        {day} {d}/{mo}
      </div>
    </motion.div>
  );
}
