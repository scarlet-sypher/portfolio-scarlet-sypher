import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import FolderGate from "../components/Certificates/StackCards";
import RightPanel from "../components/Certificates/RightPanel";
import FolderDetails from "../components/Certificates/FolderDetails";
import { certificateData } from "../components/Certificates/CertData";

const CATEGORY_BG = {
  internship: {
    color: "#f7971e",
    bg: "radial-gradient(ellipse at 30% 50%, #f7971e33 0%, #3a2000 45%, #181008 100%)",
  },
  ai: {
    color: "#c084fc",
    bg: "radial-gradient(ellipse at 35% 45%, #c084fc30 0%, #1e0a3a 45%, #0d0618 100%)",
  },
  cloud: {
    color: "#4facfe",
    bg: "radial-gradient(ellipse at 30% 50%, #4facfe2e 0%, #00183a 45%, #020c1a 100%)",
  },
  cybersecurity: {
    color: "#ff4d4d",
    bg: "radial-gradient(ellipse at 32% 48%, #ff4d4d2a 0%, #3a0000 45%, #150000 100%)",
  },
  database: {
    color: "#43e97b",
    bg: "radial-gradient(ellipse at 28% 50%, #43e97b2a 0%, #002a18 45%, #010e08 100%)",
  },
  networking: {
    color: "#00f2fe",
    bg: "radial-gradient(ellipse at 35% 45%, #00f2fe26 0%, #00242e 45%, #00080e 100%)",
  },
  hardware: {
    color: "#ffd200",
    bg: "radial-gradient(ellipse at 30% 50%, #ffd20028 0%, #2a2000 45%, #0e0b00 100%)",
  },
  python: {
    color: "#38f9d7",
    bg: "radial-gradient(ellipse at 32% 50%, #38f9d726 0%, #002a26 45%, #000e0a 100%)",
  },
  webdev: {
    color: "#f093fb",
    bg: "radial-gradient(ellipse at 30% 48%, #f093fb28 0%, #2a0030 45%, #0e0012 100%)",
  },
  research: {
    color: "#fee140",
    bg: "radial-gradient(ellipse at 35% 50%, #fee14028 0%, #2a2400 45%, #0e0d00 100%)",
  },
  other: {
    color: "#a1ffce",
    bg: "radial-gradient(ellipse at 30% 50%, #a1ffce24 0%, #00281a 45%, #000e08 100%)",
  },
};

const DEFAULT_BG = "#313131";

export default function Certificates() {
  const [activeCard, setActiveCard] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [openedCategory, setOpenedCategory] = useState(null);

  const handleHover = (key) => setHoveredCard(key);

  const handleCardClick = (key) => {
    if (activeCard === key) return;
    setActiveCard(key);
    setPanelOpen(true);
  };

  const handleOpen = (key) => {
    setOpenedCategory(key);
    setPanelOpen(false);
    setActiveCard(null);
    setHoveredCard(null);
  };

  const handleDiscard = useCallback(() => {
    setPanelOpen(false);
    setActiveCard(null);
  }, []);

  const handleBack = () => setOpenedCategory(null);

  const handleBackdropClick = useCallback(() => {
    if (panelOpen) handleDiscard();
  }, [panelOpen, handleDiscard]);

  const panelKey = panelOpen ? activeCard : hoveredCard || null;
  const panelData = panelKey ? certificateData[panelKey] : null;

  const bgKey = hoveredCard || activeCard;
  const bgTheme = bgKey ? CATEGORY_BG[bgKey] : null;

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        color: "rgba(255,255,255,0.85)",
        overflow: "hidden",
        position: "relative",
        background: bgTheme ? bgTheme.bg : DEFAULT_BG,
        transition: "background 0.55s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          transition: "opacity 0.5s ease",
          opacity: bgTheme ? 1 : 0,
        }}
      >
        {/* Thin top gradient bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: bgTheme
              ? `linear-gradient(90deg, transparent 0%, ${bgTheme.color}cc 40%, ${bgTheme.color}ff 60%, transparent 100%)`
              : "transparent",
            transition: "background 0.45s ease",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {openedCategory ? (
          <FolderDetails
            key={openedCategory}
            categoryKey={openedCategory}
            categoryData={certificateData[openedCategory]}
            onBack={handleBack}
          />
        ) : (
          <div
            key="gate"
            style={{
              flex: 1,
              display: "flex",
              position: "relative",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <div style={{ flex: 1 }} onClick={(e) => e.stopPropagation()}>
              <FolderGate
                activeCard={activeCard}
                onCardClick={handleCardClick}
                onHover={handleHover}
              />
            </div>

            <div onClick={(e) => e.stopPropagation()}>
              <RightPanel
                categoryKey={panelKey}
                data={panelData}
                isLocked={panelOpen}
                onOpen={handleOpen}
                onDiscard={handleDiscard}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
