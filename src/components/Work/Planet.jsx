export default function Planet({
  size,
  color,
  style,
  ring = false,
  speed = 30,
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 33% 33%, ${color}60 0%, ${color}18 55%, transparent 100%)`,
        border: `1px solid ${color}25`,
        boxShadow: `0 0 ${size * 0.55}px ${color}12`,
        animation: `bkPlanet ${speed}s linear infinite`,
        pointerEvents: "none",
        zIndex: 1,
        ...style,
      }}
    >
      {ring && (
        <div
          style={{
            position: "absolute",
            top: "38%",
            left: "-30%",
            width: "160%",
            height: "24%",
            borderRadius: "50%",
            border: `2px solid ${color}30`,
            transform: "rotateX(72deg)",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
