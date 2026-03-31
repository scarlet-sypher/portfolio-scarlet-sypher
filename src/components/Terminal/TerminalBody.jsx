import { useState, useRef, useEffect, useCallback } from "react";
import { handleCommand } from "./commandHandler";
import TerminalLine from "./TerminalLine";

const BOOT_LINES = [
  { type: "system", text: "scarlet-sypher terminal v1.0.0" },
  { type: "system", text: "type 'help' to see available commands." },
  { type: "system", text: "─────────────────────────────────────────" },
];

const mono = "'JetBrains Mono', 'Fira Code', monospace";

function Prompt({ cwd }) {
  const displayCwd = cwd === "/" ? "~" : "~" + cwd;
  return (
    <span style={{ color: "#a6e3a1", fontFamily: mono, fontSize: 11 }}>
      <span style={{ color: "#f38ba8" }}>⚡</span>
      <span style={{ color: "#cba6f7" }}> scarlet-sypher</span>
      <span style={{ color: "rgba(255,255,255,0.3)" }}> {displayCwd}</span>
      <span style={{ color: "#89dceb" }}> »</span>
      <span style={{ color: "#a6e3a1" }}>›</span>
      <span> </span>
    </span>
  );
}

export default function TerminalBody({ isMaximized }) {
  const [lines, setLines] = useState(BOOT_LINES);
  const [cwd, setCwd] = useState("/");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [lsInline, setLsInline] = useState(false);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const appendLines = useCallback((newLines) => {
    newLines.forEach((line, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
      }, i * 18);
    });
  }, []);

  const submit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const updatedHistory = [trimmed, ...history].slice(0, 80);
    setHistory(updatedHistory);
    setHistIdx(-1);

    const promptLine = {
      type: "input",
      text: `⚡ scarlet-sypher ${cwd === "/" ? "~" : "~" + cwd} »› ${trimmed}`,
    };

    const result = handleCommand(trimmed, cwd, setCwd);

    if (result.clear) {
      setLines([]);
      setInput("");
      return;
    }

    const outLines = result.lines || [];
    const newCwd = result.newCwd;

    if (newCwd !== undefined) setCwd(newCwd);

    const isLsGroup = outLines.some((l) => l.type === "ls-entry");

    if (isLsGroup) {
      setLines((prev) => [
        ...prev,
        promptLine,
        { type: "_ls_block", entries: outLines },
      ]);
    } else {
      setLines((prev) => [...prev, promptLine]);
      if (outLines.length > 0) appendLines(outLines);
    }

    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "transparent",
        overflow: "hidden",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 18px 8px",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(203,166,247,0.3) transparent",
        }}
      >
        {lines.map((line, i) => {
          if (line.type === "_ls_block") {
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 4,
                  padding: "2px 0 4px",
                }}
              >
                {line.entries.map((entry, j) => (
                  <TerminalLine key={j} line={entry} />
                ))}
              </div>
            );
          }
          return <TerminalLine key={i} line={line} />;
        })}
        <div ref={bottomRef} />
      </div>

      <div
        style={{
          padding: "8px 18px 14px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          gap: 0,
          flexShrink: 0,
        }}
      >
        <Prompt cwd={cwd} />
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontFamily: mono,
            fontSize: 11,
            color: "rgba(255,255,255,0.88)",
            caretColor: "#a6e3a1",
          }}
        />
        <span
          style={{
            display: "inline-block",
            width: 7,
            height: 14,
            background: "#a6e3a1",
            animation: "blink 1.1s step-end infinite",
            borderRadius: 1,
            flexShrink: 0,
          }}
        />
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(203,166,247,0.3); border-radius: 2px; }
        ::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
}
