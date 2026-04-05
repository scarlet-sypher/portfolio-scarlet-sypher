import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/profile/image.png";
import pp from "../../assets/profile/yyu.png";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function LogoModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const modal = (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(14px) brightness(0.45)",
          WebkitBackdropFilter: "blur(14px) brightness(0.45)",
          background: "rgba(0,0,0,0.55)",
        }}
      >
        <motion.div
          key="modal-content"
          initial={{ opacity: 0, scale: 0.68 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.68 }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: 240,
            height: 240,
            borderRadius: "50%",

            background:
              "radial-gradient(circle at 38% 32%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 70%)",
            border: "1.5px solid rgba(255,255,255,0.22)",
            boxShadow:
              "0 0 0 6px rgba(255,255,255,0.04), 0 12px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(120px, -120px)",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
              fontSize: 14,
              backdropFilter: "blur(6px)",
              zIndex: 100000,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translate(120px, -120px) scale(1.15)";
              e.currentTarget.style.background = "rgba(255,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translate(120px, -120px) scale(1)";
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
            }}
          >
            ✕
          </button>

          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.12, 0.35] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: -10,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.3)",
              pointerEvents: "none",
            }}
          />

          <img
            src={pp}
            alt="logo"
            style={{
              width: 240,
              height: 240,
              objectFit: "cover",
              borderRadius: "50%",
              display: "block",
              filter: "drop-shadow(0 4px 18px rgba(0,0,0,0.5))",
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}

export default function ClockBlock() {
  const [time, setTime] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);

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
    <>
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.45 }}
        style={{
          paddingBottom: 10,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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

          <button
            onClick={() => setModalOpen(true)}
            aria-label="Open logo info"
            title="Logo"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "50%",
              padding: 4,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.65,
              transition: "opacity 0.15s, transform 0.15s, background 0.15s",
              lineHeight: 0,
              flexShrink: 0,
              width: 30,
              height: 30,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "scale(1.18)";
              e.currentTarget.style.background = "rgba(255,255,255,0.14)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.65";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{
                width: 20,
                height: 20,
                objectFit: "contain",
                display: "block",
                borderRadius: "50%",
              }}
            />
          </button>
        </div>

        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.22em",
            marginTop: 5,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {day} {d}/{mo}
        </div>
      </motion.div>

      {modalOpen && <LogoModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
