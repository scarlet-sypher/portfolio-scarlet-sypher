import { useState } from "react";
import { Code2 } from "lucide-react";

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

function TechRow({ name, dark, logoMap }) {
  const logo = logoMap[name];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          border: dark
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {logo ? (
          <img
            src={logo?.url}
            alt={name}
            style={{
              width: 14,
              height: 14,
              objectFit: "contain",
              filter:
                dark && (name === "Express.js" || name === "GitHub")
                  ? "invert(0.8)"
                  : "none",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <Code2
            size={11}
            style={{
              color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.3)",
            }}
          />
        )}
      </div>
      <span
        style={{
          fontSize: 11.5,
          fontWeight: 500,
          color: dark ? "rgba(255,255,255,0.80)" : "rgba(0,0,0,0.76)",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.01em",
        }}
      >
        {name}
      </span>
    </div>
  );
}

export default function TechStackCardWithAnime({
  id,
  anime,
  animeAlt,
  accent,
  title,
  subtitle,
  items,
  note,
  dark,
  isMaximized,
  flip,
  logoMap,
}) {
  const [hov, setHov] = useState(false);
  const animeH = isMaximized ? 420 : 300;
  const animeW = isMaximized ? 340 : 250;
  const cardW = isMaximized ? 250 : 210;
  const connW = isMaximized ? 56 : 44;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: flip ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: 0,
        position: "relative",
      }}
    >
      <div
        style={{
          width: animeW,
          height: animeH,
          flexShrink: 0,
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "85%",
            height: "28%",
            background: `radial-gradient(ellipse, ${accent}20 0%, transparent 70%)`,
            filter: "blur(14px)",
            pointerEvents: "none",
          }}
        />
        <img
          src={anime}
          alt={animeAlt}
          style={{
            height: "100%",
            width: animeW,
            objectFit: "contain",
            objectPosition: "bottom",
            filter: `drop-shadow(0 8px 30px ${accent}40)`,
            display: "block",
            position: "relative",
            zIndex: 1,
            transition: "filter 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = `drop-shadow(0 12px 42px ${accent}70)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = `drop-shadow(0 8px 30px ${accent}40)`;
          }}
          onError={(e) => {
            e.currentTarget.style.opacity = "0";
          }}
        />
      </div>

      <div
        style={{
          width: connW,
          flexShrink: 0,
          alignSelf: "center",
          display: "flex",
          flexDirection: flip ? "row-reverse" : "row",
          alignItems: "center",
          position: "relative",
          zIndex: 5,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 1.5,
            background: flip
              ? `linear-gradient(270deg, transparent, ${accent}60 45%, ${accent})`
              : `linear-gradient(90deg, transparent, ${accent}60 45%, ${accent})`,
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: accent,
            boxShadow: `0 0 10px ${accent}, 0 0 22px ${accent}70`,
            flexShrink: 0,
          }}
        />
      </div>

      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: "relative",
          width: cardW,
          flexShrink: 0,
          alignSelf: "center",
          transition: "transform 0.32s cubic-bezier(0.34,1.56,0.64,1)",
          transform: hov ? "translateY(-7px)" : "translateY(0)",
          zIndex: hov ? 20 : 3,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 22,
            border: `2px solid ${accent}`,
            filter: `url(#ef-${id})`,
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
            border: `2px solid ${accent}52`,
            filter: "blur(3.5px)",
            pointerEvents: "none",
            zIndex: 2,
            opacity: hov ? 1 : 0.58,
            transition: "opacity 0.3s",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 22,
            border: `2px solid ${accent}22`,
            filter: "blur(11px)",
            pointerEvents: "none",
            zIndex: 1,
            opacity: hov ? 1 : 0.48,
            transition: "opacity 0.3s",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 22,
            background: `radial-gradient(ellipse at 50% 0%, ${accent}12 0%, transparent 60%)`,
            opacity: hov ? 1 : 0,
            transition: "opacity 0.3s",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 4,
            borderRadius: 22,
            padding: isMaximized ? "24px 20px 18px" : "20px 16px 14px",
            background: dark ? "rgba(6,7,20,0.82)" : "rgba(244,245,255,0.88)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            border: dark
              ? "1px solid rgba(255,255,255,0.045)"
              : "1px solid rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: isMaximized ? 12 : 9,
            boxShadow: hov
              ? `0 20px 60px ${accent}22, inset 0 1px 0 rgba(255,255,255,0.05)`
              : dark
                ? "0 6px 28px rgba(0,0,0,0.5)"
                : "0 4px 18px rgba(0,0,0,0.07)",
            transition: "box-shadow 0.3s",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: isMaximized ? 17 : 14,
                letterSpacing: "0.07em",
                color: accent,
                lineHeight: 1,
                marginBottom: 3,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 8,
                fontWeight: 600,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color: dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.3)",
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {subtitle}
            </div>
          </div>

          <div
            style={{
              height: 1,
              background: `linear-gradient(90deg, ${accent}65, ${accent}1a, transparent)`,
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMaximized ? 7 : 5,
            }}
          >
            {items.map((item) => (
              <TechRow key={item} name={item} dark={dark} logoMap={logoMap} />
            ))}
          </div>

          {note && (
            <div
              style={{
                fontSize: 9,
                color: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.28)",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.05em",
              }}
            >
              {note}
            </div>
          )}

          <div
            style={{
              height: 1,
              background: dark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.06)",
            }}
          />

          <Circuit color={accent} />

          <div
            style={{
              position: "absolute",
              [flip ? "right" : "left"]: -5,
              top: "45%",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: accent,
              boxShadow: `0 0 10px ${accent}, 0 0 20px ${accent}75`,
              zIndex: 6,
            }}
          />
        </div>
      </div>
    </div>
  );
}
