"use client";

import { useEffect, useRef } from "react";

type Detection = {
  name: string;
  confidence: number;
};

const mockBoxes = [
  { x: 0.14, y: 0.2, width: 0.28, height: 0.32, color: "#38d7ff" },
  { x: 0.58, y: 0.18, width: 0.24, height: 0.18, color: "#34d399" },
  { x: 0.42, y: 0.62, width: 0.2, height: 0.2, color: "#fbbf24" }
];

export function DetectionCanvas({ active, detections }: { active: boolean; detections: Detection[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    function draw() {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);

      if (!active || detections.length === 0) return;

      detections.forEach((item, index) => {
        const box = mockBoxes[index] || mockBoxes[0];
        const x = box.x * rect.width;
        const y = box.y * rect.height;
        const width = box.width * rect.width;
        const height = box.height * rect.height;
        const label = `${item.name} ${(item.confidence * 100).toFixed(0)}%`;

        ctx.strokeStyle = box.color;
        ctx.lineWidth = 2;
        ctx.fillStyle = `${box.color}22`;
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);

        ctx.font = "12px Arial, sans-serif";
        const labelWidth = ctx.measureText(label).width + 14;
        const labelY = Math.max(8, y - 28);
        ctx.fillStyle = "rgba(0, 0, 0, 0.72)";
        ctx.fillRect(x, labelY, labelWidth, 22);
        ctx.fillStyle = "#f8fafc";
        ctx.fillText(label, x + 7, labelY + 15);
      });
    }

    draw();

    const observer = new ResizeObserver(draw);
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    return () => observer.disconnect();
  }, [active, detections]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
