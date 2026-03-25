import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Download, FileText, Check } from "lucide-react";
import resumePdf from "../../assets/resume/ayush-jha.pdf";

export default function ResumeButton({ onView }) {
  const [downloaded, setDownloaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const angleRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const grad = ctx.createConicGradient(
        (angleRef.current * Math.PI) / 180,
        W / 2,
        H / 2,
      );

      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.12, "transparent");
      grad.addColorStop(
        0.2,
        hovered ? "rgba(56,189,248,0.92)" : "rgba(56,189,248,0.55)",
      );
      grad.addColorStop(
        0.28,
        hovered ? "rgba(251,146,60,0.78)" : "rgba(251,146,60,0.42)",
      );
      grad.addColorStop(0.36, "transparent");
      grad.addColorStop(1, "transparent");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      angleRef.current = (angleRef.current - (hovered ? 1.1 : 0.5)) % 360;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovered]);

  const handleDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = resumePdf;
    link.download = "ayush-jha-resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2200);
  };

  const handleView = (e) => {
    e.stopPropagation();
    onView?.();
  };

  return (
    <motion.div
      className="flex items-center justify-center w-full"
      style={{ padding: "clamp(6px, 1vh, 10px) 0" }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75, duration: 0.45 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 200,
          borderRadius: 8,
          padding: 1.5,
          overflow: "hidden",
          boxShadow: hovered
            ? "0 0 22px rgba(56,189,248,0.1), 0 8px 32px rgba(0,0,0,0.45)"
            : "0 4px 24px rgba(0,0,0,0.4)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        {/* Rotating conic border via canvas */}
        <canvas
          ref={canvasRef}
          width={200}
          height={116}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            borderRadius: 8,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Inner card */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            borderRadius: 6,
            background:
              "linear-gradient(145deg, rgba(18,18,24,0.98) 0%, rgba(13,13,18,0.99) 100%)",
            padding: "clamp(10px, 1.5vh, 14px) clamp(10px, 1.2vw, 14px)",
            overflow: "hidden",
          }}
        >
          {/* Scan line on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="scan"
                initial={{ top: "-8%" }}
                animate={{ top: "110%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "linear" }}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent, rgba(56,189,248,0.35), rgba(251,146,60,0.25), transparent)",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              />
            )}
          </AnimatePresence>

          {/* Header row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "clamp(8px, 1.2vh, 10px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <motion.div
                animate={{ rotate: hovered ? 8 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <FileText
                  size={9}
                  strokeWidth={2}
                  style={{ color: "rgba(56,189,248,0.5)" }}
                />
              </motion.div>
              <span
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(7px, 0.85vw, 9px)",
                  fontWeight: 700,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "white",
                  userSelect: "none",
                }}
              >
                resume
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
              marginBottom: "clamp(8px, 1.2vh, 10px)",
            }}
          />

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(6px, 1vw, 10px)",
            }}
          >
            <motion.button
              onClick={handleView}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              style={{
                flex: 1,
                height: "clamp(28px, 3.2vh, 34px)",
                borderRadius: 4,
                background: "rgba(56,189,248,0.07)",
                border: "1px solid rgba(56,189,248,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                color: "#38bdf8",
                cursor: "pointer",
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(56,189,248,0.55)";
                e.currentTarget.style.boxShadow =
                  "0 0 12px rgba(56,189,248,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(56,189,248,0.25)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Eye size={11} strokeWidth={2} />
              <span
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(6px, 0.8vw, 8px)",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  userSelect: "none",
                }}
              >
                View
              </span>
            </motion.button>

            <div
              style={{
                width: 1,
                height: 18,
                background: "rgba(255,255,255,0.08)",
                flexShrink: 0,
              }}
            />

            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              style={{
                flex: 1,
                height: "clamp(28px, 3.2vh, 34px)",
                borderRadius: 4,
                background: downloaded
                  ? "rgba(34,197,94,0.09)"
                  : "rgba(251,146,60,0.07)",
                border: downloaded
                  ? "1px solid rgba(34,197,94,0.38)"
                  : "1px solid rgba(251,146,60,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                color: downloaded ? "#22c55e" : "#fb923c",
                cursor: "pointer",
                outline: "none",
                transition: "all 0.35s ease",
              }}
            >
              <AnimatePresence mode="wait">
                {downloaded ? (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0, scale: 0.65 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.65 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontFamily: "'Courier New', monospace",
                      fontSize: "clamp(6px, 0.8vw, 8px)",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      userSelect: "none",
                    }}
                  >
                    <Check size={10} strokeWidth={2.5} />
                    Saved
                  </motion.span>
                ) : (
                  <motion.span
                    key="dl"
                    initial={{ opacity: 0, scale: 0.65 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.65 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <Download size={11} strokeWidth={2} />
                    <span
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "clamp(6px, 0.8vw, 8px)",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        userSelect: "none",
                      }}
                    >
                      Save
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Bottom glow */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.35 }}
            style={{
              position: "absolute",
              bottom: 0,
              left: "10%",
              right: "10%",
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), rgba(251,146,60,0.4), transparent)",
              borderRadius: 1,
              transformOrigin: "center",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
