import { useState } from "react";
import { Search, RefreshCw, ArrowLeft, ArrowRight, Star } from "lucide-react";

const BOOKMARKS = ["Google", "GitHub", "YouTube", "Twitter", "Reddit"];
const QUICK_LINKS = ["🔍 Google", "📦 GitHub", "▶️ YouTube", "🐦 Twitter"];

export default function Chrome() {
  const [url, setUrl] = useState("https://www.google.com");

  return (
    <div className="h-full flex flex-col" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
      <div
        className="flex items-center gap-2 px-3 py-2 shrink-0"
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
        }}
      >
        <button style={{ color: "rgba(255, 255, 255, 0.3)" }}>
          <ArrowLeft size={14} />
        </button>
        <button style={{ color: "rgba(255, 255, 255, 0.3)" }}>
          <ArrowRight size={14} />
        </button>
        <button style={{ color: "rgba(255, 255, 255, 0.3)" }}>
          <RefreshCw size={12} />
        </button>

        <div
          className="flex-1 flex items-center gap-2 px-3 py-1 rounded-lg"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Search size={11} style={{ color: "rgba(255, 255, 255, 0.3)" }} />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent text-xs outline-none"
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
          />
        </div>
        <button style={{ color: "rgba(255, 255, 255, 0.3)" }}>
          <Star size={13} />
        </button>
      </div>

      <div
        className="flex items-center gap-1 px-3 py-1.5 shrink-0"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        {BOOKMARKS.map((bookmark) => (
          <button
            key={bookmark}
            className="text-[10px] px-2 py-1 rounded"
            style={{ color: "rgba(255, 255, 255, 0.4)" }}
            onMouseEnter={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.06)")}
            onMouseLeave={(e) => (e.target.style.background = "transparent")}
          >
            {bookmark}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
        <div
          className="text-4xl font-bold tracking-widest"
          style={{
            fontFamily: "'Courier New', monospace",
            color: "rgba(255, 255, 255, 0.15)",
          }}
        >
          New Tab
        </div>
        
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl w-80"
          style={{
            background: "rgba(255, 255, 255, 0.07)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <Search size={14} style={{ color: "rgba(255, 255, 255, 0.3)" }} />
          <input
            placeholder="Search Google or type a URL"
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-white/20"
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
          />
        </div>
        
        <div className="grid grid-cols-4 gap-4 mt-4">
          {QUICK_LINKS.map((link) => (
            <div key={link} className="flex flex-col items-center gap-2">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: "rgba(255, 255, 255, 0.07)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {link[0]}
              </div>
              <span className="text-[10px]" style={{ color: "rgba(255, 255, 255, 0.3)" }}>
                {link.slice(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
