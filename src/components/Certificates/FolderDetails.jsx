import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import CertificateModal from "./CertificateModal";

const CERT_COLORS = [
  {
    bg: "linear-gradient(145deg,#ff6b6b,#ee0979)",
    accent: "#ff6b6b",
    text: "#fff",
  },
  {
    bg: "linear-gradient(145deg,#f7971e,#ffd200)",
    accent: "#ffd200",
    text: "#1a1000",
  },
  {
    bg: "linear-gradient(145deg,#43e97b,#38f9d7)",
    accent: "#43e97b",
    text: "#002a1a",
  },
  {
    bg: "linear-gradient(145deg,#4facfe,#00f2fe)",
    accent: "#4facfe",
    text: "#001833",
  },
  {
    bg: "linear-gradient(145deg,#a18cd1,#fbc2eb)",
    accent: "#c084fc",
    text: "#1a0028",
  },
  {
    bg: "linear-gradient(145deg,#f093fb,#f5576c)",
    accent: "#f093fb",
    text: "#1a0015",
  },
  {
    bg: "linear-gradient(145deg,#4481eb,#04befe)",
    accent: "#04befe",
    text: "#001833",
  },
  {
    bg: "linear-gradient(145deg,#fa709a,#fee140)",
    accent: "#fa709a",
    text: "#1a0010",
  },
  {
    bg: "linear-gradient(145deg,#30cfd0,#330867)",
    accent: "#30cfd0",
    text: "#000d33",
  },
  {
    bg: "linear-gradient(145deg,#a1ffce,#faffd1)",
    accent: "#a1ffce",
    text: "#001a10",
  },
];

export default function FolderDetails({ categoryKey, categoryData, onBack }) {
  const [activeCert, setActiveCert] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const allCerts = Object.entries(categoryData.certificates).flatMap(
    ([groupName, certs]) =>
      certs.map((cert, i) => ({
        ...cert,
        groupName,
        colorScheme: CERT_COLORS[i % CERT_COLORS.length],
      })),
  );

  const total = allCerts.length;
  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  const getCard = (offset) => {
    const idx = (activeIndex + offset + total * 100) % total;
    return { cert: allCerts[idx], idx };
  };

  const fanCards = [-2, -1, 0, 1, 2];
  const activeCertData = allCerts[activeIndex];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          style={{
            position: "absolute",
            top: "-15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "150%",
            height: "70%",
            background: `radial-gradient(ellipse at 50% 0%, ${activeCertData?.colorScheme?.accent ?? categoryData.color}28 0%, transparent 65%)`,
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "-8%",
            width: "40%",
            height: "38%",
            background: `radial-gradient(circle, ${categoryData.color}16 0%, transparent 70%)`,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "-8%",
            width: "32%",
            height: "32%",
            background: `radial-gradient(circle, ${activeCertData?.colorScheme?.accent ?? categoryData.color}12 0%, transparent 70%)`,
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "38%",
            background:
              "linear-gradient(to top, rgba(5,5,14,0.94) 0%, transparent 100%)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "16px 22px 14px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexShrink: 0,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.15)",
          backdropFilter: "blur(10px)",
        }}
      >
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.07, background: "rgba(255,255,255,0.1)" }}
          whileTap={{ scale: 0.92 }}
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <ArrowLeft size={15} />
        </motion.button>

        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: "10px 14px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.08)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
            e.currentTarget.style.boxShadow = `0 10px 25px ${categoryData.color}33`;
            e.currentTarget.style.border = `1px solid ${categoryData.color}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "3px",
              background: categoryData.color,
              boxShadow: `0 0 10px ${categoryData.color}`,
            }}
          />

          <div style={{ paddingLeft: 10 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: "900",
                color: categoryData.color,
                letterSpacing: "0.25em",
                fontFamily: "'Courier New', monospace",
                textTransform: "uppercase",
                // textShadow: `0 0 6px ${categoryData.color}88`,
              }}
            >
              {categoryData.label}
            </div>

            <div
              style={{
                fontSize: 11,
                marginTop: 4,
                color: "rgba(255,255,255,0.55)",
                fontWeight: 500,
                letterSpacing: "0.08em",
              }}
            >
              {categoryData.count}{" "}
              <span style={{ opacity: 0.6 }}>
                {categoryData.count === 1 ? "certificate" : "certificates"}
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.12em",
            color: categoryData.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 36,
            backdropFilter: "blur(10px)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.border = `1px solid ${categoryData.color}55`;
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
            e.currentTarget.style.transform = "none";
          }}
        >
          {categoryData.count}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "16px 0 0",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "9px 18px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.045)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(14px)",
            marginBottom: 22,
            position: "relative",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.border = "1px solid rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.045)";
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.border = "1px solid rgba(255,255,255,0.12)";
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 10,
              right: 10,
              height: 1,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 2,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: categoryData.color,
              flexShrink: 0,
              transform: "scale(1)",
              transition: "transform 0.25s ease",
            }}
          />

          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.24em",
              color: "rgba(255,255,255,0.92)",
              fontFamily: "'Courier New', monospace",
              textTransform: "uppercase",
              fontWeight: 800,
              whiteSpace: "nowrap",
            }}
          >
            {categoryData.label}
          </span>

          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: categoryData.color,
              flexShrink: 0,
              transform: "scale(1)",
              transition: "transform 0.25s ease",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: 290,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            perspective: "1000px",
          }}
        >
          {fanCards.map((offset) => {
            const { cert } = getCard(offset);
            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);
            const cs = cert.colorScheme;

            const rotateY = offset * 20;
            const translateX = offset * 118;
            const translateZ = isCenter ? 0 : -50 - absOffset * 38;
            const scale = isCenter ? 1 : 0.77 - absOffset * 0.06;
            const opacity = isCenter ? 1 : 0.48 - absOffset * 0.1;
            const zIndex = 10 - absOffset * 2;

            return (
              <motion.div
                key={`${cert.id}-${offset}`}
                animate={{
                  rotateY,
                  x: translateX,
                  z: translateZ,
                  scale,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 26,
                  mass: 0.85,
                }}
                onClick={() => {
                  if (!isCenter) {
                    setActiveIndex(
                      (activeIndex + offset + total * 100) % total,
                    );
                  }
                }}
                style={{
                  position: "absolute",
                  width: 188,
                  borderRadius: 22,
                  overflow: "hidden",
                  cursor: isCenter ? "default" : "pointer",
                  transformStyle: "preserve-3d",
                  zIndex,
                  boxShadow: isCenter
                    ? `0 28px 64px rgba(0,0,0,0.65), 0 0 0 1.5px ${cs.accent}55`
                    : "0 10px 30px rgba(0,0,0,0.45)",
                }}
              >
                <div
                  style={{
                    background: isCenter ? cs.bg : "rgba(28,28,42,0.88)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    border: isCenter
                      ? "1px solid rgba(255,255,255,0.28)"
                      : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 22,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "52%",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 100%)",
                      borderRadius: "22px 22px 0 0",
                      pointerEvents: "none",
                      zIndex: 1,
                    }}
                  />

                  <div
                    style={{
                      height: 160,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      background: isCenter
                        ? "rgba(0,0,0,0.14)"
                        : `linear-gradient(140deg, ${cs.accent}1a, rgba(255,255,255,0.02))`,
                    }}
                  >
                    <svg
                      width="58"
                      height="58"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isCenter ? "rgba(255,255,255,0.92)" : cs.accent}
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        filter: isCenter
                          ? "drop-shadow(0 3px 10px rgba(0,0,0,0.35))"
                          : "none",
                        transition: "stroke 0.3s",
                      }}
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="9" y1="13" x2="15" y2="13" />
                      <line x1="9" y1="17" x2="11" y2="17" />
                    </svg>

                    {isCenter && (
                      <div
                        style={{
                          position: "absolute",
                          top: 13,
                          right: 13,
                          width: 9,
                          height: 9,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.65)",
                        }}
                      />
                    )}
                  </div>

                  <div
                    style={{
                      padding: "12px 15px 15px",
                      background: isCenter
                        ? "rgba(0,0,0,0.28)"
                        : "rgba(8,8,18,0.72)",
                      borderTop: isCenter
                        ? "1px solid rgba(255,255,255,0.14)"
                        : "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: isCenter
                          ? "rgba(255,255,255,0.95)"
                          : "rgba(255,255,255,0.38)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {cert.name}
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        marginTop: 3,
                        color: isCenter ? cs.accent : "rgba(255,255,255,0.2)",
                        fontFamily: "'Courier New', monospace",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {cert.groupName}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ marginTop: 20, textAlign: "center", padding: "0 28px" }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "rgba(255,255,255,0.92)",
              letterSpacing: "0.03em",
            }}
          >
            {activeCertData?.name}
          </div>
          <div
            style={{
              fontSize: 10,
              marginTop: 5,
              color: activeCertData?.colorScheme?.accent ?? categoryData.color,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontFamily: "'Courier New', monospace",
            }}
          >
            {activeCertData?.groupName}
          </div>
        </motion.div>

        <div
          style={{
            marginTop: 18,
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 18px",
            borderRadius: 40,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.12, background: "rgba(255,255,255,0.12)" }}
            whileTap={{ scale: 0.88 }}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={19} />
          </motion.button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              minWidth: 168,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                flexShrink: 0,
                background:
                  activeCertData?.colorScheme?.bg ??
                  `linear-gradient(135deg, ${categoryData.color}44, ${categoryData.color}22)`,
                border: "1px solid rgba(255,255,255,0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.88)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 110,
                }}
              >
                {activeCertData?.name}
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "rgba(255,255,255,0.35)",
                  marginTop: 2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: 110,
                  letterSpacing: "0.05em",
                }}
              >
                {activeCertData?.groupName}
              </div>

              <div
                style={{
                  marginTop: 5,
                  height: 3,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.1)",
                  overflow: "hidden",
                  width: 110,
                }}
              >
                <motion.div
                  animate={{ width: `${((activeIndex + 1) / total) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{
                    height: "100%",
                    borderRadius: 2,
                    background:
                      activeCertData?.colorScheme?.accent ?? categoryData.color,
                  }}
                />
              </div>
            </div>
          </div>

          <motion.button
            onClick={() => setActiveCert(activeCertData)}
            whileHover={{ scale: 1.06, filter: "brightness(1.1)" }}
            whileTap={{ scale: 0.93 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "9px 17px",
              borderRadius: 22,
              background:
                activeCertData?.colorScheme?.accent ?? categoryData.color,
              border: "none",
              cursor: "pointer",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.1em",
              color: activeCertData?.colorScheme?.text ?? "#fff",
              whiteSpace: "nowrap",
            }}
          >
            <Eye size={12} />
            VIEW
          </motion.button>

          <motion.button
            onClick={next}
            whileHover={{ scale: 1.12, background: "rgba(255,255,255,0.12)" }}
            whileTap={{ scale: 0.88 }}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <ChevronRight size={19} />
          </motion.button>
        </div>

        <div
          style={{
            display: "flex",
            gap: 7,
            marginBottom: 16,
            alignItems: "center",
          }}
        >
          {allCerts.map((c, i) => (
            <motion.button
              key={i}
              onClick={() => setActiveIndex(i)}
              animate={{
                scale: i === activeIndex ? 1.3 : 1,
                background:
                  i === activeIndex
                    ? (c.colorScheme?.accent ?? categoryData.color)
                    : "rgba(255,255,255,0.2)",
              }}
              transition={{ duration: 0.25 }}
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeCert && (
          <CertificateModal
            cert={activeCert}
            category={categoryKey === "cloud" ? "cloud/oracle" : categoryKey}
            onClose={() => setActiveCert(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
