import FastFetch from "./FastFetch";

export default function TerminalLine({ line }) {
  const mono = "'JetBrains Mono', 'Fira Code', monospace";

  if (line.type === "fastfetch") {
    return <FastFetch img={line.img} />;
  }

  if (line.type === "blank") {
    return <div style={{ height: 6 }} />;
  }

  if (line.type === "section") {
    return (
      <div
        style={{
          fontFamily: mono,
          fontSize: 10,
          color: "#cba6f7",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginTop: 4,
          marginBottom: 2,
        }}
      >
        ── {line.text} ──
      </div>
    );
  }

  if (line.type === "cmd-row") {
    return (
      <div
        style={{
          display: "flex",
          gap: 0,
          fontFamily: mono,
          fontSize: 11,
          lineHeight: 1.6,
        }}
      >
        <span style={{ color: "#a6e3a1", minWidth: 200 }}>{line.cmd}</span>
        <span style={{ color: "rgba(255,255,255,0.45)" }}>{line.desc}</span>
      </div>
    );
  }

  if (line.type === "ls-entry") {
    return (
      <span
        style={{
          fontFamily: mono,
          fontSize: 11,
          color: line.isDir ? "#89dceb" : "#f5c2e7",
          marginRight: 18,
          display: "inline-block",
          lineHeight: 1.8,
        }}
      >
        {line.isDir ? "📁 " : "📄 "}
        {line.text}
        {line.isDir ? "/" : ""}
      </span>
    );
  }

  if (line.type === "file-entry") {
    return (
      <span
        style={{
          fontFamily: mono,
          fontSize: 11,
          color: "#f5c2e7",
          lineHeight: 1.8,
        }}
      >
        📄 {line.text}
      </span>
    );
  }

  if (line.type === "error") {
    return (
      <div
        style={{
          fontFamily: mono,
          fontSize: 11,
          color: "#f38ba8",
          lineHeight: 1.6,
        }}
      >
        {line.text}
      </div>
    );
  }

  if (line.type === "input") {
    return (
      <div
        style={{
          fontFamily: mono,
          fontSize: 11,
          color: "#a6e3a1",
          lineHeight: 1.6,
        }}
      >
        {line.text}
      </div>
    );
  }

  if (line.type === "system") {
    return (
      <div
        style={{
          fontFamily: mono,
          fontSize: 10,
          color: "rgba(255,255,255,0.28)",
          lineHeight: 1.5,
        }}
      >
        {line.text}
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: mono,
        fontSize: 11,
        color: "rgba(255,255,255,0.65)",
        lineHeight: 1.65,
        whiteSpace: "pre-wrap",
      }}
    >
      {line.text}
    </div>
  );
}
