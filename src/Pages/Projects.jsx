import { useRef, useState, useEffect } from "react";
import ProjectHeading from "../components/Projects/ProjectHeading";
import ProjectSlider from "../components/Projects/ProjectSlider";

const gradientStyles = `
@keyframes proj-moveInCircle {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes proj-moveVertical {
  0% {
    transform: translateY(-50%);
  }
  50% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(-50%);
  }
}

@keyframes proj-moveHorizontal {
  0% {
    transform: translateX(-50%) translateY(-10%);
  }
  50% {
    transform: translateX(50%) translateY(10%);
  }
  100% {
    transform: translateX(-50%) translateY(-10%);
  }
}

.proj-g1 {
  animation: proj-moveVertical 30s ease infinite;
}

.proj-g2 {
  animation: proj-moveInCircle 20s reverse infinite;
  transform-origin: calc(50% - 400px);
}

.proj-g3 {
  animation: proj-moveInCircle 40s linear infinite;
  transform-origin: calc(50% + 400px);
}

.proj-g4 {
  animation: proj-moveHorizontal 40s ease infinite;
  transform-origin: calc(50% - 200px);
  opacity: 0.7;
}

.proj-g5 {
  animation: proj-moveInCircle 20s ease infinite;
  transform-origin: calc(50% - 800px) calc(50% + 200px);
}
`;

function GradientBackground({ containerRef }) {
  const interRef = useRef(null);
  const cur = useRef({ x: 0, y: 0 });
  const tg = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const el = interRef.current;
    if (!el) return;
    const tick = () => {
      cur.current.x += (tg.current.x - cur.current.x) / 20;
      cur.current.y += (tg.current.y - cur.current.y) / 20;
      el.style.transform = `translate(${Math.round(cur.current.x)}px,${Math.round(cur.current.y)}px)`;
      raf.current = requestAnimationFrame(tick);
    };
    const onMove = (e) => {
      const r = containerRef.current?.getBoundingClientRect();
      if (!r) return;
      tg.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    containerRef.current?.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);
    return () => {
      containerRef.current?.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const abs = { position: "absolute" };
  const blob = (color, extra = {}) => ({
    ...abs,
    background: `radial-gradient(circle at center, ${color} 0, transparent 50%) no-repeat`,
    mixBlendMode: "hard-light",
    width: "80%",
    height: "80%",
    top: "10%",
    left: "10%",
    ...extra,
  });

  return (
    <div
      style={{
        ...abs,
        inset: 0,
        background: "linear-gradient(40deg,#000,#020617)",
        overflow: "hidden",
        borderRadius: "inherit",
      }}
    >
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="proj-goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div
        style={{
          filter: "url(#proj-goo) blur(40px)",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="proj-g1" style={blob("rgba(18,113,255,.8)")} />
        <div className="proj-g2" style={blob("rgba(221,74,255,.8)")} />
        <div
          className="proj-g3"
          style={blob("rgba(100,220,255,.8)", {
            top: "calc(10% + 200px)",
            left: "calc(10% - 500px)",
          })}
        />
        <div className="proj-g4" style={blob("rgba(200,50,50,.8)")} />
        <div
          className="proj-g5"
          style={blob("rgba(180,180,50,.8)", {
            width: "160%",
            height: "160%",
            top: "-30%",
            left: "-30%",
          })}
        />
        <div
          ref={interRef}
          style={{
            ...abs,
            background:
              "radial-gradient(circle at center,rgba(140,100,255,.8) 0,transparent 50%) no-repeat",
            mixBlendMode: "hard-light",
            width: "100%",
            height: "100%",
            top: "-50%",
            left: "-50%",
            opacity: 0.7,
          }}
        />
      </div>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  const [sliderVisible, setSliderVisible] = useState(false);
  const [activeAccent, setActiveAccent] = useState("rgba(99,202,183,1)");

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <style>{gradientStyles}</style>
      <GradientBackground containerRef={containerRef} />

      <ProjectHeading
        accent={activeAccent}
        onComplete={() => setSliderVisible(true)}
      />
      <ProjectSlider visible={sliderVisible} onAccentChange={setActiveAccent} />
    </div>
  );
}
