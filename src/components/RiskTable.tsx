import type { RoadSegment } from "../data/mockSegments";

interface Props {
  segments: RoadSegment[];
  selectedSegment: RoadSegment | null;
  onSelect: (seg: RoadSegment) => void;
}

function riskColor(score: number) {
  if (score >= 80) return "#ff4d4d";
  if (score >= 60) return "#ffaa00";
  return "#00ff94";
}

function riskDim(score: number) {
  if (score >= 80) return "rgba(255,77,77,0.12)";
  if (score >= 60) return "rgba(255,170,0,0.12)";
  return "rgba(0,255,148,0.12)";
}

export default function RiskTable({
  segments,
  selectedSegment,
  onSelect,
}: Props) {
  const sorted = [...segments].sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        height: "100%",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "14px",
            color: "var(--text)",
          }}
        >
          Risk Rankings
        </div>
        <div
          className="px-2 py-0.5 rounded-md"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "#ff4d4d",
            background: "rgba(255,77,77,0.1)",
            border: "1px solid rgba(255,77,77,0.2)",
          }}
        >
          {segments.filter((s) => s.riskScore >= 80).length} critical
        </div>
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto">
        {sorted.map((seg, index) => {
          const isSelected = selectedSegment?.id === seg.id;
          const color = riskColor(seg.riskScore);
          const dim = riskDim(seg.riskScore);

          return (
            <div
              key={seg.id}
              onClick={() => onSelect(seg)}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-150"
              style={{
                borderBottom: "1px solid var(--border)",
                background: isSelected ? "var(--surface2)" : "transparent",
                borderLeft: isSelected
                  ? `2px solid ${color}`
                  : "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!isSelected)
                  e.currentTarget.style.background = "var(--surface2)";
              }}
              onMouseLeave={(e) => {
                if (!isSelected)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              {/* Rank */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--muted)",
                  width: "16px",
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </div>

              {/* Name + stats */}
              <div className="flex-1 min-w-0">
                <div
                  className="truncate"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "13px",
                    color: "var(--text)",
                  }}
                >
                  {seg.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: "var(--muted)",
                    marginTop: "2px",
                  }}
                >
                  {seg.avgSpeed} mph · {seg.volume.toLocaleString()} AADT
                </div>
              </div>

              {/* Risk badge */}
              <div
                className="px-2 py-1 rounded-lg shrink-0"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  fontWeight: 500,
                  color,
                  background: dim,
                  border: `1px solid ${color}33`,
                  minWidth: "36px",
                  textAlign: "center",
                }}
              >
                {seg.riskScore}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
