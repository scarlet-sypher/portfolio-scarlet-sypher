import { useEffect, useRef, useState } from "react";
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
  { id: 7, src: luffy, alt: "Hero 6" },
  { id: 8, src: luffy2, alt: "Hero 6" },
  { id: 9, src: luffy3, alt: "Hero 6" },
  { id: 10, src: rengoku, alt: "Hero 6" },
];

const INTERVAL_MS = 4000;

export default function HeroCharacter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const imgRefs = useRef({});
  const timelineRef = useRef(null);
  const intervalRef = useRef(null);
  const prevIndexRef = useRef(null);

  useEffect(() => {
    HERO_IMAGES.forEach((_, idx) => {
      const el = imgRefs.current[idx];
      if (!el) return;
      gsap.set(el, {
        opacity: 0,
        scale: 0.88,
        y: 24,
        filter:
          "drop-shadow(0 -8px 32px rgba(200,100,10,0.35)) drop-shadow(0 12px 24px rgba(0,0,0,0.8))",
      });
    });

    gsap.to(imgRefs.current[0], {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.75,
      ease: "power3.out",
      delay: 0.6,
    });
  }, []);

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

    const direction = activeIndex > prev ? 1 : activeIndex < prev ? -1 : 1;

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    timelineRef.current = tl;

    tl.to(
      outEl,
      {
        opacity: 0,
        scale: 0.88,
        x: -20 * direction,
        y: 12,
        duration: 0.55,
      },
      0,
    );

    gsap.set(inEl, {
      opacity: 0,
      scale: 0.92,
      x: 28 * direction,
      y: 16,
    });

    tl.to(
      inEl,
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.65,
      },
      0.15,
    );
    tl.set(outEl, { x: 0, y: 24, scale: 0.88 });
  }, [activeIndex]);

  const currentHero = HERO_IMAGES[activeIndex];

  return (
    <div
      className="absolute z-20 pointer-events-none"
      style={{
        left: 120,
        right: 16,
        top: 0,
        bottom: 96,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingLeft: 500,
        paddingRight: 268,
      }}
    >
      <div
        className="absolute"
        style={{
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 320,
          height: 220,
          background:
            "radial-gradient(ellipse at 50% 90%, rgba(200, 110, 20, 0.38) 0%, rgba(180, 80, 10, 0.18) 45%, transparent 75%)",
          filter: "blur(18px)",
          pointerEvents: "none",
        }}
      />

      {HERO_IMAGES.map((hero, idx) => (
        <img
          key={hero.id}
          ref={(el) => (imgRefs.current[idx] = el)}
          src={hero.src}
          alt={hero.alt}
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            height: "100%",
            width: "auto",
            objectFit: "contain",
            objectPosition: "bottom center",
            filter:
              "drop-shadow(0 -8px 32px rgba(200, 100, 10, 0.35)) drop-shadow(0 12px 24px rgba(0,0,0,0.8))",

            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
