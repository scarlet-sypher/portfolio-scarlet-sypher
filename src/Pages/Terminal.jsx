import TerminalBody from "../components/Terminal/TerminalBody";

export default function Terminal({ isMaximized }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "rgba(10, 10, 18, 0.95)",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&display=swap');`}</style>
      <TerminalBody isMaximized={isMaximized} />
    </div>
  );
}
