import { useEffect, useRef, useState } from "react";

export default function GearLoader({
  imageSources = [],
  onComplete,
  children,
}) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const loadedRef = useRef(0);

  useEffect(() => {
    const domImgs = Array.from(document.querySelectorAll("img"))
      .map((el) => el.src)
      .filter(Boolean);

    const allSrcs = [...new Set([...imageSources, ...domImgs])];
    const total = allSrcs.length;

    if (total === 0) {
      setProgress(100);
      setTimeout(() => {
        setDone(true);
        onComplete?.();
      }, 400);
      return;
    }

    function tick() {
      loadedRef.current += 1;
      const p = Math.round((loadedRef.current / total) * 100);
      setProgress(p);
      if (loadedRef.current >= total) {
        setTimeout(() => {
          setDone(true);
          onComplete?.();
        }, 600);
      }
    }

    allSrcs.forEach((src) => {
      const img = new Image();
      img.onload = tick;
      img.onerror = tick;
      img.src = src;
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (done) return children ?? null;

  return <GearScreen progress={progress} />;
}

function GearScreen({ progress }) {
  const systemRef = useRef(null);

  useEffect(() => {
    const system = systemRef.current;
    if (!system) return;

    const gears = [
      {
        x: 90,
        y: 100,
        r: 50,
        teeth: 12,
        color: "#e94560",
        dir: "cw",
        speed: 3,
      },
      {
        x: 175,
        y: 75,
        r: 35,
        teeth: 9,
        color: "#ffb830",
        dir: "ccw",
        speed: 2.1,
      },
      {
        x: 240,
        y: 110,
        r: 45,
        teeth: 11,
        color: "#00d2ff",
        dir: "cw",
        speed: 2.65,
      },
      {
        x: 155,
        y: 145,
        r: 25,
        teeth: 7,
        color: "#ff6b9d",
        dir: "ccw",
        speed: 1.5,
      },
    ];

    function createGearSVG({ r, teeth, color }) {
      const toothHeight = r * 0.2;
      const innerR = r - toothHeight;
      const outerR = r + toothHeight;
      const svgSize = (outerR + 4) * 2;
      const cx = svgSize / 2;
      const cy = svgSize / 2;

      let pathData = "";
      const angleStep = (Math.PI * 2) / teeth;

      for (let i = 0; i < teeth; i++) {
        const a1 = i * angleStep;
        const a2 = a1 + angleStep * 0.15;
        const a3 = a1 + angleStep * 0.35;
        const a4 = a1 + angleStep * 0.5;
        const a5 = a1 + angleStep * 0.65;
        const a6 = a1 + angleStep * 0.85;

        const points = [
          [cx + Math.cos(a1) * innerR, cy + Math.sin(a1) * innerR],
          [cx + Math.cos(a2) * innerR, cy + Math.sin(a2) * innerR],
          [cx + Math.cos(a3) * outerR, cy + Math.sin(a3) * outerR],
          [cx + Math.cos(a4) * outerR, cy + Math.sin(a4) * outerR],
          [cx + Math.cos(a5) * outerR, cy + Math.sin(a5) * outerR],
          [cx + Math.cos(a6) * innerR, cy + Math.sin(a6) * innerR],
        ];

        if (i === 0) pathData += `M ${points[0][0]} ${points[0][1]} `;
        points.slice(1).forEach((p) => {
          pathData += `L ${p[0]} ${p[1]} `;
        });
      }
      pathData += "Z";

      const holeR = r * 0.25;

      const svg = `
        <svg width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}">
          <g>
            <path d="${pathData}" fill="none" stroke="${color}" stroke-width="2" opacity="0.9"/>
            <circle cx="${cx}" cy="${cy}" r="${holeR}" fill="none" stroke="${color}" stroke-width="2" opacity="0.7"/>
            <circle cx="${cx}" cy="${cy}" r="${r * 0.08}" fill="${color}" opacity="0.8"/>
            <line x1="${cx}" y1="${cy - holeR}" x2="${cx}" y2="${cy - r * 0.6}" stroke="${color}" stroke-width="1.5" opacity="0.4"/>
            <line x1="${cx}" y1="${cy + holeR}" x2="${cx}" y2="${cy + r * 0.6}" stroke="${color}" stroke-width="1.5" opacity="0.4"/>
            <line x1="${cx - holeR}" y1="${cy}" x2="${cx - r * 0.6}" y2="${cy}" stroke="${color}" stroke-width="1.5" opacity="0.4"/>
            <line x1="${cx + holeR}" y1="${cy}" x2="${cx + r * 0.6}" y2="${cy}" stroke="${color}" stroke-width="1.5" opacity="0.4"/>
          </g>
        </svg>`;

      return { svg, size: svgSize };
    }

    gears.forEach((config) => {
      const { svg, size } = createGearSVG(config);

      const wrapper = document.createElement("div");
      wrapper.className = "gl-gear-wrapper";
      wrapper.style.cssText = `
        position: absolute;
        left: ${config.x - size / 2}px;
        top: ${config.y - size / 2}px;
        width: ${size}px;
        height: ${size}px;
        --gear-color: ${config.color};
      `;

      const gearEl = document.createElement("div");
      gearEl.className = `gl-gear gl-gear-${config.dir} gl-gear-glow`;
      gearEl.style.animationDuration = `${config.speed}s`;
      gearEl.innerHTML = svg;

      wrapper.appendChild(gearEl);
      system.appendChild(wrapper);
    });

    // Steam particles
    function createSteam() {
      const gear = gears[Math.floor(Math.random() * gears.length)];
      const steam = document.createElement("div");
      steam.className = "gl-steam";

      const angle = Math.random() * Math.PI * 2;
      const dist = gear.r * 0.6;
      const drift = Math.random() * 30 - 15 + "px";

      steam.style.cssText = `
        position: absolute;
        left: ${gear.x + Math.cos(angle) * dist}px;
        top: ${gear.y + Math.sin(angle) * dist}px;
        --drift: ${drift};
        animation-duration: ${1.5 + Math.random()}s;
        background: rgba(255,255,255,${0.2 + Math.random() * 0.3});
        width: ${2 + Math.random() * 3}px;
        height: ${2 + Math.random() * 3}px;
        border-radius: 50%;
        animation-name: gl-steamRise;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
      `;

      system.appendChild(steam);
      setTimeout(() => steam.remove(), 2500);
    }

    const steamInterval = setInterval(createSteam, 200);

    // Scale to fit viewport
    const BASE_W = 350;
    const BASE_H = 320;

    function fitToWindow() {
      const scaleX = window.innerWidth / BASE_W;
      const scaleY = window.innerHeight / BASE_H;
      const scale = Math.min(scaleX, scaleY, 3) * 0.85;
      system.style.transform = `scale(${scale})`;
    }

    fitToWindow();
    window.addEventListener("resize", fitToWindow);

    return () => {
      clearInterval(steamInterval);
      window.removeEventListener("resize", fitToWindow);
    };
  }, []);

  return (
    <>
      <style>{`
        .gl-body {
          margin: 0; padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #1a1a2e;
          overflow: hidden;
        }
        .gl-system {
          position: relative;
          width: 350px;
          height: 280px;
          transform-origin: center center;
        }
        .gl-gear {
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .gl-gear-cw  { animation-name: gl-rotateCW; }
        .gl-gear-ccw { animation-name: gl-rotateCCW; }
        @keyframes gl-rotateCW  { to { transform: rotate(360deg);  } }
        @keyframes gl-rotateCCW { to { transform: rotate(-360deg); } }
        .gl-gear-glow {
          filter: drop-shadow(0 0 6px var(--gear-color));
        }
        .gl-bar-container {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 250px;
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
          overflow: hidden;
        }
        .gl-bar {
          height: 100%;
          border-radius: 3px;
          background: linear-gradient(90deg, #e94560, #ffb830, #00d2ff);
          background-size: 200% 100%;
          animation: gl-barShimmer 1.5s linear infinite;
          transition: width 0.3s ease;
        }
        @keyframes gl-barShimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }
        .gl-loading-text {
          position: absolute;
          bottom: -35px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Courier New', monospace;
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          letter-spacing: 6px;
          text-transform: uppercase;
          white-space: nowrap;
        }
        @keyframes gl-steamRise {
          0%   { opacity: 0.8; transform: translateY(0)     scale(1);   }
          100% { opacity: 0;   transform: translateY(-60px) translateX(var(--drift)) scale(0.3); }
        }
      `}</style>

      <div className="gl-body">
        <div className="gl-system" ref={systemRef}>
          <div className="gl-bar-container">
            <div className="gl-bar" style={{ width: `${progress}%` }} />
          </div>
          <div className="gl-loading-text">
            {progress >= 100 ? "Ready" : "Processing"}
          </div>
        </div>
      </div>
    </>
  );
}
