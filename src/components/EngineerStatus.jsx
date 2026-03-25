import { motion, AnimatePresence } from "framer-motion";
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

// ─── Data ────────────────────────────────────────────────────────────────────

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

// ─── Loading dots ─────────────────────────────────────────────────────────────

function LoadingScreen({ onDone }) {
  const [dots, setDots] = useState(1);
  const [phase, setPhase] = useState("typing"); // typing | fading

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

// ─── Typing text ──────────────────────────────────────────────────────────────

function TypingText({
  text,
  startDelay = 0,
  color,
  fontSize = 10,
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

// ─── Section label ────────────────────────────────────────────────────────────

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
          fontSize: 9,
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

// ─── Status row ───────────────────────────────────────────────────────────────

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
          fontSize: 10,
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

// ─── Domain row ───────────────────────────────────────────────────────────────

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
          fontSize: 9,
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
          fontSize: 9.5,
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

// ─── Main component ───────────────────────────────────────────────────────────

export default function EngineerStatus() {
  const [loaded, setLoaded] = useState(false);

  // Staggered reveal timing (ms)
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
        paddingRight: 16,
      }}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.45 }}
    >
      <div
        style={{
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(0,0,0,0.32)",
          padding: "12px 14px 14px",
          flex: 1,
          overflow: "hidden",
          backdropFilter: "blur(12px)",
          position: "relative",
        }}
      >
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
              fontSize: 8.5,
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
                    fontSize: 8,
                    letterSpacing: "0.16em",
                    color: "rgba(255,255,255,0.18)",
                  }}
                >
                  v2.0 // always building
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
