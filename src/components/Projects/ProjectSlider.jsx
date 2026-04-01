import { useEffect, useRef, useState, useCallback } from "react";
import { Pause, Play, FolderGit2, ArrowUpRight } from "lucide-react";
import one from "../../assets/projects/whispherTails.png";
import two from "../../assets/projects/helpmemake.png";
import three from "../../assets/projects/crybug.png";
import four from "../../assets/projects/podcast.png";
import five from "../../assets/projects/devflow.png";

const PROJECTS = [
  {
    title: "WhisperTails",
    period: "Dec 2025 – Jan 2026",
    tagline: "Interactive Pet Adoption Platform",
    description:
      "A full-stack MERN platform designed to modernize and streamline the pet adoption process with real-time interaction and multi-stage workflow tracking.",
    highlights: [
      "5-stage workflow: Application → Review → Video Verification → On-site Visit → Final Approval",
      "Real-time updates, chat, notifications using Socket.IO",
      "Live status tracking system",
      "Scalable backend architecture",
    ],
    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node",
      "Socket.IO",
      "JWT",
      "Tailwind",
      "GSAP",
    ],
    github: "https://github.com/scarlet-sypher/WhisperTails",
    live: "https://whisper-tails.vercel.app/",
    accent: "rgba(99,202,183,1)",
    accentSoft: "rgba(99,202,183,0.13)",
    accentBorder: "rgba(99,202,183,0.28)",
    bg: one,
    letter: "W",
  },
  {
    title: "HelpMeMake",
    period: "Jul 2025 – Sept 2025",
    tagline: "AI Mentorship & Project Platform",
    description:
      "An AI-powered mentorship platform connecting students with mentors and automating project guidance.",
    highlights: [
      "AI mentor matching + milestone recommendations",
      "Automated project guidance & content generation",
      "Multi-role authentication (Google + GitHub OAuth)",
      "Reduced manual effort by ~70%",
    ],
    stack: [
      "MongoDB",
      "Express",
      "React",
      "Node",
      "Tailwind",
      "Gemini AI",
      "Cloudinary",
      "OAuth",
    ],
    github: "https://github.com/scarlet-sypher/HelpMeMake-Base",
    live: "https://help-me-make.vercel.app/",
    accent: "rgba(139,92,246,1)",
    accentSoft: "rgba(139,92,246,0.13)",
    accentBorder: "rgba(139,92,246,0.28)",
    bg: two,
    letter: "H",
  },
  {
    title: "CryBug",
    period: "Mar 2025 – Apr 2025",
    tagline: "Bug Tracking & Task Management",
    description:
      "A role-based bug tracking system to streamline workflows and issue resolution across teams.",
    highlights: [
      "Role-based dashboards (Company / Manager / Employee)",
      "Secure session-based authentication",
      "Task lifecycle & issue tracking system",
      "UI animations and micro-interactions",
    ],
    stack: ["HTML", "CSS", "Tailwind", "JavaScript", "PHP", "MySQL"],
    github: "https://github.com/scarlet-sypher/CryBug",
    live: "https://crubug.ct.ws/?i=3",
    accent: "rgba(251,113,133,1)",
    accentSoft: "rgba(251,113,133,0.13)",
    accentBorder: "rgba(251,113,133,0.28)",
    bg: three,
    letter: "C",
  },
  {
    title: "PodcastRec",
    period: "Mar 2025 – Apr 2025",
    tagline: "Podcast Recommendation System",
    description:
      "A web-based recommendation engine suggesting podcasts using custom logic and a Flask backend.",
    highlights: [
      "Flask backend processing user queries",
      "Custom recommendation algorithm",
      "Regex-based filtering + structured JSON",
      "Real-time frontend interaction via API",
    ],
    stack: [
      "Python",
      "Flask",
      "HTML",
      "CSS",
      "JavaScript",
      "JSON",
      "Flask-CORS",
    ],
    github: "https://github.com/scarlet-sypher/Podcast-Recommendation-ChatBot",
    live: "https://podcast-recommendation-chatbot.onrender.com/",
    accent: "rgba(251,191,36,1)",
    accentSoft: "rgba(251,191,36,0.13)",
    accentBorder: "rgba(251,191,36,0.28)",
    bg: four,
    letter: "P",
  },
  {
    title: "DevFlow",
    period: "Jan 2025 – Feb 2025",
    tagline: "Developer Productivity Suite",
    description:
      "A comprehensive productivity tool for developers with integrated task management and code snippets.",
    highlights: [
      "Integrated code snippet manager",
      "Drag-and-drop kanban boards",
      "Git integration & commit tracking",
      "Team collaboration features",
    ],
    stack: ["React", "TypeScript", "Node", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com",
    live: "https://example.com",
    accent: "rgba(56,189,248,1)",
    accentSoft: "rgba(56,189,248,0.13)",
    accentBorder: "rgba(56,189,248,0.28)",
    bg: five,
    letter: "D",
  },
];

export const AUTO_INTERVAL = 15000;

const sliderStyles = `
 .proj-slide {
  position: relative;
  width: 100%;
  height: 100%;
}

.proj-slide .proj-item {
  position: absolute;
  top: 50%;
  left: 70%;
  width: 200px;
  height: 300px;
  transform: translateY(-50%);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  display: inline-block;
  box-shadow: 0 30px 50px rgba(0, 0, 0, 0.7);
  transition:
    left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    top 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    height 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    border-radius 0.8s ease,
    opacity 0.8s ease;
}

.proj-slide .proj-item:nth-child(1),
.proj-slide .proj-item:nth-child(2) {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: none;
  cursor: default;
}

.proj-slide .proj-item:nth-child(3) {
  left: 55%;
}

.proj-slide .proj-item:nth-child(4) {
  left: calc(55% + 210px);
}

.proj-slide .proj-item:nth-child(5) {
  left: calc(55% + 420px);
}

.proj-slide .proj-item:nth-child(n + 6) {
  left: calc(55% + 630px);
  opacity: 0;
  pointer-events: none;
}

.proj-slide .proj-item:nth-child(n + 3):hover {
  transform: translateY(calc(-50% - 8px));
  box-shadow: 0 40px 70px rgba(0, 0, 0, 0.85);
}

.proj-item .proj-content {
  position: absolute;
  top: 50%;
  left: 60px;
  width: 380px;
  transform: translateY(-50%);
  display: none;
}

.proj-slide .proj-item:nth-child(2) .proj-content {
  display: block;
}

@keyframes proj-animateIn {
  from {
    opacity: 0;
    transform: translateY(60px);
    filter: blur(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.pc-period {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-family: system-ui, sans-serif;
  margin-bottom: 4px;
  opacity: 0;
  animation: proj-animateIn 0.9s ease forwards;
}

.pc-name {
  font-size: 34px;
  font-weight: 800;
  color: #fff;
  line-height: 1.05;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-family: 'SF Mono', 'Courier New', monospace;
  opacity: 0;
  animation: proj-animateIn 0.9s ease forwards;
}

.pc-step {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 10px;
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.6);
}

.pc-highlight-line {
  font-size: 16px;
  font-weight: 600;
  margin-top: 6px;
  margin-bottom: 10px;
}

.pc-desc-main {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin-bottom: 14px;
}

.pc-checklist {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pc-check-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
}

.pc-check-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.pc-check-text {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.75);
}

.pc-tagline {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  margin-top: 4px;
  opacity: 0;
  animation: proj-animateIn 0.9s ease 0.2s forwards;
}

.pc-desc {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.52);
  line-height: 1.7;
  margin: 10px 0 8px;
  font-family: system-ui, sans-serif;
  opacity: 0;
  animation: proj-animateIn 0.9s ease 0.3s forwards;
}

.pc-highlights {
  opacity: 0;
  animation: proj-animateIn 0.9s ease 0.35s forwards;
}

.pc-stack {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  opacity: 0;
  animation: proj-animateIn 0.9s ease 0.45s forwards;
}

.pc-links {
  display: flex;
  gap: 8px;
  margin-top: 14px;
  opacity: 0;
  animation: proj-animateIn 0.9s ease 0.55s forwards;
}

.proj-tag {
  display: inline-block;
  font-size: 9px;
  padding: 2px 8px;
  border-radius: 20px;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.proj-nav {
  position: absolute;
  bottom: 16px;
  left: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.proj-nav button {
  width: 40px;
  height: 35px;
  border-radius: 8px;
  margin: 0 2px;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.proj-nav button:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.6);
  color: #fff;
}

.pause-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.pause-btn.paused {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.5);
}

.proj-dots {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 6px;
}

.proj-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.18);
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.proj-dot.active {
  width: 24px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.4);
}

.proj-dot.active .proj-dot-fill {
  position: absolute;
  inset: 0;
  border-radius: 3px;
  transform-origin: left center;
  animation: proj-dotFill var(--dot-duration, 15s) linear forwards;
}

@keyframes proj-dotFill {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.proj-small-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 90px 14px 14px;
  border-radius: 0 0 20px 20px;
  pointer-events: none;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.88) 0%,
    rgba(0, 0, 0, 0.55) 55%,
    transparent 100%
  );
}

.sc-index {
  font-size: 9px;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.18em;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 4px;
  text-transform: uppercase;
}

.sc-title {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.92);
  font-family: 'Courier New', monospace;
  line-height: 1.1;
}

.sc-tagline {
  font-size: 9px;
  font-family: system-ui, sans-serif;
  margin-top: 3px;
  opacity: 0.8;
  line-height: 1.3;
}

.sc-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  margin-top: 7px;
}

.sc-pill {
  font-size: 8px;
  padding: 1px 6px;
  border-radius: 10px;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.sc-accent-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: 5;
  border-radius: 20px 20px 0 0;
  opacity: 0.8;
}

.pc-stack-new {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pc-stack-pill {
  font-size: 10px;
  padding: 4px 10px;
  border-radius: 999px;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.pc-links-new {
  display: flex;
  gap: 10px;
  margin-top: 18px;
  opacity: 0;
  animation: proj-animateIn 0.9s ease 0.6s forwards;
}

.pc-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 12px;
  font-family: system-ui, sans-serif;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.pc-btn-github {
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.15));
}

.pc-btn-github::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--btn-accent);
  opacity: 0.75;
  z-index: -1;
  border-radius: inherit;
}

.pc-btn-github:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}

.pc-btn-live:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.proj-timer-bar {
  position: absolute;
  top: 6px;
  left: 10px;
  right: 10px;
  height: 4px;
  border-radius: 999px;
  overflow: hidden;
  z-index: 20;
  transform-origin: left center;
  animation: proj-timerFill var(--timer-duration, 15s) linear forwards;
}

@keyframes proj-timerFill {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.proj-big-img-wrap {
  position: absolute;
  right: 400px;
  top: 50%;
  transform: translateY(-50%);
  width: 450px;
  height: 450px;
  z-index: -1;
  pointer-events: none;
}

.proj-big-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

@keyframes proj-borderMove {
  0% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 100% 0%;
  }
}

.proj-moving-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  padding: 1.5px;
  border-radius: 21px;
  background: var(--proj-border-gradient);
  background-size: 300% 300%;
  animation: proj-borderMove 4s ease infinite;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
  z-index: 6;
  pointer-events: none;
  opacity: 0.6;
}
`;

export default function ProjectSlider({ visible, onAccentChange }) {
  const slideRef = useRef(null);

  const [items, setItems] = useState(PROJECTS);
  const [animKey, setAnimKey] = useState(0);
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const autoTimerRef = useRef(null);

  const goNext = useCallback(() => {
    setItems((prev) => {
      const n = [...prev];
      n.push(n.shift());
      return n;
    });
    setActiveIndex((i) => (i + 1) % PROJECTS.length);
    setAnimKey((k) => k + 1);
    setTimerKey((k) => k + 1);
  }, []);

  const goPrev = useCallback(() => {
    setItems((prev) => {
      const n = [...prev];
      n.unshift(n.pop());
      return n;
    });
    setActiveIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length);
    setAnimKey((k) => k + 1);
    setTimerKey((k) => k + 1);
  }, []);

  useEffect(() => {
    onAccentChange?.(items[1].accent);
  }, [items]);
  const goToIndex = useCallback((targetRealIndex) => {
    const targetTitle = PROJECTS[targetRealIndex].title;
    setItems((prev) => {
      const arr = [...prev];
      const pos = arr.findIndex((p) => p.title === targetTitle);
      let steps = (pos - 1 + arr.length) % arr.length;
      for (let i = 0; i < steps; i++) arr.push(arr.shift());
      return arr;
    });
    setActiveIndex(targetRealIndex);
    setAnimKey((k) => k + 1);
    setTimerKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    autoTimerRef.current = setTimeout(() => goNext(), AUTO_INTERVAL);
    return () => clearTimeout(autoTimerRef.current);
  }, [isPaused, timerKey, goNext]);

  const togglePause = () => {
    setIsPaused((p) => {
      if (p) setTimerKey((k) => k + 1);
      return !p;
    });
  };

  const active = items[1];
  const borderGradient = `linear-gradient(135deg, transparent 0%, ${active.accent} 30%, transparent 50%, ${active.accentBorder} 70%, transparent 100%)`;

  return (
    <>
      <style>{sliderStyles}</style>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          overflowY: "hidden",
          padding: "50px 28px 0px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition:
            "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="proj-moving-border"
            style={{
              "--proj-border-gradient": borderGradient,
              width: "90vw",
              height: "85vh",
              maxWidth: "1200px",
              maxHeight: "700px",
              borderRadius: "20px",
              background: "rgba(20,20,30,0.35)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow:
                "0 30px 80px rgba(0,0,0,0.6), inset 0 0 30px rgba(255,255,255,0.06)",
              position: "relative",
              overflow: "visible",
            }}
          >
            {!isPaused && (
              <div
                key={`timer-${timerKey}`}
                className="proj-timer-bar"
                style={{
                  "--timer-duration": `${AUTO_INTERVAL}ms`,
                  background: `linear-gradient(90deg, ${active.accent}, ${active.accentBorder})`,
                }}
              />
            )}

            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                opacity: 0.08,
                mixBlendMode: "overlay",
                backgroundImage:
                  "url('https://grainy-gradients.vercel.app/noise.svg')",
              }}
            />

            <div
              ref={slideRef}
              className="proj-slide"
              style={{ position: "absolute", inset: 0, zIndex: 2 }}
            >
              {items.map((project, idx) => (
                <div
                  key={`${project.title}-${idx}`}
                  className="proj-item"
                  onClick={idx === 2 ? goPrev : idx >= 3 ? goNext : undefined}
                >
                  {idx >= 2 && (
                    <img
                      src={project.bg}
                      alt=""
                      style={{
                        position: "absolute",
                        top: "18px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "200px",
                        height: "200px",
                        objectFit: "contain",
                        zIndex: 3,
                        pointerEvents: "none",
                        filter: "drop-shadow(0 12px 25px rgba(0,0,0,0.8))",
                      }}
                    />
                  )}
                  {idx >= 2 && (
                    <div
                      className="sc-accent-bar"
                      style={{
                        background: `linear-gradient(90deg, ${project.accent}, transparent)`,
                      }}
                    />
                  )}
                  {idx < 2 && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(90deg, rgba(0,0,0,.78) 0%, rgba(0,0,0,.22) 55%, transparent 100%)",
                      }}
                    />
                  )}
                  {idx === 1 && (
                    <div className="proj-big-img-wrap">
                      <img
                        src={project.bg}
                        alt=""
                        style={{
                          filter: `drop-shadow(0 30px 60px ${project.accent})`,
                          opacity: 0.95,
                        }}
                      />
                    </div>
                  )}

                  <div className="proj-content" key={`content-${animKey}`}>
                    <div
                      className="pc-step"
                      style={{
                        border: `1px solid ${active.accentBorder}`,
                        color: active.accent,
                        background: active.accentSoft,
                      }}
                    >
                      Project {activeIndex + 1} of {PROJECTS.length}
                    </div>
                    <div className="pc-name" style={{ color: active.accent }}>
                      {active.title}
                    </div>
                    <div
                      className="pc-highlight-line"
                      style={{ color: "white" }}
                    >
                      {active.tagline}
                    </div>
                    <div className="pc-desc-main">{active.description}</div>
                    <div className="pc-checklist">
                      {active.highlights.slice(0, 4).map((item, i) => (
                        <div key={i} className="pc-check-item">
                          <div
                            className="pc-check-icon"
                            style={{
                              background: active.accentSoft,
                              color: active.accent,
                            }}
                          >
                            ✓
                          </div>
                          <div className="pc-check-text">{item}</div>
                        </div>
                      ))}
                    </div>
                    <div className="pc-stack-new">
                      {active.stack.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="pc-stack-pill"
                          style={{
                            background: active.accentSoft,
                            color: active.accent,
                            border: `1px solid ${active.accentBorder}`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="pc-links-new">
                      <a
                        href={active.github}
                        target="_blank"
                        rel="noreferrer"
                        className="pc-btn pc-btn-github"
                        style={{
                          background: active.accent,
                          border: `1px solid ${active.accent}`,
                        }}
                      >
                        <FolderGit2 size={16} />
                        <span>GitHub</span>
                      </a>
                      <a
                        href={active.live}
                        target="_blank"
                        rel="noreferrer"
                        className="pc-btn pc-btn-live"
                        style={{ border: `1px solid ${active.accent}` }}
                      >
                        <ArrowUpRight size={16} />
                        <span>Live</span>
                      </a>
                    </div>
                  </div>

                  {idx >= 2 && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.5))",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    />
                  )}

                  {idx >= 2 && idx <= 4 && (
                    <div className="proj-small-label">
                      <div className="sc-index">
                        {String(
                          PROJECTS.findIndex((p) => p.title === project.title) +
                            1,
                        ).padStart(2, "0")}{" "}
                        / {String(PROJECTS.length).padStart(2, "0")}
                      </div>
                      <div className="sc-title">{project.title}</div>
                      <div
                        className="sc-tagline"
                        style={{ color: project.accent }}
                      >
                        {project.tagline}
                      </div>
                      <div className="sc-stack">
                        {project.stack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="sc-pill"
                            style={{
                              background: project.accentSoft,
                              color: project.accent,
                              border: `1px solid ${project.accentBorder}`,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="proj-nav">
              <button onClick={goPrev}>&#8592;</button>
              <button
                className={`pause-btn${isPaused ? " paused" : ""}`}
                onClick={togglePause}
                title={isPaused ? "Resume" : "Pause"}
              >
                {isPaused ? <Play size={18} /> : <Pause size={18} />}
              </button>
              <div className="proj-dots">
                {PROJECTS.map((p, i) => (
                  <div
                    key={p.title}
                    className={`proj-dot${i === activeIndex ? " active" : ""}`}
                    onClick={() => goToIndex(i)}
                    title={p.title}
                    style={{ "--dot-duration": `${AUTO_INTERVAL}ms` }}
                  >
                    {i === activeIndex && (
                      <div
                        key={`dot-fill-${timerKey}`}
                        className="proj-dot-fill"
                        style={{ background: active.accent }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <button onClick={goNext}>&#8594;</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { PROJECTS };
