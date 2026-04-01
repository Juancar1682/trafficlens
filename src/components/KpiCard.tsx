import React from "react";

type AccentColor = "green" | "red" | "yellow" | "blue";

interface KpiCardProps {
  label: string;
  value: string;
  unit: string;
  delta: string;
  deltaPositive: boolean;
  accent: AccentColor;
  sparkPoints: number[];
}

const accentMap: Record<AccentColor, string> = {
  green: "#00e5a0",
  red: "#ff5c5c",
  yellow: "#f5a623",
  blue: "#5b8af5",
};

function buildSparkPath(points: number[]): string {
  const width = 160;
  const height = 28;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);

  return points
    .map((p, i) => {
      const x = i * step;
      const y = height - ((p - min) / range) * height;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

export default function KpiCard({
  label,
  value,
  unit,
  delta,
  deltaPositive,
  accent,
  sparkPoints,
}: KpiCardProps) {
  const color = accentMap[accent];
  const path = buildSparkPath(sparkPoints);

  return (
    <div
      className="rounded-xl p-5 relative overflow-hidden"
      style={{
        background: "var(--surface2)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: color }}
      />

      <div
        className="text-xs font-mono mb-3 tracking-widest"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </div>

      <div
        className="font-syne"
        style={{ fontSize: "32px", fontWeight: 800, color }}
      >
        {value}
        <span
          className="text-base font-sans ml-1"
          style={{ color: "var(--muted)", fontWeight: 400 }}
        >
          {unit}
        </span>
      </div>

      {/* Delta */}
      <div className="flex items-center gap-1.5 mt-2">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d={deltaPositive ? "M2 8l4-4 4 4" : "M2 4l4 4 4-4"}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-xs font-mono" style={{ color }}>
          {delta}
        </span>
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          vs yesterday
        </span>
      </div>

      {/* Sparkline */}
      <svg
        className="mt-3 w-full"
        height="28"
        viewBox="0 0 160 28"
        preserveAspectRatio="none"
        style={{ filter: `drop-shadow(0 2px 4px ${color}44)` }}
      >
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
