import React, { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Stars
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.4,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.3 ? "#8B5CF6" : "#6366F1",
    }));

    // Orbiting Constellation Rings
    let angle = 0;

    const render = () => {
      ctx.fillStyle = "rgba(3, 7, 18, 0.3)";
      ctx.fillRect(0, 0, width, height);

      angle += 0.003;

      // 1. Twinkling Stars & Cosmic Particles
      stars.forEach((star) => {
        star.alpha += star.speed;
        const opacity = Math.abs(Math.sin(star.alpha));

        ctx.fillStyle = star.color;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;

      // 2. Cosmic Orbit Ring Lines
      ctx.strokeStyle = "rgba(99, 102, 241, 0.15)";
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#6366F1";

      const centerX = width * 0.8;
      const centerY = height * 0.3;

      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 300, 120, angle, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(139, 92, 246, 0.12)";
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 450, 180, -angle * 0.8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full"
    />
  );
}
