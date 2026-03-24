import { useState } from "react";

const APP_TOOLS = ["✏️", "🪣", "✂️", "🔍", "🎨", "⬜", "⭕", "📝", "💧", "🖐️"];
const APP_LAYERS = ["Background", "Layer 2", "Layer 3", "Adjustment"];
const LAYER_PROPERTIES = [
  ["Opacity", "100%"],
  ["Fill", "100%"],
  ["Blend", "Normal"],
];

export default function Photoshop() {
  const [activeTool, setActiveTool] = useState(0);
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <div className="h-full flex" style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: 12 }}>
      <div
        className="w-10 flex flex-col items-center py-3 gap-1 shrink-0"
        style={{
          background: "rgba(0, 0, 0, 0.3)",
          borderRight: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        {APP_TOOLS.map((tool, index) => (
          <button
            key={index}
            onClick={() => setActiveTool(index)}
            className="w-7 h-7 rounded flex items-center justify-center text-sm transition-all"
            style={{
              background: index === activeTool ? "rgba(46, 158, 255, 0.35)" : "transparent",
            }}
          >
            {tool}
          </button>
        ))}
      </div>

      <div
        className="flex-1 flex items-center justify-center"
        style={{ background: "rgba(0, 0, 0, 0.25)" }}
      >
        <div className="relative" style={{ width: 320, height: 240 }}>
          <div
            className="w-full h-full rounded"
            style={{
              background: "linear-gradient(135deg, rgba(46,158,255,0.2), rgba(145,40,255,0.2), rgba(255,145,40,0.2))",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                color: "rgba(255, 255, 255, 0.1)",
                fontSize: 11,
                letterSpacing: "0.3em",
              }}
            >
              CANVAS
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-44 flex flex-col shrink-0"
        style={{
          borderLeft: "1px solid rgba(255, 255, 255, 0.06)",
          background: "rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="p-3 border-b" style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}>
          <div className="text-[9px] tracking-widest mb-2 text-white/30">
            COLOR
          </div>
          <div className="flex gap-2">
            <div
              className="w-8 h-8 rounded"
              style={{
                background: "#2e9eff",
                border: "2px solid rgba(255, 255, 255, 0.3)",
              }}
            />
            <div className="w-8 h-8 rounded" style={{ background: "#1a1a2e" }} />
          </div>
        </div>

        <div className="p-3 flex-1">
          <div className="text-[9px] tracking-widest mb-2 text-white/30">
            LAYERS
          </div>
          {APP_LAYERS.map((layer, index) => (
            <button
              key={index}
              onClick={() => setActiveLayer(index)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded mb-1 text-left transition-all"
              style={{
                background: index === activeLayer ? "rgba(46, 158, 255, 0.2)" : "rgba(255, 255, 255, 0.03)",
                border: index === activeLayer ? "1px solid rgba(46, 158, 255, 0.3)" : "1px solid transparent",
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: 10,
              }}
            >
              <span>👁</span>
              <span className="truncate">{layer}</span>
            </button>
          ))}
        </div>

        <div className="p-3 border-t" style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}>
          {LAYER_PROPERTIES.map(([key, value]) => (
            <div key={key} className="flex justify-between mb-1.5">
              <span className="text-[10px] text-white/30">{key}</span>
              <span className="text-[10px] text-white/60">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
