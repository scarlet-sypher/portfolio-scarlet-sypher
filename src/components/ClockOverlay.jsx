import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ClockOverlay() {
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
    <motion.div
      className="absolute z-30 top-5 left-24 text-left pointer-events-none select-none"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.45 }}
    >
      <div
        className="text-4xl font-bold tracking-widest leading-none"
        style={{
          fontFamily: "'Courier New', monospace",
          color: "rgba(255,255,255,0.92)",
          textShadow: "0 2px 16px rgba(0,0,0,0.6)",
        }}
      >
        {formattedHour}:{formattedMinute}
      </div>
      <div
        className="text-[11px] tracking-[0.22em] mt-1 uppercase"
        style={{ color: "rgba(255,255,255,0.38)" }}
      >
        {dayName} {paddedDate}/{paddedMonth}
      </div>
    </motion.div>
  );
}
