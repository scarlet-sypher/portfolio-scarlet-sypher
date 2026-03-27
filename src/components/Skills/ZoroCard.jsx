import { useState } from "react";

function Circuit({ color }) {
  return (
    <svg
      viewBox="0 0 200 52"
      style={{ width: "100%", height: 44, display: "block" }}
    >
      <line
        x1="4"
        y1="40"
        x2="196"
        y2="40"
        stroke={color}
        strokeWidth="0.7"
        strokeOpacity="0.35"
      />
      {[22, 52, 82, 112, 140, 166].map((x, i) => (
        <g key={i}>
          <line
            x1={x}
            y1="40"
            x2={x}
            y2={26 - (i % 3) * 5}
            stroke={color}
            strokeWidth="0.7"
            strokeOpacity="0.45"
          />
          <line
            x1={x}
            y1={26 - (i % 3) * 5}
            x2={x + 8}
            y2={14 - (i % 2) * 5}
            stroke={color}
            strokeWidth="0.7"
            strokeOpacity="0.45"
          />
          <circle
            cx={x + 8}
            cy={12 - (i % 2) * 5}
            r="2.2"
            fill="none"
            stroke={color}
            strokeWidth="0.85"
            strokeOpacity="0.65"
          />
        </g>
      ))}
    </svg>
  );
}

function SoftChip({ label, accent, dark }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "4px 12px",
        borderRadius: 99,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.03em",
        background: hov ? `${accent}22` : `${accent}0d`,
        border: `1px solid ${accent}42`,
        color: accent,
        cursor: "default",
        transition: "all 0.2s",
        transform: hov ? "scale(1.07)" : "none",
        boxShadow: hov ? `0 0 12px ${accent}40` : "none",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {label}
    </span>
  );
}

export default function ZoroCard({ zoroImg, soft, dark, isMaximized }) {
  const accent = "#22d3ee";
  const [hov, setHov] = useState(false);
  const cardW = isMaximized ? 400 : 300;
  const imgH = isMaximized ? 420 : 320;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: isMaximized ? 260 : 200,
          height: imgH,
          position: "relative",
          zIndex: 10,
          marginBottom: -80,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            width: "120%",
            height: "35%",
            background: `radial-gradient(ellipse, ${accent}20 0%, transparent 70%)`,
            filter: "blur(14px)",
            pointerEvents: "none",
          }}
        />
        <img
          src={zoroImg}
          alt="Zoro"
          style={{
            height: "120%",
            width: "auto",
            objectFit: "contain",
            objectPosition: "bottom",
            transform: "scale(1.2) translateY(-100px)",
            filter: `drop-shadow(0 6px 24px ${accent}50)`,
            position: "relative",
            zIndex: 1,
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: "relative",
          width: cardW,
          zIndex: 2,
          transition: "transform 0.32s cubic-bezier(0.34,1.56,0.64,1)",
          transform: hov ? "translateY(-5px)" : "translateY(0)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 22,
            border: `2px solid ${accent}`,
            filter: "url(#ef-zoro)",
            pointerEvents: "none",
            zIndex: 3,
            opacity: hov ? 1 : 0.72,
            transition: "opacity 0.3s",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 22,
            border: `2px solid ${accent}50`,
            filter: "blur(3.5px)",
            pointerEvents: "none",
            zIndex: 2,
            opacity: hov ? 1 : 0.6,
            transition: "opacity 0.3s",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 22,
            border: `2px solid ${accent}22`,
            filter: "blur(10px)",
            pointerEvents: "none",
            zIndex: 1,
            opacity: hov ? 1 : 0.5,
            transition: "opacity 0.3s",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 4,
            borderRadius: 22,
            padding: isMaximized ? "30px 30px 22px" : "22px 22px 16px",
            background: dark ? "rgba(6,7,20,0.82)" : "rgba(244,245,255,0.88)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            border: dark
              ? "1px solid rgba(255,255,255,0.045)"
              : "1px solid rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: isMaximized ? 14 : 10,
            boxShadow: hov
              ? `0 20px 60px ${accent}22`
              : dark
                ? "0 6px 28px rgba(0,0,0,0.5)"
                : "0 4px 18px rgba(0,0,0,0.07)",
            transition: "box-shadow 0.3s",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: isMaximized ? 20 : 16,
                letterSpacing: "0.1em",
                color: accent,
                lineHeight: 1,
                marginBottom: 4,
              }}
            >
              Soft Skills
            </div>
            <div
              style={{
                fontSize: 8,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: dark ? "rgba(255,255,255,0.26)" : "rgba(0,0,0,0.3)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              Human OS · Always Adapting
            </div>
          </div>

          <div
            style={{
              height: 1,
              background: `linear-gradient(90deg, transparent, ${accent}65, transparent)`,
            }}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: isMaximized ? 8 : 6,
              justifyContent: "center",
            }}
          >
            {soft.map((s) => (
              <SoftChip key={s} label={s} accent={accent} dark={dark} />
            ))}
          </div>

          <div
            style={{
              height: 1,
              background: dark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.06)",
            }}
          />
          <Circuit color={accent} />
        </div>
      </div>
    </div>
  );
}
