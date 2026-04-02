import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface Props {
  avgSpeed: number;
  speedLimit: number;
  segmentName: string;
}

function gaugeColor(avgSpeed: number, speedLimit: number) {
  if (avgSpeed > speedLimit) return "#ff4d4d";
  if (avgSpeed >= speedLimit - 5) return "#ffaa00";
  return "#00ff94";
}

export default function SpeedGauge({
  avgSpeed,
  speedLimit,
  segmentName,
}: Props) {
  const color = gaugeColor(avgSpeed, speedLimit);
  const percentage = Math.min(
    Math.round((avgSpeed / (speedLimit + 20)) * 100),
    100,
  );

  const options: ApexOptions = {
    chart: {
      type: "radialBar",
      background: "transparent",
      toolbar: { show: false },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          size: "60%",
        },
        track: {
          background: "rgba(255,255,255,0.05)",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: {
            show: true,
            offsetY: 20,
            color: "var(--muted)",
            fontFamily: "IBM Plex Mono",
            fontSize: "11px",
          },
          value: {
            show: true,
            offsetY: -10,
            color,
            fontFamily: "Bricolage Grotesque",
            fontSize: "32px",
            fontWeight: 800,
            formatter: () => `${avgSpeed}`,
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: [color],
    },
    stroke: {
      lineCap: "round",
    },
    labels: [`limit ${speedLimit} mph`],
    theme: { mode: "dark" },
  };

  return (
    <div
      className="rounded-2xl p-4 flex flex-col"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Header */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "14px",
          color: "var(--text)",
          marginBottom: "4px",
        }}
      >
        Speed Gauge
      </div>
      <div
        className="truncate"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--muted)",
          marginBottom: "8px",
        }}
      >
        {segmentName || "Select a segment"}
      </div>

      {/* Chart */}
      <ReactApexChart
        type="radialBar"
        series={[percentage]}
        options={options}
        height={220}
      />

      {/* Stats row */}
      <div
        className="grid grid-cols-3 gap-2 mt-2"
        style={{ borderTop: "1px solid var(--border)", paddingTop: "12px" }}
      >
        {[
          { label: "Avg Speed", value: `${avgSpeed}`, unit: "mph", color },
          {
            label: "Speed Limit",
            value: `${speedLimit}`,
            unit: "mph",
            color: "var(--text)",
          },
          {
            label: "Over Limit",
            value: avgSpeed > speedLimit ? `+${avgSpeed - speedLimit}` : "OK",
            unit: avgSpeed > speedLimit ? "mph" : "",
            color: avgSpeed > speedLimit ? "#ff4d4d" : "#00ff94",
          },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--muted)",
                marginBottom: "2px",
              }}
            >
              {stat.label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "16px",
                color: stat.color,
              }}
            >
              {stat.value}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--muted)",
                  marginLeft: "2px",
                }}
              >
                {stat.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
