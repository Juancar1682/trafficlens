import ReactApexChart from "react-apexcharts";
import type { ApexOptions, ApexAxisChartSeries } from "apexcharts";
import { heatmapData } from "../data/mockHourly";

type TimeFilter = "today" | "week" | "month";

interface Props {
  activeFilter: TimeFilter;
}

const timeLabels = [
  "12a",
  "2a",
  "4a",
  "6a",
  "8a",
  "10a",
  "12p",
  "2p",
  "4p",
  "6p",
  "8p",
  "10p",
];

export default function HeatmapChart({ activeFilter }: Props) {
  const data = heatmapData[activeFilter];

  const options: ApexOptions = {
    chart: {
      type: "heatmap",
      background: "transparent",
      toolbar: { show: false },
      animations: { enabled: true },
    },
    dataLabels: { enabled: false },
    colors: ["#4d9fff"],
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.8,
        radius: 4,
        colorScale: {
          ranges: [
            { from: 0, to: 30, color: "#4d9fff", name: "Low" },
            { from: 31, to: 65, color: "#ffaa00", name: "Medium" },
            { from: 66, to: 100, color: "#ff4d4d", name: "High" },
          ],
        },
      },
    },
    xaxis: {
      categories: timeLabels,
      labels: {
        style: {
          colors: Array(12).fill("#475569"),
          fontFamily: "IBM Plex Mono",
          fontSize: "10px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: {
          colors: Array(7).fill("#475569"),
          fontFamily: "IBM Plex Mono",
          fontSize: "10px",
        },
      },
    },
    grid: { show: false },
    legend: { show: false },
    tooltip: {
      theme: "dark",
      style: { fontFamily: "IBM Plex Mono", fontSize: "12px" },
      y: { formatter: (val) => `${val} speed index` },
    },
    theme: { mode: "dark" },
  };

  return (
    <div
      className="rounded-2xl p-5 flex flex-col"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "14px",
              color: "var(--text)",
            }}
          >
            Speed Heatmap
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--muted)",
              marginTop: "2px",
            }}
          >
            Day × Hour · Speed index · {activeFilter}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {[
            { label: "Low", color: "#4d9fff" },
            { label: "Med", color: "#ffaa00" },
            { label: "High", color: "#ff4d4d" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-sm"
                style={{ background: item.color }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--muted)",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ReactApexChart
        type="heatmap"
        series={data as ApexAxisChartSeries}
        options={options}
        height={200}
      />
    </div>
  );
}
