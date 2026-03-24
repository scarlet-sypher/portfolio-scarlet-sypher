export default function Home() {
  return (
    <div
      className="h-full flex flex-col items-center justify-center gap-4 p-8"
      style={{ color: "rgba(255, 255, 255, 0.7)" }}
    >
      <div className="text-5xl">🏠</div>
      <div
        className="text-lg font-semibold tracking-widest"
        style={{ fontFamily: "'Courier New', monospace" }}
      >
        HOME
      </div>
      <div className="text-xs tracking-wider opacity-40">
        Welcome to your desktop
      </div>
    </div>
  );
}
