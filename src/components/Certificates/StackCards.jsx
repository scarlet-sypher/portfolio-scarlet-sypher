import { useRef, useEffect } from "react";
import {
  Brain,
  Code2,
  Cloud,
  Database,
  ShieldAlert,
  Network,
  Cpu,
  Globe,
  LayoutGrid,
  Briefcase,
  FlaskConical,
} from "lucide-react";

const CARDS = [
  { label: "Internship", categoryKey: "internship", Icon: Briefcase },
  { label: "AI", categoryKey: "ai", Icon: Brain },
  { label: "Cloud", categoryKey: "cloud", Icon: Cloud },
  { label: "Cybersecurity", categoryKey: "cybersecurity", Icon: ShieldAlert },
  { label: "Database", categoryKey: "database", Icon: Database },
  { label: "Networking", categoryKey: "networking", Icon: Network },
  { label: "Hardware", categoryKey: "hardware", Icon: Cpu },
  { label: "Python", categoryKey: "python", Icon: Code2 },
  { label: "Web Dev", categoryKey: "webdev", Icon: Globe },
  { label: "Research", categoryKey: "research", Icon: FlaskConical },
  { label: "Other", categoryKey: "other", Icon: LayoutGrid },
];

const cardBaseStyle = {
  position: "absolute",
  top: 0,
  width: "300px",
  height: "300px",
  background: "#4a4a4a",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  transition: "0.5s",
  fontSize: "2em",
  fontWeight: 700,
  padding: "10px",
  border: "1px solid rgba(0,0,0,1)",
  WebkitTextStroke: "1px rgba(255,255,255,0.33)",
  color: "transparent",
  cursor: "pointer",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  userSelect: "none",
};

function StackCard({
  index,
  label,
  categoryKey,
  Icon,
  isActive,
  onCardClick,
  onHover,
}) {
  const iconRef = useRef(null);
  const chipRef = useRef(null);
  const isHoveredRef = useRef(false);

  const zPos = index * -120;
  const yPos = index * -20;

  useEffect(() => {
    const el = iconRef.current;
    if (!el) return;
    if (isActive) {
      el.style.transition = "0.3s";
      el.style.top = "-15%";
      el.style.color = "#333";
      el.style.WebkitTextStroke = "0px";
      el.style.boxShadow = "0 0 50px #64ff74, inset 0 0 120px #64ff74";
    } else if (!isHoveredRef.current) {
      el.style.transition = "0.5s";
      el.style.top = "0";
      el.style.color = "transparent";
      el.style.WebkitTextStroke = "1px rgba(255,255,255,0.33)";
      el.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
    }
  }, [isActive]);

  const showChip = () => {
    const chip = chipRef.current;
    if (!chip) return;
    chip.style.opacity = "1";
    chip.style.transform = "translateX(-50%) translateY(-4px)";
  };

  const hideChip = () => {
    const chip = chipRef.current;
    if (!chip) return;
    chip.style.opacity = "0";
    chip.style.transform = "translateX(-50%) translateY(4px)";
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    onHover(categoryKey);
    showChip();
    if (isActive) return;
    const el = iconRef.current;
    if (!el) return;
    el.style.transition = "0.01s";
    el.style.top = "-15%";
    el.style.color = "#333";
    el.style.WebkitTextStroke = "0px";
    el.style.boxShadow = "0 0 50px #64ff74, inset 0 0 120px #64ff74";
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    onHover(null);
    hideChip();
    if (isActive) return;
    const el = iconRef.current;
    if (!el) return;
    el.style.transition = "0.5s";
    el.style.top = "0";
    el.style.color = "transparent";
    el.style.WebkitTextStroke = "1px rgba(255,255,255,0.33)";
    el.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";
  };

  return (
    <div
      ref={iconRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => {
        e.stopPropagation();
        onCardClick(categoryKey);
      }}
      style={{
        ...cardBaseStyle,
        transform: `translateZ(${zPos}px) translateY(${yPos}px)`,
        filter: `hue-rotate(${index * 30}deg)`,
      }}
    >
      <div
        ref={chipRef}
        style={{
          position: "absolute",
          top: "-48px",
          left: "50%",
          transform: "translateX(-50%) translateY(4px)",
          opacity: 0,
          transition: "opacity 0.18s ease, transform 0.18s ease",
          display: "flex",
          alignItems: "center",
          gap: "7px",
          padding: "5px 13px",
          borderRadius: "20px",
          background: "rgba(15,15,20,0.92)",
          border: "1px solid rgba(100,255,116,0.35)",
          boxShadow: "0 0 12px rgba(100,255,116,0.2)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          fontSize: "13px",
          fontWeight: 600,
          color: "#64ff74",
          WebkitTextStroke: "0px",
          filter: "none",
        }}
      >
        <Icon size={14} style={{ color: "#64ff74", flexShrink: 0 }} />
        <span
          style={{
            letterSpacing: "0.06em",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {label}
        </span>
      </div>

      {label}
    </div>
  );
}

export default function FolderGate({ activeCard, onCardClick, onHover }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        perspective: "2500px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap');`}</style>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "300px",
          height: "400px",
          transformStyle: "preserve-3d",
          transform: "translate(5%, -30%) rotateY(20deg)",
        }}
      >
        {CARDS.map((card, i) => (
          <StackCard
            key={card.categoryKey}
            index={i}
            label={card.label}
            categoryKey={card.categoryKey}
            Icon={card.Icon}
            isActive={activeCard === card.categoryKey}
            onCardClick={onCardClick}
            onHover={onHover}
          />
        ))}
      </div>
    </div>
  );
}
