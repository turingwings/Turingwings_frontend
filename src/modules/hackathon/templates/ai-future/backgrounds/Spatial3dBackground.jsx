import React, { useEffect, useRef } from "react";

export default function Spatial3dBackground() {
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

    // 3D Wireframe Cubes
    const cubes = Array.from({ length: 15 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 20 + Math.random() * 40,
      rotX: Math.random() * Math.PI,
      rotY: Math.random() * Math.PI,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
      rotSpeed: 0.01 + Math.random() * 0.02,
    }));

    const render = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.3)";
      ctx.fillRect(0, 0, width, height);

      cubes.forEach((c) => {
        c.x += c.speedX;
        c.y += c.speedY;
        c.rotX += c.rotSpeed;
        c.rotY += c.rotSpeed;

        if (c.x < 0 || c.x > width) c.speedX *= -1;
        if (c.y < 0 || c.y > height) c.speedY *= -1;

        ctx.save();
        ctx.translate(c.x, c.y);

        ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#10B981";

        // Draw 3D wireframe box
        const s = c.size;
        ctx.strokeRect(-s / 2, -s / 2, s, s);

        ctx.strokeStyle = "rgba(245, 158, 11, 0.3)";
        ctx.strokeRect(-s / 4, -s / 4, s, s);

        ctx.restore();
      });

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
