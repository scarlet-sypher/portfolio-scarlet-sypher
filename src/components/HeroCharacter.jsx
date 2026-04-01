import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

import zoro from "../assets/hero/zoro.png";
import cat from "../assets/hero/cat.png";
import deku from "../assets/hero/deku.png";
import inoske from "../assets/hero/inoske.png";
import jinbe from "../assets/hero/jinbe.png";
import luffy from "../assets/hero/luffy.png";
import luffy2 from "../assets/hero/luffy2.png";
import luffy3 from "../assets/hero/luffy3.png";
import naruto from "../assets/hero/naruto.png";
import rengoku from "../assets/hero/rengoku.png";

const HERO_IMAGES = [
  { id: 1, src: zoro, alt: "Zoro" },
  { id: 2, src: naruto, alt: "Naruto" },
  { id: 3, src: cat, alt: "Hero 3" },
  { id: 4, src: deku, alt: "Hero 4" },
  { id: 5, src: inoske, alt: "Hero 5" },
  { id: 6, src: jinbe, alt: "Hero 6" },
  { id: 7, src: luffy, alt: "Hero 7" },
  { id: 8, src: luffy2, alt: "Hero 8" },
  { id: 9, src: luffy3, alt: "Hero 9" },
  { id: 10, src: rengoku, alt: "Hero 10" },
];

const INTERVAL_MS = 4000;

export default function HeroCharacter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const imgRefs = useRef({});
  const timelineRef = useRef(null);
  const intervalRef = useRef(null);
  const prevIndexRef = useRef(null);
  const initializedRef = useRef(false);

  const initFirstImage = useCallback(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    HERO_IMAGES.forEach((_, idx) => {
      const el = imgRefs.current[idx];
      if (!el) return;
      gsap.set(el, {
        opacity: 0,
        scale: 0.88,
        y: 24,
        x: 0,
        zIndex: 0,
        visibility: "hidden",
      });
    });

    const firstEl = imgRefs.current[0];
    if (!firstEl) return;

    gsap.set(firstEl, { zIndex: 1, visibility: "visible" });
    gsap.to(firstEl, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.75,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  useEffect(() => {
    const firstEl = imgRefs.current[0];
    if (!firstEl) return;

    if (firstEl.complete && firstEl.naturalWidth > 0) {
      initFirstImage();
    } else {
      firstEl.addEventListener("load", initFirstImage, { once: true });
      firstEl.addEventListener("error", initFirstImage, { once: true });
    }

    return () => {
      firstEl.removeEventListener("load", initFirstImage);
      firstEl.removeEventListener("error", initFirstImage);
    };
  }, [initFirstImage]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, INTERVAL_MS);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const prev = prevIndexRef.current;
    prevIndexRef.current = activeIndex;

    if (prev === null) return;

    const outEl = imgRefs.current[prev];
    const inEl = imgRefs.current[activeIndex];
    if (!outEl || !inEl) return;

    if (timelineRef.current) timelineRef.current.kill();

    const direction = activeIndex > prev ? 1 : -1;

    const doTransition = () => {
      gsap.set(inEl, {
        opacity: 0,
        scale: 0.92,
        x: 28 * direction,
        y: 16,
        zIndex: 2,
        visibility: "visible",
      });
      gsap.set(outEl, { zIndex: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          gsap.set(outEl, {
            opacity: 0,
            scale: 0.88,
            x: 0,
            y: 24,
            zIndex: 0,
            visibility: "hidden",
          });
          gsap.set(inEl, { zIndex: 1 });
        },
      });
      timelineRef.current = tl;

      tl.to(
        outEl,
        { opacity: 0, scale: 0.88, x: -20 * direction, y: 12, duration: 0.55 },
        0,
      );
      tl.to(inEl, { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.65 }, 0.15);
    };

    if (inEl.complete && inEl.naturalWidth > 0) {
      doTransition();
    } else {
      inEl.addEventListener("load", doTransition, { once: true });
    }
  }, [activeIndex]);

  return (
    <div
      className="absolute z-20 pointer-events-none"
      style={{
        inset: 0,
        bottom: 96,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "clamp(180px, 28vw, 460px)",
          marginLeft: "clamp(0px, 6vw, 80px)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "40%",
            background:
              "radial-gradient(ellipse at 50% 90%, rgba(200, 110, 20, 0.38) 0%, rgba(180, 80, 10, 0.18) 45%, transparent 75%)",
            filter: "blur(18px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {HERO_IMAGES.map((hero, idx) => (
          <img
            key={hero.id}
            ref={(el) => (imgRefs.current[idx] = el)}
            src={hero.src}
            alt={hero.alt}
            decoding="async"
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              height: "100%",
              width: "auto",
              maxWidth: "none",
              objectFit: "contain",
              objectPosition: "bottom center",
              filter:
                "drop-shadow(0 -8px 32px rgba(200, 100, 10, 0.35)) drop-shadow(0 12px 24px rgba(0,0,0,0.8))",
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>
    </div>
  );
}
