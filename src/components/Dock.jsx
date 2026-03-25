import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Monitor,
  Music,
  Globe,
  Palette,
  Terminal,
  MessageCircle,
  FileText,
} from "lucide-react";

import Home from "../Pages/Home";
import MusicPage from "../Pages/Music";
import Chrome from "../Pages/Chrome";
import Photoshop from "../Pages/Photoshop";
import TerminalPage from "../Pages/Terminal";
import Message from "../Pages/Message";
import Resume from "../Pages/Resume";
import Window from "./Window";

const APPS_CONFIG = [
  {
    key: "home",
    Icon: Monitor,
    label: "Home",
    color: "rgba(48,138,218,0.9)",
    Page: Home,
    pos: { x: 180, y: 60 },
    size: { width: 680, height: 420 },
  },
  {
    key: "music",
    Icon: Music,
    label: "Spotify",
    color: "rgba(28,202,88,0.9)",
    Page: MusicPage,
    pos: { x: 200, y: 70 },
    size: { width: 680, height: 460 },
  },
  {
    key: "chrome",
    Icon: Globe,
    label: "Chrome",
    color: "rgba(232,82,50,0.9)",
    Page: Chrome,
    pos: { x: 160, y: 55 },
    size: { width: 720, height: 500 },
  },
  {
    key: "photoshop",
    Icon: Palette,
    label: "Photoshop",
    color: "rgba(46,158,255,0.9)",
    Page: Photoshop,
    pos: { x: 140, y: 50 },
    size: { width: 760, height: 520 },
  },
  {
    key: "terminal",
    Icon: Terminal,
    label: "Terminal",
    color: "rgba(145,98,255,0.9)",
    Page: TerminalPage,
    pos: { x: 220, y: 80 },
    size: { width: 640, height: 420 },
  },
  {
    key: "messages",
    Icon: MessageCircle,
    label: "Messages",
    color: "rgba(86,98,242,0.9)",
    Page: Message,
    pos: { x: 190, y: 65 },
    size: { width: 680, height: 480 },
  },
  {
    key: "resume",
    Icon: FileText,
    label: "Resume",
    color: "rgba(255,145,40,0.9)",
    Page: Resume,
    pos: { x: 160, y: 60 },
    size: { width: 700, height: 520 },
  },
];

const DOCK_BASE_SIZE = 44;
const DOCK_MAX_SIZE = 68;
const ANIMATION_DISTANCE = 110;

export default function Dock({ openResumeExternal, onResumeOpened }) {
  const mouseX = useMotionValue(Infinity);
  const iconRefs = useRef({});

  const [openApps, setOpenApps] = useState(new Set());
  const [minimizedApps, setMinimizedApps] = useState(new Set());
  const [maximizedApps, setMaximizedApps] = useState(new Set());

  // Allow external open trigger (from dumbbell button)
  if (
    openResumeExternal &&
    !openApps.has("resume") &&
    !minimizedApps.has("resume")
  ) {
    setOpenApps((prev) => new Set(prev).add("resume"));
    onResumeOpened?.();
  }

  const handleOpenApp = (key) => {
    if (minimizedApps.has(key)) {
      setMinimizedApps((prev) => {
        const n = new Set(prev);
        n.delete(key);
        return n;
      });
    }
    setOpenApps((prev) => new Set(prev).add(key));
  };

  const handleCloseApp = (key) => {
    setOpenApps((prev) => {
      const n = new Set(prev);
      n.delete(key);
      return n;
    });
    setMinimizedApps((prev) => {
      const n = new Set(prev);
      n.delete(key);
      return n;
    });
    setMaximizedApps((prev) => {
      const n = new Set(prev);
      n.delete(key);
      return n;
    });
  };

  const handleMinimizeApp = (key) => {
    setOpenApps((prev) => {
      const n = new Set(prev);
      n.delete(key);
      return n;
    });
    setMinimizedApps((prev) => new Set(prev).add(key));
  };

  const handleToggleMaximize = (key) => {
    setMaximizedApps((prev) => {
      const n = new Set(prev);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });
  };

  return (
    <>
      <AnimatePresence>
        {APPS_CONFIG.filter((app) => openApps.has(app.key)).map((app) => (
          <Window
            key={app.key}
            title={app.label}
            appKey={app.key}
            isMaximized={maximizedApps.has(app.key)}
            dockIconRef={iconRefs.current[app.key]}
            initialPosition={app.pos}
            initialSize={app.size}
            onClose={() => handleCloseApp(app.key)}
            onMinimize={() => handleMinimizeApp(app.key)}
            onMaximize={() => handleToggleMaximize(app.key)}
          >
            <app.Page />
          </Window>
        ))}
      </AnimatePresence>

      <motion.div
        className="absolute z-40 bottom-5 left-1/2 -translate-x-1/2"
        style={{
          borderRadius: 99,
          background: "rgba(255,255,255,0.09)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow:
            "0 4px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.1)",
          padding: "10px 24px 6px 24px",
          display: "flex",
          alignItems: "flex-end",
          gap: 14,
        }}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {APPS_CONFIG.map((app) => (
          <DockIcon
            key={app.key}
            item={app}
            mouseX={mouseX}
            isOpen={openApps.has(app.key)}
            isMinimized={minimizedApps.has(app.key)}
            iconRefs={iconRefs}
            onOpen={() => handleOpenApp(app.key)}
          />
        ))}
      </motion.div>
    </>
  );
}

function DockIcon({ item, mouseX, isOpen, isMinimized, onOpen, iconRefs }) {
  const iconRef = useRef(null);
  if (iconRefs && item.key) iconRefs.current[item.key] = iconRef;

  const distance = useTransform(mouseX, (val) => {
    const bounds = iconRef.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
    };
    return val - bounds.x - bounds.width / 2;
  });
  const scaleTransform = useTransform(
    distance,
    [-ANIMATION_DISTANCE, 0, ANIMATION_DISTANCE],
    [1, DOCK_MAX_SIZE / DOCK_BASE_SIZE, 1],
  );
  const scale = useSpring(scaleTransform, {
    stiffness: 320,
    damping: 22,
    mass: 0.5,
  });

  return (
    <motion.div
      ref={iconRef}
      className="relative flex flex-col items-center justify-end cursor-pointer group"
      style={{ width: DOCK_BASE_SIZE }}
      onClick={onOpen}
    >
      <span
        className="absolute -top-10 text-[10px] tracking-wider whitespace-nowrap px-2 py-0.5 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        style={{
          background: "rgba(0,0,0,0.62)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(8px)",
        }}
      >
        {item.label}
      </span>
      <motion.div
        style={{
          scale,
          transformOrigin: "bottom",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <motion.div
          className="flex items-center justify-center rounded-[14px]"
          style={{
            width: DOCK_BASE_SIZE,
            height: DOCK_BASE_SIZE,
            background: item.color,
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 4px 18px rgba(0,0,0,0.3)",
            color: "#fff",
            opacity: isMinimized ? 0.6 : 1,
          }}
          whileTap={{ scale: 0.86 }}
          animate={isOpen && !isMinimized ? { y: [0, -4, 0] } : {}}
          transition={{ duration: 0.3 }}
        >
          <item.Icon size={20} strokeWidth={1.6} />
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {(isOpen || isMinimized) && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: isMinimized
                ? "rgba(255,190,50,0.9)"
                : "rgba(255,255,255,0.7)",
              marginTop: 3,
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
