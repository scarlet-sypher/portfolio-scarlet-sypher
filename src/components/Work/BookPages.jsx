import { forwardRef } from "react";
import { Briefcase } from "lucide-react";
import cover from "../../assets/work/cover.png";
import { WORK_DATA } from "./workData";

export const CoverFront = forwardRef(function CoverFront(_, ref) {
  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        lineHeight: 0,
        fontSize: 0,
      }}
    >
      <img
        src={cover}
        alt="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />
    </div>
  );
});

export const CoverInside = forwardRef(function CoverInside({ dark }, ref) {
  const bg = dark ? "#0b1520" : "#f3f0ea";
  return (
    <div ref={ref} style={{ width: "100%", height: "100%", background: bg }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.18,
          backgroundImage: `radial-gradient(circle, ${dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)"} 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />
    </div>
  );
});

export const IndexPage = forwardRef(function IndexPage({ dark }, ref) {
  const bg = dark ? "#0e1d2e" : "#fefcf7";
  const textMain = dark ? "#dde6f5" : "#18182e";
  const textSub = dark ? "#6e84a3" : "#8888a8";

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: bg,
          padding: "30px 24px 22px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, #4f8ef722, #4f8ef799)",
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              fontSize: 7.5,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#4f8ef7",
              fontFamily: "monospace",
              marginBottom: 20,
              opacity: 0.85,
            }}
          >
            Index
          </div>
          <div
            style={{
              fontSize: 20,
              fontFamily: "'Playfair Display', Georgia, serif",
              color: textMain,
              marginBottom: 20,
            }}
          >
            Chapters
          </div>
          <div
            style={{
              width: 28,
              height: 1.5,
              background: "linear-gradient(90deg, #4f8ef7, transparent)",
              marginBottom: 20,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {WORK_DATA.map((work) => (
              <div
                key={work.id}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 7,
                    background: `${work.color}22`,
                    border: `1px solid ${work.color}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <work.Icon size={12} color={work.color} strokeWidth={1.5} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 9,
                      fontFamily: "monospace",
                      color: work.color,
                      letterSpacing: "0.06em",
                      opacity: 0.75,
                    }}
                  >
                    {work.chapter}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: textMain,
                      lineHeight: 1.2,
                    }}
                  >
                    {work.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            fontSize: 8,
            color: textSub,
            fontFamily: "monospace",
            opacity: 0.4,
            position: "relative",
            zIndex: 2,
          }}
        >
          Ayush Jha · Portfolio
        </div>
      </div>
    </div>
  );
});

export const ChapterPage = forwardRef(function ChapterPage(
  { work, dark },
  ref,
) {
  const bg = dark ? "#0b1622" : "#f5f2eb";
  const textMain = dark ? "#dde6f5" : "#18182e";
  const textSub = dark ? "#6e84a3" : "#6a6a8a";

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: bg,
          padding: "30px 24px 22px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          borderRight: dark
            ? "1px solid rgba(255,255,255,0.045)"
            : "1px solid rgba(0,0,0,0.07)",
          boxShadow: dark
            ? "inset -6px 0 18px rgba(0,0,0,0.4)"
            : "inset -6px 0 18px rgba(0,0,0,0.07)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${work.color}99, ${work.color}22)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.35,
            backgroundImage: `radial-gradient(${work.color}28 1px, transparent 1px)`,
            backgroundSize: "18px 18px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 18,
            height: "100%",
            background:
              "linear-gradient(to right, rgba(0,0,0,0.12), transparent)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              fontSize: 7.5,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: work.color,
              fontFamily: "monospace",
              marginBottom: 16,
              opacity: 0.85,
            }}
          >
            Chapter {work.chapter}
          </div>

          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              background: `linear-gradient(135deg, ${work.color}44, ${work.color}16)`,
              border: `1px solid ${work.color}44`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              boxShadow: `0 4px 16px ${work.color}22`,
            }}
          >
            <work.Icon size={20} color={work.color} strokeWidth={1.5} />
          </div>

          <div
            style={{
              fontSize: 22,
              lineHeight: 1.18,
              fontFamily: "'Playfair Display', Georgia, serif",
              color: textMain,
              marginBottom: 6,
            }}
          >
            {work.title}
          </div>

          <div
            style={{
              fontSize: 9,
              color: textSub,
              fontFamily: "monospace",
              letterSpacing: "0.04em",
              marginBottom: 16,
            }}
          >
            {work.role} · {work.period}
          </div>

          <div
            style={{
              width: 28,
              height: 1.5,
              borderRadius: 1,
              background: `linear-gradient(90deg, ${work.color}, transparent)`,
              marginBottom: 14,
            }}
          />

          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {work.tags.map((t) => (
              <span
                key={t}
                style={{
                  padding: "2px 8px",
                  borderRadius: 20,
                  background: `${work.color}18`,
                  border: `1px solid ${work.color}38`,
                  color: work.color,
                  fontSize: 7.5,
                  fontFamily: "monospace",
                  fontWeight: 500,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            fontSize: 8,
            color: textSub,
            fontFamily: "monospace",
            opacity: 0.4,
            alignSelf: "flex-end",
            position: "relative",
            zIndex: 2,
          }}
        >
          {work.chapter} / 06
        </div>
      </div>
    </div>
  );
});

export const DetailsPage = forwardRef(function DetailsPage(
  { work, dark },
  ref,
) {
  const bg = dark ? "#0e1d2e" : "#fefcf7";
  const textSub = dark ? "#6e84a3" : "#8888a8";
  const bodyColor = dark ? "rgba(205,220,245,0.82)" : "#38385e";

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: bg,
          padding: "30px 24px 22px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${work.color}22, ${work.color}99)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
            backgroundSize: "130px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 18,
            height: "100%",
            background:
              "linear-gradient(to right, rgba(0,0,0,0.12), transparent)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 7.5,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: work.color,
              fontFamily: "monospace",
              opacity: 0.8,
            }}
          >
            Description
          </div>

          <div
            style={{
              flex: 1,
              borderRadius: 12,
              padding: "16px 15px",
              background: dark
                ? `linear-gradient(135deg, rgba(12,24,42,0.92), rgba(10,20,36,0.96))`
                : `linear-gradient(135deg, rgba(255,255,255,0.88), rgba(248,246,240,0.92))`,
              border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
              boxShadow: dark
                ? `0 8px 32px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 22px ${work.color}0d`
                : `0 8px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.95)`,
              backdropFilter: "blur(12px)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 60,
                height: 60,
                borderRadius: "0 12px 0 60px",
                background: `radial-gradient(circle at 75% 25%, ${work.color}28, transparent 65%)`,
                pointerEvents: "none",
              }}
            />
            <p
              style={{
                margin: 0,
                fontSize: 11,
                color: bodyColor,
                lineHeight: 1.85,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontWeight: 300,
              }}
            >
              {work.description}
            </p>
          </div>
        </div>

        <div
          style={{
            fontSize: 8,
            color: textSub,
            fontFamily: "monospace",
            opacity: 0.35,
            position: "relative",
            zIndex: 2,
            marginTop: 8,
          }}
        >
          Ayush Jha · Portfolio
        </div>
      </div>
    </div>
  );
});

export const BackCoverLeft = forwardRef(function BackCoverLeft({ dark }, ref) {
  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: dark
            ? "linear-gradient(145deg, #060f1c 0%, #0a1828 100%)"
            : "linear-gradient(145deg, #0f1c38 0%, #1a2a52 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "28px 20px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.045,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${16 + i * 17}%`,
              left: i % 2 === 0 ? `${10 + i * 6}%` : `${68 + i * 4}%`,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#4f8ef7",
              opacity: 0.4 + i * 0.08,
            }}
          />
        ))}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              fontSize: 20,
              marginBottom: 14,
              color: "rgba(168,200,255,0.28)",
            }}
          >
            ✦
          </div>
          <div
            style={{
              fontSize: 12.5,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              lineHeight: 1.8,
              color: "rgba(218,234,255,0.78)",
              marginBottom: 14,
            }}
          >
            "The best systems are not
            <br />
            built once — they're grown,
            <br />
            refactored, and scaled
            <br />
            with intention."
          </div>
          <div
            style={{
              width: 24,
              height: 1.5,
              margin: "0 auto 10px",
              background: "rgba(79,142,247,0.38)",
            }}
          />
          <div
            style={{
              fontSize: 8,
              letterSpacing: "0.18em",
              fontFamily: "monospace",
              color: "rgba(168,200,255,0.32)",
              textTransform: "uppercase",
            }}
          >
            — Ayush Jha · 2024
          </div>
        </div>
      </div>
    </div>
  );
});

export const EndPage = forwardRef(function EndPage({ dark }, ref) {
  const bg = dark
    ? "linear-gradient(145deg, #060f1c 0%, #0a1828 100%)"
    : "linear-gradient(145deg, #0f1c38 0%, #1a2a52 100%)";

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "28px 20px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.045,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              fontSize: 20,
              marginBottom: 14,
              color: "rgba(168,200,255,0.28)",
            }}
          >
            ✦
          </div>
          <div
            style={{
              fontSize: 12.5,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontStyle: "italic",
              lineHeight: 1.8,
              color: "rgba(218,234,255,0.78)",
              marginBottom: 14,
            }}
          >
            "The best systems are not
            <br />
            built once — they're grown,
            <br />
            refactored, and scaled
            <br />
            with intention."
          </div>
          <div
            style={{
              width: 24,
              height: 1.5,
              margin: "0 auto 10px",
              background: "rgba(79,142,247,0.38)",
            }}
          />
          <div
            style={{
              fontSize: 8,
              letterSpacing: "0.18em",
              fontFamily: "monospace",
              color: "rgba(168,200,255,0.32)",
              textTransform: "uppercase",
            }}
          >
            — Ayush Jha · 2024
          </div>
        </div>
      </div>
    </div>
  );
});

export const BackCoverRight = forwardRef(function BackCoverRight(
  { dark },
  ref,
) {
  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(160deg, #0d1b35 0%, #162444 40%, #0a1628 100%)",
        }}
      >
        <img
          src={cover}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.13,
            filter: "saturate(0.3) brightness(0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(79,142,247,0.06) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Briefcase size={28} color="rgba(79,142,247,0.3)" strokeWidth={1} />
            <div
              style={{
                fontSize: 7,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(168,200,255,0.18)",
                fontFamily: "monospace",
                marginTop: 10,
              }}
            >
              Ayush Jha · 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
