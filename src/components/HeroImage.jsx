import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import heroAvatar from "../../assets/zoro.png";

export default function HeroImage() {
  return (
    <motion.div
      className="flex-1 relative flex items-end"
      style={{
        borderRadius: 14,
        background: "rgba(0, 0, 0, 0.12)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        minWidth: 0,
        overflow: "visible",
      }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius: 14, overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 80% 70% at 50% 85%, rgba(160, 90, 30, 0.3) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "55%",
            background: "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.35) 55%, transparent 100%)",
          }}
        />
      </div>

      <div className="absolute top-3 right-3 text-[9px] tracking-[0.3em] uppercase z-10 text-white/20">
        Portfolio V2.0
      </div>

      <motion.img
        src={heroAvatar}
        alt="character"
        style={{
          position: "absolute",
          bottom: 0,
          left: "20%",
          transform: "translateX(-50%)",
          height: "110%",
          width: "auto",
          objectFit: "contain",
          objectPosition: "bottom center",
          filter: "drop-shadow(0 -4px 24px rgba(0, 0, 0, 0.5)) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.7))",
          zIndex: 20,
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative p-6 w-full z-10">
        <motion.p
          className="text-[10px] tracking-[0.38em] uppercase mb-1"
          style={{ color: "rgba(255, 165, 60, 0.92)" }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72 }}
        >
          Hi, I'm
        </motion.p>
        <motion.h1
          className="text-4xl font-black leading-none mb-1"
          style={{
            fontFamily: "'Courier New', monospace",
            color: "rgba(255, 255, 255, 0.97)",
            textShadow: "0 2px 16px rgba(0,0,0,0.7)",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Ayush Jha
        </motion.h1>
        <motion.p
          className="text-xs tracking-widest mb-5 text-white/40"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.87 }}
        >
          Full Stack Developer
        </motion.p>

        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.94 }}
        >
          <motion.button
            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-bold tracking-widest"
            style={{
              background: "rgba(185, 100, 30, 0.75)",
              border: "1px solid rgba(255, 165, 60, 0.42)",
              color: "rgba(255, 228, 170, 0.97)",
            }}
            whileHover={{
              background: "rgba(210, 120, 40, 0.90)",
              boxShadow: "0 0 22px rgba(255, 140, 40, 0.32)",
              scale: 1.04,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
          >
            View Projects
            <ArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </motion.button>

          <motion.button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-bold tracking-widest"
            style={{
              background: "rgba(255, 255, 255, 0.09)",
              border: "1px solid rgba(255, 255, 255, 0.20)",
              color: "rgba(255, 255, 255, 0.65)",
            }}
            whileHover={{ background: "rgba(255, 255, 255, 0.17)", scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
          >
            <MessageSquare size={12} />
            Contact Me
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
