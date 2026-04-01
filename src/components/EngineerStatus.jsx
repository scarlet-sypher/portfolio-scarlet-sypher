import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  User,
  Target,
  Zap,
  Brain,
  Focus,
  TrendingUp,
  Layers,
  GitBranch,
  Network,
  Cpu,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

const STATUS_ITEMS = [
  { icon: User, label: "Identity", value: "Ayush Jha", color: "#93c5fd" },
  {
    icon: Target,
    label: "Intent",
    value: "Build • Scale • Optimize",
    color: "#f97316",
  },
  { icon: Zap, label: "State", value: "Focused Execution", color: "#c084fc" },
];

const MINDSET_ITEMS = [
  { icon: Brain, label: "Mindset", value: "Adaptive", color: "#22d3ee" },
  { icon: Focus, label: "Discipline", value: "Deep Focus", color: "#f472b6" },
  {
    icon: TrendingUp,
    label: "Signal",
    value: "Systems > Trends",
    color: "#fb923c",
  },
];

const DOMAIN_ITEMS = [
  {
    icon: Layers,
    label: "MERN Architecture",
    value: "Scalable Platforms",
    color: "#4ade80",
  },
  {
    icon: GitBranch,
    label: "Data Structures",
    value: "Logical Precision",
    color: "#60a5fa",
  },
  {
    icon: Network,
    label: "API Systems",
    value: "Clean Service Flow",
    color: "#a78bfa",
  },
  {
    icon: Cpu,
    label: "System Design",
    value: "Performance Vision",
    color: "#fbbf24",
  },
];

const CYCLE_WORDS = ["Observe", "Design", "Implement", "Refine"];
const CYCLE_COLORS = ["#60a5fa", "#a78bfa", "#4ade80", "#fb923c"];

const SECTION_COLORS = {
  identity: "#60a5fa",
  mindset: "#a78bfa",
  domains: "#4ade80",
  vector: "#4ade80",
  cycle: "#fb923c",
};

function AnimatedBorderCanvas({ width, height, radius = 12 }) {
  const canvasRef = useRef(null);
  const progressRef = useRef(0);
  const dirRef = useRef(1);
  const SPEED = 0.0018;

  const COLOR_A = "rgba(96, 165, 250,";
  const COLOR_B = "rgba(167, 139, 250,";

  useAnimationFrame(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    progressRef.current += SPEED * dirRef.current;
    if (progressRef.current >= 1) {
      progressRef.current = 1;
      dirRef.current = -1;
    } else if (progressRef.current <= 0) {
      progressRef.current = 0;
      dirRef.current = 1;
    }

    const t = progressRef.current;

    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    ctx.clearRect(0, 0, W, H);

    const buildPath = () => {
      const r = radius;
      const path = new Path2D();
      path.moveTo(r, 0);
      path.lineTo(W - r, 0);
      path.arcTo(W, 0, W, r, r);
      path.lineTo(W, H - r);
      path.arcTo(W, H, W - r, H, r);
      path.lineTo(r, H);
      path.arcTo(0, H, 0, H - r, r);
      path.lineTo(0, r);
      path.arcTo(0, 0, r, 0, r);
      path.closePath();
      return path;
    };

    const perimeter = 2 * (W + H) - (8 - 2 * Math.PI) * radius;

    const pointAt = (d) => {
      d = ((d % perimeter) + perimeter) % perimeter;

      const topStraight = W - 2 * radius;
      const rightStraight = H - 2 * radius;
      const bottomStraight = W - 2 * radius;
      const leftStraight = H - 2 * radius;
      const corner = (Math.PI / 2) * radius;

      const segs = [
        topStraight,
        corner,
        rightStraight,
        corner,
        bottomStraight,
        corner,
        leftStraight,
        corner,
      ];

      let acc = 0;
      for (let i = 0; i < segs.length; i++) {
        if (d <= acc + segs[i]) {
          const local = d - acc;
          const frac = local / segs[i];
          if (i === 0) return { x: radius + local, y: 0 };
          if (i === 1) {
            const a = -Math.PI / 2 + frac * (Math.PI / 2);
            return {
              x: W - radius + Math.cos(a) * radius,
              y: radius + Math.sin(a) * radius,
            };
          }
          if (i === 2) return { x: W, y: radius + local };
          if (i === 3) {
            const a = 0 + frac * (Math.PI / 2);
            return {
              x: W - radius + Math.cos(a) * radius,
              y: H - radius + Math.sin(a) * radius,
            };
          }
          if (i === 4) return { x: W - radius - local, y: H };
          if (i === 5) {
            const a = Math.PI / 2 + frac * (Math.PI / 2);
            return {
              x: radius + Math.cos(a) * radius,
              y: H - radius + Math.sin(a) * radius,
            };
          }
          if (i === 6) return { x: 0, y: H - radius - local };
          if (i === 7) {
            const a = Math.PI + frac * (Math.PI / 2);
            return {
              x: radius + Math.cos(a) * radius,
              y: radius + Math.sin(a) * radius,
            };
          }
        }
        acc += segs[i];
      }
      return { x: radius, y: 0 };
    };

    const topStraight = W - 2 * radius;
    const corner = (Math.PI / 2) * radius;
    const rightStraight = H - 2 * radius;
    const bottomStraight = W - 2 * radius;
    const leftStraight = H - 2 * radius;

    const topStartD = 0;
    const topEndD = topStraight + corner + rightStraight * 0.5;
    const topD = topStartD + ease * (topEndD - topStartD);

    const bottomLeftD =
      topStraight + corner + rightStraight + corner + bottomStraight + corner;
    const bottomEndD = topStraight + corner + rightStraight * 0.5;

    const bottomStartD =
      perimeter - leftStraight * 0.5 - corner - bottomStraight;

    const btmStart = perimeter - (corner + leftStraight + corner);
    const btmActual =
      btmStart -
      ease * (btmStart - (topStraight + corner + rightStraight * 0.5));

    const bottomD = ((btmActual % perimeter) + perimeter) % perimeter;

    const TAIL = 80;
    const GLOW_RADIUS = 6;

    const drawParticle = (d, colorBase, isReversed = false) => {
      const steps = 32;
      const head = pointAt(d);

      for (let s = 0; s < steps; s++) {
        const frac = s / steps;
        const tailD = isReversed
          ? (((d + frac * TAIL) % perimeter) + perimeter) % perimeter
          : (d - frac * TAIL + perimeter) % perimeter;
        const pt = pointAt(tailD);
        const alpha = (1 - frac) * 0.55;
        const r = GLOW_RADIUS * (1 - frac * 0.7);

        const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r);
        grad.addColorStop(0, `${colorBase} ${alpha})`);
        grad.addColorStop(1, `${colorBase} 0)`);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      const headGrad = ctx.createRadialGradient(
        head.x,
        head.y,
        0,
        head.x,
        head.y,
        GLOW_RADIUS * 1.4,
      );
      headGrad.addColorStop(0, `${colorBase} 0.95)`);
      headGrad.addColorStop(0.4, `${colorBase} 0.5)`);
      headGrad.addColorStop(1, `${colorBase} 0)`);
      ctx.beginPath();
      ctx.arc(head.x, head.y, GLOW_RADIUS * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = headGrad;
      ctx.fill();
    };

    ctx.save();
    const path = buildPath();
    ctx.strokeStyle = "rgba(255,255,255,0.07)";
    ctx.lineWidth = 1;
    ctx.stroke(path);
    ctx.restore();

    drawParticle(topD, COLOR_A, false);
    drawParticle(bottomD, COLOR_B, true);

    const meetPoint = pointAt(topStraight + corner + rightStraight * 0.5);
    const proximity = 1 - Math.abs(ease - 1) * 2;
    if (proximity > 0.5) {
      const burstAlpha = ((proximity - 0.5) / 0.5) * 0.35;
      const burstGrad = ctx.createRadialGradient(
        meetPoint.x,
        meetPoint.y,
        0,
        meetPoint.x,
        meetPoint.y,
        22,
      );
      burstGrad.addColorStop(0, `rgba(255,255,255, ${burstAlpha})`);
      burstGrad.addColorStop(0.4, `rgba(167,139,250, ${burstAlpha * 0.6})`);
      burstGrad.addColorStop(1, "rgba(167,139,250, 0)");
      ctx.beginPath();
      ctx.arc(meetPoint.x, meetPoint.y, 22, 0, Math.PI * 2);
      ctx.fillStyle = burstGrad;
      ctx.fill();
    }
  });

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        borderRadius: radius,
      }}
    />
  );
}

function AnimatedBorderBox({ children, style = {}, className = "" }) {
  const boxRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!boxRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({
        w: Math.round(entry.contentRect.width),
        h: Math.round(entry.contentRect.height),
      });
    });
    ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      className={className}
      style={{
        position: "relative",
        borderRadius: 12,
        ...style,
      }}
    >
      {size.w > 0 && size.h > 0 && (
        <AnimatedBorderCanvas width={size.w} height={size.h} radius={12} />
      )}
      {children}
    </div>
  );
}

function LoadingScreen({ onDone }) {
  const [dots, setDots] = useState(1);
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => {
        if (d >= 3) {
          clearInterval(interval);
          setTimeout(() => setPhase("fading"), 300);
          setTimeout(onDone, 900);
          return 3;
        }
        return d + 1;
      });
    }, 900);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-start justify-center pl-4"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "fading" ? 0 : 1 }}
      transition={{ duration: 0.4 }}
    >
      <span
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 10,
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        Initializing{".".repeat(dots)}
      </span>
      <motion.div
        className="mt-3 h-px"
        style={{ background: "rgba(96,165,250,0.35)", width: 0 }}
        animate={{ width: phase === "fading" ? "100%" : `${(dots / 3) * 60}%` }}
        transition={{ duration: 0.38, ease: "easeOut" }}
      />
    </motion.div>
  );
}

function TypingText({
  text,
  startDelay = 0,
  color,
  fontSize = 12,
  fontWeight = 600,
  style = {},
}) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 22);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span
      style={{
        fontFamily: "'Courier New', monospace",
        fontSize,
        color,
        fontWeight,
        ...style,
      }}
    >
      {displayed}
      {started && displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ color: "rgba(255,255,255,0.4)", marginLeft: 1 }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}

function SectionLabel({ children, accentColor, startDelay }) {
  return (
    <motion.div
      className="flex items-center gap-2 mt-4 mb-2 first:mt-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: startDelay / 1000, duration: 0.3 }}
    >
      <div
        style={{
          width: 2,
          height: 11,
          borderRadius: 2,
          background: accentColor,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: accentColor,
          fontWeight: 700,
        }}
      >
        {children}
      </span>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(to right, ${accentColor}30, transparent)`,
        }}
      />
    </motion.div>
  );
}

function StatusRow({ icon: Icon, label, value, color, startDelay }) {
  return (
    <motion.div
      className="flex items-center gap-2.5 py-[4px]"
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: startDelay / 1000, duration: 0.28, ease: "easeOut" }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          background: `${color}18`,
          border: `1px solid ${color}28`,
          flexShrink: 0,
        }}
      >
        <Icon size={9} color={color} strokeWidth={2.2} />
      </div>
      <span
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 11,
          color: color,
          width: 66,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <TypingText
        text={value}
        startDelay={startDelay + 60}
        color="rgba(255,255,255,0.88)"
        fontSize={10}
        fontWeight={600}
      />
    </motion.div>
  );
}

function DomainRow({
  icon: Icon,
  label,
  value,
  color,
  startDelay,
  prefix = "├─",
}) {
  return (
    <motion.div
      className="flex items-center gap-2 py-[3.5px]"
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: startDelay / 1000, duration: 0.26 }}
    >
      <span
        style={{
          color: "rgba(255,255,255,0.2)",
          fontFamily: "'Courier New', monospace",
          fontSize: 10.5,
          flexShrink: 0,
        }}
      >
        {prefix}
      </span>
      <Icon
        size={9}
        color={color}
        strokeWidth={2.2}
        style={{ flexShrink: 0 }}
      />
      <span
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 11,
          color,
          fontWeight: 600,
          minWidth: 108,
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 9,
          color: "white",
          fontWeight: 200,
        }}
      >
        {value}
      </span>
    </motion.div>
  );
}

export default function EngineerStatus() {
  const [loaded, setLoaded] = useState(false);

  const T = {
    identity_label: 0,
    identity_rows: [80, 160, 240],
    mindset_label: 380,
    mindset_rows: [460, 540, 620],
    domains_label: 760,
    domain_rows: [840, 920, 1000, 1080],
    vector_label: 1200,
    vector_text: 1280,
    cycle_label: 1400,
    cycle_words: 1480,
  };

  return (
    <motion.div
      className="flex flex-col shrink-0 min-h-0"
      style={{
        width: "clamp(240px, 28vw, 320px)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        paddingRight: 0,
      }}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.45 }}
    >
      <AnimatedBorderBox
        style={{
          background: "rgba(0,0,0,0.32)",
          padding: 0,
          flex: 1,
          overflow: "hidden",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ padding: "12px 14px 14px" }}>
          {/* ── Header ── */}
          <div
            className="flex items-center gap-1.5 mb-3 pb-2.5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#ff5f57" }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#febc2e" }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#28c840" }}
            />
            <span
              className="ml-auto"
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(96,165,250,0.5)",
                fontWeight: 700,
              }}
            >
              ENGINEER.STATUS
            </span>
          </div>

          {/* ── Loading overlay ── */}
          <AnimatePresence>
            {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
          </AnimatePresence>

          {/* ── Content ── */}
          <AnimatePresence>
            {loaded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                {/* Identity */}
                <SectionLabel
                  accentColor={SECTION_COLORS.identity}
                  startDelay={T.identity_label}
                >
                  identity
                </SectionLabel>
                {STATUS_ITEMS.map((item, i) => (
                  <StatusRow
                    key={item.label}
                    {...item}
                    startDelay={T.identity_rows[i]}
                  />
                ))}

                {/* Mindset */}
                <SectionLabel
                  accentColor={SECTION_COLORS.mindset}
                  startDelay={T.mindset_label}
                >
                  mindset
                </SectionLabel>
                {MINDSET_ITEMS.map((item, i) => (
                  <StatusRow
                    key={item.label}
                    {...item}
                    startDelay={T.mindset_rows[i]}
                  />
                ))}

                {/* Domains */}
                <SectionLabel
                  accentColor={SECTION_COLORS.domains}
                  startDelay={T.domains_label}
                >
                  engineering domains
                </SectionLabel>
                <div className="pl-1">
                  {DOMAIN_ITEMS.map((item, i) => (
                    <DomainRow
                      key={item.label}
                      {...item}
                      startDelay={T.domain_rows[i]}
                      prefix={i === DOMAIN_ITEMS.length - 1 ? "└─" : "├─"}
                    />
                  ))}
                </div>

                {/* Current vector */}
                <SectionLabel
                  accentColor={SECTION_COLORS.vector}
                  startDelay={T.vector_label}
                >
                  current vector
                </SectionLabel>
                <motion.div
                  className="flex items-start gap-2 py-[4px] pl-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: T.vector_text / 1000 }}
                >
                  <ArrowRight
                    size={10}
                    color="#4ade80"
                    strokeWidth={2.5}
                    className="mt-px shrink-0"
                  />
                  <TypingText
                    text="Architecting resilient real-time infra"
                    startDelay={T.vector_text + 60}
                    color="rgba(255,255,255,0.72)"
                    fontSize={9.5}
                    fontWeight={500}
                    style={{ lineHeight: "1.6" }}
                  />
                </motion.div>

                {/* Execution cycle */}
                <SectionLabel
                  accentColor={SECTION_COLORS.cycle}
                  startDelay={T.cycle_label}
                >
                  execution cycle
                </SectionLabel>
                <motion.div
                  className="flex items-center gap-1.5 flex-wrap pl-1 pb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: T.cycle_words / 1000 }}
                >
                  {CYCLE_WORDS.map((word, i) => (
                    <span key={word} className="flex items-center gap-1">
                      <TypingText
                        text={word}
                        startDelay={T.cycle_words + i * 140}
                        color={CYCLE_COLORS[i]}
                        fontSize={9.5}
                        fontWeight={700}
                      />
                      {i < 3 && (
                        <span
                          style={{
                            color: "rgba(255,255,255,0.2)",
                            fontFamily: "'Courier New', monospace",
                            fontSize: 9,
                          }}
                        >
                          ›
                        </span>
                      )}
                    </span>
                  ))}
                </motion.div>

                {/* Footer */}
                <div
                  className="mt-3 pt-2.5 flex items-center gap-1.5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <RotateCcw
                    size={8}
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  />
                  <span
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: 9.5,
                      letterSpacing: "0.16em",
                      color: "rgba(255,255,255,0.18)",
                    }}
                  >
                    v2.0
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AnimatedBorderBox>
    </motion.div>
  );
}
