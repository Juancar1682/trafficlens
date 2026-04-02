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

const accentMap: Record<AccentColor, { color: string; dim: string }> = {
  green: { color: "#00ff94", dim: "rgba(0,255,148,0.12)" },
  red: { color: "#ff4d4d", dim: "rgba(255,77,77,0.12)" },
  yellow: { color: "#ffaa00", dim: "rgba(255,170,0,0.12)" },
  blue: { color: "#4d9fff", dim: "rgba(77,159,255,0.12)" },
};

function buildSparkPath(points: number[]): string {
  const width = 160;
  const height = 32;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);
  return points
    .map((p, i) => {
      const x = i * step;
      const y = height - ((p - min) / range) * (height - 4) - 2;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
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
  const { color, dim } = accentMap[accent];
  const path = buildSparkPath(sparkPoints);

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5 flex flex-col gap-3"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = color + "44")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--border)")
      }
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
        style={{ background: color }}
      />

      {/* Glow blob */}
      <div
        className="absolute -top-6 -left-6 w-24 h-24 rounded-full blur-2xl pointer-events-none"
        style={{ background: dim }}
      />

      {/* Label */}
      <div
        className="text-xs tracking-widest uppercase pl-3"
        style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}
      >
        {label}
      </div>

      {/* Value */}
      <div className="pl-3 flex items-end gap-2 leading-none">
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "36px",
            fontWeight: 800,
            color,
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "var(--muted)",
            paddingBottom: "4px",
          }}
        >
          {unit}
        </span>
      </div>

      {/* Delta */}
      <div className="pl-3 flex items-center gap-1.5">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
            d={deltaPositive ? "M1 7l4-4 4 4" : "M1 3l4 4 4-4"}
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color }}
        >
          {delta}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--muted)",
          }}
        >
          vs yesterday
        </span>
      </div>

      {/* Sparkline */}
      <svg
        width="100%"
        height="32"
        viewBox="0 0 160 32"
        preserveAspectRatio="none"
        style={{ display: "block" }}
      >
        {/* Area fill */}
        <defs>
          <linearGradient id={`grad-${accent}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L 160 32 L 0 32 Z`} fill={`url(#grad-${accent})`} />
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color}88)` }}
        />
      </svg>
    </div>
  );
}
