import { useRef } from "react";
import { motion, useMotionValue, useDragControls } from "framer-motion";

export default function Window({
  title,
  appKey,
  children,
  isMaximized,
  dockIconRef,
  onClose,
  onMinimize,
  onMaximize,
  initialPosition = { x: 120, y: 60 },
  initialSize = { width: 680, height: 460 },
}) {
  const constraintsRef = useRef(null);
  const dragControls = useDragControls();

  const x = useMotionValue(initialPosition.x);
  const y = useMotionValue(initialPosition.y);
  const lastPosition = useRef(initialPosition);

  const handleMaximize = () => {
    if (!isMaximized) {
      lastPosition.current = { x: x.get(), y: y.get() };
    }
    onMaximize();
  };

  const getExitCoordinates = () => {
    if (!dockIconRef?.current) return { x: 0, y: 300 };
    const rect = dockIconRef.current.getBoundingClientRect();
    return { x: rect.x, y: rect.y };
  };

  return (
    <>
      <div
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 49 }}
      />

      <motion.div
        drag={!isMaximized}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={!isMaximized ? constraintsRef : false}
        initial={{
          opacity: 0,
          scale: 0.85,
          x: initialPosition.x,
          y: initialPosition.y + 40,
        }}
        animate={
          isMaximized
            ? {
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                width: "100vw",
                height: "100vh",
                borderRadius: 0,
              }
            : {
                opacity: 1,
                scale: 1,
                x: lastPosition.current.x,
                y: lastPosition.current.y,
                width: initialSize.width,
                height: initialSize.height,
                borderRadius: 12,
              }
        }
        exit={{
          opacity: 0,
          scale: 0.15,
          ...getExitCoordinates(),
          transition: { duration: 0.38, ease: [0.4, 0, 1, 1] },
        }}
        transition={{ type: "spring", stiffness: 340, damping: 30, mass: 0.8 }}
        onAnimationComplete={() => {
          window.dispatchEvent(new Event("resize"));
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x,
          y,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "rgba(20, 20, 32, 0.82)",
          backdropFilter: "blur(32px) saturate(180%)",
          WebkitBackdropFilter: "blur(32px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow:
            "0 24px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
          userSelect: "none",
        }}
      >
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="flex items-center gap-3 px-4 shrink-0"
          style={{
            height: "38px",
            background: "rgba(255, 255, 255, 0.04)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            cursor: isMaximized ? "default" : "grab",
            touchAction: "none",
          }}
        >
          <WindowControls
            onClose={onClose}
            onMinimize={onMinimize}
            onMaximize={handleMaximize}
          />

          <div
            className="flex-1 text-center text-[11px] font-semibold tracking-widest"
            style={{ color: "rgba(255, 255, 255, 0.45)", marginRight: "54px" }}
          >
            {title}
          </div>
        </div>

        <div
          className="flex-1 overflow-auto cursor-default"
          style={{ cursor: "default" }}
        >
          {children}
        </div>
      </motion.div>
    </>
  );
}

function WindowControls({ onClose, onMinimize, onMaximize }) {
  return (
    <div className="flex items-center gap-1.5">
      <ControlButton color="#ff5f57" icon="✕" onClick={onClose} title="Close" />
      <ControlButton
        color="#febc2e"
        icon="−"
        onClick={onMinimize}
        title="Minimize"
      />
      <ControlButton
        color="#28c840"
        icon="⤢"
        onClick={onMaximize}
        title="Maximize"
      />
    </div>
  );
}

function ControlButton({ color, icon, onClick, title }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      className="w-3 h-3 rounded-full flex items-center justify-center group"
      style={{
        background: color,
        border: "1px solid rgba(0, 0, 0, 0.2)",
      }}
      title={title}
    >
      <span className="opacity-0 group-hover:opacity-100 text-[7px] font-bold text-black/60 leading-none">
        {icon}
      </span>
    </motion.button>
  );
}
