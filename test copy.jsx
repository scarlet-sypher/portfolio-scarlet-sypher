import { motion } from "framer-motion";
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
  { icon: User, label: "Identity", value: "Ayush Jha", color: "#e2e8f0" },
  {
    icon: Target,
    label: "Intent",
    value: "Build · Scale · Optimize",
    color: "#fb923c",
  },
  { icon: Zap, label: "State", value: "Focused Execution", color: "#a78bfa" },
];

const MINDSET_ITEMS = [
  { icon: Brain, label: "Mindset", value: "Adaptive", color: "#38bdf8" },
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
    color: "#34d399",
  },
  {
    icon: GitBranch,
    label: "Data Structures",
    value: "Logical Precision",
    color: "#38bdf8",
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
    color: "#fb923c",
  },
];

const SECTION_COLORS = {
  identity: "#38bdf8",
  mindset: "#a78bfa",
  domains: "#34d399",
  vector: "#34d399",
  cycle: "#fb923c",
};

function SectionLabel({ children, accentColor = "rgba(255,255,255,0.28)" }) {
  return (
    <motion.div
      className="flex items-center gap-2 "
      style={{ marginTop: 10, marginBottom: 4 }}
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        style={{
          width: 3,
          height: 11,
          borderRadius: 2,
          background: accentColor,
          boxShadow: `0 0 8px ${accentColor}88`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 9,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: accentColor,
          fontFamily: "'Courier New', monospace",
          fontWeight: 700,
          textShadow: `0 0 12px ${accentColor}55`,
        }}
      >
        {children}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(to right, ${accentColor}44, transparent)`,
        }}
      />
    </motion.div>
  );
}

function StatusRow({ icon: Icon, label, value, color, delay = 0 }) {
  return (
    <motion.div
      className="flex items-center gap-2"
      style={{ padding: "3px 0" }}
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35, ease: "easeOut" }}
    >
      <motion.div
        style={{
          width: 18,
          height: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          background: `${color}14`,
          border: `1px solid ${color}30`,
          flexShrink: 0,
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
      >
        <Icon size={9} color={color} strokeWidth={2.2} />
      </motion.div>
      <span
        style={{
          fontSize: 10,
          color: "rgba(255,255,255,0.38)",
          fontFamily: "'Courier New', monospace",
          width: 62,
          flexShrink: 0,
          fontWeight: 500,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 10,
          color: "rgba(255,255,255,0.85)",
          fontFamily: "'Courier New', monospace",
          fontWeight: 600,
          letterSpacing: "0.02em",
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
    </motion.div>
  );
}

function DomainRow({
  icon: Icon,
  label,
  value,
  color,
  delay = 0,
  prefix = "├─",
}) {
  return (
    <motion.div
      className="flex items-center gap-2"
      style={{ padding: "3px 0" }}
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <span
        style={{
          color: "rgba(255,255,255,0.22)",
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
        style={{ filter: `drop-shadow(0 0 4px ${color}88)`, flexShrink: 0 }}
      />
      <span
        style={{
          fontSize: 9.5,
          color,
          fontFamily: "'Courier New', monospace",
          fontWeight: 600,
          flexShrink: 0,
          textShadow: `0 0 10px ${color}44`,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 9,
          color: "rgba(255,255,255,0.38)",
          fontFamily: "'Courier New', monospace",
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </span>
    </motion.div>
  );
}

export default function EngineerStatus() {
  return (
    <motion.div
      className="flex flex-col shrink-0"
      style={{
        width: "clamp(220px, 26vw, 300px)",
        borderRight: "1px solid rgba(255,255,255,0.09)",
        paddingRight: 16,
        minHeight: 0,
      }}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.45 }}
    >
      <div
        style={{
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.13)",
          background: "rgba(0,0,0,0.35)",
          padding: "11px 13px 13px",
          overflow: "auto",
          backdropFilter: "blur(12px)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.04) inset, 0 4px 24px rgba(0,0,0,0.4)",
          scrollbarWidth: "none",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-1.5 pb-2.5"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 2,
          }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#ff5f57", boxShadow: "0 0 6px #ff5f5788" }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#febc2e", boxShadow: "0 0 6px #febc2e88" }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#28c840", boxShadow: "0 0 6px #28c84088" }}
          />
          <motion.span
            className="ml-auto"
            style={{
              fontSize: 8.5,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(56,189,248,0.55)",
              fontFamily: "'Courier New', monospace",
              fontWeight: 700,
            }}
            animate={{ opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ENGINEER.STATUS
          </motion.span>
        </div>

        <SectionLabel accentColor={SECTION_COLORS.identity}>
          identity
        </SectionLabel>
        {STATUS_ITEMS.map((item, i) => (
          <StatusRow key={item.label} {...item} delay={0.4 + i * 0.06} />
        ))}

        <SectionLabel accentColor={SECTION_COLORS.mindset}>
          mindset
        </SectionLabel>
        {MINDSET_ITEMS.map((item, i) => (
          <StatusRow key={item.label} {...item} delay={0.65 + i * 0.06} />
        ))}

        <SectionLabel accentColor={SECTION_COLORS.domains}>
          engineering domains
        </SectionLabel>
        <div style={{ paddingLeft: 2 }}>
          {DOMAIN_ITEMS.map((item, i) => (
            <DomainRow
              key={item.label}
              {...item}
              delay={0.85 + i * 0.07}
              prefix={i === DOMAIN_ITEMS.length - 1 ? "└─" : "├─"}
            />
          ))}
        </div>

        <SectionLabel accentColor={SECTION_COLORS.vector}>
          current vector
        </SectionLabel>
        <motion.div
          className="flex items-start gap-2"
          style={{ padding: "3px 0 0 2px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <ArrowRight
            size={10}
            color="#34d399"
            strokeWidth={2.5}
            style={{
              marginTop: 1,
              flexShrink: 0,
              filter: "drop-shadow(0 0 4px #34d39988)",
            }}
          />
          <span
            style={{
              fontSize: 9.5,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.72)",
              fontFamily: "'Courier New', monospace",
              fontWeight: 500,
            }}
          >
            Architecting resilient real-time infra
          </span>
        </motion.div>

        <SectionLabel accentColor={SECTION_COLORS.cycle}>
          execution cycle
        </SectionLabel>
        <motion.div
          className="flex items-center gap-1.5 flex-wrap"
          style={{ paddingLeft: 2, paddingBottom: 2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {["Observe", "Design", "Implement", "Refine"].map((word, i) => (
            <span key={word} className="flex items-center gap-1">
              <span
                style={{
                  fontSize: 9.5,
                  color: ["#38bdf8", "#a78bfa", "#34d399", "#fb923c"][i],
                  fontFamily: "'Courier New', monospace",
                  fontWeight: 700,
                  textShadow: `0 0 10px ${["#38bdf8", "#a78bfa", "#34d399", "#fb923c"][i]}55`,
                }}
              >
                {word}
              </span>
              {i < 3 && (
                <span
                  style={{
                    color: "rgba(255,255,255,0.2)",
                    fontFamily: "monospace",
                    fontSize: 9,
                  }}
                >
                  ›
                </span>
              )}
            </span>
          ))}
        </motion.div>

        <div
          className="flex items-center gap-1.5 mt-3 pt-2.5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <RotateCcw size={8} style={{ color: "rgba(255,255,255,0.22)" }} />
          <span
            style={{
              fontSize: 8,
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.18)",
              fontFamily: "'Courier New', monospace",
            }}
          >
            v2.0 // always building
          </span>
          <motion.div
            className="ml-auto w-1.5 h-1.5 rounded-full"
            style={{ background: "#34d399" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
