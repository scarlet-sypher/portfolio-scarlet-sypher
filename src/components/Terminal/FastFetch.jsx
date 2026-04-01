export default function FastFetch({ img }) {
  const info = [
    { label: "name", value: "Ayush Jha", color: "#a6e3a1" },
    { label: "role", value: "Full Stack Developer", color: "#89dceb" },
    { label: "os", value: "Arch Linux", color: "#f38ba8" },
    { label: "kernel", value: "6.18.9-arch1-2", color: "#f38ba8" },
    { label: "terminal", value: "Hybrid", color: "#cba6f7" },
    { label: "wm", value: "Hyprland", color: "#cba6f7" },
    { label: "stack", value: "React · Node · MongoDB", color: "#fab387" },
    { label: "realtime", value: "Socket.IO · JWT · OAuth", color: "#fab387" },
    {
      label: "projects",
      value: "3 (WhisperTails, HelpMeMake, CryBug)",
      color: "#a6e3a1",
    },
    {
      label: "experience",
      value: "Orbosis Global — Full-Stack Intern",
      color: "#89dceb",
    },
    { label: "dsa", value: "150+ problems solved", color: "#f9e2af" },
    { label: "uptime", value: "3rd year CS student", color: "#f9e2af" },
  ];

  const palette = [
    "#f38ba8",
    "#a6e3a1",
    "#89dceb",
    "#cba6f7",
    "#fab387",
    "#f9e2af",
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        padding: "8px 0",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 250,
          height: 250,
          borderRadius: 12,
          overflow: "hidden",

          background: "rgba(10,10,20,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={img}
          alt="fastfetch"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 200 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: 11,
            marginBottom: 6,
            color: "#cba6f7",
            letterSpacing: "0.05em",
          }}
        >
          scarlet-sypher @ scarlet-sypher
        </div>
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(to right, rgba(203,166,247,0.6), transparent)",
            marginBottom: 8,
            width: "80%",
          }}
        />

        {info.map((row, i) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 2,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: 10.5,
            }}
          >
            <span
              style={{ color: row.color, minWidth: 80, textAlign: "right" }}
            >
              {row.label}
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>:</span>
            <span style={{ color: "rgba(255,255,255,0.78)" }}>{row.value}</span>
          </div>
        ))}

        <div style={{ marginTop: 10, display: "flex", gap: 5 }}>
          {palette.map((c) => (
            <div
              key={c}
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                background: c,
                boxShadow: `0 0 6px ${c}60`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
