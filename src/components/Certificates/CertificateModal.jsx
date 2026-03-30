import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CertificateModal({ cert, category, onClose }) {
  if (!cert) return null;

  const pdfPath = `/src/assets/certificates/${category}/${cert.file}`;
  const accentColor = cert.colorScheme?.accent ?? "rgba(255,255,255,0.5)";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: "min(780px, 90vw)",
            height: "min(560px, 85vh)",
            background: "rgba(10,10,20,0.97)",
            border: `1px solid ${accentColor}33`,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: `0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px ${accentColor}22`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: 3,
              background: cert.colorScheme?.bg ?? accentColor,
              flexShrink: 0,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "13px 18px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 3,
                  height: 14,
                  borderRadius: 2,
                  background: accentColor,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.14em",
                  fontFamily: "'Courier New', monospace",
                  textTransform: "uppercase",
                }}
              >
                {cert.name}
              </span>
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.08, background: "rgba(255,80,70,0.2)" }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(255,255,255,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X size={12} />
            </motion.button>
          </div>

          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <iframe
              src={pdfPath}
              title={cert.name}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "#0e0e1a",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                borderRadius: "0 0 20px 20px",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
