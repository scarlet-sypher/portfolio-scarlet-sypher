import { motion, AnimatePresence } from "framer-motion";

function HoverPrompt() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 5,
        background: "rgba(8,9,14,0.5)",
        backdropFilter: "blur(4px)",
        pointerEvents: "none",
        borderRadius: 2,
      }}
    >
      <div
        style={{
          padding: "8px 16px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.65)",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Click on the folder to select
      </div>
    </motion.div>
  );
}

export default function RightPanel({
  categoryKey,
  data,
  isLocked,
  onOpen,
  onDiscard,
}) {
  return (
    <AnimatePresence>
      {categoryKey && data && (
        <motion.div
          key={categoryKey}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "300px",
            height: "100%",
            background: "rgba(14,15,21,0.97)",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 10,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <div
            style={{
              padding: "20px 20px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              flexShrink: 0,
              background: "rgba(255,255,255,0.015)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: isLocked ? data.color : "rgba(255,255,255,0.2)",
                  transition: "background 0.3s",
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  letterSpacing: "0.3em",
                  color: isLocked ? `${data.color}99` : "rgba(255,255,255,0.2)",
                  textTransform: "uppercase",
                  fontFamily: "'Courier New', monospace",
                  transition: "color 0.3s",
                }}
              >
                {isLocked ? "Selected Folder" : "Preview"}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: `${data.color}18`,
                  border: `1px solid ${data.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: data.color,
                    opacity: 0.85,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: data.color,
                  letterSpacing: "0.07em",
                }}
              >
                {data.label.toUpperCase()}
              </span>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "18px 20px",
              position: "relative",
            }}
          >
            <p
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.7,
                marginBottom: 14,
              }}
            >
              {data.description}
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 11px",
                borderRadius: 20,
                background: `${data.color}12`,
                border: `1px solid ${data.color}28`,
                fontSize: 10,
                color: data.color,
                letterSpacing: "0.06em",
                marginBottom: 22,
              }}
            >
              <span style={{ opacity: 0.6 }}>⬡</span>
              {data.count} {data.count === 1 ? "certificate" : "certificates"}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(255,255,255,0.05)",
                }}
              />
              <span
                style={{
                  fontSize: 8,
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.9)",
                  textTransform: "uppercase",
                  fontFamily: "'Courier New', monospace",
                }}
              >
                Contents
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(255,255,255,0.05)",
                }}
              />
            </div>

            {Object.entries(data.certificates).map(([issuer, certs]) => (
              <div key={issuer} style={{ marginBottom: 18 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 3,
                      height: 3,
                      borderRadius: "50%",
                      background: data.color,
                      opacity: 0.5,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: data.color,
                      letterSpacing: "0.09em",
                      opacity: 0.95,
                    }}
                  >
                    {issuer}
                  </span>
                </div>

                <div
                  style={{
                    borderLeft: `1px solid ${data.color}20`,
                    marginLeft: 5,
                    paddingLeft: 12,
                  }}
                >
                  {certs.map((cert) => (
                    <div
                      key={cert.id}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 8,
                        padding: "6px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.03)",
                      }}
                    >
                      <div
                        style={{
                          width: 3,
                          height: 3,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.15)",
                          flexShrink: 0,
                          marginTop: 5,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.92)",
                          lineHeight: 1.45,
                        }}
                      >
                        {cert.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <AnimatePresence>{!isLocked && <HoverPrompt />}</AnimatePresence>
          </div>

          <AnimatePresence>
            {isLocked && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.18 }}
                style={{
                  padding: "14px 20px 16px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  gap: 8,
                  flexShrink: 0,
                  background: "rgba(255,255,255,0.015)",
                }}
              >
                <button
                  onClick={() => onOpen(categoryKey)}
                  style={{
                    flex: 1,
                    padding: "9px 0",
                    borderRadius: 7,
                    border: `1px solid ${data.color}44`,
                    background: `${data.color}18`,
                    color: data.color,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    cursor: "pointer",
                    fontFamily: "'Poppins', sans-serif",
                    textTransform: "uppercase",
                    transition: "background 0.18s, border-color 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${data.color}32`;
                    e.currentTarget.style.borderColor = `${data.color}77`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${data.color}18`;
                    e.currentTarget.style.borderColor = `${data.color}44`;
                  }}
                >
                  Open
                </button>
                <button
                  onClick={onDiscard}
                  style={{
                    flex: 1,
                    padding: "9px 0",
                    borderRadius: 7,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    cursor: "pointer",
                    fontFamily: "'Poppins', sans-serif",
                    textTransform: "uppercase",
                    transition:
                      "background 0.18s, color 0.18s, border-color 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                  }}
                >
                  Discard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
