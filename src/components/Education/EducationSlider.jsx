import { useState, useEffect, useRef, useCallback } from "react";
import kv from "../../assets/education/school-kv.png";
import lpu from "../../assets/education/college-lpu.png";

import ten from "../../assets/education/ten.png";
import twl from "../../assets/education/twl.png";
import college from "../../assets/education/college.png";

const educationData = [
  {
    id: "lpu",
    year: "2023",
    active: true,
    level: "B.Tech",
    course: "Computer Science and Engineering",
    institution: "Lovely Professional University",
    score: "CGPA: 8.94",
    duration: "Aug 2023 – Present",
    location: "Phagwara, Punjab",
    image: college,
    color: "#6366f1",
    glow: "rgba(99,102,241,0.5)",
    details: [
      "Degree: Bachelor of Technology (CSE)",
      "CGPA: 8.94",
      "Duration: Aug 2023 – Present",
      "Location: Phagwara, Punjab",
    ],
    logo: lpu,
  },
  {
    id: "intermediate",
    year: "2021",
    active: false,
    level: "Intermediate",
    course: "Science Stream",
    institution: "Kendriya Vidyalaya Rangapahar Cantt",
    score: "Percentage: 87.4%",
    duration: "Apr 2020 – Mar 2021",
    location: "Dimapur, Nagaland",
    image: twl,
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.45)",
    details: [
      "Level: Intermediate",
      "Percentage: 87.4%",
      "Duration: Apr 2020 – Mar 2021",
      "Location: Dimapur, Nagaland",
    ],
    logo: kv,
  },
  {
    id: "matriculation",
    year: "2019",
    active: false,
    level: "Matriculation",
    course: "General Studies",
    institution: "Kendriya Vidyalaya Rangapahar Cantt",
    score: "Percentage: 88%",
    duration: "Apr 2018 – Mar 2019",
    location: "Dimapur, Nagaland",
    image: ten,
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.45)",
    details: [
      "Level: Matriculation",
      "Percentage: 88%",
      "Duration: Apr 2018 – Mar 2019",
      "Location: Dimapur, Nagaland",
    ],
    logo: kv,
  },
];

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function getVisibleCards(active, data) {
  const result = [];
  for (let i = 0; i < 3; i++) {
    result.push(data[(active + i) % data.length]);
  }
  return result;
}

const LevelIcon = ({ level, color }) => {
  const icons = {
    "B.Tech": (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    Intermediate: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    Matriculation: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  };
  return icons[level] || icons["Matriculation"];
};

function ProgressRing({ duration = 5000, active, color, paused }) {
  const r = 11;
  const circ = 2 * Math.PI * r;

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <circle
        cx="15"
        cy="15"
        r={r}
        fill="none"
        stroke={`rgba(${hexToRgb(color)},0.18)`}
        strokeWidth="1.5"
      />
      {active && !paused && (
        <circle
          cx="15"
          cy="15"
          r={r}
          fill="none"
          stroke={`rgba(${hexToRgb(color)},0.7)`}
          strokeWidth="1.5"
          strokeDasharray={circ}
          strokeDashoffset="0"
          strokeLinecap="round"
          transform="rotate(-90 15 15)"
          style={{
            animation: `eslRingDrain ${duration}ms linear forwards`,
          }}
        />
      )}
    </svg>
  );
}

export default function EducationSlider({ isMaximized = false }) {
  const [active, setActive] = useState(0);
  const [textKey, setTextKey] = useState(0);
  const [imgKey, setImgKey] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ringKey, setRingKey] = useState(0);
  const timeoutRef = useRef(null);

  const edu = educationData[active];
  const visibleCards = getVisibleCards(active, educationData);

  const typedCourse = edu.course;
  const typedInst = edu.institution;
  const typedLoc = edu.location;

  const goNext = useCallback(() => {
    setActive((a) => (a + 1) % educationData.length);
    setTextKey((k) => k + 1);
    setImgKey((k) => k + 1);
    setFlipped(false);
    setRingKey((k) => k + 1);
  }, []);

  const goPrev = useCallback(() => {
    setActive((a) => (a - 1 + educationData.length) % educationData.length);
    setTextKey((k) => k + 1);
    setImgKey((k) => k + 1);
    setFlipped(false);
    setRingKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (paused) return;
    timeoutRef.current = setTimeout(goNext, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [active, paused, goNext]);

  const handleInfo = useCallback((e) => {
    e.stopPropagation();
    clearTimeout(timeoutRef.current);
    setPaused(true);
    setFlipped((f) => !f);
  }, []);

  const handleCardClick = useCallback((idx) => {
    clearTimeout(timeoutRef.current);
    setActive(idx);
    setTextKey((k) => k + 1);
    setImgKey((k) => k + 1);
    setFlipped(false);
    setPaused(false);
    setRingKey((k) => k + 1);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');

        @keyframes eslImgReveal {
          from { clip-path: inset(0 0 100% 0); opacity: 0.5; }
          to   { clip-path: inset(0 0 0% 0);   opacity: 1; }
        }
        @keyframes eslSlideDown {
          from { transform: translateY(-110%); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        @keyframes eslExpandW {
          from { width: 0;    opacity: 0; }
          to   { width: 24px; opacity: 1; }
        }
        @keyframes eslCardIn {
          from { transform: translateX(44px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes eslPulse {
          0%,100% { transform: scale(1);    opacity: 0.45; }
          50%      { transform: scale(1.15); opacity: 0.75; }
        }
        @keyframes eslRingDrain {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: ${2 * Math.PI * 11}; }
        }
        @keyframes eslBlink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes eslFadeUp {
          from { transform: translateY(8px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
        @keyframes eslScorePop {
          0%   { transform: scale(0.7); opacity: 0; }
          70%  { transform: scale(1.08); }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes eslShimmerSweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes eslNodePing {
          0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.35); }
          70%  { box-shadow: 0 0 0 6px rgba(255,255,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }

        .esl-root {
          width: 100%;
          height: 100%;
          display: flex;
          overflow: hidden;
          position: relative;
          font-family: 'Syne', sans-serif;
          border-radius: inherit;
        }

        .esl-left {
          width: 36%;
          height: 100%;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
          transition: width 0.4s ease;
        }

        .esl-left-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, #0a0a1a 0%, #0d0d2b 50%, #0f0a20 100%);
          z-index: 0;
        }

        .esl-left-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          filter: saturate(1.1) contrast(1.05) brightness(0.65);
          z-index: 1;
          transition: filter 0.6s ease;
        }
        .esl-left-img:hover { filter: saturate(1.25) contrast(1.08) brightness(0.72); }
        .esl-left-img.entering {
          animation: eslImgReveal 0.9s cubic-bezier(0.4,0,0.2,1) forwards;
        }

        .esl-left-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(5,5,20,0.2) 0%,
            rgba(5,5,20,0.05) 55%,
            rgba(20,5,45,0.7) 100%
          );
          z-index: 2;
        }

        .esl-timeline-capsule {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          height: 70%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 10;
          min-width: 130px;
        }

        .esl-timeline-capsule::before {
          content: "";
          position: absolute;
          left: 34px;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0.05),
            rgba(255,255,255,0.25),
            rgba(255,255,255,0.05)
          );
        }

        .esl-tl-row {
          display: flex;
          align-items: center;
          position: relative;
          cursor: pointer;
          min-width: 130px;
          padding: 4px 0;
        }
        .esl-tl-row:hover { opacity: 0.82; }

        .esl-tl-year-label {
          font-size: 10px;
          color: rgba(255,255,255,0.5);
          width: 30px;
          text-align: right;
          margin-left: -15px;
        }
        .esl-tl-row.active .esl-tl-year-label { color: rgba(255,255,255,0.85); }

        .esl-tl-node-wrap {
          position: absolute;
          left: 34px;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        .esl-tl-node {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          border: none;
          transition: all 0.3s ease;
        }
        .esl-tl-row.active .esl-tl-node {
          width: 10px;
          height: 10px;
          background: white;
          box-shadow: 0 0 8px rgba(255,255,255,0.6);
        }

        .esl-tl-connector-v {
          width: 1px;
          height: 22px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.14), rgba(255,255,255,0.04));
          margin: 1px 0;
          position: relative;
          left: 0;
          z-index: 1;
        }

        .esl-tl-label-text {
          font-size: 10px;
          color: rgba(255,255,255,0.6);
          margin-left: 30px;
        }
        .esl-tl-row.active .esl-tl-label-text { color: rgba(220,230,255,0.78); }

        .esl-step-dash {
          display: inline-block;
          width: 24px;
          height: 1px;
          background: rgba(255,255,255,0.5);
          margin-left: 8px;
          vertical-align: middle;
          margin-bottom: 3px;
          animation: eslExpandW 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s both;
        }

        .esl-cursor {
          display: inline-block;
          width: 1.5px;
          height: 0.85em;
          background: currentColor;
          vertical-align: text-bottom;
          margin-left: 1px;
          animation: eslBlink 0.7s step-end infinite;
          border-radius: 1px;
        }
        .esl-cursor.hidden { opacity: 0; }

        .esl-right {
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: background 0.7s ease;
          min-width: 0;
        }

        .esl-right::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 80% 15%, rgba(255,255,255,0.05) 0%, transparent 55%);
          pointer-events: none;
          z-index: 0;
        }

        .esl-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(48px);
          pointer-events: none;
          z-index: 0;
          transition: background 0.7s ease;
        }

        .esl-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 14px 16px 12px 16px;
          box-sizing: border-box;
          gap: 10px;
        }

        .esl-name-wrap { overflow: hidden; flex-shrink: 0; }

        .esl-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(14px, 2.3vw, 28px);
          font-weight: 400;
          color: rgba(255,255,255,0.97);
          letter-spacing: -0.01em;
          line-height: 1.1;
          animation: eslSlideDown 0.65s cubic-bezier(0.22,1,0.36,1) 0.1s both;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .esl-badge {
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: 20px;
          font-family: 'DM Mono', monospace;
          font-size: 7px;
          font-weight: 600;
          letter-spacing: 0.1em;
          margin-left: 10px;
          vertical-align: middle;
          position: relative;
          top: -2px;
          animation: eslFadeUp 0.5s ease 0.5s both;
        }
        .esl-badge.is-active {
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.32);
          color: #4ade80;
        }
        .esl-badge.is-done {
          background: rgba(148,163,184,0.08);
          border: 1px solid rgba(148,163,184,0.2);
          color: #94a3b8;
        }

        .esl-cards-row {
          display: flex;
          gap: 8px;
          flex: 1;
          min-height: 0;
          align-items: stretch;
          overflow: hidden;
        }

        .esl-card {
          border-radius: 14px;
          overflow: visible;
          position: relative;
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          perspective: 900px;
        }
        .esl-card:hover:not(.esl-card-main) {
          transform: translateY(-3px);
        }

        .esl-card-main      { flex: 2.4; min-width: 0; cursor: default;  animation: eslCardIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s both; }
        .esl-card-secondary { flex: 1.5; min-width: 0; cursor: pointer;  animation: eslCardIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
        .esl-card-third     { flex: 1.5; min-width: 0; cursor: pointer;  animation: eslCardIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both; }

        .esl-card-inner {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.62s cubic-bezier(0.4,0.2,0.2,1);
          position: relative;
        }
        .esl-card-inner.flipped { transform: rotateY(180deg); }

        .esl-card-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 14px 12px;
          text-align: center;
          overflow: hidden;
          gap: 5px;
        }

        .esl-card-front {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.09);
        }

        .esl-card-back {
          background: rgba(8,8,24,0.82);
          backdrop-filter: blur(22px) saturate(180%);
          -webkit-backdrop-filter: blur(22px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.11);
          transform: rotateY(180deg);
        }

        .esl-card-shimmer {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          pointer-events: none;
        }

        .esl-card-shimmer-sweep {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          border-radius: 14px;
        }
        .esl-card-shimmer-sweep::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
          transform: translateX(-100%);
          animation: eslShimmerSweep 3.5s ease-in-out infinite;
        }

        .esl-card-icon-wrap {
          width: 200px;
          height: 200px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          text-align: center;
          overflow: hidden;
        }

        .esl-card-level {
          font-family: 'Syne', sans-serif;
          font-size: clamp(8px, 1vw, 12px);
          font-weight: 700;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.95);
          line-height: 1.2;
        }

        .esl-card-inst {
          font-family: 'DM Mono', monospace;
          font-size: clamp(6px, 0.72vw, 8.5px);
          color: rgba(180,200,255,0.55);
          line-height: 1.4;
        }

        .esl-card-year-tag {
          font-family: 'DM Mono', monospace;
          font-size: clamp(6.5px, 0.72vw, 8px);
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 2px 8px;
          border-radius: 20px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(200,220,255,0.65);
          margin-top: 2px;
        }

        .esl-card-score {
          font-family: 'Syne', sans-serif;
          font-size: clamp(9px, 1.05vw, 13px);
          font-weight: 700;
          color: rgba(255,255,255,0.95);
          line-height: 1.2;
          animation: eslScorePop 0.55s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        .esl-card-detail {
          font-family: 'DM Mono', monospace;
          font-size: clamp(6.5px, 0.74vw, 8.5px);
          color: rgba(180,200,255,0.65);
          line-height: 1.5;
          display: flex;
          align-items: center;
          gap: 5px;
          animation: eslFadeUp 0.4s ease both;
        }
        .esl-card-detail:nth-child(3) { animation-delay: 0.1s; }
        .esl-card-detail:nth-child(4) { animation-delay: 0.2s; }

        .esl-card-detail-icon { opacity: 0.5; flex-shrink: 0; }

        .esl-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          flex-wrap: wrap;
          gap: 6px;
        }

        .esl-nav-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .esl-nav-btns { display: flex; gap: 6px; }

        .esl-nav-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.06);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.22s ease;
          backdrop-filter: blur(6px);
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .esl-nav-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 70%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .esl-nav-btn:hover::after { opacity: 1; }
        .esl-nav-btn:hover {
          background: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.42);
          transform: scale(1.06);
        }
        .esl-nav-btn:active { transform: scale(0.94); }
        .esl-nav-btn svg {
          width: 11px; height: 11px;
          stroke: white; fill: none;
          stroke-width: 2;
          stroke-linecap: round; stroke-linejoin: round;
        }

        .esl-dots { display: flex; gap: 5px; align-items: center; }

        .esl-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.22);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .esl-dot:hover { background: rgba(255,255,255,0.45); }
        .esl-dot.active {
          background: white;
          width: 14px;
          border-radius: 3px;
        }

        .esl-right-group {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .esl-info-btn {
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.75);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          font-style: italic;
          font-weight: 400;
          transition: all 0.22s ease;
          backdrop-filter: blur(6px);
          flex-shrink: 0;
          line-height: 1;
          position: relative;
        }
        .esl-info-btn:hover {
          background: rgba(255,255,255,0.14);
          border-color: rgba(255,255,255,0.42);
        }
        .esl-info-btn.active {
          background: rgba(255,255,255,0.13);
          border-color: rgba(255,255,255,0.4);
          color: white;
        }

        .esl-label {
          font-family: 'Syne', sans-serif;
          font-size: clamp(8px, 0.85vw, 10px);
          color: rgba(255,255,255,0.38);
          letter-spacing: 0.06em;
          cursor: default;
          white-space: nowrap;
        }

        @media (max-width: 900px) {
          .esl-left { width: 38%; }
          .esl-timeline-capsule { min-width: 110px; padding: 14px 10px; }
          .esl-card-icon-wrap { width: 140px; height: 140px; }
        }

        @media (max-width: 700px) {
          .esl-root { flex-direction: column; }

          .esl-left {
            width: 100%;
            height: 38%;
            flex-shrink: 0;
          }

          .esl-left-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to right,
              rgba(5,5,20,0.55) 0%,
              rgba(5,5,20,0.35) 55%,
              rgba(20,5,45,0.85) 100%
            );
            z-index: 2;
          }

          .esl-timeline-capsule {
            left: 12px;
            height: 75%;
            min-width: unset;
          }

          .esl-tl-connector-v { display: none; }

          .esl-tl-row {
            flex-direction: column;
            align-items: center;
            gap: 4px;
            padding: 0 10px;
          }

          .esl-tl-year-label { width: auto; text-align: center; }
          .esl-tl-label-text { max-width: 60px; text-align: center; }

          .esl-step-top {
            top: 10px;
            left: 12px;
            right: 12px;
          }
          .esl-step-bottom {
            bottom: auto;
            top: 28px;
            left: 12px;
          }
          .esl-step-bottom-text {
            font-size: clamp(13px, 3.5vw, 22px);
          }

          .esl-right { flex: 1; min-height: 0; }
          .esl-content { padding: 10px 12px 10px 12px; gap: 8px; }

          .esl-card-icon-wrap { width: 100px; height: 100px; }
          .esl-cards-row { gap: 6px; }

          .esl-name { font-size: clamp(13px, 3.5vw, 22px); }
        }

        @media (max-width: 480px) {
          .esl-left { height: 34%; }

          .esl-step-bottom-text { font-size: clamp(11px, 4vw, 18px); }

          .esl-card-secondary,
          .esl-card-third { flex: 1.2; }
          .esl-card-main { flex: 2; }

          .esl-card-icon-wrap { width: 72px; height: 72px; }

          .esl-label { display: none; }
          .esl-nav-btn { width: 26px; height: 26px; }
          .esl-info-btn { width: 26px; height: 26px; font-size: 12px; }

          .esl-timeline-capsule { padding: 8px 10px; }
          .esl-tl-row { padding: 0 7px; }
          .esl-tl-label-text { display: none; }
        }

        .esl-left-bottom {
          position: absolute;
          bottom: 10px;
          left: 18px;
          right: 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 10;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 10px 12px;
        }

        .esl-left-bottom-logo {
          width: 42px;
          height: 42px;
          object-fit: contain;
          flex-shrink: 0;
          filter: drop-shadow(0 6px 12px rgba(0,0,0,0.5));
        }

        .esl-left-bottom-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .esl-left-college {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(14px, 2vw, 20px);
          color: rgba(255,255,255,0.95);
          line-height: 1.1;
        }

        .esl-left-location {
          font-family: 'DM Mono', monospace;
          font-size: clamp(8px, 0.9vw, 11px);
          color: rgba(180,200,255,0.6);
        }

        .esl-tl-glass {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 20px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.75);
          font-size: 10px;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }

        .esl-tl-row.active .esl-tl-glass {
          background: rgba(var(--tl-active-rgb), 0.18);
          border-color: rgba(var(--tl-active-rgb), 0.45);
          color: rgba(255,255,255,0.95);
          box-shadow: 0 0 8px rgba(var(--tl-active-rgb), 0.2);
        }
      `}</style>

      <div className="esl-root">
        <div className="esl-left">
          <div className="esl-left-bg" />
          <img
            key={imgKey}
            src={edu.image}
            alt={edu.level}
            className="esl-left-img entering"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="esl-left-overlay" />

          <div className="esl-timeline-capsule">
            {educationData.map((item, i) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <div
                  className={`esl-tl-row${active === i ? " active" : ""}`}
                  onClick={() => handleCardClick(i)}
                  style={{ "--tl-active-rgb": hexToRgb(item.color) }}
                >
                  <span className="esl-tl-year-label">
                    <span className="esl-tl-glass">{item.year}</span>
                  </span>
                  <div className="esl-tl-node-wrap">
                    <div
                      className="esl-tl-node"
                      style={
                        active === i
                          ? {
                              background: `radial-gradient(circle, rgba(${hexToRgb(item.color)}, 0.25) 0%, rgba(20,20,50,0.95) 70%)`,
                              borderColor: `rgba(${hexToRgb(item.color)}, 0.65)`,
                              boxShadow: `0 0 0 3px rgba(${hexToRgb(item.color)}, 0.1), 0 0 10px rgba(${hexToRgb(item.color)}, 0.22)`,
                            }
                          : {}
                      }
                    />
                  </div>
                  <span className="esl-tl-label-text">
                    <span className="esl-tl-glass">{item.level}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="esl-left-bottom">
            <img src={edu.logo} alt="logo" className="esl-left-bottom-logo" />
            <div className="esl-left-bottom-text">
              <div className="esl-left-college">{edu.institution}</div>
              <div className="esl-left-location">{edu.location}</div>
            </div>
          </div>
        </div>

        <div className="esl-right">
          <div
            className="esl-blob"
            style={{
              top: -70,
              right: -50,
              width: isMaximized ? 280 : 200,
              height: isMaximized ? 280 : 200,
              background: `radial-gradient(circle, ${edu.glow} 0%, transparent 70%)`,
            }}
          />
          <div
            className="esl-blob"
            style={{
              bottom: -50,
              left: -30,
              width: isMaximized ? 180 : 130,
              height: isMaximized ? 180 : 130,
              background:
                "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
            }}
          />

          <div className="esl-content">
            <div className="esl-name-wrap">
              <div key={`nm-${textKey}`} className="esl-name">
                {typedCourse}
                <span
                  className={`esl-badge ${edu.active ? "is-active" : "is-done"}`}
                >
                  {edu.active ? "● ACTIVE" : "✓ DONE"}
                </span>
              </div>
            </div>

            <div className="esl-cards-row" key={`cr-${active}`}>
              {visibleCards.map((item, i) => {
                const isMain = i === 0;
                const shouldFlip = isMain && flipped;
                const cardIdx = educationData.findIndex(
                  (d) => d.id === item.id,
                );

                return (
                  <div
                    key={item.id}
                    className={`esl-card ${isMain ? "esl-card-main" : i === 1 ? "esl-card-secondary" : "esl-card-third"}`}
                    onClick={() => {
                      if (!isMain) handleCardClick(cardIdx);
                    }}
                  >
                    <div
                      className={`esl-card-inner${shouldFlip ? " flipped" : ""}`}
                    >
                      <div
                        className="esl-card-face esl-card-front"
                        style={{
                          borderColor: `rgba(${hexToRgb(item.color)},0.22)`,
                          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 0 16px rgba(${hexToRgb(item.color)},0.08)`,
                        }}
                      >
                        <div
                          className="esl-card-shimmer"
                          style={{
                            background: `linear-gradient(90deg, transparent, rgba(${hexToRgb(item.color)},0.3), transparent)`,
                          }}
                        />
                        {isMain && <div className="esl-card-shimmer-sweep" />}

                        <div
                          className="esl-card-icon-wrap"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "200px",
                            height: "200px",
                          }}
                        >
                          <img
                            src={item.logo}
                            alt={item.institution}
                            style={{
                              width: "80%",
                              height: "80%",
                              objectFit: "contain",
                              display: "block",
                              margin: "0 auto",
                            }}
                          />
                        </div>

                        <div
                          className="esl-card-level"
                          style={{ color: item.color }}
                        >
                          {item.level}
                        </div>
                        <div className="esl-card-inst">{item.institution}</div>
                        <div className="esl-card-year-tag">{item.year}</div>
                      </div>

                      <div
                        className="esl-card-face esl-card-back"
                        style={{
                          borderColor: `rgba(${hexToRgb(item.color)},0.26)`,
                        }}
                      >
                        <div
                          className="esl-card-shimmer"
                          style={{
                            background: `linear-gradient(90deg, transparent, rgba(${hexToRgb(item.color)},0.3), transparent)`,
                          }}
                        />
                        <div
                          className="esl-card-icon-wrap"
                          style={{
                            background: `rgba(${hexToRgb(item.color)},0.1)`,
                            border: `1px solid rgba(${hexToRgb(item.color)},0.2)`,
                          }}
                        >
                          <LevelIcon level={item.level} color={item.color} />
                        </div>

                        <div
                          className="esl-card-score"
                          style={{ color: item.color }}
                        >
                          {item.score}
                        </div>

                        <div className="esl-card-detail">
                          <svg
                            className="esl-card-detail-icon"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ color: item.color }}
                          >
                            <rect x="3" y="4" width="18" height="18" rx="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          {item.duration}
                        </div>

                        <div className="esl-card-detail">
                          <svg
                            className="esl-card-detail-icon"
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ color: item.color }}
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {item.location}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="esl-bottom">
              <div className="esl-nav-group">
                <div className="esl-nav-btns">
                  <button className="esl-nav-btn" onClick={goPrev}>
                    <svg viewBox="0 0 24 24">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button className="esl-nav-btn" onClick={goNext}>
                    <svg viewBox="0 0 24 24">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
                <div className="esl-dots">
                  {educationData.map((_, i) => (
                    <div
                      key={i}
                      className={`esl-dot${i === active ? " active" : ""}`}
                      onClick={() => handleCardClick(i)}
                    />
                  ))}
                </div>
              </div>

              <div className="esl-right-group">
                <div
                  style={{
                    position: "relative",
                    width: 30,
                    height: 30,
                    flexShrink: 0,
                  }}
                >
                  <ProgressRing
                    key={`ring-${ringKey}-${active}`}
                    duration={5000}
                    active={!paused}
                    color={edu.color}
                    paused={paused}
                  />
                  <button
                    className={`esl-info-btn${flipped ? " active" : ""}`}
                    onClick={handleInfo}
                    title="Flip card for details"
                  >
                    i
                  </button>
                </div>
                <span className="esl-label">Academic Journey</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
