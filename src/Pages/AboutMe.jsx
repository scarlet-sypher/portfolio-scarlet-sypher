import { useRef, useState, useCallback } from "react";
import { Sun, MoonStar } from "lucide-react";

import big from "../assets/about/big.jpeg";
import small from "../assets/about/small.jpeg";
import profile from "../assets/profile/yyu.png";

const CONTENT = {
  bio: [
    {
      id: 1,
      badge: "INTRODUCTION",
      text: "I'm a 3rd-year BTech Computer Science student focused on full-stack development and system design, with a strong emphasis on building scalable, production-grade applications using the MERN stack.",
    },
    {
      id: 2,
      badge: "EXPERIENCE",
      text: "I have hands-on experience designing and developing end-to-end systems using React.js, Node.js, Express.js, and MongoDB, including delivering a complete web platform during my internship at Orbosis Global. My work involved building modular RESTful APIs, designing efficient database schemas, and integrating backend services with both web and Android applications.",
    },
    {
      id: 3,
      badge: "ARCHITECTURE",
      text: "I approach development from a system design perspective, structuring applications with clear separation of concerns, scalable architecture, and optimized data handling. I have built systems with multi-stage workflows, real-time communication using Socket.IO, and secure authentication using JWT and OAuth.",
    },
    {
      id: 4,
      badge: "PROBLEM SOLVING",
      text: "Alongside development, I have solved 150+ DSA problems, strengthening my ability to design efficient algorithms and handle complex problem-solving scenarios, which directly supports my backend and system-level thinking.",
    },
    {
      id: 5,
      badge: "GOALS",
      text: "My goal is to grow into a software engineer capable of designing and building large-scale, high-performance systems that solve meaningful problems.",
    },
  ],
  stack: [
    { label: "React.js", x: 12, y: 10, rot: -3 },
    { label: "Node.js", x: 58, y: 6, rot: 4 },
    { label: "MongoDB", x: 6, y: 42, rot: -5 },
    { label: "Express.js", x: 44, y: 38, rot: 3 },
    { label: "Socket.IO", x: 10, y: 70, rot: 2 },
    { label: "JWT", x: 60, y: 66, rot: -4 },
    { label: "OAuth", x: 38, y: 72, rot: 5 },
    { label: "REST APIs", x: 22, y: 54, rot: -2 },
  ],
};

const BADGE_PALETTES = {
  light: [
    { bg: "#c89a6a", color: "#fff8f0" },
    { bg: "#3a2010", color: "#f5ede0" },
    { bg: "#7a5230", color: "#fff8f0" },
    { bg: "#a07040", color: "#fff8f0" },
    { bg: "#5a3d20", color: "#fff8f0" },
    { bg: "#b87840", color: "#fff8f0" },
  ],
  dark: [
    { bg: "#c89a6a", color: "#1a0e06" },
    { bg: "#e8c89a", color: "#1a0e06" },
    { bg: "#f0d4a8", color: "#2a1808" },
    { bg: "#b07840", color: "#fff8f0" },
    { bg: "#d4a870", color: "#1a0e06" },
    { bg: "#8a6040", color: "#fff8f0" },
  ],
};

const THEMES = {
  light: {
    bg: "linear-gradient(145deg, #f5ede0 0%, #ecdcc8 50%, #e8d4b8 100%)",
    card0: "rgba(255,255,255,0.58)",
    card1: "rgba(255,248,238,0.72)",
    cardBorder0: "rgba(255,255,255,0.75)",
    cardBorder1: "rgba(200,154,106,0.2)",
    cardStack: "rgba(58,32,16,0.06)",
    cardStackBorder: "rgba(200,154,106,0.25)",
    bioCard: "rgba(255,255,255,0.52)",
    bioCardBorder: "rgba(255,255,255,0.7)",
    text: "#3a2010",
    textSub: "#7a5230",
    textMono: "#9a6a3a",
    textBody: "#5a3d20",
    profileBg: "linear-gradient(135deg, #d4a574 0%, #a0724a 100%)",
    profileTagBg: "#3a2010",
    profileTagColor: "#f5ede0",
    pill: "rgba(255,255,255,0.55)",
    pillBorder: "rgba(200,154,106,0.3)",
    pillColor: "#5a3d20",
    accent: "#c89a6a",
    accentColor: "#fff8f0",
    orbBorder: "rgba(255,255,255,0.6)",
    orbShadow: "0 12px 40px rgba(120,70,20,0.2)",
    orbShadowSm: "0 6px 20px rgba(120,70,20,0.15)",
    circle1: "rgba(200,154,106,0.18)",
    circle2: "rgba(180,130,80,0.12)",
    leftBorder: "rgba(200,154,106,0.2)",
    toggleBg: "rgba(58,32,16,0.1)",
    toggleBorder: "rgba(200,154,106,0.3)",
    toggleColor: "#7a5230",
    floatBg: "rgba(255,255,255,0.72)",
    floatBorder: "rgba(200,154,106,0.28)",
    floatShadow: "0 8px 32px rgba(120,70,20,0.14), 0 2px 8px rgba(0,0,0,0.06)",
    chipBg: "rgba(200,154,106,0.14)",
    chipBorder: "rgba(200,154,106,0.38)",
    chipColor: "#5a3d20",
  },
  dark: {
    bg: "linear-gradient(145deg, #1a0e06 0%, #231508 50%, #2a1a0a 100%)",
    card0: "rgba(60,34,12,0.72)",
    card1: "rgba(48,28,8,0.82)",
    cardBorder0: "rgba(200,154,106,0.18)",
    cardBorder1: "rgba(200,154,106,0.12)",
    cardStack: "rgba(200,154,106,0.06)",
    cardStackBorder: "rgba(200,154,106,0.2)",
    bioCard: "rgba(50,28,10,0.72)",
    bioCardBorder: "rgba(200,154,106,0.2)",
    text: "#f5ede0",
    textSub: "#c89a6a",
    textMono: "#c89a6a",
    textBody: "#d4b898",
    profileBg: "linear-gradient(135deg, #5a3820 0%, #3a2210 100%)",
    profileTagBg: "#c89a6a",
    profileTagColor: "#1a0e06",
    pill: "rgba(255,255,255,0.06)",
    pillBorder: "rgba(200,154,106,0.25)",
    pillColor: "#d4b898",
    accent: "#c89a6a",
    accentColor: "#1a0e06",
    orbBorder: "rgba(200,154,106,0.35)",
    orbShadow: "0 12px 40px rgba(200,154,106,0.15)",
    orbShadowSm: "0 6px 20px rgba(200,154,106,0.12)",
    circle1: "rgba(200,154,106,0.08)",
    circle2: "rgba(180,130,80,0.06)",
    leftBorder: "rgba(200,154,106,0.15)",
    toggleBg: "rgba(200,154,106,0.12)",
    toggleBorder: "rgba(200,154,106,0.35)",
    toggleColor: "#c89a6a",
    floatBg: "rgba(30,16,6,0.82)",
    floatBorder: "rgba(200,154,106,0.22)",
    floatShadow: "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(200,154,106,0.08)",
    chipBg: "rgba(200,154,106,0.1)",
    chipBorder: "rgba(200,154,106,0.3)",
    chipColor: "#d4b898",
  },
};

const noiseStyle = {
  position: "absolute",
  inset: 0,
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
  backgroundSize: "180px",
  pointerEvents: "none",
  zIndex: 1,
  borderRadius: "inherit",
};

function StackPill({ label, t }) {
  return (
    <span
      style={{
        padding: "4px 11px",
        borderRadius: 20,
        fontSize: 10,
        fontFamily: "'DM Mono', monospace",
        fontWeight: 500,
        letterSpacing: "0.05em",
        background: t.pill,
        border: `1px solid ${t.pillBorder}`,
        color: t.pillColor,
        backdropFilter: "blur(6px)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

function Butterfly({ style, size = 44, opacity = 0.55, dark = false }) {
  const c1 = "#c89a6a";
  const c2 = dark ? "#a07040" : "#b07a4a";
  const cs = dark ? "#8a6040" : "#7a5230";
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 80 58"
      fill="none"
      style={{ opacity, ...style }}
    >
      <ellipse
        cx="20"
        cy="22"
        rx="18"
        ry="14"
        fill={c1}
        opacity="0.7"
        transform="rotate(-18 20 22)"
      />
      <ellipse
        cx="14"
        cy="34"
        rx="12"
        ry="8"
        fill={c2}
        opacity="0.5"
        transform="rotate(-10 14 34)"
      />
      <ellipse
        cx="60"
        cy="22"
        rx="18"
        ry="14"
        fill={c1}
        opacity="0.7"
        transform="rotate(18 60 22)"
      />
      <ellipse
        cx="66"
        cy="34"
        rx="12"
        ry="8"
        fill={c2}
        opacity="0.5"
        transform="rotate(10 66 34)"
      />
      <path
        d="M40 8 Q41 29 40 50"
        stroke={cs}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M36 10 Q34 6 31 4"
        stroke={cs}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M44 10 Q46 6 49 4"
        stroke={cs}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Tag({ label, rotate = 0, accent = false, t }) {
  return (
    <span
      className="tag-chip"
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 6,
        fontSize: 10,
        fontFamily: "'DM Mono', monospace",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        transform: `rotate(${rotate}deg)`,
        background: accent ? t.accent : "rgba(200,154,106,0.15)",
        color: accent ? t.accentColor : t.textSub,
        border: `1px solid ${accent ? "transparent" : "rgba(200,154,106,0.4)"}`,
        boxShadow: accent ? "0 4px 12px rgba(200,154,106,0.3)" : "none",
        whiteSpace: "nowrap",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
    >
      {label}
    </span>
  );
}

function SectionBadge({ label, index, themeKey }) {
  const palette = BADGE_PALETTES[themeKey];
  const { bg, color } = palette[index % palette.length];
  const isRight = index % 2 === 0;
  return (
    <div
      style={{
        position: "absolute",
        top: -10,
        ...(isRight ? { right: 16 } : { left: 16 }),
        background: bg,
        color,
        borderRadius: 6,
        padding: "2px 10px",
        fontSize: 9,
        fontFamily: "'DM Mono', monospace",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        transform: `rotate(${isRight ? 1 : -1}deg)`,
        boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
        whiteSpace: "nowrap",
        zIndex: 5,
        pointerEvents: "none",
        maxWidth: "calc(100% - 32px)",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {label}
    </div>
  );
}

function ThemeToggle({ dark, onToggle, t }) {
  return (
    <button
      onClick={onToggle}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "absolute",
        top: 10,
        right: 12,
        zIndex: 10,
        width: 30,
        height: 30,
        borderRadius: 8,
        background: t.toggleBg,
        border: `1px solid ${t.toggleBorder}`,
        color: t.toggleColor,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        transition: "background 0.25s, border-color 0.25s, transform 0.15s",
        outline: "none",
        padding: 0,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.12)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {dark ? (
        <Sun size={14} strokeWidth={2} />
      ) : (
        <MoonStar size={14} strokeWidth={2} />
      )}
    </button>
  );
}

export default function AboutMe({ isMaximized = false }) {
  const [darkMode, setDarkMode] = useState(false);
  const [hovered, setHovered] = useState(null);

  const [flipped, setFlipped] = useState(false);
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const t = darkMode ? THEMES.dark : THEMES.light;
  const themeKey = darkMode ? "dark" : "light";

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 12,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 8,
    });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        .tag-chip:hover { transform: rotate(0deg) scale(1.07) !important; box-shadow: 0 6px 18px rgba(200,154,106,0.35) !important; }
        .about-card { transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s, background 0.35s, border-color 0.35s; }
        .about-card:hover { transform: translateY(-4px) scale(1.013) !important; box-shadow: 0 18px 52px rgba(120,80,30,0.18) !important; }
        .profile-img { transition: transform 0.4s cubic-bezier(.22,1,.36,1); }
        .profile-img:hover { transform: scale(1.04) rotate(-1deg); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { border-radius: 2px; background: rgba(200,154,106,0.35); }
        .flip-card { perspective: 1000px; cursor: pointer; }
        .flip-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(.4,0,.2,1), box-shadow 0.3s; }
        .flip-inner.flipped { transform: rotateY(180deg); }
        .flip-inner:hover { box-shadow: 0 24px 64px rgba(120,70,20,0.32) !important; }
        .flip-front, .flip-back { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: inherit; overflow: hidden; }
        .flip-back { transform: rotateY(180deg); }
      `}</style>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: t.bg,
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
          transition: "background 0.4s ease",
        }}
      >
        <div style={noiseStyle} />

        <ThemeToggle
          dark={darkMode}
          onToggle={() => setDarkMode((d) => !d)}
          t={t}
        />

        <div
          style={{
            position: "absolute",
            top: isMaximized ? -60 : -40,
            right: isMaximized ? -60 : -40,
            width: isMaximized ? 280 : 180,
            height: isMaximized ? 280 : 180,
            borderRadius: "50%",
            background: t.circle1,
            filter: "blur(1px)",
            zIndex: 0,
            transform: `translate(${mouse.x * 0.4}px, ${mouse.y * 0.3}px)`,
            transition: "transform 0.4s ease-out, background 0.4s",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: isMaximized ? 40 : 20,
            left: isMaximized ? -50 : -30,
            width: isMaximized ? 200 : 130,
            height: isMaximized ? 200 : 130,
            borderRadius: "50%",
            background: t.circle2,
            zIndex: 0,
            transform: `translate(${mouse.x * -0.3}px, ${mouse.y * -0.2}px)`,
            transition: "transform 0.4s ease-out, background 0.4s",
          }}
        />

        <Butterfly
          size={isMaximized ? 52 : 36}
          dark={darkMode}
          opacity={0.5}
          style={{
            position: "absolute",
            top: isMaximized ? 60 : 30,
            left: isMaximized ? 80 : 50,
            zIndex: 2,
            transform: `translate(${mouse.x * 0.7}px, ${mouse.y * 0.5}px)`,
            transition: "transform 0.5s ease-out",
          }}
        />
        <Butterfly
          size={isMaximized ? 36 : 24}
          dark={darkMode}
          opacity={0.38}
          style={{
            position: "absolute",
            bottom: isMaximized ? 80 : 40,
            right: isMaximized ? 120 : 60,
            zIndex: 2,
            transform: `rotate(20deg) translate(${mouse.x * -0.5}px, ${mouse.y * 0.4}px)`,
            transition: "transform 0.5s ease-out",
          }}
        />

        {!isMaximized && (
          <div
            style={{
              position: "relative",
              zIndex: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "24px 28px 20px",
              gap: 16,
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div
                className="about-card profile-img"
                style={{
                  flexShrink: 0,
                  width: 88,
                  height: 108,
                  borderRadius: 14,
                  overflow: "hidden",
                  boxShadow:
                    "0 8px 28px rgba(120,70,20,0.2), 0 2px 6px rgba(0,0,0,0.08)",
                  border: "2.5px solid rgba(255,255,255,0.7)",
                  transform: "rotate(-2.5deg)",
                  background: t.profileBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <img
                  src={small}
                  alt="Profile"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 5,
                    right: 5,
                    background: t.accent,
                    borderRadius: 4,
                    padding: "1px 5px",
                    fontSize: 8,
                    fontFamily: "DM Mono, monospace",
                    color: t.accentColor,
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                  }}
                >
                  3RD YR
                </div>
              </div>

              <div style={{ flex: 1, paddingTop: 4 }}>
                <div
                  style={{
                    fontSize: 9,
                    fontFamily: "DM Mono, monospace",
                    letterSpacing: "0.18em",
                    color: t.textMono,
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  ABOUT ME
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontFamily: "'DM Serif Display', serif",
                    color: t.text,
                    lineHeight: 1.15,
                    marginBottom: 6,
                  }}
                >
                  Ayush Jha
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: t.textSub,
                    lineHeight: 1.4,
                    fontWeight: 400,
                    marginBottom: 10,
                  }}
                >
                  Full-Stack Engineer &<br />
                  CS Student · MERN Stack
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  <Tag label="150+ DSA" rotate={-2} accent t={t} />
                  <Tag label="Orbosis" rotate={1} t={t} />
                </div>
              </div>
            </div>

            <div
              className="about-card"
              style={{
                background: t.bioCard,
                borderRadius: 14,
                padding: "20px 16px 14px",
                backdropFilter: "blur(12px)",
                border: `1px solid ${t.bioCardBorder}`,
                boxShadow: "0 4px 20px rgba(120,80,30,0.08)",
                transform: "rotate(0.4deg)",
                position: "relative",
                marginTop: 8,
              }}
            >
              <SectionBadge
                label="INTRODUCTION"
                index={0}
                themeKey={themeKey}
              />
              <p
                style={{
                  fontSize: 11.5,
                  color: t.textBody,
                  lineHeight: 1.7,
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                {CONTENT.bio[0].text}
              </p>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: 24,
                right: 28,
                background: t.accent,
                borderRadius: 8,
                padding: "5px 12px",
                boxShadow: "0 6px 20px rgba(200,154,106,0.4)",
                transform: "rotate(-3deg)",
                zIndex: 4,
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  fontFamily: "DM Mono, monospace",
                  color: t.accentColor,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                }}
              >
                ONE DAY ONE BUILD ✦
              </span>
            </div>
          </div>
        )}

        {isMaximized && (
          <div
            style={{
              position: "relative",
              zIndex: 3,
              height: "100%",
              display: "grid",
              gridTemplateColumns: "300px 1fr",
              gridTemplateRows: "1fr",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "44px 28px 40px 36px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                borderRight: `1px solid ${t.leftBorder}`,
                overflowY: "auto",
              }}
            >
              <div
                className="about-card flip-card"
                onClick={() => setFlipped((f) => !f)}
                style={{
                  width: "100%",
                  aspectRatio: "4/5",
                  borderRadius: 20,
                  background: t.profileBg,
                  position: "relative",
                  transform: "rotate(-2deg)",
                }}
              >
                <div
                  className={`flip-inner${flipped ? " flipped" : ""}`}
                  style={{
                    boxShadow:
                      "0 16px 48px rgba(120,70,20,0.22), 0 4px 12px rgba(0,0,0,0.08)",
                    border: "3px solid rgba(255,255,255,0.75)",
                    borderRadius: 20,
                  }}
                >
                  <div className="flip-front">
                    <img
                      src={big}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "radial-gradient(ellipse at 30% 20%, rgba(255,220,180,0.15) 0%, transparent 60%)",
                      }}
                    />
                  </div>
                  <div className="flip-back">
                    <img
                      src={profile}
                      alt="Profile alternate"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "radial-gradient(ellipse at 70% 80%, rgba(200,154,106,0.18) 0%, transparent 60%)",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: -8,
                    right: -10,
                    background: t.profileTagBg,
                    borderRadius: 10,
                    padding: "6px 14px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                    transform: "rotate(3deg)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "DM Mono, monospace",
                      color: t.profileTagColor,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                    }}
                  >
                    BTech CSE · 3rd Year
                  </span>
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: "DM Mono, monospace",
                    letterSpacing: "0.2em",
                    color: t.textMono,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  WHO I AM
                </div>
                <div
                  style={{
                    fontSize: 34,
                    fontFamily: "'DM Serif Display', serif",
                    color: t.text,
                    lineHeight: 1.1,
                    marginBottom: 4,
                  }}
                >
                  Ayush
                  <br />
                  <em>Jha</em>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: t.textSub,
                    lineHeight: 1.5,
                    fontWeight: 400,
                  }}
                >
                  Full-Stack Engineer
                  <br />
                  System Design · MERN Stack
                </div>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                <Tag label="MERN Stack" rotate={-1.5} accent t={t} />
                <Tag label="150+ DSA" rotate={2} t={t} />
                <Tag label="System Design" rotate={-1} t={t} />
                <Tag label="Orbosis Global" rotate={1.5} t={t} />
                <Tag label="Socket.IO" rotate={-2} t={t} />
                <Tag label="JWT / OAuth" rotate={1} t={t} />
              </div>

              <div
                style={{
                  background: t.accent,
                  borderRadius: 10,
                  padding: "7px 16px",
                  boxShadow: "0 8px 24px rgba(200,154,106,0.4)",
                  transform: "rotate(-2.5deg)",
                  alignSelf: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    fontFamily: "DM Mono, monospace",
                    color: t.accentColor,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                  }}
                >
                  ONE DAY ONE BUILD ✦
                </span>
              </div>
            </div>

            <div
              style={{
                padding: "44px 40px 40px 36px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontFamily: "DM Mono, monospace",
                  letterSpacing: "0.2em",
                  color: t.textMono,
                  textTransform: "uppercase",
                  marginBottom: -8,
                }}
              >
                ABOUT ME
              </div>

              <h1
                style={{
                  fontSize: 42,
                  fontFamily: "'DM Serif Display', serif",
                  color: t.text,
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                Building Systems
                <br />
                <em style={{ fontStyle: "italic", color: t.accent }}>
                  That Scale.
                </em>
              </h1>

              {CONTENT.bio.map((b, i) => (
                <div
                  key={b.id}
                  className="about-card"
                  style={{
                    background: i % 2 === 0 ? t.card0 : t.card1,
                    borderRadius: 16,
                    padding: "20px 20px 16px",
                    backdropFilter: "blur(14px)",
                    border: `1px solid ${i % 2 === 0 ? t.cardBorder0 : t.cardBorder1}`,
                    boxShadow: "0 4px 20px rgba(120,80,30,0.07)",
                    transform: `rotate(${[0.3, -0.4, 0.2, -0.3, 0.25][i % 5]}deg)`,
                    position: "relative",
                    marginTop: 8,
                  }}
                  onMouseEnter={() => setHovered(b.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <SectionBadge label={b.badge} index={i} themeKey={themeKey} />
                  <p
                    style={{
                      fontSize: 12.5,
                      color: t.textBody,
                      lineHeight: 1.75,
                      margin: 0,
                      fontWeight: 300,
                    }}
                  >
                    {b.text}
                  </p>
                </div>
              ))}
              <div
                className="about-card"
                style={{
                  background: t.cardStack,
                  borderRadius: 16,
                  padding: "20px 20px 16px",
                  border: `1px solid ${t.cardStackBorder}`,
                  transform: "rotate(-0.3deg)",
                  position: "relative",
                  marginTop: 8,
                }}
              >
                <SectionBadge
                  label="TECH STACK"
                  index={CONTENT.bio.length}
                  themeKey={themeKey}
                />

                <div
                  style={{
                    fontSize: 9,
                    fontFamily: "DM Mono, monospace",
                    letterSpacing: "0.18em",
                    color: t.textMono,
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  TECH STACK
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {CONTENT.stack.map((item) => (
                    <StackPill key={item.label} label={item.label} t={t} />
                  ))}

                  {[
                    "MongoDB",
                    "Express.js",
                    "REST APIs",
                    "Android Integration",
                  ].map((s) => (
                    <StackPill key={s} label={s} t={t} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
