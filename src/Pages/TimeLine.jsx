import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import { Sun, Moon } from "lucide-react";

const CARD_COLORS = [
  "#e85d4a",
  "#e8924a",
  "#d4a843",
  "#6db86b",
  "#4ab8a0",
  "#4a90d4",
  "#7b6dd4",
  "#c46db8",
  "#e8614a",
  "#4ab8d4",
  "#d46d6d",
  "#6d9bd4",
];

const TIMELINE_DATA = [
  {
    t: "Matriculation Completed",
    d: "Completed Class 10 with 88% from Kendriya Vidyalaya Rangapahar Cantt, building a strong academic foundation.",
    date: "Mar 2019",
    image: "https://picsum.photos/id/50/512/512",
  },
  {
    t: "Intermediate Completed",
    d: "Completed Class 12 with 87.4%, strengthening core subjects and preparing for engineering journey.",
    date: "Mar 2021",
    image: "https://picsum.photos/id/51/512/512",
  },
  {
    t: "Started B.Tech CSE",
    d: "Began Computer Science Engineering at Lovely Professional University with a focus on problem solving and development.",
    date: "Aug 2023",
    image: "https://picsum.photos/id/52/512/512",
  },
  {
    t: "Frontend & Core Skills",
    d: "Developed strong foundations in HTML, CSS, JavaScript, Tailwind CSS along with DSA and responsive design.",
    date: "2024",
    image: "https://picsum.photos/id/53/512/512",
  },
  {
    t: "CryBug",
    d: "Built a full-stack bug tracking system with role-based dashboards, real-time updates, and secure authentication.",
    date: "Apr 2025",
    image: "https://picsum.photos/id/54/512/512",
  },
  {
    t: "HelpMeMake",
    d: "Engineered an AI-powered mentorship platform with automated mentor matching and real-time collaboration features.",
    date: "Sep 2025",
    image: "https://picsum.photos/id/55/512/512",
  },
  {
    t: "Oracle AI Certification",
    d: "Earned Oracle Cloud Infrastructure AI Foundations Associate certification, strengthening AI and cloud fundamentals.",
    date: "Sep 2025",
    image: "https://picsum.photos/id/56/512/512",
  },
  {
    t: "JPMorgan Simulation",
    d: "Completed Software Engineering Job Simulation by JPMorgan Chase & Co., gaining real-world development insights.",
    date: "Sep 2025",
    image: "https://picsum.photos/id/57/512/512",
  },
  {
    t: "Orbosis Internship",
    d: "Worked as MERN Stack Developer Intern, building scalable APIs, responsive UI, and contributing to Android integration.",
    date: "Oct 2025 – Jan 2026",
    image: "https://picsum.photos/id/58/512/512",
  },
  {
    t: "WhisperTails",
    d: "Developed an advanced pet adoption platform with a 5-stage workflow, real-time chat, and live tracking using Socket.IO.",
    date: "Jan 2026",
    image: "https://picsum.photos/id/59/512/512",
  },
  {
    t: "DSA Milestone",
    d: "Solved 150+ LeetCode problems and achieved 5★ Problem Solving & 4★ Java on HackerRank.",
    date: "Jan 2026",
    image: "https://picsum.photos/id/60/512/512",
  },
  {
    t: "Present",
    d: "Continuously building scalable full-stack apps, exploring AI integrations, and refining system design skills.",
    date: "2026",
    image: "https://picsum.photos/id/61/512/512",
  },
];

const TOTAL_IMAGES = TIMELINE_DATA.length;

const CONFIG = {
  cardWidth: 2,
  cardHeight: 2.8,
  tubeRadius: 1.5,
  spiralLoops: 4,
  spiralDepth: 60,
  spiralMaxRadius: 7,
  fov: 45,
};

const MAX_SCROLL = (TOTAL_IMAGES - 1) / TOTAL_IMAGES + 0.04;

const THEMES = {
  dark: {
    bg: "#0d1117",
    fogColor: 0x0d1117,
    clearColor: 0x0d1117,
    cardBg: "#0d1117",
    cardPhoto: "#161b22",
    cardText: "#e6edf3",
    cardSubText: "#8b949e",
    sidebarTitle: "#e6edf3",
    sidebarDesc: "#8b949e",
    sidebarDate: null,
    pillBg: "rgba(255,255,255,0.06)",
    pillBorder: "rgba(255,255,255,0.12)",
    pillText: "#8b949e",
    toggleBg: "rgba(255,255,255,0.08)",
    toggleBorder: "rgba(255,255,255,0.14)",
    toggleColor: "#e6edf3",
    badgeBg: "rgba(255,255,255,0.06)",
    badgeBorder: "rgba(255,255,255,0.12)",
    badgeText: "#8b949e",
  },
  light: {
    bg: "#f6f8fa",
    fogColor: 0xf6f8fa,
    clearColor: 0xf6f8fa,
    cardBg: "#ffffff",
    cardPhoto: "#f0f0f0",
    cardText: "#1c2128",
    cardSubText: "#57606a",
    sidebarTitle: "#1c2128",
    sidebarDesc: "#57606a",
    sidebarDate: null,
    pillBg: "rgba(0,0,0,0.04)",
    pillBorder: "rgba(0,0,0,0.1)",
    pillText: "#57606a",
    toggleBg: "rgba(0,0,0,0.06)",
    toggleBorder: "rgba(0,0,0,0.12)",
    toggleColor: "#1c2128",
    badgeBg: "rgba(0,0,0,0.04)",
    badgeBorder: "rgba(0,0,0,0.1)",
    badgeText: "#57606a",
  },
};

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export default function Timeline({ isMaximized = false }) {
  const [dark, setDark] = useState(true);
  const darkRef = useRef(true);

  const wrapperRef = useRef(null);
  const mountRef = useRef(null);
  const domYearRef = useRef(null);
  const domTitleRef = useRef(null);
  const domDescRef = useRef(null);
  const domContentRef = useRef(null);
  const domAccentBarRef = useRef(null);
  const rafRef = useRef(null);
  const scrollPosRef = useRef(0);
  const targetScrollRef = useRef(0);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const activeColorRef = useRef(CARD_COLORS[0]);

  const textureCanvasesRef = useRef([]);
  const texturesRef = useRef([]);

  const redrawCard = useCallback((index, isDark) => {
    const canvas = textureCanvasesRef.current[index];
    const texture = texturesRef.current[index];
    if (!canvas || !texture) return;

    const ctx = canvas.getContext("2d");
    const item = TIMELINE_DATA[index];
    const accent = CARD_COLORS[index % CARD_COLORS.length];
    const th = isDark ? THEMES.dark : THEMES.light;

    ctx.fillStyle = th.cardBg;
    ctx.fillRect(0, 0, 512, 716);

    const img = canvas._loadedImg;
    if (img) {
      ctx.drawImage(img, 24, 24, 464, 464);
    } else {
      ctx.fillStyle = th.cardPhoto;
      ctx.fillRect(24, 24, 464, 464);
      ctx.fillStyle = th.cardSubText;
      ctx.font = "24px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Loading…", 256, 256);
    }

    const { r, g, b } = hexToRgb(accent);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(24, 24, 464, 464);

    ctx.fillStyle = accent;
    ctx.fillRect(0, 492, 512, 3);

    ctx.fillStyle = accent;
    ctx.font = "bold 34px Helvetica, Arial";
    ctx.textAlign = "left";
    ctx.fillText(item.date, 32, 550);

    ctx.fillStyle = th.cardText;
    ctx.font = "bold 22px Helvetica, Arial";
    const words = item.t.split(" ");
    let line = "";
    let lineY = 592;
    for (const word of words) {
      const test = line + word + " ";
      if (ctx.measureText(test).width > 456 && line !== "") {
        ctx.fillText(line.trim(), 32, lineY);
        line = word + " ";
        lineY += 28;
      } else {
        line = test;
      }
    }
    ctx.fillText(line.trim(), 32, lineY);

    ctx.strokeStyle = `rgba(${r},${g},${b},0.18)`;
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, 512, 716);

    texture.needsUpdate = true;
  }, []);

  const createCardTexture = useCallback(
    (index) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 716;
      textureCanvasesRef.current[index] = canvas;

      const texture = new THREE.CanvasTexture(canvas);
      texturesRef.current[index] = texture;

      redrawCard(index, darkRef.current);

      const item = TIMELINE_DATA[index];
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = item.image;
      img.onload = () => {
        canvas._loadedImg = img;
        redrawCard(index, darkRef.current);
      };

      return texture;
    },
    [redrawCard],
  );

  useEffect(() => {
    darkRef.current = dark;
    const th = dark ? THEMES.dark : THEMES.light;

    if (rendererRef.current) {
      rendererRef.current.setClearColor(th.clearColor);
    }
    if (sceneRef.current) {
      sceneRef.current.fog.color.setHex(th.fogColor);
    }

    for (let i = 0; i < TOTAL_IMAGES; i++) {
      redrawCard(i, dark);
    }

    const el = domContentRef.current;
    if (el) {
      el.style.transition = "none";
      if (domTitleRef.current)
        domTitleRef.current.style.color = th.sidebarTitle;
      if (domDescRef.current) domDescRef.current.style.color = th.sidebarDesc;
    }
  }, [dark, redrawCard]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const mount = mountRef.current;
    if (!wrapper || !mount) return;

    let W = mount.clientWidth || 700;
    let H = mount.clientHeight || 460;

    const th = darkRef.current ? THEMES.dark : THEMES.light;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(th.fogColor, 0.036);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(CONFIG.fov, W / H, 0.1, 100);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(th.clearColor);
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const points = [];
    const steps = 400;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * Math.PI * 2 * CONFIG.spiralLoops;
      const radius = 0.5 + Math.pow(t, 1.1) * CONFIG.spiralMaxRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = t * CONFIG.spiralDepth - CONFIG.spiralDepth;
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(points);

    const basePlaneGeo = new THREE.PlaneGeometry(
      CONFIG.cardWidth,
      CONFIG.cardHeight,
      10,
      10,
    );
    const basePosAttr = basePlaneGeo.attributes.position;
    const basePositions = [];
    for (let i = 0; i < basePosAttr.count; i++) {
      basePositions.push(
        new THREE.Vector3(
          basePosAttr.getX(i),
          basePosAttr.getY(i),
          basePosAttr.getZ(i),
        ),
      );
    }

    const cards = [];
    for (let i = 0; i < TOTAL_IMAGES; i++) {
      const mat = new THREE.MeshBasicMaterial({
        map: createCardTexture(i),
        side: THREE.DoubleSide,
        transparent: true,
      });
      const geo = basePlaneGeo.clone();
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      cards.push({
        mesh,
        index: i,
        baseOffset: i / TOTAL_IMAGES,
        rotationOffset: (i * 60 * Math.PI) / 180,
        currentBend: 1,
        t: 0,
      });
    }

    function updateCardGeometry(card, bendFactor) {
      const positions = card.mesh.geometry.attributes.position;
      const radius = CONFIG.tubeRadius + 0.1;
      for (let i = 0; i < basePositions.length; i++) {
        const v = basePositions[i];
        const angle = v.x / radius;
        const curvedX = radius * Math.sin(angle);
        const curvedY = v.y;
        const curvedZ = radius * (1 - Math.cos(angle));
        positions.setXYZ(
          i,
          v.x + (curvedX - v.x) * bendFactor,
          v.y + (curvedY - v.y) * bendFactor,
          v.z + (curvedZ - v.z) * bendFactor,
        );
      }
      positions.needsUpdate = true;
    }

    let activeIndex = -1;

    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const next = targetScrollRef.current + e.deltaY * 0.00016;
      targetScrollRef.current = Math.max(0, Math.min(MAX_SCROLL, next));
    };
    wrapper.addEventListener("wheel", onWheel, { passive: false });

    function updateSidebar(index) {
      if (index === activeIndex) return;
      activeIndex = index;
      const el = domContentRef.current;
      if (!el) return;
      el.style.transition = "none";
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
      setTimeout(() => {
        if (index === -1) return;
        const data = TIMELINE_DATA[index];
        const accent = CARD_COLORS[index % CARD_COLORS.length];
        activeColorRef.current = accent;
        const isDark = darkRef.current;
        const th = isDark ? THEMES.dark : THEMES.light;

        if (domYearRef.current) {
          domYearRef.current.textContent = data.date;
          domYearRef.current.style.color = accent;
        }
        if (domAccentBarRef.current) {
          domAccentBarRef.current.style.background = accent;
        }
        if (domTitleRef.current) {
          domTitleRef.current.textContent = data.t;
          domTitleRef.current.style.color = th.sidebarTitle;
        }
        if (domDescRef.current) {
          domDescRef.current.textContent = data.d;
          domDescRef.current.style.color = th.sidebarDesc;
        }
        if (el) {
          el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      }, 250);
    }

    const spiralOffset = new THREE.Vector3(-2.6, 1.4, 0);

    function animate() {
      rafRef.current = requestAnimationFrame(animate);

      scrollPosRef.current +=
        (targetScrollRef.current - scrollPosRef.current) * 0.05;

      let candidateIndex = -1;
      let maxT = -1;

      cards.forEach((card) => {
        let t = (card.baseOffset + scrollPosRef.current) % 1;
        if (t < 0) t += 1;
        card.t = t;
        if (t > 0.85 && t < 0.98) {
          if (t > maxT) {
            maxT = t;
            candidateIndex = card.index;
          }
        }
      });

      if (candidateIndex !== activeIndex) {
        updateSidebar(candidateIndex);
      }

      const targetZ = 10;
      const dist = camera.position.z - targetZ;
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const visibleHeight = 2 * Math.tan(vFOV / 2) * dist;
      const visibleWidth = visibleHeight * camera.aspect;

      let displayScale = 1.1;
      const maxCardHeight = visibleHeight - 1.2;
      if (CONFIG.cardHeight * displayScale > maxCardHeight) {
        displayScale = maxCardHeight / CONFIG.cardHeight;
      }

      let targetX = visibleWidth * 0.27;
      const halfCardWidth = (CONFIG.cardWidth * displayScale) / 2;
      const screenRightEdge = visibleWidth / 2;
      const rightPadding = 0.35;
      if (targetX + halfCardWidth > screenRightEdge - rightPadding) {
        targetX = screenRightEdge - rightPadding - halfCardWidth;
      }

      cards.forEach((card) => {
        const isFocused = card.index === activeIndex;
        let targetPos = new THREE.Vector3();
        let targetRot = new THREE.Euler();
        let targetScale = 1;
        let targetBend = 1;

        if (isFocused) {
          targetPos.set(targetX, 0, targetZ);
          targetRot.set(0, -0.18, 0);
          targetScale = displayScale;
          targetBend = 0;
          card.mesh.material.opacity = 1;
        } else {
          const t = card.t;
          const posOnCurve = curve.getPointAt(t);
          targetPos.copy(posOnCurve);
          targetPos.add(spiralOffset);

          const lookAtT = Math.min(t + 0.01, 1);
          const lookAtPos = curve.getPointAt(lookAtT);
          const offsetLookAt = lookAtPos.clone().add(spiralOffset);

          const dummy = new THREE.Object3D();
          dummy.position.copy(targetPos);
          dummy.lookAt(offsetLookAt);

          const spinAngle = t * Math.PI * 2 * 2 + card.rotationOffset;
          dummy.rotateZ(spinAngle);
          dummy.translateX(CONFIG.tubeRadius + 0.1);
          dummy.rotateY(Math.PI / 2);
          dummy.updateMatrix();

          targetPos.setFromMatrixPosition(dummy.matrix);
          targetRot.copy(dummy.rotation);

          targetScale = 0.2 + t * t * 0.8;
          targetBend = 1;

          if (t < 0.1) card.mesh.material.opacity = t / 0.1;
          else if (t > 0.95) card.mesh.material.opacity = (1 - t) / 0.05;
          else card.mesh.material.opacity = 1;
        }

        const lerpSpeed = 0.08;
        card.mesh.position.lerp(targetPos, lerpSpeed);
        const targetQuat = new THREE.Quaternion().setFromEuler(targetRot);
        card.mesh.quaternion.slerp(targetQuat, lerpSpeed);
        const cs = card.mesh.scale.x;
        card.mesh.scale.setScalar(cs + (targetScale - cs) * lerpSpeed);
        card.currentBend += (targetBend - card.currentBend) * 0.05;
        updateCardGeometry(card, card.currentBend);
      });

      renderer.render(scene, camera);
    }

    animate();

    const onResize = () => {
      if (!mount) return;
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      if (nw < 1 || nh < 1) return;
      W = nw;
      H = nh;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(mount);
    window.addEventListener("resize", onResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      wrapper.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      renderer.dispose();
      rendererRef.current = null;
      sceneRef.current = null;
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
    };
  }, [createCardTexture]);

  const th = dark ? THEMES.dark : THEMES.light;
  const atEnd = scrollPosRef.current >= MAX_SCROLL - 0.01;

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
        background: th.bg,
        cursor: "ns-resize",
        userSelect: "none",
        WebkitUserSelect: "none",
        transition: "background 0.3s ease",
      }}
    >
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      <button
        onClick={() => setDark((d) => !d)}
        title={dark ? "Switch to light mode" : "Switch to dark mode"}
        style={{
          position: "absolute",
          top: 10,
          right: 12,
          zIndex: 30,
          width: 32,
          height: 32,
          borderRadius: 8,
          background: th.toggleBg,
          border: `1px solid ${th.toggleBorder}`,
          color: th.toggleColor,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          outline: "none",
          padding: 0,
          transition: "background 0.2s, border-color 0.2s",
        }}
      >
        {dark ? (
          <Sun size={14} strokeWidth={2} />
        ) : (
          <Moon size={14} strokeWidth={2} />
        )}
      </button>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: "46%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "5%",
            paddingRight: "12px",
            boxSizing: "border-box",
          }}
        >
          <div
            ref={domContentRef}
            style={{ opacity: 0, transform: "translateY(12px)" }}
          >
            <div
              style={{
                fontSize: "clamp(0.55rem, 1vw, 0.75rem)",
                marginBottom: "10px",
                letterSpacing: "2px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                fontFamily: "'DM Mono', 'Courier New', monospace",
                textTransform: "uppercase",
              }}
            >
              <span
                ref={domAccentBarRef}
                style={{
                  display: "inline-block",
                  width: "26px",
                  height: "2px",
                  background: CARD_COLORS[0],
                  marginRight: "10px",
                  flexShrink: 0,
                }}
              />
              <span ref={domYearRef} style={{ color: CARD_COLORS[0] }}>
                —
              </span>
            </div>

            <h2
              ref={domTitleRef}
              style={{
                margin: "0 0 10px 0",
                fontSize: "clamp(0.95rem, 2.4vw, 2rem)",
                color: th.sidebarTitle,
                fontWeight: 800,
                letterSpacing: "-0.5px",
                lineHeight: 1.15,
                fontFamily: "'DM Serif Display', Georgia, serif",
              }}
            >
              Timeline
            </h2>

            <p
              ref={domDescRef}
              style={{
                lineHeight: 1.68,
                color: th.sidebarDesc,
                fontSize: "clamp(0.62rem, 0.9vw, 0.85rem)",
                maxWidth: "90%",
                fontWeight: 400,
                margin: 0,
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              Scroll to explore the journey.
            </p>
          </div>
        </div>

        <div style={{ width: "54%", height: "100%" }} />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          opacity: atEnd ? 0 : 0.38,
          transition: "opacity 0.4s ease",
        }}
      >
        <svg width="14" height="22" viewBox="0 0 16 24" fill="none">
          <rect
            x="5"
            y="1"
            width="6"
            height="12"
            rx="3"
            stroke={th.badgeText}
            strokeWidth="1.5"
          />
          <circle cx="8" cy="5" r="1.5" fill={th.badgeText}>
            <animate
              attributeName="cy"
              values="5;9;5"
              dur="1.4s"
              repeatCount="indefinite"
            />
          </circle>
          <path
            d="M4 17l4 5 4-5"
            stroke={th.badgeText}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          style={{
            fontSize: "7px",
            letterSpacing: "2px",
            color: th.badgeText,
            fontFamily: "monospace",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
      </div>
    </div>
  );
}
