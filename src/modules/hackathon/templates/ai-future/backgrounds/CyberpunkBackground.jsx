import React, { useEffect, useRef } from "react";

export default function CyberpunkBackground() {
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

    // Neon Rain drops
    const drops = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 40 + Math.random() * 80,
      speed: 4 + Math.random() * 8,
      color: Math.random() > 0.5 ? "#00FF9D" : "#FF0055",
    }));

    let gridOffset = 0;

    const render = () => {
      ctx.fillStyle = "rgba(5, 0, 20, 0.25)";
      ctx.fillRect(0, 0, width, height);

      // 1. Perspective Neon Grid Lines
      ctx.strokeStyle = "rgba(0, 255, 157, 0.12)";
      ctx.lineWidth = 1;

      gridOffset = (gridOffset + 1) % 40;

      // Horizontal moving grid lines
      for (let y = gridOffset; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical perspective lines
      for (let x = 0; x < width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // 2. Animated Cyberpunk Laser Rain Drops
      drops.forEach((drop) => {
        ctx.strokeStyle = drop.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = drop.color;

        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > height) {
          drop.y = -drop.length;
          drop.x = Math.random() * width;
        }
      });

      // Reset shadow blur
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
