import { Trophy, Code2, Layers, Cpu } from "lucide-react";

const ICON_MAP = {
  trophy: Trophy,
  code: Code2,
  layers: Layers,
  cpu: Cpu,
};

function RotatingBorder({ color }) {
  return (
    <div
      className="stats-rotating-border"
      style={{
        position: "absolute",

        width: "220%",
        height: "220%",
        inset: "-60%",

        borderRadius: "70%",

        zIndex: 0,
        background: `conic-gradient(${color} 0deg, transparent 60deg, transparent 180deg, ${color} 180deg, transparent 240deg)`,
        animation: "statsRotate 8s linear infinite",
      }}
    />
  );
}
export default function StatsCards({ stats, dark }) {
  return (
    <>
      <style>{`
        @keyframes statsRotate {
          to { transform: rotate(-360deg); }
        }
        .stats-card {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .stats-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
        }
        .stats-card:hover .stats-rotating-border {
          animation-play-state: paused;
        }
        .stats-icon {
          color: transparent;
          stroke: var(--icon-color);
          stroke-width: 1.5px;
          transition: color 0.35s linear, stroke 0.35s linear;
          display: block;
        }
        .stats-card:hover .stats-icon {
          color: var(--icon-color);
          stroke: var(--icon-color);
        }
      `}</style>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
        }}
      >
        {stats.map((item, i) => {
          const Icon = ICON_MAP[item.icon] || Trophy;
          return (
            <div
              key={i}
              className="stats-card"
              style={{
                borderRadius: 18,
                padding: "18px 16px",
                background: dark
                  ? "rgba(10,12,28,0.7)"
                  : "rgba(255,255,255,0.7)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <RotatingBorder color={item.color} />

              <div
                style={{
                  position: "absolute",
                  inset: 2,
                  borderRadius: 16,
                  background: dark
                    ? "rgba(10,12,28,0.94)"
                    : "rgba(255,255,255,0.94)",
                  backdropFilter: "blur(28px) saturate(140%)",
                  WebkitBackdropFilter: "blur(28px) saturate(140%)",
                  zIndex: 1,
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 2,
                  borderRadius: 16,
                  backgroundImage:
                    "url('https://www.transparenttextures.com/patterns/noise.png')",
                  opacity: 0.06,
                  mixBlendMode: "overlay",
                  pointerEvents: "none",
                  zIndex: 1.5,
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 2,
                  borderRadius: 16,
                  background: dark
                    ? "rgba(10,12,28,0.25)"
                    : "rgba(255,255,255,0.25)",
                  zIndex: 1.7,
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 2,
                  borderRadius: 16,
                  background: `radial-gradient(circle at top, ${item.color}22, transparent 70%)`,
                  opacity: 0.7,
                  zIndex: 2,
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 0,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: 8,
                  }}
                >
                  <Icon
                    size={22}
                    className="stats-icon"
                    style={{ "--icon-color": item.color }}
                  />
                </div>

                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: item.color,
                    fontFamily: "'DM Mono', monospace",
                    marginBottom: 6,
                  }}
                >
                  {item.title}
                </div>

                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: dark ? "#fff" : "#111",
                    marginBottom: 4,
                    lineHeight: 1.2,
                  }}
                >
                  {item.value}
                </div>

                <div
                  style={{
                    fontSize: 11,
                    color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {item.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
