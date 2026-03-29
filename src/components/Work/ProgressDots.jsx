export default function ProgressDots({ dotCount, activeDot }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "rgba(0,0,0,0.38)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 20,
        padding: "5px 14px",
        backdropFilter: "blur(8px)",
      }}
    >
      {Array.from({ length: dotCount }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === activeDot ? 18 : 5,
            height: 5,
            borderRadius: 3,
            background: i === activeDot ? "#4f8ef7" : "rgba(255,255,255,0.2)",
            transition: "all 0.35s ease",
          }}
        />
      ))}
    </div>
  );
}
