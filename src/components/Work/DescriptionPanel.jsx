export default function DescriptionPanel({ work, bookH }) {
  if (!work) return null;
  const panelH = bookH - 100;

  return (
    <div
      key={work.id}
      style={{
        width: 300,
        height: panelH,
        flexShrink: 0,
        borderRadius: 16,
        position: "relative",
        overflow: "hidden",
        background: "rgba(6, 14, 26, 0.70)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: `0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07), 0 0 40px ${work.color}14`,
        padding: "22px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        animation: "panelFadeUp 0.4s cubic-bezier(0.22,1,0.36,1) both",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "150px",
          pointerEvents: "none",
          borderRadius: 16,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -18,
          right: -18,
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${work.color}28 0%, transparent 70%)`,
          filter: "blur(14px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            flexShrink: 0,
            background: `linear-gradient(135deg, ${work.color}44, ${work.color}18)`,
            border: `1px solid ${work.color}50`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <work.Icon size={16} color={work.color} strokeWidth={1.5} />
        </div>
        <div>
          <div
            style={{
              fontSize: 11.5,
              fontWeight: 600,
              color: "rgba(230,240,255,0.92)",
              fontFamily: "'DM Sans', system-ui, sans-serif",
              lineHeight: 1.2,
            }}
          >
            {work.title}
          </div>
          <div
            style={{
              fontSize: 8,
              color: work.color,
              opacity: 0.85,
              fontFamily: "monospace",
              letterSpacing: "0.05em",
            }}
          >
            {work.period}
          </div>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background: `linear-gradient(90deg, ${work.color}44, rgba(255,255,255,0.04), transparent)`,
          position: "relative",
          zIndex: 1,
        }}
      />

      <p
        style={{
          margin: 0,
          flex: 1,
          fontSize: 15,
          color: "rgba(195,215,240,0.80)",
          lineHeight: 1.82,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontWeight: 300,
          position: "relative",
          zIndex: 1,
        }}
      >
        {work.description}
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 5,
          position: "relative",
          zIndex: 1,
        }}
      >
        {work.tags.map((t) => (
          <span
            key={t}
            style={{
              padding: "2px 8px",
              borderRadius: 20,
              background: `${work.color}18`,
              border: `1px solid ${work.color}32`,
              color: work.accent,
              fontSize: 7.5,
              fontFamily: "monospace",
              letterSpacing: "0.04em",
              fontWeight: 500,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
