import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ darkBook, onToggleDark }) {
  return (
    <button
      onClick={onToggleDark}
      title="Toggle book theme"
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 30,
        width: 36,
        height: 36,
        borderRadius: 10,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.11)",
        color: darkBook ? "rgba(255,220,100,0.75)" : "rgba(180,210,255,0.65)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition:
          "background 0.2s, border-color 0.2s, color 0.2s, transform 0.15s",
        outline: "none",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.11)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        e.currentTarget.style.transform = "scale(1.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.11)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {darkBook ? (
        <Sun size={14} strokeWidth={1.75} />
      ) : (
        <Moon size={14} strokeWidth={1.75} />
      )}
    </button>
  );
}
