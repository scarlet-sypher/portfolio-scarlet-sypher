import { motion } from "framer-motion";
import heroAvatar from "../../assets/zoro.png";

export default function HeroCharacter() {
  return (
    <motion.div
      className="absolute z-20 pointer-events-none"
      style={{
        left: 108,
        right: 16,
        top: 0,
        bottom: 96,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingLeft: 500,
        paddingRight: 268,
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute"
        style={{
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 320,
          height: 220,
          background: "radial-gradient(ellipse at 50% 90%, rgba(200, 110, 20, 0.38) 0%, rgba(180, 80, 10, 0.18) 45%, transparent 75%)",
          filter: "blur(18px)",
          pointerEvents: "none",
        }}
      />

      <motion.img
        src={heroAvatar}
        alt="hero character"
        style={{
          height: "100%",
          width: "auto",
          objectFit: "contain",
          objectPosition: "bottom center",
          filter: "drop-shadow(0 -8px 32px rgba(200, 100, 10, 0.35)) drop-shadow(0 12px 24px rgba(0,0,0,0.8))",
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
