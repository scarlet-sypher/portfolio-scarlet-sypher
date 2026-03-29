import { useEffect, useState } from "react";

const headingStyles = `

@keyframes ph-pipeline-flow {
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  40% {
    transform: scaleX(1);
    opacity: 1;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
}

@keyframes ph-energy-pulse {
  0% {
    left: -30%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    left: 110%;
    opacity: 0;
  }
}

@keyframes ph-left-reveal {
  0% {
    transform: translateX(0);
    clip-path: inset(0 100% 0 0);
  }
  100% {
    transform: translateX(0);
    clip-path: inset(0 0% 0 0);
  }
}

@keyframes ph-right-reveal {
  0% {
    transform: translateX(0);
    clip-path: inset(0 0 0 100%);
  }
  100% {
    transform: translateX(0);
    clip-path: inset(0 0 0 0%);
  }
}

@keyframes ph-divider-glow {
  0% {
    opacity: 0;
    transform: scaleY(0);
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}

@keyframes ph-content-rise {
  0% {
    opacity: 0;
    transform: translateY(28px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.ph-pipeline {
  animation: ph-pipeline-flow 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.ph-pulse {
  animation: ph-energy-pulse 1s ease-in-out forwards;
}

.ph-left {
  animation: ph-left-reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.ph-right {
  animation: ph-right-reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.12s forwards;
}

.ph-divider {
  animation: ph-divider-glow 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.ph-content {
  animation: ph-content-rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

`;

export default function ProjectHeading({ accent, onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 1100);
    const t3 = setTimeout(() => {
      setPhase(3);
      onComplete?.();
    }, 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const accentSoft = accent.replace("1)", "0.13)");
  const accentBorder = accent.replace("1)", "0.35)");
  const accentGlow = accent.replace("1)", "0.6)");

  return (
    <>
      <style>{headingStyles}</style>
      <div
        className="absolute top-0 left-1/2 z-10 flex flex-col items-center"
        style={{
          top: "7px",
          transform: "translate(-50%, 0) scale(0.65)",
          transformOrigin: "top center",
        }}
      >
        {phase >= 2 && (
          <div
            className="relative flex items-stretch"
            style={{ height: "clamp(44px, 6vw, 72px)" }}
          >
            <div
              className="ph-left flex items-center px-6 rounded-l-xl overflow-hidden"
              style={{
                background: accent,
                clipPath: "inset(0 100% 0 0)",
                boxShadow: `0 0 28px ${accentGlow}, inset 0 1px 0 rgba(255,255,255,0.2)`,
              }}
            >
              <span
                style={{
                  fontFamily: "'SF Mono', 'Courier New', monospace",
                  fontSize: "clamp(16px, 2.8vw, 34px)",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                PROJECT
              </span>
            </div>

            <div
              className="ph-divider flex-shrink-0"
              style={{
                width: "2px",
                background: `linear-gradient(180deg, transparent, ${accent}, transparent)`,
                boxShadow: `0 0 12px ${accentGlow}`,
                clipPath: "inset(50% 0 50% 0)",
                animation:
                  "ph-divider-glow 0.4s cubic-bezier(0.22,1,0.36,1) 0.05s forwards",
              }}
            />

            <div
              className="ph-right flex items-center px-6 rounded-r-xl overflow-hidden"
              style={{
                background: accentSoft,
                border: `1px solid ${accentBorder}`,
                borderLeft: "none",
                backdropFilter: "blur(12px)",
                clipPath: "inset(0 0 0 100%)",
                boxShadow: `inset 0 0 20px ${accentSoft}`,
              }}
            >
              <span
                style={{
                  fontFamily: "'SF Mono', 'Courier New', monospace",
                  fontSize: "clamp(11px, 1.6vw, 20px)",
                  fontWeight: 700,
                  color: accent,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                THINGS I HAVE BUILT
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
