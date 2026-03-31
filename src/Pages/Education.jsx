import { useState, useRef, useCallback } from "react";
import EducationSlider from "../components/Education/EducationSlider";

const noiseStyle = {
  position: "absolute",
  inset: 0,
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
  backgroundSize: "180px",
  pointerEvents: "none",
  zIndex: 1,
  borderRadius: "inherit",
};

function Blob({ style, color, size }) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(40px)",
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
    />
  );
}

export default function Education({ isMaximized = false }) {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 14,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 10,
    });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        .edu-scroll::-webkit-scrollbar { width: 3px; }
        .edu-scroll::-webkit-scrollbar-track { background: transparent; }
        .edu-scroll::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.35); border-radius: 2px; }
      `}</style>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(145deg, #0a0a1a 0%, #0d0d2b 45%, #0f0a20 100%)",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div style={noiseStyle} />

        <Blob
          color="rgba(99,102,241,0.22)"
          size={isMaximized ? 340 : 220}
          style={{
            top: -60,
            right: -60,
            transform: `translate(${mouse.x * 0.4}px, ${mouse.y * 0.3}px)`,
            transition: "transform 0.4s ease-out",
          }}
        />
        <Blob
          color="rgba(34,211,238,0.14)"
          size={isMaximized ? 280 : 180}
          style={{
            bottom: -40,
            left: -40,
            transform: `translate(${mouse.x * -0.3}px, ${mouse.y * -0.25}px)`,
            transition: "transform 0.4s ease-out",
          }}
        />
        <Blob
          color="rgba(167,139,250,0.12)"
          size={isMaximized ? 200 : 130}
          style={{
            top: "40%",
            left: "30%",
            transform: `translate(${mouse.x * 0.2}px, ${mouse.y * 0.2}px)`,
            transition: "transform 0.5s ease-out",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(99,102,241,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          className="edu-scroll"
          style={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            overflowY: "auto",
            padding: isMaximized ? "16px 24px 16px" : "8px 10px 8px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              gap: isMaximized ? 12 : 8,
              marginBottom: isMaximized ? 16 : 6,
              flexShrink: 0,
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: isMaximized ? 44 : 28,
                fontFamily: "'DM Serif Display', serif",
                background:
                  "linear-gradient(135deg, #c7d2fe 0%, #818cf8 40%, #6366f1 70%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                filter: "drop-shadow(0 0 18px rgba(99,102,241,0.35))",
              }}
            >
              ACADEMIC JOURNEY
            </h1>
          </div>

          {/* ── Glass card wrapper ── */}
          <div
            style={{
              maxWidth: isMaximized ? "90%" : "100%",
              flex: 1,
              minHeight: 0,
              margin: "0 auto",
              width: "100%",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(24px) saturate(160%)",
              WebkitBackdropFilter: "blur(24px) saturate(160%)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: isMaximized ? 24 : 18,
              padding: isMaximized ? "36px 40px" : "22px 20px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <EducationSlider isMaximized={isMaximized} />
          </div>
        </div>
      </div>
    </>
  );
}
