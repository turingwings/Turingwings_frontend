import React, { useEffect, useRef } from "react";

export default function CorporateBackground() {
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

    // Beams along grid lines
    const beams = Array.from({ length: 12 }, () => ({
      x: Math.floor(Math.random() * (width / 80)) * 80,
      y: 0,
      speed: 3 + Math.random() * 4,
      length: 120,
    }));

    const render = () => {
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 0, width, height);

      // Executive Grid
      ctx.strokeStyle = "rgba(51, 65, 85, 0.4)";
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += 80) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Moving Blue Light Beams
      beams.forEach((beam) => {
        const grad = ctx.createLinearGradient(beam.x, beam.y, beam.x, beam.y + beam.length);
        grad.addColorStop(0, "rgba(37, 99, 235, 0)");
        grad.addColorStop(0.5, "rgba(37, 99, 235, 0.8)");
        grad.addColorStop(1, "rgba(37, 99, 235, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        ctx.moveTo(beam.x, beam.y);
        ctx.lineTo(beam.x, beam.y + beam.length);
        ctx.stroke();

        beam.y += beam.speed;
        if (beam.y > height) {
          beam.y = -beam.length;
          beam.x = Math.floor(Math.random() * (width / 80)) * 80;
        }
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
