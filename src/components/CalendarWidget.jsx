import { useMemo } from "react";
import { motion } from "framer-motion";

const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];

function generateCalendarData() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  const monthName = now.toLocaleString("default", { month: "long" });
  const today = now.getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const cells = Array.from({ length: firstDayIndex }, () => null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }
  
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  
  return { monthName, today, cells };
}

export default function CalendarWidget() {
  const { monthName, today, cells } = useMemo(() => generateCalendarData(), []);

  return (
    <motion.div
      className="flex flex-col shrink-0"
      style={{
        width: "185px",
        borderRight: "1px solid rgba(255, 255, 255, 0.07)",
        paddingRight: "16px",
      }}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.45 }}
    >
      <div
        className="text-base font-semibold mb-4 tracking-wide text-white/90"
        style={{ fontFamily: "'Courier New', monospace" }}
      >
        {monthName}
      </div>

      <div className="grid grid-cols-7 mb-2">
        {DAYS_OF_WEEK.map((day, i) => (
          <div
            key={i}
            className="text-center text-[9px] font-semibold tracking-wide text-white/30"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          const isToday = day === today;
          
          return (
            <div
              key={i}
              className="flex items-center justify-center text-[11px] rounded-full"
              style={{
                aspectRatio: "1 / 1",
                color: day ? (isToday ? "#fff" : "rgba(255, 255, 255, 0.6)") : "transparent",
                background: isToday ? "rgba(255, 255, 255, 0.18)" : "transparent",
                fontWeight: isToday ? 700 : 400,
              }}
            >
              {day || ""}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
