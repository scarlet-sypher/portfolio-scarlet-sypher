import { useEffect, useRef } from "react";

export default function ParticleBackground({ dark }) {
  const canvasRef = useRef(null);
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const N = Math.max(40, Math.floor((W * H) / 8000));

    const flakes = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.6,
      speedY: Math.random() * 0.8 + 0.4,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      flakes.forEach((f) => {
        f.y += f.speedY;
        f.x += f.speedX + Math.sin(f.y * 0.01) * 0.2;

        if (f.y > H) {
          f.y = -5;
          f.x = Math.random() * W;
        }
        if (f.x > W || f.x < 0) {
          f.x = Math.random() * W;
        }

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(255,255,255,${f.opacity})`
          : `rgba(200,200,255,${f.opacity})`;
        ctx.fill();
      });

      raf.current = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };

    if (!canvas.parentElement) return;

    const ro = new ResizeObserver(() => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    });

    ro.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
